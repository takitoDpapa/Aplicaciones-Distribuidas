// index.js
const express = require("express");
const app = express();
const PORT = 3000;

// Middleware para leer JSON
app.use(express.json());

// Endpoint POST /saludo
app.post("/saludo", (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: "Falta el campo 'nombre'" });
  }

  res.json({ mensaje: `Hola, ${nombre}` });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
