import React, { useState, useEffect } from 'react';
import axios from 'axios';
import taalib from './logo.png'

const Feedback = () => {

    const [teacherID, setTeacherID] = useState('');
    const [courseID, setCourseID] = useState('');
    const [feedback, setFeedback] = useState([]);
  
    useEffect(() => {
      fetchFeedback();
    }, []);
  
    const fetchFeedback = () => {
      axios
        .post('http://localhost:3001/teacher/viewAnonymizedFeedback', {
          teacherID,
          courseID
        })
        .then((response) => {
          console.log(response.data);
          setFeedback(response.data.feedback);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return (
        <div className="feedback">
            <img style={{ filter: 'invert(1)', height: '200px', width: '400px' }} src={taalib} alt="Taalib" />
            <div className="form-group">
                <label htmlFor="teacherID">Teacher ID:</label>
                <input
                type="text"
                id="teacherID"
                value={teacherID}
                onChange={(e) => setTeacherID(e.target.value)}
                className="form-input"
                />
            </div>

            <div className="form-group">
                <label htmlFor="courseID">Course ID:</label>
                <input
                type="text"
                id="courseID"
                value={courseID}
                onChange={(e) => setCourseID(e.target.value)}
                className="form-input"
                />
            </div>

            <button className="fetch-feedback-button" onClick={fetchFeedback}>
                Fetch Feedback
            </button>
            <br></br><br></br>
            <div className="feedback-cards">
                {feedback.map((item) => (
                <div className="feedback-card" key={item._id}>
                    <p className="feedback-text">{item.feedback}</p>
                </div>
                ))}
            </div>
        </div>
    );
}
export default Feedback;