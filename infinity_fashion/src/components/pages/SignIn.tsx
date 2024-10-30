import { useState } from 'react';
import useValidation from '../../hooks/useValidation';
import useUser from '../../hooks/useUser'; // Importa tu hook de usuario
import styles from './signIn.module.css';
import googleLogo from '../../assets/SignInSignUp/googleLogo.png';
import infinityLogo from '../../assets/Home/logoWithOutBackground.png';
import eyeOpenIcon from '../../assets/Home/eyeOpenIcon.png';
import eyeClosedIcon from '../../assets/Home/eyeClosedIcon.png';
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from '../../firebaseConfig';

const SignIn = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const { user, handleInputChange } = useUser(); // Usamos el hook para el manejo del estado del usuario
  const { errors: signUpErrors, validateSignUp } = useValidation(); // Errores para Sign Up
  const { errors: signInErrors, validateSignIn } = useValidation(); // Errores para Sign In
  const [showPasswordSignUp, setShowPasswordSignUp] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordSignIn, setShowPasswordSignIn] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleGoogleAuth = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const { displayName, email } = result.user;

    if (!isRightPanelActive) {
      // Modo Sign In
       const response = await fetch('http://localhost:3000/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }), // Solo enviamos el email en el caso de Google
        });

        const data = await response.json();
        if (response.ok) {
          alert(data.message); // Inicio de sesión exitoso
        } else {
          alert("Este usuario no está registrado. Por favor, regístrese primero.");
        }
    } else {
      // Modo Sign Up
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: displayName, email, password: '' }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message); // Registro exitoso
      } else {
        alert(data.message); // Error en el registro (usuario ya registrado)
      }
    }
  } catch (error) {
    console.error("Error con la autenticación de Google:", error);
    alert("Error con la autenticación de Google. Por favor, inténtelo de nuevo.");
  }
};
  const togglePasswordVisibilitySignUp = () => {
    setShowPasswordSignUp(!showPasswordSignUp);
  };

  const togglePasswordVisibilitySignIn = () => {
    setShowPasswordSignIn(!showPasswordSignIn);
  };

  const toggleVisibilityConfirmPassword = () => {
    setShowConfirmPassword(!showPasswordSignUp);
  };


  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateSignIn(user.email, user.password)) {
      // Lógica para el inicio de sesión si es válido
      try {
        const response = await fetch('http://localhost:3000/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.email,
            password: user.password,
          }),
        });
        const data = await response.json();
        alert(data.message);
      } catch (error) {
        console.error('Error:', error);
      }

      console.log('Sign In data:', { email: user.email, password: user.password });
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateSignUp(user.name, user.email, user.password, confirmPassword)) {
      // Lógica para el registro si es válido
      try {
        const response = await fetch('http://localhost:3000/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            password: user.password,
          }),
        });
        const data = await response.json();
        alert(data.message);
      } catch (error) {
        console.error('Error:', error);
      }
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
            <a href="#" className={styles.social} onClick={handleGoogleAuth}>
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
          <div className={styles.passwordContainer}>
            <input
              type={showPasswordSignUp ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              className={signUpErrors.password && isRightPanelActive ? `${styles.inputError}` : ''}
            />
            <span onClick={togglePasswordVisibilitySignUp} className={styles.eyeIcon}>
              <img
                src={showPasswordSignUp ? eyeOpenIcon : eyeClosedIcon}
                alt={showPasswordSignUp ? "Hide password" : "Show password"}
                className={styles.eyeImage}
              />
            </span>
          </div>
          {renderErrors(signUpErrors.password)}
          <div className={styles.passwordContainer}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={signUpErrors.confirmPassword && isRightPanelActive ? `${styles.inputError}` : ''}
            />
            <span onClick={toggleVisibilityConfirmPassword} className={styles.eyeIcon}>
              <img
                src={showConfirmPassword ? eyeOpenIcon : eyeClosedIcon}
                alt={showConfirmPassword ? "Hide password" : "Show password"}
                className={styles.eyeImage}
              />
            </span>
          </div>
          {renderErrors(signUpErrors.confirmPassword)}
          <button type="submit">Sign Up</button>
        </form>
      </div>

      {/* Contenedor de Sign In */}
      <div className={`${styles.formContainer} ${styles.signInContainer}`}>
        <form onSubmit={handleSignInSubmit}>
          <h1>Sign in</h1>
          <div className={styles.socialContainer}>
            <a href="#" className={styles.social} onClick={handleGoogleAuth}>
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

          <div className={styles.passwordContainer}>
            <input
              type={showPasswordSignIn ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              className={signInErrors.password && !isRightPanelActive ? `${styles.inputError}` : ''}
            />
            <span onClick={togglePasswordVisibilitySignIn} className={styles.eyeIcon}>
              <img
                src={showPasswordSignIn ? eyeOpenIcon : eyeClosedIcon}
                alt={showPasswordSignIn ? "Hide password" : "Show password"}
                className={styles.eyeImage}
              />
            </span>
          </div>
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
