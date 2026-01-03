const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();

app.use(express.json());

// Endpoint POST /generar-perfil
app.post('/generar-perfil', (req, res) => {
  const { nombre, edad, intereses } = req.body;

  // Validar entrada
  if (typeof nombre !== 'string' || typeof edad !== 'number' || !Array.isArray(intereses)) {
    return res.status(400).json({ error: 'Datos inválidos. Se requiere { nombre:string, edad:number, intereses:string[] }' });
  }

  // Determinar categoría según edad
  let categoria;
  if (edad < 25) categoria = 'junior';
  else if (edad <= 50) categoria = 'senior';
  else categoria = 'veterano';

  const perfil = {
    usuario: { nombre, edad, intereses },
    id: uuidv4(),
    fechaCreacion: new Date().toISOString(),
    categoria
  };

  res.json(perfil);
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
