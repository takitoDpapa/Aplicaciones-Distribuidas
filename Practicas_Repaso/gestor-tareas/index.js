const express = require('express');
const app = express();

app.use(express.json());

// Almacenamiento en memoria
let tareas = [];

//  Crear tarea (POST /tareas)
app.post('/tareas', (req, res) => {
  const { id, titulo, completada } = req.body;

  // Validar campos
  if (typeof id !== 'number' || typeof titulo !== 'string' || typeof completada !== 'boolean') {
    return res.status(400).json({ error: 'Datos inválidos. Se requiere { id:number, titulo:string, completada:boolean }' });
  }

  // Verificar si el id ya existe
  if (tareas.find(t => t.id === id)) {
    return res.status(400).json({ error: 'Ya existe una tarea con ese ID.' });
  }

  tareas.push({ id, titulo, completada });
  res.status(201).json({ mensaje: 'Tarea creada exitosamente', tareas });
});

//  Listar todas las tareas (GET /tareas)
app.get('/tareas', (req, res) => {
  res.json(tareas);
});

//  Actualizar tarea (PUT /tareas/:id)
app.put('/tareas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, completada } = req.body;

  const tarea = tareas.find(t => t.id === id);
  if (!tarea) {
    return res.status(404).json({ error: 'Tarea no encontrada.' });
  }

  if (titulo !== undefined) tarea.titulo = titulo;
  if (completada !== undefined) tarea.completada = completada;

  res.json({ mensaje: 'Tarea actualizada', tarea });
});

// Eliminar tarea (DELETE /tareas/:id)
app.delete('/tareas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const indice = tareas.findIndex(t => t.id === id);

  if (indice === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada.' });
  }

  tareas.splice(indice, 1);
  res.json({ mensaje: 'Tarea eliminada correctamente' });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
