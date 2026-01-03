const express = require('express');
const app = express();

app.use(express.json());

// Endpoint POST /calcular
app.post('/calcular', (req, res) => {
  const { a, b, operacion } = req.body;

  // Validar datos de entrada
  if (typeof a !== 'number' || typeof b !== 'number' || !operacion) {
    return res.status(400).json({ error: 'Debe enviar "a", "b" y "operacion" correctamente.' });
  }

  let resultado;

  switch (operacion) {
    case 'suma':
      resultado = a + b;
      break;
    case 'resta':
      resultado = a - b;
      break;
    case 'multiplicacion':
      resultado = a * b;
      break;
    case 'division':
      if (b === 0) {
        return res.status(400).json({ error: 'No se puede dividir entre cero.' });
      }
      resultado = a / b;
      break;
    default:
      return res.status(400).json({ error: 'Operación no válida. Use: suma, resta, multiplicacion o division.' });
  }

  res.json({ resultado });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
