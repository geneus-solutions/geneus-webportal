import "../../../styles/Curriculum.css";

const curriculumData = [
  {
    icon: "💻",
    title: "Frontend Development",
    points: [
      "HTML5 & CSS3 Mastery",
      "JavaScript ES6+ & TypeScript",
      "React.js & Next.js",
      "Tailwind CSS & UI Libraries",
    ],
  },
  {
    icon: "🗄️",
    title: "Backend Development",
    points: [
      "Node.js & Express.js",
      "MongoDB & PostgreSQL",
      "RESTful APIs & GraphQL",
      "Authentication & Security",
    ],
  },
  {
    icon: "📱",
    title: "Mobile Development",
    points: [
      "React Native Fundamentals",
      "iOS & Android Deployment",
      "Push Notifications",
    ],
  },
  {
    icon: "🌐",
    title: "DevOps & Deployment",
    points: [
      "Git & GitHub Mastery",
      "Docker & Containerization",
      "AWS & Cloud Deployment",
    ],
  },
];

const Curriculum = ({course}) => {
    console.log('this is course', course)
  return (
        <div className="curriculum">
      <h2 className="curriculum-heading">📘 Here's What We'll Cover Inside…</h2>
      <p className="curriculum-subheading">
        Everything you need to go from beginner to expert, in one course.
      </p>

      <div className="curriculum-grid">
        {course?.map((module, index) => {
          const moduleKey = Object.keys(module).find((k) => k.toLowerCase().includes("module"));
          const description = moduleKey
            ? module[moduleKey].split("\n").filter((line) => line.trim())
            : [];

          return (
            <div className="curriculum-card" key={index}>
              {moduleKey && <h3 className="module-title">{moduleKey}</h3>}
              <h4 className="module-subtitle">{module.contentTitle}</h4>
              <p className="module-time">⏱ {module.time}</p>
              <ul className="module-points">
                {description.map((point, i) => (
                  <li key={i}>{point.replace(/^[-–]\s*/, "")}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>

  );
};

export default Curriculum;
