import Attendance from "../../Models/AttendanceModel.js";
import { Student, Course } from "../../Models/StudentModel.js";

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
}

export const addAttendance = async (req, res) => {
    const { teacherID, courseID, date } = req.body;
  
    try {
      const students = await Student.find();
      for (const student of students) {
        for (const course of student.courses) {
          const wantedCourse = await Course.findOne({ name: course.name });
          if (wantedCourse != null) {
            if(wantedCourse._id == courseID){
              const attendanceRecords = students.map((student) => ({
                studentID: student._id,
                teacherID,
                courseID,
                date,
                isPresent: false,
              }));
          
              const createdAttendance = await Attendance.create(attendanceRecords);

              res.status(201).json({ success: true, attendance: createdAttendance });
            }
          }
        }
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
};

export const updateAttendance = async (req, res) => {
  const { studentID, teacherID, courseID, date, isPresent } = req.body;

  try {
    const attendance = await Attendance.findOneAndUpdate(
      { studentID, teacherID, courseID, date },
      { $set: { isPresent: true } },
      { new: true }
    );    

    console.log(attendance)

    if (!attendance) {
      return res.status(404).json({ success: false, error: 'Attendance record not found ⨉' });
    }
    res.status(200).json({ success: true, attendance });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update attendance ⨉' });
  }
};

export const deleteAttendance = (req, res) => {
    Attendance.deleteMany({ date: req.body.date, teacherID: req.body.teacherID, courseID: req.body.courseID })
        .then((attendance) => {
        res.status(200).json({ attendance: attendance });
        }
        )
        .catch((err) => {
        res.status(500).json({ err: err });
        }
        );
}