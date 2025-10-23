import React from "react";
import { Link } from "react-router-dom";

function CourseCard({ title, image/*, duration*/, description, url }) {
  return (
    <div style={{ width: "380px" }}>
      <Link to={url}>
        <img src={image} alt="Course" style={{ width: "100%" }} />
      </Link>
      <div style={{ padding: "15px" }}>
        <div
          style={{
            marginTop: "15px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <h4 style={{ marginBottom: "10px" }}><Link to={url} style={{ textDecoration: "none", color:"#000000" }}>{title}</Link> </h4>
          {/* <div style={{ fontSize: "14px", color: "#555" }}>
            <p>{duration}</p>
          </div> */}
        </div>
        <p style={{ fontSize: "14px", color: "#777", marginTop: "10px" }}>
          {description}
        </p>
      </div>
    </div>
  );
}

export default CourseCard;
