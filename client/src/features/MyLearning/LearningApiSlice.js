import { apiSlice } from "../../app/api/apiSlice";

export const learningApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        myLearning: builder.query({
            query: () => ({
                url: `/learning`,
                method: 'GET',
            }),
        }),
    }),
});
    
export const { useMyLearningQuery } = learningApiSlice;