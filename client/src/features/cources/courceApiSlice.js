import { apiSlice } from "../../app/api/apiSlice";

export const courceApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        cources: builder.query({
            query: () => {
                return '/courses'
            },
            providesTags: ['Courses'],
        }),
        cource: builder.query({
            query: ({id,userId}) =>({
                url: `/courseDes/${id}?userId=${userId}`,
                method: 'GET'
            })
        }),
        courseCheckout: builder.mutation({
            query: (body) => {
                const voucherToken = localStorage.getItem('voucherToken');
                return {
                url: '/course-checkout',
                method: 'POST',
                body,
                headers: {
                    "x-voucher-token" : voucherToken || "",
                },
            };
        }
    }),
        // addCourse: builder.mutation({
        //     query: (body) => ({
        //         url: '/register',
        //         method: 'POST',
        //         body,
        //     }),
        // }),
        // logout: builder.mutation({
        //     query: () => ({
        //         url: '/logout',
        //         method: 'POST',
        //     }),
        // }),
    }),
});

export const { useCourcesQuery,useCourceQuery,useCourseCheckoutMutation } = courceApiSlice;