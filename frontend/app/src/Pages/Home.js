import React from 'react';
import taalib from './logo.png'
import { Link, BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Attendance from './Attendance.js';
import Assessment from './Assessment.js';
import Feedback from './Feedback.js';

const Home = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="home">
      <img style={{ filter: 'invert(1)' }} src={taalib} alt="Taalib" />
      <div className="card" onClick={() => handleCardClick('/attendance')}>
        <img src="https://i.pinimg.com/originals/fb/12/e2/fb12e2015775ee45df3345cbf4562a01.gif" alt="Image 1" />
        <div className="card-content">
          <h3>Attendance</h3>
          <p>Manage Attendances for your courses</p>
        </div>
      </div>
      <div className="card" onClick={() => handleCardClick('/assessment')}>
        <img src="https://i.pinimg.com/originals/48/76/03/4876030bfd0f131e57fc00f9ff83a0fc.gif" alt="Image 2" />
        <div className="card-content">
          <h3>Assesment</h3>
          <p>Manage Assesments for your courses</p>
        </div>
      </div>
      <div className="card" onClick={() => handleCardClick('/feedback')}>
        <img src="https://img.wattpad.com/1b114aa47edb277ea30c87f6275083bb8d6f94f4/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f7156734f4b343639775a49566f513d3d2d3933383831333932382e313632643565383938343733353633363932303634373730393737302e676966" alt="Image 3" />
        <div className="card-content">
          <h3>Feedback</h3>
          <p>View feedback about yourself</p>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </Router>
  );
};

export default App;
