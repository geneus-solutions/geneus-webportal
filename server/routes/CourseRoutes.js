import express from "express";
import {getCourse } from "../controllers/CourseController.js"

const router = express.Router();

router.get("/courses", getCourse);


export default router;