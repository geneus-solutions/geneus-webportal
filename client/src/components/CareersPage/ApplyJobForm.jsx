import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useGetJobByIdQuery } from "../../features/careers/careersSlice";

const ApplyJobForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  
  const { data: job, isLoading, isError } = useGetJobByIdQuery(id);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    college: "",
    degreeBranch: "",
    currentSemester: "",
    resume: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);



  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-lg font-medium">Loading job details...</p>
      </div>
    );
  }

  if (isError || !job) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
  <motion.h1
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, type: "spring" }}
   className="text-7xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg"
  >
    404
  </motion.h1>

  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.6 }}
    className="text-lg text-gray-600 mt-3"
  >
    Job Not Found
  </motion.p>
  </div>
    );
  }


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setFormData({ ...formData, resume: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const {
      name,
      phone,
      email,
      college,
      degreeBranch,
      currentSemester,
      resume,
    } = formData;

    if (!name || !phone || !email || !college || !degreeBranch || !currentSemester || !resume) {
      setError("All fields are required");
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append("name", name);
    formDataObj.append("phone", phone);
    formDataObj.append("email", email);
    formDataObj.append("college", college);
    formDataObj.append("degreeBranch", degreeBranch);
    formDataObj.append("currentSemester", currentSemester);
    formDataObj.append("resume", resume);
    formDataObj.append("jobId", id);

    try {
      setLoading(true);
      const backendUrl =
        process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

      const res = await axios.post(
        `${backendUrl}/api/applications/apply`,
        formDataObj);

      if (res.data.success) {
        setSuccess(true);
        setFormData({
          name: "",
          phone: "",
          email: "",
          college: "",
          degreeBranch: "",
          currentSemester: "",
          resume: null,
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-12"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Apply for : {job?.title}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3 text-sm">
        
        {/* Full Name */}
        <div>
          <label className="block font-medium mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            className="w-full border rounded-lg px-3 py-2"
            onChange={handleChange}
            value={formData.name}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            className="w-full border rounded-lg px-3 py-2"
            onChange={handleChange}
            value={formData.email}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block font-medium mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            className="w-full border rounded-lg px-3 py-2"
            onChange={handleChange}
            value={formData.phone}
          />
        </div>

        {/* Degree + College */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full items-center">
          <div>
            <label className="block font-medium mb-1">
              Degree <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="degreeBranch"
              className="w-full border rounded-lg px-3 py-2"
              onChange={handleChange}
              value={formData.degreeBranch}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              College/University <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="college"
              className="w-full border rounded-lg px-3 py-2"
              onChange={handleChange}
              value={formData.college}
            />
          </div>
        </div>

        {/* Current Semester */}
        <div>
          <label className="block font-medium mb-1">
            Current Semester / Graduation Year
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="currentSemester"
            className="w-full border rounded-lg px-3 py-2"
            onChange={handleChange}
            value={formData.currentSemester}
          />
        </div>

        {/* Resume */}
        <div>
          <label className="block font-medium mb-1">
            Upload Resume (PDF/DOC) <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            className="w-full"
            onChange={handleChange}
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && (
          <p className="text-green-600 text-sm">Application sent successfully!</p>
        )}

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </motion.button>

          <button
            type="button"
            className="text-gray-600 hover:underline"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ApplyJobForm;
