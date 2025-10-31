import Job from "../models/Job.js";
import { v4 as uuidv4 } from "uuid";

const getAllJobs = async (req, res) => {
  try {
    const { search, location, type, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (search) filter.$text = { $search: search };
    if (location) filter.location = location;
    if (type) filter.type = type;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const limitNum = parseInt(limit);

    const [jobs, total] = await Promise.all([
      Job.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Job.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: jobs,
      pagination: {
        page: parseInt(page),
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error("getAllJobs error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findOne({ id }).lean();

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.json({ success: true, data: job });
  } catch (error) {
    console.error("getJobById error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const createJob = async (req, res) => {
  try {
    const {
      title,
      desc,
      about,
      location = "100% remote",
      employmentType = "Full-time",
      qualifications = [],
      responsibilities = [],
    } = req.body;

  

    if (!title || !desc) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const trimmedTitle = title.trim();
    const trimmedDesc = desc.trim();

    const existingJob = await Job.findOne({ title: trimmedTitle });
    if (existingJob) {
      return res.status(400).json({
        success: false,
        message: "A job with this title already exists",
      });
    }
    const parseArray = (input) => {
      if (Array.isArray(input))
        return input.filter((i) => i && i.trim() !== "");
      if (typeof input === "string" && input.trim() !== "") {
        try {
          const parsed = JSON.parse(input);
          if (Array.isArray(parsed))
            return parsed.filter((i) => i && i.trim() !== "");
        } catch {}
        return input
          .split(",")
          .map((i) => i.trim())
          .filter((i) => i !== "");
      }
      return [];
    };

    const qualificationsArray = parseArray(qualifications);
    const responsibilitiesArray = parseArray(responsibilities);

    const id = uuidv4();

    const aboutText = about && typeof about === "string" ? about.trim() : "";
    if (!aboutText) {
      return res.status(400).json({
        success: false,
        message: "About field is required",
      });
    }

    //---Create Job----------
    const job = await Job.create({
      title: trimmedTitle,
      desc: trimmedDesc,
      about: aboutText,
      location: location.trim(),
      employmentType,
      qualifications: qualificationsArray,
      responsibilities: responsibilitiesArray,
      id,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
    console.error("createJob error:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: messages,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export { getAllJobs, getJobById, createJob };
