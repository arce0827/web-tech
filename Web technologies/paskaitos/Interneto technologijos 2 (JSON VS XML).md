XML turi vardų galiojimo sriti, nuorodos i XSD schemas
```
<o:order xmlns:o="http://www.example.com/order">
	<o:id>2343</o:id>
	<o:currency>JPY</o:currency>
	</o:order>
```

basically atsiranda kaip prefixas kuris dar ir nurodo i xsd schema

padeda unikaliai identifikuoti elementus ir atributus dokumento viduje

### Vardų srities deklaracija
- vardu sritis turi varda, kuris dažniausiai yra url (linkas)
- gali turėti vieną ar daugiau prefixu
- skelbiamas žymėje bet gali joje dar negalioti
- vardu sritis kaip ir zyme turi savo galiojimo sriti

pvz. vardas - "kazkoks url" prefiksas - k

- kvalifikuotas vardas tai kombinuotas vardas is zymes ar atributo vardo ir vardu srities, basically su prefixu
- nekvalifikuotas kuris neturi prefixo

prefixas nera vardas jis tiesiog sutrumpintai zymi linka(url), kuris ir yra vardas


nekvalifikuoti vardai (be prefixo) nera susieti su jokia XSD schema

### Vardų galiojimo sritis

- validumas - be schemos negalesime validuoti XML'o
- aiskumas - nurodo, kurioje schemoje aprasyti elementai. taip pat gali paaiskinti pavadinima jei reikia konteksto
- zymiu/atributu vardu konfliktai - tas pats pavadinimas gali reikst skirtingus duomenis (<o:id> ir <b:id> skirtingi dalykai)
- modulumas ir pleciamumas - galima iterpti (iskiepyti) nauju elementu nekeiciant schemos
- perpanaudojimas - galima tas apcias zymes perpanaudoti skirtingose kalbose

# JSON

tai basically dar paprastesnis ir zmogui iskaitomesnis XML'as

naudojamas strukturizuotiems duomenims atvaizduoti ir keistis tarp serverio ir (ar) web aplikacijos. Naudojamas configams aprasyti ar duomenims saugoti

### JSON charakteristikos
- json struktura sudaryta is rakto ir reiksmes poru, reiksmes gali tureti skirtingus tipus
- yra lengvai skaitomas zmogui ir kompui
- nepriklausomas formatas nuo jokios progr kalbos
- lengvas - json skirtukas yra skliaustai, dvitaskiai, kableliai, kabutes. nera spec zodziu

### JSON struktura
- privalo prasideti nuo vieno objekto arba masyvo
- visi aprasai tampa raktais, kurie visada uzrasomi eilute ir skiriami kabutemis
- reiksmes skiriamos nuo rakto dvitaskiu
- json struktura panasi i js objekta ir kaip XML taip pat gali buti piesiama medziu

### JSON sintakse
![[Pasted image 20260915183752.png]]
Čia objektas asmenys, kuriame yra objektų masyvas `asmuo` (sudarytas iš asmenų su raktais vardas ir pavardė), bei raktas papildoma_informacija.

### JSON vs XML panasumai
- turi struktura
- tekstu isreiksti duomenys
- nepriklauso nuo platformos
- lengvai konvertuojami duomenys
- palaiko masyvus ir sarasus
- abu tinka komunikacijai tarp sistemu
- abiems galima nurodyti schemas

### JSON vs XML skirtumai
- kilmes istorija
- formatas
- sintakse
- nuskaitymas/parsinimas (json greitesnis)
- XML schema grieztesne, nei JSON (json lankstesne)
- json turi ribota duomenu tipu skaiciu, xml galima aprasyti daugiau
- XML jautresnis neautorizuotiems keitimams, JSON parsinimas saugesnis

### JSON vs XML panaudojimas
sudetingesnems strukturoms ir norint naudot daugiau duomenu tipu geriau XML

paprastesnes strukturos - json (api, mobile apps)

### JSON panaudojimas
- komunikacija, api - duomenu siuntimas/gavimas
- konfiginimo failai, logai
- duomenu bazes (NE RELIACINES DB)
- serializavimui