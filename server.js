// server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

app.use(cors());
app.use(express.json());

app.post('/api/enviar', async (req, res) => {
    // El cuerpo ahora puede ser { mensaje, ip } o { embeds: [...] }
    const body = req.body; 

    if (!body) {
        return res.status(400).send('El cuerpo de la petición está vacío.');
    }

    try {
        // Enviamos directamente lo que recibimos. Discord sabrá si es un texto plano o un embed.
        await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        res.status(200).send('OK');
    } catch (error) {
        console.error('Error al enviar a Discord:', error);
        res.status(500).send('Error');
    }
});

app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${port}`);
});
