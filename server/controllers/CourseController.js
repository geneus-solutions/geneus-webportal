import Course from "../models/Course.js";
import { configDotenv } from "dotenv";
configDotenv();
const getCourse = async (req, res) => {
  try {
    const courses = await Course.find();
    console.log(courses.length);
    res.json(courses);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching courses" });
  }
};


export {
  getCourse
};
