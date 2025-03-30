const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const DATA_FILE = 'data.json';

// Lees gegevens uit het JSON-bestand
function readData() {
    if (!fs.existsSync(DATA_FILE)) {
        return {};
    }
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
}

// Schrijf gegevens naar het JSON-bestand
function writeData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Haal gegevens op
app.get('/data', (req, res) => {
    res.json(readData());
});

// Sla gegevens op
app.post('/data', (req, res) => {
    const newData = req.body;
    const currentData = readData();
    const timestamp = Date.now();
    currentData[timestamp] = newData;
    writeData(currentData);
    res.json({ message: 'Data opgeslagen', id: timestamp });
});

app.listen(port, () => {
    console.log(`Server draait op http://localhost:${port}`);
});

