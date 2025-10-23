import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Learning.css";
import { userInfo } from "../../redux/slices/userDetails";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {
    MDBDropdown,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBDropdownItem,
} from "mdb-react-ui-kit";
import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBIcon,
    MDBRow,
    MDBCol,
    MDBBtn,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

import { backendUrl } from "../../config";

const Learning = () => {
    const [courses, setCourses] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const user = useSelector(userInfo);
    // console.log(user);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get(
                `${backendUrl}/learning?user_id=${user.userId}`
            );

            setCourses(response.data.courses);
        } catch (error) {
            console.error("Failed to fetch course data:", error);
        }
    };
    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const filteredCourses = courses.filter((course) => {
        if (selectedOption === "beginner") {
            return course.level === "beginner";
        } else if (selectedOption === "intermeDiete") {
            return course.level === "intermeDiete";
        } else if (selectedOption === "advanced") {
            return course.level === "advanced";
        }
        return true;
    });

    const beginnerCourses = filteredCourses.filter(
        (course) => course.level === "beginner"
    );
    const intermeDieteCourses = filteredCourses.filter(
        (course) => course.level === "intermeDiete"
    );
    const advancedCourses = filteredCourses.filter(
        (course) => course.level === "advanced"
    );

    return (
        <div>
            <div className="dropdown">
                <MDBDropdown>
                    <MDBDropdownToggle color="info">
                        {selectedOption || "Categories"}
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                        <MDBDropdownItem
                            link
                            childTag="button"
                            onClick={() =>
                                handleDropdownChange({
                                    target: { value: "beginner" },
                                })
                            }
                        >
                            Beginner
                        </MDBDropdownItem>
                        <MDBDropdownItem
                            link
                            childTag="button"
                            onClick={() =>
                                handleDropdownChange({
                                    target: { value: "intermeDiete" },
                                })
                            }
                        >
                            IntermeDiete
                        </MDBDropdownItem>
                        <MDBDropdownItem
                            link
                            childTag="button"
                            onClick={() =>
                                handleDropdownChange({
                                    target: { value: "advanced" },
                                })
                            }
                        >
                            Advanced
                        </MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>
            </div>

            <MDBRow className="row-cols-1 row-cols-md-4 g-4 mx-5 mb-4 mt-1">
                {(searchResults.length > 0
                    ? searchResults
                    : selectedOption === "beginner"
                    ? beginnerCourses
                    : selectedOption === "intermeDiete"
                    ? intermeDieteCourses
                    : selectedOption === "advanced"
                    ? advancedCourses
                    : courses
                ).map((course) => (
                    <MDBCol key={course.id}>
                        <div className="text-center">
                            <Link to={`/courseCon/${course._id}`}>
                                <MDBCard className="h-100">
                                    <MDBCardImage
                                        src={course.img}
                                        alt={course.title}
                                        position="top"
                                    />

                                    <MDBCardBody>
                                        <MDBCardTitle>
                                            {course.title}
                                        </MDBCardTitle>
                                        <div className="d-flex flex-row justify-content-between">
                                            <div className="text-danger mb-1 me-2">
                                                <MDBIcon fas icon="star" />
                                                <MDBIcon fas icon="star" />
                                                <MDBIcon fas icon="star" />
                                                <MDBIcon fas icon="star" />
                                                <MDBIcon far icon="star" />
                                            </div>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </Link>
                        </div>
                    </MDBCol>
                ))}
            </MDBRow>
        </div>
    );
};

export default Learning;
