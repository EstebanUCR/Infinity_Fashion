import React from 'react';
import './signIn.css';

const SignIn: React.FC = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        {/* Sección Izquierda */}
        <div className="login-left">
          <h2 className="mb-4">Sign In</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">USERNAME</label>
              <input type="text" className="form-control form-control-lg" id="username" placeholder="Username" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">PASSWORD</label>
              <input type="password" className="form-control form-control-lg" id="password" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-danger btn-lg w-100">Sign In</button>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div>
                <input type="checkbox" id="rememberMe" className="me-1" />
                <label htmlFor="rememberMe">Remember Me</label>
              </div>
              <a href="/" className="text-danger">Forgot Password?</a>
            </div>
          </form>
        </div>

        {/* Sección Derecha */}
        <div className="login-right">
          <h2 className="mb-4">Welcome to login</h2>
          <p>Don't have an account?</p>
          <button className="btn btn-outline-light btn-lg">Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
