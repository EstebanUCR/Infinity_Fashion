import { useState } from 'react';
import { GoogleOAuthProvider, useGoogleLogin, googleLogout } from '@react-oauth/google';

const CLIENT_ID = '842952608599-q59flbojjmr3j91796b35fjl6borapoj.apps.googleusercontent.com';

interface UserProfile {
  id: string;
  name: string;
  givenName: string;
  familyName: string;
  email: string;
  picture: string;
}

const useGoogleLoginHook = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const login = useGoogleLogin({
    onSuccess: (response) => {
      const profile = response.profileObj;
      const userProfile: UserProfile = {
        id: profile.sub,
        name: profile.name,
        givenName: profile.given_name,
        familyName: profile.family_name,
        email: profile.email,
        picture: profile.picture,
      };
      setUser(userProfile);
      setError(null);
    },
    onError: () => {
      setError('Failed to log in');
      setUser(null);
    },
  });

  const signOut = () => {
    googleLogout();
    setUser(null);
    setError(null);
  };

  return {
    user,
    error,
    login,
    signOut,
  };
};

export default useGoogleLoginHook;