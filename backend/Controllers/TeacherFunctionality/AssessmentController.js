import Assesment from "../../Models/AssessmentModel.js";
import { Student } from "../../Models/StudentModel.js";

/*
For a teacher managing assessments, the following functions are required:
1. getAssessment: To view all assessments of all students in a course
2. addAssessment: To add an assessment item for all students in a course
3. updateAssessment: To update a particular assessment of a student in a course on a particular date
4. deleteAssessment: To delete an assessment item for all students in a course
*/

export const getAssessment = (req, res) => {
    let { teacherID, courseID } = req.body;
    Assesment.find({ teacherID: teacherID, courseID: courseID })
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
    const { teacherID, courseID, typeOfAssessment, totalMarks } = req.body;
  
    try {
      const students = await Student.find({ courses: { $elemMatch: { _id: courseID } } });
  
      const assessmentRecords = students.map((student) => ({
        studentID: student._id,
        teacherID,
        courseID,
        typeOfAssessment,
        totalMarks,
        obtainedMarks: 0,
      }));
  
      const createdAssessment = await Assesment.create(assessmentRecords);
  
      res.status(201).json({ success: true, assessment: createdAssessment });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to create assessment ⨉' });
    }
}

export const updateAssessment = async (req, res) => {
    const { studentID, teacherID, courseID, typeOfAssessment, obtainedMarks } = req.body;
  
    try {
      const assessment = await Assesment.findOneAndUpdate(
        { studentID, teacherID, courseID, typeOfAssessment },
        { $set: { obtainedMarks: obtainedMarks } },
        { new: true }
      );
  
      if (!assessment) {
        return res.status(404).json({ success: false, error: 'Assessment record not found' });
      }
  
      res.status(200).json({ success: true, assessment });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to update assessment' });
    }
};
