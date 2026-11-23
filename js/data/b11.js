/* 11. Elektrivälja tugevus ja potentsiaal (kogu II). Tunnis: 21b, 23, 63, 70, 79. Kodus: 21a, 22, 57, 71, 80. */
(function () {
const R = String.raw;

function Q(x, y, s, lab, lx, ly) {
  return `<circle cx="${x}" cy="${y}" r="11" class="${s > 0 ? 'pos' : 'neg'}"/><text x="${x}" y="${y + 5}" text-anchor="middle" class="q">${s > 0 ? '+' : '−'}</text>` +
    (lab ? `<text x="${x + (lx || 0)}" y="${y + (ly != null ? ly : 28)}" text-anchor="middle">${lab}</text>` : '');
}
const lineFig = (s1, s2, l1, l2) => `<svg viewBox="0 0 340 80" class="gsvg"><line x1="20" y1="35" x2="320" y2="35" class="dash"/>` + Q(110, 35, s1, l1) + Q(230, 35, s2, l2) +
  `<line x1="110" y1="68" x2="230" y2="68" class="thin"/><text x="170" y="64" text-anchor="middle">d</text></svg>`;

const field21 = (sameSign) => Viz.html('field', { w: 380, h: 220, per: 8,
  charges: sameSign ? [{ x: 150, y: 110, q: 2, l: 'q₁', r: 13 }, { x: 250, y: 110, q: 1, l: 'q₂' }] : [{ x: 150, y: 110, q: 2, l: 'q₁ > 0', r: 13 }, { x: 250, y: 110, q: -1, l: 'q₂ < 0' }],
  probe: sameSign ? [200, 40] : [330, 60],
  cap: sameSign ? R`Lohista proovilaengut piki laenguid ühendavat sirget. Samamärgiliste laengute vahel on väljad vastassuunalised ja ühes punktis (väiksemale laengule lähemal) kustutavad teineteist.`
    : R`Erimärgiliste laengute vahel on väljad samasuunalised (positiivsest negatiivse poole). Null-punkt on väljaspool, väiksema laengu taga.` });

const where21 = (same) => mc(R`Kus saab olla punkt, kus summaarne väljatugevus on null?`,
  same ? [R`*Laengute vahel, väiksemale laengule lähemal`, R`Väljaspool laenguid||Väljaspool on mõlemad väljad samasuunalised (mõlemast laengust eemale).`, R`Täpselt keskel||Keskel on väljad võrdsed ainult siis, kui laengud on võrdsed.`]
    : [R`*Väljaspool laenguid, absoluutväärtuselt väiksema laengu taga`, R`Laengute vahel||Seal on mõlemad väljad suunatud negatiivse laengu poole, need liituvad.`, R`Suurema laengu taga||Seal on suurem laeng ka lähemal, tema väli on alati tugevam.`],
  same ? R`Laengute vahel on positiivsete laengute väljad suunatud teineteisele vastu.` : R`Positiivse laengu väli on temast eemale, negatiivse laengu väli tema poole.`);

P({ id: '21a', b: 11, k: 'K',
  text: R`Määrata punkt, kus kahe teineteisest kaugusel $d$ asetseva punktlaengu $q_1$ ja $q_2$ elektrivälja tugevus on null. Laengud võivad olla nii sama- kui ka erimärgilised. <b>a) Laengud on samamärgilised.</b>`,
  fig: lineFig(1, 1, 'q₁', 'q₂'),
  given: R`<b>Andmed:</b> $q_1$, $q_2$ (sama märgiga), $|q_1| > |q_2|$, vahekaugus $d$.<br><b>Leida:</b> kaugus $x$ laengust $q_1$.`,
  steps: [
    Object.assign(where21(true), { ex: R`Laengute vahel on positiivsete laengute väljad suunatud teineteisele vastu.` + field21(true) }),
    mc(R`Olgu otsitav punkt laengust $q_1$ kaugusel $x$. Milline võrrand?`, [R`*$\frac{|q_1|}{x^2} = \frac{|q_2|}{(d - x)^2}$`, R`$\frac{|q_1|}{x^2} = \frac{|q_2|}{(d + x)^2}$||Punkt on laengute vahel, kaugus teisest laengust on $d - x$.`, R`$\frac{|q_1|}{x} = \frac{|q_2|}{d - x}$||Väljatugevus on pöördvõrdeline kauguse ruuduga.`]),
    mc(R`Võta ruutjuur ja avalda $x$:`, [R`*$x = \frac{\sqrt{|q_1|}}{\sqrt{|q_1|} + \sqrt{|q_2|}}\,d$`, R`$x = \frac{|q_1|}{|q_1| + |q_2|}\,d$||Võrrandis on kauguste ruudud, seega ruutjuured laengutest.`, R`$x = \frac{\sqrt{|q_2|}}{\sqrt{|q_1|} + \sqrt{|q_2|}}\,d$||Kontrolli: punkt peab olema väiksemale laengule lähemal, s.t. suuremast laengust kaugemal ($x > d/2$).`])
  ],
  sol: R`Samamärgiliste laengute vahel on väljad vastassuunalised. Punktis kaugusel $x$ laengust $q_1$ peavad moodulid olema võrdsed:
$$\frac{|q_1|}{4\pi\varepsilon_0x^2} = \frac{|q_2|}{4\pi\varepsilon_0(d - x)^2} \quad\Rightarrow\quad \frac{d - x}{x} = \sqrt{\frac{|q_2|}{|q_1|}} \quad\Rightarrow\quad x = \frac{\sqrt{|q_1|}}{\sqrt{|q_1|} + \sqrt{|q_2|}}\,d$$
Raamatu kujul: $x = \frac{|q_1| - \sqrt{|q_1q_2|}}{|q_1| - |q_2|}\,d$ (sama asi, korruta lugeja ja nimetaja läbi).`,
  ans: R`Laengute vahel, kaugusel $x = \frac{\sqrt{|q_1|}\,d}{\sqrt{|q_1|} + \sqrt{|q_2|}}$ laengust $q_1$.`
});

P({ id: '21b', b: 11, k: 'T',
  text: R`Määrata punkt, kus kahe teineteisest kaugusel $d$ asetseva punktlaengu $q_1$ ja $q_2$ elektrivälja tugevus on null. Laengud võivad olla nii sama- kui ka erimärgilised. <b>b) Laengud on erimärgilised.</b>`,
  fig: lineFig(1, -1, 'q₁ > 0', 'q₂ < 0'),
  given: R`<b>Andmed:</b> $q_1 > 0$, $q_2 < 0$, $|q_1| > |q_2|$, vahekaugus $d$.<br><b>Leida:</b> kaugus $r$ laengust $q_2$.`,
  steps: [
    Object.assign(where21(false), { ex: R`Positiivse laengu väli on temast eemale, negatiivse laengu väli tema poole.` + field21(false) }),
    mc(R`Olgu punkt laengust $q_2$ kaugusel $r$ (laengust $q_1$ kaugusel $d + r$). Võrrand:`, [R`*$\frac{|q_1|}{(d + r)^2} = \frac{|q_2|}{r^2}$`, R`$\frac{|q_1|}{(d - r)^2} = \frac{|q_2|}{r^2}$||Punkt on väljaspool, $q_1$ on kaugemal kui $d$.`, R`$\frac{|q_1|}{r^2} = \frac{|q_2|}{(d + r)^2}$||Vaata, kumb laeng on punktile lähemal.`]),
    mc(R`Lahendus ($r > 0$):`, [R`*$r = \frac{\sqrt{|q_2|}}{\sqrt{|q_1|} - \sqrt{|q_2|}}\,d$`, R`$r = \frac{\sqrt{|q_2|}}{\sqrt{|q_1|} + \sqrt{|q_2|}}\,d$||See oleks punkt laengute vahel.`, R`$r = \frac{|q_2|}{|q_1| - |q_2|}\,d$||Ruutvõrrandi lahendis on ruutjuured laengutest.`], R`Ruutvõrrandi $(|q_1| - |q_2|)r^2 - 2|q_2|dr - |q_2|d^2 = 0$ miinusmärgiga lahend on negatiivne, see ei sobi.`)
  ],
  sol: R`Laengute vahel on mõlemad väljad suunatud negatiivse laengu poole ja ei saa teineteist kustutada. Väljaspool, väiksema laengu $q_2$ taga, on väljad vastassuunalised:
$$\frac{|q_1|}{(d + r)^2} = \frac{|q_2|}{r^2} \quad\Rightarrow\quad (|q_1| - |q_2|)r^2 - 2|q_2|dr - |q_2|d^2 = 0$$
$$r = \frac{|q_2| \pm\sqrt{|q_1q_2|}}{|q_1| - |q_2|}\,d$$
Miinusmärk annab $r < 0$, seega $r = \frac{|q_2| + \sqrt{|q_1q_2|}}{|q_1| - |q_2|}d = \frac{\sqrt{|q_2|}}{\sqrt{|q_1|} - \sqrt{|q_2|}}d$.`,
  ans: R`Väljaspool laenguid, väiksema laengu taga kaugusel $r = \frac{|q_2| + \sqrt{|q_1q_2|}}{|q_1| - |q_2|}\,d$ sellest.`
});

P({ id: '22', b: 11, k: 'K',
  text: R`Leida väljatugevus kahte punktlaengut 8,0 nC ja −6,0 nC ühendava sirglõigu keskpunktis. Kaugus laengute vahel on 10 cm.`,
  fig: Viz.fieldSvg([{ x: 110, y: 90, q: 4, l: '8 nC', r: 13 }, { x: 250, y: 90, q: -3, l: '−6 nC', r: 12 }], 360, 180, `<circle cx="180" cy="90" r="4" class="vdot"/><text x="180" y="78" text-anchor="middle" class="vtext">P</text>`, 3),
  given: R`<b>Andmed:</b> $q_1 = 8.0\ \text{nC}$, $q_2 = -6.0\ \text{nC}$, $d = 10\ \text{cm}$, $r = 5.0\ \text{cm}$.<br><b>Leida:</b> $E$ keskpunktis.`,
  steps: [
    frc(R`Joonesta keskpunktis P kummagi laengu väljatugevuse vektor.`, {
      w: 360, h: 140, bg: `<line x1="40" y1="70" x2="320" y2="70" class="dash"/><circle cx="60" cy="70" r="12" class="fill"/><circle cx="300" cy="70" r="12" class="fill"/><text x="54" y="104">+8 nC</text><text x="282" y="104">−6 nC</text>`,
      bodies: [{ id: 'P', x: 180, y: 70, w: 14, shape: 'circle', label: 'P' }],
      forces: ['E1', 'E2', 'E'], dirs: SC.DIR4,
      ans: { P: { E1: 'right', E2: 'right' } },
      why: { E: 'Siin joonesta ainult üksikute laengute väljad; summa leiame arvutades.' },
      dirWhy: { E1: 'Positiivse laengu väli on temast eemale.', E2: 'Negatiivse laengu väli on tema poole.' }
    }, R`Mõlemad vektorid on paremale, seega moodulid liituvad.`),
    num(R`Positiivse laengu väljatugevus keskpunktis:`, 28760, 'V/m', { label: R`E_1`, alts: [{ a: 7190, msg: 'Kaugus keskpunktini on $d/2 = 5\\ \\text{cm}$, mitte 10 cm.' }] }),
    num(R`Summaarne väljatugevus:`, 50330, 'V/m', { final: true, label: R`E`, alts: [{ a: 7190, msg: 'Väljad on samasuunalised, moodulid tuleb liita, mitte lahutada.' }] })
  ],
  sol: R`Positiivse laengu väli on temast eemale, negatiivse laengu väli tema poole: keskpunktis on mõlemad suunatud negatiivse laengu poole, seega
$$E = E_1 + E_2 = \frac{|q_1| + |q_2|}{4\pi\varepsilon_0(d/2)^2} = \frac{9\cdot 10^9\cdot 14\cdot 10^{-9}}{0.05^2} \approx 50\ \text{kV/m}$$`,
  ans: R`50 kV/m`
});

P({ id: '23', b: 11, k: 'T',
  text: R`Kaks punktlaengut 30 nC asetsevad teineteisest 80 mm kaugusel. Määrata elektrivälja tugevus punktis, mis on kummastki laengust 50 mm kaugusel.`,
  fig: Viz.fieldSvg([{ x: 100, y: 140, q: 3, l: 'q', r: 12 }, { x: 260, y: 140, q: 3, l: 'q', r: 12 }], 360, 230,
    `<polygon points="100,140 260,140 180,80" style="fill:none;stroke:var(--muted);stroke-dasharray:4 4"/><circle cx="180" cy="80" r="4" class="vdot"/><text x="190" y="74" class="vtext">P</text><text x="118" y="102" class="vtext small">50 mm</text><text x="180" y="160" text-anchor="middle" class="vtext small">80 mm</text>`, 2.4),
  given: R`<b>Andmed:</b> $q = 30\ \text{nC}$, $d = 80\ \text{mm}$, $r = 50\ \text{mm}$, $\varepsilon = 1$.<br><b>Leida:</b> $E$.`,
  steps: [
    frc(R`Joonesta punktis P mõlema laengu väljatugevus ja nende summa.`, {
      w: 360, h: 230, bg: `<polygon points="100,210 260,210 180,150" class="dash"/><circle cx="100" cy="210" r="11" class="fill"/><circle cx="260" cy="210" r="11" class="fill"/><text x="94" y="225" font-size="11">+</text><text x="254" y="225" font-size="11">+</text>`,
      bodies: [{ id: 'P', x: 180, y: 150, w: 14, shape: 'circle', label: 'P' }],
      forces: ['E1', 'E2', 'E'],
      dirs: [{ k: 'up', a: 90, l: '↑ üles' }, { k: 'down', a: 270, l: '↓ alla' }, { k: 'e1', a: 37, l: '↗ vasakust laengust eemale' }, { k: 'e2', a: 143, l: '↖ paremast laengust eemale' }, { k: 'tl', a: 217, l: '↙ vasaku laengu poole' }, { k: 'tr', a: 323, l: '↘ parema laengu poole' }, { k: 'right', a: 0, l: '→ paremale' }, { k: 'left', a: 180, l: '← vasakule' }],
      ans: { P: { E1: 'e1', E2: 'e2', E: 'up' } },
      dirWhy: { E1: 'Positiivse laengu väli on temast eemale, piki laengut ja punkti ühendavat sirget.', E2: 'Positiivse laengu väli on temast eemale.', E: 'Horisontaalsed komponendid kustutavad teineteist, alles jäävad vertikaalsed.' }
    }),
    num(R`Ühe laengu väljatugevus punktis P:`, 107900, 'V/m', { label: R`E_1` }),
    mc(R`Olgu $\alpha$ nurk vektori $\vec E_1$ ja vertikaali vahel. Mis on summaarne väljatugevus?`, [R`*$E = 2E_1\cos\alpha$, kus $\cos\alpha = \frac{30}{50}$`, R`$E = 2E_1$||Vektorid ei ole samasuunalised, liidetakse ainult vertikaalkomponendid.`, R`$E = 2E_1\sin\alpha$, kus $\sin\alpha = \frac{40}{50}$||$\sin\alpha$ annab horisontaalkomponendi, need kustuvad.`], R`Kolmnurga kõrgus on $\sqrt{50^2 - 40^2} = 30\ \text{mm}$.`),
    num(R`Summaarne väljatugevus:`, 129500, 'V/m', { final: true, label: R`E`, alts: [{ a: 172600, msg: 'Kasutasid siinust. Vertikaalkomponent on $E_1\\cos\\alpha$, $\\cos\\alpha = 0.6$.' }, { a: 215800, msg: 'Vektoreid ei saa liita nagu arve, liida ainult vertikaalkomponendid.' }] })
  ],
  sol: R`Superpositsiooni printsiip: $\vec E = \vec E_1 + \vec E_2$. Horisontaalsed komponendid kustuvad, vertikaalsihis
$$E = (E_1 + E_2)\cos\alpha = \frac{2q}{4\pi\varepsilon_0r^2}\cos\alpha$$
$\sin\alpha = \frac{d/2}{r} = \frac{40}{50}$, $\alpha \approx 53^\circ$, $\cos\alpha = 0.6$:
$$E = \frac{2\cdot 3\cdot 10^{-8}\cdot 0.6}{4\pi\cdot 8.85\cdot 10^{-12}\cdot 0.05^2} \approx 1.3\cdot 10^5\ \text{V/m}$$`,
  ans: R`0,13 MV/m`
});

const triPot = `<svg viewBox="0 0 300 250" class="gsvg"><polygon points="150,25 40,215 260,215" class="thin"/>` + Q(150, 25, 1, 'q', 20, 6) + Q(40, 215, 1, 'q', 0, 30) + Q(260, 215, 1, 'q', 0, 30) +
  `<circle cx="150" cy="152" r="4" class="pt"/><text x="160" y="150">O</text><circle cx="205" cy="120" r="4" class="pt"/><text x="214" y="122">P</text><text x="150" y="240" text-anchor="middle">a</text></svg>`;

P({ id: '57', b: 11, k: 'K',
  text: R`Võrdkülgse kolmnurga külje pikkus on 4,0 cm. Kolmnurga tippudes asuvad punktlaengud 70 nC. Arvutada potentsiaal kolmnurga tsentris ja külgede keskkohas, kui kõik laengud on positiivsed.`,
  fig: triPot,
  given: R`<b>Andmed:</b> $a = 4.0\ \text{cm}$, $q = 70\ \text{nC}$ (kõik positiivsed).<br><b>Leida:</b> $\varphi_O$ (tsentris), $\varphi_P$ (külje keskkohas).`,
  viz: Viz.html('potential', { w: 300, h: 250, k: 30, charges: [{ x: 150, y: 30, q: 1 }, { x: 45, y: 212, q: 1 }, { x: 255, y: 212, q: 1 }], dots: [[150, 151, 'O'], [202, 121, 'P']],
    cap: R`Potentsiaal on skalaar: igas punktis liidetakse kolme laengu potentsiaalid. Tsentris ja külje keskkohas on potentsiaal peaaegu sama, kuigi kaugused laengutest on erinevad.` }),
  steps: [
    mc(R`Kuidas leida mitme laengu potentsiaal?`, [R`*Liita üksikute laengute potentsiaalid nagu arvud: $\varphi = \sum\frac{q_i}{4\pi\varepsilon_0r_i}$`, R`Liita vektoritena||Potentsiaal on skalaar, mitte vektor.`, R`Võtta lähima laengu potentsiaal||Kõik laengud annavad oma osa.`]),
    num(R`Tsentri kaugus tippudest ($R = \frac{a}{\sqrt 3}$):`, 0.02309, 'm', { label: R`R` }),
    num(R`Potentsiaal tsentris:`, 81730, 'V', { final: true, label: R`\varphi_O`, alts: [{ a: 8173, msg: 'Suurusjärk: $70\\ \\text{nC} = 7\\cdot 10^{-8}\\ \\text{C}$.' }] }),
    mc(R`Külje keskkohas P: kui kaugel on laengud?`, [R`*Kaks laengut kaugusel $\frac{a}{2}$ ja üks kaugusel $\frac{\sqrt 3}{2}a$`, R`Kõik kaugusel $\frac{a}{2}$||Vastastipp on kaugemal, kolmnurga kõrguse kaugusel.`, R`Kaks laengut kaugusel $a$ ja üks kaugusel $\frac{a}{2}$||P on külje keskel, külje otsad on temast $a/2$ kaugusel.`]),
    num(R`Potentsiaal külje keskkohas:`, 81080, 'V', { final: true, label: R`\varphi_P` })
  ],
  sol: R`Potentsiaalide superpositsioon: $\varphi = \sum\frac{q_i}{4\pi\varepsilon_0r_i}$. Tsentris on kõik laengud kaugusel $R = \frac{a}{\sqrt 3} \approx 2.31\ \text{cm}$:
$$\varphi_O = \frac{3q}{4\pi\varepsilon_0R} = \frac{3\cdot 9\cdot 10^9\cdot 7\cdot 10^{-8}}{0.0231} \approx 82\ \text{kV}$$
Külje keskkohas on kaks laengut kaugusel $a/2$ ja üks kaugusel $\frac{\sqrt 3}{2}a$:
$$\varphi_P = \frac{q}{4\pi\varepsilon_0}\left(\frac{2}{a/2} + \frac{2}{\sqrt 3a}\right) = 9\cdot 10^9\cdot 7\cdot 10^{-8}\left(\frac{2}{0.02} + \frac{1}{0.0346}\right) \approx 81\ \text{kV}$$`,
  ans: R`82 kV ja 81 kV`,
  after: R`Raamatu vastuses on 8,2 kV ja 8,1 kV, see on 10 korda väiksem (trükiviga). Konspekti vastus 82 kV ja 81 kV klapib arvutusega. Raamatus on ka b-osa (üks laeng positiivne, kaks negatiivset).`
});

P({ id: '63', b: 11, k: 'T',
  text: R`Metallkera raadiusega 10 cm ühendati peene traadi abil teise metallkeraga, mille raadius on 2,0 cm. Saadud süsteemile anti laeng 60 nC. Määrata kummagi kera laeng ja potentsiaal.`,
  fig: `<svg viewBox="0 0 360 150" class="gsvg"><circle cx="80" cy="80" r="55" style="fill:color-mix(in srgb,var(--pos) 18%,transparent)"/><circle cx="300" cy="80" r="14" style="fill:color-mix(in srgb,var(--pos) 18%,transparent)"/><path d="M135 80 C 190 60, 230 100, 286 80"/><text x="80" y="85" text-anchor="middle">r₁ = 10 cm</text><text x="300" y="118" text-anchor="middle">r₂ = 2 cm</text></svg>`,
  given: R`<b>Andmed:</b> $r_1 = 10\ \text{cm}$, $r_2 = 2.0\ \text{cm}$, $Q = 60\ \text{nC}$, kerad on teineteisest kaugel.<br><b>Leida:</b> $q_1$, $q_2$, $\varphi$.`,
  steps: [
    mc(R`Mis on traadiga ühendatud metallkehade kohta alati tõsi?`, [R`*Nende potentsiaalid on võrdsed`, R`Nende laengud on võrdsed||Laeng jaotub nii, et potentsiaalid võrdsustuvad; suurem kera saab rohkem laengut.`, R`Nende laengu pindtihedused on võrdsed||Väiksemal keral on pindtihedus hoopis suurem.`]),
    mc(R`$\frac{q_1}{4\pi\varepsilon_0r_1} = \frac{q_2}{4\pi\varepsilon_0r_2}$ ja $q_1 + q_2 = Q$. Siit:`, [R`*$q_1 = \frac{Qr_1}{r_1 + r_2}$`, R`$q_1 = \frac{Qr_2}{r_1 + r_2}$||Suurema raadiusega kera saab suurema laengu.`, R`$q_1 = \frac{Q}{2}$||Laengud on võrdsed ainult võrdsete kerade korral.`]),
    num(R`Suurema kera laeng:`, 50e-9, 'C', { final: true, label: R`q_1` }),
    num(R`Väiksema kera laeng:`, 10e-9, 'C', { final: true, label: R`q_2` }),
    num(R`Kerade potentsiaal:`, 4494, 'V', { final: true, label: R`\varphi` })
  ],
  sol: R`Ühendatud metallkehade potentsiaalid on võrdsed. Kerad on kaugel, teise kera mõju võib jätta arvestamata:
$$\frac{q_1}{4\pi\varepsilon_0r_1} = \frac{Q - q_1}{4\pi\varepsilon_0r_2} \quad\Rightarrow\quad q_1 = \frac{Qr_1}{r_1 + r_2} = \frac{60\cdot 10}{12} = 50\ \text{nC}, \quad q_2 = 10\ \text{nC}$$
$$\varphi = \frac{q_1}{4\pi\varepsilon_0r_1} = \frac{9\cdot 10^9\cdot 5\cdot 10^{-8}}{0.10} = 4.5\ \text{kV}$$`,
  ans: R`50 nC ja 10 nC; mõlema potentsiaal 4,5 kV.`
});

const twoQ = (l1, l2, s1, s2) => `<svg viewBox="0 0 340 90" class="gsvg">` + Q(90, 40, s1, l1) + Q(160, 40, s2, l2) + `<line x1="175" y1="40" x2="300" y2="40" class="dash"/><polygon points="300,35 312,40 300,45" class="pt"/><text x="125" y="84" text-anchor="middle">r₁</text><text x="250" y="30">→ r₂ või ∞</text></svg>`;

P({ id: '70', b: 11, k: 'T',
  text: R`Kaks punktlaengut +100 nC ja −10 nC asetsevad teineteisest 1,0 cm kaugusel. Kui palju tööd tuleb teha ühe laengu eemaldamiseks teisest: a) 1,0 m kaugusele; b) lõpmata kaugele?`,
  fig: twoQ('100 nC', '−10 nC', 1, -1),
  given: R`<b>Andmed:</b> $q_1 = 100\ \text{nC}$, $q_2 = -10\ \text{nC}$, $r_1 = 1.0\ \text{cm}$, $r_2 = 1.0\ \text{m}$ või $\infty$.<br><b>Leida:</b> $A_2$, $A_\infty$.`,
  steps: [
    mc(R`Elektriliste jõudude vastu tehtav töö laengu $q_2$ viimisel punktist 1 punkti 2:`, [R`*$A = q_2(\varphi_2 - \varphi_1)$, kus $\varphi = \frac{q_1}{4\pi\varepsilon_0r}$`, R`$A = q_2(\varphi_1 - \varphi_2)$||Nii saaksid elektriliste jõudude töö. Meie teeme tööd nende vastu.`, R`$A = Fs = \frac{q_1q_2}{4\pi\varepsilon_0r_1^2}(r_2 - r_1)$||Jõud muutub kaugusega, nii ei saa.`]),
    num(R`Töö 1,0 m kaugusele viimisel:`, 8.90e-4, 'J', { final: true, label: R`A_2`, alts: [{ a: -8.90e-4, msg: 'Märk: erimärgilised laengud tõmbuvad, nende lahutamiseks tuleb teha positiivset tööd.' }] }),
    num(R`Töö lõpmata kaugele viimisel:`, 8.99e-4, 'J', { final: true, label: R`A_\infty`, tol: 0.006, hint: R`Lõpmatuses $\varphi = 0$.`, alts: [{ a: 8.90e-4, msg: 'See on 1 m kaugusele viimise töö. Lõpmatuses on potentsiaal null.' }] })
  ],
  sol: R`Laengu $q_1$ potentsiaal: $\varphi = \frac{q_1}{4\pi\varepsilon_0r}$. Elektriliste jõudude vastu tehtud töö:
$$A = q_2(\varphi_2 - \varphi_1) = \frac{q_1q_2}{4\pi\varepsilon_0}\left(\frac{1}{r_2} - \frac{1}{r_1}\right) = -\frac{q_1q_2}{4\pi\varepsilon_0}\left(\frac{1}{r_1} - \frac{1}{r_2}\right)$$
$$A_2 = 9\cdot 10^9\cdot 10^{-15}\left(100 - 1\right) \approx 0.89\ \text{mJ}, \qquad A_\infty = 9\cdot 10^9\cdot 10^{-15}\cdot 100 = 0.90\ \text{mJ}$$
Sama tulemuse annab ka integraal $A = -\int F\,dr$, aga potentsiaalidega on lihtsam.`,
  ans: R`a) 0,89 mJ; b) 0,90 mJ`
});

P({ id: '71', b: 11, k: 'K',
  text: R`Petrooleumi ($\varepsilon = 2.0$) on asetatud teineteisest 2,0 cm kaugusele erinimelised punktlaengud suurusega 1,0 µC. Kui palju tööd tehakse laengute eemaldamiseks teineteisest 6,0 cm kaugusele?`,
  fig: twoQ('+1 µC', '−1 µC', 1, -1),
  given: R`<b>Andmed:</b> $\varepsilon = 2.0$, $q_1 = 1.0\ \mu\text{C}$, $q_2 = -1.0\ \mu\text{C}$, $r_1 = 2.0\ \text{cm}$, $r_2 = 6.0\ \text{cm}$.<br><b>Leida:</b> $A$.`,
  steps: [
    num(R`Töö:`, 0.1498, 'J', { final: true, label: R`A`, hint: R`$A = \frac{|q_1q_2|}{4\pi\varepsilon_0\varepsilon}\left(\frac{1}{r_1} - \frac{1}{r_2}\right)$`, alts: [{ a: 0.2996, msg: 'Unustasid petrooleumi dielektrilise läbitavuse $\\varepsilon = 2$.' }] })
  ],
  sol: R`Nagu ülesandes 70, aga keskkonnas $\varepsilon = 2$:
$$A = \frac{|q_1q_2|}{4\pi\varepsilon_0\varepsilon}\left(\frac{1}{r_1} - \frac{1}{r_2}\right) = \frac{9\cdot 10^9\cdot 10^{-12}}{2}\left(\frac{1}{0.02} - \frac{1}{0.06}\right) \approx 0.15\ \text{J}$$`,
  ans: R`0,15 J`
});

P({ id: '79', b: 11, k: 'T',
  text: R`Kui suure kiirendava potentsiaalide vahe peab läbima elektron, et saavutada kiirus 25 Mm/s?`,
  given: R`<b>Andmed:</b> $v_0 = 0$, $v = 25\ \text{Mm/s}$, $e = 1.6\cdot 10^{-19}\ \text{C}$, $m = 9.1\cdot 10^{-31}\ \text{kg}$.<br><b>Leida:</b> $\Delta\varphi$.`,
  viz: Viz.html('plates', { mode: 'electron', cap: R`Elektriväli teeb elektroni kiirendamisel tööd $A = e\Delta\varphi$, mis muutub kineetiliseks energiaks: $e\Delta\varphi = \frac{mv^2}{2}$.` }),
  steps: [
    mc(R`Milline seadus?`, [R`*Mehaanilise energia jäävus: $q\varphi_0 = q\varphi + \frac{mv^2}{2}$`, R`Newtoni II seadus $F = ma$||Välja kuju pole teada, energia jäävus on lihtsam.`, R`Impulsi jäävus||Elektronile mõjub väline jõud, impulss ei jää samaks.`]),
    num(R`Potentsiaalide vahe:`, 1777, 'V', { final: true, label: R`\Delta\varphi`, alts: [{ a: 3555, msg: 'Kineetiline energia on $\\frac{mv^2}{2}$, unustasid kahega jagamise.' }] })
  ],
  sol: R`Vaakumis dissipatiivseid jõude pole, mehaaniline energia säilib:
$$q\varphi_0 = q\varphi + \frac{mv^2}{2} \quad\Rightarrow\quad \Delta\varphi = \varphi - \varphi_0 = -\frac{mv^2}{2q} = \frac{9.1\cdot 10^{-31}\cdot(2.5\cdot 10^7)^2}{2\cdot 1.6\cdot 10^{-19}} \approx 1.78\ \text{kV}$$
($q = -e$, seega elektron liigub kõrgema potentsiaali poole.)`,
  ans: R`1,8 kV`
});

P({ id: '80', b: 11, k: 'K',
  text: R`Kui suure kiirendava potentsiaalide vahe peab läbima α-osake, et saavutada kiirus 20 Mm/s? α-osakese mass on $6.6\cdot 10^{-27}$ kg.`,
  given: R`<b>Andmed:</b> $v = 20\ \text{Mm/s}$, $m = 6.6\cdot 10^{-27}\ \text{kg}$, $q = 2e = 3.2\cdot 10^{-19}\ \text{C}$.<br><b>Leida:</b> $U$.`,
  steps: [
    mc(R`Mis on α-osakese laeng?`, [R`*$2e$ (heeliumi tuum, 2 prootonit)`, R`$e$||α-osake on heeliumi tuum, temas on kaks prootonit.`, R`$-2e$||Tuum on positiivne.`]),
    num(R`Potentsiaalide vahe:`, 4.125e6, 'V', { final: true, label: R`U`, alts: [{ a: 8.25e6, msg: 'α-osakese laeng on $2e$, mitte $e$.' }] })
  ],
  sol: R`$qU = \frac{mv^2}{2} \Rightarrow U = \frac{mv^2}{2q} = \frac{6.6\cdot 10^{-27}\cdot(2\cdot 10^7)^2}{2\cdot 3.2\cdot 10^{-19}} \approx 4.1\ \text{MV}$`,
  ans: R`4,1 MV`
});

/* ---------- Sarnased ---------- */

P({ id: '24', b: 11, k: 'S',
  text: R`Punktlaengud 27 nC ja −96 nC asetsevad teineteisest 15 cm kaugusel. Kui suur on elektrivälja tugevus punktis, mis asetseb esimesest laengust 9,0 cm ja teisest 12 cm kaugusel?`,
  given: R`<b>Andmed:</b> $q_1 = 27\ \text{nC}$, $q_2 = -96\ \text{nC}$, $d = 15\ \text{cm}$, $r_1 = 9.0\ \text{cm}$, $r_2 = 12\ \text{cm}$.<br><b>Leida:</b> $E$.`,
  fig: `<svg viewBox="0 0 320 170" class="gsvg"><polygon points="40,140 290,140 130,20" class="dash"/>` + Q(40, 140, 1, 'q₁', 0, 26) + Q(290, 140, -1, 'q₂', 0, 26) + `<circle cx="130" cy="20" r="4" class="pt"/><text x="138" y="16">P</text><text x="70" y="70">9 cm</text><text x="214" y="70">12 cm</text><text x="165" y="160" text-anchor="middle">15 cm</text><path d="M122 31 L131 37 L139 26" class="thin"/></svg>`,
  steps: [
    mc(R`Mis on kolmnurga kohta oluline?`, [R`*See on täisnurkne ($9^2 + 12^2 = 15^2$), nurk P juures on 90°`, R`See on võrdhaarne||Küljed on 9, 12 ja 15 cm.`]),
    num(R`Esimese laengu väljatugevus punktis P:`, 29960, 'V/m', { label: R`E_1` }),
    num(R`Teise laengu väljatugevus punktis P:`, 59920, 'V/m', { label: R`E_2` }),
    num(R`Summaarne väljatugevus:`, 66990, 'V/m', { final: true, label: R`E`, hint: R`$\vec E_1 \perp \vec E_2$, seega $E = \sqrt{E_1^2 + E_2^2}$`, alts: [{ a: 89880, msg: 'Vektorid on risti, kasuta Pythagorase teoreemi.' }] })
  ],
  sol: R`$9^2 + 12^2 = 15^2$, seega nurk P juures on täisnurk ja vektorid $\vec E_1$ (piki $q_1P$) ning $\vec E_2$ (piki $Pq_2$) on risti.
$$E_1 = \frac{9\cdot 10^9\cdot 27\cdot 10^{-9}}{0.09^2} \approx 30\ \text{kV/m}, \quad E_2 = \frac{9\cdot 10^9\cdot 96\cdot 10^{-9}}{0.12^2} \approx 60\ \text{kV/m}, \quad E = \sqrt{E_1^2 + E_2^2} \approx 67\ \text{kV/m}$$`,
  ans: R`67 kV/m`
});

P({ id: '56', b: 11, k: 'S',
  text: R`Punktlaengute 400 nC ja −600 nC vahemaa on 10 cm. Leida elektrivälja potentsiaal punktis, kus elektrivälja tugevus on null.`,
  given: R`<b>Andmed:</b> $q_1 = 400\ \text{nC}$, $q_2 = -600\ \text{nC}$, $d = 10\ \text{cm}$.<br><b>Leida:</b> $\varphi$ punktis, kus $E = 0$.`,
  steps: [
    mc(R`Kus on punkt, kus $E = 0$? (Vaata ülesannet 21b.)`, [R`*Väljaspool, 400 nC laengu taga`, R`Laengute vahel||Erimärgiliste laengute vahel väljad liituvad.`, R`−600 nC laengu taga||Seal on suurem laeng lähemal.`]),
    num(R`Selle punkti kaugus 400 nC laengust:`, 0.445, 'm', { label: R`x`, hint: R`$\frac{x + d}{x} = \sqrt{\frac{600}{400}}$` }),
    num(R`Potentsiaal selles punktis:`, -1816, 'V', { final: true, label: R`\varphi`, alts: [{ a: 1816, msg: 'Märk: negatiivne laeng on suurem ja annab negatiivse potentsiaali, mis on absoluutväärtuselt suurem.' }] })
  ],
  sol: R`$E = 0$ väljaspool laenguid, väiksema laengu taga: $\frac{400}{x^2} = \frac{600}{(x + 10)^2} \Rightarrow x = \frac{10}{\sqrt{1.5} - 1} \approx 44.5\ \text{cm}$.
$$\varphi = \frac{1}{4\pi\varepsilon_0}\left(\frac{q_1}{x} + \frac{q_2}{x + d}\right) = 9\cdot 10^9\left(\frac{4\cdot 10^{-7}}{0.445} - \frac{6\cdot 10^{-7}}{0.545}\right) \approx -1.8\ \text{kV}$$
Väljatugevus null ei tähenda, et potentsiaal oleks null.`,
  ans: R`−1,8 kV`
});

P({ id: '59', b: 11, k: 'S',
  text: R`Metallkera raadius on 5,0 cm ja laeng 10 nC. Arvutada potentsiaal kera pinnal ning pinnast 2,0 cm kaugusel.`,
  given: R`<b>Andmed:</b> $R = 5.0\ \text{cm}$, $q = 10\ \text{nC}$, $r = R + 2.0\ \text{cm}$.<br><b>Leida:</b> $\varphi_R$, $\varphi_r$.`,
  steps: [
    num(R`Potentsiaal kera pinnal:`, 1798, 'V', { final: true, label: R`\varphi_R` }),
    num(R`Potentsiaal pinnast 2,0 cm kaugusel:`, 1284, 'V', { final: true, label: R`\varphi_r`, alts: [{ a: 4494, msg: 'Kaugus mõõdetakse kera keskpunktist: $r = 5 + 2 = 7\\ \\text{cm}$.' }] })
  ],
  sol: R`Väljaspool metallkera on potentsiaal nagu punktlaengul keskpunktis: $\varphi = \frac{q}{4\pi\varepsilon_0r}$.
$$\varphi_R = \frac{9\cdot 10^9\cdot 10^{-8}}{0.05} \approx 1.8\ \text{kV}, \qquad \varphi_r = \frac{9\cdot 10^9\cdot 10^{-8}}{0.07} \approx 1.3\ \text{kV}$$`,
  ans: R`1,8 kV; 1,3 kV`
});

P({ id: '81', b: 11, k: 'S',
  text: R`Mitu korda suurema potentsiaalide vahe peab läbima prooton, et saavutada elektroniga võrdne kiirus?`,
  given: R`<b>Andmed:</b> $m_p = 1.67\cdot 10^{-27}\ \text{kg}$, $m_e = 9.1\cdot 10^{-31}\ \text{kg}$, laengud on absoluutväärtuselt võrdsed.<br><b>Leida:</b> $U_p/U_e$.`,
  steps: [
    mc(R`$eU = \frac{mv^2}{2}$. Kuidas sõltub $U$ massist, kui $v$ ja laeng on samad?`, [R`*$U \sim m$`, R`$U \sim \sqrt m$||$U = \frac{mv^2}{2e}$ on massiga otse võrdeline.`, R`$U \sim \frac{1}{m}$||Raskema osakese kiirendamiseks on vaja rohkem energiat.`]),
    num(R`Mitu korda suurem pinge:`, 1835, '', { final: true, label: R`\frac{U_p}{U_e}`, tol: 0.01 })
  ],
  sol: R`$U = \frac{mv^2}{2e}$, seega $\frac{U_p}{U_e} = \frac{m_p}{m_e} = \frac{1.67\cdot 10^{-27}}{9.1\cdot 10^{-31}} \approx 1836$.`,
  ans: R`1836 korda`
});
})();
