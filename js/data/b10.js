/* 10. Coulombi seadus (kogu II). Tunnis: 4, 7, 10, 13, 17. Kodus: 8, 12, 16. */
(function () {
const R = String.raw;

/* laeng joonisel */
function Q(x, y, s, lab, lx, ly) {
  return `<circle cx="${x}" cy="${y}" r="11" class="${s > 0 ? 'pos' : 'neg'}"/><text x="${x}" y="${y + 5}" text-anchor="middle" class="q">${s > 0 ? '+' : '−'}</text>` +
    (lab ? `<text x="${x + (lx || 0)}" y="${y + (ly != null ? ly : 28)}" text-anchor="middle">${lab}</text>` : '');
}
/* kaks kuulikest niitide otsas, poolnurk deg */
function hangFig(deg, opts) {
  opts = opts || {};
  const L = 150, px = 180, py = 20, a = deg * Math.PI / 180;
  const x1 = px - L * Math.sin(a), x2 = px + L * Math.sin(a), y = py + L * Math.cos(a);
  const r = 36;
  return `<svg viewBox="0 0 360 ${y + 58}" class="gsvg">` +
    (opts.oil ? `<rect x="10" y="${py + 40}" width="340" height="${y - 20}" style="fill:color-mix(in srgb,var(--info) 18%,transparent);stroke:none"/>` : '') +
    `<line x1="${px - 50}" y1="${py}" x2="${px + 50}" y2="${py}" style="stroke-width:4"/>` +
    `<line x1="${px}" y1="${py}" x2="${x1}" y2="${y}"/><line x1="${px}" y1="${py}" x2="${x2}" y2="${y}"/>` +
    `<line x1="${px}" y1="${py}" x2="${px}" y2="${y + 10}" class="dash"/>` +
    `<path d="M${px - r * Math.sin(a)},${py + r * Math.cos(a)} A${r},${r} 0 0 0 ${px + r * Math.sin(a)},${py + r * Math.cos(a)}" class="thin"/>` +
    `<text x="${px}" y="${py + r + 16}" text-anchor="middle">α</text>` +
    `<text x="${(px + x1) / 2 - 10}" y="${(py + y) / 2}" text-anchor="end">l</text>` +
    Q(x1, y, 1, 'm, q') + Q(x2, y, 1, 'm, q') +
    `<line x1="${x1}" y1="${y + 40}" x2="${x2}" y2="${y + 40}" class="dash"/><text x="${px}" y="${y + 55}" text-anchor="middle">r</text>` +
    (opts.oil ? `<text x="18" y="${y + 30}" class="up" font-size="12">${opts.oil}</text>` : '') + `</svg>`;
}
/* jõudude stseen: vasak kuulike niidi otsas */
function hangScene(deg, fluid) {
  const a = deg * Math.PI / 180, L = 150, px = deg > 45 ? 215 : 230, py = 15;
  const bx = px - L * Math.sin(a), by = py + L * Math.cos(a);
  const dirs = [
    { k: 'up', a: 90, l: '↑ üles' }, { k: 'down', a: 270, l: '↓ alla' }, { k: 'left', a: 180, l: '← vasakule' }, { k: 'right', a: 0, l: '→ paremale' },
    { k: 'thread', a: 90 - deg, l: '↗ piki niiti riputuspunkti poole' }, { k: 'away', a: 270 - deg, l: '↙ niidist eemale' }
  ];
  const ans = { q: { mg: 'down', T: 'thread', Fe: 'left' } };
  if (fluid) ans.q.Fu = 'up';
  return {
    w: 380, h: Math.round(by + 92),
    bg: `<line x1="${px - 40}" y1="${py}" x2="${px + 40}" y2="${py}"/><line x1="${px}" y1="${py}" x2="${bx}" y2="${by}"/>` +
      `<line x1="${px}" y1="${py}" x2="${px + L * Math.sin(a)}" y2="${by}"/><circle cx="${px + L * Math.sin(a)}" cy="${by}" r="12" class="fill"/>` +
      `<line x1="${px}" y1="${py}" x2="${px}" y2="${by}" class="dash"/>` + (fluid ? `<text x="12" y="${by + 60}">vedelikus</text>` : ''),
    bodies: [{ id: 'q', x: bx, y: by, w: 26, shape: 'circle', label: '+' }],
    forces: fluid ? ['mg', 'T', 'Fe', 'Fu', 'N'] : ['mg', 'T', 'Fe', 'N', 'Fu'], dirs,
    ans,
    why: { N: 'Kuulike ei toetu ühelegi pinnale, ta ripub niidi otsas.', Fu: fluid ? '' : 'Õhu üleslükkejõud on tühine (konspektis jäetakse arvestamata).' },
    dirWhy: { Fe: 'Samamärgilised laengud tõukuvad: parempoolne kuulike lükkab vasakpoolset vasakule.', T: 'Niit tõmbab kuulikest riputuspunkti poole, piki niiti.', mg: 'Raskusjõud on alati alla.', Fu: 'Üleslükkejõud on üles.' }
  };
}
const HANG = Viz.html('hang', {});

P({ id: '4', b: 10, k: 'T',
  text: R`Laeng $Q$ jaotatakse kahe väikese kera vahel. Millise laengu jaotuse korral on keradevaheline tõukejõud maksimaalne?`,
  given: R`<b>Andmed:</b> $q_1 + q_2 = Q$, $r = \text{const}$.<br><b>Leida:</b> $q_1$, $q_2$, mille korral $F = \max$.`,
  viz: Viz.html('coulomb', {}),
  steps: [
    mc(R`Kirjuta jõud ühe muutuja $q_1$ funktsioonina:`, [R`*$F = \frac{q_1(Q - q_1)}{4\pi\varepsilon_0 r^2}$`, R`$F = \frac{Q^2}{4\pi\varepsilon_0 r^2}$||Laeng on jaotatud kaheks, kerade laengud on $q_1$ ja $Q - q_1$.`, R`$F = \frac{q_1 + (Q - q_1)}{4\pi\varepsilon_0 r^2}$||Coulombi seaduses on laengute korrutis, mitte summa.`]),
    mc(R`Maksimumi tingimus on $\frac{dF}{dq_1} = 0$. Mis siit tuleb?`, [R`*$Q - 2q_1 = 0$`, R`$Q - q_1 = 0$||Tuletis korrutisest $q_1(Q - q_1) = Qq_1 - q_1^2$ on $Q - 2q_1$.`, R`$Q + 2q_1 = 0$||Kontrolli märki: $\frac{d}{dq_1}(Qq_1 - q_1^2) = Q - 2q_1$.`]),
    mc(R`Kuidas tuleb laeng jagada?`, [R`*Võrdselt: $q_1 = q_2 = \frac{Q}{2}$`, R`Kogu laeng ühele kerale||Siis on teine kera laenguta ja jõud on null.`, R`Suhtes 1 : 2||Tuletise nullkoht annab $q_1 = Q/2$.`], R`Teine tuletis $-\frac{2}{4\pi\varepsilon_0 r^2} < 0$, seega see on tõesti maksimum.`)
  ],
  sol: R`Coulombi seadus, kui $q_2 = Q - q_1$:
$$F(q_1) = \frac{q_1(Q - q_1)}{4\pi\varepsilon_0\varepsilon r^2} = \frac{Qq_1 - q_1^2}{4\pi\varepsilon_0\varepsilon r^2}$$
Kaugus on fikseeritud, $F$ on ühe muutuja funktsioon. Ekstreemumi tingimus:
$$\frac{dF}{dq_1} = \frac{Q - 2q_1}{4\pi\varepsilon_0\varepsilon r^2} = 0 \quad\Rightarrow\quad q_1 = \frac{Q}{2}$$
Teine tuletis on negatiivne, seega see on maksimum.`,
  ans: R`Jõud on suurim, kui laeng jagatakse võrdselt: $q_1 = q_2 = Q/2$.`
});

const quad = (sgn) => mc(R`Coulombi seadusest $|q_1q_2| = 4\pi\varepsilon_0\varepsilon r^2F$. Koos tingimusega $q_1 + q_2 = Q$ saame ruutvõrrandi:`,
  sgn > 0 ? [R`*$q_1^2 - Qq_1 + 4\pi\varepsilon_0\varepsilon r^2F = 0$`, R`$q_1^2 + Qq_1 + 4\pi\varepsilon_0\varepsilon r^2F = 0$||Asenda $q_2 = Q - q_1$: $q_1(Q - q_1) = 4\pi\varepsilon_0\varepsilon r^2F$.`, R`$q_1^2 - Qq_1 - 4\pi\varepsilon_0\varepsilon r^2F = 0$||Tõukejõu korral on laengud samamärgilised, korrutis on positiivne.`]
    : [R`*$q_1^2 - Qq_1 - 4\pi\varepsilon_0\varepsilon r^2F = 0$`, R`$q_1^2 - Qq_1 + 4\pi\varepsilon_0\varepsilon r^2F = 0$||Tõmbejõu korral on laengud erimärgilised, $q_1q_2 = -4\pi\varepsilon_0\varepsilon r^2F$.`, R`$q_1 + q_2 = 0$||Summa on $Q = 10\ \text{nC}$.`]);

P({ id: '7', b: 10, k: 'T',
  text: R`Laeng 10,0 nC jaotati kahe teineteisest 30 mm kaugusel õlis ($\varepsilon = 2.1$) asuva kera vahel nii, et nad tõukuvad jõuga 100 µN. Leida kerade laeng.`,
  given: R`<b>Andmed:</b> $Q = 10\ \text{nC}$, $r = 30\ \text{mm}$, $\varepsilon = 2.1$, $F = 100\ \mu\text{N}$, $q_2 = Q - q_1$.<br><b>Leida:</b> $q_1$, $q_2$.`,
  steps: [
    quad(1),
    num(R`Korrutis $q_1q_2 = 4\pi\varepsilon_0\varepsilon r^2F$:`, 2.103e-17, 'C²', { label: R`q_1q_2` }),
    num(R`Suurem laeng:`, 7.0e-9, 'C', { final: true, label: R`q_1`, hint: R`$q_1 = \frac{Q}{2} \pm\sqrt{\frac{Q^2}{4} - q_1q_2}$` }),
    num(R`Väiksem laeng:`, 3.0e-9, 'C', { final: true, label: R`q_2` })
  ],
  sol: R`Coulombi seadusest koos $q_2 = Q - q_1$:
$$F = \frac{q_1(Q - q_1)}{4\pi\varepsilon_0\varepsilon r^2} \quad\Rightarrow\quad q_1^2 - Qq_1 + 4\pi\varepsilon_0\varepsilon r^2F = 0$$
Ruutvõrrandi lahend:
$$q_1 = \frac{Q}{2} \pm\sqrt{\frac{Q^2}{4} - 4\pi\varepsilon_0\varepsilon r^2F} = 5\cdot 10^{-9} \pm\sqrt{25\cdot 10^{-18} - 21\cdot 10^{-18}} = (5 \pm 2)\cdot 10^{-9}\ \text{C}$$
Ühel keral on 7 nC, teisel 3 nC.`,
  ans: R`3,0 nC ja 7,0 nC`
});

P({ id: '8', b: 10, k: 'K',
  text: R`Kahe väikese kera laengute summa on 10 nC. Kerad asetsevad teineteisest 30 mm kaugusel õlis ($\varepsilon = 2.4$) ning tõmbuvad jõuga 100 µN. Leida kerade laeng.`,
  given: R`<b>Andmed:</b> $q_1 + q_2 = 10\ \text{nC}$, $r = 30\ \text{mm}$, $\varepsilon = 2.4$, $F = 100\ \mu\text{N}$ (tõmbejõud).<br><b>Leida:</b> $q_1$, $q_2$.`,
  steps: [
    mc(R`Kerad tõmbuvad. Mida see laengute kohta ütleb?`, [R`*Laengud on erimärgilised, $q_1q_2 < 0$`, R`Mõlemad on negatiivsed||Siis nad tõukuksid.`, R`Mõlemad on positiivsed||Siis nad tõukuksid.`]),
    quad(-1),
    num(R`Positiivne laeng:`, 12e-9, 'C', { final: true, label: R`q_1` }),
    num(R`Negatiivne laeng:`, -2e-9, 'C', { final: true, label: R`q_2` })
  ],
  sol: R`Tõmbejõud tähendab, et $q_1q_2 = -4\pi\varepsilon_0\varepsilon r^2F = -2.4\cdot 10^{-17}\ \text{C}^2$. Koos $q_2 = Q - q_1$:
$$q_1^2 - Qq_1 - 4\pi\varepsilon_0\varepsilon r^2F = 0 \quad\Rightarrow\quad q_1 = \frac{Q}{2} \pm\sqrt{\frac{Q^2}{4} + 24\cdot 10^{-18}} = (5 \pm 7)\cdot 10^{-9}\ \text{C}$$
Laengud on 12 nC ja −2 nC.`,
  ans: R`12 nC ja −2,0 nC`,
  after: R`Konspekti koduste ülesannete loendis on selle ülesande vastus segaselt (10 nC, −12 nC). Raamatu vastus 12 nC ja −2,0 nC klapib arvutusega.`
});

function triFig(center) {
  return `<svg viewBox="0 0 300 250" class="gsvg"><polygon points="150,25 40,215 260,215" class="thin"/>` +
    `<line x1="150" y1="25" x2="150" y2="215" class="dash"/>` +
    Q(150, 25, 1, 'q', 22, 6) + Q(40, 215, 1, 'q', -2, 30) + Q(260, 215, 1, 'q', 2, 30) +
    (center ? Q(150, 152, -1, 'Q', 22, 6) : '') +
    `<text x="150" y="240" text-anchor="middle">r</text><text x="128" y="70">α</text><text x="160" y="105">R</text></svg>`;
}

P({ id: '10', b: 10, k: 'T',
  text: R`Kolm ühesugust laengut $q$ asetsevad võrdkülgse kolmnurga tippudes. Milline laeng tuleb paigutada kolmnurga keskpunkti, et selle mõju tasakaalustaks laengutevahelised tõukejõud?`,
  fig: triFig(true),
  given: R`<b>Andmed:</b> kolm laengut $q$, külg $r$, keskpunktis laeng $Q$ (kaugusel $R$ tippudest).<br><b>Leida:</b> $Q$.`,
  steps: [
    frc(R`Sümmeetria tõttu piisab, kui vaatame ülemist laengut. Joonesta talle mõjuvad jõud ($F_1$ alumiselt vasakult, $F_2$ alumiselt paremalt, $F_Q$ keskelt).`, {
      w: 320, h: 270, bg: `<polygon points="160,80 50,250 270,250"/><circle cx="50" cy="250" r="10" class="fill"/><circle cx="270" cy="250" r="10" class="fill"/><circle cx="160" cy="193" r="9" class="fill"/>` +
        `<text x="38" y="240">q</text><text x="276" y="240">q</text><text x="172" y="198">Q</text>`,
      bodies: [{ id: 'q', x: 160, y: 80, w: 24, shape: 'circle', label: '+' }],
      forces: ['F1', 'F2', 'FQ', 'mg'],
      dirs: [{ k: 'up', a: 90, l: '↑ üles' }, { k: 'down', a: 270, l: '↓ alla (keskpunkti poole)' }, { k: 'ur', a: 57, l: '↗ alumisest vasakust laengust eemale' }, { k: 'ul', a: 123, l: '↖ alumisest paremast laengust eemale' }, { k: 'dl', a: 237, l: '↙ alumise vasaku laengu poole' }, { k: 'dr', a: 303, l: '↘ alumise parema laengu poole' }],
      ans: { q: { F1: 'ur', F2: 'ul', FQ: 'down' } },
      why: { mg: 'Punktlaengute ülesandes raskusjõudu ei arvestata.' },
      dirWhy: { F1: 'Samamärgilised laengud tõukuvad: jõud on suunatud vasakust alumisest laengust eemale.', F2: 'Tõukejõud paremast alumisest laengust eemale.', FQ: '$Q$ peab tõmbama ülemist laengut keskpunkti poole, et tasakaalustada tõukejõudude resultant (mis on üles).' }
    }),
    mc(R`Mis märki peab olema $Q$?`, [R`*Vastupidist märki kui $q$, sest ta peab tõmbama`, R`Sama märki kui $q$||Siis ta lükkaks ülemist laengut veel rohkem üles.`]),
    mc(R`Vertikaalprojektsioonides: $F_1\cos\alpha + F_2\cos\alpha = F_Q$, kus $\alpha = 30^\circ$. Mis seos on külje $r$ ja kauguse $R$ vahel?`, [R`*$r = 2R\cos\alpha = \sqrt{3}R$`, R`$r = R$||Keskpunkt on tipust lähemal kui teine tipp.`, R`$r = 2R$||Vaata täisnurkset kolmnurka, mille hüpotenuus on $R$ ja kaatet $r/2$.`]),
    mc(R`Mis tuleb $Q$ väärtuseks?`, [R`*$Q = -\frac{q}{\sqrt{3}}$`, R`$Q = -q$||Arvesta, et $Q$ on tipule lähemal kui teised laengud ($R < r$).`, R`$Q = -\sqrt{3}q$||Kontrolli: $\frac{2q^2\cos 30^\circ}{r^2} = \frac{q|Q|}{R^2}$ ja $R^2 = r^2/3$.`])
  ],
  sol: R`Ülemisele laengule mõjuvad tõukejõud $F_1$ ja $F_2$ (külgedelt) ning keskpunkti laengu tõmbejõud $F_Q$. Tasakaal: $\vec F_1 + \vec F_2 + \vec F_Q = 0$, vertikaalprojektsioonides
$$F_1\cos\alpha + F_2\cos\alpha - F_Q = 0, \qquad \frac{2q^2}{4\pi\varepsilon_0r^2}\cos\alpha = \frac{|q||Q|}{4\pi\varepsilon_0R^2}$$
Täisnurksest kolmnurgast $\cos\alpha = \frac{r/2}{R}$, s.t. $r = 2R\cos\alpha$. Asendame:
$$|Q| = 2|q|\cos\alpha\,\frac{R^2}{r^2} = \frac{2|q|\cos\alpha}{4\cos^2\alpha} = \frac{|q|}{2\cos 30^\circ} = \frac{|q|}{\sqrt 3}$$
Laeng peab tõmbama, seega $Q = -\frac{q}{\sqrt 3}$.`,
  ans: R`$Q = -q/\sqrt{3}$`
});

P({ id: '12', b: 10, k: 'K',
  text: R`Kaks ühesugust kuulikest massiga 0,10 g ripuvad kumbki 10 cm pikkuse ja ühes punktis kinnitatud niidi otsas. Saanud võrdsed laengud, tõukuvad kuulikesed nii, et niidid moodustavad nurga 60°. Määrata kuulikeste laeng.`,
  fig: hangFig(30),
  given: R`<b>Andmed:</b> $m = 0.10\ \text{g}$, $l = 10\ \text{cm}$, $\alpha = 60^\circ$.<br><b>Leida:</b> $q$.`,
  viz: HANG,
  steps: [
    frc(R`Joonesta vasakpoolsele kuulikesele mõjuvad jõud.`, hangScene(30)),
    num(R`Kuulikeste vahekaugus $r = 2l\sin\frac{\alpha}{2}$:`, 0.1, 'm', { label: R`r` }),
    num(R`Elektriline tõukejõud ($F_e = mg\tan\frac{\alpha}{2}$):`, 5.66e-4, 'N', { label: R`F_e` }),
    num(R`Kuulikese laeng:`, 2.51e-8, 'C', { final: true, label: R`q`, hint: R`$q = r\sqrt{4\pi\varepsilon_0F_e}$` })
  ],
  sol: R`Kuulikesele mõjuvad $m\vec g$, $\vec T$ ja $\vec F_e$; tasakaalus on nende summa null. Jõudude kolmnurgast $\tan\frac{\alpha}{2} = \frac{F_e}{mg}$:
$$F_e = mg\tan 30^\circ = 10^{-4}\cdot 9.8\cdot 0.577 \approx 5.7\cdot 10^{-4}\ \text{N}$$
Kaugus $r = 2l\sin 30^\circ = 0.10\ \text{m}$. Coulombi seadusest $F_e = \frac{q^2}{4\pi\varepsilon_0r^2}$:
$$q = r\sqrt{4\pi\varepsilon_0F_e} = 0.10\sqrt{4\pi\cdot 8.85\cdot 10^{-12}\cdot 5.7\cdot 10^{-4}} \approx 25\ \text{nC}$$`,
  ans: R`25 nC (konspektis 24 nC)`
});

P({ id: '13', b: 10, k: 'T',
  text: R`Kaks väikest ühesugust kuulikest ripuvad ühes punktis kinnitatud ühepikkuste niitide otsas. Milline laeng tuleb anda kuulikestele, et niidi pinge saaks võrdseks 98 mN? Niidi pikkus on 10 cm, kuulikese mass 5,0 g. Kui suure nurga moodustavad niidid sel juhul?`,
  fig: hangFig(60),
  given: R`<b>Andmed:</b> $T = 98\ \text{mN}$, $l = 10\ \text{cm}$, $m = 5.0\ \text{g}$, $\varepsilon = 1$.<br><b>Leida:</b> $q$, $\alpha$.`,
  viz: HANG,
  steps: [
    frc(R`Joonesta vasakpoolsele kuulikesele mõjuvad jõud.`, hangScene(60)),
    mc(R`$m\vec g$ ja $\vec F_e$ on risti ning nende summa on võrdvastupidine niidi tõmbega. Kuidas leida $F_e$?`, [R`*$F_e = \sqrt{T^2 - (mg)^2}$`, R`$F_e = T - mg$||Jõud on vektorid ja omavahel risti, kasuta Pythagorast.`, R`$F_e = \sqrt{T^2 + (mg)^2}$||$T$ on täisnurkse kolmnurga hüpotenuus.`]),
    num(R`Elektriline tõukejõud:`, 0.0849, 'N', { label: R`F_e` }),
    num(R`Nurk niitide vahel ($\sin\frac{\alpha}{2} = \frac{F_e}{T}$):`, 120, '°', { label: R`\alpha`, abs: 2, alts: [{ a: 60, msg: 'See on pool nurgast (iga niidi nurk vertikaaliga). Niitide vaheline nurk on kaks korda suurem.' }] }),
    num(R`Kuulikeste vahekaugus:`, 0.1732, 'm', { label: R`r`, hint: R`$r = 2l\sin\frac{\alpha}{2}$` }),
    num(R`Ühe kuulikese laeng:`, 5.32e-7, 'C', { final: true, label: R`q`, alts: [{ a: 1.064e-6, msg: 'See on mõlema kuulikese laeng kokku (raamatu vastus). Küsitud on ühe kuulikese laeng.' }] })
  ],
  sol: R`Kuulikese tasakaal: $\vec T + \vec F_e + m\vec g = 0$. $F_e$ ja $mg$ on ristküliku küljed, $T$ selle diagonaal:
$$F_e = \sqrt{T^2 - m^2g^2} = \sqrt{0.098^2 - (0.005\cdot 9.8)^2} \approx 0.085\ \text{N}$$
$$\sin\frac{\alpha}{2} = \frac{F_e}{T} = 0.866 \Rightarrow \alpha = 120^\circ, \qquad r = 2l\sin 60^\circ \approx 0.17\ \text{m}$$
$$q = r\sqrt{4\pi\varepsilon_0F_e} = 0.17\sqrt{4\pi\cdot 8.85\cdot 10^{-12}\cdot 0.085} \approx 0.53\ \mu\text{C}$$`,
  ans: R`Ühe kuulikese laeng 0,53 µC, nurk niitide vahel 120°.`,
  after: R`Raamatu vastus 1,1 µC on mõlemale kuulikesele kokku antud laeng ($2\cdot 0.53\ \mu\text{C}$).`
});

P({ id: '16', b: 10, k: 'K',
  text: R`Kaks laetud kuulikest ripuvad võrdse pikkusega ühes punktis kinnitatud niitide otsas algul õhus, seejärel pannakse nad õlisse, mille elektriline läbitavus on 2,0 ja tihedus 0,90 g/cm³. Kui suur on kuulikeste tihedus, kui nurk niitide vahel õlis ja õhus on võrdne?`,
  fig: hangFig(25, { oil: 'õli: ε = 2,0, ρ = 0,90 g/cm³' }),
  given: R`<b>Andmed:</b> $\varepsilon = 2.0$, $\rho_{õ} = 0.90\ \text{g/cm}^3$, $\alpha_{õhk} = \alpha_{õli}$.<br><b>Leida:</b> kuulikese tihedus $\rho_k$.`,
  steps: [
    frc(R`Joonesta õlis rippuvale kuulikesele mõjuvad jõud.`, hangScene(25, true)),
    mc(R`Õlis on $\tan\frac{\alpha}{2} = \frac{F_e/\varepsilon}{mg - F_ü}$. Mis tingimus tuleb nurkade võrdsusest (kaugused on samad)?`, [R`*$mg = \varepsilon(mg - F_ü)$`, R`$mg = mg - F_ü$||Õlis on ka elektriline jõud $\varepsilon$ korda väiksem.`, R`$\varepsilon\,mg = mg - F_ü$||Elektriline jõud on õlis väiksem, seega õlis peab ka "efektiivne raskus" olema väiksem, mitte suurem.`]),
    mc(R`$m = \rho_kV$ ja $F_ü = \rho_õVg$. Milline on kuulikese tihedus?`, [R`*$\rho_k = \frac{\varepsilon\rho_õ}{\varepsilon - 1}$`, R`$\rho_k = \varepsilon\rho_õ$||Lahenda $\rho_k = \varepsilon(\rho_k - \rho_õ)$ uuesti.`, R`$\rho_k = \frac{\rho_õ}{\varepsilon - 1}$||Lugejas peab olema ka $\varepsilon$.`]),
    num(R`Kuulikeste tihedus:`, 1800, 'kg/m³', { final: true, label: R`\rho_k`, alts: [{ a: 1600, msg: 'See tuleb õli tihedusega 0,8 g/cm³ (konspekti tekstis). Raamatus on 0,90 g/cm³.' }] })
  ],
  sol: R`Õhus: $\tan\frac{\alpha}{2} = \frac{F_e}{mg}$. Õlis on elektriline jõud $\varepsilon$ korda väiksem ja lisandub üleslükkejõud: $\tan\frac{\alpha}{2} = \frac{F_e/\varepsilon}{mg - F_ü}$. Nurgad ja kaugused on võrdsed, seega
$$mg = \varepsilon(mg - F_ü) \quad\Rightarrow\quad \rho_kVg = \varepsilon(\rho_k - \rho_õ)Vg \quad\Rightarrow\quad \rho_k = \frac{\varepsilon\rho_õ}{\varepsilon - 1} = \frac{2\cdot 900}{1} = 1800\ \text{kg/m}^3$$`,
  ans: R`$1.8\cdot 10^3\ \text{kg/m}^3$`,
  after: R`Konspekti koduste ülesannete loendis on õli tiheduseks kirjutatud 0,8 g/cm³, aga vastus 1800 kg/m³ klapib raamatu andmega 0,90 g/cm³.`,
  solviz: Viz.html('hang', { medium: true, title: 'Õhus ja õlis', cap: R`Lülita "Õhk / õli" ja muuda kuuli tihedust. Kriipsjoon näitab õhus olevat asendit. Kui $\rho_k = 2\rho_õ$, on nurgad võrdsed: õlis väheneb elektriline jõud 2 korda ja efektiivne raskus samuti 2 korda.` })
});

P({ id: '17', b: 10, k: 'T',
  text: R`Samas punktis kinnitatud ühepikkuste niitide otsas ripuvad samanimeliselt laetud kuulid kumbki massiga 1,2 g. Kui suur peab olema kuulide ruumala, et nurk niitide vahel vaakumis oleks võrdne nurgaga petrooleumis ($\varepsilon = 2.0$)?`,
  given: R`<b>Andmed:</b> $m = 1.2\ \text{g}$, $\varepsilon_1 = 1$, $\varepsilon_2 = 2.0$, petrooleumi tihedus $\rho = 800\ \text{kg/m}^3$ (kogu lisast), $\alpha_1 = \alpha_2$.<br><b>Leida:</b> $V$.`,
  viz: HANG,
  steps: [
    frc(R`Joonesta petrooleumis rippuvale kuulile mõjuvad jõud.`, hangScene(25, true)),
    mc(R`Mis jõud mõjub petrooleumis lisaks ja kuidas muutub elektriline jõud?`, [R`*Lisandub üleslükkejõud $F_ü = \rho Vg$, elektriline jõud on $\varepsilon$ korda väiksem`, R`Lisandub hõõrdejõud||Kuulid on paigal, hõõrdejõudu pole. Vedelik tõukab kuuli üles.`, R`Elektriline jõud on $\varepsilon$ korda suurem||Dielektrikus on laengute vastastikmõju nõrgem.`]),
    mc(R`Nurkade võrdsusest $\tan\alpha_1 = \tan\alpha_2$ saame:`, [R`*$\varepsilon_1m = \varepsilon_2(m - \rho V)$`, R`$\varepsilon_2m = \varepsilon_1(m - \rho V)$||Petrooleumis on nii elektriline jõud kui ka efektiivne raskus väiksem. Vaata, kumb $\varepsilon$ kummale poole käib.`, R`$m = \rho V$||Siis kuul hõljuks ja nurk oleks 180°.`]),
    num(R`Kuuli ruumala:`, 7.5e-7, 'm³', { final: true, label: R`V`, hint: R`$V = \frac{m(\varepsilon_2 - \varepsilon_1)}{\varepsilon_2\rho}$` })
  ],
  sol: R`Ülesandes 13 nähtud jõudude kolmnurgast, aga nüüd lisandub üleslükkejõud $F_ü = \rho Vg$ (üles):
$$\tan\alpha = \frac{F_e}{mg - F_ü} = \frac{q^2}{4\pi\varepsilon_0\varepsilon r^2(m - \rho V)g}$$
Nurgad ja seega ka kaugused on võrdsed, õhus $\rho_{õhk}V \approx 0$:
$$\varepsilon_1m = \varepsilon_2(m - \rho V) \quad\Rightarrow\quad V = \frac{m(\varepsilon_2 - \varepsilon_1)}{\varepsilon_2\rho} = \frac{1.2\cdot 10^{-3}\cdot 1}{2\cdot 800} = 7.5\cdot 10^{-7}\ \text{m}^3$$`,
  ans: R`0,75 cm³`
});

/* ---------- Sarnased ---------- */

P({ id: '6', b: 10, k: 'S',
  text: R`Kahe samanimelise punktlaengu vahel, mis paiknevad petrooleumis ($\varepsilon = 2.0$) teineteisest 10 cm kaugusel, mõjub elektrostaatiline tõukejõud. Kui kaugele teineteisest tuleks paigutada punktlaengud vaakumis, et tõukejõud oleks niisama suur?`,
  given: R`<b>Andmed:</b> $\varepsilon = 2.0$, $r = 10\ \text{cm}$, $F_{vaakum} = F_{petrooleum}$.<br><b>Leida:</b> $r_0$.`,
  steps: [
    mc(R`Võrdsete jõudude tingimus:`, [R`*$\frac{q_1q_2}{4\pi\varepsilon_0r_0^2} = \frac{q_1q_2}{4\pi\varepsilon_0\varepsilon r^2}$, seega $r_0 = r\sqrt{\varepsilon}$`, R`$r_0 = \varepsilon r$||Kaugus on ruudus, võta ruutjuur.`, R`$r_0 = r/\sqrt{\varepsilon}$||Vaakumis on jõud tugevam, seega sama jõu jaoks peavad laengud olema kaugemal.`]),
    num(R`Kaugus vaakumis:`, 0.1414, 'm', { final: true, label: R`r_0` })
  ],
  sol: R`$\frac{q_1q_2}{4\pi\varepsilon_0r_0^2} = \frac{q_1q_2}{4\pi\varepsilon_0\varepsilon r^2} \Rightarrow r_0 = r\sqrt{\varepsilon} = 10\sqrt 2 \approx 14\ \text{cm}$.`,
  ans: R`14 cm`
});

P({ id: '9', b: 10, k: 'S',
  text: R`Punktlaengud 5,0 nC ja −15 nC asetsevad teineteisest 8,0 cm kaugusel. Kuhu tuleks paigutada kolmas laeng, et esimese kahe laengu mõju temale tasakaalustuks?`,
  given: R`<b>Andmed:</b> $q_1 = 5.0\ \text{nC}$, $q_2 = -15\ \text{nC}$, $d = 8.0\ \text{cm}$.<br><b>Leida:</b> kolmanda laengu asukoht.`,
  viz: Viz.html('field', { w: 380, h: 200, charges: [{ x: 210, y: 100, q: 1, l: '5 nC' }, { x: 290, y: 100, q: -3, l: '−15 nC', r: 13 }], probe: [120, 100], per: 9,
    cap: R`Lohista proovilaengut. Laengute vahel on mõlema laengu väljad samasuunalised (paremale). Väljaspool, väiksema laengu taga, on need vastassuunalised ja ühes punktis võrdsed.` }),
  steps: [
    mc(R`Kus saab kolmas laeng olla tasakaalus?`, [R`*Väljaspool laenguid, väiksema laengu (5 nC) taga`, R`Laengute vahel||Seal tõmbab üks ja lükkab teine samas suunas, jõud ei tasakaalustu.`, R`Suurema laengu taga||Seal on suurem laeng ka lähemal, tema jõud on alati suurem.`]),
    mc(R`Olgu $x$ kaugus 5 nC laengust. Tasakaalu tingimus:`, [R`*$\frac{5}{x^2} = \frac{15}{(x + 8)^2}$`, R`$\frac{5}{x^2} = \frac{15}{(8 - x)^2}$||See käib laengute vahelise punkti kohta.`, R`$\frac{5}{x} = \frac{15}{x + 8}$||Coulombi jõud on pöördvõrdeline kauguse ruuduga.`]),
    num(R`Kaugus positiivsest laengust:`, 0.1093, 'm', { final: true, label: R`x`, hint: R`$\frac{x + 8}{x} = \sqrt 3$` })
  ],
  sol: R`Laengute vahel lükkab positiivne ja tõmbab negatiivne laeng samas suunas, seega tasakaalupunkt on väljaspool, väiksema laengu poolel. Kaugusel $x$ laengust $q_1$:
$$\frac{q_1}{x^2} = \frac{|q_2|}{(x + d)^2} \Rightarrow \frac{x + d}{x} = \sqrt 3 \Rightarrow x = \frac{d}{\sqrt 3 - 1} = \frac{8.0}{0.732} \approx 11\ \text{cm}$$
See on 11 cm positiivsest ja 19 cm negatiivsest laengust.`,
  ans: R`11 cm kaugusele positiivsest ja 19 cm kaugusele negatiivsest laengust (laengute ühendussirgel).`
});

P({ id: '11', b: 10, k: 'S',
  text: R`Ruudu tippudes paiknevad ühesugused punktlaengud $q$. Milline laeng tuleb paigutada ruudu keskpunkti, et selle mõju tasakaalustaks laengutevahelised tõukejõud?`,
  fig: `<svg viewBox="0 0 260 240" class="gsvg"><rect x="50" y="30" width="160" height="160" class="thin"/><line x1="50" y1="190" x2="210" y2="30" class="dash"/>` + Q(50, 30, 1, 'q', -18, 0) + Q(210, 30, 1, 'q', 18, 0) + Q(50, 190, 1, 'q', -18, 4) + Q(210, 190, 1, 'q', 18, 4) + Q(130, 110, -1, 'Q', 20, -8) + `<text x="130" y="215" text-anchor="middle">a</text></svg>`,
  given: R`<b>Andmed:</b> neli laengut $q$, ruudu külg $a$.<br><b>Leida:</b> $Q$.`,
  steps: [
    mc(R`Vaatame paremat ülemist laengut. Teised laengud lükkavad teda: kaks naaberlaengut kaugusel $a$ ja vastastipu laeng kaugusel $a\sqrt 2$. Milline on nende jõudude resultant diagonaali sihis?`, [R`*$\frac{q^2}{4\pi\varepsilon_0}\left(\frac{2\cos 45^\circ}{a^2} + \frac{1}{2a^2}\right)$`, R`$\frac{q^2}{4\pi\varepsilon_0}\cdot\frac{3}{a^2}$||Naaberlaengute jõud on diagonaali suhtes 45° nurga all, vastastipu laeng on kaugemal ($r^2 = 2a^2$).`, R`$\frac{q^2}{4\pi\varepsilon_0}\cdot\frac{2}{a^2}$||Unustasid vastastipu laengu.`]),
    mc(R`Keskpunkt on tipust kaugusel $\frac{a}{\sqrt 2}$. Milline peab olema $Q$?`, [R`*$Q = -\frac{(2\sqrt 2 + 1)q}{4}$`, R`$Q = -\frac{q}{\sqrt 2}$||Arvesta kõigi kolme laengu jõude.`, R`$Q = -(2\sqrt 2 + 1)q$||Keskpunkti laeng on tipule lähemal ($r^2 = a^2/2$), see vähendab vajalikku laengut 4 korda.`])
  ],
  sol: R`Ühele tipulaengule mõjuv tõukejõudude resultant diagonaali sihis:
$$F = \frac{q^2}{4\pi\varepsilon_0}\left(2\cdot\frac{\cos 45^\circ}{a^2} + \frac{1}{2a^2}\right) = \frac{q^2}{4\pi\varepsilon_0a^2}\cdot\frac{2\sqrt 2 + 1}{2}$$
Keskpunkti laeng peab tõmbama sama jõuga kauguselt $a/\sqrt 2$: $\frac{q|Q|}{4\pi\varepsilon_0a^2/2} = F$, millest $|Q| = \frac{(2\sqrt 2 + 1)q}{4}$, märk vastupidine.`,
  ans: R`$Q = -\frac{(2\sqrt 2 + 1)q}{4} \approx -0.96q$`
});

P({ id: '14', b: 10, k: 'S',
  text: R`Ühes punktis kinnitatud 2,0 m pikkuste niitide otsas ripuvad kõrvuti kerakesed massiga 1,0 g. Kummalegi kerakesele anti laeng 33 nC. Kui suure nurga moodustavad niidid pärast kerakeste laadimist? Eeldada, et otsitav nurk on väike.`,
  given: R`<b>Andmed:</b> $l = 2.0\ \text{m}$, $m = 1.0\ \text{g}$, $q = 33\ \text{nC}$, $\alpha$ väike.<br><b>Leida:</b> $\alpha$.`,
  viz: HANG,
  steps: [
    mc(R`Väikese nurga korral $\tan\frac{\alpha}{2} \approx \sin\frac{\alpha}{2} = \frac{r}{2l}$. Milline võrrand annab kauguse $r$?`, [R`*$\frac{q^2}{4\pi\varepsilon_0r^2mg} = \frac{r}{2l}$, seega $r^3 = \frac{2lq^2}{4\pi\varepsilon_0mg}$`, R`$\frac{q^2}{4\pi\varepsilon_0r^2} = mg$||Elektriline jõud ei ole võrdne raskusjõuga, nende suhe on $\tan\frac{\alpha}{2}$.`]),
    num(R`Kerakeste vahekaugus:`, 0.1587, 'm', { label: R`r` }),
    num(R`Nurk niitide vahel ($\alpha \approx r/l$ radiaanides):`, 4.55, '°', { final: true, label: R`\alpha`, tol: 0.04 })
  ],
  sol: R`$\tan\frac{\alpha}{2} = \frac{F_e}{mg}$ ja väikese nurga korral $\tan\frac{\alpha}{2} \approx \frac{r}{2l}$:
$$r^3 = \frac{2lq^2}{4\pi\varepsilon_0mg} = \frac{2\cdot 2\cdot 9\cdot 10^9\cdot(33\cdot 10^{-9})^2}{10^{-3}\cdot 9.8} \approx 4.0\cdot 10^{-3}\ \text{m}^3 \Rightarrow r \approx 0.16\ \text{m}$$
$\alpha \approx \frac{r}{l} = 0.079\ \text{rad} \approx 4.5^\circ$.`,
  ans: R`umbes 4,5°`
});

P({ id: '15', b: 10, k: 'S',
  text: R`Kaks väikest metallkuulikest ripuvad ühes punktis kinnitatud ühepikkuste niitide otsas. Kuulikestele on antud võrdsed laengud ja nad seisavad teineteisest 10 cm kaugusel. Ühe kuulikese laeng neutraliseeritakse, mistõttu kuulikesed puutuvad kokku ning seejärel eemalduvad uuesti. Millisel kaugusel paiknevad kuulikesed nüüd? Eeldada, et nurk niitide vahel on väike.`,
  given: R`<b>Andmed:</b> $r_1 = 10\ \text{cm}$, laengud alguses $q$ ja $q$, nurk väike.<br><b>Leida:</b> $r_2$.`,
  steps: [
    mc(R`Mis laengud on kuulikestel pärast kokkupuudet?`, [R`*Mõlemal $q/2$`, R`Ühel $q$, teisel 0||Kokkupuutel jaotub laeng ühesuguste metallkuulikeste vahel võrdselt.`, R`Mõlemal $q$||Üks laeng neutraliseeriti, kokku on alles ainult $q$.`]),
    mc(R`Väikese nurga korral $r^3 = \frac{2lq_1q_2}{4\pi\varepsilon_0mg}$. Kuidas muutub $r^3$?`, [R`*Väheneb 4 korda`, R`Väheneb 2 korda||Laengute korrutis $\frac{q}{2}\cdot\frac{q}{2} = \frac{q^2}{4}$.`]),
    num(R`Uus kaugus:`, 0.063, 'm', { final: true, label: R`r_2`, hint: R`$r_2 = \frac{r_1}{\sqrt[3]{4}}$` })
  ],
  sol: R`Väikese nurga korral (vt ülesanne 14) $r^3 = \frac{2lq_1q_2}{4\pi\varepsilon_0mg}$. Pärast kokkupuudet on mõlemal $q/2$, korrutis väheneb 4 korda:
$$r_2 = \frac{r_1}{\sqrt[3]{4}} = \frac{10}{1.587} \approx 6.3\ \text{cm}$$`,
  ans: R`6,3 cm`
});

/* Jõudude kolmnurk: kust tuleb tan(α/2) */
const TRI_NOTE = R`<div class="note">📐 Seos $\tan\frac{\alpha}{2} = \frac{F_e}{mg}$ ei ole füüsika valem, mida peaks pähe õppima. See loetakse oma joonisest: $m\vec g$ ja $\vec F_e$ on risti, niit on nende summa sihis, tekib täisnurkne kolmnurk (vastaskaatet $F_e$, lähiskaatet $mg$). Samamoodi $\sin\frac{\alpha}{2} = \frac{r/2}{l}$. Vaata valemite sahtlis „Matemaatika abiks“.</div>`;
PROBLEMS.filter(p => p.b === 10 && ['12', '13', '14', '16', '17'].includes(p.id)).forEach(p => { p.sol += TRI_NOTE; });
})();
