/* Visuaalsed selgitused ja animatsioonid (KT2).
   Andmefailides: Viz.html('tüüp', {...}) tagastab koha HTML-is, app.js kutsub Viz.mount(juur).
   Skeemid: CK.* tagastab SVG-teksti; voolu liikumine on CSS-animatsioon (.cflow).
   Väljajooned: Viz.fieldSvg(...) tagastab staatilise SVG koos voolavate joontega. */
(function () {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const REG = {};
  let nid = 0;
  const reduce = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function css(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || '#888';
  }
  function el(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function h(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function tex(s) { return window.md ? window.md(s) : s; }

  /* ---------- Ühine animatsioonitsükkel ---------- */
  const live = new Set();
  let running = false;
  function loop(t) {
    running = false;
    live.forEach(a => {
      if (!a.root.isConnected) { live.delete(a); return; }
      if (a.playing && a.visible) a.tick(t);
    });
    if (live.size) { running = true; requestAnimationFrame(loop); }
  }
  function animate(a) {
    a.visible = true;
    live.add(a);
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(es => { es.forEach(e => { a.visible = e.isIntersecting; }); });
      io.observe(a.root);
    }
    if (!running) { running = true; requestAnimationFrame(loop); }
  }

  /* Raam: pealkiri, sisu, juhtnupud, allkiri */
  function frame(host, title, caption) {
    host.innerHTML = '';
    host.classList.add('vizbox');
    const head = h('div', 'vizhead');
    head.appendChild(h('span', 'viztitle', '🎬 ' + tex(title || 'Visuaalne selgitus')));
    host.appendChild(head);
    const stage = h('div', 'vizstage');
    host.appendChild(stage);
    const ctl = h('div', 'vizctl');
    host.appendChild(ctl);
    if (caption) host.appendChild(h('div', 'vizcap', tex(caption)));
    return { head, stage, ctl };
  }
  function playBtn(f, a) {
    const b = h('button', 'iconbtn small vizplay');
    b.type = 'button';
    const set = () => { b.textContent = a.playing ? '⏸ Paus' : '▶ Mängi'; };
    a.playing = !reduce();
    set();
    b.addEventListener('click', () => { a.playing = !a.playing; a.last = null; set(); });
    f.head.appendChild(b);
    return b;
  }
  function slider(f, label, min, max, step, val, onInput, fmtv) {
    const w = h('label', 'vizslider');
    const s = h('span', 'vizsl', label);
    const i = document.createElement('input');
    i.type = 'range'; i.min = min; i.max = max; i.step = step; i.value = val;
    const out = h('span', 'vizval', fmtv ? fmtv(+val) : '');
    i.addEventListener('input', () => { if (fmtv) out.textContent = fmtv(+i.value); onInput(+i.value); });
    w.appendChild(s); w.appendChild(i); w.appendChild(out);
    f.ctl.appendChild(w);
    return i;
  }
  function button(f, label, onClick) {
    const b = h('button', 'btn ghost sm', label);
    b.type = 'button';
    b.addEventListener('click', onClick);
    f.ctl.appendChild(b);
    return b;
  }
  function canvas(stage, w, hgt) {
    const c = document.createElement('canvas');
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    c.width = w * dpr; c.height = hgt * dpr;
    c.style.width = '100%'; c.style.maxWidth = w + 'px'; c.style.aspectRatio = w + ' / ' + hgt;
    c.className = 'vizcanvas';
    stage.appendChild(c);
    const g = c.getContext('2d');
    g.scale(dpr, dpr);
    return g;
  }
  function svgStage(stage, w, hgt) {
    const s = el('svg', { viewBox: `0 0 ${w} ${hgt}`, class: 'vizsvg' });
    s.style.maxWidth = w + 'px';
    stage.appendChild(s);
    const defs = el('defs', {}, s);
    const sid = 'm' + (++nid);
    ['ink', 'pos', 'neg', 'accent', 'good', 'muted'].forEach(c => {
      const m = el('marker', { id: 'vh-' + c + sid, viewBox: '0 0 10 10', refX: '8', refY: '5', markerWidth: '6', markerHeight: '6', orient: 'auto-start-reverse' }, defs);
      el('path', { d: 'M0,0 L10,5 L0,10 z', class: 'vfill-' + c }, m);
    });
    s._mk = c => `url(#vh-${c}${sid})`;
    return s;
  }
  function arrow(svg, x1, y1, x2, y2, cls, g) {
    const L = Math.hypot(x2 - x1, y2 - y1);
    const ln = el('line', { x1, y1, x2, y2, class: 'varrow v-' + cls, 'marker-end': L > 6 ? svg._mk(cls) : '' }, g || svg);
    return ln;
  }

  /* =====================================================================
     1. Gaas anumas: molekulid, rõhk seinale. opts: {n, T, mix:[{n, r, c, l}], pump, cap, sliders}
     ===================================================================== */
  function gas(host, o) {
    const W = 360, H = 230;
    const f = frame(host, o.title || 'Molekulid anumas', o.cap);
    const g = canvas(f.stage, W, H);
    const box = { x: 14, y: 14, w: 230, h: 200 };
    const st = { T: o.T || 1, mols: [], hits: 0, imp: 0, p: 0, pAvg: 0, base: null };
    const mix = o.mix || [{ n: o.n || 40, r: 3.2, c: 'accent', l: '' }];
    function add(spec, k) {
      for (let i = 0; i < k; i++) {
        const ang = Math.random() * Math.PI * 2;
        const m = spec.m || 1;
        const sp = (40 + Math.random() * 40) / Math.sqrt(m);
        st.mols.push({ x: box.x + 6 + Math.random() * (box.w - 12), y: box.y + 6 + Math.random() * (box.h - 12),
          vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, r: spec.r || 3, c: spec.c || 'accent', m });
      }
    }
    mix.forEach(sp => add(sp, sp.n));
    const a = { root: host, playing: true, last: null };
    playBtn(f, a);
    if (o.sliders !== false) {
      slider(f, 'Temperatuur T', 0.3, 3, 0.1, st.T, v => { st.T = v; }, v => '×' + v.toFixed(1));
      slider(f, 'Molekulide arv N', 5, 160, 1, st.mols.length, v => {
        while (st.mols.length > v) st.mols.pop();
        if (st.mols.length < v) add(mix[0], v - st.mols.length);
      }, v => String(v));
    }
    if (o.pump) {
      button(f, '+ pumba tõuge', () => { mix.forEach(sp => add(sp, Math.max(1, Math.round((o.pump || 8) * sp.n / mix.reduce((s, x) => s + x.n, 0))))); });
    }
    const info = h('div', 'vizinfo small');
    f.ctl.appendChild(info);
    a.tick = t => {
      const dt = a.last == null ? 0.016 : Math.min(0.05, (t - a.last) / 1000);
      a.last = t;
      const k = Math.sqrt(st.T);
      st.mols.forEach(m => {
        m.x += m.vx * k * dt; m.y += m.vy * k * dt;
        if (m.x < box.x + m.r) { m.x = box.x + m.r; m.vx = Math.abs(m.vx); st.imp += 2 * m.m * Math.abs(m.vx) * k; }
        if (m.x > box.x + box.w - m.r) { m.x = box.x + box.w - m.r; m.vx = -Math.abs(m.vx); st.imp += 2 * m.m * Math.abs(m.vx) * k; }
        if (m.y < box.y + m.r) { m.y = box.y + m.r; m.vy = Math.abs(m.vy); st.imp += 2 * m.m * Math.abs(m.vy) * k; }
        if (m.y > box.y + box.h - m.r) { m.y = box.y + box.h - m.r; m.vy = -Math.abs(m.vy); st.imp += 2 * m.m * Math.abs(m.vy) * k; }
      });
      // rõhk = seinale antud impulss ajaühikus pinnaühiku kohta (silutud)
      const pNow = st.imp / Math.max(dt, 1e-3) / (2 * (box.w + box.h));
      st.imp = 0;
      st.pAvg = st.pAvg ? st.pAvg * 0.97 + pNow * 0.03 : pNow;
      if (st.base == null && t > 1500) st.base = st.pAvg;
      draw();
    };
    function draw() {
      g.clearRect(0, 0, W, H);
      g.strokeStyle = css('--muted'); g.lineWidth = 2.5;
      g.strokeRect(box.x, box.y, box.w, box.h);
      st.mols.forEach(m => {
        g.fillStyle = css('--' + (m.c === 'accent' ? 'accent' : m.c));
        g.beginPath(); g.arc(m.x, m.y, m.r, 0, Math.PI * 2); g.fill();
      });
      // manomeeter
      const px = 270, py = 40, ph = 160;
      g.fillStyle = css('--line'); g.fillRect(px, py, 26, ph);
      const ref = st.base || st.pAvg || 1;
      const frac = Math.min(1, st.pAvg / (ref * 3));
      g.fillStyle = css('--bad'); g.fillRect(px, py + ph * (1 - frac), 26, ph * frac);
      g.fillStyle = css('--ink'); g.font = '13px system-ui, sans-serif';
      g.fillText('rõhk p', px - 4, py - 10);
      g.fillStyle = css('--muted');
      g.fillText('N = ' + st.mols.length, px - 10, py + ph + 18);
      if (mix.length > 1) {
        mix.forEach((sp, i) => {
          g.fillStyle = css('--' + sp.c); g.beginPath(); g.arc(box.x + 12 + i * 90, H - 4, 4, 0, 7); g.fill();
          g.fillStyle = css('--ink'); g.fillText(sp.l, box.x + 20 + i * 90, H);
        });
      }
    }
    info.innerHTML = o.info || 'Iga põrge seinaga annab seinale väikese tõuke. Rõhk on nende tõugete summa ajaühikus ja pinnaühiku kohta: rohkem molekule või kiiremad molekulid (kõrgem $T$) annavad suurema rõhu, $p = nkT$.';
    info.innerHTML = tex(info.innerHTML);
    draw();
    animate(a);
  }

  /* =====================================================================
     2. p-V diagramm koos silindriga. opts: {proc:'T'|'p'|'V', v1, v2, cap}
     ===================================================================== */
  function pv(host, o) {
    const W = 380, H = 230;
    const proc = o.proc || 'T';
    const titles = { T: 'Isotermiline paisumine ($T$ = const)', p: 'Isobaariline paisumine ($p$ = const)', V: 'Isokoorne soojendamine ($V$ = const)' };
    const f = frame(host, o.title || titles[proc], o.cap);
    const svg = svgStage(f.stage, W, H);
    const ox = 40, oy = 195, gw = 200, gh = 170;
    const V1 = o.v1 || 1, V2 = o.v2 || (proc === 'V' ? 1 : 2.5);
    const vmax = 3, pmax = 3;
    const p1 = proc === 'V' ? 1 : 2;
    function pOf(V, s) {
      if (proc === 'T') return p1 * V1 / V;
      if (proc === 'p') return p1;
      return 1 + s * 1.6;
    }
    const X = V => ox + V / vmax * gw, Y = p => oy - p / pmax * gh;
    const g = el('g', {}, svg);
    arrow(svg, ox, oy, ox + gw + 15, oy, 'muted', g);
    arrow(svg, ox, oy, ox, oy - gh - 12, 'muted', g);
    el('text', { x: ox + gw + 8, y: oy + 16, class: 'vtext' }, g).textContent = 'V';
    el('text', { x: ox - 18, y: oy - gh, class: 'vtext' }, g).textContent = 'p';
    // täis kõver hallilt
    let d = '';
    if (proc === 'T') { for (let V = 0.55; V <= 2.95; V += 0.05) d += (d ? 'L' : 'M') + X(V).toFixed(1) + ',' + Y(p1 * V1 / V).toFixed(1); }
    if (d) el('path', { d, class: 'vcurve faint' }, g);
    const area = el('path', { class: 'varea' }, g);
    const path = el('path', { class: 'vcurve' }, g);
    const dot = el('circle', { r: 6, class: 'vdot' }, g);
    el('text', { x: X(V1) - 4, y: Y(pOf(V1, 0)) - 10, class: 'vtext' }, g).textContent = '1';
    const lab2 = el('text', { class: 'vtext' }, g);
    const aLab = el('text', { class: 'vtext acc', x: X((V1 + V2) / 2) - 6, y: oy - 20 }, g);
    // silinder
    const cx = 275, cy = 30, cw = 80, ch = 160;
    el('rect', { x: cx, y: cy, width: cw, height: ch, class: 'vcyl' }, svg);
    const gasR = el('rect', { x: cx + 2, width: cw - 4, class: 'vgas' }, svg);
    const piston = el('rect', { x: cx - 4, width: cw + 8, height: 12, rx: 2, class: 'vpiston' }, svg);
    const rod = el('line', { x1: cx + cw / 2, x2: cx + cw / 2, y1: 4, class: 'vrod' }, svg);
    const heat = el('g', { class: 'vheat' }, svg);
    for (let i = 0; i < 3; i++) arrow(svg, cx + 18 + i * 22, cy + ch + 30, cx + 18 + i * 22, cy + ch + 6, 'pos', heat);
    el('text', { x: cx + cw + 4, y: cy + ch + 24, class: 'vtext small pos' }, heat).textContent = 'Q';
    const tLab = el('text', { x: cx, y: cy - 8, class: 'vtext small' }, svg);
    tLab.textContent = proc === 'T' ? 'T = const' : 'T kasvab';
    const a = { root: host, playing: true, last: null, s: 0, dir: 1, hold: 0 };
    playBtn(f, a);
    function draw() {
      const s = a.s;
      const V = proc === 'V' ? V1 : V1 + (V2 - V1) * s;
      const p = pOf(V, s);
      dot.setAttribute('cx', X(V)); dot.setAttribute('cy', Y(p));
      let pd = 'M' + X(V1) + ',' + Y(pOf(V1, 0));
      const n = 30;
      for (let i = 1; i <= n; i++) {
        const si = s * i / n;
        const Vi = proc === 'V' ? V1 : V1 + (V2 - V1) * si;
        pd += 'L' + X(Vi).toFixed(1) + ',' + Y(pOf(Vi, si)).toFixed(1);
      }
      path.setAttribute('d', pd);
      if (proc !== 'V') {
        area.setAttribute('d', pd + `L${X(V)},${oy}L${X(V1)},${oy}Z`);
        aLab.textContent = s > 0.5 ? 'A' : '';
      } else { area.setAttribute('d', ''); aLab.textContent = s > 0.5 ? 'A = 0' : ''; }
      lab2.setAttribute('x', X(V) + 8); lab2.setAttribute('y', Y(p) - 8);
      lab2.textContent = s > 0.98 ? '2' : '';
      const top = cy + ch - (ch - 20) * (V / vmax);
      piston.setAttribute('y', top - 12);
      rod.setAttribute('y2', top - 12);
      gasR.setAttribute('y', top); gasR.setAttribute('height', cy + ch - top - 2);
      const hot = proc === 'T' ? 0.25 : 0.15 + 0.6 * s;
      gasR.style.opacity = 0.25 + hot * 0.6;
      heat.style.opacity = a.dir > 0 && s < 0.99 ? 1 : 0.25;
    }
    a.tick = t => {
      const dt = a.last == null ? 0 : (t - a.last) / 1000; a.last = t;
      if (a.hold > 0) { a.hold -= dt; return; }
      a.s += a.dir * dt / 3;
      if (a.s >= 1) { a.s = 1; a.dir = -1; a.hold = 1.2; }
      if (a.s <= 0) { a.s = 0; a.dir = 1; a.hold = 0.8; }
      draw();
    };
    a.s = reduce() ? 1 : 0;
    draw();
    animate(a);
  }

  /* =====================================================================
     3. Vabadusastmed: üheaatomiline, lineaarne, mittelineaarne molekul
     ===================================================================== */
  function dof(host, o) {
    const f = frame(host, o.title || 'Vabadusastmed $i$', o.cap ||
      'Iga vabadusaste saab keskmiselt energia $\\frac{1}{2}kT$. Kulgliikumise vabadusastmeid on alati 3. Lineaarne molekul (H₂, N₂, O₂, CO₂: aatomid ühel sirgel) ei saa pöörelda ümber oma telje, tal on 2 pöördliikumise vabadusastet. Seega $U = \\frac{i}{2}\\frac{m}{\\mu}RT$.');
    const W = 380, H = 150;
    const svg = svgStage(f.stage, W, H);
    const cols = [
      { x: 65, t: 'He, Ar', i: '3', atoms: [[0, 0, 13]], rot: 0 },
      { x: 190, t: 'H₂, N₂, O₂, CO₂', i: '3 + 2 = 5', atoms: [[-20, 0, 11], [20, 0, 11]], rot: 2 },
      { x: 315, t: 'H₂O, CH₄', i: '3 + 3 = 6', atoms: [[0, -6, 13], [-20, 12, 8], [20, 12, 8]], rot: 3 }
    ];
    cols.forEach((c, k) => {
      const g = el('g', { transform: `translate(${c.x},60)` }, svg);
      const spin = el('g', { class: c.rot ? 'vspin' + (k === 2 ? ' slow' : '') : 'vjiggle' }, g);
      if (c.atoms.length === 3) { el('line', { x1: 0, y1: -6, x2: -20, y2: 12, class: 'vbond' }, spin); el('line', { x1: 0, y1: -6, x2: 20, y2: 12, class: 'vbond' }, spin); }
      if (c.atoms.length === 2) el('line', { x1: -20, y1: 0, x2: 20, y2: 0, class: 'vbond' }, spin);
      c.atoms.forEach(([x, y, r], j) => el('circle', { cx: x, cy: y, r, class: j === 0 ? 'vatom' : 'vatom b' }, spin));
      el('text', { x: 0, y: 62, 'text-anchor': 'middle', class: 'vtext small' }, g).textContent = c.t;
      el('text', { x: 0, y: 80, 'text-anchor': 'middle', class: 'vtext acc' }, g).textContent = 'i = ' + c.i;
    });
  }

  /* =====================================================================
     4. Coulombi jõud kahe laengu vahel. opts: {q1, q2, eps}
     ===================================================================== */
  function coulomb(host, o) {
    const W = 380, H = 150;
    const f = frame(host, o.title || 'Coulombi jõud', o.cap || 'Liiguta liugureid: jõud on võrdeline laengute korrutisega ja pöördvõrdeline kauguse ruuduga. Mõlemale laengule mõjub sama suur jõud (Newtoni III seadus). Samamärgilised tõukuvad, erimärgilised tõmbuvad.');
    const svg = svgStage(f.stage, W, H);
    const st = { q1: o.q1 || 1, q2: o.q2 || 1, r: 160, eps: 1 };
    const g = el('g', {}, svg);
    function draw() {
      g.innerHTML = '';
      const cx = W / 2, y = 80;
      const x1 = cx - st.r / 2, x2 = cx + st.r / 2;
      const F = 2600 * Math.abs(st.q1 * st.q2) / (st.r * st.r) / st.eps;
      const L = Math.min(150, F * 40);
      const rep = st.q1 * st.q2 > 0;
      if (L > 2) {
        arrow(svg, x1, y, x1 + (rep ? -L : L), y, 'ink', g);
        arrow(svg, x2, y, x2 + (rep ? L : -L), y, 'ink', g);
      }
      [[x1, st.q1], [x2, st.q2]].forEach(([x, q]) => {
        el('circle', { cx: x, cy: y, r: 9 + 3 * Math.abs(q), class: q > 0 ? 'vq pos' : 'vq neg' }, g);
        el('text', { x, y: y + 5, 'text-anchor': 'middle', class: 'vqt' }, g).textContent = q > 0 ? '+' : '−';
      });
      el('line', { x1, y1: y + 30, x2, y2: y + 30, class: 'vdim' }, g);
      el('text', { x: cx, y: y + 46, 'text-anchor': 'middle', class: 'vtext small' }, g).textContent = 'r';
      el('text', { x: 10, y: 20, class: 'vtext small' }, g).textContent = (rep ? 'tõukejõud' : 'tõmbejõud') + (st.eps > 1 ? ', keskkonnas ε = ' + st.eps : ', vaakumis');
    }
    slider(f, 'Kaugus r', 60, 300, 1, st.r, v => { st.r = v; draw(); });
    slider(f, 'Laeng q₂', -3, 3, 1, st.q2, v => { st.q2 = v || 1; draw(); }, v => (v > 0 ? '+' : '') + (v || 1));
    if (o.eps) button(f, 'Vaakum / keskkond', () => { st.eps = st.eps > 1 ? 1 : o.eps; draw(); });
    draw();
  }

  /* =====================================================================
     5. Väljajooned ja proovilaeng. opts: {charges:[{x,y,q}], w, h, probe:[x,y], parts}
     ===================================================================== */
  function Efield(ch, x, y) {
    let ex = 0, ey = 0;
    ch.forEach(c => {
      const dx = x - c.x, dy = y - c.y, r2 = dx * dx + dy * dy + 1e-6, r = Math.sqrt(r2);
      ex += c.q * dx / (r2 * r); ey += c.q * dy / (r2 * r);
    });
    return [ex, ey];
  }
  function fieldLines(ch, W, H, perUnit) {
    const lines = [];
    const pos = ch.filter(c => c.q > 0), neg = ch.filter(c => c.q < 0);
    const src = pos.length ? pos : neg;
    const sign = pos.length ? 1 : -1;
    src.forEach(c => {
      const n = Math.max(6, Math.round(Math.abs(c.q) * (perUnit || 10)));
      for (let k = 0; k < n; k++) {
        const ang = (k + 0.5) / n * Math.PI * 2;
        let x = c.x + 10 * Math.cos(ang), y = c.y + 10 * Math.sin(ang);
        const pts = [[x, y]];
        for (let s = 0; s < 900; s++) {
          let [ex, ey] = Efield(ch, x, y);
          const m = Math.hypot(ex, ey) || 1;
          x += sign * 3 * ex / m; y += sign * 3 * ey / m;
          pts.push([x, y]);
          if (x < -20 || x > W + 20 || y < -20 || y > H + 20) break;
          if (ch.some(o => o !== c && Math.hypot(x - o.x, y - o.y) < 9 && Math.sign(o.q) !== sign)) break;
        }
        if (sign < 0) pts.reverse();
        lines.push(pts);
      }
    });
    return lines;
  }
  function linesSvg(lines) {
    return lines.map(pts => {
      const d = 'M' + pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join('L');
      const mid = pts[Math.floor(pts.length * 0.45)] || pts[0], nx = pts[Math.floor(pts.length * 0.45) + 1] || pts[pts.length - 1];
      const ang = Math.atan2(nx[1] - mid[1], nx[0] - mid[0]) * 180 / Math.PI;
      return `<path d="${d}" class="vline"/><path d="${d}" class="vline cflow slow"/>` +
        (pts.length > 12 ? `<path d="M-5,-4 L4,0 L-5,4 z" class="vfill-muted" transform="translate(${mid[0].toFixed(1)},${mid[1].toFixed(1)}) rotate(${ang.toFixed(0)})"/>` : '');
    }).join('');
  }
  function chargesSvg(ch) {
    return ch.map(c => `<circle cx="${c.x}" cy="${c.y}" r="${c.r || 11}" class="vq ${c.q > 0 ? 'pos' : 'neg'}"/>` +
      `<text x="${c.x}" y="${c.y + 5}" text-anchor="middle" class="vqt">${c.q > 0 ? '+' : '−'}</text>` +
      (c.l ? `<text x="${c.x + (c.lx || 0)}" y="${c.y + (c.ly || 28)}" text-anchor="middle" class="vtext small">${c.l}</text>` : '')).join('');
  }
  /* staatiline väljajoonte pilt (voolav animatsioon CSS-iga) */
  function fieldSvg(ch, W, H, extra, perUnit) {
    return `<svg viewBox="0 0 ${W} ${H}" class="vizsvg static" style="max-width:${W}px">` +
      `<g>${linesSvg(fieldLines(ch, W, H, perUnit))}</g>${chargesSvg(ch)}${extra || ''}</svg>`;
  }
  function field(host, o) {
    const W = o.w || 380, H = o.h || 240;
    const ch = o.charges;
    const f = frame(host, o.title || 'Elektriväli ja proovilaeng', o.cap || 'Väljajooned algavad positiivsetelt ja lõpevad negatiivsetel laengutel. Lohista väikest proovilaengut: nool näitab väljatugevust $\\vec E$ selles punktis. Värvilised nooled on üksikute laengute väljad, must on nende vektoriaalne summa.');
    const svg = svgStage(f.stage, W, H);
    const gl = el('g', {}, svg);
    gl.innerHTML = linesSvg(fieldLines(ch, W, H, o.per)) + chargesSvg(ch) + (o.extra || '');
    if (o.probe === false) return;
    const gp = el('g', {}, svg);
    const pr = { x: (o.probe || [W / 2, 30])[0], y: (o.probe || [W / 2, 30])[1] };
    const readout = h('div', 'vizinfo small');
    f.ctl.appendChild(readout);
    function draw() {
      gp.innerHTML = '';
      const gain = o.gain || 3200;
      const clamp = (vx, vy) => { const m = Math.hypot(vx, vy); const L = Math.min(110, gain * Math.sqrt(m)); return m ? [vx / m * L, vy / m * L, L] : [0, 0, 0]; };
      if (o.parts !== false) ch.forEach(c => {
        const [ex, ey] = Efield([c], pr.x, pr.y);
        const [dx, dy, L] = clamp(ex, ey);
        if (L > 4) arrow(svg, pr.x, pr.y, pr.x + dx, pr.y + dy, c.q > 0 ? 'pos' : 'neg', gp).classList.add('thin');
      });
      const [ex, ey] = Efield(ch, pr.x, pr.y);
      const [dx, dy, L] = clamp(ex, ey);
      if (L > 4) arrow(svg, pr.x, pr.y, pr.x + dx, pr.y + dy, 'ink', gp);
      el('circle', { cx: pr.x, cy: pr.y, r: 7, class: 'vprobe' }, gp);
      el('text', { x: pr.x + 10, y: pr.y - 10, class: 'vtext small' }, gp).textContent = 'q₀';
      const big = Math.max(...ch.map(c => Math.hypot(...Efield([c], pr.x, pr.y))));
      readout.textContent = Math.hypot(ex, ey) < 0.08 * big ? 'Siin on summaarne väli peaaegu null: üksikute laengute väljad on võrdsed ja vastassuunalised.' : 'Summaarne väli on üksikute väljade vektoriaalne summa.';
    }
    function pt(e) { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); }
    svg.addEventListener('pointerdown', e => {
      const move = ev => { const p = pt(ev); pr.x = Math.max(5, Math.min(W - 5, p.x)); pr.y = Math.max(5, Math.min(H - 5, p.y)); draw(); };
      move(e);
      svg.setPointerCapture && svg.setPointerCapture(e.pointerId);
      const up = () => { svg.removeEventListener('pointermove', move); svg.removeEventListener('pointerup', up); };
      svg.addEventListener('pointermove', move); svg.addEventListener('pointerup', up);
    });
    svg.style.touchAction = 'none';
    draw();
  }

  /* =====================================================================
     6. Kaks laetud kuulikest niitide otsas. opts: {medium: true}
     ===================================================================== */
  function hang(host, o) {
    const W = 380, H = 230;
    const f = frame(host, o.title || 'Laetud kuulikesed niitide otsas', o.cap || 'Kuulikesele mõjuvad raskusjõud $mg$, niidi tõmme $T$ ja elektriline tõukejõud $F_e$. Tasakaalus annavad $mg$ ja $F_e$ kokku jõu, mis on täpselt $T$ vastas, seega $\\tan\\frac{\\alpha}{2} = \\frac{F_e}{mg}$.');
    const svg = svgStage(f.stage, W, H);
    const st = { K: 0.35, oil: false, rho: 3 };
    const g = el('g', {}, svg);
    const L = 150, px = 190, py = 22;
    function solve(K) { // tan(th) * 4 sin^2(th) = K
      let lo = 0.001, hi = 1.5;
      for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (Math.tan(m) * 4 * Math.sin(m) ** 2 > K) hi = m; else lo = m; }
      return (lo + hi) / 2;
    }
    function draw() {
      g.innerHTML = '';
      let K = st.K;
      if (st.oil) K = st.K / 2 / (1 - 1 / st.rho);
      const th = solve(K);
      const thAir = solve(st.K);
      if (st.oil) {
        el('rect', { x: 20, y: 90, width: W - 40, height: H - 95, class: 'voil' }, g);
        el('text', { x: 28, y: H - 12, class: 'vtext small' }, g).textContent = 'õli: ε = 2, üleslükkejõud';
        [-1, 1].forEach(s => el('line', { x1: px, y1: py, x2: px + s * L * Math.sin(thAir), y2: py + L * Math.cos(thAir), class: 'vghost' }, g));
      }
      el('line', { x1: px - 40, y1: py, x2: px + 40, y2: py, class: 'vceil' }, g);
      [-1, 1].forEach(s => {
        const bx = px + s * L * Math.sin(th), by = py + L * Math.cos(th);
        el('line', { x1: px, y1: py, x2: bx, y2: by, class: 'vthread' }, g);
        el('circle', { cx: bx, cy: by, r: 10, class: 'vq pos' }, g);
        el('text', { x: bx, y: by + 5, 'text-anchor': 'middle', class: 'vqt' }, g).textContent = '+';
        if (s < 0) {
          const mg = 55, Fe = mg * Math.tan(th);
          arrow(svg, bx, by, bx, by + mg, 'ink', g);
          arrow(svg, bx, by, bx - Fe, by, 'pos', g);
          arrow(svg, bx, by, bx + (px - bx) / L * mg / Math.cos(th), by + (py - by) / L * mg / Math.cos(th), 'accent', g);
          el('text', { x: bx + 6, y: by + mg, class: 'vtext small' }, g).textContent = st.oil ? 'mg − Fü' : 'mg';
          el('text', { x: bx - Fe - 4, y: by - 8, class: 'vtext small pos', 'text-anchor': 'end' }, g).textContent = 'Fₑ';
          el('text', { x: bx + 18, y: by - 28, class: 'vtext small acc' }, g).textContent = 'T';
        }
      });
      const r = 34;
      el('path', { d: `M${px - r * Math.sin(th)},${py + r * Math.cos(th)} A${r},${r} 0 0 0 ${px + r * Math.sin(th)},${py + r * Math.cos(th)}`, class: 'vdim' }, g);
      el('text', { x: px, y: py + r + 16, 'text-anchor': 'middle', class: 'vtext small' }, g).textContent = 'α';
    }
    slider(f, 'Laeng q', 0.05, 2.5, 0.01, st.K, v => { st.K = v; draw(); });
    if (o.medium) {
      button(f, 'Õhk / õli', () => { st.oil = !st.oil; draw(); });
      slider(f, 'Kuuli tihedus ρ/ρ_õli', 1.3, 4, 0.05, st.rho, v => { st.rho = v; draw(); }, v => v.toFixed(2));
    }
    draw();
  }

  /* =====================================================================
     7. Kaks osakest lähenevad (energia jäävus). opts: {mode:'approach'|'repel'}
     ===================================================================== */
  function approach(host, o) {
    const W = 380, H = 170;
    const repel = o.mode === 'repel';
    const f = frame(host, o.title || (repel ? 'Tõukuvad kerad lendavad laiali' : 'Prootonid lähenevad teineteisele'), o.cap || (repel
      ? 'Alguses on kerad paigal ja kogu energia on vastastikmõju potentsiaalne energia $W_p = \\frac{q^2}{4\\pi\\varepsilon_0 r}$. Lõpmata kaugel on see null ja kogu energia on kahe kera kineetiline energia.'
      : 'Kineetiline energia (sinine) muutub tõukejõu tõttu potentsiaalseks energiaks (punane). Lähimas punktis on osakesed hetkeks paigal ja kogu energia on potentsiaalne. Summa jääb samaks.'));
    const svg = svgStage(f.stage, W, H);
    const g = el('g', {}, svg);
    const a = { root: host, playing: true, last: null };
    playBtn(f, a);
    const E = 1, rmin = 40;
    let x = repel ? rmin : 160, v = repel ? 0 : -Math.sqrt(E - rmin / 160), sgn = repel ? 1 : -1;
    // ühikud: Wp = rmin / x (kogu energia E = 1), Ek = 1 - Wp, x = poolkaugus
    function reset() { x = repel ? rmin : 165; sgn = repel ? 1 : -1; }
    reset();
    function draw() {
      g.innerHTML = '';
      const cx = 150, y = 70;
      const Wp = Math.min(1, rmin / x), Ek = Math.max(0, 1 - Wp);
      [-1, 1].forEach(s => {
        const px = cx + s * x * 0.8;
        el('circle', { cx: px, cy: y, r: 11, class: 'vq pos' }, g);
        el('text', { x: px, y: y + 5, 'text-anchor': 'middle', class: 'vqt' }, g).textContent = '+';
        const vl = Math.sqrt(Ek) * 45 * (sgn > 0 ? 1 : -1) * s;
        if (Math.abs(vl) > 4) arrow(svg, px, y - 22, px + vl, y - 22, 'accent', g);
      });
      el('text', { x: cx, y: y + 36, 'text-anchor': 'middle', class: 'vtext small' }, g).textContent = Ek < 0.02 && !repel ? 'lähim punkt: v = 0' : '';
      const bx = 310, bh = 110, by = 25;
      [['Eₖ', Ek, 'accent', 0], ['Wₚ', Wp, 'bad', 30]].forEach(([l, val, c, dx]) => {
        el('rect', { x: bx + dx, y: by, width: 22, height: bh, class: 'vbarbg' }, g);
        el('rect', { x: bx + dx, y: by + bh * (1 - val), width: 22, height: bh * val, class: 'vbar ' + c }, g);
        el('text', { x: bx + dx + 11, y: by + bh + 16, 'text-anchor': 'middle', class: 'vtext small' }, g).textContent = l;
      });
    }
    a.tick = t => {
      const dt = a.last == null ? 0 : Math.min(0.05, (t - a.last) / 1000); a.last = t;
      const Ek = Math.max(0, 1 - rmin / x);
      let sp = Math.sqrt(Ek) * 140 + 4;
      x += sgn * sp * dt;
      if (!repel && x <= rmin) { x = rmin; sgn = 1; }
      if (x > 175) { reset(); }
      draw();
    };
    draw();
    animate(a);
  }

  /* =====================================================================
     8. Kondensaator: väli plaatide vahel, kiirenev elektron. opts: {mode:'electron'|'dielectric'}
     ===================================================================== */
  function plates(host, o) {
    const W = 380, H = o.mode === 'dielectric' ? 210 : 250;
    const diel = o.mode === 'dielectric';
    const f = frame(host, o.title || (diel ? 'Dielektrik kondensaatoris' : 'Elektron homogeenses väljas'), o.cap || (diel
      ? 'Dielektrikus on väli $\\varepsilon$ korda nõrgem (vähem väljajooni), sest dielektriku pinnale tekivad polarisatsioonilaengud. Õhkvahemikus jääb väli tugevamaks. Pinge on lõikude pingete summa: $U = E_1d_1 + E_2d_2$.'
      : 'Homogeenses väljas on elektronile mõjuv jõud $F = eE$ konstantne, seega kiirendus on konstantne ja liikumine on ühtlaselt kiirenev. Elektron liigub väljaga vastassuunas, katoodilt (−) anoodile (+).'));
    const svg = svgStage(f.stage, W, H);
    const xl = 70, xr = 310, yt = 30, yb = 180;
    const g = el('g', {}, svg);
    el('rect', { x: xl - 8, y: yt, width: 8, height: yb - yt, class: diel ? 'vplate pos' : 'vplate neg' }, g);
    el('rect', { x: xr, y: yt, width: 8, height: yb - yt, class: diel ? 'vplate neg' : 'vplate pos' }, g);
    for (let k = 0; k < 6; k++) {
      const yy = yt + 14 + k * 25;
      el('text', { x: xl - 22, y: yy + 5, class: 'vqt ' + (diel ? 'pos' : 'neg') + 'c' }, g).textContent = diel ? '+' : '−';
      el('text', { x: xr + 14, y: yy + 5, class: 'vqt ' + (diel ? 'neg' : 'pos') + 'c' }, g).textContent = diel ? '−' : '+';
    }
    const fl = el('g', {}, svg);
    const a = { root: host, playing: true, last: null, x: xl + 6, v: 0, t: 0 };
    if (diel) {
      const dx1 = 170, dx2 = 250;
      el('rect', { x: dx1, y: yt, width: dx2 - dx1, height: yb - yt, class: 'vdiel' }, g);
      el('text', { x: (dx1 + dx2) / 2, y: yb + 18, 'text-anchor': 'middle', class: 'vtext small' }, g).textContent = 'klaas, ε';
      el('text', { x: (xl + dx1) / 2, y: yb + 18, 'text-anchor': 'middle', class: 'vtext small' }, g).textContent = 'õhk';
      for (let k = 0; k < 9; k++) {
        const yy = yt + 10 + k * 16.5;
        const inD = k % 3 === 1;
        const d1 = `M${xl + 2},${yy} L${dx1},${yy}`, d3 = `M${dx2},${yy} L${xr - 2},${yy}`;
        fl.innerHTML += `<path d="${d1}" class="vline"/><path d="${d1}" class="vline cflow"/><path d="${d3}" class="vline"/><path d="${d3}" class="vline cflow"/>`;
        if (inD) { const d2 = `M${dx1},${yy} L${dx2},${yy}`; fl.innerHTML += `<path d="${d2}" class="vline"/><path d="${d2}" class="vline cflow"/>`; }
      }
      [[dx1, '−'], [dx2, '+']].forEach(([xx, s]) => { for (let k = 0; k < 5; k++) el('text', { x: xx + (s === '−' ? 4 : -12), y: yt + 22 + k * 30, class: 'vtext small ' + (s === '+' ? 'pos' : 'neg') }, g).textContent = s; });
      return;
    }
    for (let k = 0; k < 7; k++) {
      const yy = yt + 12 + k * 21;
      const d = `M${xr - 2},${yy} L${xl + 2},${yy}`;
      fl.innerHTML += `<path d="${d}" class="vline"/><path d="${d}" class="vline cflow slow"/>`;
    }
    el('text', { x: (xl + xr) / 2 - 10, y: yt - 8, class: 'vtext acc' }, g).textContent = '← E';
    el('text', { x: xl - 30, y: yb + 18, class: 'vtext small' }, g).textContent = 'katood';
    el('text', { x: xr - 18, y: yb + 18, class: 'vtext small' }, g).textContent = 'anood';
    const ge = el('g', {}, svg);
    playBtn(f, a);
    function draw() {
      ge.innerHTML = '';
      const y = 105;
      // jälg: võrdsete ajavahemike tagant (näitab kiirenevat liikumist)
      for (let k = 1; k <= 8; k++) {
        const tk = k * 0.25;
        if (tk > a.t) break;
        const xk = xl + 6 + (xr - xl - 12) * Math.min(1, (tk / 2) ** 2);
        el('circle', { cx: xk, cy: yb + 34, r: 3, class: 'vtrace' }, ge);
      }
      el('circle', { cx: a.x, cy: y, r: 8, class: 'vq neg' }, ge);
      el('text', { x: a.x, y: y + 4, 'text-anchor': 'middle', class: 'vqt' }, ge).textContent = '−';
      const vl = a.v * 30;
      if (vl > 4) arrow(svg, a.x, y - 18, a.x + vl, y - 18, 'accent', ge);
      if (vl > 4) el('text', { x: a.x + vl + 4, y: y - 14, class: 'vtext small acc' }, ge).textContent = 'v';
      arrow(svg, a.x, y + 16, a.x + 28, y + 16, 'neg', ge).classList.add('thin');
      el('text', { x: a.x + 30, y: y + 22, class: 'vtext small' }, ge).textContent = 'F = eE';
      el('text', { x: xl, y: yb + 54, class: 'vtext small muted' }, ge).textContent = 'elektroni asend võrdsete ajavahemike järel';
    }
    a.tick = t => {
      const dt = a.last == null ? 0 : Math.min(0.05, (t - a.last) / 1000); a.last = t;
      a.t += dt;
      if (a.t > 2.8) { a.t = 0; }
      const s = Math.min(1, (a.t / 2) ** 2);
      a.x = xl + 6 + (xr - xl - 12) * s;
      a.v = a.t < 2 ? a.t / 2 * 2 : 2;
      draw();
    };
    draw();
    animate(a);
  }

  /* =====================================================================
     9. Kasulik võimsus N(R) ja kasutegur. opts: {}
     ===================================================================== */
  function power(host, o) {
    const W = 380, H = 220;
    const f = frame(host, o.title || 'Kasulik võimsus ja kasutegur', o.cap || 'Kasulik võimsus $N = \\frac{\\varepsilon^2R}{(R+r)^2}$ on suurim, kui $R = r$, aga siis on kasutegur ainult 50%. Sama võimsuse võib saada kahe erineva välistakistusega, mille korrutis on $R_1R_2 = r^2$.');
    const svg = svgStage(f.stage, W, H);
    const ox = 45, oy = 180, gw = 300, gh = 150, Rmax = 6;
    const X = R => ox + R / Rmax * gw, Y = v => oy - v * gh;
    const g = el('g', {}, svg);
    arrow(svg, ox, oy, ox + gw + 12, oy, 'muted', g);
    arrow(svg, ox, oy, ox, oy - gh - 14, 'muted', g);
    el('text', { x: ox + gw, y: oy + 18, class: 'vtext small' }, g).textContent = 'R / r';
    for (let k = 1; k <= 5; k++) el('text', { x: X(k) - 3, y: oy + 16, class: 'vtext small muted' }, g).textContent = k;
    let dN = '', dE = '';
    for (let R = 0; R <= Rmax; R += 0.05) {
      const N = 4 * R / (R + 1) ** 2, eta = R / (R + 1);
      dN += (dN ? 'L' : 'M') + X(R).toFixed(1) + ',' + Y(N).toFixed(1);
      dE += (dE ? 'L' : 'M') + X(R).toFixed(1) + ',' + Y(eta).toFixed(1);
    }
    el('path', { d: dN, class: 'vcurve' }, g);
    el('path', { d: dE, class: 'vcurve good dash' }, g);
    el('text', { x: X(5.2), y: Y(4 * 5.2 / 6.2 ** 2) - 8, class: 'vtext small acc' }, g).textContent = 'N / Nmax';
    el('text', { x: X(4.6), y: Y(4.6 / 5.6) - 8, class: 'vtext small good' }, g).textContent = 'η';
    const gm = el('g', {}, svg);
    const info = h('div', 'vizinfo small');
    f.ctl.appendChild(info);
    let R = 2;
    function draw() {
      gm.innerHTML = '';
      const N = 4 * R / (R + 1) ** 2, eta = R / (R + 1);
      el('line', { x1: X(R), y1: oy, x2: X(R), y2: Y(1), class: 'vdim' }, gm);
      el('circle', { cx: X(R), cy: Y(N), r: 5, class: 'vdot' }, gm);
      el('circle', { cx: X(R), cy: Y(eta), r: 5, class: 'vdot good' }, gm);
      const R2 = 1 / R;
      if (Math.abs(R - 1) > 0.05 && R2 <= Rmax) el('circle', { cx: X(R2), cy: Y(N), r: 4, class: 'vdot faint' }, gm);
      info.innerHTML = `R = ${R.toFixed(2).replace('.', ',')}·r: N = ${(N * 100).toFixed(0)}% maksimumist, η = ${(eta * 100).toFixed(0)}%` + (Math.abs(R - 1) > 0.05 ? ` (sama N ka siis, kui R = ${R2.toFixed(2).replace('.', ',')}·r)` : ' ← maksimum');
    }
    slider(f, 'Välistakistus R', 0.1, 6, 0.01, R, v => { R = v; draw(); });
    draw();
  }

  /* =====================================================================
     10. Potentsiaal ruumis (värvikaart) laengute ümber. opts: {charges, w, h, dots:[[x,y,l]]}
     ===================================================================== */
  function potential(host, o) {
    const W = o.w || 360, H = o.h || 260;
    const f = frame(host, o.title || 'Potentsiaal laengute ümber', o.cap || 'Potentsiaal on skalaar: punktis liidetakse üksikute laengute potentsiaalid $\\varphi_i = \\frac{q_i}{4\\pi\\varepsilon_0 r_i}$ märki arvestades. Punane = positiivne, sinine = negatiivne potentsiaal. Kõrvuti olevad jooned on ekvipotentsiaalpinnad.');
    const g = canvas(f.stage, W, H);
    const ch = o.charges;
    const img = g.createImageData ? null : null;
    const cell = 4;
    const pos = css('--pos'), neg = css('--neg');
    function hex(c) { const m = /#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i.exec(c); return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : [200, 60, 60]; }
    const cp = hex(pos), cn = hex(neg);
    for (let x = 0; x < W; x += cell) for (let y = 0; y < H; y += cell) {
      let phi = 0;
      ch.forEach(c => { phi += c.q / Math.max(8, Math.hypot(x - c.x, y - c.y)); });
      const s = Math.max(-1, Math.min(1, phi * (o.k || 12)));
      const col = s > 0 ? cp : cn;
      const a = Math.abs(s);
      const band = Math.abs(((phi * (o.k || 12) * 6) % 1 + 1) % 1 - 0.5) < 0.06;
      g.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${(band ? 0.15 : 0) + a * 0.55})`;
      g.fillRect(x, y, cell, cell);
    }
    ch.forEach(c => {
      g.fillStyle = c.q > 0 ? pos : neg; g.beginPath(); g.arc(c.x, c.y, 10, 0, 7); g.fill();
      g.fillStyle = '#fff'; g.font = 'bold 15px system-ui'; g.textAlign = 'center'; g.fillText(c.q > 0 ? '+' : '−', c.x, c.y + 5);
    });
    (o.dots || []).forEach(([x, y, l]) => {
      g.strokeStyle = css('--ink'); g.lineWidth = 2; g.beginPath(); g.arc(x, y, 5, 0, 7); g.stroke();
      g.fillStyle = css('--ink'); g.font = '13px system-ui'; g.textAlign = 'left'; g.fillText(l, x + 8, y - 6);
    });
  }

  const TYPES = { gas, pv, dof, coulomb, field, hang, approach, plates, power, potential };

  function html(type, opts) {
    const id = 'vz' + (++nid);
    REG[id] = { type, opts: opts || {} };
    return `<div class="viz" data-vid="${id}"></div>`;
  }
  function mount(root) {
    if (!root) return;
    root.querySelectorAll('.viz[data-vid]:not([data-on])').forEach(n => {
      const r = REG[n.dataset.vid];
      if (!r || !TYPES[r.type]) return;
      n.dataset.on = '1';
      try { TYPES[r.type](n, r.opts); } catch (e) { n.textContent = ''; console.error(e); }
    });
  }

  /* =====================================================================
     Skeemide joonistamine (CK). Koordinaadid SVG ühikutes.
     ===================================================================== */
  const sub = t => String(t).replace(/_([A-Za-zšV0-9,{}]+)/g, (m, x) => `<tspan baseline-shift="sub" font-size="75%">${x.replace(/[{}]/g, '')}</tspan>`);
  const CK = {
    // juhe punktide kaudu; I > 0 -> voolu animatsioon juhtme suunas (kiirus võrdeline I-ga)
    wire(pts, I, cls) {
      const d = 'M' + pts.map(p => p.join(',')).join(' L');
      let s = `<path d="${d}" class="ckw ${cls || ''}"/>`;
      if (I) s += `<path d="${d}" class="cflow" style="animation-duration:${(1.6 / Math.max(0.15, I)).toFixed(2)}s"/>`;
      return s;
    },
    R(x, y, vert, label, lx, ly, cls) {
      const w = 40, hh = 14;
      const r = vert ? `<rect x="${x - hh / 2}" y="${y - w / 2}" width="${hh}" height="${w}" class="ckr ${cls || ''}"/>` : `<rect x="${x - w / 2}" y="${y - hh / 2}" width="${w}" height="${hh}" class="ckr ${cls || ''}"/>`;
      return r + (label ? `<text x="${x + (lx != null ? lx : (vert ? 14 : 0))}" y="${y + (ly != null ? ly : (vert ? 5 : -12))}" class="ckt" text-anchor="${vert && lx == null ? 'start' : 'middle'}">${sub(label)}</text>` : '');
    },
    // reostaat: takisti + nool
    Rv(x, y, vert, label, lx, ly) {
      return CK.R(x, y, vert, label, lx, ly) + `<line x1="${x - 18}" y1="${y + 14}" x2="${x + 18}" y2="${y - 14}" class="ckw thin" marker-end="url(#ckah)"/>`;
    },
    lamp(x, y, label, lx, ly) {
      return `<circle cx="${x}" cy="${y}" r="12" class="ckr lamp"/><line x1="${x - 8}" y1="${y - 8}" x2="${x + 8}" y2="${y + 8}" class="ckw thin"/><line x1="${x - 8}" y1="${y + 8}" x2="${x + 8}" y2="${y - 8}" class="ckw thin"/>` +
        (label ? `<text x="${x + (lx || 0)}" y="${y + (ly != null ? ly : -18)}" class="ckt" text-anchor="middle">${sub(label)}</text>` : '');
    },
    // vooluallikas: pikk joon = +, lühike = −. dir: 'r' (+ paremal), 'l', 'u' (+ üleval), 'd'
    bat(x, y, dir, label, lx, ly) {
      const v = dir === 'u' || dir === 'd';
      const plusFirst = dir === 'l' || dir === 'u';
      const a = plusFirst ? -5 : 5;
      const long = v ? `<line x1="${x - 13}" y1="${y + a}" x2="${x + 13}" y2="${y + a}" class="ckb"/>` : `<line x1="${x + a}" y1="${y - 13}" x2="${x + a}" y2="${y + 13}" class="ckb"/>`;
      const short = v ? `<line x1="${x - 7}" y1="${y - a}" x2="${x + 7}" y2="${y - a}" class="ckb thick"/>` : `<line x1="${x - a}" y1="${y - 7}" x2="${x - a}" y2="${y + 7}" class="ckb thick"/>`;
      return `<rect x="${x - 7}" y="${y - 7}" width="14" height="14" class="ckgap"/>` + long + short +
        (label ? `<text x="${x + (lx != null ? lx : (v ? 18 : 0))}" y="${y + (ly != null ? ly : (v ? 5 : -18))}" class="ckt" text-anchor="${v && lx == null ? 'start' : 'middle'}">${sub(label)}</text>` : '');
    },
    // kondensaator
    C(x, y, vert, label, lx, ly) {
      const g = 5, L = 13;
      const p = vert ? `<line x1="${x - L}" y1="${y - g}" x2="${x + L}" y2="${y - g}" class="ckb"/><line x1="${x - L}" y1="${y + g}" x2="${x + L}" y2="${y + g}" class="ckb"/>`
        : `<line x1="${x - g}" y1="${y - L}" x2="${x - g}" y2="${y + L}" class="ckb"/><line x1="${x + g}" y1="${y - L}" x2="${x + g}" y2="${y + L}" class="ckb"/>`;
      return `<rect x="${x - g + 1}" y="${y - L}" width="${2 * g - 2}" height="${2 * L}" class="ckgap" transform="${vert ? `rotate(90 ${x} ${y})` : ''}"/>` + p +
        (label ? `<text x="${x + (lx != null ? lx : (vert ? 18 : 0))}" y="${y + (ly != null ? ly : (vert ? 5 : -19))}" class="ckt" text-anchor="${vert && lx == null ? 'start' : 'middle'}">${sub(label)}</text>` : '');
    },
    meter(x, y, t, label, lx, ly) {
      return `<circle cx="${x}" cy="${y}" r="13" class="ckm"/><text x="${x}" y="${y + 5}" class="ckmt" text-anchor="middle">${t}</text>` +
        (label ? `<text x="${x + (lx || 0)}" y="${y + (ly != null ? ly : -19)}" class="ckt" text-anchor="middle">${sub(label)}</text>` : '');
    },
    dot(x, y, label, lx, ly) {
      return `<circle cx="${x}" cy="${y}" r="3.5" class="ckdot"/>` + (label ? `<text x="${x + (lx || 0)}" y="${y + (ly != null ? ly : -8)}" class="ckt b" text-anchor="middle">${sub(label)}</text>` : '');
    },
    term(x, y, label, lx, ly) {
      return `<circle cx="${x}" cy="${y}" r="4" class="ckterm"/>` + (label ? `<text x="${x + (lx || 0)}" y="${y + (ly != null ? ly : -9)}" class="ckt b" text-anchor="middle">${sub(label)}</text>` : '');
    },
    text(x, y, t, cls) { return `<text x="${x}" y="${y}" class="ckt ${cls || ''}" text-anchor="middle">${sub(t)}</text>`; },
    svg(w, h, body, cap) {
      return `<figure class="ckfig"><svg viewBox="0 0 ${w} ${h}" class="cksvg" style="max-width:${w}px">` +
        `<defs><marker id="ckah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="ckah"/></marker></defs>` +
        body + `</svg>${cap ? `<figcaption>${cap}</figcaption>` : ''}</figure>`;
    }
  };

  window.Viz = { html, mount, fieldSvg, Efield };
  window.CK = CK;
})();
