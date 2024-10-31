const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env

const app = express();
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY; // Obtener la clave secreta desde las variables de entorno

app.use(bodyParser.json());
app.use(cors());

// Ruta al archivo JSON de usuarios
const usersFilePath = path.join(__dirname, '../src/assets/users/existing_users.json');

// Función para leer usuarios desde el archivo JSON
const readUsers = () => {
  try {
    const data = fs.readFileSync(usersFilePath);
    console.log('Usuarios leídos:', data.toString());
    return JSON.parse(data);
  } catch (error) {
    console.error('Error al leer el archivo de usuarios:', error);
    return [];
  }
};

// Función para escribir usuarios en el archivo JSON
const writeUsers = (users) => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    console.log('Usuarios guardados:', users);
  } catch (error) {
    console.error('Error al escribir en el archivo de usuarios:', error);
  }
};

// Endpoint para registrar un usuario
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const users = readUsers();

  // Verificar si el email ya está registrado
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'El usuario ya está registrado.' });
  }

  // Añadir el nuevo usuario
  const newUser = { name, email, password };
  users.push(newUser);
  writeUsers(users);

  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
  res.status(201).json({ message: 'Registro exitoso', token });
});

// Endpoint para iniciar sesión
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
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
    return res.status(200).json({ message: 'Inicio de sesión exitoso con Google', token });
  }

  // Verificar si el usuario existe y la contraseña es correcta para inicio de sesión normal
  const user = users.find(user => user.email.toLowerCase() === normalizedEmail && user.password === password);
  if (!user) {
    return res.status(400).json({ message: 'Correo o contraseña incorrectos.' });
  }

  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
  res.status(200).json({ message: 'Inicio de sesión exitoso', token });
});

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'].substr(6);

  if (!token) {
    return res.status(403).json({ message: 'No se proporcionó un token.' });
  }
  console.log(token)
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(401).json({ message: 'Token inválido.' });
    }
    
    req.email = decoded.email;
    const users = readUsers();
    const user = users.find(user => user.email.toLowerCase() === req.email);
    // req.name = user.name;
    req.name = decoded.name;
    console.log(req.name)
    next();
  });
};

// Ejemplo de un endpoint protegido
app.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Acceso autorizado:', email: req.email, name: req.name });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
