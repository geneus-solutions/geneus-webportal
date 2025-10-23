import "../../../styles/WhyAttendSection.css"; // Adjust path as needed

const benefits = [
  {
    icon: "🎯",
    title: "Job-Ready Skills",
    description:
      "Learn the exact technologies and frameworks that top companies are hiring for. Build a portfolio that gets you noticed by recruiters.",
  },
  {
    icon: "💡",
    title: "Real-World Projects",
    description:
      "Build 50+ projects including e-commerce sites, social media apps, and enterprise dashboards. No boring tutorials here.",
  },
  {
    icon: "📈",
    title: "High Salary Potential",
    description:
      "Full-stack developers earn $75,000–$150,000+ annually. This course pays for itself with your first job offer.",
  },
  {
    icon: "👥",
    title: "Lifetime Community",
    description:
      "Join 10,000+ developers in our exclusive community. Get help, share projects, and network with industry professionals.",
  },
];

const WhyAttendSection = ({ course }) => {
  const parseDetail = (text) => {
    const match = text.match(/\*\*(.+?)\*\*\s*:\s*(.+)/);
    if (match) {
      return {
        title: match[1], // text inside **
        description: match[2], // the rest after :
      };
    }
    return { title: "", description: text };
  };
  return (
    <section className="why-section">
      <div className="why-header">
        <h2 className="why-attand-heading">WHY ATTEND THIS COURSE?</h2>
        <p>
          This isn't just another coding course. It's your complete
          transformation into a professional developer.
        </p>
      </div>

      <div className="why-grid">
        {course?.whythisCourse?.details?.map((item, index) => {
          const { title, description } = parseDetail(item);
          return (
            <>
              {/* {course?.aboutCourse?.intro && ( */}
                <div className="why-card">
                  {/* <div className="icon">{title}</div> */}
                  <h3 className="title-whyAttend">{title}</h3>
                  <p>{description}</p>
                </div>
              {/* )} */}
            </>
          );
        })}
      </div>
    </section>
  );
};

export default WhyAttendSection;
