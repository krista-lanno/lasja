/* 8. Ideaalse gaasi olekuvõrrand (kogu I). Tunnis: 477, 484, 489. Kodus: 479, 485, 490. */
(function () {
const R = String.raw;

const GAS = (o) => Viz.html('gas', o || {});

/* Rehv ja pump (489) */
function fig489() {
  return `<svg viewBox="0 0 360 170" class="gsvg">
  <rect x="20" y="40" width="40" height="100" rx="3"/><rect x="24" y="60" width="32" height="10" class="thin"/>
  <line x1="40" y1="20" x2="40" y2="60"/><line x1="28" y1="20" x2="52" y2="20"/>
  <path d="M60 120 C 110 120, 120 95, 165 95"/>
  <circle cx="240" cy="90" r="62"/><circle cx="240" cy="90" r="34" class="thin"/>
  <line x1="150" y1="155" x2="340" y2="155"/>
  <line x1="215" y1="152" x2="265" y2="152" class="dash"/>
  <text x="200" y="168" class="up" font-size="12">kokkupuude S</text>
  <line x1="240" y1="10" x2="240" y2="26"/><polygon points="234,24 246,24 240,32" class="pt"/>
  <text x="248" y="22">F</text>
  <text x="10" y="160" class="up" font-size="12">pump ΔV</text>
  <text x="225" y="94" class="up" font-size="12">V, p</text></svg>`;
}

P({ id: '477', b: 8, k: 'T', src: 'I',
  text: R`Gaasi rõhk temperatuuril 280 K on 0,010 mm Hg. Määrata molekulide arv ruumalaühikus.`,
  given: R`<b>Andmed:</b> $p = 0.010\ \text{mm Hg}$, $T = 280\ \text{K}$.<br><b>Leida:</b> $n = \frac{N}{V}$.`,
  viz: GAS({ n: 40 }),
  steps: [
    mc(R`Molekulide arv ruumalaühikus on $n = N/V$. Mis valem seob selle rõhu ja temperatuuriga?`,
      [R`*$p = nkT$`, R`$p = nRT$||$R$ on ühe mooli kohta. Molekulide kohta käib Boltzmanni konstant $k = R/N_A$.`, R`$pV = nkT$||$n$ on juba ruumalaühiku kohta, $V$ on üleliigne.`],
      R`Mendelejev-Clapeyroni võrrandist $V = \frac{mRT}{\mu p}$ ja $N = \frac{m}{\mu}N_A$, jagades saame $\frac{N}{V} = \frac{pN_A}{RT} = \frac{p}{kT}$.`),
    num(R`Teisenda rõhk paskaliteks ($1\ \text{mm Hg} \approx 133\ \text{Pa}$):`, 1.333, 'Pa', { label: R`p`, hint: R`$1\ \text{atm} = 760\ \text{mm Hg} \approx 10^5\ \text{Pa}$` }),
    num(R`Molekulide arv ruumalaühikus:`, 3.45e20, '1/m³', { final: true, label: R`n`, hint: R`$n = \frac{p}{kT}$, $k = 1.38\cdot 10^{-23}\ \text{J/K}$`, alts: [{ a: 0.010 / (1.38e-23 * 280), msg: 'Rõhk on vaja enne paskaliteks teisendada.' }] })
  ],
  sol: R`Kirjutame eraldi välja ruumala (Mendelejev-Clapeyroni võrrandist) ja molekulide arvu:
$$V = \frac{mRT}{\mu p}, \qquad N = \frac{m}{\mu}N_A \quad\Rightarrow\quad \frac{N}{V} = \frac{pN_A}{RT} = \frac{p}{kT}$$
(arvestasime, et $R = N_Ak$). Rõhk: $0.010\ \text{mm Hg} \approx 1.33\ \text{Pa}$.
$$\frac{N}{V} = \frac{1.33}{1.38\cdot 10^{-23}\cdot 280} \approx 3.4\cdot 10^{20}\ \text{m}^{-3}$$`,
  ans: R`$3.5\cdot 10^{20}$ molekuli kuupmeetris (konspektis $3.4\cdot 10^{20}$, sest seal on võetud $1\ \text{mm Hg} = 132\ \text{Pa}$).`
});

P({ id: '479', b: 8, k: 'K', src: 'I',
  text: R`Kui palju gaasi molekule peab sisalduma ruumalaühikus, et rõhk anuma seintele temperatuuril 27 °C oleks 0,10 Pa?`,
  given: R`<b>Andmed:</b> $T = 27\ ^\circ\text{C}$, $p = 0.10\ \text{Pa}$.<br><b>Leida:</b> $n = N/V$.`,
  steps: [
    num(R`Temperatuur kelvinites:`, 300, 'K', { label: R`T`, abs: 0.6, alts: [{ a: 27, msg: 'Valemis peab temperatuur olema kelvinites: $T = t + 273$.' }] }),
    mc(R`Milline valem annab molekulide kontsentratsiooni?`, [R`*$n = \frac{p}{kT}$`, R`$n = \frac{pT}{k}$||Rõhk on võrdeline temperatuuriga, seega $T$ peab olema nimetajas.`, R`$n = \frac{p}{RT}$||Nii saaksid moolide arvu ruumalaühikus, mitte molekulide arvu.`]),
    num(R`Molekulide arv ruumalaühikus:`, 2.42e19, '1/m³', { final: true, label: R`n`, alts: [{ a: 0.1 / (8.31 * 300), msg: 'See on moolide arv ruumalaühikus. Molekulide jaoks kasuta $k$, mitte $R$.' }] })
  ],
  sol: R`Nagu ülesandes 477: $V = \frac{mRT}{\mu p}$ ja $N = \frac{m}{\mu}N_A$, seega
$$\frac{N}{V} = \frac{p}{kT} = \frac{0.10}{1.38\cdot 10^{-23}\cdot 300} \approx 2.4\cdot 10^{19}\ \text{m}^{-3}$$`,
  ans: R`$2.4\cdot 10^{19}\ \text{m}^{-3}$`,
  after: R`Koduse ülesande lahenduses on kasutatud temperatuuri 20 °C ($2.47\cdot 10^{19}$). Raamatus on 27 °C, siin on raamatu andmed.`
});

P({ id: '484', b: 8, k: 'T', src: 'I',
  text: R`Missugune on gaasisegu rõhk kolvis ruumalaga 2,5 L, kui seal on $1.0\cdot 10^{15}$ molekuli hapnikku, $4.0\cdot 10^{15}$ molekuli lämmastikku ja $3.3\cdot 10^{-7}$ g argooni? Gaasisegu temperatuur on 150 °C.`,
  given: R`<b>Andmed:</b> $V = 2.5\ \text{L}$, $N_1 = 1.0\cdot 10^{15}$, $N_2 = 4.0\cdot 10^{15}$, $m_3 = 3.3\cdot 10^{-7}\ \text{g}$, $\mu_3 = 0.040\ \text{kg/mol}$, $t = 150\ ^\circ\text{C}$.<br><b>Leida:</b> $p$.`,
  viz: GAS({ mix: [{ n: 10, c: 'accent', l: 'O₂', m: 1 }, { n: 40, c: 'good', l: 'N₂', m: 0.9 }, { n: 50, c: 'pos', l: 'Ar', m: 1.25, r: 3.8 }], sliders: false,
    info: R`Iga gaas lööb seinu omaette. Segu rõhk on komponentide osarõhkude summa (Daltoni seadus). Rõhk sõltub ainult molekulide <b>arvust</b> ja temperatuurist, mitte sellest, mis gaas see on.` }),
  steps: [
    mc(R`Kuidas leida segu rõhk?`, [R`*Liita kõigi komponentide molekulide arvud: $p = \frac{(N_1 + N_2 + N_3)kT}{V}$`, R`Liita komponentide massid ja jagada keskmise molaarmassiga||Võib, aga hapniku ja lämmastiku massi pole antud. Molekulide arv on otsem tee.`, R`Võtta ainult argooni rõhk, sest tema mass on antud||Kõik kolm gaasi annavad rõhu, need liituvad.`],
      R`Mendelejev-Clapeyroni võrrand segu kohta: $pV = RT\sum\frac{m_i}{\mu_i}$ ja $\frac{m_i}{\mu_i} = \frac{N_i}{N_A}$.`),
    num(R`Argooni molekulide arv ($N_3 = \frac{m_3}{\mu_3}N_A$):`, 4.97e15, '', { label: R`N_3`, alts: [{ a: 3.3e-7 / 0.040 * 6.02e23, msg: 'Mass tuleb teisendada kilogrammideks: $3.3\\cdot 10^{-7}\\ \\text{g} = 3.3\\cdot 10^{-10}\\ \\text{kg}$.' }] }),
    num(R`Molekulide koguarv:`, 9.97e15, '', { label: R`N` }),
    num(R`Gaasisegu rõhk:`, 0.0233, 'Pa', { final: true, label: R`p`, hint: R`$T = 423\ \text{K}$, $V = 2.5\cdot 10^{-3}\ \text{m}^3$`, alts: [{ a: 9.97e15 * 1.38e-23 * 150 / 2.5e-3, msg: 'Temperatuur on vaja kelvinites: $T = 423\\ \\text{K}$.' }] })
  ],
  sol: R`Mendelejev-Clapeyroni võrrand gaaside segu kohta: $pV = RT\left(\frac{m_1}{\mu_1} + \frac{m_2}{\mu_2} + \frac{m_3}{\mu_3}\right)$. Hapniku ja lämmastiku massi pole antud, kasutame $\frac{m_i}{\mu_i} = \frac{N_i}{N_A}$:
$$p = \frac{RT}{V}\left(\frac{N_1}{N_A} + \frac{N_2}{N_A} + \frac{m_3}{\mu_3}\right) = \frac{kT}{V}\left(N_1 + N_2 + \frac{m_3N_A}{\mu_3}\right)$$
$$N_3 = \frac{3.3\cdot 10^{-10}}{0.040}\cdot 6.02\cdot 10^{23} \approx 5.0\cdot 10^{15}, \qquad p = \frac{1.38\cdot 10^{-23}\cdot 423\cdot 1.0\cdot 10^{16}}{2.5\cdot 10^{-3}} \approx 0.023\ \text{Pa}$$`,
  ans: R`0,023 Pa`
});

P({ id: '485', b: 8, k: 'K', src: 'I',
  text: R`Lämmastiku ja heeliumi segu temperatuur on 27 °C ja rõhk $1.3\cdot 10^2$ Pa. Lämmastiku mass moodustab 70% kogu segu massist. Leida kummagi gaasi molekulide kontsentratsioon segus.`,
  given: R`<b>Andmed:</b> $T = 300\ \text{K}$, $p = 130\ \text{Pa}$, $m_1 = 0.7m$ (N₂, $\mu_1 = 0.028\ \text{kg/mol}$), $m_2 = 0.3m$ (He, $\mu_2 = 0.004\ \text{kg/mol}$).<br><b>Leida:</b> $n_1$, $n_2$.`,
  viz: GAS({ mix: [{ n: 15, c: 'accent', l: 'N₂', m: 7, r: 4 }, { n: 45, c: 'pos', l: 'He', m: 1, r: 2.6 }], sliders: false,
    info: R`Heeliumi molekul on 7 korda kergem, seega 30% massist annab rohkem molekule kui 70% lämmastikku. Rõhku annavad kõik molekulid kokku.` }),
  steps: [
    num(R`Kõigi molekulide kontsentratsioon kokku ($n = n_1 + n_2$):`, 3.14e22, '1/m³', { label: R`n`, hint: R`$p = (n_1 + n_2)kT$` }),
    mc(R`Mitu korda on heeliumi molekule rohkem kui lämmastiku molekule? (Molekulide arv on võrdeline suurusega $m_i/\mu_i$.)`,
      [R`*3 korda: $\frac{0.3/0.004}{0.7/0.028} = \frac{75}{25}$`, R`0,43 korda: $\frac{0.3}{0.7}$||Nii võrdleksid masse. Molekulide arv sõltub ka molaarmassist.`, R`7 korda||See on molaarmasside suhe. Arvesta ka seda, et masse on erinevalt.`]),
    num(R`Lämmastiku molekulide kontsentratsioon:`, 7.85e21, '1/m³', { final: true, label: R`n_1`, hint: R`$n_1 = \frac{n}{4}$, sest $n_2 = 3n_1$` }),
    num(R`Heeliumi molekulide kontsentratsioon:`, 2.35e22, '1/m³', { final: true, label: R`n_2` })
  ],
  sol: R`Segu kohta $p = (n_1 + n_2)kT$, seega $n_1 + n_2 = \frac{p}{kT} = \frac{130}{1.38\cdot 10^{-23}\cdot 300} \approx 3.14\cdot 10^{22}\ \text{m}^{-3}$.

Molekulide arvud on võrdelised moolide arvuga $\frac{m_i}{\mu_i}$:
$$\frac{n_2}{n_1} = \frac{0.3m/0.004}{0.7m/0.028} = \frac{75}{25} = 3$$
Järelikult $n_1 = \frac{3.14\cdot 10^{22}}{4} \approx 7.9\cdot 10^{21}\ \text{m}^{-3}$ ja $n_2 = 3n_1 \approx 2.4\cdot 10^{22}\ \text{m}^{-3}$.`,
  ans: R`Lämmastik $7.9\cdot 10^{21}\ \text{m}^{-3}$, heelium $2.4\cdot 10^{22}\ \text{m}^{-3}$.`
});

P({ id: '489', b: 8, k: 'T', src: 'I',
  text: R`Jalgrattapump surub ühe tõukega 40 cm³ õhku jalgrattakummi. Mitme tõukega saab täita tühja kummi mahuga 2,0 L rõhuni, mis ratta koormuse 343 N (kaasa arvatud ka ratta kaal) puhul annaks kokkupuutepinna 60 cm² ratta ja teekatte vahel? Õhurõhuks võtta 760 mm Hg.`,
  fig: fig489(),
  given: R`<b>Andmed:</b> $\Delta V = 40\ \text{cm}^3$, $V = 2.0\ \text{L}$, $F = 343\ \text{N}$, $S = 60\ \text{cm}^2$, $p_0 = 760\ \text{mm Hg} \approx 1.0\cdot 10^5\ \text{Pa}$, $T = \text{const}$.<br><b>Leida:</b> $n$ (tõugete arv).`,
  viz: GAS({ n: 12, pump: 6, sliders: false, title: 'Pumpamine kinnisesse kummi',
    info: R`Iga tõuge lisab kummi sama palju molekule. Ruumala ja temperatuur on samad, seega rõhk kasvab võrdeliselt molekulide arvuga.` }),
  steps: [
    mc(R`Kui suur peab olema rõhk kummi sees?`, [R`*$p = p_0 + \frac{F}{S}$`, R`$p = \frac{F}{S}$||Kumm peab tasakaalustama ka väljast surava atmosfäärirõhu.`, R`$p = p_0$||Siis kumm ei kannaks koormust.`], R`Kummi seest surub õhk, väljast atmosfäär ja tee (jõud $F$ pinnale $S$).`),
    num(R`Koormusest tulev lisarõhk $\frac{F}{S}$:`, 57167, 'Pa', { label: R`\frac{F}{S}`, alts: [{ a: 343 / 60, msg: 'Pindala tuleb teisendada: $60\\ \\text{cm}^2 = 6.0\\cdot 10^{-3}\\ \\text{m}^2$.' }] }),
    mc(R`Atmosfäärist võetakse kokku ruumala $n\Delta V$ (rõhul $p_0$) ja see surutakse kummi ruumalasse $V$. Temperatuur ei muutu. Milline võrrand kehtib?`,
      [R`*$p_0\,n\Delta V = pV$`, R`$p\,n\Delta V = p_0V$||Rõhk $p_0$ käib atmosfääriõhu ruumala $n\Delta V$ juurde.`, R`$\frac{p_0}{n\Delta V} = \frac{p}{V}$||Isotermilises protsessis on konstantne korrutis $pV$, mitte jagatis.`]),
    num(R`Tõugete arv:`, 78.2, '', { final: true, label: R`n`, abs: 1.6, hint: R`$n = \frac{(p_0 + F/S)V}{p_0\Delta V}$`, alts: [{ a: 57167 * 2e-3 / (1.013e5 * 4e-5), msg: 'Unustasid atmosfäärirõhu. Kummi sees on rõhk $p_0 + F/S$.' }] })
  ],
  sol: R`Kummi sees peab rõhk tasakaalustama atmosfäärirõhu ja koormuse: $p = p_0 + \frac{F}{S}$.

Pumbatud õhk oli algul atmosfääris ruumalaga $n\Delta V$, rõhuga $p_0$. Temperatuur on konstantne, Clapeyroni võrrandist jääb isotermilise protsessi võrrand:
$$p_0\,n\Delta V = \left(p_0 + \frac{F}{S}\right)V \quad\Rightarrow\quad n = \frac{(p_0 + F/S)V}{p_0\Delta V}$$
$$n = \frac{(10^5 + 343/0.006)\cdot 0.002}{10^5\cdot 4\cdot 10^{-5}} \approx 78$$`,
  ans: R`78 tõuget`
});

P({ id: '490', b: 8, k: 'K', src: 'I',
  text: R`Rõhul 98 kPa ja temperatuuril 270 K haarab kompressor iga tõukega 4,0 L õhku ja surub seda reservuaari, mille maht on 1,5 m³ ning esialgne rõhk on välisrõhuga võrdne. Reservuaaris püsib õhu temperatuur 45 °C juures. Mitu tõuget peab kompressor tegema, et rõhk reservuaaris suureneks 196 kPa võrra?`,
  given: R`<b>Andmed:</b> $p_0 = 98\ \text{kPa}$, $T_0 = 270\ \text{K}$, $\Delta V = 4.0\ \text{L}$, $V = 1.5\ \text{m}^3$, $T_1 = 318\ \text{K}$, $p_2 = p_0 + 196\ \text{kPa}$.<br><b>Leida:</b> $n$.`,
  steps: [
    mc(R`Mis jääb pumpamisel muutumatuks?`, [R`*Gaasi mass: reservuaari algne gaas + pumbatud gaas = lõpuks reservuaaris olev gaas`, R`$pV$ korrutis||Temperatuurid on erinevad (270 K väljas, 318 K sees), $pV$ ei ole konstantne.`, R`Rõhk||Rõhk kasvab, see ongi küsimus.`],
      R`Iga gaasikoguse massi saab kirjutada kui $m = \frac{\mu pV}{RT}$.`),
    num(R`Lõpprõhk reservuaaris:`, 294000, 'Pa', { label: R`p_2` }),
    mc(R`Massi jäävusest pärast $\mu$ ja $R$ taandamist:`, [R`*$\frac{p_0V}{T_1} + \frac{p_0n\Delta V}{T_0} = \frac{p_2V}{T_1}$`, R`$p_0V + p_0n\Delta V = p_2V$||Nii eeldaksid, et temperatuur on kõikjal sama.`, R`$\frac{p_0V}{T_0} + \frac{p_0n\Delta V}{T_1} = \frac{p_2V}{T_1}$||Pumbatav välisõhk on temperatuuril $T_0 = 270\ \text{K}$, reservuaari õhk $T_1$ juures.`]),
    num(R`Tõugete arv:`, 637, '', { final: true, label: R`n`, abs: 8, hint: R`$n = \frac{(p_2 - p_0)VT_0}{p_0\Delta V\,T_1}$`, alts: [{ a: 196e3 * 1.5 / (98e3 * 4e-3), msg: 'Arvesta, et välisõhk ($270\\ \\text{K}$) soojeneb reservuaaris $318\\ \\text{K}$-ni.' }] })
  ],
  sol: R`Gaasikoguseid on kaks: reservuaaris olev ($p_0$, $V$, $T_1$) ja kompressori poolt sisse pumbatav ($p_0$, $n\Delta V$, $T_0$). Pärast pumpamist on reservuaaris ($p_2$, $V$, $T_1$). Mass jääb samaks:
$$m_1 + m_0 = m_2 \quad\Rightarrow\quad \frac{\mu p_0V}{RT_1} + \frac{\mu p_0n\Delta V}{RT_0} = \frac{\mu p_2V}{RT_1}$$
Taandame $\mu$ ja $R$ ning avaldame:
$$n = \frac{(p_2 - p_0)VT_0}{p_0\Delta V\,T_1} = \frac{196\cdot 10^3\cdot 1.5\cdot 270}{98\cdot 10^3\cdot 4\cdot 10^{-3}\cdot 318} \approx 640$$`,
  ans: R`640 tõuget`
});

/* ---------- Sarnased ---------- */

P({ id: '478', b: 8, k: 'S', src: 'I',
  text: R`Anumas ruumalaga 4,0 L on 1,0 g vesinikku. Leida molekulide arv ruumalaühikus.`,
  given: R`<b>Andmed:</b> $V = 4.0\ \text{L}$, $m = 1.0\ \text{g}$, $\mu = 0.002\ \text{kg/mol}$.<br><b>Leida:</b> $n$.`,
  steps: [
    mc(R`Kuidas leida molekulide arv $N$?`, [R`*$N = \frac{m}{\mu}N_A$`, R`$N = \frac{m}{\mu}$||See on moolide arv. Korruta Avogadro arvuga.`, R`$N = mN_A$||Jaga enne molaarmassiga.`]),
    num(R`Molekulide arv:`, 3.01e23, '', { label: R`N` }),
    num(R`Molekulide arv ruumalaühikus:`, 7.53e25, '1/m³', { final: true, label: R`n`, alts: [{ a: 3.01e23 / 4, msg: 'Ruumala tuleb võtta kuupmeetrites: $4.0\\ \\text{L} = 4.0\\cdot 10^{-3}\\ \\text{m}^3$.' }] })
  ],
  sol: R`$$n = \frac{N}{V} = \frac{mN_A}{\mu V} = \frac{10^{-3}\cdot 6.02\cdot 10^{23}}{0.002\cdot 4.0\cdot 10^{-3}} \approx 7.5\cdot 10^{25}\ \text{m}^{-3}$$`,
  ans: R`$7.5\cdot 10^{25}\ \text{m}^{-3}$`
});

P({ id: '480', b: 8, k: 'S', src: 'I',
  text: R`Mitu gaasi molekuli on ruumalaühikus temperatuuril 20 °C ja rõhul $1.0\cdot 10^{-6}$ mm Hg?`,
  given: R`<b>Andmed:</b> $T = 293\ \text{K}$, $p = 1.0\cdot 10^{-6}\ \text{mm Hg}$.<br><b>Leida:</b> $n$.`,
  steps: [
    num(R`Rõhk paskalites:`, 1.333e-4, 'Pa', { label: R`p` }),
    num(R`Molekulide arv ruumalaühikus:`, 3.3e16, '1/m³', { final: true, label: R`n`, hint: R`$n = \frac{p}{kT}$` })
  ],
  sol: R`$p = 1.0\cdot 10^{-6}\cdot 133\ \text{Pa} \approx 1.33\cdot 10^{-4}\ \text{Pa}$ ja
$$n = \frac{p}{kT} = \frac{1.33\cdot 10^{-4}}{1.38\cdot 10^{-23}\cdot 293} \approx 3.3\cdot 10^{16}\ \text{m}^{-3}$$
Isegi nii heas vaakumis on igas kuupsentimeetris kümneid miljardeid molekule.`,
  ans: R`$3.3\cdot 10^{16}\ \text{m}^{-3}$`
});

P({ id: '483', b: 8, k: 'S', src: 'I',
  text: R`Anumas mahuga 2,0 m³ on 4,0 kg hapnikku. Kui suur on rõhk temperatuuril 29 °C?`,
  given: R`<b>Andmed:</b> $V = 2.0\ \text{m}^3$, $m = 4.0\ \text{kg}$, $\mu = 0.032\ \text{kg/mol}$, $T = 302\ \text{K}$.<br><b>Leida:</b> $p$.`,
  steps: [
    mc(R`Milline valem?`, [R`*$pV = \frac{m}{\mu}RT$`, R`$pV = mRT$||Massi asemel peab olema moolide arv $m/\mu$.`, R`$p = nkT$||Ka see sobib, aga siis tuleb enne leida molekulide arv. Mendelejev-Clapeyroni võrrand on otsem.`]),
    num(R`Rõhk:`, 1.57e5, 'Pa', { final: true, label: R`p`, alts: [{ a: 4 * 8.31 * 29 / (0.032 * 2), msg: 'Temperatuur kelvinites: $T = 302\\ \\text{K}$.' }] })
  ],
  sol: R`$$p = \frac{mRT}{\mu V} = \frac{4.0\cdot 8.31\cdot 302}{0.032\cdot 2.0} \approx 1.6\cdot 10^5\ \text{Pa}$$`,
  ans: R`$1.6\cdot 10^5\ \text{Pa}$`
});

P({ id: '486', b: 8, k: 'S', src: 'I',
  text: R`12 g gaasi täidab temperatuuril 280 K ruumala $4.0\cdot 10^{-3}$ m³. Pärast soojendamist jääval rõhul on gaasi tihedus $6.0\cdot 10^{-4}$ g/cm³. Millise temperatuurini soojendati gaasi?`,
  given: R`<b>Andmed:</b> $m = 12\ \text{g}$, $T_1 = 280\ \text{K}$, $V_1 = 4.0\cdot 10^{-3}\ \text{m}^3$, $p = \text{const}$, $\rho_2 = 6.0\cdot 10^{-4}\ \text{g/cm}^3$.<br><b>Leida:</b> $T_2$.`,
  steps: [
    num(R`Gaasi tihedus alguses ($\rho_1 = m/V_1$):`, 3, 'kg/m³', { label: R`\rho_1` }),
    mc(R`Jääval rõhul on Mendelejev-Clapeyroni võrrandist $p = \frac{\rho RT}{\mu}$. Mis on siis konstantne?`, [R`*$\rho T = \text{const}$, seega $T_2 = T_1\frac{\rho_1}{\rho_2}$`, R`$\frac{\rho}{T} = \text{const}$||Soojendamisel gaas paisub ja tihedus väheneb.`, R`$\rho = \text{const}$||Mass jääb samaks, aga ruumala kasvab.`]),
    num(R`Lõpptemperatuur:`, 1400, 'K', { final: true, label: R`T_2`, alts: [{ a: 280 * 3 / 6e-4, msg: 'Teisenda tihedus: $6.0\\cdot 10^{-4}\\ \\text{g/cm}^3 = 0.60\\ \\text{kg/m}^3$.' }] })
  ],
  sol: R`$pV = \frac{m}{\mu}RT \Rightarrow p = \frac{\rho RT}{\mu}$. Jääval rõhul $\rho_1T_1 = \rho_2T_2$.
$$\rho_1 = \frac{0.012}{4.0\cdot 10^{-3}} = 3.0\ \text{kg/m}^3, \qquad \rho_2 = 0.60\ \text{kg/m}^3, \qquad T_2 = 280\cdot\frac{3.0}{0.60} = 1400\ \text{K}$$`,
  ans: R`$1.4\cdot 10^3\ \text{K}$`
});

P({ id: '488', b: 8, k: 'S', src: 'I',
  text: R`Balloonis mahuga 10 L on vesinik rõhul 4,9 MPa ja temperatuuril 280 K. Ventiili rikke tõttu voolab osa gaasi balloonist välja. Mõne aja pärast, temperatuuril 290 K, on rõhk balloonis endine. Leida väljavoolanud gaasi mass.`,
  given: R`<b>Andmed:</b> $V = 10\ \text{L}$, $p = 4.9\ \text{MPa}$, $T_1 = 280\ \text{K}$, $T_2 = 290\ \text{K}$, $\mu = 0.002\ \text{kg/mol}$.<br><b>Leida:</b> $\Delta m$.`,
  steps: [
    mc(R`Rõhk ja ruumala on samad, temperatuur tõusis. Mis juhtus massiga?`, [R`*$mT = \text{const}$: kõrgemal temperatuuril mahub balloonis sama rõhu juures vähem gaasi`, R`Mass jäi samaks||Siis oleks rõhk temperatuuri tõusuga kasvanud.`, R`Mass kasvas||Gaasi voolas välja, mitte sisse.`]),
    num(R`Gaasi mass alguses ($m_1 = \frac{\mu pV}{RT_1}$):`, 0.04211, 'kg', { label: R`m_1`, alts: [{ a: 0.004211, msg: 'Ruumala: $10\\ \\text{L} = 0.010\\ \\text{m}^3$.' }] }),
    num(R`Väljavoolanud gaasi mass:`, 1.45e-3, 'kg', { final: true, label: R`\Delta m`, hint: R`$\Delta m = \frac{\mu pV}{R}\left(\frac{1}{T_1} - \frac{1}{T_2}\right)$` })
  ],
  sol: R`Enne: $pV = \frac{m}{\mu}RT_1$, pärast: $pV = \frac{m - \Delta m}{\mu}RT_2$. Avaldame:
$$\Delta m = \frac{\mu pV}{R}\left(\frac{1}{T_1} - \frac{1}{T_2}\right) = \frac{0.002\cdot 4.9\cdot 10^6\cdot 0.010}{8.31}\left(\frac{1}{280} - \frac{1}{290}\right) \approx 1.5\cdot 10^{-3}\ \text{kg}$$`,
  ans: R`1,5 g`,
  after: R`Selle ülesande koduses lahenduses on ruumala kirja pandud kui $0.001\ \text{m}^3$. Õige on $10\ \text{L} = 0.010\ \text{m}^3$, siis tuleb ka raamatu vastus 1,5 g.`
});
})();
