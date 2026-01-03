// Importar express
const express = require('express');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Endpoint POST /saludo
app.post('/saludo', (req, res) => {
  const { nombre } = req.body;

  // Validar que se envíe el nombre
  if (!nombre) {
    return res.status(400).json({ error: 'Debe enviar un nombre en el cuerpo de la solicitud.' });
  }

  // Respuesta JSON
  res.json({ mensaje: `Hola, ${nombre}` });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
