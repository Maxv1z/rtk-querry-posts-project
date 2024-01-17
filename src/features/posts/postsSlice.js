import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";

import { apiSlice } from '../api/apiSlice'

const postAdapter = createEntityAdapter({
    // sorting id-s array in date order 
    sortComparer: (a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
    }
});

const initialState = postAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query({
            query: () => '/posts',
            transformResponse: res => {
                const sortedPosts = [...res].sort((a, b) => a.id - b.id);
                return postAdapter.setAll(initialState, sortedPosts);
            },
            providesTags: (result, error, arg) =>
                result ?
                    [...result.ids.map(id => ({ type: 'Posts', id })),
                    { type: 'Posts', id: 'LIST' },
                    { type: "Posts", id: 'PARTIAL-POSTS' }]
                    : [{ type: 'Posts', id: 'LIST' }],
        }),
        getPost: builder.query({
            query: () => `/${id}`,
            providesTags: (result, error, arg) => {
                [{ type: 'Posts', id }]
            }
        }),
        addPost: builder.mutation({
            query: (post) => ({
                url: './posts',
                method: 'POST',
                body: post
            }),
            invalidatesTags: [{ type: 'Posts', id: 'LIST' }]
        }),
        updatePost: builder.mutation({
            query: (post) => ({
                url: `./posts/${post.id}`,
                method: 'PATCH',
                body: post
            }),
            invalidatesTags: (result, error, body) => [{ type: 'Posts', id: body.id }]
        }),
        deletePost: builder.mutation({
            query: ({ id }) => ({
                url: `./posts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Posts', id: "PARTIAL-POSTS" }]
        }),
    })
})

export const {
    useGetPostsQuery,
    useGetSinglePostQuery,
    useAddPostMutation,
    useDeletePostMutation,
    useUpdatePostMutation
} = extendedApiSlice;

// returns the query result object
export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select()

// Creates memoized selector
const selectPostsData = createSelector(
    selectPostsResult,
    postsResult => postsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
    // Pass in a selector that returns the posts slice of state
} = postAdapter.getSelectors(state => selectPostsData(state) ?? initialState)