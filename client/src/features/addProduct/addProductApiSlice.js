import { apiSlice } from '../../app/api/apiSlice';

export const productApi = apiSlice.injectEndpoints({

  endpoints: (builder) => ({
    addFoodItem: builder.mutation({
      query: (product) => ({
        url: '', // add the url
        method: 'POST',
        body: product,
      }),
    }),
  }),
});

export const { useAddFoodItemMutation } = productApi;
