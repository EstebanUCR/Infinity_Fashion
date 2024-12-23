const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env
const { getUserByEmail, updateUserProfile, getAllUsers } = require('./userService');
const { signUp, signIn, signOut} = require('./authService');
const { getProductsByCategory, getProducts, getImagesByProduct, getSizesByProduct, getNewestProducts } = require('./productService');
const { createToken } = require('./tokenService');
const { getPurchaseHistoryByUserId } = require('./purchaseHistoryService');
const { supabase } = require('./supabaseClient');
const { createShoppingCart, getShoppingCarts } = require('./shoppingCartService');
const { createCartItem } = require('./cartItemService');

const app = express();
const PORT = process.env.PORT; // Obtener el puerto desde las variables de entorno o usar 3000 por defecto
const SECRET_KEY = process.env.SECRET_KEY; // Obtener la clave secreta desde las variables de entorno
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY; // Clave secreta para el refresh token

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());

app.use(express.json());

// API route for sign up
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists in the database
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: 'The user is already registered.' });
    }

    // Create the new user in Supabase
    const user = await signUp(email, password, name);

    if (user) {
      // Generate access and refresh tokens
      const accessToken = jwt.sign({ email }, SECRET_KEY, { expiresIn: '15m' });
      const refreshToken = jwt.sign({ email }, REFRESH_SECRET_KEY, { expiresIn: '7d' });

      // Retrieve the user's ID from the database
      const userData = await getUserByEmail(email);

      // Extract and format the expiration date
      let expired_date;
      jwt.verify(refreshToken, REFRESH_SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Error in obtaining the expiration date.' });
        }

        // Convert `exp` to ISO date string
        const expirationDate = new Date(decoded.exp * 1000); // Convert seconds to milliseconds
        expired_date = new Date(decoded.exp * 1000).toISOString();
      });

      // Save the refresh token in the database
      const tokenData = {
        expires_at: expired_date,
        token: refreshToken,
        user_id: userData.id,
      };
      createToken(tokenData);

      // Respond with success and the access token
      return res.status(201).json({ message: 'Registration successful.', accessToken });
    }
  } catch (error) {
    console.error('Error in /signup:', error);
    return res.status(400).json({ message: error.message });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users); // Devuelve los usuarios como JSON
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Endpoint to get user profile
app.get('/api/getProfile', async (req, res) => {
  try {
    console.log('dentro de getProfile');
    const email = req.query.email;
    const user = await getUserByEmail(email);
    res.status(200).json(user);
  } catch (error) {
    console.error('Error getting profile:', error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

// Endpoint to update user profile
app.put('/api/Updateprofile', async (req, res) => {
  try {
    const updates = req.body;
    const updatedUser = await updateUserProfile(updates);
    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, message: 'Error updating profile' });
  }
});

// TODO falta implementar y probar este
// API route for sign in
app.post('/api/signin', async (req, res) => {
  console.log("Dentro de API /signin");
  const { email, password, isGoogleAuth } = req.body;

  try {
    // Verificar si es un inicio de sesión de Google
    if (isGoogleAuth) {
      console.log("Dentro de inicio de sesión de Google");

      const userData = await getUserByEmail(email);

      if (!userData) {
        // Usuario no registrado
        return res.status(404).json({
          message: 'This user is not registered.',
        });
      }

      // Generar tokens
      const accessToken = jwt.sign({ email: email }, SECRET_KEY, { expiresIn: '15m' });
      const refreshToken = jwt.sign({ email: email }, REFRESH_SECRET_KEY, { expiresIn: '7d' });

      // Calcular fecha de expiración del token
      const decoded = jwt.decode(refreshToken);
      expired_date = new Date(decoded.exp * 1000).toISOString();

      const tokenData = {
        expires_at: expired_date,
        token: refreshToken,
        user_id: userData.id,
      };

      // Crear y guardar el token en la base de datos
      await createToken(tokenData);

      return res.status(200).json({
        message: 'Login successful.',
        userName: userData.name,
        accessToken,
      });
    }

    // Inicio de sesión regular (con contraseña)
    const user = await signIn(email, password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generar tokens
    const accessToken = jwt.sign({ email: email }, SECRET_KEY, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ email: email }, REFRESH_SECRET_KEY, { expiresIn: '7d' });

    // Calcular fecha de expiración del token
    const decoded = jwt.decode(refreshToken);
    expired_date = new Date(decoded.exp * 1000).toISOString();

    const tokenData = {
      expires_at: expired_date,
      token: refreshToken,
      user_id: user.id,
    };

    // Crear y guardar el token en la base de datos
    await createToken(tokenData);

    return res.status(200).json({
      message: 'Login successful.',
      userName: user.name,
      accessToken,
    });
  } catch (error) {
    console.error('Error en /signin:', error);
    return res.status(500).json({ message: 'Email or password wrong.' });
  }
});

// TODO falta implementar y probar este
// API route for sign out
app.post('/api/signout', async (req, res) => {
  try {
      console.log('Dentro de logout')
      token = req.headers['authorization'].substring(6);
      const decoded = jwt.verify(token, SECRET_KEY);
      const email = decoded.email;
      console.log('Email: ' + email)
      const user = await getUserByEmail(email);
      const userId = user.id;
      console.log(userId)
      const date = new Date()
      const added_date = date.toISOString()
      const randomID = Math.floor(Math.random() * (999999999 - 99999999) + 99999999);
      const shoppingCart = {
        added_date: added_date,
        id: randomID,
        user_id: userId
      }
      console.log(randomID)
      await createShoppingCart(shoppingCart)

      cart.forEach(async (item) => {
        console.log('Guardando elemento del carrito')
        const randomID2 = Math.floor(Math.random() * (99999 - 9999) + 9999);
        const cardItem = {
          id: randomID2,
          product_id: item.id,
          quantity: item.quantity,
          shopping_cart_id: randomID,
          size: null,
          subtotal: (item.price * item.quantity)
        }
        await createCartItem(cardItem)
      })
    await signOut();
    console.log('Cerrando sesion')
    res.status(200).json({ message: 'Signed out successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Endpoint to get products
app.get('/api/getProducts', async (req, res) => {
  try {
    // console.log('dentro de getProducts');
    const products = await getProducts();
    // console.log(category)
    // console.log(products)
    res.send(products);
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Endpoint to get product images
app.get('/api/getProductImages', async (req, res) => {
  try {
    // console.log('dentro de getProductImages');
    const product_id = req.query.product_id;
    const images = await getImagesByProduct(product_id);
    // console.log(product_id)
    // console.log(images)
    res.send(images);
  } catch (error) {
    console.error('Error getting product images:', error);
    res.status(500).json({ message: 'Error fetching products images' });
  }
});

// Endpoint to get products
app.get('/api/getSizesAndStock', async (req, res) => {
  try {
    console.log('dentro de getSizesAndStock');
    const product_id = req.query.product_id;
    const sizes = await getSizesByProduct(product_id);
    console.log(product_id)
    console.log(sizes)
    res.send(sizes);
  } catch (error) {
    console.error('Error getting product sizes and stock:', error);
    res.status(500).json({ message: 'Error fetching product sizes and stock' });
  }
});

// Endpoint to get newest products
app.get('/api/getNewestProducts', async (req, res) => {
  try {
    const products = await getNewestProducts();
    res.send(products);
  } catch (error) {
    console.error('Error getting newest products:', error);
    res.status(500).json({ message: 'Error fetching newest products' });
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
  try {
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
  } catch (error) {
    console.error('Error en /signup:', error);
    res.status(400).json({ message: error.message });
  }
});

// Endpoint para iniciar sesión
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();
  const normalizedEmail = email.toLowerCase();

  try {
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
  } catch (error) {
    console.error('Error en /signin:', error);
    res.status(400).json({ message: error.message });
  }
});

//Endpoint para cerrar sesion
app.post('/signout', (req, res) => {
  try {
    const { email, cart } = req.body;
    if (email) {
      console.log('Dentro de logout')
      const date = new Date()
      const added_date = date.toISOString()
      const randomID = Math.floor(Math.random() * (999999999 - 99999999) + 99999999);
      const shoppingCart = {
        added_date: added_date,
        id: randomID,
        user_id: email
      }

      createShoppingCart(shoppingCart)

      cart.forEach((item) => {
        console.log('Guardando elemento del carrito')
        const randomID2 = Math.floor(Math.random() * (99999 - 9999) + 9999);
        const cardItem = {
          id: randomID2,
          product_id: item.id,
          quantity: item.quantity,
          shopping_cart_id: randomID,
          size: null,
          subtotal: (item.price * item.quantity)
        }
        createCartItem(cardItem)
      })
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
  } catch (error) {
    console.error('Error en /signout:', error);
    res.status(400).json({ message: error.message });
  }
})

//Endpoint para guardar ordenes
app.post('/pay', (req, res) => {
  const { email, cart, shipping } = req.body;
  try {  
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
  } catch (error) {
    console.error('Error en /pay:', error);
    res.status(400).json({ message: error.message });
  }
})

// Endpoint para renovar el access token
app.post('/refresh-token', (req, res) => {
  try {
    const accessToken = req.headers['authorization'].substring(6);
    if (!accessToken) {
      return res.status(403).json({ message: 'No se proporcionó un refresh token.' });
    }
    
    jwt.verify(accessToken, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Refresh token inválido.' });
      }

      const accessToken = jwt.sign({ email: decoded.email }, SECRET_KEY, { expiresIn: '15m' });
      res.status(200).json({ message: 'Token refreshed', accessToken });
    });
  } catch (error) {
    console.error('Error en /refresh-token:', error);
    res.status(400).json({ message: error.message });
  }
});

// Middleware para verificar el access token
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers['authorization'].substr(6);

    if (!token) {
      return res.status(403).json({ message: 'No se proporcionó un token.' });
    }
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
  } catch (error) {
    console.error('Error en verifyToken:', error);
    res.status(400).json({ message: error.message });
  }
};

app.get('/api/getPurchaseHistory', async (req, res) => {
  try {
    token = req.headers['authorization'].substring(6);
    const decoded = jwt.verify(token, SECRET_KEY);
    const email = decoded.email;
    const user = await getUserByEmail(email);
    const userId = user.id;
    const history = await getPurchaseHistoryByUserId(userId);
    res.status(200).json({message: 'the history has been obtained.', history});
  } catch (error) {
    console.error('Error getting purchase history:', error);
    res.status(500).json({ message: 'Error fetching purchase history' });
  }
});

// Ejemplo de un endpoint protegido
app.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Acceso autorizado:', email: req.email });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
