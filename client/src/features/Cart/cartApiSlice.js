import { apiSlice } from "../../app/api/apiSlice";

export const foodApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        cart: builder.query({
            query: () => {
                return {
                url: `/cart`,
                method: 'GET',
            }},
            providesTags: (result, error, id) => [{ type: 'cart', id }],
        }),
        addToCart: builder.mutation({
            query: (body) => ({
                url: '/cart',
                method: 'POST',
                body,
            }),
            invalidatesTags: (result, error, body) => [{ type: 'cart', id: body.id }],
        }),
        deleteCart: builder.mutation({
            query: (body) =>({
                url: `/cart`,
                method: 'DELETE',
                body,
            }),
            invalidatesTags: (result, error, body) => [{ type: 'cart', id: body.id }],
        }),
    }),
});

export const {useAddToCartMutation,useDeleteCartMutation,useCartQuery } = foodApiSlice;