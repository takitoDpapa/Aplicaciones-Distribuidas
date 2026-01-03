const express = require('express');
const app = express();

app.use(express.json());

// Endpoint POST /validar-password
app.post('/validar-password', (req, res) => {
  const { password } = req.body;

  // Validar que se envíe la contraseña
  if (!password || typeof password !== 'string') {
    return res.status(400).json({ esValida: false, errores: ['Debe enviar una contraseña válida.'] });
  }

  const errores = [];

  // Validaciones
  if (password.length < 8) {
    errores.push('La contraseña debe tener al menos 8 caracteres.');
  }
  if (!/[A-Z]/.test(password)) {
    errores.push('Debe contener al menos una letra mayúscula.');
  }
  if (!/[a-z]/.test(password)) {
    errores.push('Debe contener al menos una letra minúscula.');
  }
  if (!/[0-9]/.test(password)) {
    errores.push('Debe contener al menos un número.');
  }

  const esValida = errores.length === 0;

  res.json({ esValida, errores });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
