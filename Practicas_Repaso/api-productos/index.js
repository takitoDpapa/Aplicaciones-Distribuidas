const express = require('express');
const app = express();

app.use(express.json());

// Array en memoria para almacenar productos
let productos = [];

/**
 * POST /productos
 * Agregar un producto al array
 * Body: { id:number, nombre:string, categoria:string, precio:number }
 */
app.post('/productos', (req, res) => {
  const { id, nombre, categoria, precio } = req.body;

  // Validación básica
  if (typeof id !== 'number' || typeof nombre !== 'string' || typeof categoria !== 'string' || typeof precio !== 'number') {
    return res.status(400).json({ error: 'Datos inválidos. Se requiere { id:number, nombre:string, categoria:string, precio:number }' });
  }

  productos.push({ id, nombre, categoria, precio });
  res.status(201).json({ mensaje: 'Producto agregado', producto: { id, nombre, categoria, precio } });
});

/**
 * GET /productos
 * Filtrar productos por query parameters: categoria, precioMin, precioMax
 */
app.get('/productos', (req, res) => {
  let { categoria, precioMin, precioMax } = req.query;

  let filtrados = productos;

  // Filtrar por categoría
  if (categoria) {
    filtrados = filtrados.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
  }

  // Filtrar por precio mínimo
  if (precioMin) {
    const min = parseFloat(precioMin);
    filtrados = filtrados.filter(p => p.precio >= min);
  }

  // Filtrar por precio máximo
  if (precioMax) {
    const max = parseFloat(precioMax);
    filtrados = filtrados.filter(p => p.precio <= max);
  }

  res.json(filtrados);
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
