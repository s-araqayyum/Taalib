import Feedback from "../../Models/FeedbackModel.js";

export const ViewAnonymizedFeedback = async (req, res) => {
    console.log('req.body from node.js ViewAnonymizedFeedback:', req.body);
    const teacherID = req.decoded.id;
    try {
        const feedback = await Feedback.find({teacherID, courseID: req.body.courseID });
        res.status(200).json({ success: true, feedback });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch feedback ⨉" });
    }
}
