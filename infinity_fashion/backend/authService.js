const { supabase } = require('./supabaseClient');

// Sign up function

const signUp = async (email, password, name) => {
  // Registrar al usuario en el sistema de autenticación de Supabase
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });

  if (error) throw error;

  // Insertar datos adicionales en la tabla `users`
  const { error: insertError } = await supabase
    .from('users')
    .insert([
      {
        id: user.id,       // Usamos el `id` de usuario creado en el sistema de autenticación
        name: name,
        email: email,
        creation_date: new Date()  // Fecha de creación (opcional)
      },
    ]);

  if (insertError) throw insertError;

  return user;
};

// Sign in function
const signIn = async (email, password) => {
  const { session, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return session;
};

// Sign out function
const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

module.exports = { signUp, signIn, signOut };
