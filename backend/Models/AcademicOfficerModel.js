import mongoose from 'mongoose';

const AcademicOfficerSchema = new mongoose.Schema({
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
  role: {
    type: String,
    default: "AcademicOfficer",
    required: true
  },
  joiningDate: {
    type: Date,
    default: Date.now
  }
});

const AcademicOfficer = mongoose.model('AcademicOfficer', AcademicOfficerSchema);
export default AcademicOfficer;