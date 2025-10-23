import { apiSlice } from "../../app/api/apiSlice";

export const foodApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        getFoodItems: builder.query({
            query: () => ({
                url: '/getFoodItems',
                method: 'GET',
            }),
        }),

        // user food diary
        getUserFoodDiary: builder.query({
            query: (data) => {
                console.log("userId : ",data);
                return{
                url: `/api/getFoodById/${data?.userId}?date=${data?.date}`,
                method: 'GET',
            }},
            providesTags: (result, error) => [{ type: 'Food'}],
        }),

        addFood: builder.mutation({
            query: (body) => ({
                url: '/api/addFood',
                method: 'POST',
                body,
            }),
            invalidatesTags: (result, error) => [{ type: 'Food'}],
        }),
        updateFoodDiary: builder.mutation({
            query: (body) => ({
                url: '/api/updateFood',
                method: 'PUT',
                body,
            }),
            invalidatesTags: (result, error) => [{ type: 'Food'}],
        }),
        // /api/detail/getYourCaloriesRequirement
        getYourCaloriesRequirement: builder.query({
            query: () => ({
                url: '/api/detail/getYourCaloriesRequirement',
                method: 'GET',
            }),
        }),
        deleteFood: builder.mutation({
            query: (id) => ({
                url: '/api/removeFood',
                method: 'DELETE',
                body: { id },
            }),
            invalidatesTags: (result, error) => [{ type: 'Food'}],
        }),
    }),
});

export const { useGetFoodItemsQuery,useGetUserFoodDiaryQuery,useGetYourCaloriesRequirementQuery, useAddFoodMutation,useUpdateFoodDiaryMutation, useDeleteFoodMutation } = foodApiSlice;