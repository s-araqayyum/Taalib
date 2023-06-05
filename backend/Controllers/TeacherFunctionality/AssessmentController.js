import Assesment from "../../Models/AssessmentModel.js";
import { Student, Course } from "../../Models/StudentModel.js";

/*
For a teacher managing assessments, the following functions are required:
1. getAssessment: To view all assessments of all students in a course
2. addAssessment: To add an assessment item for all students in a course
3. updateAssessment: To update a particular assessment of a student in a course on a particular date
4. deleteAssessment: To delete an assessment item for all students in a course
*/

export const getAssessment = (req, res) => {
    console.log('req.body from node.js getAssessment:', req.body);
    let { date, teacherID, courseID } = req.body;
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
  const { teacherID, courseID, typeOfAssessment, totalMarks, weightage, date } = req.body;
  let assessmentCreated = false;
  let createdAssessment = null;

  try {
    const students = await Student.find();
    for (const student of students) {
      for (const course of student.courses) {
        const wantedCourse = await Course.findOne({ name: course.name });
        if (wantedCourse != null) {
          if (wantedCourse._id == courseID) {
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
            assessmentCreated = true;
            break;
          }
        }
      }
      if (assessmentCreated) {
        break;
      }
    }

    if (assessmentCreated) {
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
    const { studentID, teacherID, courseID, typeOfAssessment, obtainedMarks, date } = req.body;
  
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
    const { teacherID, courseID, typeOfAssessment, date } = req.query;
  
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
    const { teacherID, courseID, studentID } = req.body;
  
    try {
      const assessment = await Assesment.find({ teacherID, courseID, studentID });
      
      if (!assessment) {
        res.status(404).json({ success: false, error: 'Assessment record not found ⨉' });
      }

      let totalGrade = 0;
      let totalWeightage = 0;

      assessment.forEach((assessment) => {
        const { obtainedMarks, totalMarks, weightage } = assessment;
        totalGrade += (obtainedMarks / totalMarks) * weightage;
        totalWeightage += weightage;
      });

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

      res.status(200).json({ success: true, letterGrade });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to generate grade ⨉' });
    }
}