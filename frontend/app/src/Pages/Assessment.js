import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Assessment = () => {

  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [teacherID, setTeacherID] = useState('');
  const [courseID, setCourseID] = useState('');
  const [assessment, setAssessment] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [studentAndMarks, setStudentAndMarks] = useState({});

  const getAssessment = () => {

    const token = localStorage.getItem('token'); 

    axios
      .post('http://localhost:3001/teacher/getAssessment', {
        date,
        teacherID,
        courseID
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response.data);
        setAssessment(response.data.assesment);
        if (date !== '') {
          if (response.data.assesment.length === 0) {
            alert('No assessment found for this date');
          }
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 403){
          navigate('/unauthorized');
        }
      });
  };

  const updateAssessment = (studentID, typeOfAssessment, date, obtainedMarks) => {

    const token = localStorage.getItem('token');
    axios
      .put('http://localhost:3001/teacher/updateAssessment', {
        studentID,
        obtainedMarks,
        teacherID,
        courseID,
        typeOfAssessment,
        date
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response.data);
        getAssessment();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteAssessment = () => {
    const token = localStorage.getItem('token');
    let typeOfAssessment = prompt("Enter the type of assessment you want to delete:")
    
    axios
      .delete('http://localhost:3001/teacher/deleteAssessment', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { date, teacherID, courseID, typeOfAssessment },
      })
      .then((response) => {
        console.log(response.data);
        getAssessment();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  const addAssessment = () => {

    const token = localStorage.getItem('token');
    let typeOfAssessment = prompt("Enter the type of assessment you want to add:")
    let totalMarks = prompt("Enter the total marks of the assessment:")
    let weightage = prompt("Enter the weightage of the assessment:")
    axios
      .post('http://localhost:3001/teacher/addAssessment', { teacherID, courseID, date, typeOfAssessment, totalMarks, weightage },
        {
          headers: {
            Authorization: `Bearer ${token}`
            }
            })
      .then((response) => {
        console.log(response.data);
        getAssessment(); 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const generateGrades = () => {
    const token = localStorage.getItem('token');
    if (courseID === '') {
      alert('Please enter course ID');
      return;
    }
    axios
      .post('http://localhost:3001/teacher/generateGrade', { courseID },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      .then((response) => {
        console.log(response.data);
        setStudentAndMarks(response.data.studentAndGrade);
        getAssessment(); 
        setShowPopup(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  

  return (
    <div className="assessment-container">

      <button className='logout-button' onClick={generateGrades}><img style={{height:"30px"}} src="https://cdn-icons-png.flaticon.com/512/2228/2228722.png"></img></button>
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
        View Assessment
      </button>

      <button className="assessment-cute-button" onClick={deleteAssessment}>
        Delete Assessment
      </button>

      <button className="assessment-cute-button" onClick={addAssessment}>
        Add Assessment
      </button>

      <div className="assessment-table">
        <table>
            <thead>
            <tr>
                <th>Student ID</th>
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
                <td>{assessment.studentID}</td>
                <td>{assessment.typeOfAssessment}</td>
                <td>{assessment.totalMarks}</td>
                <td>
                    <input
                        defaultValue={assessment.obtainedMarks}
                        onChange={(e) =>
                        updateAssessment(assessment.studentID, assessment.typeOfAssessment, assessment.date, e.target.value)
                        }
                    />
                </td>
                <td>{assessment.weightage}</td>
                <td>{assessment.date}</td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>

      {showPopup && (
        <div className="popup">
          <button className="close-button" onClick={()=>{setShowPopup(false)}}>
            X
          </button>
          <h2>Generated Grades</h2>
          {
            studentAndMarks.map((studentAndMark) => (
              <div key={studentAndMark._id}>
                <p><strong>Student ID:</strong> {studentAndMark.studentID}</p>
                <p><strong>Grade:</strong> {studentAndMark.letterGrade}</p>
              </div>
            ))
          }
        </div>
      )}

    </div>
  );
};

export default Assessment;
