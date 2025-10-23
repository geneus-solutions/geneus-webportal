import { RiDoubleQuotesL } from "react-icons/ri";
import { FaStar } from "react-icons/fa";

import '../../styles/TestimonialCard.css';

const TestimonialCard = ({ testimonial }) => {
    return (
        <div className="testimonial-card">
            <div className="testimonial-card-content">
              <p className="testimonial-card-description">
                <RiDoubleQuotesL className="testimonial-card-icon" />
                {testimonial.description}
              </p>
              <div className="testimonial-card-user">
                {/* <img 
                  src={testimonial.image}
                  alt="User"
                /> */}
                <div style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
                    <div className="testimonial-card-user-info">
                        <h4 className="testimonial-card-user-name">{testimonial?.name}</h4>
                        <p className="testimonial-card-user-role">{testimonial?.role}</p>
                    </div>
                    <div style={{display:'flex',gap:'5px',alignItems:'center'}}>
                        <FaStar style={{color:'yellow',fontSize:'20px'}} />
                        <p style={{margin:0,color:'black',fontWeight:'bold'}}>4.5</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
    );
};

export default TestimonialCard;