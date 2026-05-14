// server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

// El webhook lo configuraremos en Render, no aquí.
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

// Permite peticiones de cualquier lugar (para pruebas)
app.use(cors()); 
// Para que entienda JSON
app.use(express.json());

// Endpoint que recibe los datos de tu web
app.post('/api/enviar', async (req, res) => {
    const { mensaje, ip } = req.body;

    if (!mensaje || !DISCORD_WEBHOOK_URL) {
        return res.status(400).send('Falta el mensaje o el webhook no está configurado.');
    }

    const payload = {
        content: `**IP:** ${ip}\n${mensaje}`
    };

    try {
        await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        res.status(200).send('OK');
    } catch (error) {
        console.error('Error al enviar a Discord:', error);
        res.status(500).send('Error');
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
