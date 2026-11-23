/* 15. KT2 variandid (YFX0100/YFX0060 KT 2, variandid 1 kuni 4). */
(function () {
const R = String.raw;
const W = CK.wire;

/* Kasutatavad valemid: konspektist (pähe õppida) ja matemaatikast/jooniselt */
function FM(phys, math) {
  return `<div class="fgrp"><div class="fgh">📘 Konspektist (pähe õppida)</div>${phys}</div>` +
    (math ? `<div class="fgrp math"><div class="fgh">📐 Matemaatikast või jooniselt (ei ole füüsika valem)</div>${math}</div>` : '');
}
/* Samm lahenduskäigus */
const S = (n, title, body) => `<div class="solstep"><div class="solh"><span class="soln">${n}</span>${title}</div>${body}</div>`;

/* W(r) = kq₁q₂/r graafik (mittemõõtkavas). mode: 'apart' (eemaldumine r₁ → r₂), 'inf' (lisaks lõpmatus), 'approach' (lähenemine, energiatase) */
function wGraph(mode, labs) {
  labs = labs || {};
  const ox = 50, oy = 200, x1 = 95, x2 = 300, k = 6600;
  const y = x => oy - k / (x - ox + 4);
  let d = '';
  for (let x = 82; x <= 340; x += 3) d += (d ? 'L' : 'M') + x + ',' + y(x).toFixed(1);
  let s = `<svg viewBox="0 0 380 240" class="gsvg wide">` +
    `<line x1="${ox}" y1="${oy}" x2="360" y2="${oy}"/><path d="M354,${oy - 4} L362,${oy} L354,${oy + 4}"/>` +
    `<line x1="${ox}" y1="${oy}" x2="${ox}" y2="14"/><path d="M${ox - 4},20 L${ox},12 L${ox + 4},20"/>` +
    `<text x="350" y="${oy + 18}">r</text><text x="${ox - 30}" y="22">W</text>` +
    `<path d="${d}" style="stroke:var(--accent);stroke-width:2.5"/>` +
    `<text x="200" y="232" class="up" font-size="11" text-anchor="middle">${labs.cap || 'mittemõõtkavas: W = kq₁q₂/r kahaneb kaugusega'}</text>`;
  if (mode === 'approach') {
    const xr0 = 300, xmin = 120, yE = y(xmin);
    s += `<line x1="${ox}" y1="${yE}" x2="350" y2="${yE}" style="stroke:var(--pos);stroke-dasharray:6 4"/><text x="352" y="${yE + 4}" style="fill:var(--pos)" font-size="12">E</text>` +
      `<line x1="${xr0}" y1="${y(xr0)}" x2="${xr0}" y2="${oy}" class="dash"/><circle cx="${xr0}" cy="${y(xr0)}" r="4" class="pt"/><text x="${xr0 - 6}" y="${oy + 16}">r₀</text>` +
      `<line x1="${xr0 + 12}" y1="${yE}" x2="${xr0 + 12}" y2="${y(xr0)}" style="stroke:var(--good);stroke-width:2"/><text x="${xr0 + 18}" y="${(yE + y(xr0)) / 2 + 4}" style="fill:var(--good)" font-size="12">Eₖ₀</text>` +
      `<line x1="${xmin}" y1="${yE}" x2="${xmin}" y2="${oy}" class="dash"/><circle cx="${xmin}" cy="${yE}" r="5" style="fill:var(--pos);stroke:none"/><text x="${xmin - 14}" y="${oy + 16}">r_min</text>` +
      `<text x="${xmin + 10}" y="${yE - 8}" font-size="12" class="up">siin Eₖ = 0</text>`;
    return s + `</svg>`;
  }
  s += `<line x1="${x1}" y1="${y(x1)}" x2="${x1}" y2="${oy}" class="dash"/><line x1="${ox}" y1="${y(x1)}" x2="${x1}" y2="${y(x1)}" class="dash"/>` +
    `<line x1="${x2}" y1="${y(x2)}" x2="${x2}" y2="${oy}" class="dash"/><line x1="${ox}" y1="${y(x2)}" x2="${x2}" y2="${y(x2)}" class="dash"/>` +
    `<circle cx="${x1}" cy="${y(x1)}" r="4" class="pt"/><circle cx="${x2}" cy="${y(x2)}" r="4" class="pt"/>` +
    `<text x="${x1 - 6}" y="${oy + 16}">r₁</text><text x="${x2 - 6}" y="${oy + 16}">r₂</text><text x="${ox - 30}" y="${y(x1) + 5}">W₁</text><text x="${ox - 30}" y="${y(x2) + 5}">W₂</text>` +
    `<line x1="${ox + 14}" y1="${y(x1) + 4}" x2="${ox + 14}" y2="${y(x2) - 4}" style="stroke:var(--good);stroke-width:2"/><path d="M${ox + 10},${y(x2) - 10} L${ox + 14},${y(x2) - 2} L${ox + 18},${y(x2) - 10}" style="stroke:var(--good);stroke-width:2"/>` +
    `<text x="${ox + 20}" y="${(y(x1) + y(x2)) / 2}" style="fill:var(--good)" font-size="12">${labs.d || 'W₁ − W₂ = elektriliste jõudude töö'}</text>`;
  if (mode === 'inf') s += `<text x="300" y="${oy - 6}" class="up" font-size="11">r → ∞: W → 0</text>`;
  return s + `</svg>`;
}
/* fikseeritud laeng ja teine laeng/osake */
function chargesFig(l1, l2, rlab, arrow) {
  return `<svg viewBox="0 0 360 100" class="gsvg"><circle cx="70" cy="45" r="13" class="pos"/><text x="70" y="50" text-anchor="middle" class="q">+</text>` +
    `<path d="M52 66 L88 66" class="thin"/><text x="70" y="86" text-anchor="middle" font-size="12" class="up">fikseeritud</text><text x="70" y="22" text-anchor="middle">${l1}</text>` +
    `<circle cx="180" cy="45" r="10" class="pos"/><text x="180" y="50" text-anchor="middle" class="q">+</text><text x="180" y="22" text-anchor="middle">${l2}</text>` +
    `<line x1="70" y1="78" x2="180" y2="78" class="dash"/><text x="125" y="94" text-anchor="middle">${rlab}</text>` +
    (arrow === 'away' ? `<line x1="196" y1="45" x2="300" y2="45" class="dash"/><path d="M292 40 L302 45 L292 50" /><text x="250" y="36" text-anchor="middle" font-size="12" class="up">eemaldub</text>` : '') +
    (arrow === 'toward' ? `<line x1="164" y1="60" x2="110" y2="60"/><path d="M118 55 L108 60 L118 65"/><text x="140" y="74" font-size="12" class="up">v₀</text>` : '') +
    `</svg>`;
}
/* vooluallikas sisetakistusega: välisosa sisu body, allikas vasakul */
function src(body, h, cap, lab) {
  return CK.svg(360, h || 170, W([[60, 40], [60, 20], [120, 20]], 1) + W([[60, 110], [60, (h || 170) - 25], [120, (h || 170) - 25]], 1) + W([[60, 40], [60, 110]], 0) +
    `<rect x="25" y="35" width="70" height="80" class="box"/>` + CK.bat(60, 55, 'u', lab || 'ε', 22) + CK.R(60, 92, true, 'r', 14) + body, cap);
}

/* ===================== Variant 1 ===================== */

P({ id: 'v1-1', short: 'V1.1', head: 'Variant 1 · ülesanne 1', b: 15, k: 'V', src: null,
  text: R`Silindris ruumalaga 1 liiter on 100 g lämmastikku temperatuuril 27 °C. Lämmastik paisub isotermiliselt ruumalani 5 liitrit. Leida lämmastiku rõhk enne ja pärast paisumist ja paisumisel tehtud töö. Lämmastiku molaarmass on 0,028 kg/mol.`,
  given: R`<b>Andmed:</b> $V_1 = 1\ \text{L} = 10^{-3}\ \text{m}^3$, $m = 100\ \text{g} = 0.1\ \text{kg}$, $t = 27\ ^\circ\text{C}$, $V_2 = 5\ \text{L}$, $\mu = 0.028\ \text{kg/mol}$, $T = \text{const}$.<br><b>Leida:</b> $p_1$, $p_2$, $A$.`,
  formulas: FM(R`<p>Mendelejev-Clapeyroni võrrand: $pV = \frac{m}{\mu}RT$</p><p>Isotermiline protsess: $p_1V_1 = p_2V_2$</p><p>Gaasi töö: $A = \int_{V_1}^{V_2}p\,dV$</p>`,
    R`<p>$\int\frac{dV}{V} = \ln V$ ja $\ln V_2 - \ln V_1 = \ln\frac{V_2}{V_1}$</p><p>Konstandi saab tuua integraali märgi alt välja: $\int\frac{C}{V}dV = C\int\frac{dV}{V}$</p><p>$T\,[\text{K}] = t\,[^\circ\text{C}] + 273$</p>`),
  viz: Viz.html('pv', { proc: 'T', v1: 0.6, v2: 3, cap: R`Ruumala kasvab 5 korda, rõhk väheneb 5 korda. Töö on värvitud pindala isotermi all, selle saab ainult integraaliga, sest rõhk muutub.` }),
  steps: [
    num(R`Temperatuur kelvinites:`, 300, 'K', { label: R`T`, abs: 0.6 }),
    num(R`Moolide arv $\nu = m/\mu$:`, 3.571, 'mol', { label: R`\nu` }),
    num(R`Rõhk enne paisumist:`, 8.90e6, 'Pa', { final: true, label: R`p_1`, alts: [{ a: 8.90e3, msg: 'Ruumala tuleb võtta kuupmeetrites: $1\\ \\text{L} = 10^{-3}\\ \\text{m}^3$.' }, { a: 8.90e9, msg: 'Kontrolli massi: $100\\ \\text{g} = 0.1\\ \\text{kg}$.' }] }),
    mc(R`Kuidas leida rõhk pärast paisumist?`, [R`*$p_2 = p_1\frac{V_1}{V_2}$ (isotermiline protsess)`, R`$p_2 = p_1\frac{V_2}{V_1}$||Ruumala kasvab, rõhk peab vähenema.`, R`$p_2 = p_1$||Temperatuur on konstantne, rõhk mitte.`]),
    num(R`Rõhk pärast paisumist:`, 1.78e6, 'Pa', { final: true, label: R`p_2` }),
    mc(R`Paisumise töö isotermilisel protsessil:`, [R`*$A = \frac{m}{\mu}RT\ln\frac{V_2}{V_1}$`, R`$A = p_1(V_2 - V_1)$||Rõhk ei ole konstantne, nii ei saa.`, R`$A = \frac{m}{\mu}R\Delta T$||See on isobaarilise protsessi töö. Siin $\Delta T = 0$.`]),
    num(R`Paisumisel tehtud töö:`, 14330, 'J', { final: true, label: R`A`, alts: [{ a: 3.571 * 8.31 * 300 * 4, msg: 'Logaritmi asemel on kasutatud ruumalade vahet või suhet. Õige on $\\ln\\frac{V_2}{V_1} = \\ln 5 \\approx 1.61$.' }, { a: 8.90e6 * 4e-3, msg: 'See oleks töö konstantse rõhu $p_1$ korral. Isotermil rõhk langeb, töö on väiksem.' }] })
  ],
  sol: S(1, 'Teisendame ühikud SI-süsteemi', R`<p>$V_1 = 10^{-3}\ \text{m}^3$, $V_2 = 5\cdot 10^{-3}\ \text{m}^3$, $m = 0.1\ \text{kg}$, $T = 27 + 273 = 300\ \text{K}$.</p>`) +
    S(2, 'Rõhk enne paisumist (Mendelejev-Clapeyron)', R`<p>$p_1V_1 = \frac{m}{\mu}RT$, avaldame rõhu:</p>$$p_1 = \frac{mRT}{\mu V_1} = \frac{0.1\cdot 8.31\cdot 300}{0.028\cdot 10^{-3}} \approx 8.9\cdot 10^6\ \text{Pa} = 8.9\ \text{MPa}$$`) +
    S(3, 'Rõhk pärast paisumist (isotermiline protsess)', R`<p>Clapeyroni võrrandist $\frac{p_1V_1}{T_1} = \frac{p_2V_2}{T_2}$ jääb $T_1 = T_2$ korral $p_1V_1 = p_2V_2$:</p>$$p_2 = p_1\frac{V_1}{V_2} = \frac{8.9\cdot 10^6}{5} \approx 1.8\cdot 10^6\ \text{Pa}$$`) +
    S(4, 'Paisumise töö', R`<p>Töö üldvalem on $A = \int_{V_1}^{V_2}p\,dV$. Integreerimiseks avaldame rõhu ruumala kaudu: $p = \frac{mRT}{\mu V}$. Temperatuur on konstant, toome konstandid integraali alt välja:</p>
$$A = \frac{mRT}{\mu}\int_{V_1}^{V_2}\frac{dV}{V} = \frac{m}{\mu}RT(\ln V_2 - \ln V_1) = \frac{m}{\mu}RT\ln\frac{V_2}{V_1}$$
$$A = \frac{0.1}{0.028}\cdot 8.31\cdot 300\cdot\ln 5 = 3.57\cdot 8.31\cdot 300\cdot 1.61 \approx 1.4\cdot 10^4\ \text{J}$$
<p>Kontroll: $\frac{m}{\mu}RT = p_1V_1 = 8.9\ \text{kJ}$, seega ka $A = p_1V_1\ln 5$.</p>`),
  ans: R`$p_1 \approx 8.9\ \text{MPa}$, $p_2 \approx 1.8\ \text{MPa}$, $A \approx 14\ \text{kJ}$`
});

P({ id: 'v1-2', short: 'V1.2', head: 'Variant 1 · ülesanne 2', b: 15, k: 'V', src: null,
  text: R`Fikseeritud punktlaengust $10^{-7}$ C asub 1 cm kaugusel punktlaeng $10^{-8}$ C. Määrata nende laengute vahel mõjuv jõud ja nende vastasmõju potentsiaalne energia. Kui palju tööd tuleb teha, et eemaldada need laengud teineteisest 1 m kaugusele?`,
  fig: chargesFig('q₁ = 10⁻⁷ C', 'q₂ = 10⁻⁸ C', 'r₁ = 1 cm', 'away'),
  given: R`<b>Andmed:</b> $q_1 = 10^{-7}\ \text{C}$, $q_2 = 10^{-8}\ \text{C}$, $r_1 = 1\ \text{cm} = 0.01\ \text{m}$, $r_2 = 1\ \text{m}$, $\varepsilon = 1$.<br><b>Leida:</b> $F$, $W_1$, $A$.`,
  formulas: FM(R`<p>Coulombi seadus: $F = \frac{|q_1||q_2|}{4\pi\varepsilon_0\varepsilon r^2}$</p><p>Vastastikmõju energia: $W = \frac{q_1q_2}{4\pi\varepsilon_0\varepsilon r}$</p><p>Töö elektriliste jõudude vastu: $A = q_2(\varphi_2 - \varphi_1) = W_2 - W_1$</p>`,
    R`<p>$\frac{1}{4\pi\varepsilon_0} = \frac{1}{4\pi\cdot 8.85\cdot 10^{-12}} \approx 9\cdot 10^9\ \text{N·m}^2/\text{C}^2$</p>`),
  viz: Viz.html('coulomb', { cap: R`Samamärgilised laengud tõukuvad. Kui teine laeng kaugeneb, jõud ja potentsiaalne energia vähenevad. Elektrilised jõud lükkavad ise laenguid lahku, seega meil pole vaja tööd teha, pigem teevad tööd elektrilised jõud.` }),
  steps: [
    num(R`Laengute vaheline jõud:`, 0.0899, 'N', { final: true, label: R`F`, alts: [{ a: 8.99e-4, msg: 'Kaugus on ruudus: $r^2 = 10^{-4}\\ \\text{m}^2$.' }, { a: 8.99e-8, msg: 'Kaugus meetrites: 1 cm = 0,01 m.' }] }),
    num(R`Vastastikmõju potentsiaalne energia alguses:`, 8.99e-4, 'J', { final: true, label: R`W_1` }),
    num(R`Vastastikmõju energia 1 m kaugusel:`, 8.99e-6, 'J', { label: R`W_2` }),
    mc(R`Laengud on samamärgilised. Mis märki on töö, mida meie peame tegema laengute eemaldamiseks?`, [R`*Negatiivne: $A = W_2 - W_1 < 0$, sest tõukejõud teevad töö ise ära`, R`Positiivne, sest laenguid tuleb lükata||Tõukuvaid laenguid ei pea lükkama, nad eemalduvad ise.`, R`Null||Energia muutub, seega töö ei ole null.`]),
    num(R`Tehtav töö ($A = W_2 - W_1$):`, -8.90e-4, 'J', { final: true, label: R`A`, alts: [{ a: 8.90e-4, msg: 'Arv on õige. See on elektriliste jõudude töö. Meie töö elektriliste jõudude vastu on vastupidise märgiga.' }, { a: -8.99e-4, msg: 'See on töö lõpmata kaugele viimisel. 1 m kaugusel on alles $W_2 = 9\\ \\mu\\text{J}$.' }] })
  ],
  sol: S(1, 'Coulombi jõud', R`$$F = \frac{q_1q_2}{4\pi\varepsilon_0r_1^2} = \frac{9\cdot 10^9\cdot 10^{-7}\cdot 10^{-8}}{(0.01)^2} = \frac{9\cdot 10^{-6}}{10^{-4}} = 0.09\ \text{N}$$<p>Samamärgilised laengud, seega tõukejõud.</p>`) +
    S(2, 'Vastastikmõju potentsiaalne energia', R`$$W_1 = \frac{q_1q_2}{4\pi\varepsilon_0r_1} = \frac{9\cdot 10^9\cdot 10^{-15}}{0.01} = 9\cdot 10^{-4}\ \text{J} = 0.9\ \text{mJ}$$<p>Seda saab kirjutada ka kui $W_1 = q_2\varphi_1$, kus $\varphi_1 = \frac{q_1}{4\pi\varepsilon_0r_1}$ on laengu $q_1$ potentsiaal teise laengu asukohas.</p>`) +
    S(3, 'Töö laengu eemaldamisel 1 m kaugusele', R`<p>Elektriliste jõudude vastu tehtud töö on potentsiaalse energia muut:</p>
$$A = W_2 - W_1 = \frac{q_1q_2}{4\pi\varepsilon_0}\left(\frac{1}{r_2} - \frac{1}{r_1}\right) = 9\cdot 10^9\cdot 10^{-15}\left(\frac{1}{1} - \frac{1}{0.01}\right) = 9\cdot 10^{-6}\cdot(1 - 100) \approx -8.9\cdot 10^{-4}\ \text{J}$$
<p>Miinusmärk tähendab, et tööd ei pea tegema meie: tõukejõud teevad ise positiivset tööd $8.9\cdot 10^{-4}\ \text{J}$ (laengut tuleb hoopis kinni hoida, et ta liiga kiiresti ei lendaks).</p>` + wGraph('apart')),
  ans: R`$F = 0.09\ \text{N}$, $W_1 = 0.9\ \text{mJ}$, $A = -0.89\ \text{mJ}$ (elektrilised jõud teevad ise tööd 0,89 mJ).`,
  after: R`Kui eemaldada lõpmata kaugele, oleks $W_2 = 0$ ja töö $-0.9\ \text{mJ}$. Võrdle ülesandega 70, kus laengud olid erimärgilised ja töö tuli positiivne.`
});

P({ id: 'v1-3', short: 'V1.3', head: 'Variant 1 · ülesanne 3', b: 15, k: 'V', src: null,
  text: R`Elektromotoorjõu allikaga, mille sisetakistus on 5 oomi ja elektromotoorjõud 9 V, ühendatakse jadamisi kaks lampi. Kummagi lambi takistus on samuti 5 oomi. Määrata tekkiv voolutugevus, pingelangud lampidel ja lampidel eralduv võimsus.`,
  fig: src(W([[120, 20], [300, 20], [300, 145], [120, 145]], 0.6) + CK.lamp(300, 82, 'R₁ = 5 Ω', 38, 5) + CK.lamp(190, 145, 'R₂ = 5 Ω', 0, 30), 170, 'Kaks lampi jadamisi, allika sees sisetakistus r = 5 Ω.', 'ε = 9 V'),
  given: R`<b>Andmed:</b> $\varepsilon = 9\ \text{V}$, $r = 5\ \Omega$, $R_1 = R_2 = 5\ \Omega$, jadaühendus.<br><b>Leida:</b> $I$, $U_1$, $U_2$, $N$.`,
  formulas: FM(R`<p>Jadaühendus: $R = R_1 + R_2$</p><p>Ohmi seadus suletud ahela kohta: $I = \frac{\varepsilon}{R + r}$</p><p>Ohmi seadus tarbija kohta: $U = IR$</p><p>Võimsus: $N = UI = I^2R$</p>`),
  steps: [
    num(R`Lampide kogutakistus:`, 10, 'Ω', { label: R`R` }),
    num(R`Voolutugevus:`, 0.6, 'A', { final: true, label: R`I`, alts: [{ a: 0.9, msg: 'Unustasid allika sisetakistuse: $I = \\frac{\\varepsilon}{R + r}$.' }] }),
    num(R`Pingelang ühel lambil:`, 3, 'V', { final: true, label: R`U_1`, alts: [{ a: 4.5, msg: 'Pinge 9 V ei jagune ainult lampide vahel, 3 V langeb allika sees.' }] }),
    num(R`Mõlemal lambil kokku eralduv võimsus:`, 3.6, 'W', { final: true, label: R`N`, hint: R`$N = I^2(R_1 + R_2)$`, alts: [{ a: 1.8, msg: 'See on ühe lambi võimsus. Küsitud on lampidel kokku.' }, { a: 5.4, msg: 'See on koguvõimsus $\\varepsilon I$, millest osa eraldub allika sees.' }] })
  ],
  sol: S(1, 'Välisahela takistus', R`<p>Lambid on jadamisi: $R = R_1 + R_2 = 10\ \Omega$.</p>`) +
    S(2, 'Voolutugevus', R`$$I = \frac{\varepsilon}{R + r} = \frac{9}{10 + 5} = 0.6\ \text{A}$$<p>Jadaühenduses läbib sama vool nii lampe kui ka allikat.</p>`) +
    S(3, 'Pingelangud', R`$$U_1 = U_2 = IR_1 = 0.6\cdot 5 = 3\ \text{V}$$<p>Kontroll: lampidel kokku 6 V ja allika sees $Ir = 3\ \text{V}$, kokku $9\ \text{V} = \varepsilon$.</p>`) +
    S(4, 'Võimsus', R`$$N_1 = N_2 = U_1I = 3\cdot 0.6 = 1.8\ \text{W}, \qquad N = N_1 + N_2 = 3.6\ \text{W}$$<p>Allika sees eraldub $I^2r = 1.8\ \text{W}$, koguvõimsus $\varepsilon I = 5.4\ \text{W}$.</p>`),
  ans: R`$I = 0.6\ \text{A}$, kummalgi lambil 3 V ja 1,8 W (kokku 3,6 W).`
});

/* ===================== Variant 2 ===================== */

P({ id: 'v2-1', short: 'V2.1', head: 'Variant 2 · ülesanne 1', b: 15, k: 'V', src: null,
  text: R`Anumas ruumalaga 2 m³ on 4 kg hapnikku, mille temperatuur on −13 °C. Määrata hapniku rõhk, anumas olevate molekulide arv ja hapniku siseenergia. Hapniku molaarmass on 0,032 kg/mol ja hapnikumolekuli pöördliikumisel on kaks vabadusastet.`,
  given: R`<b>Andmed:</b> $V = 2\ \text{m}^3$, $m = 4\ \text{kg}$, $t = -13\ ^\circ\text{C}$, $\mu = 0.032\ \text{kg/mol}$, $i_{pöörd} = 2$.<br><b>Leida:</b> $p$, $N$, $U$.`,
  formulas: FM(R`<p>Mendelejev-Clapeyroni võrrand: $pV = \frac{m}{\mu}RT$</p><p>Molekulide arv: $N = \frac{m}{\mu}N_A$</p><p>Molekuli keskmine energia: $e = \frac{3}{2}kT + \frac{i_{pöörd}}{2}kT$</p><p>Siseenergia: $U = Ne = \frac{i}{2}\frac{m}{\mu}RT$, kus $R = N_Ak$</p>`, R`<p>$T = t + 273$; $i = 3 + i_{pöörd}$</p>`),
  viz: Viz.html('dof', {}),
  steps: [
    num(R`Temperatuur kelvinites:`, 260, 'K', { label: R`T`, abs: 0.6 }),
    num(R`Hapniku rõhk:`, 1.35e5, 'Pa', { final: true, label: R`p`, alts: [{ a: 4 * 8.31 * 13 / (0.032 * 2), msg: 'Temperatuur peab olema kelvinites: $T = 260\\ \\text{K}$.' }] }),
    num(R`Molekulide arv anumas:`, 7.53e25, '', { final: true, label: R`N` }),
    mc(R`Mitu vabadusastet kokku on hapnikumolekulil?`, [R`*$i = 3 + 2 = 5$`, R`$i = 2$||2 on ainult pöördliikumise vabadusastmed. Lisaks on alati 3 kulgliikumise vabadusastet.`, R`$i = 3$||Kaheaatomiline molekul saab ka pöörelda.`]),
    num(R`Hapniku siseenergia:`, 6.75e5, 'J', { final: true, label: R`U`, alts: [{ a: 4.05e5, msg: 'See on $i = 3$ korral. Lisa pöördliikumise vabadusastmed: $i = 5$.' }, { a: 2.70e5, msg: 'See on ainult pöördliikumise energia ($i = 2$).' }] })
  ],
  sol: S(1, 'Ühikud ja moolide arv', R`<p>$T = -13 + 273 = 260\ \text{K}$, $\nu = \frac{m}{\mu} = \frac{4}{0.032} = 125\ \text{mol}$.</p>`) +
    S(2, 'Rõhk', R`$$p = \frac{mRT}{\mu V} = \frac{125\cdot 8.31\cdot 260}{2} \approx 1.35\cdot 10^5\ \text{Pa}$$`) +
    S(3, 'Molekulide arv', R`$$N = \frac{m}{\mu}N_A = 125\cdot 6.02\cdot 10^{23} \approx 7.5\cdot 10^{25}$$`) +
    S(4, 'Siseenergia', R`<p>Ühe molekuli keskmine kineetiline energia: kulgliikumine $\frac{3}{2}kT$ ja pöördliikumine $\frac{2}{2}kT$, kokku $e = \frac{5}{2}kT$. Siseenergia on molekulide arv korda ühe molekuli energia:</p>
$$U = Ne = \frac{m}{\mu}N_A\cdot\frac{5}{2}kT = \frac{5}{2}\frac{m}{\mu}RT = \frac{5}{2}\cdot 125\cdot 8.31\cdot 260 \approx 6.8\cdot 10^5\ \text{J}$$
<p>Kontroll: $U = \frac{5}{2}pV = 2.5\cdot 1.35\cdot 10^5\cdot 2 \approx 6.8\cdot 10^5\ \text{J}$.</p>`),
  ans: R`$p \approx 1.35\cdot 10^5\ \text{Pa}$, $N \approx 7.5\cdot 10^{25}$, $U \approx 0.68\ \text{MJ}$`
});

P({ id: 'v2-2', short: 'V2.2', head: 'Variant 2 · ülesanne 2', b: 15, k: 'V', src: null,
  text: R`Vooluahela otstel on pinge 220 V ja seda läbib vool tugevusega 1,1 A. Ahelasse on jadamisi ühendatud 20-oomine takisti ja lamp. Määrata lambi takistus, pinge lambi klemmidel ja lambil eralduv võimsus.`,
  fig: CK.svg(320, 120, W([[40, 50], [40, 20], [280, 20], [280, 100], [40, 100], [40, 70]], 1) + CK.term(40, 50) + CK.term(40, 70) + CK.text(18, 64, '220 V', 'up') + CK.R(140, 20, false, 'R = 20 Ω') + CK.lamp(280, 60, 'lamp, R_l', -40, 5) + `<text x="200" y="14" class="ckt up">I = 1,1 A →</text>`, 'Jadaühendus: takistit ja lampi läbib sama vool, pinged liituvad.'),
  given: R`<b>Andmed:</b> $U = 220\ \text{V}$, $I = 1.1\ \text{A}$, $R = 20\ \Omega$.<br><b>Leida:</b> $R_l$, $U_l$, $N_l$.`,
  formulas: FM(R`<p>Ohmi seadus: $I = \frac{U}{R}$</p><p>Jadaühendus: $R_{kogu} = R + R_l$, $U = U_R + U_l$, vool on sama</p><p>Võimsus: $N = UI = I^2R$</p>`),
  steps: [
    num(R`Kogu ahela takistus:`, 200, 'Ω', { label: R`R_{kogu}` }),
    num(R`Lambi takistus:`, 180, 'Ω', { final: true, label: R`R_l` }),
    num(R`Pinge lambi klemmidel:`, 198, 'V', { final: true, label: R`U_l`, alts: [{ a: 22, msg: 'See on pinge takistil. Lambil on ülejäänu: $220 - 22$.' }] }),
    num(R`Lambil eralduv võimsus:`, 217.8, 'W', { final: true, label: R`N_l`, alts: [{ a: 242, msg: 'See on kogu ahela võimsus $UI$. Lambil on $U_lI$.' }] })
  ],
  sol: S(1, 'Kogu takistus (Ohmi seadus kogu ahela kohta)', R`$$R_{kogu} = \frac{U}{I} = \frac{220}{1.1} = 200\ \Omega$$`) +
    S(2, 'Lambi takistus', R`<p>Jadaühenduses takistused liituvad: $R_l = R_{kogu} - R = 200 - 20 = 180\ \Omega$.</p>`) +
    S(3, 'Pinge lambil', R`$$U_l = IR_l = 1.1\cdot 180 = 198\ \text{V}$$<p>Kontroll: takistil $U_R = 1.1\cdot 20 = 22\ \text{V}$ ja $198 + 22 = 220\ \text{V}$.</p>`) +
    S(4, 'Lambi võimsus', R`$$N_l = U_lI = 198\cdot 1.1 \approx 218\ \text{W}$$`),
  ans: R`$R_l = 180\ \Omega$, $U_l = 198\ \text{V}$, $N_l \approx 218\ \text{W}$`
});

P({ id: 'v2-3', short: 'V2.3', head: 'Variant 2 · ülesanne 3', b: 15, k: 'V', src: null,
  text: R`Fikseeritud punktlaengust $1.1\cdot 10^{-9}$ C asub 10 cm kaugusel laetud kuulike massiga 0,04 g. Kuulikese laeng on $1.4\cdot 10^{-9}$ C. Määrata nendevaheline elektriline jõud ja nende vastasmõju potentsiaalne energia. Kui kuulike lahti lasta, hakkab ta elektriliste tõukejõudude mõjul punktlaengust eemalduma. Kui suure kiiruse saavutab ta kaugusel 1 m?`,
  fig: chargesFig('Q = 1,1 nC', 'q = 1,4 nC, m', 'r₁ = 10 cm', 'away'),
  given: R`<b>Andmed:</b> $Q = 1.1\cdot 10^{-9}\ \text{C}$, $q = 1.4\cdot 10^{-9}\ \text{C}$, $m = 0.04\ \text{g} = 4\cdot 10^{-5}\ \text{kg}$, $r_1 = 0.1\ \text{m}$, $r_2 = 1\ \text{m}$, $v_1 = 0$.<br><b>Leida:</b> $F$, $W_1$, $v_2$.`,
  formulas: FM(R`<p>Coulombi seadus: $F = \frac{|Q||q|}{4\pi\varepsilon_0r^2}$</p><p>Vastastikmõju energia: $W = \frac{Qq}{4\pi\varepsilon_0r}$</p><p>Mehaanilise energia jäävus (vaakumis): $W_1 + \frac{mv_1^2}{2} = W_2 + \frac{mv_2^2}{2}$</p>`, R`<p>Ühikud: $1\ \text{g} = 10^{-3}\ \text{kg}$, seega $0.04\ \text{g} = 4\cdot 10^{-5}\ \text{kg}$.</p>`),
  viz: Viz.html('approach', { mode: 'repel', title: 'Kuulike eemaldub', cap: R`Alguses on kuulike paigal ja kogu energia on potentsiaalne. Eemaldudes muutub potentsiaalne energia kineetiliseks. Siin on ainult kuulike liikuv, punktlaeng on kinni.` }),
  steps: [
    num(R`Elektriline jõud alguses:`, 1.385e-6, 'N', { final: true, label: R`F` }),
    num(R`Vastastikmõju potentsiaalne energia alguses:`, 1.385e-7, 'J', { final: true, label: R`W_1` }),
    num(R`Potentsiaalne energia 1 m kaugusel:`, 1.385e-8, 'J', { label: R`W_2` }),
    mc(R`Milline võrrand annab kiiruse 1 m kaugusel?`, [R`*$\frac{mv_2^2}{2} = W_1 - W_2$`, R`$\frac{mv_2^2}{2} = W_1$||See oleks lõpmata kaugel. 1 m kaugusel on veel alles $W_2$.`, R`$mv_2^2 = W_1 - W_2$||Liigub ainult kuulike, punktlaeng on fikseeritud. Kineetiline energia on $\frac{mv^2}{2}$.`]),
    num(R`Kuulikese kiirus 1 m kaugusel:`, 0.0789, 'm/s', { final: true, label: R`v_2`, alts: [{ a: 0.0832, msg: 'Nii oleks lõpmata kaugel. 1 m kaugusel on potentsiaalne energia veel $W_2$.' }, { a: 0.0789 * Math.sqrt(1000), msg: 'Mass kilogrammides: $0.04\\ \\text{g} = 4\\cdot 10^{-5}\\ \\text{kg}$.' }] })
  ],
  sol: S(1, 'Coulombi jõud', R`$$F = \frac{Qq}{4\pi\varepsilon_0r_1^2} = \frac{9\cdot 10^9\cdot 1.1\cdot 10^{-9}\cdot 1.4\cdot 10^{-9}}{0.1^2} \approx 1.4\cdot 10^{-6}\ \text{N}$$`) +
    S(2, 'Potentsiaalne energia alguses ja 1 m kaugusel', R`$$W_1 = \frac{Qq}{4\pi\varepsilon_0r_1} = \frac{9\cdot 10^9\cdot 1.54\cdot 10^{-18}}{0.1} \approx 1.39\cdot 10^{-7}\ \text{J}, \qquad W_2 = \frac{Qq}{4\pi\varepsilon_0r_2} \approx 1.39\cdot 10^{-8}\ \text{J}$$`) +
    S(3, 'Energia jäävus', R`<p>Vaakumis takistusjõude pole. Alguses on kuulike paigal ($v_1 = 0$):</p>
$$W_1 = W_2 + \frac{mv_2^2}{2} \quad\Rightarrow\quad v_2 = \sqrt{\frac{2(W_1 - W_2)}{m}} = \sqrt{\frac{2\cdot 1.25\cdot 10^{-7}}{4\cdot 10^{-5}}} \approx 0.079\ \text{m/s}$$
<p>Erinevus ülesandest 86: seal liikusid mõlemad kerad, siin ainult üks (punktlaeng on fikseeritud).</p>` + wGraph('apart', { d: 'W₁ − W₂ = mv₂²/2' })),
  ans: R`$F \approx 1.4\ \mu\text{N}$, $W_1 \approx 0.14\ \mu\text{J}$, $v_2 \approx 7.9\ \text{cm/s}$`
});

/* ===================== Variant 3 ===================== */

P({ id: 'v3-1', short: 'V3.1', head: 'Variant 3 · ülesanne 1', b: 15, k: 'V', src: null,
  text: R`Balloonis on 128 kg hapnikku rõhul 2 atm ja temperatuuril 15 °C. Hapnikku hakatakse jahutama, kuni tema lõpprõhk on 0,18 atm. Määrata hapniku ruumala, lõpptemperatuur ja siseenergia pärast jahutamist. Hapniku molaarmass on 0,032 kg/mol ja molekuli pöördliikumise vabadusastmete arv 2.`,
  given: R`<b>Andmed:</b> $m = 128\ \text{kg}$, $p_1 = 2\ \text{atm}$, $t_1 = 15\ ^\circ\text{C}$, $p_2 = 0.18\ \text{atm}$, $\mu = 0.032\ \text{kg/mol}$, $i_{pöörd} = 2$, ballooni ruumala ei muutu.<br><b>Leida:</b> $V$, $T_2$, $U_2$.`,
  formulas: FM(R`<p>Mendelejev-Clapeyroni võrrand: $pV = \frac{m}{\mu}RT$</p><p>Isokoorne protsess ($V = \text{const}$): $\frac{p_1}{T_1} = \frac{p_2}{T_2}$</p><p>Siseenergia: $U = \frac{i}{2}\frac{m}{\mu}RT = \frac{i}{2}pV$</p>`, R`<p>$1\ \text{atm} \approx 10^5\ \text{Pa}$; $T = t + 273$; $i = 3 + i_{pöörd}$</p>`),
  viz: Viz.html('pv', { proc: 'V', title: 'Isokoorne protsess ($V$ = const)', cap: R`Balloon on kinnine, ruumala ei muutu. Jahutamisel langevad rõhk ja temperatuur samas suhtes: $\frac{p}{T} = \text{const}$. Animatsioon näitab soojendamist; jahutamine on sama tee tagurpidi.` }),
  steps: [
    num(R`Moolide arv:`, 4000, 'mol', { label: R`\nu` }),
    num(R`Ballooni ruumala:`, 47.9, 'm³', { final: true, label: R`V`, alts: [{ a: 4000 * 8.31 * 15 / 2e5, msg: 'Temperatuur kelvinites: $T_1 = 288\\ \\text{K}$.' }] }),
    mc(R`Balloon on kinnine. Kuidas leida lõpptemperatuur?`, [R`*$T_2 = T_1\frac{p_2}{p_1}$`, R`$T_2 = T_1\frac{p_1}{p_2}$||Jahutamisel temperatuur langeb, rõhk samuti.`, R`$T_2 = T_1 - (p_1 - p_2)$||Rõhk ja temperatuur on võrdelised, mitte nii lahutatavad.`]),
    num(R`Lõpptemperatuur:`, 25.9, 'K', { final: true, label: R`T_2`, alts: [{ a: 1.35, msg: 'Kasuta kelvineid: $T_1 = 288\\ \\text{K}$, mitte 15 °C.' }] }),
    num(R`Siseenergia pärast jahutamist:`, 2.15e6, 'J', { final: true, label: R`U_2`, alts: [{ a: 1.29e6, msg: 'Hapnikul on $i = 3 + 2 = 5$.' }, { a: 2.39e7, msg: 'See on siseenergia enne jahutamist. Kasuta lõpptemperatuuri.' }] })
  ],
  sol: S(1, 'Ühikud', R`<p>$p_1 = 2\cdot 10^5\ \text{Pa}$, $p_2 = 0.18\cdot 10^5\ \text{Pa}$, $T_1 = 288\ \text{K}$, $\nu = \frac{128}{0.032} = 4000\ \text{mol}$.</p>`) +
    S(2, 'Ruumala algolekust', R`$$V = \frac{mRT_1}{\mu p_1} = \frac{4000\cdot 8.31\cdot 288}{2\cdot 10^5} \approx 48\ \text{m}^3$$`) +
    S(3, 'Lõpptemperatuur (isokoorne protsess)', R`<p>Clapeyroni võrrandist $\frac{p_1V_1}{T_1} = \frac{p_2V_2}{T_2}$ ja $V_1 = V_2$:</p>$$T_2 = T_1\frac{p_2}{p_1} = 288\cdot\frac{0.18}{2} \approx 26\ \text{K}$$`) +
    S(4, 'Siseenergia pärast jahutamist', R`<p>Hapnikul $i = 3 + 2 = 5$:</p>$$U_2 = \frac{5}{2}\frac{m}{\mu}RT_2 = \frac{5}{2}\cdot 4000\cdot 8.31\cdot 25.9 \approx 2.2\cdot 10^6\ \text{J}$$<p>Kontroll: $U_2 = \frac{5}{2}p_2V = 2.5\cdot 1.8\cdot 10^4\cdot 47.9 \approx 2.2\cdot 10^6\ \text{J}$.</p>`),
  ans: R`$V \approx 48\ \text{m}^3$, $T_2 \approx 26\ \text{K}$, $U_2 \approx 2.2\ \text{MJ}$`,
  after: R`Kui võtta $1\ \text{atm} = 101.3\ \text{kPa}$, tuleb ruumala 47 m³. Siseenergia ja temperatuur sellest ei sõltu.`
});

P({ id: 'v3-2', short: 'V3.2', head: 'Variant 3 · ülesanne 2', b: 15, k: 'V', src: null,
  text: R`Elektromotoorjõu allikaga, mille elektromotoorjõud on 2 V, on ühendatud rööbiti kaks lampi. Ühe lambi takistus on 6 Ω, teise lambi takistus 3 Ω. Elektromotoorjõu allikat läbib vool tugevusega 0,5 A. Määrata elektromotoorjõu allika takistus, pinge lampide klemmidel ja lampide summaarne võimsus.`,
  fig: src(W([[120, 20], [220, 20]], 1) + W([[220, 20], [220, 60], [300, 60], [300, 82]], 0.33) + W([[220, 20], [220, 82]], 0.67) + W([[220, 82], [220, 120]], 0.67) + W([[300, 82], [300, 120], [220, 120]], 0.33) + W([[220, 120], [220, 145], [120, 145]], 1) +
    CK.lamp(220, 82, '3 Ω', -28, 5) + CK.lamp(300, 82, '6 Ω', 30, 5) + CK.dot(220, 20) + CK.dot(220, 120), 170, 'Lambid rööbiti; allikat läbib koguvool 0,5 A. Väiksema takistusega lambist läheb rohkem voolu.', 'ε = 2 V'),
  given: R`<b>Andmed:</b> $\varepsilon = 2\ \text{V}$, $R_1 = 6\ \Omega$, $R_2 = 3\ \Omega$ (rööbiti), $I = 0.5\ \text{A}$.<br><b>Leida:</b> $r$, $U$, $N$.`,
  formulas: FM(R`<p>Rööpühendus: $\frac{1}{R} = \frac{1}{R_1} + \frac{1}{R_2}$, pinge on mõlemal lambil sama</p><p>Ohmi seadus suletud ahela kohta: $I = \frac{\varepsilon}{R + r}$</p><p>$U = IR$, $N = UI$</p>`, R`<p>Kahe takisti rööpühenduse lühivalem (tuleb ülemisest): $R = \frac{R_1R_2}{R_1 + R_2}$</p>`),
  steps: [
    num(R`Lampide rööpühenduse takistus:`, 2, 'Ω', { label: R`R`, alts: [{ a: 9, msg: 'Nii oleks jadaühenduses. Rööbiti liidetakse pöördväärtused.' }] }),
    num(R`Allika sisetakistus:`, 2, 'Ω', { final: true, label: R`r`, hint: R`$r = \frac{\varepsilon}{I} - R$` }),
    num(R`Pinge lampide klemmidel:`, 1, 'V', { final: true, label: R`U`, alts: [{ a: 2, msg: 'See on elektromotoorjõud. Pool sellest langeb allika sees ($Ir = 1\\ \\text{V}$).' }] }),
    num(R`Lampide summaarne võimsus:`, 0.5, 'W', { final: true, label: R`N`, alts: [{ a: 1, msg: 'See on allika koguvõimsus $\\varepsilon I$.' }] })
  ],
  sol: S(1, 'Lampide kogutakistus', R`$$\frac{1}{R} = \frac{1}{6} + \frac{1}{3} = \frac{1}{2} \Rightarrow R = 2\ \Omega$$`) +
    S(2, 'Sisetakistus (Ohmi seadus suletud ahela kohta)', R`$$I = \frac{\varepsilon}{R + r} \Rightarrow r = \frac{\varepsilon}{I} - R = \frac{2}{0.5} - 2 = 2\ \Omega$$`) +
    S(3, 'Pinge lampidel', R`$$U = IR = 0.5\cdot 2 = 1\ \text{V}$$<p>Rööpühenduses on mõlemal lambil sama pinge 1 V. Voolud: $\frac{1}{6} \approx 0.17\ \text{A}$ ja $\frac{1}{3} \approx 0.33\ \text{A}$, kokku 0,5 A.</p>`) +
    S(4, 'Summaarne võimsus', R`$$N = UI = 1\cdot 0.5 = 0.5\ \text{W}$$<p>Kontroll: $\frac{U^2}{R_1} + \frac{U^2}{R_2} = \frac{1}{6} + \frac{1}{3} = 0.5\ \text{W}$.</p>`),
  ans: R`$r = 2\ \Omega$, $U = 1\ \text{V}$, $N = 0.5\ \text{W}$`
});

P({ id: 'v3-3', short: 'V3.3', head: 'Variant 3 · ülesanne 3', b: 15, k: 'V', src: null,
  text: R`Punktlaeng $1.4\cdot 10^{-9}$ C on fikseeritud. Sellest laengust 1 m kaugusel asub kuulike, mille laeng on $10^{-9}$ C ja mass 0,04 g. Kuulike hakkab punktlaengule lähenema algkiirusega 10 cm/s. Määrata punktlaengu ja kuulikese vahel mõjuv jõud enne liikuma hakkamist ja minimaalne kaugus, milleni kuulike võib punktlaengule läheneda.`,
  fig: chargesFig('Q = 1,4 nC', 'q = 1 nC, m', 'r₀ = 1 m', 'toward'),
  given: R`<b>Andmed:</b> $Q = 1.4\cdot 10^{-9}\ \text{C}$, $q = 10^{-9}\ \text{C}$, $m = 4\cdot 10^{-5}\ \text{kg}$, $r_0 = 1\ \text{m}$, $v_0 = 0.1\ \text{m/s}$.<br><b>Leida:</b> $F_0$, $r_{min}$.`,
  formulas: FM(R`<p>Coulombi seadus: $F = \frac{|Q||q|}{4\pi\varepsilon_0r^2}$</p><p>Vastastikmõju energia: $W = \frac{Qq}{4\pi\varepsilon_0r}$</p><p>Energia jäävus: $\frac{mv_0^2}{2} + W_0 = \frac{mv^2}{2} + W$</p>`, R`<p>Lähimas punktis kuulike hetkeks peatub: $v = 0$ (pärast seda tõukab laeng ta tagasi).</p><p>$1\ \text{cm/s} = 0.01\ \text{m/s}$</p>`),
  viz: Viz.html('approach', { title: 'Kuulike läheneb tõukuvale laengule', cap: R`Kineetiline energia muutub potentsiaalseks. Lähimas punktis on kiirus null ja kogu energia on potentsiaalne. Siin liigub ainult kuulike.` }),
  steps: [
    num(R`Jõud enne liikuma hakkamist:`, 1.259e-8, 'N', { final: true, label: R`F_0` }),
    num(R`Kuulikese algne kineetiline energia:`, 2e-7, 'J', { label: R`E_{k0}`, alts: [{ a: 2e-3, msg: 'Kiirus meetrites sekundis: $10\\ \\text{cm/s} = 0.1\\ \\text{m/s}$.' }, { a: 2e-4, msg: 'Mass kilogrammides: $0.04\\ \\text{g} = 4\\cdot 10^{-5}\\ \\text{kg}$.' }] }),
    num(R`Potentsiaalne energia algasendis:`, 1.259e-8, 'J', { label: R`W_0` }),
    mc(R`Milline võrrand annab minimaalse kauguse?`, [R`*$\frac{mv_0^2}{2} + \frac{Qq}{4\pi\varepsilon_0r_0} = \frac{Qq}{4\pi\varepsilon_0r_{min}}$`, R`$\frac{mv_0^2}{2} = \frac{Qq}{4\pi\varepsilon_0r_{min}}$||See kehtiks, kui kuulike tuleks lõpmatusest. Siin on algasendis juba potentsiaalne energia $W_0$.`, R`$\frac{mv_0^2}{2} = \frac{Qq}{4\pi\varepsilon_0r_{min}^2}$||Paremal peab olema energia, mitte jõud.`]),
    num(R`Minimaalne kaugus:`, 0.0592, 'm', { final: true, label: R`r_{min}`, alts: [{ a: 0.0629, msg: 'Unustasid algasendi potentsiaalse energia $W_0$ (nii oleks lõpmatusest tulles, vt ülesanne 83).' }] })
  ],
  sol: S(1, 'Jõud algasendis', R`$$F_0 = \frac{Qq}{4\pi\varepsilon_0r_0^2} = \frac{9\cdot 10^9\cdot 1.4\cdot 10^{-9}\cdot 10^{-9}}{1^2} \approx 1.26\cdot 10^{-8}\ \text{N}$$`) +
    S(2, 'Energiad algasendis', R`$$E_{k0} = \frac{mv_0^2}{2} = \frac{4\cdot 10^{-5}\cdot 0.1^2}{2} = 2\cdot 10^{-7}\ \text{J}, \qquad W_0 = \frac{Qq}{4\pi\varepsilon_0r_0} \approx 1.26\cdot 10^{-8}\ \text{J}$$`) +
    S(3, 'Energia jäävus lähimas punktis', R`<p>Lähimas punktis kuulike peatub ($v = 0$), kogu energia on potentsiaalne:</p>
$$E_{k0} + W_0 = \frac{Qq}{4\pi\varepsilon_0r_{min}} \quad\Rightarrow\quad r_{min} = \frac{Qq}{4\pi\varepsilon_0(E_{k0} + W_0)} = \frac{1.26\cdot 10^{-8}}{2\cdot 10^{-7} + 1.26\cdot 10^{-8}} \approx 0.059\ \text{m}$$
<p>Graafikul: kogu energia $E$ on horisontaalne joon. Kuulike saab liikuda ainult seal, kus $W(r) \le E$. Joone ja kõvera lõikepunkt on $r_{min}$.</p>` + wGraph('approach', { cap: 'kogu energia E = Eₖ₀ + W₀; lõikepunktis Eₖ = 0' })),
  ans: R`$F_0 \approx 1.3\cdot 10^{-8}\ \text{N}$, $r_{min} \approx 5.9\ \text{cm}$`
});

/* ===================== Variant 4 ===================== */

P({ id: 'v4-1', short: 'V4.1', head: 'Variant 4 · ülesanne 1', b: 15, k: 'V', src: null,
  text: R`Balloonis ruumalaga 10 liitrit on 1,32 kg süsihappegaasi rõhul 50 atm. Gaasi temperatuuri tõstetakse 50 kraadi võrra. Määrata gaasi siseenergia, rõhk pärast kuumutamist, gaasile kuumutamisel antud soojushulk ja molekulide arv balloonis. Süsihappegaasi molaarmass on 0,044 kg/mol ja molekuli pöördliikumise vabadusastmete arv 2.`,
  given: R`<b>Andmed:</b> $V = 10\ \text{L} = 0.01\ \text{m}^3$, $m = 1.32\ \text{kg}$, $p_1 = 50\ \text{atm} = 5\cdot 10^6\ \text{Pa}$, $\Delta T = 50\ \text{K}$, $\mu = 0.044\ \text{kg/mol}$, $i_{pöörd} = 2$, $V = \text{const}$.<br><b>Leida:</b> $U_1$, $p_2$, $Q$, $N$.`,
  formulas: FM(R`<p>Siseenergia: $U = \frac{i}{2}\frac{m}{\mu}RT = \frac{i}{2}pV$</p><p>Mendelejev-Clapeyron: $pV = \frac{m}{\mu}RT$</p><p>I seadus: $Q = \Delta U + A$, isokoorsel protsessil $A = 0$</p><p>$N = \frac{m}{\mu}N_A$</p>`, R`<p>Temperatuuri muut kraadides ja kelvinites on sama: $\Delta T = 50\ \text{K}$.</p><p>$1\ \text{atm} \approx 10^5\ \text{Pa}$; $i = 3 + 2 = 5$</p>`),
  viz: Viz.html('pv', { proc: 'V', title: 'Kuumutamine jääval ruumalal', cap: R`Ruumala ei muutu, gaas tööd ei tee ($A = 0$). Kogu antud soojus läheb siseenergiaks: $Q = \Delta U$. Rõhk kasvab.` }),
  steps: [
    num(R`Gaasi siseenergia alguses ($U = \frac{i}{2}pV$):`, 1.25e5, 'J', { final: true, label: R`U_1`, alts: [{ a: 1.5e5, msg: 'See on $i = 6$ korral. CO₂ on lineaarne: $i = 3 + 2 = 5$.' }] }),
    num(R`Moolide arv:`, 30, 'mol', { label: R`\nu` }),
    num(R`Rõhu kasv ($\Delta p = \frac{\nu R\Delta T}{V}$):`, 1.247e6, 'Pa', { label: R`\Delta p` }),
    num(R`Rõhk pärast kuumutamist:`, 6.25e6, 'Pa', { final: true, label: R`p_2` }),
    mc(R`Kuhu läheb kuumutamisel antud soojus?`, [R`*Kogu siseenergiaks, sest $V = \text{const}$ ja $A = 0$`, R`Osa tööks, osa siseenergiaks||Töö oleks siis, kui ruumala muutuks. Balloon on kinnine.`, R`Kogu tööks||Siis temperatuur ei tõuseks.`]),
    num(R`Antud soojushulk:`, 3.12e4, 'J', { final: true, label: R`Q`, alts: [{ a: 4.36e4, msg: 'See on $Q$ jääval rõhul ($\\frac{7}{2}\\nu R\\Delta T$). Siin on ruumala konstantne, $Q = \\frac{5}{2}\\nu R\\Delta T$.' }] }),
    num(R`Molekulide arv balloonis:`, 1.806e25, '', { final: true, label: R`N` })
  ],
  sol: S(1, 'Algne siseenergia', R`<p>CO₂ on lineaarne molekul (O−C−O): $i = 3 + 2 = 5$. Mendelejev-Clapeyroni võrrandist $\frac{m}{\mu}RT = pV$:</p>$$U_1 = \frac{5}{2}p_1V = \frac{5}{2}\cdot 5\cdot 10^6\cdot 0.01 = 1.25\cdot 10^5\ \text{J}$$`) +
    S(2, 'Rõhk pärast kuumutamist', R`<p>$\nu = \frac{1.32}{0.044} = 30\ \text{mol}$. Jääval ruumalal $p_2V - p_1V = \nu R\Delta T$:</p>
$$\Delta p = \frac{\nu R\Delta T}{V} = \frac{30\cdot 8.31\cdot 50}{0.01} \approx 1.25\cdot 10^6\ \text{Pa}, \qquad p_2 = p_1 + \Delta p \approx 6.25\cdot 10^6\ \text{Pa}$$
<p>(Võib ka nii: $T_1 = \frac{p_1V}{\nu R} \approx 201\ \text{K}$, $T_2 = 251\ \text{K}$, $p_2 = p_1\frac{T_2}{T_1}$.)</p>`) +
    S(3, 'Soojushulk', R`<p>Ruumala ei muutu, seega $A = 0$ ja I seadusest $Q = \Delta U$:</p>$$Q = \frac{5}{2}\nu R\Delta T = \frac{5}{2}\cdot 30\cdot 8.31\cdot 50 \approx 3.1\cdot 10^4\ \text{J}$$`) +
    S(4, 'Molekulide arv', R`$$N = \nu N_A = 30\cdot 6.02\cdot 10^{23} \approx 1.8\cdot 10^{25}$$`),
  ans: R`$U_1 = 125\ \text{kJ}$, $p_2 \approx 6.2\ \text{MPa}$ (umbes 62 atm), $Q \approx 31\ \text{kJ}$, $N \approx 1.8\cdot 10^{25}$`
});

P({ id: 'v4-2', short: 'V4.2', head: 'Variant 4 · ülesanne 2', b: 15, k: 'V', src: null,
  text: R`Fikseeritud punktlaengust 0,3 nC asub 1 cm kaugusel paigalolev prooton. Prootoni mass on $1.67\cdot 10^{-27}$ kg ja laeng $1.6\cdot 10^{-19}$ C. Elektriliste tõukejõudude mõjul hakkab prooton punktlaengust eemalduma. Määrata elektriliste jõudude töö prootoni liikumisel 1 m kaugusele, prootoni kiirus sellel kaugusel ja kiirus, mille prooton saavutab lõpmata kaugel.`,
  fig: chargesFig('Q = 0,3 nC', 'prooton', 'r₁ = 1 cm', 'away'),
  given: R`<b>Andmed:</b> $Q = 0.3\cdot 10^{-9}\ \text{C}$, $e = 1.6\cdot 10^{-19}\ \text{C}$, $m = 1.67\cdot 10^{-27}\ \text{kg}$, $r_1 = 0.01\ \text{m}$, $r_2 = 1\ \text{m}$, $v_1 = 0$.<br><b>Leida:</b> $A_{el}$, $v_2$, $v_\infty$.`,
  formulas: FM(R`<p>Punktlaengu potentsiaal: $\varphi = \frac{Q}{4\pi\varepsilon_0r}$</p><p>Elektriliste jõudude töö: $A_{el} = e(\varphi_1 - \varphi_2)$</p><p>Kineetilise energia muut on töö: $\frac{mv^2}{2} = A_{el}$</p>`, R`<p>Lõpmatuses $\frac{1}{r} \to 0$, seega $\varphi_\infty = 0$.</p>`),
  steps: [
    num(R`Potentsiaal prootoni algasukohas:`, 269.7, 'V', { label: R`\varphi_1` }),
    num(R`Elektriliste jõudude töö 1 m kaugusele liikumisel:`, 4.27e-17, 'J', { final: true, label: R`A_{el}`, alts: [{ a: -4.27e-17, msg: 'Tõukejõud teevad eemaldumisel positiivset tööd.' }] }),
    num(R`Prootoni kiirus 1 m kaugusel:`, 2.26e5, 'm/s', { final: true, label: R`v_2` }),
    num(R`Prootoni kiirus lõpmata kaugel:`, 2.27e5, 'm/s', { final: true, label: R`v_\infty`, tol: 0.004, alts: [{ a: 2.26e5, msg: 'See on 1 m kaugusel. Lõpmatuses on $\\varphi = 0$, töö veidi suurem.' }] }),
    mc(R`Miks on kiirused 1 m kaugusel ja lõpmatuses peaaegu võrdsed?`, [R`*Peaaegu kogu potentsiaalne energia muutub kineetiliseks juba esimesel meetril: $\frac{1}{0.01} = 100 \gg \frac{1}{1} = 1$`, R`Prooton liigub ühtlaselt||Prooton kiireneb, aga jõud kahaneb kiiresti ($\sim 1/r^2$).`])
  ],
  sol: S(1, 'Potentsiaalid', R`$$\varphi_1 = \frac{Q}{4\pi\varepsilon_0r_1} = \frac{9\cdot 10^9\cdot 0.3\cdot 10^{-9}}{0.01} = 270\ \text{V}, \qquad \varphi_2 = \frac{2.7}{1} = 2.7\ \text{V}$$`) +
    S(2, 'Elektriliste jõudude töö', R`$$A_{el} = e(\varphi_1 - \varphi_2) = 1.6\cdot 10^{-19}\cdot(270 - 2.7) \approx 4.3\cdot 10^{-17}\ \text{J}$$<p>Töö on positiivne: tõukejõud on liikumise suunas.</p>`) +
    S(3, 'Kiirus 1 m kaugusel (energia jäävus)', R`$$\frac{mv_2^2}{2} = A_{el} \Rightarrow v_2 = \sqrt{\frac{2A_{el}}{m}} = \sqrt{\frac{2\cdot 4.27\cdot 10^{-17}}{1.67\cdot 10^{-27}}} \approx 2.26\cdot 10^5\ \text{m/s}$$`) +
    S(4, 'Kiirus lõpmatuses', R`<p>$\varphi_\infty = 0$, seega $A_\infty = e\varphi_1 = 4.32\cdot 10^{-17}\ \text{J}$:</p>$$v_\infty = \sqrt{\frac{2e\varphi_1}{m}} \approx 2.27\cdot 10^5\ \text{m/s}$$` + wGraph('inf', { d: 'W₁ − W₂ = A_el = mv²/2' })),
  ans: R`$A_{el} \approx 4.3\cdot 10^{-17}\ \text{J}$, $v_2 \approx 2.26\cdot 10^5\ \text{m/s}$, $v_\infty \approx 2.27\cdot 10^5\ \text{m/s}$`
});

function fig43(withFlow) {
  const f = withFlow ? 1 : 0;
  return CK.svg(340, 230, W([[60, 40], [60, 20], [300, 20], [300, 75]], f && 1) + W([[300, 115], [300, 150], [250, 150]], f && 1) +
    W([[250, 150], [250, 110], [180, 110], [110, 110], [110, 150]], f && 0.33) + W([[250, 150], [250, 190], [110, 190], [110, 150]], f && 0.67) +
    W([[110, 150], [60, 150], [60, 110]], f && 1) + W([[60, 40], [60, 110]], 0) + W([[300, 75], [300, 115]], 0) +
    CK.bat(160, 20, 'l', 'ε = 6 V, r', 0, 36) +
    CK.R(60, 85, true, 'R₁ = 10 Ω') + CK.R(180, 110, false, 'R₂ = 60 Ω') + CK.R(180, 190, false, 'R₃ = 30 Ω', 0, 26) + CK.meter(300, 95, 'A') + CK.dot(110, 150) + CK.dot(250, 150),
    'R₂ ja R₃ rööbiti, nendega jadamisi R₁ ja ampermeeter. Ampermeeter mõõdab koguvoolu.');
}
P({ id: 'v4-3', short: 'V4.3', head: 'Variant 4 · ülesanne 3', b: 15, k: 'V', src: null,
  text: R`Elektriline skeem on koostatud nii nagu joonisel. Tarbijate takistused on $R_1 = 10\ \Omega$, $R_2 = 60\ \Omega$ ja $R_3 = 30\ \Omega$. Tarbijat $R_3$ läbib vool tugevusega 0,1 A. Ampermeetri ja ühendusjuhtmete takistus on tähtsusetult väike. Elektromotoorjõud on 6 V. Määrata ampermeetrit läbiv voolutugevus, allika sisetakistus, kõigil kolmel tarbijal eralduv summaarne võimsus ja vooluahela kasutegur.`,
  fig: fig43(true),
  given: R`<b>Andmed:</b> $R_1 = 10\ \Omega$, $R_2 = 60\ \Omega$, $R_3 = 30\ \Omega$, $I_3 = 0.1\ \text{A}$, $\varepsilon = 6\ \text{V}$, $R_A = 0$.<br><b>Leida:</b> $I$, $r$, $N$, $\eta$.`,
  formulas: FM(R`<p>Ohmi seadus: $U = IR$; rööpühenduses pinge sama, voolud liituvad (Kirchhoffi I seadus: $I = I_2 + I_3$)</p><p>Jadaühendus: $R = R_1 + R_{23}$</p><p>Ohmi seadus suletud ahela kohta: $I = \frac{\varepsilon}{R + r}$</p><p>$N = I^2R$, $\eta = \frac{N_{kas}}{N_{kogu}} = \frac{R}{R + r}$</p>`, R`<p>$R_{23} = \frac{R_2R_3}{R_2 + R_3}$ (kahe takisti rööpühendus)</p><p>Skeemilt: ampermeeter on harude ühinemiskohast väljaspool, seega mõõdab koguvoolu.</p>`),
  steps: [
    num(R`Pinge rööpühendusel ($U_{23} = I_3R_3$):`, 3, 'V', { label: R`U_{23}` }),
    num(R`Vool läbi $R_2$:`, 0.05, 'A', { label: R`I_2` }),
    num(R`Ampermeetrit läbiv vool:`, 0.15, 'A', { final: true, label: R`I`, alts: [{ a: 0.1, msg: 'See on ainult $R_3$ vool. Ampermeeter mõõdab koguvoolu $I_2 + I_3$.' }] }),
    num(R`Välisahela kogutakistus:`, 30, 'Ω', { label: R`R`, alts: [{ a: 100, msg: '$R_2$ ja $R_3$ on rööbiti, mitte jadamisi.' }] }),
    num(R`Allika sisetakistus:`, 10, 'Ω', { final: true, label: R`r` }),
    num(R`Tarbijatel eralduv summaarne võimsus:`, 0.675, 'W', { final: true, label: R`N`, alts: [{ a: 0.9, msg: 'See on koguvõimsus $\\varepsilon I$. Tarbijatel eraldub $I^2R$.' }] }),
    num(R`Vooluahela kasutegur:`, 75, '%', { final: true, label: R`\eta`, alts: [{ a: 0.75, msg: 'Kirjuta protsentides, näiteks 75.' }] })
  ],
  sol: S(1, 'Rööpühenduse pinge ja voolud', R`<p>$R_2$ ja $R_3$ on rööbiti, neil on sama pinge:</p>$$U_{23} = I_3R_3 = 0.1\cdot 30 = 3\ \text{V}, \qquad I_2 = \frac{U_{23}}{R_2} = \frac{3}{60} = 0.05\ \text{A}$$`) +
    S(2, 'Ampermeetri vool (Kirchhoffi I seadus)', R`<p>Sõlmes harud ühinevad: $I = I_2 + I_3 = 0.15\ \text{A}$. Ampermeeter on harudest väljaspool, ta mõõdab just seda koguvoolu.</p>`) +
    S(3, 'Sisetakistus', R`$$R_{23} = \frac{60\cdot 30}{90} = 20\ \Omega, \quad R = R_1 + R_{23} = 30\ \Omega, \quad r = \frac{\varepsilon}{I} - R = \frac{6}{0.15} - 30 = 10\ \Omega$$`) +
    S(4, 'Võimsus ja kasutegur', R`$$N = I^2R = 0.15^2\cdot 30 \approx 0.68\ \text{W}, \qquad N_{kogu} = \varepsilon I = 0.9\ \text{W}, \qquad \eta = \frac{N}{N_{kogu}} = \frac{R}{R + r} = \frac{30}{40} = 75\%$$
<p>Kontroll tarbijate kaupa: $R_1$: $0.15^2\cdot 10 = 0.225\ \text{W}$, $R_2$: $3\cdot 0.05 = 0.15\ \text{W}$, $R_3$: $3\cdot 0.1 = 0.3\ \text{W}$, kokku 0,675 W.</p>`),
  ans: R`$I = 0.15\ \text{A}$, $r = 10\ \Omega$, $N \approx 0.68\ \text{W}$, $\eta = 75\%$`
});
})();
