import express from 'express';
import multer from 'multer';
import { upload,applyJob } from '../controllers/fileUploadController.js';

const router = express.Router();

router.post("/apply", upload.single("resume"), applyJob);

export default router;