/* 12. Laengu liikumine elektriväljas, mahtuvus (kogu II). Tunnis: 85, 88, 94, 101, 103, 105. Kodus: 86, 87, 100, 104. */
(function () {
const R = String.raw;

P({ id: '85', b: 12, k: 'T',
  text: R`Kui suure kiirusega peavad liikuma kaks prootonit, et nad võiksid teineteisele läheneda 100 pm kaugusele?`,
  given: R`<b>Andmed:</b> $m = 1.67\cdot 10^{-27}\ \text{kg}$, $q = 1.6\cdot 10^{-19}\ \text{C}$, $r_0 = \infty$, $r = 100\ \text{pm}$, lõppkiirus $v = 0$.<br><b>Leida:</b> $v_0$ (kummagi prootoni algkiirus).`,
  viz: Viz.html('approach', {}),
  steps: [
    mc(R`Mis on prootonite koguenergia alguses (lõpmata kaugel) ja lähimas punktis?`, [R`*Alguses $2\cdot\frac{mv_0^2}{2}$, lõpus $\frac{q^2}{4\pi\varepsilon_0r}$`, R`Alguses $\frac{mv_0^2}{2}$, lõpus $\frac{q^2}{4\pi\varepsilon_0r}$||Liiguvad mõlemad prootonid, kineetilist energiat on kahel.`, R`Alguses $2\cdot\frac{mv_0^2}{2}$, lõpus $\frac{q^2}{4\pi\varepsilon_0r^2}$||$\frac{q^2}{4\pi\varepsilon_0r^2}$ on jõud, potentsiaalne energia on $\frac{q^2}{4\pi\varepsilon_0r}$.`],
      R`Lõpmata kaugel on vastastikmõju energia null. Lähimas punktis on prootonid hetkeks paigal.`),
    num(R`Kummagi prootoni algkiirus:`, 3.71e4, 'm/s', { final: true, label: R`v_0`, hint: R`$mv_0^2 = \frac{q^2}{4\pi\varepsilon_0r}$`, alts: [{ a: 3.71e4 * Math.SQRT2, msg: 'Nii saaksid ühe liikuva prootoni jaoks. Mõlemad liiguvad, kummalgi on pool energiast.' }] })
  ],
  sol: R`Vaakumis dissipatiivseid jõude pole, mehaaniline energia säilib. Alguses on ainult kahe prootoni kineetiline energia, lähimas punktis ainult vastastikmõju potentsiaalne energia:
$$2\cdot\frac{mv_0^2}{2} = \frac{q^2}{4\pi\varepsilon_0r} \quad\Rightarrow\quad v_0 = \sqrt{\frac{q^2}{4\pi\varepsilon_0mr}} = \sqrt{\frac{(1.6\cdot 10^{-19})^2}{4\pi\cdot 8.85\cdot 10^{-12}\cdot 1.67\cdot 10^{-27}\cdot 10^{-10}}} \approx 37\ \text{km/s}$$`,
  ans: R`37 km/s`
});

P({ id: '86', b: 12, k: 'K',
  text: R`Kaks võrdse massiga 1,0 µg ja võrdse laenguga 1,0 pC kera paiknevad vaakumis teineteisest 10 mm kaugusel. Kui suure kiirusega liiguvad kerad siis, kui nad tõukejõudude mõjul on eemaldunud teineteisest lõpmata kaugele?`,
  given: R`<b>Andmed:</b> $m = 1.0\ \mu\text{g}$, $q = 1.0\ \text{pC}$, $r = 10\ \text{mm}$, algkiirus 0.<br><b>Leida:</b> $v$.`,
  viz: Viz.html('approach', { mode: 'repel' }),
  steps: [
    mc(R`Energia jäävus:`, [R`*$\frac{q^2}{4\pi\varepsilon_0r} = 2\cdot\frac{mv^2}{2}$`, R`$\frac{q^2}{4\pi\varepsilon_0r} = \frac{mv^2}{2}$||Liiguvad mõlemad kerad.`, R`$\frac{q^2}{4\pi\varepsilon_0r^2} = mv^2$||Vasakul peab olema energia, mitte jõud.`]),
    num(R`Kerade kiirus:`, 0.03, 'm/s', { final: true, label: R`v`, alts: [{ a: 0.0424, msg: 'Kineetilist energiat saavad mõlemad kerad.' }, { a: 30, msg: 'Mass: $1.0\\ \\mu\\text{g} = 10^{-9}\\ \\text{kg}$.' }] })
  ],
  sol: R`Alguses on ainult potentsiaalne energia, lõpmatuses ainult kahe kera kineetiline energia:
$$\frac{q^2}{4\pi\varepsilon_0r} = mv^2 \Rightarrow v = q\sqrt{\frac{1}{4\pi\varepsilon_0mr}} = 10^{-12}\sqrt{\frac{9\cdot 10^9}{10^{-9}\cdot 10^{-2}}} \approx 3.0\ \text{cm/s}$$`,
  ans: R`3,0 cm/s`
});

P({ id: '87', b: 12, k: 'K',
  text: R`Lõpmatu laetud tasandi läheduses asub punktlaeng 60 nC. Välja mõjul nihkus laeng 2,0 cm kaugemale. Seejuures tehti 5,0 µJ tööd. Leida laengu pindtihedus tasandil.`,
  fig: `<svg viewBox="0 0 320 150" class="gsvg"><rect x="40" y="15" width="10" height="120" style="fill:color-mix(in srgb,var(--pos) 35%,transparent)"/>` +
    [0, 1, 2, 3, 4].map(k => `<line x1="52" y1="${28 + k * 24}" x2="300" y2="${28 + k * 24}" class="thin"/><path d="M180 ${24 + k * 24} L190 ${28 + k * 24} L180 ${32 + k * 24}" class="thin"/>`).join('') +
    `<circle cx="130" cy="76" r="10" class="pos"/><text x="130" y="81" text-anchor="middle" class="q">+</text><circle cx="210" cy="76" r="10" style="fill:none;stroke:var(--muted);stroke-dasharray:3 3"/><path d="M144 98 L198 98" /><path d="M192 94 L200 98 L192 102" /><text x="171" y="118" text-anchor="middle">Δx = 2 cm</text><text x="30" y="148">σ</text></svg>`,
  given: R`<b>Andmed:</b> $q = 60\ \text{nC}$, $\Delta x = 2.0\ \text{cm}$, $A = 5.0\ \mu\text{J}$.<br><b>Leida:</b> $\sigma$.`,
  steps: [
    mc(R`Lõpmatu laetud tasandi väli:`, [R`*$E = \frac{\sigma}{2\varepsilon_0}$, homogeenne (ei sõltu kaugusest)`, R`$E = \frac{\sigma}{\varepsilon_0}$||See on kondensaatori plaatide vahel (kaks tasandit).`, R`$E = \frac{\sigma}{4\pi\varepsilon_0r^2}$||See kehtib punktlaengu kohta.`]),
    mc(R`Kuidas avaldub töö homogeenses väljas?`, [R`*$A = qE\Delta x$`, R`$A = \frac{qE}{\Delta x}$||Töö on jõud korda teepikkus.`]),
    num(R`Laengu pindtihedus:`, 7.38e-8, 'C/m²', { final: true, label: R`\sigma`, hint: R`$\sigma = \frac{2\varepsilon_0A}{q\Delta x}$` })
  ],
  sol: R`Tasandi väli $E = \frac{\sigma}{2\varepsilon_0}$ on homogeenne, jõud $F = qE$ on konstantne ja töö $A = qE\Delta x$:
$$\sigma = \frac{2\varepsilon_0A}{q\Delta x} = \frac{2\cdot 8.85\cdot 10^{-12}\cdot 5\cdot 10^{-6}}{6\cdot 10^{-8}\cdot 0.02} \approx 74\ \text{nC/m}^2$$`,
  ans: R`74 nC/m²`
});

P({ id: '88', b: 12, k: 'T',
  text: R`Dioodi anoodi ja katoodi vaheline kaugus on 5,0 mm ning pinge 100 V. Leida elektroni kiirendus ja kiirus anoodile jõudmisel ning katoodilt anoodile liikumise aeg, kui katoodist väljunud elektroni kiirus on null ja elektriväli on homogeenne.`,
  given: R`<b>Andmed:</b> $s = 5.0\ \text{mm}$, $U = 100\ \text{V}$, $e = 1.6\cdot 10^{-19}\ \text{C}$, $m = 9.1\cdot 10^{-31}\ \text{kg}$, $v_0 = 0$, $E = \text{const}$.<br><b>Leida:</b> $v$, $a$, $t$.`,
  viz: Viz.html('plates', { mode: 'electron' }),
  steps: [
    num(R`Elektroni kiirus anoodil (energia jäävus $eU = \frac{mv^2}{2}$):`, 5.93e6, 'm/s', { final: true, label: R`v` }),
    mc(R`Milline on elektroni liikumine katoodi ja anoodi vahel?`, [R`*Ühtlaselt kiirenev, sest $F = eE$ on konstantne`, R`Ühtlane||Elektronile mõjub jõud, ta kiireneb.`, R`Kiirenev, aga kiirendus kasvab||Homogeenses väljas on jõud igal pool sama.`]),
    num(R`Kiirendus ($v^2 = 2as$):`, 3.52e15, 'm/s²', { final: true, label: R`a`, alts: [{ a: 3.52e12, msg: 'Kaugus meetrites: $5.0\\ \\text{mm} = 5.0\\cdot 10^{-3}\\ \\text{m}$.' }] }),
    num(R`Liikumise aeg:`, 1.69e-9, 's', { final: true, label: R`t`, hint: R`$t = \frac{v}{a}$` })
  ],
  sol: R`Energia jäävus ($U = \varphi - \varphi_0$):
$$eU = \frac{mv^2}{2} \Rightarrow v = \sqrt{\frac{2eU}{m}} = \sqrt{\frac{2\cdot 1.6\cdot 10^{-19}\cdot 100}{9.1\cdot 10^{-31}}} \approx 5.9\cdot 10^6\ \text{m/s}$$
Homogeenses väljas on jõud konstantne, liikumine on ühtlaselt kiirenev: $s = \frac{at^2}{2}$, $v = at$. Aja elimineerimisel:
$$a = \frac{v^2}{2s} = \frac{(5.9\cdot 10^6)^2}{2\cdot 5\cdot 10^{-3}} \approx 3.5\cdot 10^{15}\ \text{m/s}^2, \qquad t = \frac{v}{a} \approx 1.7\ \text{ns}$$`,
  ans: R`$v = 5.9\ \text{Mm/s}$, $a = 3.5\cdot 10^{15}\ \text{m/s}^2$, $t = 1.7\ \text{ns}$`
});

P({ id: '94', b: 12, k: 'T',
  text: R`Joonisel 1 on kujutatud kaks järjestikku ühendatud kondensaatorit. Süsteemi jäik keskmine osa pikkusega $a$ võib nihkuda mööda horisontaali. Tõestada, et süsteemi mahtuvus $C$ ei sõltu keskmise osa asendist ja väljendub valemiga $C = \frac{\varepsilon_0S}{b - a}$.`,
  fig: `<svg viewBox="0 0 340 150" class="gsvg"><rect x="40" y="25" width="10" height="90" class="pt" style="opacity:.75"/><rect x="290" y="25" width="10" height="90" class="pt" style="opacity:.75"/>` +
    `<rect x="120" y="25" width="10" height="90" class="pt" style="opacity:.55"/><rect x="200" y="25" width="10" height="90" class="pt" style="opacity:.55"/><line x1="130" y1="70" x2="200" y2="70" style="stroke-width:4"/>` +
    `<line x1="10" y1="70" x2="40" y2="70"/><line x1="300" y1="70" x2="330" y2="70"/>` +
    `<line x1="50" y1="132" x2="290" y2="132" class="thin"/><text x="170" y="146" text-anchor="middle">b</text><line x1="120" y1="12" x2="210" y2="12" class="thin"/><text x="165" y="10" text-anchor="middle">a</text>` +
    `<text x="85" y="62" text-anchor="middle">d₁</text><text x="250" y="62" text-anchor="middle">d₂</text><text x="20" y="144">Joon. 1</text></svg>`,
  given: R`<b>Andmed:</b> plaatide pindala $S$, välimiste plaatide vahe $b$, keskmise osa pikkus $a$, õhk.<br><b>Tõestada:</b> $C = \frac{\varepsilon_0S}{b - a}$.`,
  steps: [
    mc(R`Olgu vahemikud $d_1$ ja $d_2$. Kuidas leida jadaühenduse mahtuvus?`, [R`*$\frac{1}{C} = \frac{1}{C_1} + \frac{1}{C_2}$, kus $C_i = \frac{\varepsilon_0S}{d_i}$`, R`$C = C_1 + C_2$||See on rööpühenduse valem.`, R`$C = \frac{\varepsilon_0S}{d_1d_2}$||Mõõtühik ei klapi.`]),
    mc(R`Lihtsusta: $\frac{1}{C} = \frac{d_1}{\varepsilon_0S} + \frac{d_2}{\varepsilon_0S}$. Mis on $d_1 + d_2$?`, [R`*$d_1 + d_2 = b - a$, sõltumata keskmise osa asendist`, R`$d_1 + d_2 = b$||Keskmine osa võtab osa vahest enda alla.`, R`$d_1 + d_2 = a$||$a$ on keskmise osa pikkus.`]),
    ord(R`Järjesta tõestuse sammud:`, [R`$C_1 = \frac{\varepsilon_0S}{d_1}$, $C_2 = \frac{\varepsilon_0S}{d_2}$`, R`$\frac{1}{C} = \frac{1}{C_1} + \frac{1}{C_2} = \frac{d_1 + d_2}{\varepsilon_0S}$`, R`Jooniselt $d_1 + d_2 = b - a$`, R`$C = \frac{\varepsilon_0S}{b - a}$, ei sõltu asendist`])
  ],
  sol: R`Vasaku ja parema kondensaatori mahtuvused: $C_1 = \frac{\varepsilon_0S}{d_1}$, $C_2 = \frac{\varepsilon_0S}{d_2}$. Jadaühendus:
$$C = \frac{C_1C_2}{C_1 + C_2} = \frac{\varepsilon_0S}{d_1 + d_2}$$
Jooniselt $d_1 + d_2 = b - a$, seega $C = \frac{\varepsilon_0S}{b - a}$, mis ei sõltu keskmise osa asendist.`,
  ans: R`$C = \frac{\varepsilon_0S}{b - a}$`
});

P({ id: '100', b: 12, k: 'K',
  text: R`Kondensaatorite patarei koosneb kahest ühesugusest paralleelselt ühendatud kondensaatorist, kummagi mahtuvus on 4,0 µF. Kui ühest kondensaatorist plaatidevaheline dielektrik kõrvaldada, siis on patarei mahtuvus 6,0 µF. Leida dielektriku elektriline läbitavus.`,
  fig: CK.svg(260, 120, CK.wire([[20, 60], [70, 60]]) + CK.wire([[70, 25], [70, 95]]) + CK.wire([[70, 25], [118, 25]]) + CK.wire([[142, 25], [190, 25]]) + CK.wire([[70, 95], [118, 95]]) + CK.wire([[142, 95], [190, 95]]) + CK.wire([[190, 25], [190, 95]]) + CK.wire([[190, 60], [240, 60]]) +
    CK.C(130, 25, false, 'C') + CK.C(130, 95, false, 'C → C/ε', 0, 30) + CK.dot(70, 60) + CK.dot(190, 60)),
  given: R`<b>Andmed:</b> $C = 4.0\ \mu\text{F}$ (kumbki), rööpühendus, pärast dielektriku eemaldamist $C' = 6.0\ \mu\text{F}$.<br><b>Leida:</b> $\varepsilon$.`,
  steps: [
    mc(R`Kuidas muutub ühe kondensaatori mahtuvus, kui dielektrik eemaldada?`, [R`*Väheneb $\varepsilon$ korda: $C \to \frac{C}{\varepsilon}$`, R`Suureneb $\varepsilon$ korda||$C = \frac{\varepsilon_0\varepsilon S}{d}$, ilma dielektrikuta $\varepsilon = 1$.`, R`Ei muutu||Mahtuvus sõltub dielektrikust.`]),
    num(R`Dielektrikuta kondensaatori mahtuvus ($C' = C + \frac{C}{\varepsilon}$):`, 2e-6, 'F', { label: R`\frac{C}{\varepsilon}` }),
    num(R`Dielektriku elektriline läbitavus:`, 2, '', { final: true, label: R`\varepsilon` })
  ],
  sol: R`Rööpühenduses mahtuvused liituvad. Alguses $2C = 8\ \mu\text{F}$, pärast $C' = C + \frac{C}{\varepsilon}$:
$$\frac{C}{\varepsilon} = C' - C = 2\ \mu\text{F} \Rightarrow \varepsilon = \frac{4}{2} = 2$$`,
  ans: R`2,0`
});

P({ id: '101', b: 12, k: 'T',
  text: R`Eboniidi elektriline läbitavus on 2,8 ja läbilöögitugevus $1.8\cdot 10^7$ V/m. Kui kasutada teda dielektrikuna plaatkondensaatoris, milline peaks siis olema minimaalne plaatide pindala, et mahtuvus oleks $7.0\cdot 10^{-2}$ µF ja kondensaator peaks läbilöögita vastu pingele 4000 V?`,
  given: R`<b>Andmed:</b> $\varepsilon = 2.8$, $E = 1.8\cdot 10^7\ \text{V/m}$, $C = 0.070\ \mu\text{F}$, $U = 4000\ \text{V}$.<br><b>Leida:</b> $S$.`,
  steps: [
    num(R`Minimaalne plaatidevaheline kaugus ($U = Ed$):`, 2.22e-4, 'm', { label: R`d` }),
    mc(R`Plaatkondensaatori mahtuvus:`, [R`*$C = \frac{\varepsilon_0\varepsilon S}{d}$`, R`$C = \frac{\varepsilon_0S}{\varepsilon d}$||Dielektrik suurendab mahtuvust.`, R`$C = \varepsilon_0\varepsilon Sd$||Mahtuvus on pöördvõrdeline plaatide kaugusega.`]),
    num(R`Plaatide pindala:`, 0.627, 'm²', { final: true, label: R`S` })
  ],
  sol: R`Läbilöögita peab $E = \frac{U}{d}$ jääma alla läbilöögitugevuse, seega $d = \frac{U}{E}$. Mahtuvusest $C = \frac{\varepsilon_0\varepsilon S}{d}$:
$$S = \frac{Cd}{\varepsilon_0\varepsilon} = \frac{CU}{\varepsilon_0\varepsilon E} = \frac{7\cdot 10^{-8}\cdot 4000}{8.85\cdot 10^{-12}\cdot 2.8\cdot 1.8\cdot 10^7} \approx 0.63\ \text{m}^2$$`,
  ans: R`0,63 m²`
});

P({ id: '103', b: 12, k: 'T',
  text: R`Leida laengu pindtihedus tasaparalleelse kondensaatori plaatidel, kui plaatidevaheline kaugus on 1,0 mm, plaatidevaheline pinge 100 V ja dielektrikuks on vilgukivi.`,
  given: R`<b>Andmed:</b> $d = 1.0\ \text{mm}$, $U = 100\ \text{V}$, vilgukivi $\varepsilon = 6$.<br><b>Leida:</b> $\sigma$.`,
  steps: [
    mc(R`Kuidas avaldada $\sigma = \frac{q}{S}$ antud suuruste kaudu?`, [R`*$q = CU$ ja $C = \frac{\varepsilon_0\varepsilon S}{d}$, seega $\sigma = \frac{\varepsilon_0\varepsilon U}{d}$`, R`$\sigma = \frac{\varepsilon_0U}{\varepsilon d}$||Dielektrikuga on plaatidel suurema laengu jaoks ruumi, $\varepsilon$ on lugejas.`, R`$\sigma = \varepsilon_0\varepsilon Ud$||Kontrolli ühikut: $\varepsilon_0U/d$ on C/m².`]),
    num(R`Laengu pindtihedus:`, 5.31e-6, 'C/m²', { final: true, label: R`\sigma`, alts: [{ a: 8.85e-7, msg: 'Unustasid vilgukivi dielektrilise läbitavuse ($\\varepsilon = 6$).' }] })
  ],
  sol: R`$$\sigma = \frac{q}{S} = \frac{CU}{S} = \frac{\varepsilon_0\varepsilon U}{d} = \frac{8.85\cdot 10^{-12}\cdot 6\cdot 100}{10^{-3}} \approx 5.3\ \mu\text{C/m}^2$$`,
  ans: R`5,3 µC/m²`
});

P({ id: '104', b: 12, k: 'K',
  text: R`Milline on elektrivälja tugevus plaatkondensaatori õhkvahemikus, kui pinge katete vahel on 200 V? Katetevaheline kaugus on 0,20 cm ning sinna on paigutatud plaatidega paralleelne klaasplaat paksusega 0,10 cm.`,
  given: R`<b>Andmed:</b> $U = 200\ \text{V}$, $d = 0.20\ \text{cm}$, klaas $d_2 = 0.10\ \text{cm}$, $\varepsilon = 7$, õhk $d_1 = 0.10\ \text{cm}$.<br><b>Leida:</b> $E_1$ (õhus).`,
  viz: Viz.html('plates', { mode: 'dielectric' }),
  steps: [
    mc(R`Kondensaatorit võib vaadelda kahe kondensaatori (õhk ja klaas) jadaühendusena. Mis on neil ühine?`, [R`*Laeng $q$ (ja seega $D = \varepsilon_0\varepsilon E$)`, R`Pinge||Jadaühenduses jaguneb pinge, laeng on sama.`, R`Väljatugevus||Klaasis on väli $\varepsilon$ korda nõrgem.`]),
    mc(R`Pinge on osapingete summa. Mis on $E_1$?`, [R`*$E_1 = \frac{U}{d_1 + d_2/\varepsilon}$`, R`$E_1 = \frac{U}{d}$||See oleks ilma klaasita.`, R`$E_1 = \frac{U}{d_1}$||Ka klaasil on osa pingest.`], R`$U = E_1d_1 + E_2d_2$ ja $E_2 = E_1/\varepsilon$.`),
    num(R`Väljatugevus õhkvahemikus:`, 1.75e5, 'V/m', { final: true, label: R`E_1`, tol: 0.04, alts: [{ a: 1e5, msg: 'Nii oleks ilma klaasplaadita. Klaasis on väli nõrgem, seega õhus tugevam.' }] })
  ],
  sol: R`Jadaühendus: $U = U_1 + U_2 = \frac{q}{C_1} + \frac{q}{C_2}$, kus $C_1 = \frac{\varepsilon_0S}{d_1}$, $C_2 = \frac{\varepsilon_0\varepsilon S}{d_2}$. Siit $q = \frac{\varepsilon_0SU}{d_1 + d_2/\varepsilon}$ ja
$$E_1 = \frac{U_1}{d_1} = \frac{q}{\varepsilon_0S} = \frac{U}{d_1 + d_2/\varepsilon} = \frac{200}{0.001 + 0.001/7} \approx 1.8\cdot 10^5\ \text{V/m}$$`,
  ans: R`$1.8\cdot 10^5\ \text{V/m}$`
});

P({ id: '105', b: 12, k: 'T',
  text: R`Plaatkondensaatori katetevaheline kaugus on $d$ ning ta on täidetud kahe erineva dielektriku kihiga. Ühe dielektriku elektriline läbitavus on $\varepsilon_1$ ning selle paksus $d_1$. Teise dielektriku elektriline läbitavus on $\varepsilon_2$. Kummagi katte pindala on $S$. Määrata kondensaatori mahtuvus.`,
  fig: `<svg viewBox="0 0 300 140" class="gsvg"><rect x="60" y="20" width="8" height="100" class="pt" style="opacity:.75"/><rect x="232" y="20" width="8" height="100" class="pt" style="opacity:.75"/>` +
    `<rect x="68" y="20" width="70" height="100" style="fill:color-mix(in srgb,var(--accent) 18%,transparent);stroke:none"/><rect x="138" y="20" width="94" height="100" style="fill:color-mix(in srgb,var(--good) 18%,transparent);stroke:none"/>` +
    `<text x="103" y="75" text-anchor="middle">ε₁</text><text x="185" y="75" text-anchor="middle">ε₂</text><line x1="68" y1="130" x2="138" y2="130" class="thin"/><text x="103" y="128" text-anchor="middle" font-size="12">d₁</text><line x1="68" y1="10" x2="232" y2="10" class="thin"/><text x="150" y="9" text-anchor="middle" font-size="12">d</text></svg>`,
  given: R`<b>Andmed:</b> $d$, $\varepsilon_1$, $d_1$, $\varepsilon_2$, $d_2 = d - d_1$, $S$.<br><b>Leida:</b> $C$.`,
  steps: [
    mc(R`Kihid on üksteise järel plaatide vahel. Millise ühendusena saab seda vaadelda?`, [R`*Kahe kondensaatori jadaühendusena`, R`Rööpühendusena||Rööpühendus oleks siis, kui kihid oleksid kõrvuti (kumbki plaadist plaadini).`]),
    mc(R`Tulemus:`, [R`*$C = \frac{\varepsilon_0\varepsilon_1\varepsilon_2S}{\varepsilon_2d_1 + \varepsilon_1(d - d_1)}$`, R`$C = \frac{\varepsilon_0S(\varepsilon_1 + \varepsilon_2)}{d}$||See oleks rööpühenduse moodi.`, R`$C = \frac{\varepsilon_0\varepsilon_1\varepsilon_2S}{\varepsilon_1d_1 + \varepsilon_2(d - d_1)}$||Vaata, kumb $\varepsilon$ käib kumma paksuse juurde: $\frac{1}{C} = \frac{d_1}{\varepsilon_0\varepsilon_1S} + \frac{d_2}{\varepsilon_0\varepsilon_2S}$.`], R`Raamatu kujul: $C = \frac{\varepsilon_0\varepsilon_1\varepsilon_2S}{\varepsilon_1d + (\varepsilon_2 - \varepsilon_1)d_1}$, see on sama.`)
  ],
  sol: R`Juhe kahe kondensaatori vahel võib olla nulli pikkune, seega kihilist kondensaatorit võib vaadelda kahe kondensaatori jadaühendusena:
$$C_1 = \frac{\varepsilon_0\varepsilon_1S}{d_1}, \quad C_2 = \frac{\varepsilon_0\varepsilon_2S}{d - d_1}, \quad C = \frac{C_1C_2}{C_1 + C_2} = \frac{\varepsilon_0\varepsilon_1\varepsilon_2S}{\varepsilon_2d_1 + \varepsilon_1(d - d_1)}$$
Kui dielektrikud oleksid kõrvuti (kumbki plaadist plaadini), oleks see rööpühendus.`,
  ans: R`$C = \frac{\varepsilon_0\varepsilon_1\varepsilon_2S}{\varepsilon_1d + (\varepsilon_2 - \varepsilon_1)d_1}$`
});

/* ---------- Sarnased ---------- */

P({ id: '97', b: 12, k: 'S',
  text: R`Kondensaatorite patarei mahtuvusega 1,1 nF koosneb kahest järjestikku ühendatud kondensaatorist. Patareile anti laeng $1.3\cdot 10^{-7}$ C. Arvutada teise kondensaatori mahtuvus ja pinged kondensaatoritel, kui esimese kondensaatori mahtuvus on 1,3 nF.`,
  fig: CK.svg(260, 70, CK.wire([[20, 35], [98, 35]]) + CK.wire([[112, 35], [168, 35]]) + CK.wire([[182, 35], [240, 35]]) + CK.C(105, 35, false, 'C₁') + CK.C(175, 35, false, 'C₂') + CK.term(20, 35) + CK.term(240, 35)),
  given: R`<b>Andmed:</b> $C = 1.1\ \text{nF}$, $C_1 = 1.3\ \text{nF}$, $q = 1.3\cdot 10^{-7}\ \text{C}$, jadaühendus.<br><b>Leida:</b> $C_2$, $U_1$, $U_2$.`,
  note: R`See ülesanne on konspektis tunnis lahendatute hulgas, nädala nimekirjas teda pole.`,
  steps: [
    num(R`Teise kondensaatori mahtuvus:`, 7.15e-9, 'F', { final: true, label: R`C_2`, hint: R`$\frac{1}{C} = \frac{1}{C_1} + \frac{1}{C_2}$` }),
    mc(R`Millised laengud on jadaühenduses kondensaatoritel?`, [R`*Mõlemal sama laeng $q$`, R`Laeng jaguneb mahtuvuste suhtes||Nii on rööpühenduses.`]),
    num(R`Pinge esimesel kondensaatoril:`, 100, 'V', { final: true, label: R`U_1` }),
    num(R`Pinge teisel kondensaatoril:`, 18.2, 'V', { final: true, label: R`U_2` })
  ],
  sol: R`$C_2 = \frac{CC_1}{C_1 - C} = \frac{1.1\cdot 1.3}{0.2} \approx 7.2\ \text{nF}$. Jadaühenduses on laengud võrdsed:
$$U_1 = \frac{q}{C_1} = \frac{1.3\cdot 10^{-7}}{1.3\cdot 10^{-9}} = 100\ \text{V}, \qquad U_2 = \frac{q}{C_2} \approx 18\ \text{V}$$`,
  ans: R`7,2 nF; 100 V; 18 V`
});

P({ id: '92', b: 12, k: 'S',
  text: R`Õhkvahemikuga plaatkondensaatori plaadi pindala on 50 cm², laeng plaatidel $3.0\cdot 10^{-8}$ C ja pinge plaatide vahel 300 V. Leida plaatidevaheline kaugus.`,
  given: R`<b>Andmed:</b> $S = 50\ \text{cm}^2$, $q = 3.0\cdot 10^{-8}\ \text{C}$, $U = 300\ \text{V}$.<br><b>Leida:</b> $d$.`,
  steps: [
    num(R`Kondensaatori mahtuvus:`, 1e-10, 'F', { label: R`C` }),
    num(R`Plaatidevaheline kaugus:`, 4.43e-4, 'm', { final: true, label: R`d`, alts: [{ a: 4.43, msg: 'Pindala ruutmeetrites: $50\\ \\text{cm}^2 = 5\\cdot 10^{-3}\\ \\text{m}^2$.' }] })
  ],
  sol: R`$C = \frac{q}{U} = 10^{-10}\ \text{F}$ ja $C = \frac{\varepsilon_0S}{d}$:
$$d = \frac{\varepsilon_0S}{C} = \frac{\varepsilon_0SU}{q} = \frac{8.85\cdot 10^{-12}\cdot 5\cdot 10^{-3}\cdot 300}{3\cdot 10^{-8}} \approx 4.4\cdot 10^{-4}\ \text{m}$$`,
  ans: R`0,44 mm`
});

P({ id: '99', b: 12, k: 'S',
  text: R`Kondensaator 5 µF laetakse täielikult vooluallikast pingega 12 V. Seejärel vooluallikas eemaldatakse ja kondensaatoriga ühendatakse paralleelselt teine tundmatu mahtuvusega kondensaator. Pinge kondensaatoritel on nüüd 3 V. Määrata tundmatu kondensaatori mahtuvus, kui ta oli algul laenguta.`,
  given: R`<b>Andmed:</b> $C_1 = 5\ \mu\text{F}$, $U_0 = 12\ \text{V}$, $U = 3\ \text{V}$.<br><b>Leida:</b> $C_2$.`,
  steps: [
    mc(R`Mis jääb pärast ühendamist samaks?`, [R`*Laeng: $C_1U_0 = (C_1 + C_2)U$`, R`Pinge||Pinge langes 12 V-lt 3 V-le.`, R`Energia||Ühendamisel läheb osa energiat soojuseks.`]),
    num(R`Tundmatu mahtuvus:`, 15e-6, 'F', { final: true, label: R`C_2` })
  ],
  sol: R`Laeng ei kao: $q = C_1U_0 = 60\ \mu\text{C}$. Rööpühenduses on pinge sama: $q = (C_1 + C_2)U$, seega $C_1 + C_2 = 20\ \mu\text{F}$ ja $C_2 = 15\ \mu\text{F}$.`,
  ans: R`15 µF`
});

P({ id: '102', b: 12, k: 'S',
  text: R`Vooluallikas klemmipingega 12 V on ühendatud kahe suure paralleelse metallplaadiga, mille vahekaugus on 0,20 cm. a) Leida laengute pindtihedus σ plaatidel. b) Plaadid lahutatakse vooluallikast ja eemaldatakse teineteisest 1 cm kaugusele. Leida pinge plaatide vahel.`,
  given: R`<b>Andmed:</b> $U = 12\ \text{V}$, $d = 0.20\ \text{cm}$, $d' = 1.0\ \text{cm}$.<br><b>Leida:</b> $\sigma$, $U'$.`,
  steps: [
    num(R`Laengu pindtihedus:`, 5.31e-8, 'C/m²', { final: true, label: R`\sigma`, hint: R`$\sigma = \varepsilon_0E = \frac{\varepsilon_0U}{d}$` }),
    mc(R`Plaadid lahutatakse vooluallikast. Mis jääb samaks?`, [R`*Laeng ja seega ka väljatugevus $E = \sigma/\varepsilon_0$`, R`Pinge||Vooluallikas ei hoia enam pinget.`, R`Mahtuvus||Mahtuvus väheneb, kui plaadid kaugenevad.`]),
    num(R`Pinge pärast plaatide eemaldamist:`, 60, 'V', { final: true, label: R`U'`, alts: [{ a: 2.4, msg: 'Laeng ja väli jäävad samaks, $U = Ed$ kasvab koos kaugusega.' }] })
  ],
  sol: R`$\sigma = \varepsilon_0E = \frac{\varepsilon_0U}{d} = \frac{8.85\cdot 10^{-12}\cdot 12}{0.002} \approx 5.3\cdot 10^{-8}\ \text{C/m}^2$.
Lahutatud plaatidel laeng ei muutu, väli $E = \frac{\sigma}{\varepsilon_0}$ samuti, seega $U' = Ed' = U\frac{d'}{d} = 12\cdot 5 = 60\ \text{V}$.`,
  ans: R`$5.3\cdot 10^{-8}\ \text{C/m}^2$; 60 V`
});
})();
