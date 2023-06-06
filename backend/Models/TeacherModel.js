import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    required: true,
  },
  taughtToClass: {
    type: Number,
    required: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
});


const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  employeeId: {
    type: String,
    required: true,
    unique: true
    },
  courses: {
    type: [CourseSchema],
    required: false
    },
    role: {
    type: String,
    default: "Teacher",
    required: true
  },
  joiningDate: {
    type: Date,
    default: Date.now
  },
    password: {
      type: String,
      required: true
    },
    isSalaryPaid:{
      type: Boolean,
      required: false,
      default: false
    }
});

const Teacher = mongoose.model('Teacher', TeacherSchema);
export default Teacher;
