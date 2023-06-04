import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Attendance = () => {
  
  const [date, setDate] = useState('');
  const [teacherID, setTeacherID] = useState('');
  const [courseID, setCourseID] = useState('');

  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    getAttendance();
  }, []); // Fetch attendance on initial load

  /*export const getAttendance = (req, res) => {
    console.log('req.body from node.js getAttendance:', req.body);
    let { date, teacherID, courseID } = req.body;
    Attendance.find({ date: date, teacherID: teacherID, courseID: courseID })
        .then((attendance) => {
        res.status(200).json({ attendance: attendance });
        }
        )
        .catch((err) => {
        res.status(500).json({ err: err });
        }
        );
} */

  const getAttendance = () => {
    axios
      .post('http://localhost:3001/teacher/getAttendance', {
         date, teacherID, courseID
      })
      .then((response) => {
        console.log(response.data);
        setAttendance(response.data.attendance);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const addAttendance = () => {
    axios
      .post('http://localhost:3001/teacher/addAttendance', { teacherID, courseID, date })
      .then((response) => {
        console.log(response.data);
        getAttendance(); // Refresh attendance after adding
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateAttendance = (studentID, isPresent) => {
    axios
      .put('http://localhost:3001/teacher/updateAttendance', { studentID, teacherID, courseID, date, isPresent })
      .then((response) => {
        console.log(response.data);
        getAttendance();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteAttendance = () => {
    axios
      .delete('http://localhost:3001/teacher/deleteAttendance', {
        params: { date, teacherID, courseID },
      })
      .then((response) => {
        console.log(response.data);
        getAttendance(); 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='attendance-container'>

      <img src="https://media3.giphy.com/media/WRRL1EKo9rNe12S4zh/giphy.gif?cid=6c09b952zfuqyjcn4it8vig8ajvxb1m3e77mxklf2bfw524x&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="Background" className="background-image" />

      <div className="form-group">
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

      <button className="cute-button" onClick={getAttendance}>View Attendance</button>
      <button className="cute-button" onClick={addAttendance}>Add Attendance</button>
      <button className="cute-button" onClick={deleteAttendance}>Delete Attendance</button>
      
      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Is Present</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((record) => (
              <tr key={record._id}>
                <td>{record.studentID}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={record.isPresent}
                    onChange={(e) => updateAttendance(record.studentID, e.target.checked)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
