import React from "react";
import { useNavigate } from "react-router-dom";
import "./DescriptionCourseCard.css";

const DescriptionCourseCard = ({
  courseDetails,
  discount,
  handleAddToCart,
}) => {
  const navigate = useNavigate();
  return (
    <div className="course-row">
      <div className="course-col">
        <img
          src={courseDetails?.img}
          alt="Course"
          className="course-image"
        />
      </div>
      <div className="course-col">
        <div className="course-body">
          <h2 className="course-title">{courseDetails?.title}</h2>
          <div className="course-details">
            <h6>
              <s>&#8377;{courseDetails?.price}</s>
              &ensp;{parseInt(discount)}% OFF
              <strong className="course-price">
                {" "}
                &#8377;{courseDetails?.discount_price}
              </strong>
            </h6>
          </div>
          <div style={{ display: "flex", textAlign: "left", gap: "20px" }}>
            <button
              className="add-to-cart-button"
              onClick={() =>
                navigate("/course-details", {
                  state: { courses: [courseDetails] },
                })
              }
            >
              Buy Now
            </button>
            <button
              className="add-to-cart-button"
              onClick={() => handleAddToCart(courseDetails)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionCourseCard;
