import { apiSlice } from "../../app/api/apiSlice";

const contactUsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    contactUs: builder.mutation({
      query: (contactForm) => ({
        url: "/contact", // pase original backend link
        method: "POST",
        body: { ...contactForm },
      }),
    }),
  }),
});

export const { useContactUsMutation } = contactUsApiSlice;
