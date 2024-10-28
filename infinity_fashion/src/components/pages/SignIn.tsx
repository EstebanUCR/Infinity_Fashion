import { useState } from 'react';
import useValidation from '../../hooks/useValidation';
import useUser from '../../hooks/useUser'; // Importa tu hook de usuario
import styles from './signIn.module.css';
import googleLogo from '../../assets/SignInSignUp/googleLogo.png';
import infinityLogo from '../../assets/Home/logoWithOutBackground.png';

const SignIn = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const { user, handleInputChange } = useUser(); // Usamos el hook para el manejo del estado del usuario
  const { errors: signUpErrors, validateSignUp } = useValidation(); // Errores para Sign Up
  const { errors: signInErrors, validateSignIn } = useValidation(); // Errores para Sign In

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateSignIn(user.email, user.password)) {
      // Lógica para el inicio de sesión si es válido
      console.log('Sign In data:', { email: user.email, password: user.password });
    }
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateSignUp(user.name, user.email, user.password)) {
      // Lógica para el registro si es válido
      console.log('Sign Up data:', { name: user.name, email: user.email, password: user.password });
    }
  };

  // Función para renderizar errores
  const renderErrors = (errors: any) => {
    if (Array.isArray(errors)) {
      return (
        <ul className={styles.errorList}>
          {errors.map((error, index) => (
            <li key={index} className={styles.error}>{error}</li>
          ))}
        </ul>
      );
    }
    return errors ? <p className={styles.error}>{errors}</p> : null;
  };

  return (
    <div className={`${styles.container} ${isRightPanelActive ? styles.rightPanelActive : ''}`} id="container">
      {/* Contenedor de Sign Up */}
      <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
        <form onSubmit={handleSignUpSubmit}>
          <h1>Create Account</h1>
          <div className={styles.socialContainer}>
            <a href="#" className={styles.social}>
              <img src={googleLogo} alt="Google" className={styles.googleLogo} />
            </a>
          </div>
          <span>or use your email for registration</span>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            className={signUpErrors.name && isRightPanelActive ? `${styles.inputError}` : ''}
          />
          {renderErrors(signUpErrors.name)}
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            className={signUpErrors.email && isRightPanelActive ? `${styles.inputError}` : ''}
          />
          {renderErrors(signUpErrors.email)}
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            className={signUpErrors.password && isRightPanelActive ? `${styles.inputError}` : ''}
          />
          {renderErrors(signUpErrors.password)}
          <button type="submit">Sign Up</button>
        </form>
      </div>

      {/* Contenedor de Sign In */}
      <div className={`${styles.formContainer} ${styles.signInContainer}`}>
        <form onSubmit={handleSignInSubmit}>
          <h1>Sign in</h1>
          <div className={styles.socialContainer}>
            <a href="#" className={styles.social}>
              <img src={googleLogo} alt="Google" className={styles.googleLogo} />
            </a>
          </div>
          <span>or use your account</span>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            className={signInErrors.email && !isRightPanelActive ? `${styles.inputError}` : ''}
          />
          {renderErrors(signInErrors.email)}
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            className={signInErrors.password && !isRightPanelActive ? `${styles.inputError}` : ''}
          />
          {renderErrors(signInErrors.password)}
          <button type="submit">Sign In</button>
        </form>
      </div>

      {/* Overlay */}
      <div className={styles.overlayContainer}>
        <div className={styles.overlay}>
          <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
            <img src={infinityLogo} alt="Infinity" className={styles.companyLogo} />
            <h1>Glad You're Back!</h1>
            <h2>Please enter your login details to continue your journey</h2>
            <button className={styles.ghost} onClick={handleSignInClick}>Sign In</button>
          </div>
          <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
            <img src={infinityLogo} alt="Infinity" className={styles.companyLogo} />
            <h1>Welcome Aboard!</h1>
            <h2>Enter your personal details and start your journey with us</h2>
            <button className={styles.ghost} onClick={handleSignUpClick}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
