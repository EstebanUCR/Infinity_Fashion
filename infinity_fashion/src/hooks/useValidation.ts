import React, { useState, useEffect } from 'react';
import { userData } from '../types/types';
import { getExistingUsers } from '../services/apiService';


const useValidation = () => {
  const [errors, setErrors] = useState<{
    name: string;
    email: string;
    password: string | string[];
    confirmPassword?: string;
    phone?: string;
    shipping_address?: string;
    billing_address?: string;
  }>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    shipping_address: '',
    billing_address: '',
  });
  const [existingUsers, setExistingUsers] = useState<userData[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getExistingUsers();
        setExistingUsers(users);
      } catch (error) {
        console.error('Error fetching existing users:', error);
      }
    };

    fetchUsers();
  }, []);
  const validateSignUp = (name: string, email: string, password: string, confirmPassword: string) => {
    const errorsTemp: {
      name: string;
      email: string;
      password: string | string[];
      confirmPassword: string;
    } = { name: '', email: '', password: '', confirmPassword: '' };

    // Verificar si el email ya están registrados en la lista de usuarios existentes
    const isEmailTaken = existingUsers.some((user) => user.email === email);

    if (!name) {
      errorsTemp.name = 'Name is required';
    } else if (!/^[a-zA-Z0-9]+$/.test(name)) {
      errorsTemp.name = 'The name can only contain letters and numbers';
    }

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
      if (password.length > 12) {
        passwordErrors.push('Must not exceed 12 characters');
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

    if (confirmPassword !== password) {
      errorsTemp.confirmPassword = 'Passwords do not match';
    } else {
      errorsTemp.confirmPassword = ''; // Sin errores
    }

    setErrors(errorsTemp);
    return !errorsTemp.name && !errorsTemp.email && errorsTemp.password === '' && errorsTemp.confirmPassword === '';
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

    const isEmailTaken = existingUsers.some((user) => user.email === email);
    if (!isEmailTaken) {
      errorsTemp.email = 'This email is not registered';
    }

    setErrors(errorsTemp);
    return !errorsTemp.email;
  };

  const validateProfile = (userData: {
    name: string;
    phone: string | null;
    shipping_address: string | null;
    billing_address: string | null;
  }) => {
    const errorsTemp = {
      name: '',
      phone: '',
      shipping_address: '',
      billing_address: '',
      email: '', // Agregar email para cumplir con el tipo
      password: '', // Agregar password para cumplir con el tipo
      confirmPassword: '', // Agregar confirmPassword para cumplir con el tipo
    };

    // Validación de `name`
    if (!userData.name.trim()) {
      errorsTemp.name = 'Name is required';
    }

    // Validación de `phone`
    if (userData.phone) {
      if (!/^\d{8}$/.test(userData.phone)) {
        errorsTemp.phone = 'Phone must be exactly 8 digits';
      }
    }

    // Validación de `shipping_address`
    if (userData.shipping_address) {
      if (userData.shipping_address.length > 100) {
        errorsTemp.shipping_address = 'Shipping address must not exceed 50 characters';
      }
    }

    // Validación de `billing_address`
    if (userData.billing_address) {
      if (userData.billing_address.length > 100) {
        errorsTemp.billing_address = 'Billing address must not exceed 50 characters';
      }
    }

    setErrors(errorsTemp);

    // Retorna true si no hay errores
    return (
      !errorsTemp.name &&
      !errorsTemp.phone &&
      !errorsTemp.shipping_address &&
      !errorsTemp.billing_address
    );
  };

  return { errors, validateSignUp, validateSignIn, validateGoogleSignIn, validateProfile };

};

export default useValidation;
