import {
  fetchJobs,
  fetchJobById,
  createJobInDB,
} from "../services/jobService.js";

export const getAllJobs = async (req, res) => {
  try {
    const { search, page = 1, limit = 10, location, type } = req.query;

    const filter = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (type) {
      filter.employmentType = type;
    }

    const { jobs, total, limitNum } = await fetchJobs(filter, page, limit);

    return res.status(200).json({
      success: true,
      total,
      count: jobs.length,
      page: Number(page),
      limit: limitNum,
      jobs,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await fetchJobById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const createJob = async (req, res) => {
  try {
    const job = await createJobInDB(req.body);

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
