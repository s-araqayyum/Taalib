import mongoose from 'mongoose';

const AccountOfficerSchema = new mongoose.Schema({
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
    default: "AccountOfficer",
    required: true
  },
  joiningDate: {
    type: Date,
    default: Date.now
  }
});

const AccountOfficer = mongoose.model('AccountOfficer', AccountOfficerSchema);
export default AccountOfficer;