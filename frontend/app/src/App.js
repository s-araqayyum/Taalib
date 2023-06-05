import './App.css';
import Home from './Pages/Home.js';
import Login from './Pages/Login.js';
import Attendance from './Pages/Attendance.js';
import Assessment from './Pages/Assessment.js';
import Feedback from './Pages/Feedback.js';
import Unauthorized from './Pages/Unauthorized.js';
import NotFound from './Pages/Notfound.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/unauthorized" element={<Unauthorized/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
