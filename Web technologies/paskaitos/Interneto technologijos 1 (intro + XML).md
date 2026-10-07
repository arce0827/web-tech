- Internetas - tai pasaulinis tarpusavyje sujungtų kompiuterių tinklas, naudojanti standartinį interneto protokolo rinkinį tcp arba ip duomenims perduoti tarp milijardų įrenginių visame pasaulyje.

Tai tarsi infrastruktūra, kuri leidžia išmaniesiems įrenginiams keistis informacija nepriklausomai nuo jų būvimo vietos.

- Infrastruktūra - fiziniai kabeliai, fiberis, serveriai, palydovai.

- TCP/IP protokolas - taisyklių rinkinys, nusakantis kaip duomenys vaikšto kompiuterių tinkle. Šita kalba grindžiamas visas visuotinis internetas. Taisyklės pagal kurias duomenys skyla į mažus paketus, išsiunčiami per tinklą ir atgal surenkami gavėjo įrenginyje.

- IP adresai ir DNS - kiekvienas device turi unikalu IP, o domenams yra sistema, kuri paprasta google.com pavercia tinkamu ip, mums to ip zinot nereik, uztenka tiesiog zinot "google.com"

- duomenys - tai faktai, įvykiai, daiktai ar panašiai, kurie neorganizuoti ar neapdoruoti gali neturėti prasmės.
- informacija - tai tam tikros žinios, duomenys, kurie apdoroti tam tikrame kontekste įgauna prasmę.

- duomenų formatavimas - susitarimas kaip užrašyti duomenis, ar jų aprašus

Struktūrizuoti duomenys = užrašyti eilutėmis, stulepliais, kur nauja eilutė - naujas obj, o naujas stulpelis - charakteristika


Duomenų formatai:
- tekstinis (dažniausiai struktūrizuotas) CSV, XML...
- binary (nestruktūrizuotas), video, audio t.t.

Struktūrizavimo laipsniai:
- nestrukturizuoti - laisvos formos txt, video, audio
- dalinai struktūrizuoti - tekstas išskaidytas į skyrius, duomenys pateikiami lentelėmis, sąrašais, bet yra ir laisvos formos teksto
- griežtai struktūrizuoti - struktūra apibrėžiama iš anksto, duomenų pateikimo forma turi šią struktūrą griežtai atitikti

XML leidžia aprašyti tiek dalinai tiek griežtai struktūrizuotus duomenis.

Duomenų apsikeitimui tinkantis formatas:
- formalumas - negali būti tos pačios simbolių ir skirtukų eilutės dviejų skirtingų interpretacijų
- paprastas - neturi būti sunku sukurti/skaityti tokio formato dokus
- atviras, standartizuotas
- skaitomas ir mašinai ir žmogui - nenaudojant specialių programų
- plečiamas - turi būti galima pridėti papildomų duomenų be sistemos didesnio perprogramavimo

## XML

aktualios xml versijos 1.0(5redakcija)/1.1(2redakcija)

turi dvi duomenų aprašų rūšis:
- žymes
- atributai

žymės susideda iš 3 dalių
- atidarančios "<*test*>"
- žymės turinys eina tarp atidarančiosios ir uždarančiosios žymių dalių pvz. <>turinys<*/*>
- uždarančioji pvz "<*/test*>"

atributai
atributas yra nebutina zymes dalis, susidedanti is 3 daliu:
- atributo pavadinimo
- skirtuko
- duomenu

pvz 

```
<pijus popik="MLDC">
  <labai>jo</labai>
</pijus>
```

atributai privalo buti paskelbti kokios nors zymes viduje

zymes gali buti ir tuscios, neturet turinio, bet vistiek tures atributus

## xml rules

- zymes ir aatributu pavadinimai be tarpu
- atidarancios ir uzdarancios zymes pavadinimai turi sutapti
- visi zymes atributai turi unikalius toje zymeje pavadinimus
- egzistuoja tik viena saknine zyme

XML formato dokas yra grieztos medzio strukturos

xml doka pradedam su

```
<?xml version="1.0" encoding="UTF-8"?>
```

tarpus keiciami i _

zymiu ir atributu rinkinys turi buti baigtinis
zymes/atributai kaip kintamieji turi pasakyti ne reiksme o kokios reiksmes tiketis


XML - zmogui ir kompiuteriui suprantama hierarchine pleciama duomenu aprasymo meta-kalba

realiai pats kuri savo kalba, ne kaip html kur yra padarytos jau zymes, cia pats jas kuri

