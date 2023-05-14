import { addAssessment, updateAssessment, deleteAssessment, getAssessment, generateGrade } from "../Controllers/TeacherFunctionality/AssessmentController.js";
import { getAttendance, addAttendance, updateAttendance, deleteAttendance } from "../Controllers/TeacherFunctionality/AttendanceController.js";
import { ViewAnonymizedFeedback } from "../Controllers/TeacherFunctionality/FeedbackController.js";

import express from "express";
const router = express.Router();

router.post("/addAssessment", addAssessment);
router.put("/updateAssessment", updateAssessment);
router.delete("/deleteAssessment", deleteAssessment);
router.get("/getAssessment", getAssessment);

router.post("/generateGrade", generateGrade);

router.get("/getAttendance", getAttendance);
router.post("/addAttendance", addAttendance);
router.put("/updateAttendance", updateAttendance);
router.delete("/deleteAttendance", deleteAttendance);

router.get("/ViewAnonymizedFeedback", ViewAnonymizedFeedback);

export default router;