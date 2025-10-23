import "../../../styles/HeroSection.css";
import UnlockButton from "../components/UnlockButton";

const HeroSection = ({ course }) => {
    console.log('this is course', course)
  return (
    <section className="hero-container-landing">
      <div className="hero-content-landing">
        <div className="hero-text">
          {/* <div className="limited-offer">🔥 Limited Time Offer - 83% OFF</div> */}
          <h1 className="landing-page-heading">{course?.title}</h1>
          <p className="landing-page-description">{course?.description}</p>
          <UnlockButton course={course} />
        </div>

        <div className="video-preview">
          {/* <div className="video-placeholder"> */}
          <div className="">
            <iframe
              src="https://www.youtube.com/embed/2eTIgVyBnNg?rel=0&controls=0&showinfo=0&modestbranding=1"
              width="600px"
              height="400px"
              allow="autoplay"
              allowFullScreen
              title="Google Drive Video"
              style={{
                maxWidth: "600px",
                border: "none",
                borderRadius: "10px",
              }}
              className="iframe-video"
            ></iframe>
            {/* </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
