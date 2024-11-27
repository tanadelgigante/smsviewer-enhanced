const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Servire i file statici nella directory del progetto
app.use(express.static(path.join(__dirname)));

// Endpoint per accedere ai file della cartella /sms
app.use('/sms', express.static(path.join(__dirname, 'sms')));

// Avvio del server
app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
});
