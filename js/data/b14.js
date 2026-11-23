/* 14. Suletud vooluahelad (kogu II). Tunnis: 208, 211, 213, 220, 226, 234. Kodus: 209, 212, 221, 224, 232, 235. */
(function () {
const R = String.raw;
const W = CK.wire;
const POWER = () => Viz.html('power', {});

/* vooluallikas sisetakistusega + välistakistus */
function loop(ext, extLab, srcLab) {
  return CK.svg(320, 170, W([[60, 40], [60, 20], [260, 20], [260, 140], [60, 140], [60, 110]], 1) + W([[60, 40], [60, 110]], 0) +
    `<rect x="25" y="35" width="70" height="80" class="box"/>` + CK.bat(60, 55, 'u', srcLab || 'ε', 22) + CK.R(60, 92, true, 'r', 14) +
    (ext === 'lamp' ? CK.lamp(260, 80, extLab || 'R', 30, 5) : CK.R(260, 80, true, extLab || 'R', 14)) +
    CK.text(60, 132, 'vooluallikas', 'up') + `<text x="160" y="14" class="ckt up" text-anchor="middle">I →</text>`,
    'Vooluallika sees on sisetakistus r. Klemmipinge U = IR on väiksem kui ε, sest osa pingest kulub allika sees: ε = IR + Ir.');
}

P({ id: '208', b: 14, k: 'T',
  text: R`Elemendi elektromotoorjõud on 1,6 V ja sisetakistus 0,40 Ω. Milline on elemendi kasutegur voolutugevuse 2,4 A korral?`,
  fig: loop(),
  given: R`<b>Andmed:</b> $\varepsilon = 1.6\ \text{V}$, $r = 0.40\ \Omega$, $I = 2.4\ \text{A}$.<br><b>Leida:</b> $\eta$.`,
  steps: [
    mc(R`Kasutegur on kasuliku ja koguvõimsuse suhe. Mis need on?`, [R`*$N_{kas} = UI = I^2R$, $N_{kogu} = \varepsilon I$`, R`$N_{kas} = \varepsilon I$, $N_{kogu} = UI$||Koguvõimsus on allika võimsus $\varepsilon I$, tarbijale jõuab $UI$.`, R`$N_{kas} = I^2r$||$I^2r$ on allika sees kaduma läinud võimsus.`], R`Seega $\eta = \frac{U}{\varepsilon} = \frac{R}{R + r}$.`),
    num(R`Välistakistus (Ohmi seadus suletud ahela kohta):`, 0.2667, 'Ω', { label: R`R`, hint: R`$I = \frac{\varepsilon}{R + r}$` }),
    num(R`Kasutegur:`, 40, '%', { final: true, label: R`\eta`, alts: [{ a: 0.4, msg: 'Kirjuta protsentides, näiteks 40.' }, { a: 60, msg: 'See on kadude osa ($Ir/\\varepsilon$). Kasutegur on $R/(R + r)$.' }] })
  ],
  sol: R`$\eta = \frac{N_{kas}}{N_{kogu}}\cdot 100\% = \frac{UI}{\varepsilon I}\cdot 100\% = \frac{IR}{\varepsilon}\cdot 100\%$. Ohmi seadusest suletud ahela kohta:
$$R = \frac{\varepsilon}{I} - r = \frac{1.6}{2.4} - 0.4 \approx 0.27\ \Omega, \qquad \eta = \frac{2.4\cdot 0.27}{1.6}\cdot 100\% = 40\%$$`,
  ans: R`40%`
});

P({ id: '209', b: 14, k: 'K',
  text: R`Alalisvoolu generaatori elektromotoorjõud on 400 V. Arvutada generaatori sisetakistus, kui klemmipinge 390 V puhul on voolutugevus 40 A.`,
  given: R`<b>Andmed:</b> $\varepsilon = 400\ \text{V}$, $U = 390\ \text{V}$, $I = 40\ \text{A}$.<br><b>Leida:</b> $r$.`,
  steps: [
    mc(R`Kuhu kaob 10 V?`, [R`*Generaatori sisetakistusele: $\varepsilon - U = Ir$`, R`Ühendusjuhtmetele||Klemmipinge on mõõdetud generaatori klemmidel, vahe tekib generaatori sees.`]),
    num(R`Sisetakistus:`, 0.25, 'Ω', { final: true, label: R`r`, alts: [{ a: 9.75, msg: 'See on välistakistus $U/I$. Sisetakistus on $(\\varepsilon - U)/I$.' }] })
  ],
  sol: R`$\varepsilon = U + Ir \Rightarrow r = \frac{\varepsilon - U}{I} = \frac{10}{40} = 0.25\ \Omega$.`,
  ans: R`0,25 Ω`
});

P({ id: '211', b: 14, k: 'T',
  text: R`Leida voolutugevus ja elemendi klemmipinge vooluringis, mis koosneb elemendist (elektromotoorjõud 1,50 V ja sisetakistus 0,12 Ω) ning välistakistusest 1,38 Ω.`,
  fig: loop(),
  given: R`<b>Andmed:</b> $\varepsilon = 1.50\ \text{V}$, $r = 0.12\ \Omega$, $R = 1.38\ \Omega$.<br><b>Leida:</b> $I$, $U$.`,
  steps: [
    mc(R`Ohmi seadus suletud vooluringi kohta:`, [R`*$I = \frac{\varepsilon}{R + r}$`, R`$I = \frac{\varepsilon}{R}$||Vool läbib ka allikat, arvesta sisetakistust.`, R`$I = \frac{\varepsilon}{r}$||See oleks lühise vool.`]),
    num(R`Voolutugevus:`, 1, 'A', { final: true, label: R`I` }),
    num(R`Klemmipinge (pinge välistakistusel):`, 1.38, 'V', { final: true, label: R`U`, alts: [{ a: 0.12, msg: 'See on pingelang elemendi sees ($Ir$). Klemmipinge on $IR$.' }, { a: 1.5, msg: 'See on elektromotoorjõud. Klemmipinge on väiksem: $U = \\varepsilon - Ir$.' }] })
  ],
  sol: R`$$I = \frac{\varepsilon}{R + r} = \frac{1.5}{1.38 + 0.12} = 1.0\ \text{A}, \qquad U = IR = 1.38\ \text{V}$$
Elemendi sees on pingelang $u = Ir = 0.12\ \text{V}$, kokku $U + u = \varepsilon$.`,
  ans: R`1,00 A; 1,38 V`
});

P({ id: '212', b: 14, k: 'K',
  text: R`Generaator, reostaat ja koormustakisti ($R_x = 5.0\ \Omega$) on ühendatud joonisel 23 esitatud skeemi kohaselt. Reostaadi takistuse $R_1 = 4.5\ \Omega$ korral on voolutugevus 2,0 A, takistuse $R_2 = 10.5\ \Omega$ korral aga 1,25 A. Arvutada generaatori elektromotoorjõud ja sisetakistus. Ampermeetri sisetakistus $R_A = 0$.`,
  fig: CK.svg(340, 160, W([[60, 40], [60, 20], [280, 20], [280, 140], [60, 140], [60, 110]], 1) + W([[60, 40], [60, 110]], 0) + `<rect x="25" y="35" width="70" height="80" class="box"/>` +
    CK.bat(60, 55, 'u', 'ε', 22) + CK.R(60, 92, true, 'r', 14) + CK.Rv(150, 20, false, 'R₁ / R₂', 0, -14) + CK.R(280, 80, true, 'Rₓ', 14) + CK.meter(180, 140, 'A'), 'Joon. 23: generaator, reostaat, koormustakisti ja ampermeeter jadamisi.'),
  given: R`<b>Andmed:</b> $R_x = 5.0\ \Omega$, $R_1 = 4.5\ \Omega$, $I_1 = 2.0\ \text{A}$, $R_2 = 10.5\ \Omega$, $I_2 = 1.25\ \text{A}$.<br><b>Leida:</b> $\varepsilon$, $r$.`,
  steps: [
    mc(R`Mis jääb reostaadi muutmisel samaks?`, [R`*$\varepsilon$ ja $r$: $I_1(R_1 + R_x + r) = I_2(R_2 + R_x + r)$`, R`Voolutugevus||Voolutugevus muutub (2,0 A ja 1,25 A).`, R`Klemmipinge||Klemmipinge sõltub voolust.`]),
    num(R`Sisetakistus:`, 0.5, 'Ω', { final: true, label: R`r` }),
    num(R`Elektromotoorjõud:`, 20, 'V', { final: true, label: R`\varepsilon` })
  ],
  sol: R`Kahe juhu jaoks $\varepsilon = I_1(R_1 + R_x + r) = I_2(R_2 + R_x + r)$:
$$2.0(9.5 + r) = 1.25(15.5 + r) \Rightarrow 0.75r = 0.375 \Rightarrow r = 0.50\ \Omega, \qquad \varepsilon = 2.0\cdot 10 = 20\ \text{V}$$`,
  ans: R`20 V; 0,50 Ω`
});

P({ id: '213', b: 14, k: 'T',
  text: R`Patarei klemmidega on paralleelselt ühendatud voltmeeter ja reostaat. Reostaadi takistuste 4,0 Ω ja 8,0 Ω puhul on voltmeetri lugem vastavalt 12 V ja 16 V. Leida patarei elektromotoorjõud ja sisetakistus. Voltmeetri takistus on 5000 Ω.`,
  fig: CK.svg(340, 170, W([[60, 40], [60, 20], [200, 20], [200, 150], [60, 150], [60, 110]], 1) + W([[60, 40], [60, 110]], 0) + W([[200, 20], [290, 20], [290, 150], [200, 150]], 0) + `<rect x="25" y="35" width="70" height="80" class="box"/>` +
    CK.bat(60, 55, 'u', 'ε', 22) + CK.R(60, 92, true, 'r', 14) + CK.Rv(200, 85, true, 'Rᵢ', 18) + CK.meter(290, 85, 'V', 'Uᵢ', 30, 5) + CK.dot(200, 20, 'P') + CK.dot(200, 150, 'Q', 0, 18), 'Voltmeeter näitab reostaadi (ja ühtlasi patarei klemmide) pinget. Voltmeetrit läbiv vool on tühine.'),
  given: R`<b>Andmed:</b> $R_1 = 4.0\ \Omega$, $U_1 = 12\ \text{V}$, $R_2 = 8.0\ \Omega$, $U_2 = 16\ \text{V}$, $R_V = 5000\ \Omega \gg R$.<br><b>Leida:</b> $\varepsilon$, $r$.`,
  steps: [
    mc(R`Kas voltmeetri voolu tuleb arvestada?`, [R`*Ei, $R_V \gg R$, peaaegu kogu vool läheb läbi reostaadi`, R`Jah, see muudab tulemust oluliselt||$4\,\Omega \| 5000\,\Omega \approx 3.997\ \Omega$, erinevus on alla 0,1%.`]),
    mc(R`Vool läbi reostaadi on $I_i = U_i/R_i$. Milline võrrand iga juhu jaoks?`, [R`*$\varepsilon = U_i + \frac{U_i}{R_i}r$`, R`$\varepsilon = U_i$||Voltmeeter näitab klemmipinget, mis on väiksem kui $\varepsilon$.`, R`$\varepsilon = \frac{U_i}{R_i}r$||Puudu on pinge välisahelal.`]),
    num(R`Voolud: $I_1$ (4 Ω juures):`, 3, 'A', { label: R`I_1` }),
    num(R`$I_2$ (8 Ω juures):`, 2, 'A', { label: R`I_2` }),
    num(R`Sisetakistus:`, 4, 'Ω', { final: true, label: R`r`, hint: R`$12 + 3r = 16 + 2r$` }),
    num(R`Elektromotoorjõud:`, 24, 'V', { final: true, label: R`\varepsilon` })
  ],
  sol: R`Voltmeetri takistus on palju suurem kui reostaadil, seega $R_{PQ} \approx R_i$ ja $I_i = \frac{U_i}{R_i}$: $I_1 = 3\ \text{A}$, $I_2 = 2\ \text{A}$. Ohmi seadus suletud ahela kohta:
$$\varepsilon = U_1 + I_1r = U_2 + I_2r \Rightarrow 12 + 3r = 16 + 2r \Rightarrow r = 4\ \Omega, \qquad \varepsilon = 12 + 12 = 24\ \text{V}$$
Konspekti üldvalem: $r = \frac{(U_2 - U_1)R_1R_2}{U_1R_2 - U_2R_1}$.`,
  ans: R`24 V; 4,0 Ω`
});

P({ id: '220', b: 14, k: 'T',
  text: R`Kui suurt maksimaalset võimsust võib anda välisahelasse element, mille elektromotoorjõud on 2,0 V ning sisetakistus 0,10 Ω?`,
  fig: loop(),
  given: R`<b>Andmed:</b> $\varepsilon = 2.0\ \text{V}$, $r = 0.10\ \Omega$, $N_{kas} = \max$.<br><b>Leida:</b> $N_{max}$, $\eta$.`,
  steps: [
    mc(R`Kasulik võimsus kui välistakistuse funktsioon:`, [R`*$N = \frac{\varepsilon^2R}{(R + r)^2}$`, R`$N = \frac{\varepsilon^2}{R + r}$||See on koguvõimsus $\varepsilon I$.`, R`$N = \frac{\varepsilon^2}{R}$||Vool sõltub ka sisetakistusest.`], R`$N = I^2R$ ja $I = \frac{\varepsilon}{R + r}$.`),
    mc(R`Tuletis $\frac{dN}{dR} = \frac{\varepsilon^2(r - R)}{(R + r)^3}$. Millal on võimsus suurim?`, [R`*Kui $R = r$`, R`Kui $R = 0$||Siis on vool suurim, aga võimsus välisahelas on null.`, R`Kui $R \to \infty$||Siis vool läheneb nullile.`], R`Tarbija takistus peab võrduma allika sisetakistusega.` + POWER()),
    num(R`Maksimaalne kasulik võimsus:`, 10, 'W', { final: true, label: R`N_{max}`, hint: R`$N_{max} = \frac{\varepsilon^2}{4r}$`, alts: [{ a: 20, msg: 'See on koguvõimsus. Pool sellest kulub allika sees.' }] }),
    num(R`Kasutegur sel juhul:`, 50, '%', { final: true, label: R`\eta`, alts: [{ a: 0.5, msg: 'Kirjuta protsentides, näiteks 50.' }] })
  ],
  sol: R`$N = I^2R = \frac{\varepsilon^2R}{(R + r)^2}$. Ekstreemumi tingimus:
$$\frac{dN}{dR} = \varepsilon^2\frac{(R + r)^2 - 2R(R + r)}{(R + r)^4} = \frac{\varepsilon^2(r - R)}{(R + r)^3} = 0 \Rightarrow R = r$$
$$N_{max} = \frac{\varepsilon^2r}{(2r)^2} = \frac{\varepsilon^2}{4r} = \frac{4}{0.4} = 10\ \text{W}, \qquad \eta = \frac{R}{R + r} = 50\%$$
Maksimaalse kasuliku võimsuse juures läheb pool võimsusest allika soojendamiseks.`,
  ans: R`10 W, kasutegur 50%.`
});

P({ id: '221', b: 14, k: 'K',
  text: R`Vooluallikas koosneb viiest ühesugusest järjestikku ühendatud elemendist, igaüks elektromotoorjõuga 1,5 V ning sisetakistusega 0,30 Ω. Millise välistakistusega tuleks ühendada vooluallikas, et välisahela võimsus oleks maksimaalne? Milline on seejuures voolutugevus? Kui suur on siis vooluallika koguvõimsus?`,
  given: R`<b>Andmed:</b> 5 elementi jadamisi, $\varepsilon_1 = 1.5\ \text{V}$, $r_1 = 0.30\ \Omega$.<br><b>Leida:</b> $R$, $I$, $N_{kogu}$.`,
  steps: [
    mc(R`Mis on jadamisi ühendatud elementide patarei $\varepsilon$ ja $r$?`, [R`*$\varepsilon = 5\varepsilon_1 = 7.5\ \text{V}$, $r = 5r_1 = 1.5\ \Omega$`, R`$\varepsilon = 1.5\ \text{V}$, $r = 0.3\ \Omega$||Jadaühenduses liituvad nii elektromotoorjõud kui sisetakistused.`, R`$\varepsilon = 7.5\ \text{V}$, $r = 0.06\ \Omega$||Sisetakistused on samuti jadamisi, need liituvad.`]),
    num(R`Välistakistus maksimaalse võimsuse korral:`, 1.5, 'Ω', { final: true, label: R`R`, ex: R`Nagu ülesandes 220: $R = r$.` + POWER() }),
    num(R`Voolutugevus:`, 2.5, 'A', { final: true, label: R`I` }),
    num(R`Vooluallika koguvõimsus:`, 18.75, 'W', { final: true, label: R`N_{kogu}`, alts: [{ a: 9.375, msg: 'See on kasulik võimsus. Koguvõimsus on $\\varepsilon I$.' }] })
  ],
  sol: R`Patarei: $\varepsilon = 5\cdot 1.5 = 7.5\ \text{V}$, $r = 5\cdot 0.3 = 1.5\ \Omega$. Maksimaalne kasulik võimsus, kui $R = r = 1.5\ \Omega$:
$$I = \frac{\varepsilon}{2r} = \frac{7.5}{3} = 2.5\ \text{A}, \qquad N_{kogu} = \varepsilon I = 7.5\cdot 2.5 \approx 19\ \text{W}$$`,
  ans: R`1,5 Ω; 2,5 A; 19 W`
});

P({ id: '224', b: 14, k: 'K',
  text: R`Kui vooluringi välistakistus on 1 Ω, siis tarbib välisahel niisama suurt võimsust, nagu ta tarbis välistakistuse 16 Ω korral. Leida vooluallika sisetakistus.`,
  given: R`<b>Andmed:</b> $R_1 = 1\ \Omega$, $R_2 = 16\ \Omega$, $N_1 = N_2$.<br><b>Leida:</b> $r$.`,
  steps: [
    mc(R`Võrdsete võimsuste tingimus:`, [R`*$\frac{\varepsilon^2R_1}{(R_1 + r)^2} = \frac{\varepsilon^2R_2}{(R_2 + r)^2}$`, R`$\frac{\varepsilon^2}{R_1 + r} = \frac{\varepsilon^2}{R_2 + r}$||See on koguvõimsus. Võrdsed on välisahela võimsused $I^2R$.`, R`$I_1 = I_2$||Kui takistused on erinevad, on ka voolud erinevad.`]),
    mc(R`Lahendades saame:`, [R`*$r = \sqrt{R_1R_2}$`, R`$r = \frac{R_1 + R_2}{2}$||Võta võrrandist ruutjuur: $\frac{\sqrt{R_1}}{R_1 + r} = \frac{\sqrt{R_2}}{R_2 + r}$.`, R`$r = R_2 - R_1$||Kontrolli lahendust.`]),
    num(R`Sisetakistus:`, 4, 'Ω', { final: true, label: R`r` })
  ],
  sol: R`$\frac{R_1}{(R_1 + r)^2} = \frac{R_2}{(R_2 + r)^2}$. Ruutjuur ja ristkorrutamine: $\sqrt{R_1}(R_2 + r) = \sqrt{R_2}(R_1 + r)$, millest
$$r(\sqrt{R_2} - \sqrt{R_1}) = \sqrt{R_1R_2}(\sqrt{R_2} - \sqrt{R_1}) \Rightarrow r = \sqrt{R_1R_2} = \sqrt{16} = 4\ \Omega$$`,
  ans: R`4 Ω`,
  solviz: POWER()
});

P({ id: '226', b: 14, k: 'T',
  text: R`Reostaat takistusega 25 Ω on lülitatud järjestikku lambiga, mille võimsus on 100 W. Kui suur osapinge tekib reostaadil toitepinge 100 V korral?`,
  fig: CK.svg(320, 130, W([[40, 60], [40, 20], [280, 20], [280, 110], [40, 110], [40, 70]], 1) + CK.term(40, 60) + CK.term(40, 72) + CK.text(22, 70, 'U', '') + CK.Rv(130, 20, false, 'R = 25 Ω', 0, -14) + CK.lamp(280, 65, 'N = 100 W', -10, -22)),
  given: R`<b>Andmed:</b> $R = 25\ \Omega$, $N = 100\ \text{W}$ (lamp), $U = 100\ \text{V}$.<br><b>Leida:</b> $U_R$.`,
  steps: [
    mc(R`Lambi takistust ei tea. Milline võrrand voolutugevuse jaoks?`, [R`*$U = IR + \frac{N}{I}$, sest lambil $U_l = \frac{N}{I}$`, R`$U = I(R + R_l)$, kus $R_l = \frac{U^2}{N}$||Lamp ei saa pinget 100 V, osa langeb reostaadil. Lambi takistust ei tohi arvutada täispingega.`, R`$I = \frac{N}{U}$||Nii saaksid voolu, kui lambil oleks kogu pinge.`]),
    num(R`Voolutugevus (ruutvõrrandist $RI^2 - UI + N = 0$):`, 2, 'A', { label: R`I`, alts: [{ a: 1, msg: 'See on $N/U$, mis ei arvesta reostaadil langevat pinget.' }] }),
    num(R`Osapinge reostaadil:`, 50, 'V', { final: true, label: R`U_R` })
  ],
  sol: R`$U_R = IR$ ja lambil $U_l = \frac{N}{I}$. Jadaühenduses $U = U_R + U_l$:
$$U = IR + \frac{N}{I} \Rightarrow RI^2 - UI + N = 0 \Rightarrow 25I^2 - 100I + 100 = 0$$
$$I = \frac{100 \pm\sqrt{100^2 - 4\cdot 25\cdot 100}}{50} = 2\ \text{A} \quad (\text{diskriminant on null}), \qquad U_R = 2\cdot 25 = 50\ \text{V}$$`,
  ans: R`50 V`
});

P({ id: '232', b: 14, k: 'K',
  text: R`Mikromootori nimipinge on 55,0 V ja võimsus 25,0 W. Kui suur takistus tuleks ühendada mootoriga järjestikku, et seda lülitada elektrivõrku pingega 220 V?`,
  fig: CK.svg(320, 120, W([[40, 55], [40, 20], [280, 20], [280, 100], [40, 100], [40, 67]], 0.6) + CK.term(40, 55) + CK.term(40, 67) + CK.text(18, 66, '220 V', 'up') + CK.R(130, 20, false, 'R = ?') +
    `<circle cx="280" cy="60" r="15" class="ckm"/><text x="280" y="65" class="ckmt" text-anchor="middle">M</text><text x="300" y="64" class="ckt">55 V, 25 W</text>`),
  given: R`<b>Andmed:</b> $U_m = 55.0\ \text{V}$, $N = 25.0\ \text{W}$, $U = 220\ \text{V}$.<br><b>Leida:</b> $R$.`,
  steps: [
    num(R`Mootori nimivool:`, 0.4545, 'A', { label: R`I` }),
    num(R`Pinge, mis peab langema takistil:`, 165, 'V', { label: R`U_R` }),
    num(R`Takistus:`, 363, 'Ω', { final: true, label: R`R`, alts: [{ a: 484, msg: 'See on kogu ahela takistus $U/I$. Mootori osa tuleb maha arvata.' }] })
  ],
  sol: R`$I = \frac{N}{U_m} = \frac{25}{55} \approx 0.455\ \text{A}$. Takistil peab langema $220 - 55 = 165\ \text{V}$:
$$R = \frac{U - U_m}{I} = \frac{165}{0.455} \approx 363\ \Omega$$`,
  ans: R`363 Ω`
});

P({ id: '234', b: 14, k: 'T',
  text: R`Kolm hõõglampi võimsusega 50, 50 ja 100 W on arvestatud pingele 110 V. Missuguse skeemi kohaselt tuleks need lambid lülitada võrku pingega 220 V, et nad põleksid normaalselt? Millise tugevusega voolud läbivad lampe?`,
  given: R`<b>Andmed:</b> $N_1 = N_2 = 50\ \text{W}$, $N_3 = 100\ \text{W}$, nimipinge $U_n = 110\ \text{V}$, võrk $U = 220\ \text{V}$.<br><b>Leida:</b> skeem, $I_1$, $I_2$, $I_3$.`,
  steps: [
    num(R`50 W lambi takistus ($R = U_n^2/N$):`, 242, 'Ω', { label: R`R_{50}` }),
    num(R`100 W lambi takistus:`, 121, 'Ω', { label: R`R_{100}` }),
    mc(R`Iga lamp peab saama 110 V, s.t. 220 V peab jagunema kaheks võrdseks osaks. Milline skeem sobib?`, [R`*Kaks 50 W lampi rööbiti, nendega jadamisi 100 W lamp`, R`Kõik kolm jadamisi||Siis jaguneks pinge takistuste suhtes 242 : 242 : 121, ükski ei saa 110 V.`, R`Kõik kolm rööbiti||Siis oleks igal lambil 220 V ja nad põleksid läbi.`, R`50 W ja 100 W rööbiti, nendega jadamisi teine 50 W||Rööpühenduse takistus oleks 80,7 Ω, mitte 242 Ω, pinged ei jagune võrdselt.`],
      R`Kaks 242 Ω rööbiti annab 121 Ω, sama mis 100 W lambil. Pinge jaguneb pooleks.`),
    num(R`Vool läbi kumbagi 50 W lambi:`, 0.4545, 'A', { final: true, label: R`I_{50}` }),
    num(R`Vool läbi 100 W lambi:`, 0.909, 'A', { final: true, label: R`I_{100}` })
  ],
  sol: R`Lampide takistused: $R_{50} = \frac{110^2}{50} = 242\ \Omega$, $R_{100} = \frac{110^2}{100} = 121\ \Omega$. Kaks 50 W lampi rööbiti annavad $121\ \Omega$, see on jadamisi 100 W lambiga ($121\ \Omega$), seega pinge jaguneb võrdselt, igal lambil 110 V.` +
    CK.svg(320, 150, W([[20, 75], [80, 75]], 0.9) + W([[80, 75], [80, 30], [180, 30], [180, 75]], 0.45) + W([[80, 75], [80, 120], [180, 120], [180, 75]], 0.45) + W([[180, 75], [300, 75]], 0.9) +
      CK.lamp(130, 30, '50 W') + CK.lamp(130, 120, '50 W', 0, 30) + CK.lamp(240, 75, '100 W') + CK.dot(80, 75) + CK.dot(180, 75) + CK.term(20, 75) + CK.term(300, 75) + CK.text(160, 147, '220 V', 'up')) + R`
$$I_{50} = \frac{50}{110} \approx 0.46\ \text{A}, \qquad I_{100} = \frac{100}{110} \approx 0.91\ \text{A}$$`,
  ans: R`Kaks 50 W lampi rööbiti ja nendega jadamisi 100 W lamp. Voolud 0,46 A; 0,46 A; 0,91 A.`
});

P({ id: '235', b: 14, k: 'K',
  text: R`Elektrivõrku pingega 220 V ühendati järjestikku kaks pingele 110 V arvestatud hõõglampi võimsusega 75 ja 100 W. Kui suured on lampide osapinged? Kumb lamp põleb läbi? Millised peaksid lambid olema, et neid võiks järjestikku ühendada?`,
  fig: CK.svg(320, 90, W([[20, 45], [300, 45]], 0.8) + CK.lamp(110, 45, '75 W') + CK.lamp(210, 45, '100 W') + CK.term(20, 45) + CK.term(300, 45) + CK.text(160, 82, '220 V', 'up')),
  given: R`<b>Andmed:</b> $U = 220\ \text{V}$, $U_n = 110\ \text{V}$, $N_1 = 75\ \text{W}$, $N_2 = 100\ \text{W}$, jadaühendus.<br><b>Leida:</b> $U_1$, $U_2$.`,
  steps: [
    num(R`75 W lambi takistus:`, 161.3, 'Ω', { label: R`R_1` }),
    num(R`100 W lambi takistus:`, 121, 'Ω', { label: R`R_2` }),
    num(R`Voolutugevus:`, 0.779, 'A', { label: R`I` }),
    num(R`75 W lambi osapinge:`, 125.7, 'V', { final: true, label: R`U_1` }),
    num(R`100 W lambi osapinge:`, 94.3, 'V', { final: true, label: R`U_2` }),
    mc(R`Kumb lamp põleb läbi?`, [R`*75 W lamp, sest tal on üle 110 V`, R`100 W lamp||100 W lambil on alla nimipinge, ta põleb tuhmilt.`, R`Kumbki ei põle läbi||Ühel lambil on pinge nimipingest suurem.`]),
    mc(R`Millised peaksid lambid olema, et neid võiks järjestikku ühendada?`, [R`*Ühesuguse võimsusega (s.t. ühesuguse takistusega)`, R`Erineva võimsusega||Erineva takistusega lampidel jaguneb pinge ebavõrdselt.`])
  ],
  sol: R`$R_1 = \frac{110^2}{75} \approx 161\ \Omega$, $R_2 = \frac{110^2}{100} = 121\ \Omega$. Jadaühenduses $I = \frac{220}{282} \approx 0.78\ \text{A}$:
$$U_1 = IR_1 \approx 126\ \text{V}, \qquad U_2 = IR_2 \approx 94\ \text{V}$$
75 W lambil on üle nimipinge, see põleb läbi. Jadamisi võib ühendada ainult ühesuguse võimsusega (ühesuguse takistusega) lampe, siis saab kumbki 110 V.`,
  ans: R`126 V ja 94 V; läbi põleb 75 W lamp; lambid peavad olema sama võimsusega.`
});

/* ---------- Sarnased ---------- */

P({ id: '210', b: 14, k: 'S',
  text: R`Generaatori klemmipinge on 215 V, sisetakistus 1,50 Ω ja koormustakistus 60,0 Ω. Kui suur on generaatori elektromotoorjõud?`,
  given: R`<b>Andmed:</b> $U = 215\ \text{V}$, $r = 1.50\ \Omega$, $R = 60.0\ \Omega$.<br><b>Leida:</b> $\varepsilon$.`,
  steps: [
    num(R`Voolutugevus:`, 3.583, 'A', { label: R`I` }),
    num(R`Elektromotoorjõud:`, 220.4, 'V', { final: true, label: R`\varepsilon`, tol: 0.005 })
  ],
  sol: R`$I = \frac{U}{R} = \frac{215}{60} \approx 3.58\ \text{A}$, $\varepsilon = U + Ir = 215 + 5.4 \approx 220\ \text{V}$.`,
  ans: R`220 V`
});

P({ id: '223', b: 14, k: 'S',
  text: R`Galvaanielemendi elektromotoorjõud on 1,5 V ja sisetakistus 1 Ω. Milline peab olema ahela välisosa takistus, et selles eralduv võimsus oleks 0,5 W? Kui suur on sel juhul voolutugevus?`,
  given: R`<b>Andmed:</b> $\varepsilon = 1.5\ \text{V}$, $r = 1\ \Omega$, $N = 0.5\ \text{W}$.<br><b>Leida:</b> $R$, $I$.`,
  steps: [
    mc(R`$\frac{\varepsilon^2R}{(R + r)^2} = N$ annab ruutvõrrandi. Mitu lahendit on?`, [R`*Kaks: $R^2 - 2.5R + 1 = 0$`, R`Üks||Võimsuskõver tõuseb ja langeb, sama võimsus tuleb kahe takistuse juures.`]),
    num(R`Suurem välistakistus:`, 2, 'Ω', { final: true, label: R`R_1` }),
    num(R`Väiksem välistakistus:`, 0.5, 'Ω', { final: true, label: R`R_2` }),
    num(R`Voolutugevus suurema takistuse korral:`, 0.5, 'A', { final: true, label: R`I_1` }),
    num(R`Voolutugevus väiksema takistuse korral:`, 1, 'A', { final: true, label: R`I_2` })
  ],
  sol: R`$2.25R = 0.5(R + 1)^2 \Rightarrow R^2 - 2.5R + 1 = 0 \Rightarrow R = 2\ \Omega$ või $0.5\ \Omega$. Voolud $I = \frac{\varepsilon}{R + r}$: 0,5 A või 1 A. Kahe lahendi korrutis $R_1R_2 = r^2$, nagu ülesandes 224.`,
  ans: R`2 Ω või 0,5 Ω; 0,5 A või 1 A`,
  solviz: POWER()
});

P({ id: '225', b: 14, k: 'S',
  text: R`Akumulaatori elektromotoorjõud on 6,0 V ja sisetakistus on 0,010 Ω. Mootori käivitamisel on starteri võimsus 675 W. Kui suur on aku klemmipinge mootori käivitamise ajal?`,
  given: R`<b>Andmed:</b> $\varepsilon = 6.0\ \text{V}$, $r = 0.010\ \Omega$, $N = 675\ \text{W}$.<br><b>Leida:</b> $U$.`,
  steps: [
    mc(R`Starteri võimsus $N = UI$ ja $U = \varepsilon - Ir$. Milline võrrand voolu jaoks?`, [R`*$rI^2 - \varepsilon I + N = 0$`, R`$I = \frac{N}{\varepsilon}$||Klemmipinge on väiksem kui $\varepsilon$.`]),
    num(R`Klemmipinge väiksema voolu (150 A) korral:`, 4.5, 'V', { final: true, label: R`U_1` }),
    num(R`Klemmipinge suurema voolu (450 A) korral:`, 1.5, 'V', { final: true, label: R`U_2` })
  ],
  sol: R`$N = I(\varepsilon - Ir) \Rightarrow 0.01I^2 - 6I + 675 = 0 \Rightarrow I = 150\ \text{A}$ või $450\ \text{A}$. Klemmipinge $U = \varepsilon - Ir$: 4,5 V või 1,5 V.`,
  ans: R`4,5 V või 1,5 V`
});

P({ id: '229', b: 14, k: 'S',
  text: R`Vooluring koosneb patareist elektromotoorjõuga 10 V ja välisahelast takistusega 3,0 Ω. Voolutugevus on 2,0 A. Määrata vooluringi kasutegur. Kui suur peaks olema välisahela takistus, et kasutegur oleks 100%?`,
  given: R`<b>Andmed:</b> $\varepsilon = 10\ \text{V}$, $R = 3.0\ \Omega$, $I = 2.0\ \text{A}$.<br><b>Leida:</b> $\eta$; $R$, mille korral $\eta = 100\%$.`,
  steps: [
    num(R`Kasutegur:`, 60, '%', { final: true, label: R`\eta`, alts: [{ a: 0.6, msg: 'Kirjuta protsentides, näiteks 60.' }], hint: R`$\eta = \frac{U}{\varepsilon} = \frac{IR}{\varepsilon}$` }),
    mc(R`Millal oleks $\eta = \frac{R}{R + r} = 100\%$?`, [R`*Kui $R \to \infty$ (siis aga vool ja kasulik võimsus lähenevad nullile)`, R`Kui $R = r$||Siis on kasutegur 50%.`, R`Kui $R = 0$||Siis on kasutegur 0.`])
  ],
  sol: R`$\eta = \frac{IR}{\varepsilon} = \frac{6}{10} = 60\%$. $\eta = \frac{R}{R + r}$ läheneb 100%-le ainult siis, kui $R \to \infty$.`,
  ans: R`60%; lõpmata suur takistus.`
});
})();
