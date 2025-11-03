import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const ApplyJobForm = () => {
  const { jobTitle } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    college: "",
    degreeBranch: "",
    currentSemester: "",
    tenthMarks: "",
    twelfthMarks: "",
    resume: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

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
      tenthMarks,
      twelfthMarks,
      resume,
    } = formData;

    if (
      !name ||
      !phone ||
      !email ||
      !college ||
      !degreeBranch ||
      !currentSemester ||
      !tenthMarks ||
      !twelfthMarks ||
      !resume
    ) {
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
    formDataObj.append("tenthMarks", tenthMarks);
    formDataObj.append("twelfthMarks", twelfthMarks);
    formDataObj.append("resume", resume);

    try {
      setLoading(true);
      const backendUrl =
        process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
      const res = await axios.post(
        `${backendUrl}/api/applications/apply`,
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        setSuccess(true);
        setFormData({
          name: "",
          phone: "",
          email: "",
          college: "",
          degreeBranch: "",
          currentSemester: "",
          tenthMarks: "",
          twelfthMarks: "",
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
        Apply for : {decodeURIComponent(jobTitle)}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-3 max-w-2xl mx-auto text-sm"
      >
        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            className="w-full border rounded-lg px-3 py-2"
            onChange={handleChange}
            value={formData.name}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border rounded-lg px-3 py-2"
            onChange={handleChange}
            value={formData.email}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            className="w-full border rounded-lg px-3 py-2"
            onChange={handleChange}
            value={formData.phone}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full items-center">
          <div>
            <label className="block font-medium mb-1">Degree</label>
            <input
              type="text"
              name="degreeBranch"
              className="w-full border rounded-lg px-3 py-2"
              onChange={handleChange}
              value={formData.degreeBranch}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">College</label>
            <input
              type="text"
              name="college"
              className="w-full border rounded-lg px-3 py-2"
              onChange={handleChange}
              value={formData.college}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full items-center">
          <div>
            <label className="block font-medium mb-1">Current Semester</label>
            <input
              type="text"
              name="currentSemester"
              className="w-full border rounded-lg px-3 py-2"
              onChange={handleChange}
              value={formData.currentSemester}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Tenth Marks(%)</label>
            <input
              type="text"
              name="tenthMarks"
              className="w-full border rounded-lg px-3 py-2"
              onChange={handleChange}
              value={formData.tenthMarks}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Twelfth Marks(%)</label>
            <input
              type="text"
              name="twelfthMarks"
              className="w-full border rounded-lg px-3 py-2"
              onChange={handleChange}
              value={formData.twelfthMarks}
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Upload Resume (PDF/DOC)
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
          <p className="text-green-600 text-sm">
            Application sent successfully!
          </p>
        )}

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
