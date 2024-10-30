import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useState } from 'react';
import type { userData } from '../types/types';

const useGoogleAuth = () => {

  const [googleUser, setGoogleUser] = useState<userData | null>(null);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // TODO: revisar porque no agarra los datos del usuario.
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );
        const googleUser: userData = { email: userInfo.data.email, name: userInfo.data.name, password: null };
        console.log('Usuario de Google:', googleUser);
        setGoogleUser(googleUser);
      } catch (error) {
        console.error('Error al obtener la información del usuario de Google:', error);
      }
    },
    onError: (error) => console.error('Error al iniciar sesión con Google:', error),
  });

  const logout = () => {
    setGoogleUser(null);
    localStorage.removeItem('googleUser');
  };

  return { googleUser, googleLogin, logout };
};

export default useGoogleAuth;