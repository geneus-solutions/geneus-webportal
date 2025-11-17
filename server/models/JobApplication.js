import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true, 
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  college: {
    type: String,
    required: true,
    trim: true,
  },
  degreeBranch: {
    type: String,
    required: true,
    trim: true,
  },
  currentSemester: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);
export default JobApplication;
