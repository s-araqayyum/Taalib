import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
    feedback: {
        type: String,
        required: true
    },
    studentID: {
        type: String,
        required: true
    },
    teacherID: {
        type: String,
        required: true
    },
    courseID: {
        type: String,
        required: true
    }
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);
export default Feedback;