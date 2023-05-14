import { addAssessment, updateAssessment, deleteAssessment, getAssessment, generateGrade } from "../Controllers/TeacherFunctionality/AssessmentController.js";
import { getAttendance, addAttendance, updateAttendance, deleteAttendance } from "../Controllers/TeacherFunctionality/AttendanceController.js";
import { ViewAnonymizedFeedback } from "../Controllers/TeacherFunctionality/FeedbackController.js";

import express from "express";
const router = express.Router();

router.post("/addAssessment", addAssessment);
router.post("/updateAssessment", updateAssessment);
router.post("/deleteAssessment", deleteAssessment);
router.post("/getAssessment", getAssessment);

router.post("/generateGrade", generateGrade);

router.post("/getAttendance", getAttendance);
router.post("/addAttendance", addAttendance);
router.post("/updateAttendance", updateAttendance);
router.post("/deleteAttendance", deleteAttendance);

router.post("/ViewAnonymizedFeedback", ViewAnonymizedFeedback);

export default router;