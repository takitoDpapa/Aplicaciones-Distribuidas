const express = require('express');
const app = express();

app.use(express.json());

// Endpoint POST /convertir-temperatura
app.post('/convertir-temperatura', (req, res) => {
  const { valor, desde, hacia } = req.body;

  // Validar datos
  if (typeof valor !== 'number' || !['C', 'F', 'K'].includes(desde) || !['C', 'F', 'K'].includes(hacia)) {
    return res.status(400).json({ error: 'Datos inválidos. Use escalas: C, F o K.' });
  }

  let valorConvertido = valor;

  // Primero, convertir el valor a Celsius
  let enCelsius;
  switch (desde) {
    case 'C':
      enCelsius = valor;
      break;
    case 'F':
      enCelsius = (valor - 32) * 5 / 9;
      break;
    case 'K':
      enCelsius = valor - 273.15;
      break;
  }

  // Luego convertir desde Celsius a la escala deseada
  switch (hacia) {
    case 'C':
      valorConvertido = enCelsius;
      break;
    case 'F':
      valorConvertido = (enCelsius * 9 / 5) + 32;
      break;
    case 'K':
      valorConvertido = enCelsius + 273.15;
      break;
  }

  res.json({
    valorOriginal: valor,
    valorConvertido: parseFloat(valorConvertido.toFixed(2)),
    escalaOriginal: desde,
    escalaConvertida: hacia
  });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
