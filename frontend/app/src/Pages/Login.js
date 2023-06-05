import React, { useState } from 'react';
import axios from 'axios';
import taalib from './logo.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [showCard, setShowCard] = useState(false);
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleCardClick = () => {
    setShowCard(!showCard);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/teacher/login', {
        employeeId,
        password
      });
      console.log(response)
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        navigate('/home');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <img style={{ filter: 'invert(1)' }} src={taalib} alt="Taalib" onClick={handleCardClick} />
      <div className={`logincard ${showCard ? 'show' : ''}`}>
        <img src="https://cutewallpaper.org/25/anime-nature-gif-wallpaper/21-1b776-animated-4d674-nature-18601-ideas-89254-anime-cffe3-scenery-f86d2-aesthetic-2a855-anime-c0e04-aesthetic---gif.gif" alt="Image 1" />
        <div className="card-content">
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="Employee ID"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
