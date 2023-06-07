import Feedback from "../../Models/FeedbackModel.js";
import Teacher from "../../Models/TeacherModel.js";

export const ViewAnonymizedFeedback = async (req, res) => {
    console.log('req.body from node.js ViewAnonymizedFeedback:', req.body);
    const teacherID = req.decoded.id;
    const teacher = await Teacher.findOne({employeeId: teacherID});
    try {
        console.log(teacher._id)
        const feedback = await Feedback.find({teacherID: teacher._id });
        res.status(200).json({ success: true, feedback });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch feedback ⨉" });
    }
}
