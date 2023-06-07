import React from 'react';
import taalib from './logo.png'
import axios from 'axios';
import { useNavigate, Routes, Route } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  const handleLogOut = () => {
    navigate('/');
    localStorage.removeItem('token');
  };

  const handleProfileClick = () => {
    axios.get('http://localhost:3001/teacher/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response) => {
      console.log(response.data.teacher.name);
      let teacherName = response.data.teacher.name;
      alert("This is the profile of " + teacherName + "["+response.data.teacher.employeeId+"]");
      alert("Courses taught by " + teacherName + " are: " + response.data.teacher.courses.map(course => course.name).join(', '));

    })
    .catch((error) => {
      console.log(error);
    });
  };


  if (!localStorage.getItem('token')) {
    navigate('/unauthorized');
  }

  return (
    <div className="home">
      <button className="logout-button" onClick={handleLogOut}><img style={{height:'20px'}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/OOjs_UI_icon_logOut-ltr-invert.svg/1024px-OOjs_UI_icon_logOut-ltr-invert.svg.png"></img></button>
      
      <button className="profile-button" onClick={handleProfileClick}><img style={{height:'20px'}} src="https://icon-library.com/images/white-flower-icon/white-flower-icon-19.jpg"></img></button>

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
          <h3>Assessment</h3>
          <p>Manage Assessments for your courses</p>
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

export default Home;
