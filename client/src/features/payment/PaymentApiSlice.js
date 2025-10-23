import { apiSlice } from "../../app/api/apiSlice";

const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getKey: builder.query({
      query: () => ({
        url: `/payment/get-key`,
        method: "GET",
      }),
      // providesTags: ["User"],
    }),
    // verify payment
    verifyPayment: builder.mutation({
      query: (data) => {
        const voucherToken = localStorage.getItem("voucherToken");

        return {
          url: `/payment/verify-payment`,
          method: "POST",
          body: data,
          headers: {
            "x-voucher-token": voucherToken || "",
          },
        };
      },
      // invalidatesTags: ["User"],
    }),
    getPaymentHistory: builder.query({
      query: (user_Id) => ({
        url: `/payments/${user_Id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLazyGetKeyQuery,
  useVerifyPaymentMutation,
  useGetPaymentHistoryQuery,
} = paymentApiSlice;
