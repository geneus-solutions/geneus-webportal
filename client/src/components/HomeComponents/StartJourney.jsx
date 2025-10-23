import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import '../../styles/StartJourney.css';
import { selectCurrentUser } from "../../features/auth/authSlice";

const StartJourney = () => {
  const user = useSelector(selectCurrentUser);
  return (
    <section className="cta-section">
      <div className="cta-container">
        <h1>Start Your Coding Journey</h1>
        <p>
          Learn coding step-by-step with India&apos;s most loved programming
          mentor.
        </p>
        <Link to={`${user ? "/courses" : "/login"}`}>
          <button className="cta-buttoon">Start Now</button>{" "}
        </Link>
      </div>
    </section>
  );
};

export default StartJourney;
