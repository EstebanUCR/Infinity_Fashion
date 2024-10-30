import { useState } from 'react';
import existingUsersData from '../assets/users/existing_users.json'; // Ruta al archivo JSON con los datos de usuarios existentes


const addUser = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  type User = {
        name: string;
        email: string;
        password: string;
      };

  const SignUp = (name: string, email: string, password: string) => {
    // Agregar el nuevo usuario a la lista de usuarios existentes
    const newUser: User = {
      name,
      email,
      password
    };
    
    if (existingUsersData.push(newUser)) {
      localStorage.setItem('users', JSON.stringify(newUser));
      console.log('New user added:', newUser);
      console.log('User logged in:', email);
      return true;
    } else {
      setErrors({ email: 'Error al crear usuario.' });
    }
    return false;
  };

  const SignIn = (email: string, password: string) => {
    // Lógica de inicio de sesión (si es necesario)
    // Verificar si el usuario ya existe y tomar los datos
    const user = existingUsersData.find((user) => user.email === email && user.password === password);

    if (user) {
      localStorage.setItem('users', JSON.stringify(user));
      console.log('User logged in:', email, " and ", password);
      return true;
    }
    setErrors({ email: 'Usuario o contraseña incorrectos.' });
    return false;
  };

  const GoogleSignIn = (email: string) => {
    // Lógica de inicio de sesión con Google (si es necesario)
    // Verificar si el usuario ya existe
    const user = existingUsersData.some((user) => user.email === email );
    if (user) {
      localStorage.setItem('users', JSON.stringify(user));
      console.log('User logged in:', email);
      return true;
    }
    setErrors({ email: 'Login error.' });
    return false;
  }

  return { errors, SignUp, SignIn, GoogleSignIn };
};

export default addUser;

