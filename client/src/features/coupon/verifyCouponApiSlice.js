import { apiSlice } from "../../app/api/apiSlice";

export const verifyCouponApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    verifyCoupon: builder.mutation({
      query: (data) => ({
        url: "/apply-voucher",
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useVerifyCouponMutation } = verifyCouponApiSlice;
