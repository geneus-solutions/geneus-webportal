import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDeleteCartMutation } from "../features/Cart/cartApiSlice";
import { Link, useNavigate } from "react-router-dom";
import "./CourseCart.css";
import { MdDelete } from "react-icons/md";

const CourseCart = () => {
  
  const { user } = useSelector((state) => state?.auth);

  const { cart } = useSelector(
    (state) => state?.cartData
  );

  const {courses:cartDetails,cartItemLength} = cart || {};

  const totalPrice = cartDetails?.reduce((acc, item) => acc + item?.price, 0);
  const discountedPrice = cartDetails?.reduce((acc, item) => acc + item?.discount_price, 0);

  const navigate = useNavigate();
  const [deleteCart] = useDeleteCartMutation();

  const removeFromCart = async (courseId) => {
    try {

        const cartDetails = await deleteCart({ user_id: user?.id, course_id: courseId }).unwrap();
        console.log("this is cartDetails", cartDetails);
        toast.success("Course deleted from cart");

      } catch (error) {
        console.error("Error deleting course from cart:", error);
      toast.error(error);
    }
  };

  const handleBuyNow = () => {

    if (cartDetails?.length > 0) {

      navigate("/course-details", {
        state: { courses:cartDetails },
      });

    } else {
      toast.error("Your cart is empty!");
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Course Cart</h2>
      {cartDetails?.length > 0 && <p className="cart-count">{cartItemLength} Courses</p>}
      <hr />

      <div className="cart-content">
        <div>

        <div className="cart-items">
          {!(cartDetails?.length > 0) ? (
            <div className="empty-cart">
              <p>Your cart is empty. Click on the button below to find a course!</p>
              <Link to="/courses">
                <button className="btn-primary">Keep Shopping</button>
              </Link>
            </div>
          ) : (
            cartDetails?.map((cart_item) => (
              <div key={cart_item?._id} className="cart-item">
                <img src={cart_item?.img} alt={cart_item?.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3 className="cart-item-title">{cart_item?.title}</h3>
                  <p className="cart-item-description">
                    { Array.isArray(cart_item?.description)
                      ? cart_item?.description.join()
                      : cart_item?.description}
                  </p>
                </div>
                <div className="cart-item-price">
                  <div>
                  <span className="discount-price">₹{cart_item?.discount_price}</span>
                  <span className="original-price">₹{cart_item?.price}</span>
               </div>
                <button className="btn-remove" onClick={() => removeFromCart(cart_item._id)}>
                  <MdDelete/>
                </button>
                </div>
              </div>
            ))
          )}
        </div>
        </div>
        <hr/>
          <div className="summry-container">

        {cartDetails?.length > 0 && (
          <div className="cart-summary">
          <p className="summary-title">Total Price</p>
          <h3 className="total-price">₹{discountedPrice}</h3>
          <p className="original-price">₹{totalPrice}</p>
          <p className="discount">{totalPrice - discountedPrice} off</p>
          <button className="btn-buy" onClick={handleBuyNow}>Enroll Now</button>
          </div>
          )}
          </div>
      </div>

      <hr />
      <div className="recommendations">
        <h3>You might also like</h3>
        <p>Carousel of Courses</p>
      </div>
    </div>
  );
};

export default CourseCart;