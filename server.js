// server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

app.use(cors());
app.use(express.json());

// Endpoint para recibir los datos de tus páginas
app.post('/api/enviar', async (req, res) => {
    const body = req.body; 

    if (!body) {
        return res.status(400).send('El cuerpo de la petición está vacío.');
    }

    try {
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

// Endpoint para mantener el servidor despierto (Keep-Alive)
app.get('/', (req, res) => {
  res.send('Servidor activo y listo.');
});

app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${port}`);
});

// Llamada a sí mismo cada 10 minutos para evitar el sleep mode
setInterval(() => {
  fetch(`https://discord-wqsm.onrender.com/`)
    .then(() => console.log('Keep-alive enviado.'))
    .catch(err => console.error('Error en keep-alive:', err));
}, 10 * 60 * 1000); // 10 minutos
