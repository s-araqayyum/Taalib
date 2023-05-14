import mongoose from 'mongoose';

const CourseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    instructor: {
      type: String,
      required: true
    },    
    taughtToClass:{
      type: Number,
      required: true
    }
},
{timestamps:true}
);

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
      type: Number,
      required: true,
      unique: true
      },
    courses: {
      type: [CourseSchema],
      required: true
      },
      role: {
      type: String,
      default: "Teacher",
      required: true
    },
    joiningDate: {
      type: Date,
      default: Date.now
    }
},
{timestamps:true});

const Teacher = mongoose.model('Teacher', TeacherSchema);
export default Teacher;
