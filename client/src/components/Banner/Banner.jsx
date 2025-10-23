import React from "react";
import "./Banner.css";
import "mdbreact/dist/css/mdb.css";
import Banner_1 from "../../assets/banner_1.jpg";
import Banner_2 from "../../assets/banner_2.jpg";
import Banner_3 from "../../assets/banner_3.jpg";
import MyModal from "../Modal/Modal";
import Carousel from "react-bootstrap/Carousel";

const Banner = () => {
    return (
        <div>
            <div
                style={{
                    margin: "20px 10rem 20px 10rem",
                    display: "flex",

                    borderRadius: "20px",
                }}
            >
                <Carousel
                    fade
                    controls={false}
                    indicators={false}
                    className="d-block w-100"
                >
                    <Carousel.Item interval={3000}>
                        <img
                            className="d-block w-100"
                            src={Banner_1}
                            w
                            alt=""
                            srcSet=""
                            style={{ borderRadius: "20px" }}
                            height={"500px"}
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={3000}>
                        <img
                            src={Banner_2}
                            alt=""
                            className="d-block w-100"
                            srcSet=""
                            style={{ borderRadius: "20px" }}
                            height={"500px"}
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={3000}>
                        <img
                            className="d-block w-100"
                            height={"500px"}
                            src={Banner_3}
                            alt=""
                            style={{ borderRadius: "20px" }}
                            srcSet=""
                        />
                    </Carousel.Item>
                </Carousel>
            </div>
            <MyModal />
        </div>
    );
};

export default Banner;
