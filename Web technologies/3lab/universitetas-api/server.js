const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

const fs = require('fs')
const path = require('path')

const DUOMENU_FAILAS = path.join(__dirname, 'data', '1lab.json');

function skaitytiDuomenis() {
    return JSON.parse(fs.readFileSync(DUOMENU_FAILAS, 'utf-8'));
}

function rasytiDuomenis(duomenys) {
    fs.writeFileSync(DUOMENU_FAILAS, JSON.stringify(duomenys, null, 2), 'utf-8');
}

app.use(express.json())
app.get('/api', (req, res) => {
    res.json({ klaida: 'test' })
});

app.get('/api/fakultetai', (req, res) => {
    const duomenys = skaitytiDuomenis();
    res.json(duomenys.universitetas.fakultetas);
});

app.get('/api/fakultetai/:id', (req, res) => {
    const duomenys = skaitytiDuomenis();
    const fakultetas = duomenys.universitetas.fakultetas.find(f => f.id === Number(req.params.id));
    if (fakultetas) {
        res.json(fakultetas);
    } else {
        res.status(404).json({ klaida: 'Fakultetas nerastas' });
    }
});

app.post('/api/fakultetai', (req, res) => {
    const duomenys = skaitytiDuomenis();
    const visiId = duomenys.universitetas.fakultetas.map(f => f.id);
    const maxId = visiId.length > 0 ? Math.max(...visiId) : 0;
    const naujasFakultetas = {
        id: maxId + 1,
        fakulteto_pavadinimas: req.body.fakulteto_pavadinimas,
        fakulteto_isteigimo_data: req.body.fakulteto_isteigimo_data,
        adresas: req.body.adresas,
        programa: req.body.programa
    };
    duomenys.universitetas.fakultetas.push(naujasFakultetas);
    rasytiDuomenis(duomenys);
    res.status(201).json(naujasFakultetas);
});

app.put('/api/fakultetai/:id', (req, res) => {
    const id = Number(req.params.id);
    const duomenys = skaitytiDuomenis();
    const fakultetai = duomenys.universitetas.fakultetas;
    const i = fakultetai.findIndex(f => f.id === id);

    if (i === -1) {
        return res.status(404).json({ klaida: 'Fakultetas nerastas' });
    }
    const atnaujintasFakultetas = {
        id: id,
        fakulteto_pavadinimas: req.body.fakulteto_pavadinimas,
        fakulteto_isteigimo_data: req.body.fakulteto_isteigimo_data,
        adresas: req.body.adresas,
        programa: req.body.programa
    };
    fakultetai[i] = atnaujintasFakultetas;
    rasytiDuomenis(duomenys);
    res.json(atnaujintasFakultetas);
});

app.delete('/api/fakultetai/:id', (req, res) => {
    const id = Number(req.params.id);
    const duomenys = skaitytiDuomenis();
    const fakultetai = duomenys.universitetas.fakultetas;
    const i = fakultetai.findIndex(f => f.id === id);
    if (i === -1) {
        return res.status(404).json({ klaida: 'Fakultetas nerastas' });
    }
    if (fakultetai.length <= 1) {
        return res.status(409).json({ klaida: 'Negalima ištrinti fakulteto, nes privalo egzistuoti bent vienas fakultetas' });
    }
    fakultetai.splice(i, 1);
    rasytiDuomenis(duomenys);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`vaziuojam ant ${PORT}`)
});