const { supabase } = require('./supabaseClient');

// Fetch user by email
const getUserByEmail  = async (email) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error) return null;
  return data;
};

const getAllUsers = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*'); // Obtiene todas las columnas de todos los usuarios

  if (error) {
    console.error('Error fetching users:', error);
    throw error; // Opcional: lanza el error para manejarlo en el controlador
  }

  return data; // Devuelve el array de usuarios
};

// Update user profile
const updateUserProfile = async (userData) => {
  const { email, ...updates } = userData;
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('email', email);
  if (error) throw error;
  return data;
};


// Create a new user (sign-up)
const createUser = async (userData) => {
  const { data, error } = await supabase
    .from('users')
    .insert(userData)
    .single();

  if (error) {
    console.error('Error creating user:', error);
    return null;
  }
  return data;
};

// Delete user
const deleteUser = async (id) => {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting user:', error);
    return false;
  }
  return true;
};


module.exports = {
  getUserByEmail ,
  getAllUsers,
  updateUserProfile,
  createUser,
  deleteUser
};
