import { useState } from 'react';

// Cargar los datos desde el archivo JSON
import existingUsersData from '../assets/users/existing_users.json'; // Ruta al archivo JSON con los datos de usuarios existentes

const useValidation = () => {
  const [errors, setErrors] = useState<{
    name: string;
    email: string;
    password: string | string[];
  }>({
    name: '',
    email: '',
    password: '',
  });

  const validateSignUp = (name: string, email: string, password: string) => {
    const errorsTemp: {
      name: string;
      email: string;
      password: string | string[];
    } = { name: '', email: '', password: '' };

    // Verificar si el nombre o el email ya están registrados en la lista de usuarios existentes
    // const isNameTaken = existingUsersData.some((user) => user.name === name);
    const isEmailTaken = existingUsersData.some((user) => user.email === email);

    if (!name) {
      errorsTemp.name = 'Name is required';
    } else if (!/^[a-zA-Z0-9]+$/.test(name)) {
      errorsTemp.name = 'The name can only contain letters and numbers';
    } 
    /* 
    else if (isNameTaken) {
      errorsTemp.name = 'The name is already taken, please choose another one';
    } 
    */ 

    if (!email) {
      errorsTemp.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errorsTemp.email = 'Email is invalid';
    } else if (isEmailTaken) {
      errorsTemp.email = 'This email is already registered';
    }

    if (!password) {
      errorsTemp.password = 'Password is required';
    } else {
      const passwordErrors = [];

      if (password.length < 6) {
        passwordErrors.push('Must be at least 6 characters');
      }
      if (!/(?=.*[A-Z])(?=.*\d)/.test(password)) {
        passwordErrors.push('Must contain at least one uppercase letter and one number');
      }
      if (!/^[a-zA-Z0-9]+$/.test(password)) {
        passwordErrors.push('Can only contain letters and numbers');
      }

      // Si hay errores en los requisitos de la contraseña, los asignamos directamente
      if (passwordErrors.length > 0) {
        errorsTemp.password = passwordErrors;
      } else {
        errorsTemp.password = ''; // Sin errores, deja el campo vacío
      }
    }

    setErrors(errorsTemp);
    return !errorsTemp.name && !errorsTemp.email && errorsTemp.password === '';
  };

  const validateSignIn = (email: string, password: string) => {
    const errorsTemp: {
      name: string;
      email: string;
      password: string | string[];
    } = { name: '', email: '', password: '' };

    if (!email) {
      errorsTemp.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errorsTemp.email = 'Email is invalid';
    }
    if (!password) {
      errorsTemp.password = 'Password is required';
    }

    setErrors(errorsTemp);
    return !errorsTemp.email && errorsTemp.password === '';
  };

  const validateGoogleSignIn = (email: string) => {
    const errorsTemp: {
      name: string;
      email: string;
      password: string | string[];
    } = { name: '', email: '', password: '' };

    const isEmailTaken = existingUsersData.some((user) => user.email === email);
    if(!isEmailTaken) {
      errorsTemp.email = 'This email is not registered';
    }

    setErrors(errorsTemp);
    return !errorsTemp.email;
  };
  return { errors, validateSignUp, validateSignIn, validateGoogleSignIn };
};

export default useValidation;
