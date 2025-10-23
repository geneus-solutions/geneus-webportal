import { apiSlice } from "../../app/api/apiSlice";

export const userDataApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => {
        return {
          url: `/getallusers`,
          method: "GET",
        };
      },
      providesTags: [{ type: "Users" }],
    }),
    deleteUserById: builder.mutation({
        query: (userId) => {
            return {
            url: `/deleteuser/${userId}`,
            method: "DELETE",
            };
        },
        invalidatesTags: [{ type: "Users" }],
    })
  }),
});

export const { useGetAllUserQuery, useDeleteUserByIdMutation } = userDataApiSlice;
