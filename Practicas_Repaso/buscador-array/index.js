const express = require('express');
const app = express();

app.use(express.json());

// Endpoint POST /buscar
app.post('/buscar', (req, res) => {
  const { array, elemento } = req.body;

  // Validar datos
  if (!Array.isArray(array)) {
    return res.status(400).json({ error: 'El campo "array" debe ser un arreglo válido.' });
  }

  // Buscar el elemento en el array
  const indice = array.findIndex(item => item === elemento);
  const encontrado = indice !== -1;

  // Determinar el tipo del elemento
  const tipoElemento = typeof elemento;

  res.json({
    encontrado,
    indice: encontrado ? indice : -1,
    tipoElemento
  });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
