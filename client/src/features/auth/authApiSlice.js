import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    tagTypes: [{ type: 'profileData' }],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/login',
                method: 'POST',
                body: {...credentials},
            }),
            keepUnusedDataFor: 5,
        }),
        signup: builder.mutation({
            query: (body) => ({
                url: '/signup',
                method: 'POST',
                body,
            }),
        }),
        verifyAccount: builder.mutation({
            query: (body) => ({
                url: '/verify-account',
                method: 'POST',
                body,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
        }),
        getUserProfile: builder.query({
            query: (id)=> ({
                url: `/getuserprofile/${id}`,
                method: "GET"
            }),
            providesTags:   
            [{type: 'profileData'}],
        }),
        updateUserProfile: builder.mutation({
            query: ({id, data}) => ({
                url: `/updateuserprofile/${id}`,
                method: 'POST',
                body: {data}
            }),
            invalidatesTags:  
            [{type: 'profileData'}],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/deleteUser/${id}`,
                method: 'DELETE',
            })
        })
    }),
});

export const { 
    useLoginMutation,
    useSignupMutation,
    useVerifyAccountMutation, 
    useLogoutMutation, 
    useUpdateUserProfileMutation, 
    useDeleteUserMutation,
    useGetUserProfileQuery
} = authApiSlice;