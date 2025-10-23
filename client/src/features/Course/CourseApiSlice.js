import { apiSlice } from "../../app/api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({

  endpoints: (builder) => ({
    addCourse: builder.mutation({
      query: (course) => {
      // console.log('this is course data to save', course);
        return {
          url: '/add-course', // add the url
          method: 'POST',
          body: course,
        }
      },
      invalidatesTags: ['Courses']
    }),
    updateCourse: builder.mutation({
      query: ({courseId, ...course}) => ({
        url: `/update-course/${courseId}`,
        method: 'PUT',
        body: course,
      }),
      invalidatesTags: ['Courses']
    }),
    deleteCourse: builder.mutation({
      query: (courseId)=> ({
        url: `delete-course/${courseId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Courses']
    })
  }),
});

export const { useAddCourseMutation , useUpdateCourseMutation, useDeleteCourseMutation} = courseApi;
