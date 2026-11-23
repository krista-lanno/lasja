/* 13. Tarbijate ühendusviisid (kogu II). Tunnis: 185, 188, 190, 194, 198, 201. Kodus: 189, 191, 192, 199, 203. */
(function () {
const R = String.raw;
const W = CK.wire;
const flowCap = 'Punased täpid näitavad voolu (kokkuleppeline suund on plussist miinuse poole). Mida kiiremini täpid liiguvad, seda suurem on voolutugevus selles harus.';

/* 185: segaühendus */
function fig185(box) {
  const s = W([[20, 100], [60, 100]], 1) +
    W([[60, 100], [60, 50], [160, 50], [160, 100]], 0.5) + W([[60, 100], [60, 150], [160, 150], [160, 100]], 0.5) +
    W([[160, 100], [200, 100]], 1) +
    W([[200, 100], [270, 100]], 0.4) + W([[270, 100], [270, 50], [360, 50], [360, 100]], 0.2) + W([[270, 100], [360, 100]], 0.2) + W([[360, 100], [400, 100]], 0.4) +
    W([[200, 100], [200, 170], [400, 170], [400, 100]], 0.6) + W([[400, 100], [440, 100]], 1) +
    CK.R(110, 50) + CK.R(110, 150) + CK.R(235, 100) + CK.R(315, 50) + CK.R(315, 100) + CK.R(300, 170) +
    CK.dot(60, 100) + CK.dot(160, 100) + CK.dot(200, 100) + CK.dot(270, 100) + CK.dot(360, 100) + CK.dot(400, 100) +
    CK.term(20, 100, 'A', 0, -10) + CK.term(440, 100, 'B', 0, -10) +
    (box ? `<rect x="45" y="30" width="130" height="138" class="box"/><text x="52" y="26" class="ckt b">R₁</text><rect x="255" y="32" width="120" height="85" class="box" style="stroke:var(--good)"/><text x="345" y="28" class="ckt b">R₄</text><rect x="190" y="20" width="225" height="168" class="box" style="stroke:var(--pos)"/><text x="196" y="200" class="ckt b">R₂</text>` : '');
  return CK.svg(460, box ? 210 : 195, s, box ? 'Plokid: R₁ = kaks rööbiti; R₄ = kaks rööbiti; R₃ = R + R₄; R₂ = R rööbiti R₃-ga.' : flowCap);
}

P({ id: '185', b: 13, k: 'T',
  text: R`Arvutada joonisele 10 vastava vooluahela kogutakistus punktide A ja B vahel, kui kõik takistused on 10 Ω.`,
  fig: fig185(false),
  given: R`<b>Andmed:</b> iga takisti $R = 10\ \Omega$.<br><b>Leida:</b> $R_{AB}$.`,
  steps: [
    mc(R`Kuidas segaühendust lahendada?`, [R`*Jagada skeem plokkideks, mis on kas ainult jadamisi või ainult rööbiti, ja liikuda seest väljapoole`, R`Liita kõik takistused||See kehtib ainult jadaühenduse kohta.`, R`Kasutada rööpühenduse valemit kõigi 6 takisti jaoks||Takistid ei ole kõik samade punktide vahel.`]),
    num(R`Vasakpoolne plokk $R_1$ (kaks takistit rööbiti):`, 5, 'Ω', { label: R`R_1` }),
    num(R`Parempoolne ülemine plokk $R_4$ (kaks rööbiti):`, 5, 'Ω', { label: R`R_4` }),
    num(R`$R_3 = R + R_4$:`, 15, 'Ω', { label: R`R_3` }),
    num(R`$R_2$ ($R$ ja $R_3$ rööbiti):`, 6, 'Ω', { label: R`R_2`, hint: R`$R_2 = \frac{RR_3}{R + R_3}$` }),
    num(R`Kogutakistus:`, 11, 'Ω', { final: true, label: R`R_{AB}` })
  ],
  sol: R`Jagame skeemi plokkideks:` + fig185(true) + R`
$$R_1 = \frac{R}{2} = 5\ \Omega, \quad R_4 = \frac{R}{2} = 5\ \Omega, \quad R_3 = R + R_4 = 15\ \Omega$$
$$R_2 = \frac{RR_3}{R + R_3} = \frac{10\cdot 15}{25} = 6\ \Omega, \qquad R_{AB} = R_1 + R_2 = 11\ \Omega$$`,
  ans: R`11 Ω`
});

function par3(labels, I) {
  return CK.svg(330, 200, W([[40, 100], [100, 100]], I[0]) + W([[100, 100], [100, 30], [250, 30], [250, 100]], I[1]) + W([[100, 100], [250, 100]], I[2]) +
    W([[100, 100], [100, 170], [250, 170], [250, 100]], I[3]) + W([[250, 100], [290, 100]], I[0]) +
    CK.lamp(175, 30, labels[0]) + CK.lamp(175, 100, labels[1]) + CK.lamp(175, 170, labels[2], 0, 30) + CK.dot(100, 100) + CK.dot(250, 100) +
    CK.term(40, 100) + CK.term(290, 100) + CK.text(40, 125, '+', 'b') + CK.text(290, 125, '−', 'b') + CK.text(165, 197, 'U', ''), flowCap);
}

P({ id: '188', b: 13, k: 'T',
  text: R`Ruumi valgustusseadmes on paralleelselt lülitatud lambid, mille takistused on 200, 400 ja 600 Ω. Arvutada toitevoolu tugevus ja lampe läbivate voolude tugevused, kui pinge on 220 V.`,
  fig: par3(['200 Ω', '400 Ω', '600 Ω'], [1, 0.55, 0.27, 0.18]),
  given: R`<b>Andmed:</b> $R_1 = 200\ \Omega$, $R_2 = 400\ \Omega$, $R_3 = 600\ \Omega$, $U = 220\ \text{V}$, rööpühendus.<br><b>Leida:</b> $I_1$, $I_2$, $I_3$, $I$.`,
  steps: [
    mc(R`Mis on rööpühenduses kõigil lampidel ühine?`, [R`*Pinge $U$`, R`Voolutugevus||Väiksema takistusega lambist läheb rohkem voolu.`, R`Võimsus||Võimsus $N = U^2/R$ on erinev.`]),
    num(R`Kogutakistus:`, 109.1, 'Ω', { label: R`R`, hint: R`$\frac{1}{R} = \frac{1}{R_1} + \frac{1}{R_2} + \frac{1}{R_3}$` }),
    num(R`Vool läbi 200 Ω lambi:`, 1.1, 'A', { final: true, label: R`I_1` }),
    num(R`Vool läbi 400 Ω lambi:`, 0.55, 'A', { final: true, label: R`I_2` }),
    num(R`Vool läbi 600 Ω lambi:`, 0.367, 'A', { final: true, label: R`I_3` }),
    num(R`Toitevool:`, 2.02, 'A', { final: true, label: R`I`, hint: R`$I = I_1 + I_2 + I_3$` })
  ],
  sol: R`Rööpühenduses on kõigil lampidel pinge $U$, Ohmi seadusest:
$$I_1 = \frac{220}{200} = 1.1\ \text{A}, \quad I_2 = \frac{220}{400} = 0.55\ \text{A}, \quad I_3 = \frac{220}{600} \approx 0.37\ \text{A}$$
$$I = I_1 + I_2 + I_3 \approx 2.0\ \text{A}, \qquad R = \frac{1}{1/200 + 1/400 + 1/600} \approx 110\ \Omega$$`,
  ans: R`2,02 A; 1,10 A; 0,550 A; 0,367 A`
});

P({ id: '189', b: 13, k: 'K',
  text: R`Vooluringi, mida läbib vool tugevusega 1,40 A, on lülitatud paralleelselt kolm hõõglampi takistusega 240, 400 ja 200 Ω. Leida kogutakistus ja pinge.`,
  fig: par3(['240 Ω', '400 Ω', '200 Ω'], [1, 0.36, 0.21, 0.43]),
  given: R`<b>Andmed:</b> $I = 1.40\ \text{A}$, $R_1 = 240\ \Omega$, $R_2 = 400\ \Omega$, $R_3 = 200\ \Omega$.<br><b>Leida:</b> $R$, $U$.`,
  steps: [
    num(R`Kogutakistus:`, 85.7, 'Ω', { final: true, label: R`R`, alts: [{ a: 840, msg: 'Rööpühenduses liidetakse pöördväärtused, mitte takistused.' }] }),
    num(R`Pinge lampidel:`, 120, 'V', { final: true, label: R`U` })
  ],
  sol: R`$\frac{1}{R} = \frac{1}{240} + \frac{1}{400} + \frac{1}{200} \Rightarrow R \approx 85.7\ \Omega$ ja $U = IR = 1.4\cdot 85.7 = 120\ \text{V}$.`,
  ans: R`85,7 Ω; 120 V`
});

P({ id: '190', b: 13, k: 'T',
  text: R`Pinge generaatori klemmidel on 120 V. Järjestikku ühendatud välisvooluring koosneb reostaadist takistusega 6,0 Ω, vooluga 10 A toidetavast kaarlambist ja ühendusjuhtmetest takistusega 0,50 Ω. Leida kaarlambi takistus ja pinge tema klemmidel.`,
  fig: CK.svg(340, 150, W([[60, 30], [60, 20], [300, 20], [300, 120], [40, 120], [40, 40]], 1) + CK.bat(50, 75, 'u', 'U = 120 V', -40, 5) + W([[40, 40], [40, 60]], 0) +
    CK.Rv(120, 20, false, 'R = 6 Ω', 0, -14) + CK.lamp(300, 70, 'lamp', 30, 5) + CK.R(170, 120, false, 'Rⱼ = 0,5 Ω', 0, 26), 'Jadaühendus: kõiki tarbijaid läbib sama vool.'),
  given: R`<b>Andmed:</b> $U = 120\ \text{V}$, $R_r = 6.0\ \Omega$, $R_j = 0.50\ \Omega$, $I = 10\ \text{A}$.<br><b>Leida:</b> $R_l$, $U_l$.`,
  steps: [
    num(R`Kogu ahela takistus:`, 12, 'Ω', { label: R`R` }),
    num(R`Kaarlambi takistus:`, 5.5, 'Ω', { final: true, label: R`R_l` }),
    num(R`Pinge kaarlambi klemmidel:`, 55, 'V', { final: true, label: R`U_l`, alts: [{ a: 120, msg: 'See on kogu ahela pinge. Lambil on ainult osa sellest: $U_l = IR_l$.' }] })
  ],
  sol: R`Ohmi seadus kogu ahela kohta: $I = \frac{U}{R_r + R_j + R_l}$, seega $R_l = \frac{U}{I} - R_r - R_j = 12 - 6 - 0.5 = 5.5\ \Omega$. Lambil $U_l = IR_l = 10\cdot 5.5 = 55\ \text{V}$.`,
  ans: R`5,5 Ω; 55 V`
});

P({ id: '191', b: 13, k: 'K',
  text: R`Vooluahelas, mis vastab joonisel 13 esitatud skeemile, näitab ampermeeter voolutugevust 1,50 A. Takistust $R_1$ läbib vool tugevusega 0,50 A, $R_2 = 2.0\ \Omega$ ja $R_3 = 6.0\ \Omega$. Kui suur on takistus $R_1$? Arvutada takistusi $R_2$ ja $R_3$ läbivad voolutugevused.`,
  fig: CK.svg(340, 180, W([[20, 90], [80, 90]], 1) + W([[80, 90], [80, 25], [220, 25], [220, 90]], 0.33) + W([[80, 90], [220, 90]], 0.5) + W([[80, 90], [80, 155], [220, 155], [220, 90]], 0.17) + W([[220, 90], [320, 90]], 1) +
    CK.R(150, 25, false, 'R₁') + CK.R(150, 90, false, 'R₂') + CK.R(150, 155, false, 'R₃', 0, 26) + CK.meter(270, 90, 'A') + CK.dot(80, 90) + CK.dot(220, 90), 'Joon. 13: kolm takistit rööbiti, ampermeeter mõõdab koguvoolu.'),
  given: R`<b>Andmed:</b> $I = 1.50\ \text{A}$, $I_1 = 0.50\ \text{A}$, $R_2 = 2.0\ \Omega$, $R_3 = 6.0\ \Omega$.<br><b>Leida:</b> $R_1$, $I_2$, $I_3$.`,
  steps: [
    num(R`Harusid $R_2$ ja $R_3$ läbiv vool kokku:`, 1, 'A', { label: R`I_2 + I_3` }),
    num(R`$R_2$ ja $R_3$ rööpühenduse takistus:`, 1.5, 'Ω', { label: R`R_{23}` }),
    num(R`Pinge rööpühendusel:`, 1.5, 'V', { label: R`U` }),
    num(R`Takistus $R_1$:`, 3, 'Ω', { final: true, label: R`R_1` }),
    num(R`Vool läbi $R_2$:`, 0.75, 'A', { final: true, label: R`I_2` }),
    num(R`Vool läbi $R_3$:`, 0.25, 'A', { final: true, label: R`I_3` })
  ],
  sol: R`Kirchhoffi I seadus: $I_2 + I_3 = I - I_1 = 1.0\ \text{A}$. $R_{23} = \frac{2\cdot 6}{8} = 1.5\ \Omega$, seega pinge kõigil harudel $U = 1.0\cdot 1.5 = 1.5\ \text{V}$.
$$R_1 = \frac{U}{I_1} = \frac{1.5}{0.5} = 3.0\ \Omega, \quad I_2 = \frac{1.5}{2} = 0.75\ \text{A}, \quad I_3 = \frac{1.5}{6} = 0.25\ \text{A}$$`,
  ans: R`3,0 Ω; 0,75 A; 0,25 A`,
  after: R`Konspekti koduste ülesannete loendis on vastus "3 Ω, 0,27 A, 0,25 A", seal on kirjaviga: $I_2 = 0.75\ \text{A}$ (raamatu vastus).`
});

P({ id: '192', b: 13, k: 'K',
  text: R`Voltmeeter on lülitatud joonisel 14 esitatud skeemi kohaselt. $U = 220$ V, $R_1 = 600\ \Omega$, $R_2 = 4000\ \Omega$ ja voltmeetri sisetakistus $R_V = 12\,000\ \Omega$. Millist pinget näitab voltmeeter?`,
  fig: CK.svg(320, 210, W([[30, 70], [30, 25], [290, 25], [290, 120], [240, 120]], 1) + W([[240, 120], [240, 170], [80, 170], [80, 120]], 0.75) + W([[240, 120], [240, 95], [80, 95], [80, 120]], 0.25) + W([[80, 120], [30, 120], [30, 130]], 1) +
    CK.R(160, 25, false, 'R₁') + CK.R(160, 170, false, 'R₂', 0, 28) + CK.meter(160, 95, 'V') + CK.dot(80, 120) + CK.dot(240, 120) + CK.term(30, 70) + CK.term(30, 130) + CK.text(16, 105, 'U', '') , 'Joon. 14: voltmeeter on rööbiti takistiga R₂.'),
  given: R`<b>Andmed:</b> $U = 220\ \text{V}$, $R_1 = 600\ \Omega$, $R_2 = 4000\ \Omega$, $R_V = 12\,000\ \Omega$.<br><b>Leida:</b> $U_V$.`,
  steps: [
    mc(R`Mis on skeemis voltmeetriga rööbiti?`, [R`*$R_2$; see rööpühendus on jadamisi $R_1$-ga`, R`$R_1$||Vaata joonist: voltmeeter on ühendatud $R_2$ otstega.`, R`Mitte midagi, voltmeeter on jadamisi||Voltmeeter on alati rööbiti sellega, mille pinget ta mõõdab.`]),
    num(R`$R_2$ ja voltmeetri rööpühenduse takistus:`, 3000, 'Ω', { label: R`R_{2V}` }),
    num(R`Voltmeetri näit:`, 183.3, 'V', { final: true, label: R`U_V`, alts: [{ a: 191.3, msg: 'Nii oleks ideaalse voltmeetriga. Siin on voltmeetri takistus lõplik, arvesta seda rööpühenduses.' }] })
  ],
  sol: R`$R_{2V} = \frac{R_2R_V}{R_2 + R_V} = \frac{4000\cdot 12000}{16000} = 3000\ \Omega$. Jadaühendus $R_1$-ga: $I = \frac{U}{R_1 + R_{2V}} = \frac{220}{3600}\ \text{A}$ ja
$$U_V = IR_{2V} = 220\cdot\frac{3000}{3600} \approx 183\ \text{V}$$`,
  ans: R`183 V`
});

function fig194() {
  return CK.svg(460, 268, W([[190, 25], [40, 25], [40, 170], [130, 170]], 1) + W([[130, 170], [130, 115], [390, 115], [390, 170]], 0.8) + W([[130, 170], [390, 170]], 0.2) +
    W([[130, 170], [130, 225], [390, 225], [390, 170]], 0) + W([[390, 170], [440, 170], [440, 25], [250, 25]], 1) +
    CK.R(40, 95, true, 'R₁') + CK.R(205, 115, false, 'R₂') + CK.meter(300, 115, 'A', 'R_A') + CK.R(260, 170, false, 'R₃') + CK.meter(260, 225, 'V', 'R_V', 0, 32) +
    CK.dot(130, 170, 'P', -12, 18) + CK.dot(390, 170, 'Q', 12, 18) + CK.term(190, 25) + CK.term(250, 25) + CK.text(220, 20, 'U', ''), flowCap + ' Voltmeetrit läbiv vool on tühine.');
}
P({ id: '194', b: 13, k: 'T',
  text: R`Kui palju näitab ampermeeter ja voltmeeter vooluahelas, mille skeem on esitatud joonisel 16? $U = 10$ V, $R_1 = 1.2\ \Omega$, $R_2 = 0.8\ \Omega$, $R_3 = 4\ \Omega$, $R_V = 400\ \Omega$ ja $R_A = 0.2\ \Omega$.`,
  fig: fig194(),
  given: R`<b>Andmed:</b> $U = 10\ \text{V}$, $R_1 = 1.2\ \Omega$, $R_2 = 0.8\ \Omega$, $R_3 = 4\ \Omega$, $R_V = 400\ \Omega$, $R_A = 0.2\ \Omega$.<br><b>Leida:</b> $U_V$, $I_A$.`,
  steps: [
    mc(R`Punktide P ja Q vahel on kolm haru. Mis on ülemise haru takistus?`, [R`*$R_2 + R_A = 1.0\ \Omega$`, R`$R_2 = 0.8\ \Omega$||Ampermeeter on harus jadamisi, tema takistus liitub.`, R`$\frac{R_2R_A}{R_2 + R_A}$||Ampermeeter on $R_2$-ga jadamisi, mitte rööbiti.`]),
    num(R`Ploki PQ takistus:`, 0.798, 'Ω', { label: R`R_{PQ}`, hint: R`$\frac{1}{R_{PQ}} = \frac{1}{R_2 + R_A} + \frac{1}{R_3} + \frac{1}{R_V}$` }),
    num(R`Koguvool:`, 5, 'A', { label: R`I` }),
    num(R`Voltmeetri näit:`, 4, 'V', { final: true, label: R`U_V` }),
    num(R`Ampermeetri näit:`, 4, 'A', { final: true, label: R`I_A`, alts: [{ a: 5, msg: 'See on koguvool. Ampermeeter on ainult ülemises harus.' }, { a: 1, msg: 'See vool läheb läbi $R_3$.' }] })
  ],
  sol: R`Plokk PQ on kolme haru rööpühendus: $\frac{1}{R_{PQ}} = \frac{1}{1.0} + \frac{1}{4} + \frac{1}{400} \Rightarrow R_{PQ} \approx 0.8\ \Omega$. Voltmeetri haru võib praktiliselt arvestamata jätta, sest $R_V$ on väga suur.
$$I = \frac{U}{R_1 + R_{PQ}} = \frac{10}{2.0} = 5\ \text{A}, \qquad U_V = IR_{PQ} = 4\ \text{V}, \qquad I_A = \frac{U_V}{R_2 + R_A} = \frac{4}{1.0} = 4\ \text{A}$$
Ampermeeter takistusega 0,2 Ω muudab ülemise haru takistust 25% võrra, seega ideaalne ampermeeter peaks olema palju väiksema takistusega.`,
  ans: R`Ampermeeter 4 A, voltmeeter 4 V.`
});

function shunt(lab) {
  return CK.svg(340, 150, W([[20, 75], [90, 75]], 1) + W([[90, 75], [90, 30], [250, 30], [250, 75]], 0.2) + W([[90, 75], [90, 120], [250, 120], [250, 75]], 0.8) + W([[250, 75], [320, 75]], 1) +
    CK.meter(170, 30, 'A', lab || 'R_A, I_A', 0, -19) + CK.R(170, 120, false, 'šunt R_š', 0, 26) + CK.dot(90, 75, 'P', -10, -6) + CK.dot(250, 75, 'Q', 10, -6) + CK.text(40, 65, 'I', ''),
    'Šunt on ampermeetriga rööbiti. Suurem osa voolust läheb šundist mööda, mõõteriista läbib ainult lubatud vool.');
}
P({ id: '198', b: 13, k: 'T',
  text: R`Arvutada šundid ampermeetrile mõõtepiirkonnaga 5,0 A voolutugevuste 10 A ja 50 A mõõtmiseks. Ampermeetri sisetakistus on 0,50 Ω.`,
  fig: shunt(),
  given: R`<b>Andmed:</b> $I_A = 5.0\ \text{A}$, $R_A = 0.50\ \Omega$, a) $I = 10\ \text{A}$, b) $I = 50\ \text{A}$.<br><b>Leida:</b> $R_š$.`,
  steps: [
    mc(R`Kuidas šunt ühendatakse?`, [R`*Rööbiti ampermeetriga`, R`Jadamisi ampermeetriga||Siis läbiks ampermeetrit ikka kogu vool.`]),
    mc(R`Šundi takistus:`, [R`*$R_š = \frac{I_AR_A}{I - I_A}$`, R`$R_š = \frac{I_AR_A}{I}$||Šundi läbib vool $I - I_A$, mitte $I$.`, R`$R_š = \frac{(I - I_A)R_A}{I_A}$||Pinge on mõlemal sama: $I_AR_A = (I - I_A)R_š$.`], R`Rööpühenduses on pinge sama: $I_AR_A = I_šR_š$ ja Kirchhoffi I seadusest $I_š = I - I_A$.`),
    num(R`Šunt 10 A jaoks:`, 0.5, 'Ω', { final: true, label: R`R_{š,a}` }),
    num(R`Šunt 50 A jaoks:`, 0.0556, 'Ω', { final: true, label: R`R_{š,b}` })
  ],
  sol: R`Vool $I$ hargneb punktis P: $I = I_A + I_š$. Šundil ja ampermeetril on sama pinge $U = I_AR_A$:
$$R_š = \frac{U}{I_š} = \frac{I_AR_A}{I - I_A}, \qquad R_{š,a} = \frac{5\cdot 0.5}{5} = 0.50\ \Omega, \qquad R_{š,b} = \frac{5\cdot 0.5}{45} \approx 0.056\ \Omega$$`,
  ans: R`0,50 Ω ja 0,056 Ω`
});

P({ id: '199', b: 13, k: 'K',
  text: R`Ampermeetriga võib mõõta kuni 1,50 A tugevust voolu. Ampermeetri sisetakistus on 0,250 Ω. Kui suur peab olema šundi takistus, et ampermeetriga võiks mõõta voolutugevust kuni 5,00 A?`,
  fig: shunt(),
  given: R`<b>Andmed:</b> $I_A = 1.50\ \text{A}$, $R_A = 0.250\ \Omega$, $I = 5.00\ \text{A}$.<br><b>Leida:</b> $R_š$.`,
  steps: [
    num(R`Šundi läbiv vool:`, 3.5, 'A', { label: R`I_š` }),
    num(R`Šundi takistus:`, 0.1071, 'Ω', { final: true, label: R`R_š`, alts: [{ a: 0.075, msg: 'Šunti läbib vool $I - I_A = 3.5\\ \\text{A}$, mitte 5 A.' }] })
  ],
  sol: R`$R_š = \frac{I_AR_A}{I - I_A} = \frac{1.5\cdot 0.25}{3.5} \approx 0.107\ \Omega$.`,
  ans: R`0,107 Ω`
});

function series(labV, labR) {
  return CK.svg(340, 110, W([[20, 55], [320, 55]], 0.4) + CK.R(110, 55, false, labR || 'eeltakisti R') + CK.meter(230, 55, 'V', labV || 'R_V') + CK.term(20, 55, 'P', 0, -10) + CK.term(320, 55, 'Q', 0, -10) +
    `<line x1="70" y1="88" x2="150" y2="88" class="ckw thin"/><text x="110" y="104" class="ckt up" text-anchor="middle">U − U_V</text><line x1="210" y1="88" x2="250" y2="88" class="ckw thin"/><text x="230" y="104" class="ckt up" text-anchor="middle">U_V</text>`,
    'Eeltakisti on voltmeetriga jadamisi ja võtab osa pingest enda peale.');
}
P({ id: '201', b: 13, k: 'T',
  text: R`Voltmeetriga saab mõõta pinget kuni 100 V. Voltmeetri sisetakistus on 10 kΩ. Kui suurt pinget saab mõõta selle mõõteriistaga, kui ühendada temaga eeltakisti 90 kΩ?`,
  fig: series(),
  given: R`<b>Andmed:</b> $U_V = 100\ \text{V}$, $R_V = 10\ \text{k}\Omega$, $R = 90\ \text{k}\Omega$.<br><b>Leida:</b> $U$.`,
  steps: [
    mc(R`Kuidas eeltakisti ühendatakse?`, [R`*Jadamisi voltmeetriga`, R`Rööbiti voltmeetriga||Siis oleks takistil ja voltmeetril sama pinge, voltmeetri koormus ei väheneks.`]),
    num(R`Voltmeetrit läbiv suurim vool:`, 0.01, 'A', { label: R`I`, hint: R`$I = U_V/R_V$` }),
    num(R`Suurim mõõdetav pinge:`, 1000, 'V', { final: true, label: R`U` })
  ],
  sol: R`Eeltakisti ja voltmeeter on jadamisi, neid läbib sama vool $I = \frac{U_V}{R_V}$:
$$U = I(R_V + R) = \frac{U_V(R_V + R)}{R_V} = \frac{100\cdot 100}{10} = 1.0\ \text{kV}$$`,
  ans: R`1,0 kV`
});

P({ id: '203', b: 13, k: 'K',
  text: R`Arvutada eeltakistused voltmeetrile mõõtepiirkonnaga 150 V, kui temaga tahetakse mõõta pingeid 300, 600 ja 900 V. Voltmeetri sisetakistus on 5,0 kΩ.`,
  fig: series(),
  given: R`<b>Andmed:</b> $U_V = 150\ \text{V}$, $R_V = 5.0\ \text{k}\Omega$, $U = 300$; 600; 900 V.<br><b>Leida:</b> $R$ igaks juhuks.`,
  steps: [
    mc(R`Eeltakisti valem:`, [R`*$R = R_V\left(\frac{U}{U_V} - 1\right)$`, R`$R = R_V\frac{U}{U_V}$||See on kogu ahela takistus, sellest tuleb voltmeetri takistus lahutada.`, R`$R = \frac{R_VU_V}{U - U_V}$||See valem on šundi jaoks.`]),
    num(R`Eeltakisti 300 V jaoks:`, 5000, 'Ω', { final: true, label: R`R_1` }),
    num(R`Eeltakisti 600 V jaoks:`, 15000, 'Ω', { final: true, label: R`R_2` }),
    num(R`Eeltakisti 900 V jaoks:`, 25000, 'Ω', { final: true, label: R`R_3` })
  ],
  sol: R`Nagu ülesandes 201: $U = \frac{U_V(R_V + R)}{R_V} \Rightarrow R = R_V\left(\frac{U}{U_V} - 1\right)$:
$$R_1 = 5(2 - 1) = 5\ \text{k}\Omega, \quad R_2 = 5(4 - 1) = 15\ \text{k}\Omega, \quad R_3 = 5(6 - 1) = 25\ \text{k}\Omega$$`,
  ans: R`5,0 kΩ; 15 kΩ; 25 kΩ`
});

/* ---------- Sarnased ---------- */

P({ id: '193', b: 13, k: 'S',
  text: R`Voltmeeter on ühendatud joonisel 15 esitatud skeemi kohaselt. Pinge $U = 12$ V, voltmeetri takistus $R_V = 8000\ \Omega$ ja takistus $R = 2000\ \Omega$. Millist pinget näitab voltmeeter?`,
  fig: series('R_V', 'R'),
  given: R`<b>Andmed:</b> $U = 12\ \text{V}$, $R_V = 8000\ \Omega$, $R = 2000\ \Omega$, voltmeeter ja takisti jadamisi.<br><b>Leida:</b> $U_V$.`,
  steps: [
    num(R`Voolutugevus ahelas:`, 1.2e-3, 'A', { label: R`I` }),
    num(R`Voltmeetri näit:`, 9.6, 'V', { final: true, label: R`U_V` })
  ],
  sol: R`$I = \frac{U}{R + R_V} = \frac{12}{10000} = 1.2\ \text{mA}$, $U_V = IR_V = 9.6\ \text{V}$. Pinge jaguneb jadaühenduses takistuste suhtes.`,
  ans: R`9,6 V`
});

P({ id: '197', b: 13, k: 'S',
  text: R`Milline šunt tuleb ühendada paralleelselt galvanomeetriga, kui selle skaala jaotiste arv on 100, jaotise väärtus 1,00 µA, sisetakistus 150 Ω ja mõõteriista on vaja kuni 1,00 mA tugevuse voolu mõõtmiseks?`,
  fig: shunt('R_g, I_g'),
  given: R`<b>Andmed:</b> 100 jaotist × 1,00 µA, $R_g = 150\ \Omega$, $I = 1.00\ \text{mA}$.<br><b>Leida:</b> $R_š$.`,
  steps: [
    num(R`Galvanomeetri mõõtepiirkond:`, 1e-4, 'A', { label: R`I_g` }),
    num(R`Šundi takistus:`, 16.7, 'Ω', { final: true, label: R`R_š` })
  ],
  sol: R`$I_g = 100\cdot 1\ \mu\text{A} = 0.1\ \text{mA}$. $R_š = \frac{I_gR_g}{I - I_g} = \frac{0.1\cdot 150}{0.9} \approx 16.7\ \Omega$.`,
  ans: R`16,7 Ω`
});

P({ id: '200', b: 13, k: 'S',
  text: R`Mõõteriista sisetakistus on 100,0 Ω, skaala jaotiste arv 100 ja jaotise väärtus $10^{-5}$ A. Mida tuleb teha, et riista oleks võimalik kasutada ühel juhul pingete mõõtmiseks kuni 100,0 V ja teisel juhul voolutugevuste mõõtmiseks kuni 1000 mA?`,
  given: R`<b>Andmed:</b> $R_g = 100.0\ \Omega$, $I_g = 100\cdot 10^{-5}\ \text{A}$, $U = 100.0\ \text{V}$, $I = 1000\ \text{mA}$.<br><b>Leida:</b> eeltakisti ja šunt.`,
  steps: [
    num(R`Mõõteriista suurim lubatud vool:`, 1e-3, 'A', { label: R`I_g` }),
    mc(R`Pinge mõõtmiseks kuni 100 V:`, [R`*Ühendada jadamisi eeltakisti`, R`Ühendada rööbiti šunt||Šunt laiendab voolu mõõtepiirkonda.`]),
    num(R`Eeltakisti takistus:`, 99900, 'Ω', { final: true, label: R`R`, tol: 0.002, hint: R`$R = \frac{U}{I_g} - R_g$`, alts: [{ a: 1e5, msg: 'Lahuta veel mõõteriista enda takistus 100 Ω.' }] }),
    num(R`Šundi takistus voolu mõõtmiseks kuni 1000 mA:`, 0.1001, 'Ω', { final: true, label: R`R_š`, tol: 0.0005, alts: [{ a: 0.1, msg: 'Peaaegu. Šunti läbib $1000 - 1 = 999\\ \\text{mA}$, mitte 1000 mA.' }] })
  ],
  sol: R`$I_g = 100\cdot 10^{-5} = 1\ \text{mA}$. Voltmeetriks: jadamisi eeltakisti $R = \frac{U}{I_g} - R_g = 100\,000 - 100 = 9.99\cdot 10^4\ \Omega$.
Ampermeetriks: rööbiti šunt $R_š = \frac{I_gR_g}{I - I_g} = \frac{0.001\cdot 100}{0.999} \approx 0.1001\ \Omega$.`,
  ans: R`Jadamisi eeltakisti $9.99\cdot 10^4\ \Omega$; rööbiti šunt 0,1001 Ω.`
});

P({ id: '202', b: 13, k: 'S',
  text: R`Kui suur eeltakistus tuleks ühendada voltmeetriga, mille mõõtepiirkond on 10 V, et temaga võiks mõõta pinget kuni 100 V? Voltmeetri sisetakistus on 300 Ω.`,
  fig: series(),
  given: R`<b>Andmed:</b> $U_V = 10\ \text{V}$, $U = 100\ \text{V}$, $R_V = 300\ \Omega$.<br><b>Leida:</b> $R$.`,
  steps: [
    num(R`Eeltakisti:`, 2700, 'Ω', { final: true, label: R`R`, alts: [{ a: 3000, msg: 'See on kogu ahela takistus. Lahuta voltmeetri takistus.' }] })
  ],
  sol: R`$R = R_V\left(\frac{U}{U_V} - 1\right) = 300\cdot 9 = 2.7\ \text{k}\Omega$.`,
  ans: R`2,7 kΩ`
});
})();
