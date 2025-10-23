import React from "react";

import Logo from '../assets/g.png';

import { useLazyGetKeyQuery } from "../features/payment/PaymentApiSlice";

// import {useVerifyNutriSubscriptionMutation } from "../features/NutriSubscription/NutriSubscriptionApiSlice";
import { useVerifyPaymentMutation } from "../features/payment/PaymentApiSlice";

import { useSelector } from "react-redux";

const MakePayment = ({ children,checkout,checkOutData }) => {

  const [getKey] = useLazyGetKeyQuery();
  const [verifyPayment] = useVerifyPaymentMutation();

  const { user } = useSelector((state) => state.auth);
  // console.log("user : ",user);

  const makePayment = async(paymentData) => {
    try {

        const keyResponse = await getKey().unwrap();

        // Check if the Razorpay SDK is loaded
        if (!window.Razorpay) {
            console.error("Razorpay SDK not loaded. Please check your setup.");
            return;
        }
      
          // Create a new instance of Razorpay
          const options = {
            key: keyResponse?.key_id, 
            order_id: paymentData?.orderId, // Razorpay order ID from backend
            amount: paymentData?.amount,
            currency: paymentData?.currency,

            name: "Geneus Solutions",
            description: "Happy Learning",
            image: Logo,

            prefill: {
              name: user?.name,
              email: user?.email,
              contact: "1234567890",
              data:paymentData?.data
            },

            handler: async function (response) {
              try {

                const result = await verifyPayment({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }).unwrap();
    
                if (result.success) {
                  alert("✅ Payment verified successfully!");
                } 

              } catch (err) {
                alert("❌ Payment verification error");
              }

            }
          };
      
          // initialize the Razorpay instance with the options
          const rzp = new window.Razorpay(options);
          // open the Razorpay payment modal
          rzp.open();
          
    } catch (error) {
        console.log("Error during payment:", error);
    }
    
  };

  const handleCheckOut = async () => {
    try {
      
      // Call the checkout mutation
      const response = await checkout(checkOutData).unwrap();
      console.log("Checkout response:", response);
      // If the response has an ID, make the payment
      if (response?.Data?.orderId) {
        makePayment(response?.Data);
      }

    } catch (error) {
      // Log the error
      console.error("Error during checkout:", error);
      alert(`❌ ${error?.data?.message}`);
    }
  };

  return (
    <div onClick={handleCheckOut}>
      {children}
    </div>
  );
};

export default MakePayment;
