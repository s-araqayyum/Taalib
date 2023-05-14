import { addAssessment, updateAssessment, deleteAssessment, getAssessment, generateGrade } from "../Controllers/TeacherFunctionality/AssessmentController.js";
import { getAttendance, addAttendance, updateAttendance, deleteAttendance } from "../Controllers/TeacherFunctionality/AttendanceController.js";
import { ViewAnonymizedFeedback } from "../Controllers/TeacherFunctionality/FeedbackController.js";
import { login, DecodeUser } from "../Controllers/TeacherFunctionality/Authorization.js";

import express from "express";
const router = express.Router();

router.post("/login", login);

router.post("/addAssessment", DecodeUser, addAssessment, (req,res)=>{
    res.status(200).send({"Message":"You've been authorized and authenticated to perform this action as a teacher"})
})
router.put("/updateAssessment", DecodeUser, updateAssessment, (req,res)=>{
    res.status(200).send({"Message":"You've been authorized and authenticated to perform this action as a teacher"})
})
router.delete("/deleteAssessment", DecodeUser, deleteAssessment, (req,res)=>{
    res.status(200).send({"Message":"You've been authorized and authenticated to perform this action as a teacher"})
})
router.get("/getAssessment", DecodeUser, getAssessment, (req,res)=>{
    res.status(200).send({"Message":"You've been authorized and authenticated to perform this action as a teacher"})
})

router.post("/generateGrade", DecodeUser, generateGrade, (req,res)=>{
    res.status(200).send({"Message":"You've been authorized and authenticated to perform this action as a teacher"})
})

router.post("/addAttendance", DecodeUser, addAttendance, (req,res)=>{
    res.status(200).send({"Message":"You've been authorized and authenticated to perform this action as a teacher"})
})
router.put("/updateAttendance", DecodeUser, updateAttendance, (req,res)=>{
    res.status(200).send({"Message":"You've been authorized and authenticated to perform this action as a teacher"})
})
router.delete("/deleteAttendance", DecodeUser, deleteAttendance, (req,res)=>{
    res.status(200).send({"Message":"You've been authorized and authenticated to perform this action as a teacher"})
})
router.get("/getAttendance", DecodeUser, getAttendance, (req,res)=>{
    res.status(200).send({"Message":"You've been authorized and authenticated to perform this action as a teacher"})
})

router.get("/ViewAnonymizedFeedback", DecodeUser, ViewAnonymizedFeedback, (req,res)=>{
    res.status(200).send({"Message":"You've been authorized and authenticated to perform this action as a teacher"})
})

export default router;