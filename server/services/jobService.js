import Job from "../models/Job.js";
import { v4 as uuidv4 } from "uuid";


const parseArray = (input) => {
  if (Array.isArray(input)) return input.filter((i) => i && i.trim() !== "");
  if (typeof input === "string" && input.trim() !== "") {
    try {
      const parsed = JSON.parse(input);
      if (Array.isArray(parsed)) return parsed.filter((i) => i && i.trim() !== "");
    } catch {}
    return input
      .split(",")
      .map((i) => i.trim())
      .filter((i) => i !== "");
  }
  return [];
};

// ------------------- DB Operations ----------------------

export const fetchJobs = async (filter, page, limit) => {
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

  return { jobs, total, limitNum };
};


export const fetchJobById = async (id) => {
  return await Job.findById(id).lean();
};


export const createJobInDB = async (data) => {
  const {
    title,
    desc,
    about,
    location = "100% remote",
    employmentType = "Full-time",
    department,
    isRemote = true,
    isActive = true,
    qualifications,
    responsibilities,
    duration,
    stipend,
    applyBy,
    skills,
    otherRequirements,
    perks,
    openings,
    salaryRange,
    applicationLink,
  } = data;


  if (!title) throw new Error("Title is required");
  if (!desc) throw new Error("Description (desc) is required");
  if (!about) throw new Error("About is required");

  const trimmedTitle = String(title).trim();
  const trimmedDesc = String(desc).trim();
  const trimmedAbout = String(about).trim();

  
  const existingJob = await Job.findOne({ title: trimmedTitle });
  if (existingJob) throw new Error("A job with this title already exists");

  const job = await Job.create({
    title: trimmedTitle,
    desc: trimmedDesc,
    about: trimmedAbout,
    location: typeof location === "string" ? location.trim() : "100% remote",
    employmentType,
    department,
    isRemote,
    isActive,
    qualifications: parseArray(qualifications),
    responsibilities: parseArray(responsibilities),
    skills: parseArray(skills),
    perks: parseArray(perks),

   
    duration: duration || "Full-time (Permanent)",
    stipend: stipend || null,
    applyBy: applyBy || null,
    otherRequirements: otherRequirements || "",
    openings: openings || 1,
    applicationLink: applicationLink || null,

   
    salaryRange: {
      min: salaryRange?.min ? Number(String(salaryRange.min).replace(/,/g, "")) : null,
      max: salaryRange?.max ? Number(String(salaryRange.max).replace(/,/g, "")) : null,
      currency: salaryRange?.currency || "USD",
    },
  });

  return job;
};