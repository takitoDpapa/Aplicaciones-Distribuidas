const express = require('express');
const app = express();

app.use(express.json());

// Endpoint POST /contar-palabras
app.post('/contar-palabras', (req, res) => {
  const { texto } = req.body;

  if (!texto || typeof texto !== 'string') {
    return res.status(400).json({ error: 'Debe enviar un texto válido.' });
  }

  // Separar palabras por espacios y filtrar posibles vacíos
  const palabras = texto.trim().split(/\s+/).filter(p => p.length > 0);

  const totalPalabras = palabras.length;
  const totalCaracteres = texto.length;

  // Contar palabras únicas usando Set
  const palabrasUnicas = new Set(palabras.map(p => p.toLowerCase())).size;

  res.json({
    totalPalabras,
    totalCaracteres,
    palabrasUnicas
  });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
