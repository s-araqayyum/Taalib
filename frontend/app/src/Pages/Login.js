import React, { useState } from 'react';
import taalib from './logo.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform login logic here
  };

  return (
    <div className="login">
      <img style={{ filter: 'invert(1)' }} src={taalib} alt="Taalib" />
      <h2>Login</h2>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
        </div>
        <button className="login-button" onClick={handleLogin}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
