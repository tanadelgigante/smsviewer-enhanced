const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Debug: Log server start
console.log('Starting server...');

// Serve la cartella 'public' per il contenuto statico (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// La directory in cui sono salvati i file XML
const smsDirectory = path.join(__dirname, 'sms');

// Funzione per ottenere il file XML più recente
function getLatestXmlFile() {
  // Debug: Log directory read
  console.log('Reading SMS directory:', smsDirectory);
  
  const files = fs.readdirSync(smsDirectory);
  const xmlFiles = files.filter(file => file.endsWith('.xml'));

  if (xmlFiles.length === 0) {
    // Debug: No XML files found
    console.log('No XML files found in SMS directory');
    return null;
  }

  // Ordina i file per data di modifica, in modo da ottenere il più recente
  const latestFile = xmlFiles.sort((a, b) => {
    return fs.statSync(path.join(smsDirectory, b)).mtime - fs.statSync(path.join(smsDirectory, a)).mtime;
  })[0];

  // Debug: Log latest file found
  console.log('Latest XML file:', latestFile);

  return latestFile;
}

// Endpoint per ottenere il contenuto del file XML più recente
app.get('/get-latest-sms', (req, res) => {
  const latestFile = getLatestXmlFile();

  if (!latestFile) {
    // Debug: No SMS backup files found
    console.log('No SMS backup files found');
    return res.status(404).send('No SMS backup files found');
  }

  const filePath = path.join(smsDirectory, latestFile);
  
  // Leggi il file e invialo come risposta
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      // Debug: Error reading the SMS file
      console.error('Error reading the SMS file:', err);
      return res.status(500).send('Error reading the SMS file');
    }

    // Debug: Successfully read the SMS file
    console.log('Successfully read the SMS file');
    res.type('xml').send(data); // Risponde con il contenuto del file XML
  });
});

// Endpoint per servire l'API URL
app.get('/config', (req, res) => {
  // Debug: Log API URL
  console.log('Serving API URL:', process.env.API_URL);
  res.json({ API_URL: process.env.API_URL });
});

// Avvia il server sulla porta configurata
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
