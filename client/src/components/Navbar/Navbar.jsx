import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { useAuthenticateQuery } from "../../features/authenticate/authenticateApiSlice";
import { useCartQuery } from "../../features/Cart/cartApiSlice";
import { Cart, emptyCart } from "../../features/Cart/cartSlice";
import { useLogoutMutation } from "../../features/auth/authApiSlice";
import logo from "../../assets/logo.png";
import { logOut } from "../../features/auth/authSlice";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { apiSlice } from "../../app/api/apiSlice";
import { FaCartArrowDown } from "react-icons/fa";
import { AiOutlineLogout, AiFillDashboard } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const { data } = useAuthenticateQuery();
  const user = useSelector(selectCurrentUser);
  const { data: cartData } = useCartQuery(data?.data?.id, {
    skip: !data?.data?.id,
  });

  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  useEffect(() => {
    if (cartData) {
      dispatch(Cart({ cart: cartData }));
    }
  }, [cartData, dispatch]);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logOut());
      dispatch(apiSlice.util.resetApiState());
      navigate("/");
      setMenuOpen(!menuOpen);
    } catch (error) {
      console.log("Logout Error", error);
    }
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!user) {
      dispatch(emptyCart());
    }
  }, [user, dispatch]);

  const isAdmin = user?.role === "admin";

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <NavLink to="/" className="logo">
          <img src={logo} alt="Logo" className="img" />
        </NavLink>
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "𐤕" : "☰"}
        </div>
        {/* Overlay for mobile menu */}
        {menuOpen && (
          <div
            className="menu-overlay"
            onClick={() => setMenuOpen(false)}
          ></div>
        )}
        <ul className={menuOpen ? "nav-menu active" : "nav-menu"}>
          <li>
            <NavLink
              to="/"
              className="nav-link"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="nav-link"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              About
            </NavLink>
          </li>
          <li className="dropdown">
            <span className="nav-link">Services</span>
            <div className="dropdown-menu">
              <NavLink
                to="/courses"
                className="dropdown-link"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                Courses
              </NavLink>
            </div>
          </li>
          {/* {isAdmin && (
            <li>
              <NavLink
                to="/admin-dashboard/all-courses"
                className="nav-link"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                Dashboard
              </NavLink>
            </li>
          )} */}
          <li>
            <NavLink
              to="/contact"
              className="nav-link"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              Contact
            </NavLink>
          </li>
          {user?.id && (
            <li>
              <NavLink
                to="/my-learning"
                className="nav-link"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                My Learning
              </NavLink>
            </li>
          )}
          {user ? (
            <>
              <li className="dropdown">
                <span className="avatar">
                  {user?.name.charAt(0).toUpperCase()}
                </span>
                <div className="dropdown-menu">
                  {isAdmin ? (
                    <>
                      <NavLink
                        to="/admin-dashboard/visitor-data"
                        className="dropdown-link"
                        onClick={() => setMenuOpen(!menuOpen)}
                      >
                        <AiFillDashboard /> Dashboard
                      </NavLink>
                    </>
                  ) : (
                    <NavLink
                      to="/profile"
                      className="dropdown-link"
                      onClick={() => setMenuOpen(!menuOpen)}
                    >
                      <CgProfile /> Profile
                    </NavLink>
                  )}
                  <button onClick={handleLogout} className="dropdown-link">
                    <AiOutlineLogout /> Logout
                  </button>
                </div>
              </li>
            </>
          ) : (
            <li>
              <NavLink
                to="/login"
                className="nav-link"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                Login
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to="/cart"
              className="cart-icon nav-link"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <FaCartArrowDown />
              {/* &#128722; */}
              <span className="cart-badge">
                {cartData?.cartItemLength || 0}
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
