import { apiSlice } from "../../app/api/apiSlice";

const healthGoalApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addYourHealthGoal: builder.mutation({
        query: (data) => ({
            url: '/api/detail/update',
            method: 'POST',
            body: data,
        }),
        invalidatesTags: ['HealthGoal'],
        }),
    }),
});

export const {
    useAddYourHealthGoalMutation,
} = healthGoalApiSlice;