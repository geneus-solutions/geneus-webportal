import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import gojeklogo from "../../assets/gojek-logo.webp";
import gopaylogo from "../../assets/gopay-logo.png";
import ovologo from "../../assets/ovo-logo.png";
import {
  ArrowUpRightIcon,
  MapPinIcon,
  ClockIcon,
  XMarkIcon,
  BookmarkIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import "./Careers.css";
import { useCareersQuery } from "../../features/careers/careersSlice";
import { useState } from "react";

const Careers = () => {
  const navigate = useNavigate();

  const { data: jobsData, isLoading, isError } = useCareersQuery();

  const jobs = Array.isArray(jobsData) ? jobsData : [];

  const [activeCategory, setActiveCategory] = React.useState("All");
  const [showModal, setShowModal] = React.useState(false);
  const [selectedJob, setSelectedJob] = React.useState(null);
  const [shareMenu, setShareMenu] = useState(false);

  const categories = [
    "All",
    "Development",
    "Design",
    "Marketing",
    "Customer Service",
    "Operations",
  ];

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

   navigate(
    `/careers?job=${encodeURIComponent(job.title)}`,
    { replace: false }
  );
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
        {isLoading && (
          <p className="text-center py-10 text-gray-500">Loading...</p>
        )}
        {isError && (
          <p className="text-center py-10 text-red-500">
            Failed to load jobs. Try again later.
          </p>
        )}

        {!isLoading && filteredJobs.length === 0 && (
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
            className="fixed inset-0 bg-black bg-opacity-40 flex items-start justify-center overflow-y-auto z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl mx-auto mt-10 mb-10 p-8 relative"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const shareUrl = `${
                  window.location.origin
                }/jobs/${encodeURIComponent(selectedJob.title)}`;

                const handleWhatsAppShare = () => {
                  const msg = `Check out this job: ${selectedJob.title}\n\n${shareUrl}`;
                  window.open(
                    `https://wa.me/?text=${encodeURIComponent(msg)}`,
                    "_blank"
                  );
                };

                const handleEmailShare = () => {
                  const subject = `Job Opportunity: ${selectedJob._id}`;
                  const body = `Hi,\n\nCheck out this job:\n\n${selectedJob.title}\n${shareUrl}`;
                  window.open(
                    `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(
                      subject
                    )}&body=${encodeURIComponent(body)}`,
                    "_blank"
                  );
                };

                return (
                  <>
                    {/* Close Button */}
                    <button
                      onClick={closeModal}
                      className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                    >
                      <XMarkIcon className="w-6 h-6" />
                    </button>

                    <div className="w-full flex justify-center">
                      <div className="max-w-6xl w-full px-4">
                        <div className="space-y-8">
                          {/* Header */}
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h2 className="text-3xl font-bold text-gray-900">
                                {selectedJob.title}
                              </h2>

                              <div className="flex items-center space-x-3">
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium shadow hover:bg-blue-700"
                                  onClick={() =>
                                    navigate(
                                      `/apply-job/${selectedJob._id}`
                                    )
                                  }
                                >
                                  Apply Now
                                </motion.button>

                                <div className="relative">
                                  <button
                                    title="Share Job"
                                    className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
                                    onClick={() =>
                                      setShareMenu((prev) => !prev)
                                    }
                                  >
                                    <ShareIcon className="w-5 h-5 text-gray-600" />
                                  </button>

                                  {shareMenu && (
                                    <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg w-48 p-2 z-50">
                                      <button
                                        className="w-full flex items-center gap-2 text-left px-3 py-2 hover:bg-gray-100 rounded"
                                        onClick={handleWhatsAppShare}
                                      >
                                        <img
                                          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                                          alt="WhatsApp"
                                          className="w-5 h-5"
                                        />
                                        <span>Share on WhatsApp</span>
                                      </button>

                                      <button
                                        className="w-full flex items-center gap-2 text-left px-3 py-2 hover:bg-gray-100 rounded"
                                        onClick={handleEmailShare}
                                      >
                                        <img
                                          src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png"
                                          alt="Gmail"
                                          className="w-5 h-5"
                                        />
                                        <span>Share on Gmail</span>
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            <p className="text-gray-600 mb-4">
                              {selectedJob.desc}
                            </p>

                            <div className="flex flex-wrap gap-3 text-sm text-gray-700 mb-4">
                              <span className="flex items-center gap-1 border border-black rounded-full px-3 py-1">
                                <MapPinIcon className="w-4 h-4" />
                                {selectedJob.location}
                              </span>

                              <span className="flex items-center gap-1 border border-black rounded-full px-3 py-1">
                                <ClockIcon className="w-4 h-4" />
                                {selectedJob.employmentType}
                              </span>
                            </div>
                          </div>

                          {/* Job Details Sections */}
                          <div className="text-gray-700 leading-relaxed">
                            <h3 className="font-semibold text-lg text-gray-900 mb-2">
                              About this role
                            </h3>
                            <p>{selectedJob.about}</p>
                          </div>

                          <div>
                            <h3 className="font-semibold text-lg text-gray-900 mb-2">
                              Qualifications
                            </h3>
                            {selectedJob?.qualifications?.length > 0 ? (
                              <ul className="list-disc list-inside space-y-1">
                                {selectedJob.qualifications.map(
                                  (item, index) => (
                                    <li key={index}>{item}</li>
                                  )
                                )}
                              </ul>
                            ) : (
                              <p className="text-gray-500 text-sm">
                                No qualifications listed.
                              </p>
                            )}
                          </div>

                          

                          <div>
                            <h3 className="font-semibold text-lg text-gray-900 mb-2">
                              Responsibilities
                            </h3>
                            {selectedJob?.responsibilities?.length > 0 ? (
                              <ul className="list-disc list-inside space-y-1">
                                {selectedJob.responsibilities.map(
                                  (item, index) => (
                                    <li key={index}>{item}</li>
                                  )
                                )}
                              </ul>
                            ) : (
                              <p className="text-gray-500 text-sm">
                                No responsibilities listed.
                              </p>
                            )}
                          </div>

                          
                            {/* Duration */}
                            {selectedJob.duration && (
                              <div>
                                <span className="font-semibold">
                                  Duration:{" "}
                                </span>
                                {selectedJob.duration}
                              </div>
                            )}

                            {/* Stipend */}
                            {selectedJob.stipend && (
                              <div>
                                <span className="font-semibold">Stipend: </span>
                                {selectedJob.stipend}
                              </div>
                            )}

                            {/* Salary range */}
                            {selectedJob.salaryRange && (
                              <div>
                                <span className="font-semibold">Salary: </span>
                                {selectedJob.salaryRange.min} -{" "}
                                {selectedJob.salaryRange.max}{" "}
                                {selectedJob.salaryRange.currency}
                              </div>
                            )}

                            {/* Apply by */}
                            {selectedJob.applyBy && (
                              <div>
                                <span className="font-semibold">
                                  Apply By:{" "}
                                </span>
                                {selectedJob.applyBy}
                              </div>
                            )}

                            {/* Skills Required */}
                            {selectedJob.skills?.length > 0 && (
                              <div>
                                <span className="font-semibold block mb-1">
                                  Skills Required:
                                </span>
                                <div className="flex flex-wrap gap-2">
                                  {selectedJob.skills.map((skill, index) => (
                                    <span
                                      key={index}
                                      className="px-3 py-1 bg-white border border-black rounded-full text-sm"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Other Requirements */}
                            {selectedJob.otherRequirements && (
                              <div>
                                <span className="font-semibold">
                                  Other Requirements:{" "}
                                </span>
                                <p className="text-gray-700">
                                  {selectedJob.otherRequirements}
                                </p>
                              </div>
                            )}

                            {/* Perks */}
                            {selectedJob.perks?.length > 0 && (
                              <div>
                                <span className="font-semibold block mb-1">
                                  Perks:
                                </span>
                                <ul className="list-disc list-inside space-y-1">
                                  {selectedJob.perks.map((perk, index) => (
                                    <li key={index}>{perk}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Number of openings */}
                            {selectedJob.openings && (
                              <div>
                                <span className="font-semibold">
                                  Number of openings:{" "}
                                </span>
                                {selectedJob.openings}
                              </div>
                            )}
                          
                         
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
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
