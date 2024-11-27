const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Serve la cartella 'public' per il contenuto statico (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// La directory in cui sono salvati i file XML
const smsDirectory = path.join(__dirname, 'sms');

// Funzione per ottenere il file XML più recente
function getLatestXmlFile() {
  const files = fs.readdirSync(smsDirectory);
  const xmlFiles = files.filter(file => file.endsWith('.xml'));

  if (xmlFiles.length === 0) {
    return null;
  }

  // Ordina i file per data di modifica, in modo da ottenere il più recente
  const latestFile = xmlFiles.sort((a, b) => {
    return fs.statSync(path.join(smsDirectory, b)).mtime - fs.statSync(path.join(smsDirectory, a)).mtime;
  })[0];

  return latestFile;
}

// Endpoint per ottenere il contenuto del file XML più recente
app.get('/get-latest-sms', (req, res) => {
  const latestFile = getLatestXmlFile();

  if (!latestFile) {
    return res.status(404).send('No SMS backup files found');
  }

  const filePath = path.join(smsDirectory, latestFile);
  
  // Leggi il file e invialo come risposta
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading the SMS file');
    }

    res.type('xml').send(data); // Risponde con il contenuto del file XML
  });
});

// Avvia il server sulla porta configurata
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
