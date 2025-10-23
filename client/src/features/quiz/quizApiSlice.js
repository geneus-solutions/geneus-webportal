import { apiSlice } from "../../app/api/apiSlice";

const quizApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getQuizzes: builder.query({
            query: ({ courseId, title }) => {
                const params = new URLSearchParams();
                if (courseId) params.append('courseId', courseId);
                if (title) params.append('title', title);
                return `quiz?${params.toString()}`;
            },
            providesTags: (result) =>
                result ? 
                    result.map(({ _id }) => ({ type: 'Quiz', id: _id })) : 
                    [{ type: 'Quiz', id: 'LIST' }],
        }),

        getQuiz: builder.query({
            query: (quizId) => `quiz/${quizId}`,
            providesTags: (result, error, quizId) => [{ type: 'Quiz', id: quizId }],
        }),

        getQuizById: builder.query({
            query: (quizId) => `quiz/${quizId}`,
            providesTags: (result, error, quizId) => [{ type: 'Quiz', id: quizId }],
        }),
        
        getQuizAnswers: builder.query({
            query: (quizId) => `quiz-answers/${quizId}`,
            providesTags: (result, error, quizId) => [{ type: 'Quiz', id: quizId }],
        }),

         // Mutation to submit quiz answers
        saveQuiz: builder.mutation({
            query: (data) => ({
                url: 'quiz',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result, error, { quizId }) => [{ type: 'Quiz', id: quizId }],
        }),

    }),
});

export const {
    useGetQuizzesQuery,
    useGetQuizQuery,
    useGetQuizByIdQuery,
    useGetQuizAnswersQuery,
    useLazyGetQuizAnswersQuery,
    useSaveQuizMutation,
} = quizApiSlice;