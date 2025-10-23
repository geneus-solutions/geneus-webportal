import { apiSlice } from "../../app/api/apiSlice";

// get-key
const verifyAccountApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        sendOTP: builder.mutation({
            query: (data) => ({
                url: `/verify-account/send-otp`,
                method: "POST",
                body: { ...data },
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const { useSendOTPMutation,useLazyGetPayIdQuery } = verifyAccountApiSlice;