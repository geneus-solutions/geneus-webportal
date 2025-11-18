import JobApplication from "../models/JobApplication.js";

export const createJobApplication = async (data, file) => {
  const { name, email, phone, college, degreeBranch, currentSemester } =
    data;

  if (
    !name ||
    !email ||
    !phone ||
    !college ||
    !degreeBranch ||
    !currentSemester
  ) {
    throw new Error("Missing required fields");
  }

  if (!file) {
    throw new Error("Resume file is required");
  }

  const application = new JobApplication({
    name,
    email,
    phone,
    college,
    degreeBranch,
    currentSemester,
    resume: file.buffer,
    resumeName: file.originalname,
    resumeMimeType: file.mimetype,
  });

  await application.save();
  return application;
};
