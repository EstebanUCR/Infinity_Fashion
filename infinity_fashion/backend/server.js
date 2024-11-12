const express = require('express');
const cors = require('cors');
const { signUp, signIn, signOut } = require('./authService');

const app = express();
app.use(cors());
app.use(express.json());

// API route for sign up
app.post('/api/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = await signUp(email, password, name);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API route for sign in
app.post('/api/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const session = await signIn(email, password);
    res.status(200).json(session);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API route for sign out
app.post('/api/signout', async (req, res) => {
  try {
    await signOut();
    res.status(200).json({ message: 'Signed out successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
