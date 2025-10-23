import React, { useState } from "react";
import VerticalLoader from "../Loaders/VerticalLoader";
import "./SummarySection.css";

import { useCourseCheckoutMutation } from "../../features/cources/courceApiSlice";
import MakePayment from "../MakePayment";
import { useVerifyCouponMutation } from "../../features/coupon/verifyCouponApiSlice";

const SummarySection = ({ courseIds, coursePriceDetails }) => {
  const [couponCode, setCouponCode] = useState("");
  const [courseCheckout, { isLoading }] = useCourseCheckoutMutation();
  const [verifyCoupon] = useVerifyCouponMutation();
  const [couponSuccessMessage, setCouponSuccessMessage] = useState("");
  const [couponErrorMessage, setCouponErrorMessage] = useState("");
  const [couponDiscountAmount, setCouponDiscountAmount] = useState(0);

  const handleApplyCoupon = async () => {
    try {
      console.log(
        "this is data",
        couponCode,
        coursePriceDetails.discountedPrice,
        courseIds
      );
      const response = await verifyCoupon({
        code: couponCode,
        cartAmount: coursePriceDetails?.discountedPrice,
        course_id: courseIds,
      }).unwrap();
      console.log("this is reponse from verify", response);
      if (response.statusCode === 200) {
        localStorage.setItem("voucherToken", response?.data?.token);
        setCouponCode("");
        setCouponSuccessMessage(response?.message);
        setCouponDiscountAmount(response?.data?.discountAmount);
        setCouponErrorMessage("");
      }
    } catch (error) {
      console.log("error on apply the coupon", error);
      setCouponErrorMessage(error.data.message);
      setCouponSuccessMessage("");
      setCouponDiscountAmount(0);
    }
  };

  const handleRemoveCoupon = async () => {
    try {
      localStorage.removeItem("voucherToken");
      setCouponCode("");
      setCouponSuccessMessage("");
      setCouponDiscountAmount(0);
    } catch (error) {
      console.log("Error on removing the couopn", error);
    }
  };
  return (
    <div className="summary-section">
      <h2 className="summary-title">Summary</h2>
      <div className="summary-details">
        <div className="summary-item">
          <span>Subtotal:</span>
          <span>₹{coursePriceDetails?.subTotal}</span>
        </div>

        <div className="summary-item">
          <span>Discount:</span>
          <span>
            ₹
            {coursePriceDetails?.subTotal - coursePriceDetails?.discountedPrice}
          </span>
        </div>

        {couponSuccessMessage  && (
          <div>
            <div className="summary-item">
              <p>{couponSuccessMessage}</p>
              <p>₹{couponDiscountAmount}</p>
            </div>
            <button
              className="remove-btn"
              onClick={handleRemoveCoupon
                // removeCoupon();
                // setCouponCode("");
              }
            >
              Remove
            </button>
          </div>
        )}

        {couponErrorMessage  && <p className={`message error`}>{couponErrorMessage}</p>}

        <input
          type="text"
          className="coupon-input"
          value={couponCode}
          onChange={(e) => {
            setCouponCode(e.target.value);
          }}
          placeholder="Enter your coupon code"
        />
        <button
          className="apply-btn"
          // onClick={() => {
          //   applyCoupon();
          //   setAppliedCoupon(couponCode);
          //   setCouponCode("");
          // }}
          onClick={() => handleApplyCoupon()}
        >
          Apply Coupon
        </button>

        <hr />
        <div className="summary-item total">
          <span>Total:</span>
          <span>
            ₹
            {coursePriceDetails?.discountedPrice - couponDiscountAmount}
          </span>
        </div>
        <MakePayment
          checkout={courseCheckout}
          checkOutData={{
            courseIds,
            currency: "INR",
            // couponCode: appliedCoupon ? appliedCoupon : null
          }}
        >
          <button className="checkout-btn">
            {isLoading ? <VerticalLoader /> : <>Proceed to Pay</>}
          </button>
        </MakePayment>
      </div>
    </div>
  );
};

export default SummarySection;
