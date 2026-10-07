## 1. Unikalus kelias ir ašys

**žymė: Matematikos ir informatikos fakulteto xs:fakultetas**
Ji turi protėvį universitetas ir anūką xs:dalykas (per xs:programa).

**Unikalus kelias iki žymės:**
/universitetas/xs:fakultetas[xs:fakulteto_pavadinimas='Matematikos ir informatikos fakultetas']

![XPath screenshot](Screenshot%202026-09-29%20130832.png)

Toliau kiekviena išraiška prideda nurodytą ašies žingsnį prie šio kelio:


```xpath
/universitetas/xs:fakultetas[xs:fakulteto_pavadinimas='Matematikos ir informatikos fakultetas']/ancestor::universitetas
```

	Rezultatas: šakninė universitetas žymė.
![Xpath screenshot](Screenshot%202026-09-29%20131711.png)

```xpath
/universitetas/xs:fakultetas[xs:fakulteto_pavadinimas='Matematikos ir informatikos fakultetas']/descendant::xs:dalykas
```

	Rezultatas: viena xs:dalykas žymė, kurios kodas PS-101.
![Xpath screenshot](Screenshot%202026-09-29%20131933.png)

```xpath
/universitetas/xs:fakultetas[xs:fakulteto_pavadinimas='Matematikos ir informatikos fakultetas']/following-sibling::xs:fakultetas
```

	Rezultatas: po Matematikos ir informatikos fakulteto einantis Medicinos fakultetas.
![Xpath screenshot](Screenshot%202026-09-29%20132125.png)

```xpath
/universitetas/xs:fakultetas[xs:fakulteto_pavadinimas='Matematikos ir informatikos fakultetas']/preceding-sibling::xs:fakultetas
```

	Rezultatas: penki prieš jį einantys fakultetai: Fizikos, Ekonomikos ir
	verslo administravimo, Filosofijos, Istorijos ir Komunikacijos fakultetai.
![Xpath screenshot](Screenshot%202026-09-29%20132253.png)

```xpath
/universitetas/xs:fakultetas[xs:fakulteto_pavadinimas='Matematikos ir informatikos fakultetas']/following::xs:dalykas
```

	Rezultatas: Medicinos fakulteto xs:dalykas. following ašis praleidžia
	konteksto žymės palikuonis ir grąžina vėliau dokumente esančias žymes.
![Xpath screenshot](Screenshot%202026-09-29%20132404.png)

```xpath
/universitetas/xs:fakultetas[xs:fakulteto_pavadinimas='Matematikos ir informatikos fakultetas']/preceding::xs:dalykas
```

	Rezultatas: ankstesnių penkių fakultetų xs:dalykas žymės.
	preceding ašis neįtraukia konteksto žymės protėvių.
![Xpath screenshot](Screenshot%202026-09-29%20132515.png)

/universitetas/xs:fakultetas[xs:fakulteto_pavadinimas='Matematikos ir informatikos fakultetas']/xs:programa/attribute::lygis
	Rezultatas: atributo lygis reikšmė "bakalauras".
![Xpath screenshot](Screenshot%202026-09-29%20132602.png)

## 2. Kelias predikato viduje
/universitetas/xs:fakultetas[xs:programa/xs:dalykas/@kodas = /universitetas/xs:fakultetas[5]/xs:programa/xs:dalykas/@kodas]

Rezultatas: Komunikacijos fakulteto xs:fakultetas. Penktas xs:fakultetas
dokumente yra Komunikacijos fakultetas. Jo dalyko kodas yra LR-101.
Predikatas kiekvienam tikrinamam fakultetui paima jo dalyko @kodas ir
palygina su penkto fakulteto dalyko @kodas. Lygybė tarp aibių teisinga, jei
yra bent viena vienodą eilutės reikšmę turinti pora.

![Xpath screenshot](Screenshot%202026-09-29%20132845.png)

## 3. Žymės su tekstiniais vaikais ir sum()

Žymes, kurios turi vaiką, kuris nėra tuščias suskaičiuoja:

count(//*[text()[normalize-space(.) != '']])

Rezultatas: 81. Skaičiavimas: 7 fakultetai x 11 tekstinių reikšmių kiekviename
fakultete + 3 Erasmus universitetų pavadinimai + universiteto pavadinimas = 81.

![Xpath screenshot](Screenshot%202026-09-29%20133328.png)

Pasirinktų žymių reikšmių suma:
sum(//xs:studentu_pazymiu_vidurkis)

Rezultatas: 57.21 (9.85 + 8.75 + 5.15 + 8.0 + 9.21 + 7.75 + 8.5).
![Xpath screenshot](Screenshot%202026-09-29%20133423.png)

Išraiškoje sum(//*) pavyzdžiui <a><b>2</b><c>3</c></a> parenkamos visos
trys elementų žymės
sum() kiekvienos žymės tekstinę reikšmę paverčia skaičiumi:
a tekstinė reikšmė yra "23" (jos palikuonių tekstas
sujungiamas), b reikšmė 2, c reikšmė 3. Todėl suma yra 23 + 2 + 3 = 28.

## 4. Operacijos su skirtingų tipų operandais
------------------------------------------
5 < 'kuku'  -> false 

operatorius mažiau dirba su skaičiais, todėl 'kuku' virsta NaN, ar 5 yra mažiau nei NaN? Ne :D

5 = '5' -> true

šiuo atveju vėl abi puses paverčiamos skaičiais ir gauname kad 5 = 5, kas yra tiesa

'5' + 2 -> 7 

vėl abi pusės (t.y. tiek '5', tiek 2) traktuojami kaip skaičiai, todėl 5 + 2 = 7  

5 + 'kuku'  -> NaN 

nes 'kuku' negalima paversti skaičiumi, todėl skaičius + 'kazkas' = klaida

## 5. Trijų žingsnių XPath ir tarpinių aibių rezultatai

Išraiška:
/universitetas/xs:fakultetas[xs:programa/xs:dalykas/@kodas='PS-101']/descendant::xs:pavarde

- **1 žingsnis**, /universitetas:
	šakninė žyme

- **2 žingsnis**, xs:fakultetas[...]:
	predikate esantis kelias patikrina, ar fakultete yra dalykas, kurio kodas = PS-101

- **3 žingsnis**, descendant::xs:pavarde:
	žemiau sekanti xs:pavarde, kur šiuo atveju reikšmė "Jonaitis"


## 6. Aibių palyginimas su = ir !=

- Aibė ir skaičius:
	 //xs:kreditai = 10  -> true.
	 kiekvienas node'as paverčiamas tekstu ir per visą xml ieškoma kur kreditai yra 10

- Aibė ir eilutė:
	 //xs:fakulteto_pavadinimas = 'Filosofijos fakultetas'  -> true.
	 per visus fakultetas ieškoma ar yra 'Filosofijos fakultetas'

- Aibė ir loginė reikšmė:
	 //xs:fakultetas = true()  -> true.
	 Jei vienas operandas loginis, abu paverčiami loginiais. 
	 - Netuščia node'ų aibė reiškia true(); 
	 - tuščia aibė reikštų false().

- Dvi aibės:
	 //xs:dalyko_pavadinimas = //xs:dalyko_pavadinimas  -> true.
	 Lyginamos visos kairės ir dešinės aibių mazgų poros pagal jų tekstines
	 reikšmes; pakanka vienos vienodų reikšmių poros.

Kai lyginama aibė su skaičiumi, node'ų tekstinės reikšmės paverčiamos skaičiais.
Su eilute jos lyginamos kaip eilutės. 
Su logine reikšme aibė paverčiama į loginę reikšmę pagal tai, ar ji tuščia.
Dvi aibės lyginamos poromis pagal node'ų tekstines reikšmes. 
Operatorius != taip pat tikrina, ar egzistuoja nelygi porų reikšmė (nebūtinai suprantama kaip "nelygu")

## 7. Santykinis dviejų aibių palyginimas

//xs:kreditai < //xs:studentu_pazymiu_vidurkis  -> true.
//xs:kreditai > //xs:studentu_pazymiu_vidurkis  -> true.

šie operatoriai aibių atveju lygina visas node'ų poras
node'o tekstinė reikšmė paverčiama skaičiumi 
Pirmajai išraiškai tinka 5 < 9.85, 
antrajai 10 > 9.85. 
**Tai nėra atitinkamų fakultetų eilučių palyginimas**

## 8. XPath naudojimas realiose sistemose

- XSLT transformacijose XPath parenka XML dokumento elementus, kuriuos
	 reikia atvaizduoti ar transformuoti, pavyzdžiui, sąskaitos eilutes.
- Integracijose ir SOAP sistemose XPath iš atsakymo XML išrenka reikiamą
	 lauką, pavyzdžiui, užsakymo būseną arba kliento identifikatorių.
- Automatizuotuose testuose XPath gali rasti elementą HTML/DOM medyje,
	 pavyzdžiui, mygtuką pagal jo tekstą ar atributą.
