import { apiSlice } from "../../app/api/apiSlice";

export const SupportAndQueryApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['userQuery'],
  endpoints: (builder) => ({
    getEnquery: builder.query({
      query: () => ({
        url: `/allenquery`,
        method: "GET",
      }),
      providesTags: [{type: 'userQuery'}]
    }),
    addQuery: builder.mutation({
      query: (data) => ({
        url: `/enquiry`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{type: 'userQuery'}]
    }),
    updateQuery: builder.mutation({
      query: ({id, newStatus}) => ({
        url: `/updateenquiry/${id}`,
        method: "PATCH",
        body: {status: newStatus},
        headers: {
            'Content-Type': 'application/json',  // ✅ Force JSON
          },
      }),
      invalidatesTags: [{type: 'userQuery'}]
    }),
    deleteQuery: builder.mutation({
      query: (id) => ({
        url: `/deletequery/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{type: 'userQuery'}]
    }),
  }),
});

export const { useAddQueryMutation, useGetEnqueryQuery, useUpdateQueryMutation, useDeleteQueryMutation} = SupportAndQueryApiSlice;
