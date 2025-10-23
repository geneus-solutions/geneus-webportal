import React from "react";
import { Link } from "react-router-dom"; 
import "./MenuItems.css"

const MenuItems = () => {
    return (
        <div className="about_pages">
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="about/">About</Link>
            </li>
            <li>
                <Link to="/courses">Courses</Link>
            </li>
            <li className="dropdown">
                <Link to="#" className="dropdown-toggle" data-bs-toggle="dropdown">
                    Services
                </Link>
                <ul className="dropdown-menu">
                    <li>
                        <Link to="https://www.geneussolutions.in/courses" className="dropdown-item">
                            Courses
                        </Link>
                    </li>
                   
                </ul>
            </li>
            <li>
                <Link to="/product">Product</Link>
            </li>
             
            <li>
                <Link to="/contact">Contact Us</Link>
            </li>
        </ul>
        </div>

    );
};

export default MenuItems;