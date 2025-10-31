import express from 'express';
import { getAllJobs, getJobById, createJob } from '../controllers/jobController.js';

const router = express.Router();


router.get('/', getAllJobs);


router.get('/:id', getJobById);

router.post('/', createJob);

export default router;