import Teacher from "../../Models/TeacherModel.js";

export const findTeacher = async (req, res, next) => {
    let teacherID = req.decoded.id;
    const teacher = await Teacher.findOne({employeeId: teacherID});
    if (!teacher) {
        res.status(404).send({ message: 'Teacher not found' });
    } else {
        res.status(200).send({ teacher: teacher });
    }
  };