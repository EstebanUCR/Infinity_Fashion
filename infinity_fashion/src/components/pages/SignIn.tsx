import { useState } from 'react';
import styles from './signIn.module.css'; // Import your CSS module
import googleLogo from '../../assets/SignInSignUp/googleLogo.png';
import infinityLogo from '../../assets/Home/logoWithOutBackground.png'; ///
// reference of: https://codepen.io/technext/pen/PoprgzP

const SignIn = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  return (
    <div className={`${styles.container} ${isRightPanelActive ? styles.rightPanelActive : ''}`} id="container">
      {/* Contenedor de Sign Up */}
      <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
        <form action="#">
          <h1>Create Account</h1>
          <div className={styles.socialContainer}>
            <a href="#" className={styles.social}>
              <img src={googleLogo} alt="Google" className={styles.googleLogo} />
            </a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign Up</button>
        </form>
      </div>

      {/* Contenedor de Sign In */}
      <div className={`${styles.formContainer} ${styles.signInContainer}`}>
        <form action="#">
          <h1>Sign in</h1>
          <div className={styles.socialContainer}>
            <a href="#" className={styles.social}>
              <img src={googleLogo} alt="Google" className={styles.googleLogo} />
            </a>
          </div>
          <span>or use your account</span>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign In</button>
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
