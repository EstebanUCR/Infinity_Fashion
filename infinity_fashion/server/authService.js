const { supabase } = require('./supabaseClient');
const bcrypt = require('bcrypt');

// Sign up function

const signUp = async (email, password, name) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Registrar al usuario en el sistema de autenticación de Supabase
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });

  if (error) throw error;

  console.log(data)

  // Insertar datos adicionales en la tabla `users`
  const { error: insertError } = await supabase
    .from('users')
    .insert([
      {
        id: data.user.id,       // Usamos el `id` de usuario creado en el sistema de autenticación
        name: name,
        email: email,
        password_hash: passwordHash,
        creation_date: new Date()  // Fecha de creación (opcional)
      },
    ]);

  if (insertError) throw insertError;
  
  return data;
};

// Sign in function
const signIn = async (email, password) => {
  // Buscar el usuario en la base de datos
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !user) throw new Error('Usuario no encontrado');
  
  // Verificar la contraseña
  const passwordMatch = await bcrypt.compare(password, user.password_hash);
  if (!passwordMatch) throw new Error('Contraseña incorrecta');

  // Si la contraseña es correcta, iniciar sesión con Supabase Auth
  const { session, signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (signInError) throw signInError;
  console.log('Usuario encontrado en signIn:', user.name); 
  return user;
};

// Sign out function
const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};


module.exports = { signUp, signIn, signOut };
