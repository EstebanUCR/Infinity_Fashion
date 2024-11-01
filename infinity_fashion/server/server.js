const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env

const app = express();
const PORT = process.env.PORT; // Obtener el puerto desde las variables de entorno o usar 3000 por defecto
const SECRET_KEY = process.env.SECRET_KEY; // Obtener la clave secreta desde las variables de entorno
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY; // Clave secreta para el refresh token

app.use(bodyParser.json());
app.use(cors());

const refreshTokensFilePath = path.join(__dirname, 'refreshTokens.json');

// Ruta al archivo JSON de usuarios
const usersFilePath = path.join(__dirname, '../src/assets/users/existing_users.json');

// Función para leer los refresh tokens desde el archivo JSON
const readRefreshTokens = () => {
  try {
    const data = fs.readFileSync(refreshTokensFilePath);
    return JSON.parse(data);
  } catch (error) {
    console.error('Error al leer el archivo de refresh tokens:', error);
    return [];
  }
};

// Función para escribir los refresh tokens en el archivo JSON
const writeRefreshTokens = (tokens) => {
  try {
    fs.writeFileSync(refreshTokensFilePath, JSON.stringify(tokens, null, 2));
  } catch (error) {
    console.error('Error al escribir en el archivo de refresh tokens:', error);
  }
};

// Función para leer usuarios desde el archivo JSON
const readUsers = () => {
  const data = fs.readFileSync(usersFilePath);
  return JSON.parse(data);
};

// Función para escribir usuarios en el archivo JSON
const writeUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
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

  const newUser = { name, email, password };
  users.push(newUser);
  writeUsers(users);

  const accessToken = jwt.sign({ email }, SECRET_KEY, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ email }, REFRESH_SECRET_KEY, { expiresIn: '7d' });
  const refreshTokens = readRefreshTokens();
  refreshTokens.push(refreshToken);
  writeRefreshTokens(refreshTokens);
  res.status(201).json({ message: 'Registro exitoso', accessToken });
});

// Endpoint para iniciar sesión
app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();
  const normalizedEmail = email.toLowerCase();

  // Verificar si es un inicio de sesión de Google (sin contraseña)
  if (!password) {
    const user = users.find(user => user.email.toLowerCase() === normalizedEmail);
    if (!user) {
      return res.status(404).json({ message: 'Este usuario no está registrado. Por favor, cree una cuenta en la sección de registro.' });
    }
    const accessToken = jwt.sign({ email }, SECRET_KEY, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ email }, REFRESH_SECRET_KEY, { expiresIn: '7d' });
    const refreshTokens = readRefreshTokens();
    refreshTokens.push(refreshToken);
    writeRefreshTokens(refreshTokens);
    return res.status(200).json({ message: 'Inicio de sesión exitoso con Google', accessToken });
  }

  // Verificar si el usuario existe y la contraseña es correcta para inicio de sesión normal
  const user = users.find(user => user.email.toLowerCase() === normalizedEmail && user.password === password);

  if (!user) {
    return res.status(400).json({ message: 'Correo o contraseña incorrectos.' });
  }

  const userName = user.name

  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
  res.status(200).json({ message: 'Inicio de sesión exitoso', userName: userName, token });
});

// Endpoint para renovar el access token
app.post('/refresh-token', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(403).json({ message: 'No se proporcionó un refresh token.' });
  }

  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ message: 'Refresh token inválido.' });
  }

  jwt.verify(refreshToken, REFRESH_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Refresh token inválido.' });
    }

    const accessToken = jwt.sign({ email: decoded.email }, SECRET_KEY, { expiresIn: '15m' });
    res.status(200).json({ accessToken });
  });
});

// Middleware para verificar el access token
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
    
    res.email = decoded.email;
    const users = readUsers();
    const user = users.find(user => user.email.toLowerCase() === req.email);
    next();
  });
};

// Ejemplo de un endpoint protegido
app.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Acceso autorizado:', email: req.email});
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
