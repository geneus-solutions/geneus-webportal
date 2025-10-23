import React, { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
// import CouponSection from "../components/Cart/CouponSection";
import SummarySection from "../components/Cart/SummarySection";
import "./CheckOutCourseDetails.css"; // Import external CSS
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const CourseDetails = () => {

  const location = useLocation();
  const { courses } = location.state || {};

  const [coursePriceDetails, setCoursePriceDetails] = useState({
    subTotal: 0,
    discountedPrice: 0,
    couponCodeDiscount: 0,
  });

  // const [message, setMessage] = useState(null);
  // const [applyCouponMessage, setApplyCouponMessage] = useState(false);
  const [cartItems, setCartItems] = useState(courses || []);
  
  const courseIds = cartItems?.map((item) => item?._id);

  useEffect(() => {
    const totalPrice = cartItems?.reduce((acc, item) => acc + item.price, 0);
    const totalDiscount = cartItems?.reduce((acc, item) => acc + item.discount_price,0);
    setCoursePriceDetails({subTotal: totalPrice,discountedPrice: totalDiscount});
  }, [cartItems]);

  // const validCoupons = [
  //   { code: "a3e29f41", discount: 50, expiryDate: "2025-12-31" },
  //   { code: "SUMMER20", discount: 20, expiryDate: "2024-12-30" },
  //   { code: "FEST50", discount: 50, expiryDate: "2024-12-15" },
  // ];

  // const applyCoupon = () => {
  //   setMessage(null);
  //   if (!couponCode) {
  //     setMessage({ type: "error", text: "Please enter a coupon code." });
  //     return;
  //   }
  //   const coupon = validCoupons.find(
  //     (coupon) => coupon.code.toUpperCase() === couponCode.toUpperCase()
  //   );
  //   if (coupon) {
  //     const currentDate = new Date();
  //     const expiryDate = new Date(coupon.expiryDate);

  //     if (currentDate > expiryDate) {
  //       setMessage({ type: "error", text: "This coupon code has expired." });
  //     } else {
  //       // const discountAmount = (totalPrice * coupon.discount) / 100;
  //       const discountAmount = coursePriceDetails?.discountedPrice - 1;

  //         setCoursePriceDetails((prev) => ({
  //           ...prev,
  //           couponCodeDiscount: discountAmount,
  //         }));

  //         setApplyCouponMessage(true);
  //       setMessage({
  //         type: "success",
  //         text: `Coupon applied! You've saved ₹${discountAmount.toFixed(2)}.`,
  //       });

  //       setTimeout(() => {
  //         setMessage("");
  //       }, 3000);
  //     }
  //   } else {
  //     setMessage({
  //       type: "error",
  //       text: "This coupon code is invalid or expired.",
  //     });

  //     setTimeout(() => {
  //       setMessage("");
  //     }, 3000);
  //   }
  // };

  // const removeCoupon = () => {
  //   setCouponCode("");
  //   setMessage({ type: "success", text: "Coupon removed successfully." });
  //   setCoursePriceDetails((prev)=>({
  //     ...prev,
  //   couponCodeDiscount: 0,
  // }));
  //   setApplyCouponMessage(false);
  //   setTimeout(() => {
  //     setMessage("");
  //   }, 3000);
  // };

  if (!cartItems || cartItems.length === 0) {
    return <h6>No cart details available</h6>;
  }

  const removeFromSummry = async (itemId) => {
    try {
      
      const updatedCart = cartItems.filter((item) => item._id !== itemId);
      setCartItems(updatedCart);

      toast.success("removed from purchase summary");
      
    } catch (error) {
      toast.error("Failed to remove course.");
    }
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Course Summary</h2>

      {/* Course Table */}
      <div className="card">
        <div className="card-content">
          <table className="checkout-course-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Course Price</th>
                <th>Discount</th>
                <th>Payable Amount</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length > 0 && (
                cartItems.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img
                        src={item.img}
                        alt={item.title}
                        className="course-descritptionimage"
                      />
                      {item.title}
                    </td>
                    <td>₹{item?.price}</td>
                    <td>₹{item?.price - item.discount_price}</td>
                    <td>₹{item?.discount_price}</td>
                    <td onClick={() => removeFromSummry(item?._id)}>
                      <MdDelete  style={{cursor: 'pointer'}}/>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Coupon and Summary Sections */}
      <div className="coupon-summary-container">
        {/* <div className="coupon-section">
          <CouponSection
            validCoupons={validCoupons}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
          />
        </div> */}
        <div className="summary-section-checkout">
          <SummarySection
            courseIds={courseIds}
            coursePriceDetails={coursePriceDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
