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
  const [messageModal, setMessageModal] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: '',
  });

  const showMessage = (message: string) => {
    setMessageModal({ isOpen: true, message });
  };

  const closeMessage = () => {
    setMessageModal({ isOpen: false, message: '' });
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const executeSignIn = async (email: string, password: string, isGoogleAuth: boolean) => {
    try {
      const data = await signIn(email, password ?? '', isGoogleAuth);
      console.log(data)
      // localStorage.setItem('token', data.accessToken);
      // const storagedCart = JSON.stringify(data.userCart.cart)
      // if (typeof (storagedCart) === undefined || storagedCart === undefined) {
      //   localStorage.setItem('cart', JSON.stringify([]));
      // } else {
      //   localStorage.setItem('cart', JSON.stringify(data.userCart.cart));
      // }
      if (data.message === 'Login successful.') {
        localStorage.setItem('token', data.accessToken);
        loginUser({ name: data.userName, email: user.email }); // Set user in context
        localStorage.setItem('name', data.userName);
        localStorage.setItem('email', email);
        showMessage(data.message);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
      showMessage(data.message);
    } catch (error) {
      console.error('Error:', error);
      showMessage('An error occurred during sign-in.');
    }
  };


const executeSignUp = async (name: string, email: string, password: string) => {
  try {
    const data = await signUp(email, password, name);

    if (data && data.accessToken) {
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);

      showMessage('Registration successful.');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      // En caso de que el servidor no devuelva un token
      showMessage(data.message || 'Unexpected error during registration.');
    }
  } catch (error: any) {
    console.error('Error during signup:', error);

    // Mostrar errores más específicos si están disponibles
    if (error.response && error.response.data && error.response.data.message) {
      showMessage(error.response.data.message);
    } else {
      showMessage('An unexpected error occurred.');
    }
  }
};

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { displayName, email } = result.user;
      if (displayName && email) {
        if (!isRightPanelActive) {
          // Modo Sign In
          await executeSignIn(email, 'google', true);
        } else {
          // Modo Sign Up
          await executeSignUp(displayName, email, 'google');
        }
      }
    } catch (error) {
      console.error("Error con la autenticación de Google:", error);
      showMessage("Error with Google authentication.");
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
    if (validateSignIn(user.email, user.password ?? '')) {
      await executeSignIn(user.email, user.password ?? '', false);
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateSignUp(user.name, user.email, user.password ?? '', confirmPassword)) {
      await executeSignUp(user.name, user.email, user.password ?? '');
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
                    value={user.password ?? ''}
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
                    value={user.password ?? ''}
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
                    value={user.password ?? ''}
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
                    value={user.password ?? ''}
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

      {messageModal.isOpen && (
        <div className="modal">
          <div className={"modal-content"}>
            <p>{messageModal.message}</p>
            <button className="modal-close" onClick={closeMessage}>
              X
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default SignIn;