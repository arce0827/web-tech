const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

const fs = require('fs')
const path = require('path')

const Ajv = require('ajv')
const addFormats = require('ajv-formats')

const ajv = new Ajv({ allErrors: true })
addFormats(ajv)

const schema = require('./schemas/jsonschema.json')
ajv.addSchema(schema)
const tikrinameFakulteta = ajv.getSchema(schema.$id + '#/definitions/fakultetas')

const DUOMENU_FAILAS = path.join(__dirname, 'data', '1lab.json');

function skaitytiDuomenis() {
    return JSON.parse(fs.readFileSync(DUOMENU_FAILAS, 'utf-8'));
}

function rasytiDuomenis(duomenys) {
    fs.writeFileSync(DUOMENU_FAILAS, JSON.stringify(duomenys, null, 2), 'utf-8');
}

function formatuotiKlaidas(klaidos) {
    return klaidos.map(e => {
        let laukas = e.instancePath;
        if (e.keyword === 'required') {
            laukas += '/' + e.params.missingProperty;
        }
        return { laukas, zinute: e.message };
    });
}

app.use(express.json())
app.get('/api', (req, res) => {
    res.json({ zinute: "universiteto API veikia" });
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
        return res.status(404).json({ klaida: `Fakultetas su id ${req.params.id} nerastas` });
    }
});

app.post('/api/fakultetai', (req, res) => {
    const validacija = tikrinameFakulteta(req.body);
    if (!validacija) {
        return res.status(400).json({ klaida: 'Neteisingi duomenys', detales: formatuotiKlaidas(tikrinameFakulteta.errors) });
    }
    const duomenys = skaitytiDuomenis();
    const visiId = duomenys.universitetas.fakultetas.map(f => f.id);
    const maxId = visiId.length > 0 ? Math.max(...visiId) : 0;
    const naujasFakultetas = {
        fakulteto_pavadinimas: req.body.fakulteto_pavadinimas,
        fakulteto_isteigimo_data: req.body.fakulteto_isteigimo_data,
        id: maxId + 1,
        adresas: req.body.adresas,
        programa: req.body.programa
    };
    duomenys.universitetas.fakultetas.push(naujasFakultetas);
    rasytiDuomenis(duomenys);
    res.status(201).json(naujasFakultetas);
});

app.put('/api/fakultetai/:id', (req, res) => {
    const validacija = tikrinameFakulteta(req.body);
    if (!validacija) {
        return res.status(400).json({ klaida: 'Neteisingi duomenys', detales: tikrinameFakulteta.errors });
    }
    const id = Number(req.params.id);
    const duomenys = skaitytiDuomenis();
    const fakultetai = duomenys.universitetas.fakultetas;
    const i = fakultetai.findIndex(f => f.id === id);

    if (i === -1) {
        return res.status(404).json({ klaida: `Fakultetas su id ${id} nerastas` });
    }
    const atnaujintasFakultetas = {
        fakulteto_pavadinimas: req.body.fakulteto_pavadinimas,
        fakulteto_isteigimo_data: req.body.fakulteto_isteigimo_data,
        id: id,
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
        return res.status(404).json({ klaida: `Fakultetas su id ${id} nerastas` });
    }
    if (fakultetai.length <= 1) {
        return res.status(409).json({ klaida: 'Negalima ištrinti fakulteto, nes privalo egzistuoti bent vienas fakultetas' });
    }
    fakultetai.splice(i, 1);
    rasytiDuomenis(duomenys);
    res.status(204).send();
});

app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ klaida: 'Neteisingas JSON formatas' });
    }
    next(err);
});

app.listen(PORT, () => {
    console.log(`vaziuojam ant ${PORT}`)
});