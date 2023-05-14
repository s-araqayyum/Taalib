import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
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
    },
    date: {
        type: String,
        required: true
    },
    isPresent: {
        type: Boolean,
        default: false
    },
},
{timestamps:true});

const Attendance = mongoose.model("Attendance", AttendanceSchema);
export default Attendance;