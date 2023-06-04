import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Assessment = () => {
    
  const [date, setDate] = useState('');
  const [teacherID, setTeacherID] = useState('');
  const [courseID, setCourseID] = useState('');
  const [assessment, setAssessment] = useState([]);

  const getAssessment = () => {
    axios
      .post('http://localhost:3001/teacher/getAssessment', {
        date,
        teacherID,
        courseID
      })
      .then((response) => {
        console.log(response.data);
        setAssessment(response.data.assesment);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div className="assessment-container">
      <img
        src="https://static.vecteezy.com/system/resources/previews/002/175/944/non_2x/hands-doing-a-laptop-at-a-cafe-table-vector.jpg"
        alt="Background"
        className="background-image"
      />

      <div className="a-form-group">
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="form-input"
        />
      </div>

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
      <br />
      <button className="assessment-cute-button" onClick={getAssessment}>
        View Attendance
      </button>

      <table>
        <thead>
          <tr>
            <th>Type of Assessment</th>
            <th>Total Marks</th>
            <th>Obtained Marks</th>
            <th>Weightage</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {assessment.map((assessment) => (
            <tr key={assessment._id}>
              <td>{assessment.typeOfAssessment}</td>
              <td>{assessment.totalMarks}</td>
              <td>{assessment.obtainedMarks}</td>
              <td>{assessment.weightage}</td>
              <td>{assessment.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Assessment;
