import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";
import "../../styles/PaymentHistory.css";
import { useGetPaymentHistoryQuery } from "../../features/payment/PaymentApiSlice";

const PaymentHistory = () => {
  const user = useSelector(selectCurrentUser);
  const { data: payments } = useGetPaymentHistoryQuery(user.id);
  
  return (
    <div className="payment-history-container">
      {!payments?.data ? (
        <p>No payments history found.</p>
      ) : (
        <div className="payment-table-wrapper">
          <table className="payment-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Order ID</th>
                <th>Payment ID</th>
                <th>Status</th>
                {/* <th>Courses</th> */}
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments?.data?.map((payment, index) => (
                <tr key={payment._id}>
                  <td>{index + 1}</td>
                  <td>{payment.order_id}</td>
                  <td>{payment.payment_id}</td>
                  <td
                    className={
                      payment.status === "success"
                        ? "status-success"
                        : "status-failed"
                    }
                  >
                    {payment.status}
                  </td>
                  {/* <td>
                    {payment.cart_details.map((item, i) => (
                      <span key={i} className="course-badge">
                        {item.course_title}
                      </span>
                    ))}
                  </td> */}
                  <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
