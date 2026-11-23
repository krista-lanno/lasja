/* KT2 valemid konspektist (teemad 8 kuni 14), konstandid ja tähised. */
(function () {
const R = String.raw;
const F = window.FORMULAS;

F[8] = Viz.html('gas', { n: 50 }) + R`<h4>Mendelejev-Clapeyroni võrrand</h4>
<p>$pV = \dfrac{m}{\mu}RT$</p>
<p>$p$ paskalites, $V$ kuupmeetrites, $T$ kelvinites; $m$ mass, $\mu$ molaarmass. Kehtib, kui gaasi kogus ei muutu ega toimu keemilisi reaktsioone.</p>
<h4>Gaaside segu</h4>
<p>$pV = RT\sum\limits_i\dfrac{m_i}{\mu_i}$, s.t. segu rõhk on osarõhkude summa.</p>
<h4>Clapeyroni võrrand (sama gaasikogus)</h4>
<p>$\dfrac{p_1V_1}{T_1} = \dfrac{p_2V_2}{T_2}$</p>
<p>Isotermiline ($T$ = const): $p_1V_1 = p_2V_2$. Isobaariline: $\dfrac{V_1}{T_1} = \dfrac{V_2}{T_2}$. Isokoorne: $\dfrac{p_1}{T_1} = \dfrac{p_2}{T_2}$.</p>
<h4>Molekulide arv ja kontsentratsioon</h4>
<p>$N = \dfrac{m}{\mu}N_A, \qquad n = \dfrac{N}{V} = \dfrac{p}{kT}$ (sest $R = N_Ak$)</p>
<h4>Ühikud</h4>
<p>$T\,[\text{K}] = t\,[^\circ\text{C}] + 273$</p>
<p>$1\ \text{atm} \approx 10^5\ \text{Pa} = 760\ \text{mm Hg}$, seega $1\ \text{mm Hg} \approx 133\ \text{Pa}$ (konspektis 132 Pa). $1\ \text{L} = 10^{-3}\ \text{m}^3$.</p>`;

F[9] = Viz.html('dof', {}) + R`<h4>Molekuli keskmine kineetiline energia</h4>
<p>$e = e_{kulg} + e_{pöörd} = \dfrac{3}{2}kT + \dfrac{i_{pöörd}}{2}kT = \dfrac{i}{2}kT$</p>
<p>Üheaatomiline $i = 3$; kaheaatomiline ja lineaarne (H₂, N₂, O₂, CO₂) $i = 5$; mittelineaarne (H₂O) $i = 6$.</p>
<h4>Ideaalse gaasi siseenergia</h4>
<p>$U = Ne = \dfrac{i}{2}\dfrac{m}{\mu}RT = \dfrac{i}{2}pV$</p>
<p>Siseenergia sõltub ainult temperatuurist: $\Delta U = \dfrac{i}{2}\dfrac{m}{\mu}R\Delta T$.</p>
<h4>Termodünaamika I seadus</h4>
<p>$\Delta U = Q - A$, s.t. $Q = \Delta U + A$</p>
<h4>Gaasi töö</h4>
<p>$A = \displaystyle\int_{V_1}^{V_2}p(V)\,dV$ (pindala p-V graafiku all)</p>
<p>Isotermiline: $A = \dfrac{m}{\mu}RT\ln\dfrac{V_2}{V_1} = \dfrac{m}{\mu}RT\ln\dfrac{p_1}{p_2}$, $\Delta U = 0$, $Q = A$.</p>
<p>Isobaariline: $A = p(V_2 - V_1) = \dfrac{m}{\mu}R\Delta T$.</p>
<p>Isokoorne: $A = 0$, $Q = \Delta U$.</p>` + Viz.html('pv', { proc: 'T', title: 'Isoterm', cap: ' ' }) + Viz.html('pv', { proc: 'p', v1: 1, v2: 2, title: 'Isobaar', cap: ' ' });

F[10] = Viz.html('coulomb', { eps: 2 }) + R`<h4>Coulombi seadus</h4>
<p>$F = \dfrac{|q_1||q_2|}{4\pi\varepsilon_0\varepsilon r^2}$</p>
<p>$\varepsilon_0 = 8.85\cdot 10^{-12}\ \text{F/m}$, $\dfrac{1}{4\pi\varepsilon_0} \approx 9\cdot 10^9\ \text{N·m}^2/\text{C}^2$. Vaakumis ja gaasis $\varepsilon = 1$, teistes keskkondades $\varepsilon > 1$.</p>
<p>Kerade korral mõõdetakse $r$ keskpunktide vahel. Samamärgilised laengud tõukuvad, erimärgilised tõmbuvad.</p>
<h4>Mitu laengut, tasakaal</h4>
<p>Jõud liidetakse vektoritena: $\vec F = \sum\vec F_i$. Tasakaalus $\sum\vec F_i = 0$, mis kehtib ka projektsioonides: $\sum F_{ix} = 0$, $\sum F_{iy} = 0$.</p>
<p>Vektori projektsioon: $v_s = v\cos\varphi$.</p>
<h4>Kuulikesed niitide otsas</h4>
<p>$m\vec g + \vec T + \vec F_e = 0$, seega $\tan\dfrac{\alpha}{2} = \dfrac{F_e}{mg}$ ja $r = 2l\sin\dfrac{\alpha}{2}$.</p>
<p>Vedelikus: elektriline jõud $\varepsilon$ korda väiksem, lisandub üleslükkejõud $F_ü = \rho_{vedelik}Vg$.</p>`;

F[11] = Viz.html('field', { w: 360, h: 220, charges: [{ x: 130, y: 110, q: 1 }, { x: 230, y: 110, q: -1 }], probe: [180, 50], per: 10, title: 'Dipooli väli' }) + R`<h4>Punktlaengu (ja laetud kera) väli</h4>
<p>$E = \dfrac{|q|}{4\pi\varepsilon_0\varepsilon r^2}, \qquad \varphi = \dfrac{q}{4\pi\varepsilon_0\varepsilon r}$</p>
<p>Positiivse laengu väli on temast eemale, negatiivse laengu väli tema poole. Metallkeha sees $E = 0$ ja potentsiaal on konstantne, kera korral $\varphi = \dfrac{q}{4\pi\varepsilon_0\varepsilon R}$.</p>
<h4>Proovilaeng väljas</h4>
<p>$\vec F = q_0\vec E$ (positiivsel laengul $\vec E$ suunas, negatiivsel vastu), $W = \varphi q_0$</p>
<h4>Superpositsioon</h4>
<p>$\vec E = \sum\vec E_i$ (vektoriaalne summa), $\varphi = \sum\varphi_i$ (algebraline summa märki arvestades)</p>
<h4>Töö</h4>
<p>Elektriliste jõudude vastu tehtud töö laengu viimisel punktist 1 punkti 2: $A = q_0(\varphi_2 - \varphi_1) = -q_0\displaystyle\int\vec E\cdot d\vec r$</p>
<p>Lõpmatuses $\varphi = 0$.</p>
<h4>Energia jäävus (vaakumis)</h4>
<p>$q\varphi_1 + \dfrac{mv_1^2}{2} = q\varphi_2 + \dfrac{mv_2^2}{2}$, kiirendav pinge: $|q|U = \dfrac{mv^2}{2}$</p>`;

F[12] = Viz.html('plates', { mode: 'electron', title: 'Elektron kondensaatoris' }) + R`<h4>Kahe punktlaengu vastastikmõju energia</h4>
<p>$W = \varphi_1q_1 = \varphi_2q_2 = \dfrac{q_1q_2}{4\pi\varepsilon_0\varepsilon r}$</p>
<h4>Mahtuvus</h4>
<p>Juhi mahtuvus $C = \dfrac{q}{\varphi}$, kondensaatoril $C = \dfrac{q}{U}$.</p>
<p>Plaatkondensaator: $C = \dfrac{\varepsilon_0\varepsilon S}{d}$ (kui $d$ on palju väiksem plaatide mõõtmetest).</p>
<p>Laengu pindtihedus $\sigma = \dfrac{q}{S}$. Väli kondensaatoris $E = \dfrac{U}{d} = \dfrac{\sigma}{\varepsilon_0\varepsilon}$. Lõpmatu laetud tasandi väli $E = \dfrac{\sigma}{2\varepsilon_0\varepsilon}$.</p>
<h4>Jadaühendus</h4>
<p>$\dfrac{1}{C} = \dfrac{1}{C_1} + \dfrac{1}{C_2} + \dots$, laengud võrdsed $q_1 = q_2 = q$, $U = U_1 + U_2 + \dots$, $U_i = \dfrac{q}{C_i}$</p>
<h4>Rööpühendus</h4>
<p>$C = C_1 + C_2 + \dots$, pinged võrdsed, $q = q_1 + q_2 + \dots$, $q_i = C_iU$</p>
<h4>Ühtlaselt kiirenev liikumine homogeenses väljas</h4>
<p>$a = \dfrac{qE}{m}$, $v^2 = 2as$, $v = at$</p>`;

F[13] = CK.svg(300, 110, CK.wire([[20, 55], [70, 55]], 1) + CK.wire([[70, 55], [70, 20], [230, 20], [230, 55]], 0.7) + CK.wire([[70, 55], [70, 90], [230, 90], [230, 55]], 0.3) + CK.wire([[230, 55], [280, 55]], 1) +
  CK.R(150, 20, false, 'R₁') + CK.R(150, 90, false, 'R₂ = 2R₁', 0, 26) + CK.dot(70, 55) + CK.dot(230, 55), 'Rööpühendus: väiksema takistusega harust läheb rohkem voolu.') + R`<h4>Ohmi seadus ja võimsus</h4>
<p>$I = \dfrac{U}{R}$, $\quad N = UI = I^2R = \dfrac{U^2}{R}$ (Joule'i-Lenzi seadus)</p>
<h4>Jadaühendus</h4>
<p>$R = R_1 + R_2 + \dots$, $I$ on kõigis sama, $U = U_1 + U_2 + \dots$</p>
<p>$N_i = I^2R_i$: suurema takistusega lamp põleb heledamalt.</p>
<h4>Rööpühendus</h4>
<p>$\dfrac{1}{R} = \dfrac{1}{R_1} + \dfrac{1}{R_2} + \dots$, $U$ on kõigil sama, $I = I_1 + I_2 + \dots$ (Kirchhoffi I seadus)</p>
<p>$N_i = \dfrac{U^2}{R_i}$: väiksema takistusega lamp põleb heledamalt.</p>
<h4>Segaühendus</h4>
<p>Jaga skeem plokkideks, mis on kas ainult jada- või ainult rööpühenduses, ja arvuta seestpoolt väljapoole.</p>
<h4>Mõõteriistad</h4>
<p>Ampermeeter jadamisi (ideaalne $R_A \to 0$), voltmeeter rööbiti (ideaalne $R_V \to \infty$).</p>
<p>Šunt (rööbiti ampermeetriga): $R_š = \dfrac{I_AR_A}{I - I_A}$. Eeltakisti (jadamisi voltmeetriga): $R = R_V\left(\dfrac{U}{U_V} - 1\right)$.</p>`;

F[14] = Viz.html('power', { title: 'Kasulik võimsus N(R)' }) + R`<h4>Ohmi seadus suletud vooluringi kohta</h4>
<p>$I = \dfrac{\varepsilon}{R + r}$, klemmipinge $U = IR = \varepsilon - Ir$</p>
<h4>Võimsused ja kasutegur</h4>
<p>Koguvõimsus $N_{kogu} = \varepsilon I$, kasulik võimsus $N_{kas} = UI = I^2R$</p>
<p>$\eta = \dfrac{N_{kas}}{N_{kogu}}\cdot 100\% = \dfrac{U}{\varepsilon}\cdot 100\% = \dfrac{R}{R + r}\cdot 100\%$</p>
<h4>Maksimaalne kasulik võimsus</h4>
<p>$N = \dfrac{\varepsilon^2R}{(R + r)^2}$ on suurim, kui $R = r$: $N_{max} = \dfrac{\varepsilon^2}{4r}$, $\eta = 50\%$.</p>
<p>Sama võimsus kahe takistuse korral: $R_1R_2 = r^2$.</p>
<h4>Elementide patarei (jadamisi)</h4>
<p>$\varepsilon = n\varepsilon_1$, $r = nr_1$</p>
<h4>Lamp nimiandmetega</h4>
<p>$R = \dfrac{U_n^2}{N}$, $I_n = \dfrac{N}{U_n}$</p>`;

window.CONSTANTS2 = R`<h4>Konstandid ja tabeliandmed</h4>
<p>Avogadro arv $N_A = 6.02\cdot 10^{23}\ \text{mol}^{-1}$, Boltzmanni konstant $k = 1.38\cdot 10^{-23}\ \text{J/K}$, gaasikonstant $R = 8.31\ \text{J/(K·mol)}$</p>
<p>Molaarmassid (kg/mol): H₂ 0,002; He 0,004; N₂ 0,028; O₂ 0,032; Ar 0,040; CO₂ 0,044; õhk 0,029</p>
<p>Elementaarlaeng $e = 1.6\cdot 10^{-19}\ \text{C}$, elektroni mass $9.1\cdot 10^{-31}\ \text{kg}$, prootoni mass $1.67\cdot 10^{-27}\ \text{kg}$</p>
<p>Elektriline konstant $\varepsilon_0 = 8.85\cdot 10^{-12}\ \text{F/m}$, $\dfrac{1}{4\pi\varepsilon_0} \approx 9\cdot 10^9\ \text{N·m}^2/\text{C}^2$</p>
<p>Dielektriline läbitavus: petrooleum 2, eboniit 2,8, vilgukivi 6, klaas 7. Petrooleumi tihedus 800 kg/m³.</p>`;

window.SYMBOLS2 = R`<h4>Tähised</h4>
<p><b>Gaasid:</b> $p$ rõhk; $V$ ruumala; $T$ absoluutne temperatuur; $m$ mass; $\mu$ molaarmass; $\nu = m/\mu$ moolide arv; $N$ molekulide arv; $n = N/V$ kontsentratsioon; $i$ vabadusastmete arv; $U$ siseenergia; $Q$ soojushulk; $A$ gaasi töö</p>
<p><b>Elektrostaatika:</b> $q, Q$ laeng; $F$ jõud; $E$ väljatugevus; $\varphi$ potentsiaal; $U$ pinge; $\varepsilon$ dielektriline läbitavus; $\sigma$ laengu pindtihedus; $C$ mahtuvus; $S$ plaadi pindala; $d$ plaatide vahe</p>
<p><b>Vooluahelad:</b> $I$ voolutugevus; $R$ (väline) takistus; $r$ sisetakistus; $\varepsilon$ elektromotoorjõud; $N$ võimsus; $\eta$ kasutegur; $R_A$, $R_V$ ampermeetri ja voltmeetri takistus; $R_š$ šunt</p>
<p>Täht $\varepsilon$ on elektrostaatikas dielektriline läbitavus, vooluahelates elektromotoorjõud. $U$ on termodünaamikas siseenergia, elektris pinge.</p>`;

window.HOMEVIZ = Viz.html('gas', { n: 45, title: 'Gaas: p = nkT', sliders: true }) +
  Viz.html('field', { w: 340, h: 200, charges: [{ x: 120, y: 100, q: 1 }, { x: 220, y: 100, q: -1 }], probe: [170, 40], per: 10, title: 'Elektriväli: lohista proovilaengut' });
})();

/* Matemaatika ja jooniselt loetavad seosed (ei ole füüsika valemid, aga neid läheb vaja) + KT2 kokkuvõte */
(function () {
const R = String.raw;
const tri = `<svg viewBox="0 0 300 170" class="gsvg"><polygon points="30,140 220,140 220,30" style="fill:color-mix(in srgb,var(--accent) 10%,transparent)"/>` +
  `<path d="M206 140 L206 126 L220 126" class="thin"/><path d="M70 140 A40 40 0 0 0 64.6 120" class="thin"/><text x="76" y="132">α</text>` +
  `<text x="125" y="160" text-anchor="middle">a (lähiskaatet)</text><text x="228" y="90" font-size="13">b</text><text x="230" y="106" font-size="11" class="up">(vastas-</text><text x="230" y="119" font-size="11" class="up">kaatet)</text>` +
  `<text x="105" y="76" text-anchor="middle" transform="rotate(-30 105 76)">c (hüpotenuus)</text></svg>`;
const forceTri = `<svg viewBox="0 0 260 200" class="gsvg"><line x1="180" y1="10" x2="110" y2="130" class="thin"/><line x1="180" y1="10" x2="180" y2="130" class="dash"/>` +
  `<circle cx="110" cy="130" r="9" class="pos"/><text x="110" y="135" text-anchor="middle" class="q">+</text>` +
  `<line x1="110" y1="130" x2="110" y2="190" style="stroke-width:2.5"/><path d="M105 182 L110 192 L115 182" style="stroke-width:2.5"/><text x="116" y="190">mg</text>` +
  `<line x1="110" y1="130" x2="40" y2="130" style="stroke:var(--pos);stroke-width:2.5"/><path d="M48 125 L38 130 L48 135" style="stroke:var(--pos);stroke-width:2.5"/><text x="34" y="122" style="fill:var(--pos)">Fₑ</text>` +
  `<line x1="40" y1="130" x2="40" y2="190" class="dash"/><line x1="40" y1="190" x2="110" y2="190" class="dash"/><line x1="110" y1="130" x2="40" y2="190" class="dash"/>` +
  `<path d="M180 40 A30 30 0 0 0 164 36" class="thin"/><text x="160" y="58" font-size="12">α/2</text><path d="M110 165 A35 35 0 0 1 90 160" class="thin"/><text x="78" y="178" font-size="12">α/2</text></svg>`;
window.MATH2 = R`<h4>📐 Matemaatika abiks (seosed, mida loetakse jooniselt)</h4>
<p>Need ei ole füüsika valemid. Neid ei anta kontrolltöös, need tulevad põhikooli matemaatikast või loetakse oma joonistatud jooniselt.</p>
<div class="mathfig"><div>${tri}</div><div>
<p><b>Täisnurkne kolmnurk</b></p>
<p>$\sin\alpha = \dfrac{b}{c}$ (vastaskaatet / hüpotenuus)</p>
<p>$\cos\alpha = \dfrac{a}{c}$ (lähiskaatet / hüpotenuus)</p>
<p>$\tan\alpha = \dfrac{b}{a}$ (vastaskaatet / lähiskaatet)</p>
<p>Pythagoras: $c^2 = a^2 + b^2$</p></div></div>
<div class="mathfig"><div>${forceTri}</div><div>
<p><b>Näide: kuulike niidi otsas (ül 12, 13, 16, 17)</b></p>
<p>Joonista jõud $m\vec g$ (alla) ja $\vec F_e$ (horisontaalselt). Nende summa on niidi sihis. Tekib täisnurkne kolmnurk, kus niidi ja vertikaali vaheline nurk on $\frac{\alpha}{2}$.</p>
<p>Jooniselt: $\tan\dfrac{\alpha}{2} = \dfrac{F_e}{mg}$, $\ T^2 = (mg)^2 + F_e^2$, $\ \sin\dfrac{\alpha}{2} = \dfrac{F_e}{T} = \dfrac{r/2}{l}$</p></div></div>
<p><b>Vektori projektsioon:</b> $v_x = v\cos\varphi$, kus $\varphi$ on nurk vektori ja telje vahel (ül 10, 23). Kui summa on null, on null ka projektsioonide summa.</p>
<p><b>Võrdkülgne kolmnurk</b> küljega $a$: kõrgus $\frac{\sqrt 3}{2}a$, tsentri kaugus tipust $R = \frac{a}{\sqrt 3}$, $\cos 30^\circ = \frac{\sqrt 3}{2}$, $\sin 30^\circ = \frac{1}{2}$.</p>
<p><b>Logaritm:</b> $\int\dfrac{dV}{V} = \ln V$, $\ \ln a - \ln b = \ln\dfrac{a}{b}$, $\ \ln x = y \Leftrightarrow x = e^y$ (ül 554, 555).</p>
<p><b>Ruutvõrrand</b> $Ax^2 + Bx + C = 0$: $\ x = \dfrac{-B \pm\sqrt{B^2 - 4AC}}{2A}$ (ül 7, 8, 21, 223, 225, 226).</p>
<p><b>Ekstreemum:</b> funktsiooni suurim või vähim väärtus on seal, kus tuletis on null, $f'(x) = 0$ (ül 4, 220). Jagatise tuletis: $\left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2}$.</p>
<p><b>Kahe takisti rööpühendus</b> (tuleb valemist $\frac{1}{R} = \frac{1}{R_1} + \frac{1}{R_2}$): $R = \dfrac{R_1R_2}{R_1 + R_2}$.</p>
<p><b>Ühikud:</b> $1\ \text{L} = 10^{-3}\ \text{m}^3$, $1\ \text{cm}^3 = 10^{-6}\ \text{m}^3$, $1\ \text{g} = 10^{-3}\ \text{kg}$, n = $10^{-9}$, µ = $10^{-6}$, m = $10^{-3}$, k = $10^3$, M = $10^6$.</p>`;

window.FORMULAS[15] = R`<h4>KT2 kokkuvõte: mida peab peast teadma</h4>
<p>Konspekti järgi tuleb valemid kontrolltööks pähe õppida, valemilehte kasutada ei saa. Konstandid ($N_A$, $k$, $R$, $\varepsilon_0$, $e$, molaarmassid) antakse ülesande tekstis.</p>
<h4>Gaasid</h4>
<p>$pV = \frac{m}{\mu}RT$; $\ \frac{p_1V_1}{T_1} = \frac{p_2V_2}{T_2}$; $\ N = \frac{m}{\mu}N_A$; $\ n = \frac{p}{kT}$</p>
<p>$U = \frac{i}{2}\frac{m}{\mu}RT$, $i = 3 + i_{pöörd}$; $\ \Delta U = Q - A$; $\ A = \int p\,dV$</p>
<p>Isoterm: $A = \frac{m}{\mu}RT\ln\frac{V_2}{V_1}$; isobaar: $A = \frac{m}{\mu}R\Delta T$; isokoor: $A = 0$</p>
<h4>Elektrostaatika</h4>
<p>$F = \frac{|q_1q_2|}{4\pi\varepsilon_0\varepsilon r^2}$; $\ E = \frac{|q|}{4\pi\varepsilon_0\varepsilon r^2}$; $\ \varphi = \frac{q}{4\pi\varepsilon_0\varepsilon r}$; $\ W = \frac{q_1q_2}{4\pi\varepsilon_0\varepsilon r}$</p>
<p>$A_{vastu} = q(\varphi_2 - \varphi_1) = W_2 - W_1$; energia jäävus $W_1 + \frac{mv_1^2}{2} = W_2 + \frac{mv_2^2}{2}$</p>
<p>$C = \frac{q}{U}$, $C = \frac{\varepsilon_0\varepsilon S}{d}$, $E = \frac{U}{d}$; jada $\frac{1}{C} = \sum\frac{1}{C_i}$, rööp $C = \sum C_i$</p>
<h4>Vooluahelad</h4>
<p>$I = \frac{U}{R}$; $\ I = \frac{\varepsilon}{R + r}$; $\ N = UI = I^2R = \frac{U^2}{R}$; $\ \eta = \frac{R}{R + r}$</p>
<p>Jada: $R = \sum R_i$, $I$ sama; rööp: $\frac{1}{R} = \sum\frac{1}{R_i}$, $U$ sama</p>`;
})();
