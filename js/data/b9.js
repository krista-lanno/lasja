/* 9. Siseenergia, gaasi töö, termodünaamika I seadus (kogu I). Tunnis: 549, 554, 563. Kodus: 548, 555, 564. */
(function () {
const R = String.raw;

const DOF = Viz.html('dof', {});
const PV_T = () => Viz.html('pv', { proc: 'T', v1: 1, v2: 2.5, cap: R`Isotermilisel paisumisel langeb rõhk ($pV = \text{const}$). Gaasi töö on pindala kõvera all: $A = \int_{V_1}^{V_2}p\,dV = \frac{m}{\mu}RT\ln\frac{V_2}{V_1}$. Siseenergia ei muutu, kogu saadud soojus läheb tööks.` });
const PV_P = () => Viz.html('pv', { proc: 'p', v1: 1, v2: 2, cap: R`Jääval rõhul on töö ristküliku pindala: $A = p(V_2 - V_1) = \frac{m}{\mu}R\Delta T$. Gaas soojeneb, seega osa soojusest läheb siseenergiaks ja osa tööks: $Q = \Delta U + A$.` });

const iStep = (gas, ok) => mc(R`Mitu vabadusastet $i$ on ${gas} molekulil?`,
  ok === 5 ? [R`*$i = 5$ (3 kulg + 2 pöörd)`, R`$i = 3$||Nii on üheaatomilisel gaasil. Kaks või enam aatomit saavad ka pöörelda.`, R`$i = 6$||Nii on mittelineaarsel molekulil. Siin on aatomid ühel sirgel, ümber selle sirge pöörlemine ei loe.`]
    : [R`*$i = 3$`, R`$i = 5$||Üksik aatom saab ainult kulgliikumist.`, R`$i = 6$||Üksik aatom saab ainult kulgliikumist.`],
  R`Molekuli keskmine kineetiline energia $e = \frac{3}{2}kT + \frac{i_{p}}{2}kT = \frac{i}{2}kT$.`, R`Kulgliikumise vabadusastmeid on alati 3. Lineaarse molekuli pöördliikumise vabadusastmeid on 2.`);

P({ id: '549', b: 9, k: 'T', src: 'I',
  text: R`Leida süsihappegaasi siseenergia, kui gaasi ruumala on 1,1 L ja rõhk 30 atm.`,
  given: R`<b>Andmed:</b> $V = 1.1\ \text{L}$, $p = 30\ \text{atm}$, CO₂.<br><b>Leida:</b> $U$.`,
  viz: DOF,
  steps: [
    iStep('süsihappegaasi (O−C−O)', 5),
    mc(R`Siseenergia $U = \frac{i}{2}\frac{m}{\mu}RT$. Massi ja temperatuuri pole antud. Mis aitab?`,
      [R`*Mendelejev-Clapeyroni võrrand: $\frac{m}{\mu}RT = pV$, seega $U = \frac{i}{2}pV$`, R`Tuleb võtta normaaltemperatuur 273 K||Temperatuuri pole vaja, $\frac{m}{\mu}RT$ asendub korrutisega $pV$.`, R`$U = pV$||Puudu on tegur $\frac{i}{2}$.`]),
    num(R`Rõhk paskalites:`, 3.04e6, 'Pa', { label: R`p`, tol: 0.04 }),
    num(R`Siseenergia:`, 8360, 'J', { final: true, label: R`U`, tol: 0.03, alts: [{ a: 3 * 3.04e6 * 1.1e-3, msg: 'See on $i = 6$ korral. CO₂ on lineaarne molekul, $i = 5$.' }, { a: 1.5 * 3.04e6 * 1.1e-3, msg: 'See on üheaatomilise gaasi siseenergia ($i = 3$).' }] })
  ],
  sol: R`Siseenergia on molekulide arv korda ühe molekuli keskmine kineetiline energia:
$$U = Ne = \frac{m}{\mu}N_A\cdot\frac{i}{2}kT = \frac{i}{2}\frac{m}{\mu}RT$$
CO₂ molekulis on aatomid ühel sirgel, pöördliikumise vabadusastmeid on 2, seega $i = 5$. Mendelejev-Clapeyroni võrrandist $\frac{m}{\mu}RT = pV$:
$$U = \frac{5}{2}pV = \frac{5}{2}\cdot 3\cdot 10^6\cdot 1.1\cdot 10^{-3} \approx 8.3\ \text{kJ}$$`,
  ans: R`8,3 kJ`,
  after: R`Raamatu vastus on 10 kJ: seal on CO₂ võetud kui paljuaatomiline gaas ($i = 6$, $U = 3pV$). Konspektis on arvestatud, et CO₂ on lineaarne molekul ($i = 5$), siin on konspekti lahendus.`
});

P({ id: '548', b: 9, k: 'K', src: 'I',
  text: R`Arvutada 10 L ideaalse vesiniku siseenergia, kui gaasi rõhk on 294 kPa.`,
  given: R`<b>Andmed:</b> $V = 10\ \text{L}$, $p = 294\ \text{kPa}$, H₂.<br><b>Leida:</b> $U$.`,
  steps: [
    iStep('vesiniku (H₂)', 5),
    num(R`Siseenergia:`, 7350, 'J', { final: true, label: R`U`, hint: R`$U = \frac{i}{2}pV$`, alts: [{ a: 4410, msg: 'Vesinik on kaheaatomiline, $i = 5$, mitte 3.' }] })
  ],
  sol: R`$U = \frac{i}{2}\frac{m}{\mu}RT = \frac{i}{2}pV$ ja vesiniku molekulil (kaks aatomit) $i = 5$:
$$U = \frac{5}{2}\cdot 2.94\cdot 10^5\cdot 0.010 \approx 7.4\ \text{kJ}$$`,
  ans: R`7,4 kJ`,
  after: R`Konspekti koduste ülesannete loendis on numbri 548 all ülesande 550 tekst (1,5 kg gaasi, tihedus 4,2 kg/m³). Siin on raamatu tekst; ülesanne 550 on eraldi sarnaste hulgas.`
});

P({ id: '554', b: 9, k: 'T', src: 'I',
  text: R`10,5 g lämmastikku paisus isotermiliselt temperatuuril −23 °C. Rõhk muutus seejuures 2,5 atm-lt 1,0 atm-ni. Arvutada paisumisel tehtud töö.`,
  given: R`<b>Andmed:</b> $m = 10.5\ \text{g}$, $\mu = 0.028\ \text{kg/mol}$, $t = -23\ ^\circ\text{C}$, $p_1 = 2.5\ \text{atm}$, $p_2 = 1.0\ \text{atm}$, $T = \text{const}$.<br><b>Leida:</b> $A$.`,
  viz: PV_T(),
  steps: [
    mc(R`Gaasi töö on $A = \int_{V_1}^{V_2}p\,dV$. Mis on isotermilisel protsessil $p(V)$?`, [R`*$p = \frac{mRT}{\mu V}$, $T$ on konstant`, R`$p = \text{const}$||Rõhk muutub (2,5 atm kuni 1,0 atm).`, R`$p = \frac{mR}{\mu V}$||Puudu on temperatuur.`]),
    mc(R`Integreerimisel saame $A = \frac{m}{\mu}RT\ln\frac{V_2}{V_1}$. Ruumalasid ei tea. Mis on $\frac{V_2}{V_1}$?`, [R`*$\frac{p_1}{p_2}$`, R`$\frac{p_2}{p_1}$||Isotermilisel protsessil $p_1V_1 = p_2V_2$. Paisumisel ruumala kasvab, seega suhe peab olema üle 1.`, R`1||Ruumala muutub, muutub ju rõhk.`], R`Isotermilise protsessi võrrand $p_1V_1 = p_2V_2$.`),
    num(R`Temperatuur kelvinites:`, 250, 'K', { label: R`T`, abs: 0.6 }),
    num(R`Paisumisel tehtud töö:`, 714, 'J', { final: true, label: R`A`, alts: [{ a: -714, msg: 'Paisumisel teeb gaas positiivset tööd. Kontrolli logaritmi: $\\ln\\frac{p_1}{p_2} = \\ln 2.5 > 0$.' }, { a: 0.375 * 8.31 * 250 * 1.5, msg: 'Logaritmi asemel on kasutatud rõhkude vahet. Õige on $\\ln\\frac{p_1}{p_2}$.' }] })
  ],
  sol: R`$A = \int_{V_1}^{V_2}p\,dV$ ja isotermilisel protsessil $p = \frac{mRT}{\mu V}$, $T = \text{const}$:
$$A = \frac{mRT}{\mu}\int_{V_1}^{V_2}\frac{dV}{V} = \frac{m}{\mu}RT(\ln V_2 - \ln V_1) = \frac{m}{\mu}RT\ln\frac{V_2}{V_1}$$
Isotermilise protsessi võrrandist $p_1V_1 = p_2V_2$, seega $\frac{V_2}{V_1} = \frac{p_1}{p_2}$:
$$A = \frac{m}{\mu}RT\ln\frac{p_1}{p_2} = \frac{0.0105}{0.028}\cdot 8.31\cdot 250\cdot\ln 2.5 \approx 710\ \text{J}$$`,
  ans: R`0,71 kJ`
});

P({ id: '555', b: 9, k: 'K', src: 'I',
  text: R`10 g lämmastikku paisus isotermiliselt temperatuuril 17 °C. Mitu korda vähenes gaasi rõhk, kui seejuures tehti 860 J tööd?`,
  given: R`<b>Andmed:</b> $m = 10\ \text{g}$, $\mu = 0.028\ \text{kg/mol}$, $T = 290\ \text{K}$, $A = 860\ \text{J}$.<br><b>Leida:</b> $p_1/p_2$.`,
  steps: [
    mc(R`Kuidas avaldada rõhkude suhe tööst $A = \frac{m}{\mu}RT\ln\frac{p_1}{p_2}$?`, [R`*$\frac{p_1}{p_2} = \exp\left(\frac{\mu A}{mRT}\right)$`, R`$\frac{p_1}{p_2} = \frac{\mu A}{mRT}$||See on logaritm suhtest, suhte enda saamiseks võta eksponent.`, R`$\frac{p_1}{p_2} = \ln\frac{\mu A}{mRT}$||Logaritmi pöördfunktsioon on eksponent.`]),
    num(R`Astendaja $\frac{\mu A}{mRT}$:`, 0.999, '', { label: R`\frac{\mu A}{mRT}` }),
    num(R`Mitu korda rõhk vähenes:`, 2.71, '', { final: true, label: R`\frac{p_1}{p_2}`, alts: [{ a: 1, msg: 'See on astendaja. Rõhkude suhe on $e$ selles astmes.' }] })
  ],
  sol: R`Nagu ülesandes 554: $A = \frac{m}{\mu}RT\ln\frac{V_2}{V_1} = \frac{m}{\mu}RT\ln\frac{p_1}{p_2}$. Siit
$$\ln\frac{p_1}{p_2} = \frac{\mu A}{mRT} = \frac{0.028\cdot 860}{0.010\cdot 8.31\cdot 290} \approx 1.0 \quad\Rightarrow\quad \frac{p_1}{p_2} = e^{1.0} \approx 2.7$$`,
  ans: R`2,7 korda`
});

P({ id: '563', b: 9, k: 'T', src: 'I',
  text: R`6,5 g vesiniku algtemperatuur oli 27 °C. Gaasi soojendati jääval rõhul nii, et selle ruumala suurenes 2,0 korda. Leida vesiniku siseenergia muut, paisumise töö ja gaasile antud soojushulk.`,
  given: R`<b>Andmed:</b> $m = 6.5\ \text{g}$, $\mu = 0.002\ \text{kg/mol}$, $T_1 = 300\ \text{K}$, $p = \text{const}$, $V_2 = 2V_1$, $i = 5$.<br><b>Leida:</b> $\Delta U$, $A$, $Q$.`,
  viz: PV_P(),
  steps: [
    num(R`Isobaarilisel protsessil $\frac{V_1}{T_1} = \frac{V_2}{T_2}$. Lõpptemperatuur:`, 600, 'K', { label: R`T_2`, abs: 1 }),
    mc(R`Paisumise töö jääval rõhul:`, [R`*$A = p(V_2 - V_1) = \frac{m}{\mu}R(T_2 - T_1)$`, R`$A = \frac{m}{\mu}RT\ln\frac{V_2}{V_1}$||See on isotermilise protsessi töö.`, R`$A = 0$||Töö on null ainult siis, kui ruumala ei muutu.`]),
    num(R`Paisumise töö:`, 8104, 'J', { final: true, label: R`A` }),
    num(R`Siseenergia muut ($\Delta U = \frac{i}{2}\frac{m}{\mu}R\Delta T$):`, 20260, 'J', { final: true, label: R`\Delta U`, alts: [{ a: 12156, msg: 'Vesinik on kaheaatomiline, $i = 5$.' }] }),
    num(R`Gaasile antud soojushulk:`, 28360, 'J', { final: true, label: R`Q`, hint: R`I seadus: $\Delta U = Q - A$`, alts: [{ a: 20260 - 8104, msg: 'Märk on vale: $Q = \\Delta U + A$.' }] })
  ],
  sol: R`Termodünaamika I seadus: $\Delta U = Q - A$.

Töö jääval rõhul: $A = \int p\,dV = p(V_2 - V_1) = pV_1$ (sest $V_2 = 2V_1$). Mendelejev-Clapeyroni võrrandist $pV_1 = \frac{m}{\mu}RT_1$:
$$A = \frac{m}{\mu}RT_1 = \frac{0.0065}{0.002}\cdot 8.31\cdot 300 \approx 8.1\ \text{kJ}$$
Isobaarilisest protsessist $\frac{V_1}{T_1} = \frac{V_2}{T_2}$, seega $T_2 = 2T_1$ ja $\Delta T = 300\ \text{K}$. Vesinikul $i = 5$:
$$\Delta U = \frac{5}{2}\frac{m}{\mu}R(T_2 - T_1) = \frac{5}{2}\cdot 3.25\cdot 8.31\cdot 300 \approx 20.3\ \text{kJ}$$
$$Q = \Delta U + A \approx 28.4\ \text{kJ}$$`,
  ans: R`$\Delta U = 20\ \text{kJ}$, $A = 8.1\ \text{kJ}$, $Q = 28\ \text{kJ}$`
});

P({ id: '564', b: 9, k: 'K', src: 'I',
  text: R`1,8 kilomooli süsihappegaasi soojendati jääval rõhul 50 K võrra. Leida siseenergia muut, paisumise töö ja gaasile antud soojushulk.`,
  given: R`<b>Andmed:</b> $\nu = 1800\ \text{mol}$, $p = \text{const}$, $\Delta T = 50\ \text{K}$, CO₂ (lineaarne, $i = 5$).<br><b>Leida:</b> $\Delta U$, $A$, $Q$.`,
  steps: [
    num(R`Siseenergia muut:`, 1.87e6, 'J', { final: true, label: R`\Delta U`, alts: [{ a: 3 * 1800 * 8.31 * 50, msg: 'See on $i = 6$ korral. CO₂ on lineaarne molekul, $i = 5$.' }] }),
    num(R`Paisumise töö:`, 7.48e5, 'J', { final: true, label: R`A`, hint: R`$A = p\Delta V = \nu R\Delta T$` }),
    num(R`Gaasile antud soojushulk:`, 2.62e6, 'J', { final: true, label: R`Q` })
  ],
  sol: R`$\Delta U = \frac{i}{2}\nu R\Delta T$, CO₂ on lineaarne ($i = 5$):
$$\Delta U = \frac{5}{2}\cdot 1800\cdot 8.31\cdot 50 \approx 1.87\ \text{MJ}$$
Jääval rõhul $A = p(V_2 - V_1) = \nu R\Delta T = 1800\cdot 8.31\cdot 50 \approx 0.75\ \text{MJ}$ ja
$$Q = \Delta U + A \approx 2.61\ \text{MJ}$$`,
  ans: R`$\Delta U = 1.86\ \text{MJ}$, $A = 0.75\ \text{MJ}$, $Q = 2.61\ \text{MJ}$`,
  after: R`Raamatu vastus on 2,2 MJ; 0,75 MJ; 3,0 MJ, sest seal on CO₂ jaoks võetud $i = 6$. Konspekti koduses lahenduses on $i = 5$ (lineaarne molekul), siin on konspekti vastused.`
});

/* ---------- Sarnased ---------- */

P({ id: '550', b: 9, k: 'S', src: 'I',
  text: R`1,5 kg kaheaatomilist ideaalset gaasi on rõhul 84 kPa. Leida gaasi siseenergia, kui selle tihedus on 4,2 kg/m³.`,
  given: R`<b>Andmed:</b> $m = 1.5\ \text{kg}$, $p = 84\ \text{kPa}$, $\rho = 4.2\ \text{kg/m}^3$, $i = 5$.<br><b>Leida:</b> $U$.`,
  steps: [
    num(R`Gaasi ruumala:`, 0.357, 'm³', { label: R`V`, hint: R`$V = m/\rho$` }),
    num(R`Siseenergia:`, 75000, 'J', { final: true, label: R`U`, hint: R`$U = \frac{i}{2}pV$` })
  ],
  sol: R`$U = \frac{i}{2}pV$ ja $V = \frac{m}{\rho}$:
$$U = \frac{5}{2}\cdot 84\cdot 10^3\cdot\frac{1.5}{4.2} = 75\ \text{kJ}$$`,
  ans: R`75 kJ`
});

P({ id: '551', b: 9, k: 'S', src: 'I',
  text: R`Määrata heeliumi siseenergia juurdekasv, kui gaasi ruumala suureneb 4,9 liitrilt 10 liitrini rõhul 196 kPa.`,
  given: R`<b>Andmed:</b> He ($i = 3$), $V_1 = 4.9\ \text{L}$, $V_2 = 10\ \text{L}$, $p = 196\ \text{kPa}$.<br><b>Leida:</b> $\Delta U$.`,
  steps: [
    iStep('heeliumi', 3),
    num(R`Siseenergia juurdekasv:`, 1499, 'J', { final: true, label: R`\Delta U`, hint: R`$U = \frac{i}{2}pV$, rõhk on sama`, alts: [{ a: 2499, msg: 'Heelium on üheaatomiline, $i = 3$.' }] })
  ],
  sol: R`$U = \frac{3}{2}pV$ ja rõhk on konstantne:
$$\Delta U = \frac{3}{2}p(V_2 - V_1) = \frac{3}{2}\cdot 196\cdot 10^3\cdot 5.1\cdot 10^{-3} \approx 1.5\ \text{kJ}$$`,
  ans: R`1,5 kJ`
});

P({ id: '552', b: 9, k: 'S', src: 'I',
  text: R`Rõhul 12 MPa oli gaasi ruumala 1,0 L. Gaas paisus isotermiliselt ruumalani 5,0 L. Leida rõhu muut ning paisumisel tehtud töö.`,
  given: R`<b>Andmed:</b> $p_1 = 12\ \text{MPa}$, $V_1 = 1.0\ \text{L}$, $V_2 = 5.0\ \text{L}$, $T = \text{const}$.<br><b>Leida:</b> $\Delta p$, $A$.`,
  viz: PV_T(),
  steps: [
    num(R`Lõpprõhk:`, 2.4e6, 'Pa', { label: R`p_2`, hint: R`$p_1V_1 = p_2V_2$` }),
    num(R`Rõhu muut $\Delta p = p_2 - p_1$:`, -9.6e6, 'Pa', { final: true, label: R`\Delta p` }),
    mc(R`Kuidas kirjutada isotermilise töö valemit, kui massi ja temperatuuri pole antud?`, [R`*$A = p_1V_1\ln\frac{V_2}{V_1}$, sest $\frac{m}{\mu}RT = p_1V_1$`, R`$A = p_1(V_2 - V_1)$||See oleks jääva rõhu korral.`, R`$A = (p_1 - p_2)(V_2 - V_1)$||Isoterm pole sirge, tuleb integreerida.`]),
    num(R`Paisumisel tehtud töö:`, 19310, 'J', { final: true, label: R`A` })
  ],
  sol: R`Isotermilisel protsessil $p_1V_1 = p_2V_2$, seega $p_2 = 12\cdot\frac{1}{5} = 2.4\ \text{MPa}$ ja $\Delta p = -9.6\ \text{MPa}$.
$$A = \frac{m}{\mu}RT\ln\frac{V_2}{V_1} = p_1V_1\ln\frac{V_2}{V_1} = 12\cdot 10^6\cdot 10^{-3}\ln 5 \approx 19\ \text{kJ}$$`,
  ans: R`$-9.6\ \text{MPa}$; 19 kJ`
});

P({ id: '561', b: 9, k: 'S', src: 'I',
  text: R`Kui palju soojust kulub 200 g vesiniku temperatuuri tõstmiseks 273 K kuni 373 K jääval rõhul? Kui suur on seejuures siseenergia juurdekasv ning paisumisel tehtud töö?`,
  given: R`<b>Andmed:</b> $m = 200\ \text{g}$, $\mu = 0.002\ \text{kg/mol}$, $\Delta T = 100\ \text{K}$, $p = \text{const}$, $i = 5$.<br><b>Leida:</b> $Q$, $\Delta U$, $A$.`,
  steps: [
    num(R`Moolide arv:`, 100, 'mol', { label: R`\nu` }),
    num(R`Paisumise töö:`, 83100, 'J', { final: true, label: R`A` }),
    num(R`Siseenergia juurdekasv:`, 207750, 'J', { final: true, label: R`\Delta U` }),
    num(R`Soojushulk:`, 290850, 'J', { final: true, label: R`Q` })
  ],
  sol: R`$\nu = \frac{0.2}{0.002} = 100\ \text{mol}$. Jääval rõhul $A = \nu R\Delta T = 100\cdot 8.31\cdot 100 \approx 83\ \text{kJ}$,
$$\Delta U = \frac{5}{2}\nu R\Delta T \approx 208\ \text{kJ}, \qquad Q = \Delta U + A = \frac{7}{2}\nu R\Delta T \approx 291\ \text{kJ}$$`,
  ans: R`291 kJ; 208 kJ; 83 kJ`
});

P({ id: '562', b: 9, k: 'S', src: 'I',
  text: R`10 g hapniku rõhk oli $30\cdot 10^4$ Pa ja temperatuur 10 °C. Pärast soojendamist jääval rõhul on gaasi ruumala 10 L. Arvutada gaasile antud soojushulk, siseenergia muut ja gaasi paisumise töö.`,
  given: R`<b>Andmed:</b> $m = 10\ \text{g}$, $\mu = 0.032\ \text{kg/mol}$, $p = 3.0\cdot 10^5\ \text{Pa}$, $T_1 = 283\ \text{K}$, $V_2 = 10\ \text{L}$, $i = 5$.<br><b>Leida:</b> $Q$, $\Delta U$, $A$.`,
  steps: [
    num(R`Algruumala:`, 2.45e-3, 'm³', { label: R`V_1`, hint: R`$V_1 = \frac{mRT_1}{\mu p}$` }),
    num(R`Paisumise töö:`, 2264, 'J', { final: true, label: R`A` }),
    num(R`Siseenergia muut:`, 5660, 'J', { final: true, label: R`\Delta U`, hint: R`$\Delta U = \frac{i}{2}\frac{m}{\mu}R\Delta T = \frac{i}{2}p\Delta V$` }),
    num(R`Soojushulk:`, 7925, 'J', { final: true, label: R`Q` })
  ],
  sol: R`$V_1 = \frac{mRT_1}{\mu p} = \frac{0.010\cdot 8.31\cdot 283}{0.032\cdot 3\cdot 10^5} \approx 2.45\cdot 10^{-3}\ \text{m}^3$.
$$A = p(V_2 - V_1) = 3\cdot 10^5\cdot 7.55\cdot 10^{-3} \approx 2.3\ \text{kJ}, \qquad \Delta U = \frac{5}{2}p\Delta V \approx 5.7\ \text{kJ}, \qquad Q = \Delta U + A \approx 7.9\ \text{kJ}$$`,
  ans: R`7,9 kJ; 5,7 kJ; 2,3 kJ`
});

P({ id: '567', b: 9, k: 'S', src: 'I',
  text: R`Rõhul 196 kPa oli 5,0 L gaasi temperatuur 17 °C. Paisudes jääval rõhul, tegi ta 196 J tööd. Kui palju muutus seejuures temperatuur?`,
  given: R`<b>Andmed:</b> $p = 196\ \text{kPa}$, $V_1 = 5.0\ \text{L}$, $T_1 = 290\ \text{K}$, $A = 196\ \text{J}$.<br><b>Leida:</b> $\Delta T$.`,
  steps: [
    mc(R`Kuidas siduda töö ja temperatuuri muut, kui massi pole antud?`, [R`*$A = \nu R\Delta T$ ja $\nu R = \frac{pV_1}{T_1}$, seega $\Delta T = \frac{AT_1}{pV_1}$`, R`$\Delta T = \frac{A}{pV_1}$||See on suhteline ruumala muut $\Delta V/V_1$, korruta $T_1$-ga.`, R`$\Delta T = \frac{2A}{5\nu R}$||See oleks siseenergia muudust.`]),
    num(R`Temperatuuri muut:`, 58, 'K', { final: true, label: R`\Delta T` })
  ],
  sol: R`Jääval rõhul $A = p\Delta V$ ja $\frac{\Delta V}{V_1} = \frac{\Delta T}{T_1}$, seega
$$\Delta T = \frac{AT_1}{pV_1} = \frac{196\cdot 290}{196\cdot 10^3\cdot 5\cdot 10^{-3}} = 58\ \text{K}$$`,
  ans: R`58 K`
});
})();
