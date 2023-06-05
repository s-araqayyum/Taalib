import Assesment from "../../Models/AssessmentModel.js";
import { Student, Course } from "../../Models/StudentModel.js";
import Teacher from "../../Models/TeacherModel.js";

/*
For a teacher managing assessments, the following functions are required:
1. getAssessment: To view all assessments of all students in a course
2. addAssessment: To add an assessment item for all students in a course
3. updateAssessment: To update a particular assessment of a student in a course on a particular date
4. deleteAssessment: To delete an assessment item for all students in a course
*/

export const getAssessment = (req, res) => {
    console.log('req.body from node.js getAssessment:', req.body);
    let { date, courseID } = req.body;
    let teacherID = req.decoded.id;
    Assesment.find({ date:date, teacherID: teacherID, courseID: courseID })
        .then((assesment) => {
        res.status(200).json({ assesment: assesment });
        }
        )
        .catch((err) => {
        res.status(500).json({ err: err });
        }
        );
}
export const addAssessment = async (req, res) => {
  console.log('req.body from node.js addAssessment:', req.body);
  const { courseID, typeOfAssessment, totalMarks, weightage, date } = req.body;
  console.log(req.decoded)
  let teacherID = req.decoded.id;
  let createdAssessment = null;

  const teacher = await Teacher.findOne({employeeId: teacherID});
  console.log(teacher._id)
  try {
    const students = await Student.find({ 'courses._id': courseID, "courses.instructor": teacher._id });
    console.log(students)
    const assessmentRecords = students.map((student) => ({
      studentID: student._id,
      teacherID,
      courseID,
      typeOfAssessment,
      totalMarks,
      obtainedMarks: 0,
      weightage,
      date
    }));

    createdAssessment = await Assesment.create(assessmentRecords);

    if (createdAssessment.length > 0) {
      res.status(201).json({ success: true, assessment: createdAssessment });
    } else {
      res.status(404).json({ success: false, error: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create assessment item' });
  }
}

export const updateAssessment = async (req, res) => {
    console.log('req.body from node.js updateAssessment:', req.body);
    const { studentID, courseID, typeOfAssessment, obtainedMarks, date } = req.body;
    let teacherID = req.decoded.id;

    try {
      const assessment = await Assesment.findOneAndUpdate(
        { studentID, teacherID, courseID, typeOfAssessment, date },
        { $set: { obtainedMarks: obtainedMarks } },
        { new: true }
      );
  
      if (!assessment) {
        return res.status(404).json({ success: false, error: 'Assessment record not found ⨉' });
      }
  
      res.status(200).json({ success: true, assessment });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to update assessment ⨉' });
    }
};

export const deleteAssessment = async (req, res) => {
    console.log('req.body from node.js deleteAssessment:', req.query);
    const { courseID, typeOfAssessment, date } = req.query;
    let teacherID = req.decoded.id;
  
    try {
      const assessment = await Assesment.deleteMany({ teacherID, courseID, typeOfAssessment, date });
  
      if (!assessment) {
        return res.status(404).json({ success: false, error: 'Assessment record not found ⨉' });
      }
      res.status(200).json({ success: true, assessment });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to delete assessment ⨉' });
    }
}

export const generateGrade = async (req, res) => {
  console.log('req.body from node.js generateGrade:', req.body);
  const { courseID } = req.body;
  let teacherID = req.decoded.id;
  console.log(teacherID)

  try {
    const students = await Student.find({ 'courses._id': courseID });
    console.log(students)

    if (!students || students.length === 0) {
      return res.status(404).json({ success: false, error: 'No students found in the course' });
    }

    const studentAndGrade = await Promise.all(students.map(async (student) => {
      const assessment = await Assesment.findOne({ teacherID, courseID, studentID: student._id }).exec();

      if (!assessment) {
        return { studentID: student._id, letterGrade: 'N/A' };
      }

      let totalGrade = 0;
      let totalWeightage = 0;

      const { obtainedMarks, totalMarks, weightage } = assessment;
      totalGrade += (obtainedMarks / totalMarks) * weightage;
      totalWeightage += weightage;

      const finalGrade = (totalGrade / totalWeightage) * 100;

      let letterGrade = '';
      if (finalGrade >= 90) {
        letterGrade = 'A';
      } else if (finalGrade >= 80) {
        letterGrade = 'B';
      } else if (finalGrade >= 70) {
        letterGrade = 'C';
      } else if (finalGrade >= 60) {
        letterGrade = 'D';
      } else {
        letterGrade = 'F';
      }

      return { studentID: student._id, letterGrade };
    }));

    res.status(200).json({ success: true, studentAndGrade });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to generate grades' });
  }
};
