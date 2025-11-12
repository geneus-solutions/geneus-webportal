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
    
  
    career: builder.query({
      query: ({ id, userId }) => ({
        url: `/jobDes/${id}?userId=${userId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useCareersQuery, useCareerQuery } = careerApiSlice;