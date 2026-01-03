const express = require('express');
const app = express();

app.use(express.json());

// Endpoint POST /calcular-promedio
app.post('/calcular-promedio', (req, res) => {
  const { calificaciones } = req.body;

  // Validar que sea un array
  if (!Array.isArray(calificaciones) || calificaciones.length === 0) {
    return res.status(400).json({ error: 'Debe enviar un arreglo de calificaciones.' });
  }

  // Validar que todas las calificaciones sean números entre 0 y 10
  for (const c of calificaciones) {
    if (typeof c !== 'number' || c < 0 || c > 10) {
      return res.status(400).json({ error: 'Todas las calificaciones deben ser números entre 0 y 10.' });
    }
  }

  // Calcular promedio
  const suma = calificaciones.reduce((acc, val) => acc + val, 0);
  const promedio = parseFloat((suma / calificaciones.length).toFixed(2));

  // Calificación más alta y más baja
  const calificacionMasAlta = Math.max(...calificaciones);
  const calificacionMasBaja = Math.min(...calificaciones);

  // Estado: aprobado >=6
  const estado = promedio >= 6 ? 'aprobado' : 'reprobado';

  res.json({
    promedio,
    calificacionMasAlta,
    calificacionMasBaja,
    estado
  });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
