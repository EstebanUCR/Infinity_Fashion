const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Configurar CORS para permitir solicitudes desde el frontend
app.use(cors());
app.use(bodyParser.json());

// Ruta al archivo JSON de usuarios
const usersFilePath = path.join(__dirname, '../src/assets/users/existing_users.json');

// Función para leer usuarios desde el archivo JSON
const readUsers = () => {
  const data = fs.readFileSync(usersFilePath);
  return JSON.parse(data);
};

// Función para escribir usuarios en el archivo JSON
const writeUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Ruta para registrar un nuevo usuario
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const users = readUsers();

  // Verificar si el email ya está registrado
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'This email is already registered' });
  }

  // Añadir el nuevo usuario
  const newUser = { name, email, password };
  users.push(newUser);
  writeUsers(users);

  res.status(201).json({ message: 'User registered successfully' });
});

// Ruta para iniciar sesión
app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();

  // Convertir email a minúsculas para comparación
  const normalizedEmail = email.toLowerCase();

  // Verificar si es un inicio de sesión de Google (sin contraseña)
  if (!password) {
    const user = users.find(user => user.email.toLowerCase() === normalizedEmail);
    if (!user) {
      return res.status(404).json({ message: 'Este usuario no está registrado. Por favor, cree una cuenta en la sección de registro.' });
    }
    return res.status(200).json({ message: 'Inicio de sesión exitoso con Google' });
  }

  // Verificar si el usuario existe y la contraseña es correcta para inicio de sesión normal
  const user = users.find(user => user.email.toLowerCase() === normalizedEmail && user.password === password);
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  res.status(200).json({ message: 'Inicio de sesión exitoso' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
