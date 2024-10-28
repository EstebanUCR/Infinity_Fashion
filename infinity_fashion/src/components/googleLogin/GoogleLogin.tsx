import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import useGoogleLoginHook from './hooks/useGoogleLogin';

const CLIENT_ID = '842952608599-q59flbojjmr3j91796b35fjl6borapoj.apps.googleusercontent.com';

const GoogleLoginComponent = () => {
  const { user, error, login, signOut } = useGoogleLoginHook();

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div>
        {user ? (
          <div>
            <h2>Welcome, {user.name}</h2>
            <img src={user.picture} alt={user.name} />
            <p>Email: {user.email}</p>
            <p>Given Name: {user.givenName}</p>
            <p>Family Name: {user.familyName}</p>
            <button onClick={signOut}>Sign Out</button>
          </div>
        ) : (
          <button onClick={() => login()}>Sign In with Google</button>
        )}
        {error && <p>{error}</p>}
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;