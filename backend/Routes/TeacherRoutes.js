import { addAssessment, updateAssessment, deleteAssessment, getAssessment, generateGrade } from "../Controllers/TeacherFunctionality/AssessmentController.js";
import { getAttendance, addAttendance, updateAttendance, deleteAttendance } from "../Controllers/TeacherFunctionality/AttendanceController.js";
import { ViewAnonymizedFeedback } from "../Controllers/TeacherFunctionality/FeedbackController.js";
import { login, DecodeUser } from "../Controllers/TeacherFunctionality/Authorization.js";

import express from "express";
const router = express.Router();

router.post("/login", login);

//All Assessment Routes
router.post("/addAssessment", addAssessment, (req,res)=>{
    res.status(200).send({"Message":"You've been authorized and authenticated to perform this action as a teacher"})
})
router.put("/updateAssessment", updateAssessment, (req,res)=>{
    res.status(200).send({"Message":"You've been authorized and authenticated to perform this action as a teacher"})
})
router.delete("/deleteAssessment", deleteAssessment, (req,res)=>{
    res.status(200).send({"Message":"You've been authorized and authenticated to perform this action as a teacher"})
})
router.post("/getAssessment", getAssessment, (req,res)=>{
    res.status(200).send({"Message":"You've been authorized and authenticated to perform this action as a teacher"})
})

//Grade Generation Route
router.post("/generateGrade", DecodeUser, generateGrade, (req,res)=>{
    res.status(200).send({"Message":"You've been authorized and authenticated to perform this action as a teacher"})
})


//All Attendance Routes
router.post("/addAttendance", addAttendance, (req,res)=>{
    res.status(200).send({"Message":"You've been authorized and authenticated to perform this action as a teacher"})
})

router.put("/updateAttendance", updateAttendance, (req,res)=>{
    res.status(200).send({"Message":"You've been authorized and authenticated to perform this action as a teacher"})
})
router.delete("/deleteAttendance", deleteAttendance, (req,res)=>{
    res.status(200).send({"Message":"You've been authorized and authenticated to perform this action as a teacher"})
})
router.post("/getAttendance", getAttendance, (req,res)=>{
    res.status(200).send({"Message":"You've been authorized and authenticated to perform this action as a teacher"})
})

//Feedback Route
router.post("/ViewAnonymizedFeedback", ViewAnonymizedFeedback, (req,res)=>{
    res.status(200).send({"Message":"You've been authorized and authenticated to perform this action as a teacher"})
})

export default router;