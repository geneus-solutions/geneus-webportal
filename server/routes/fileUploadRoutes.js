import express from 'express';
import multer from 'multer';
import { applyJob } from '../controllers/fileUploadController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/resumes"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post("/apply", upload.single("resume"), applyJob);

export default router;