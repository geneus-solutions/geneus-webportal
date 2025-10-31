import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRightIcon,
  MapPinIcon,
  ClockIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import "./Careers.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../features/careers/careersSlice";

const Careers = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.careers);

  const [activeCategory, setActiveCategory] = React.useState("All");
  const [showModal, setShowModal] = React.useState(false);
  const [selectedJob, setSelectedJob] = React.useState(null);

  const categories = [
    "All",
    "Development",
    "Design",
    "Marketing",
    "Customer Service",
    "Operations",
    "Finance",
    "Management",
  ];

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const filteredJobs =
    activeCategory === "All"
      ? jobs
      : jobs.filter((job) => job.department === activeCategory);

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        delay: i * 0.15,
      },
    }),
  };

  const categoryVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  return (
    <div className="careers-page">
      {/* Hiring Banner */}
      <div className="hiring-banner">
        <motion.button
          className="hiring-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          We're hiring
        </motion.button>
      </div>

      {/* Header */}
      <div className="careers-header text-center">
        <motion.h1
          className="careers-title"
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          Be part of our mission
        </motion.h1>
        <motion.p
          className="careers-subtitle"
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          We're looking for passionate people to join us on our mission. We
          value flat hierarchies, clear communication, and full ownership and
          responsibility.
        </motion.p>
      </div>

      {/* Category Filters */}
      <div className="category-filters">
        <div className="filters-container">
          <motion.button
            className="view-all-btn"
            onClick={() => setActiveCategory("All")}
            variants={categoryVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            View all
          </motion.button>

          {categories
            .filter((cat) => cat !== "All")
            .map((category) => (
              <motion.button
                key={category}
                className={`filter-btn ${
                  activeCategory === category ? "active" : ""
                }`}
                onClick={() => setActiveCategory(category)}
                variants={categoryVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                style={{
                  backgroundColor:
                    activeCategory === category ? "black" : "transparent",
                  color: activeCategory === category ? "white" : "black",
                }}
              >
                {category}
              </motion.button>
            ))}
        </div>
      </div>

      {/* Jobs List */}
      <section className="max-w-4xl mx-auto mt-10 px-6 divide-y divide-gray-200 relative z-10">
        {loading && (
          <p className="text-center py-10 text-gray-500">Loading...</p>
        )}
        {error && (
          <p className="text-center py-10 text-red-500">Error: {error}</p>
        )}
        {!loading && filteredJobs.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            {activeCategory === "All"
              ? "No jobs available at the moment."
              : `No jobs in ${activeCategory}.`}
          </p>
        )}

        {filteredJobs.map((job, index) => (
          <motion.div
            key={job._id || index}
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            custom={index}
            viewport={{ once: true, amount: 0.3 }}
            className="flex justify-between items-center py-6"
          >
            <div>
              <h3 className="text-lg font-semibold mb-1 text-gray-900">
                {job.title}
              </h3>
              <p className="text-gray-600 mb-3">{job.desc}</p>
              <div className="flex gap-3 text-sm text-gray-700">
                <span className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1">
                  <MapPinIcon className="w-4 h-4" /> {job.location}
                </span>
                <span className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1">
                  <ClockIcon className="w-4 h-4" /> {job.employmentType}
                </span>
              </div>
            </div>
            <motion.button
              whileHover={{ x: 3 }}
              className="flex items-center gap-1 text-gray-800 font-medium"
              onClick={() => handleApplyClick(job)}
            >
              Apply <ArrowUpRightIcon className="w-4 h-4" />
            </motion.button>
          </motion.div>
        ))}
      </section>

      {/* Job Popup Modal */}
      <AnimatePresence>
        {showModal && selectedJob && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-6 relative"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-bold mb-2">{selectedJob.title}</h2>
              <p className="text-gray-600 mb-4">
                {selectedJob.desc}
              </p>

              <div className="flex flex-wrap gap-3 text-sm text-gray-700 mb-4">
                <span className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1">
                  <MapPinIcon className="w-4 h-4" /> {selectedJob.location}
                </span>
                <span className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1">
                  <ClockIcon className="w-4 h-4" /> {selectedJob.employmentType}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-black text-white rounded-full py-2 font-medium"
              >
                Apply Now
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

       {/* Testimonial */}
      <motion.section
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="text-center py-20 bg-gradient-to-b from-white to-gray-50 relative z-10"
      >
        <p className="text-2xl font-semibold text-gray-800 max-w-2xl mx-auto leading-snug">
          “Untitled truly values work-life balance. We work hard and deliver,
          but at the end of the day you can switch off.”
        </p>
        <div className="mt-6">
          <img
            src="https://randomuser.me/api/portraits/women/75.jpg"
            alt="Testimonial"
            className="w-12 h-12 rounded-full mx-auto mb-2"
          />
          <p className="font-semibold">Frankie Sullivan</p>
          <p className="text-sm text-gray-600">Web Developer, Untitled</p>
        </div>
      </motion.section>

      {/* Footer Links */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="bg-gray-100 text-black text-sm py-3 px-4 md:px-8 flex flex-wrap justify-center gap-x-4 gap-y-2 font-medium tracking-wide"
      >
        <span>Subscribe to our newsletter</span>
        <span>•</span>
        <span>How it works</span>
        <span>•</span>
        <span>Documentation</span>
        <span>•</span>
        <span>Join the community</span>
        <span>•</span>
        <span>Releases</span>
        <span>•</span>
        <span>Support</span>
      </motion.div>

    </div>
  );
};

export default Careers;
