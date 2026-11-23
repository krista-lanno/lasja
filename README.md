# Füüsika KT kordamine

Interaktiivne harjutusleht füüsika kontrolltöödeks (TalTech, Loodusteaduse alused).
Töötab GitHub Pagesis, serverit ega andmebaasi pole vaja.

## Sisu

Ülaribal saab valida kontrolltöö:

- **KT1 · Mehaanika** (Füüs. ül. kogu I): 75 tunnis ja kodus lahendatud ülesannet ning 48 sarnast (kokku 123), teemad 1 kuni 7.
- **KT2 · Gaasid ja elekter** (kogu I nädal 8 ja kogu II): 63 tunnis ja kodus lahendatud ülesannet, 32 sarnast ja kontrolltöö 4 varianti (12 ülesannet, detailse lahenduskäiguga), kokku 107, teemad 8 kuni 15:
  ideaalse gaasi olekuvõrrand, siseenergia ja I seadus, Coulombi seadus, väljatugevus ja potentsiaal, laengu liikumine ja mahtuvus, tarbijate ühendusviisid, suletud vooluahelad, KT2 variandid.

Igas ülesandes:

- sammud: valemi valik, avaldamine, vahetulemused, lõppvastus koos ühikuga, jõudude või väljavektorite joonestamine, järjestamine;
- igal sammul vihje, „Näita vastust“ ja selgitus; täielik lahenduskäik eraldi nupust;
- arvude kontroll umbes 3% täpsusega ja vihjed levinud vigade kohta (märk, suurusjärk, ühik, ümardamine);
- KT2-s 🎬 visuaalsed selgitused: liikuvad molekulid ja rõhk, p-V diagramm koos kolviga, vabadusastmed, Coulombi jõud, väljajooned lohistatava proovilaenguga, potentsiaali värvikaart, laetud kuulikesed niitide otsas (õhus ja õlis), kiirenev elektron kondensaatoris, dielektrik, lähenevad prootonid, voolu liikumine skeemides, kasuliku võimsuse kõver.

Filtrid teema, tüübi (tunnis / kodus / sarnane) ja oleku järgi, juhuslik järjekord. Edusammud salvestatakse brauseri `localStorage`-isse. Valemite sahtlis on konspekti valemid teemade kaupa ning eraldi matemaatika abivalemid (täisnurkne kolmnurk, logaritm, ruutvõrrand), mida loetakse jooniselt ja mis ei ole füüsika valemid.

## Failid

```
index.html
css/style.css
js/core.js         abifunktsioonid (valemid, arvude lugemine, ühikud, joonised), teemad ja KT-d
js/viz.js          animatsioonid ja visuaalsed selgitused (Viz), skeemide joonistamine (CK)
js/forces.js       jõudude ja vektorite joonestamise komponent
js/app.js          lehe loogika
js/formulas.js     KT1 valemid
js/formulas2.js    KT2 valemid, konstandid, tähised
js/data/b1...b7.js KT1 ülesanded
js/data/b8...b14.js KT2 ülesanded
js/data/b15.js     KT2 variandid
```

Valemid kuvatakse KaTeX-iga (laaditakse jsDelivr CDN-ist).

## Avaldamine GitHub Pagesis

1. GitHubis repo lehel: **Settings → Pages**.
2. **Source**: *Deploy from a branch*. **Branch**: `main`, kaust `/ (root)`. Vajuta **Save**.
3. Paari minuti pärast on leht aadressil `https://krista-lanno.github.io/lasja/`.

Kohapeal proovimiseks: ava `index.html` brauseris või käivita kaustas `python -m http.server` ja mine aadressile `http://localhost:8000`.
