import { apiSlice } from "../../app/api/apiSlice";

export const careerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    careers: builder.query({
      query: () => '/jobs',
      transformResponse: (response) => {
       
        if (Array.isArray(response)) return response;
        if (response?.data && Array.isArray(response.data)) return response.data;
        if (response?.jobs && Array.isArray(response.jobs)) return response.jobs;
        
        console.warn("Unexpected API response structure:", response);
        return []; 
      },
      providesTags: ['Jobs'],
    }),

        getJobById: builder.query({
      query: (id) => `/jobs/${id}`,
      transformResponse: (response) => {
        return response?.job || response?.data || response;
      },
      providesTags: (result, error, id) => [{ type: 'Jobs', id }],
    }),
  }),
});

export const { useCareersQuery, useGetJobByIdQuery } = careerApiSlice;