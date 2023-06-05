import Attendance from "../../Models/AttendanceModel.js";
import { Student, Course } from "../../Models/StudentModel.js";
import Teacher from "../../Models/TeacherModel.js";

/*
For a teacher managing attendance, the following functions are required:
1. getAttendance: To view the attendance of all students in a course on a particular date
2. addAttendance: To add attendance of a student in a course on a particular date
3. updateAttendance: To update attendance of a student in a course on a particular date
4. deleteAttendance: To delete attendance of a student in a course on a particular date

Much like Flex, the teacher would add attendances to the database for each student in a course on a particular date, displayed theoretically in
a list-like manner, which is by default set to false.
*/

export const getAttendance = (req, res) => {
    console.log('req.body from node.js getAttendance:', req.body);
    let { date, courseID } = req.body;
    let teacherID = req.decoded.id;
    Attendance.find({ date: date, teacherID: teacherID, courseID: courseID })
        .then((attendance) => {
        res.status(200).json({ attendance: attendance });
        }
        )
        .catch((err) => {
        res.status(500).json({ err: err });
        }
        );
}

export const addAttendance = async (req, res) => {
    console.log('req.body from node.js addAttendance:', req.body);
    const { courseID, date } = req.body;
    let teacherID = req.decoded.id;

    let createdAttendance = null;
    let attendanceCreated = false;

    const teacher = await Teacher.findOne({employeeId: teacherID});
    console.log(teacher._id)
  
    try {
      const students = await Student.find({ 'courses._id': courseID, "courses.instructor": teacher._id });
      const attendanceRecords = students.map((student) => ({
        studentID: student._id,
        teacherID,
        courseID,
        date,
        isPresent: false,
      }));
  
      createdAttendance = await Attendance.create(attendanceRecords);
      attendanceCreated = true;
      if (attendanceCreated) {
        res.status(201).json({ success: true, attendance: createdAttendance });
      } else {
        res.status(404).json({ success: false, error: 'Attendance Record not found' });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
};

export const updateAttendance = async (req, res) => {
  console.log('req.body from node.js update-Attendance:', req.body);
  const { studentID, courseID, date, isPresent } = req.body;
  let teacherID = req.decoded.id;

  try {
    const attendance = await Attendance.findOneAndUpdate(
      { studentID, teacherID, courseID, date },
      { $set: { isPresent } },
      { new: true }
    );    

    console.log('Updated attendance:', attendance);

    if (!attendance) {
      console.log('Attendance record not found');
      return res.status(404).json({ success: false, error: 'Attendance record not found ⨉' });
    }
    console.log('Attendance record updated successfully');
    res.status(200).json({ success: true, attendance });
  } catch (error) {
    console.log('Error updating attendance:', error);
    res.status(500).json({ success: false, error: 'Failed to update attendance ⨉' });
  }
};


export const deleteAttendance = (req, res) => {
    let teacherID = req.decoded.id;
    console.log('req.body from node.js deleteAttendance:', req.query);
    Attendance.deleteMany({ date: req.query.date, courseID: req.query.courseID })
        .then((attendance) => {
        res.status(200).json({ attendance: attendance });
        }
        )
        .catch((err) => {
        res.status(500).json({ err: err });
        }
        );
}