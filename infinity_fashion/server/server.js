const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env

const { signUp, signIn, signOut, getUserByEmail } = require('./authService');

const app = express();
const PORT = process.env.PORT; // Obtener el puerto desde las variables de entorno o usar 3000 por defecto
const SECRET_KEY = process.env.SECRET_KEY; // Obtener la clave secreta desde las variables de entorno
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY; // Clave secreta para el refresh token

app.use(bodyParser.json());
app.use(cors());

app.use(express.json());

// API route for sign up
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya está registrado.' });
    }

    // Crear el nuevo usuario en Supabase
    const user = await signUp(email, password, name);

    
    // Generar tokens después de que el usuario se haya registrado
    const accessToken = jwt.sign({ email }, SECRET_KEY, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ email }, REFRESH_SECRET_KEY, { expiresIn: '7d' });

    // Guardar el refresh token en el archivo JSON
    const refreshTokens = readRefreshTokens();
    refreshTokens.push(refreshToken);
    writeRefreshTokens(refreshTokens);

    // Responder con éxito sólo una vez aquí
    return res.status(201).json({ message: 'Registro exitoso', accessToken, refreshToken });

  } catch (error) {
    console.error('Error en /signup:', error);
    // Responder con el error si ocurre
    return res.status(400).json({ error: error.message });
  }
});

// TODO falta implementar y probar este
// API route for sign in
app.post('/api/signin', async (req, res) => {
  console.log("dentro de api signIn");
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase();

  try {
    // Verificar si es un inicio de sesión de Google (sin contraseña)
    if (!password) {
      const user = await getUserByEmail(normalizedEmail);
      if (!user) {
        return res.status(404).json({ message: 'Este usuario no está registrado. Por favor, cree una cuenta en la sección de registro.' });
      }

      // Generar tokens para el inicio de sesión con Google
      const accessToken = jwt.sign({ email }, SECRET_KEY, { expiresIn: '15m' });
      const refreshToken = jwt.sign({ email }, REFRESH_SECRET_KEY, { expiresIn: '7d' });

      // Guarda el refreshToken en tu base de datos o sistema de almacenamiento de tokens

      return res.status(200).json({ message: 'Inicio de sesión exitoso con Google', accessToken, refreshToken });
    }

    // Verificar si el usuario existe y la contraseña es correcta para inicio de sesión regular
    const user = await signIn(email, password);
   
    // Generar tokens para el inicio de sesión regular
    const accessToken = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ email: user.email }, REFRESH_SECRET_KEY, { expiresIn: '7d' });

    // Guarda el refreshToken en tu base de datos o sistema de almacenamiento de tokens

    return res.status(200).json({ message: 'Inicio de sesión exitoso', userName: user.name, accessToken, refreshToken });
  } catch (error) {
    console.error('Error en /signin:', error);
    return res.status(400).json({ message: error.message });
  }
});

// TODO falta implementar y probar este
// API route for sign out
app.post('/api/signout', async (req, res) => {
  try {
    await signOut();
    res.status(200).json({ message: 'Signed out successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const refreshTokensFilePath = path.join(__dirname, 'refreshTokens.json');

// Ruta al archivo JSON de usuarios
const usersFilePath = path.join(__dirname, '../src/assets/users/existing_users.json');
const usersCartsFile = path.join(__dirname, '../src/assets/users/users_carts.json');
const userOrdersFile = path.join(__dirname, '../src/assets/users/users_orders.json');

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

//Funcion para leer archivo de carritos por usuario
const readCarts = () => {
  const carts = fs.readFileSync(usersCartsFile)
  return JSON.parse(carts)
}

//Funcion para escribir carritos en archivo
const writeCars = (carts) => {
  fs.writeFileSync(usersCartsFile, JSON.stringify(carts, null, 2));
}

//Funcion para leer las ordenes
const readOrders = () => {
  const orders = fs.readFileSync(userOrdersFile)
  return JSON.parse(orders)
}

//Funcion para escribir las ordenes de los clientes en el JSON
const writeOrders = (orders) => {
  fs.writeFileSync(userOrdersFile, JSON.stringify(orders, null, 2));
}

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
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();
  const normalizedEmail = email.toLowerCase();

  // Verificar si es un inicio de sesión de Google (sin contraseña)
  if (!password) {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'Este usuario no está registrado. Por favor, cree una cuenta en la sección de registro.' });
    }
    const accessToken = jwt.sign({ email }, SECRET_KEY, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ email }, REFRESH_SECRET_KEY, { expiresIn: '7d' });
    const refreshTokens = readRefreshTokens();
    refreshTokens.push(refreshToken);
    writeRefreshTokens(refreshTokens);
    const carts = readCarts();
    const cart = carts.find(user => user.email.toLowerCase() === normalizedEmail)
    userCart = []
    if (cart) {
      userCart = cart
    }
    return res.status(200).json({ message: 'Inicio de sesión exitoso con Google', accessToken, userCart });
  }

  // Verificar si el usuario existe y la contraseña es correcta para inicio de sesión normal
  const user = users.find(user => user.email.toLowerCase() === normalizedEmail && user.password === password);

  if (!user) {
    return res.status(400).json({ message: 'Correo o contraseña incorrectos.' });
  }

  const userName = user.name
  const carts = readCarts()
  userCart = []
  const cart = carts.find(user => user.email.toLowerCase() === normalizedEmail)
  if (cart) {
    userCart = cart
  }

  const accessToken = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
  res.status(200).json({ message: 'Inicio de sesión exitoso', userName: userName, accessToken, userCart });
});

//Endpoint para cerrar sesion
app.post('/signout', (req, res) => {
  const { email, cart } = req.body;
  if (email) {
    const data = readCarts()
    const user = data.find(user => user.email.toLowerCase() === email.toLowerCase())
    if (user) {
      user.cart = cart
    } else {
      data.push({ email, cart })
    }
    writeCars(data)
    res.status(201).json({ message: 'Carrito guardado' });
  } else {
    res.status(400).json({ message: 'Debe iniciar sesion' });
  }
})

//Endpont para guardar ordenes
app.post('/pay', (req, res) => {
  const { email, cart, shipping } = req.body;
  if (email) {
    const data = readOrders();
    const currentDate = new Date().toISOString();
    const orderDetails = cart.map(({ id, name, price, quantity }) => ({
      id,
      name,
      price,
      quantity,
    }))
    const newOrder = {
      email: email,
      date: currentDate,
      shipping: shipping,
      product: orderDetails
    }
    data.push(newOrder)
    writeOrders(data)
    res.status(201).json({ message: 'Orden realizada!' });
  } else {
    res.status(400).json({ message: 'Debe iniciar sesion' });
  }
})

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
  //console.log(token)
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
  res.status(200).json({ message: 'Acceso autorizado:', email: req.email });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
