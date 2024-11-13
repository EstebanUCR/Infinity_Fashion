import { useEffect, useState } from 'react';
import useValidation from '../../hooks/useValidation';
import useUser from '../../hooks/useUser'; // Importa tu hook de usuario
import styles from './signIn.module.css';
import googleLogo from '../../assets/SignInSignUp/googleLogo.png';
import infinityLogo from '../../assets/Home/logoWithOutBackground.png';
import eyeOpenIcon from '../../assets/Home/eyeOpenIcon.png';
import eyeClosedIcon from '../../assets/Home/eyeClosedIcon.png';
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from '../../firebaseConfig';
import { useUserContext } from '../Context/userContext';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import img1 from '../../assets/Home/logoWithOutBackground.png';
import Footer from '../footer/Footer';
import { signIn, signUp } from '../../services/apiService';

const SignIn = () => {

  const navigate = useNavigate();

  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const { user, handleInputChange } = useUser(); // Usamos el hook para el manejo del estado del usuario
  const { errors: signUpErrors, validateSignUp } = useValidation(); // Errores para Sign Up
  const { errors: signInErrors, validateSignIn } = useValidation(); // Errores para Sign In
  const [showPasswordSignUp, setShowPasswordSignUp] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordSignIn, setShowPasswordSignIn] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loginUser } = useUserContext();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
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
          localStorage.setItem('token', data.accessToken); // Guardamos el token en el localStorage
          const storagedCart = JSON.stringify(data.userCart.cart)
          if (typeof (storagedCart) === undefined || storagedCart === undefined) {
            localStorage.setItem('cart', JSON.stringify([]));
          } else {
            localStorage.setItem('cart', JSON.stringify(data.userCart.cart));
          }
          loginUser({ name: displayName || '', email: email || '' });
          localStorage.setItem('name', displayName || '');
          localStorage.setItem('email', email || '');
          navigate('/');
          location.reload();
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
          localStorage.setItem('token', data.accessToken); // Guardamos el token en el localStorage
          loginUser({ name: displayName || '', email: email || '' });
          localStorage.setItem('name', displayName || '');
          localStorage.setItem('email', email || '');
          navigate('/');
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
    setShowConfirmPassword(!showConfirmPassword);
  };

  const toggleForm = () => setIsRightPanelActive(!isRightPanelActive);
  // const handleSignInClick = () => {
  //   setIsRightPanelActive(false);
  // };

  // const handleSignUpClick = () => {
  //   setIsRightPanelActive(true);
  // };

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateSignIn(user.email, user.password)) {
      // Lógica para el inicio de sesión si es válido
      try {
        // const response = await fetch('http://localhost:3000/signin', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     email: user.email,
        //     password: user.password,
        //   }),
        // });
        // const data = await response.json();

        const data = await signIn(user.email, user.password);
        console.log(data)
        // localStorage.setItem('token', data.accessToken);
        // const storagedCart = JSON.stringify(data.userCart.cart)
        // if (typeof (storagedCart) === undefined || storagedCart === undefined) {
        //   localStorage.setItem('cart', JSON.stringify([]));
        // } else {
        //   localStorage.setItem('cart', JSON.stringify(data.userCart.cart));
        // }
        localStorage.setItem('token', data.accessToken);
        loginUser({ name: data.userName, email: user.email }); // Set user in context
        localStorage.setItem('name', data.userName);
        localStorage.setItem('email', user.email);
        alert(data.message);
        navigate('/');
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
        // const response = await fetch('http://localhost:3000/signup', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     name: user.name,
        //     email: user.email,
        //     password: user.password,
        //   }),
        // });
        // const data = await response.json();
        const data = await signUp(user.email, user.password, user.name)
        localStorage.setItem('token', data.accessToken);
        loginUser({ name: data.userName, email: user.email }); // Set user in context
        localStorage.setItem('name', user.name);
        localStorage.setItem('email', user.email);
        alert(data.message);
        navigate('/');
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
    <>
      <Container fluid className="logo-container">
        <img className="logo"
          src={img1}
          alt="Logo"
          onClick={() => navigate('/')}
        />
      </Container>

      <div className={`${styles.container} ${isRightPanelActive && !isMobile ? styles.rightPanelActive : ''}`} id="container">
        {isMobile ? (
          <div className={styles.formContainer}>
            {isRightPanelActive ? (
              <form onSubmit={handleSignUpSubmit}>
                <h1>Create Account</h1>
                <div className={styles.socialContainer}>
                  <a href="#" className={styles.social} onClick={handleGoogleAuth}>
                    <img src={googleLogo} alt="Google" className={styles.googleLogo} />
                  </a>
                </div>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={user.name}
                  onChange={handleInputChange}
                  className={signUpErrors.name ? `${styles.inputError}` : ''}
                />
                {renderErrors(signUpErrors.name)}
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  className={signUpErrors.email ? `${styles.inputError}` : ''}
                />
                {renderErrors(signUpErrors.email)}
                <div className={styles.passwordContainer}>
                  <input
                    type={showPasswordSignUp ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={user.password}
                    onChange={handleInputChange}
                    className={signUpErrors.password ? `${styles.inputError}` : ''}
                  />
                  <span onClick={togglePasswordVisibilitySignUp} className={styles.eyeIcon}>
                    <img src={showPasswordSignUp ? eyeOpenIcon : eyeClosedIcon} alt={showPasswordSignUp ? "Hide password" : "Show password"} className={styles.eyeImage} />
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
                    className={signUpErrors.confirmPassword ? `${styles.inputError}` : ''}
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
                <p>
                  Already have an account?{" "}
                  <span onClick={toggleForm} style={{ cursor: "pointer", color: "blue" }}>Sign In</span>
                </p>
              </form>
            ) : (
              <form onSubmit={handleSignInSubmit}>
                <h1>Sign in</h1>
                <div className={styles.socialContainer}>
                  <a href="#" className={styles.social} onClick={handleGoogleAuth}>
                    <img src={googleLogo} alt="Google" className={styles.googleLogo} />
                  </a>
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  className={signInErrors.email ? `${styles.inputError}` : ''}
                />
                {renderErrors(signInErrors.email)}
                <div className={styles.passwordContainer}>
                  <input
                    type={showPasswordSignIn ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={user.password}
                    onChange={handleInputChange}
                    className={signInErrors.password ? `${styles.inputError}` : ''}
                  />
                  <span onClick={togglePasswordVisibilitySignIn} className={styles.eyeIcon}>
                    <img src={showPasswordSignIn ? eyeOpenIcon : eyeClosedIcon} alt={showPasswordSignIn ? "Hide password" : "Show password"} className={styles.eyeImage} />
                  </span>
                </div>
                {renderErrors(signInErrors.password)}
                <button type="submit">Sign In</button>
                <p>
                  Don’t have an account?{" "}
                  <span onClick={toggleForm} style={{ cursor: "pointer", color: "blue" }}>Sign Up</span>
                </p>
              </form>
            )}
          </div>
        ) : (
          <>
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
                    <img src={showPasswordSignUp ? eyeOpenIcon : eyeClosedIcon} alt={showPasswordSignUp ? "Hide password" : "Show password"} className={styles.eyeImage} />
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
                    <img src={showPasswordSignIn ? eyeOpenIcon : eyeClosedIcon} alt={showPasswordSignIn ? "Hide password" : "Show password"} className={styles.eyeImage} />
                  </span>
                </div>
                {renderErrors(signInErrors.password)}
                <button type="submit">Sign In</button>
              </form>
            </div>

            <div className={styles.overlayContainer}>
              <div className={styles.overlay}>
                <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
                  <img src={infinityLogo} alt="Infinity" className={styles.companyLogo} />
                  <h1>Glad You're Back!</h1>
                  <h2>Please enter your login details to continue your journey</h2>
                  <button className={styles.ghost} onClick={() => setIsRightPanelActive(false)}>Sign In</button>
                </div>
                <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
                  <img src={infinityLogo} alt="Infinity" className={styles.companyLogo} />
                  <h1>Welcome Aboard!</h1>
                  <h2>Enter your personal details and start your journey with us</h2>
                  <button className={styles.ghost} onClick={() => setIsRightPanelActive(true)}>Sign Up</button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SignIn;