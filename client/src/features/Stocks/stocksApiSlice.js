import { apiSlice } from "../../app/api/apiSlice";

const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserStock: builder.query({
      query: (userId) => ({
        url: `/user-stocks/${userId}`,
        method: "GET",
      }),
      providesTags: (result, error, userId) => [
        { type: "UserStocks", id: userId },
      ],
    }),
    getStockSymbol: builder.query({
      query: () => ({
        url: "/stock-symbols",
        method: "GET",
      }),
    }),
    getStockDetail: builder.query({
      query: ({ stockname, userId }) => ({
        url: `/detail-stock/${stockname}/${userId}`,
        method: "GET",
      }),
    }),
    addStocks: builder.mutation({
      query: (updatedStock) => ({
        url: "/add-stocks",
        method: "POST",
        body: updatedStock,
      }),
      invalidatesTags: (result, error, updatedStock) => [
        { type: "UserStocks", id: updatedStock?.userId },
      ],
    }),
    updateStocks: builder.mutation({
      query: ({ id, data }) => ({
        url: `/update-stocks/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { data }) => [
        { type: "UserStocks", id: data?.userId },
      ],
    }),

    createTargetPercentage: builder.mutation({
      query: ({userId, data}) => ({
        url: `/create-targetpercentage/${userId}`,
        method: 'POST',
        body: data
      })
    }),
    updateTargetPercentage: builder.mutation({
      query: ({userId, data}) => ({
        url: `/update-targetpercentage/${userId}`,
        method: 'PUT',
        body: data
      })
    }),

    getTargetPercentage: builder.query({
      query: ({userId, stockName}) => ({
        url: `/getTargetPercentage/${userId}/${stockName}`,
        method: 'GET',
      })
    }),
    deleteStock: builder.mutation({
      query: ({stockId, userId}) => ({
        url: `/delete-stock/${stockId}/${userId}`,
        method: 'DELETE',
      }),
        invalidatesTags: (result, error, { userId}) => [
        { type: "UserStocks", id: userId},
      ],
    }),
    deleteAllStock: builder.mutation({
      query: ({ stockName, userId }) => ({
        url: `/delete-allstock`,
        method: "DELETE",
        body: { stockName, userId },
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "UserStocks", id: userId },
      ],
    }),
  }),
});

export const {
  useAddStocksMutation,
  useGetStockSymbolQuery,
  useGetUserStockQuery,
  useUpdateStocksMutation,
  useGetStockDetailQuery,
  useCreateTargetPercentageMutation,
  useUpdateTargetPercentageMutation,
  useGetTargetPercentageQuery,
  useDeleteStockMutation,
  useDeleteAllStockMutation
} = paymentApiSlice;
