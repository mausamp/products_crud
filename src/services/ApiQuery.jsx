import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const crudApi = createApi({
    reducerPath: 'crudApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://product-fhqo.onrender.com/products',
    }), 
    tagTypes: ['Content'],
    endpoints: (builder) => ({
        getAll: builder.query({
            query: () => ({
                url: '',
                method: 'GET'
            }),
            providesTags: ['Content']
        }),

        getOne: builder.query({
            query: (id) => ({
                    url: `/${id}`,
                    method: 'GET'
            }),
            providesTags: ['Content']
        }),

        addOne: builder.mutation({
            query: (content) => ({
                url: '',
                method: 'POST',
                body: content
            }),
            invalidatesTags: ['Content']
        }),

        deleteOne: builder.mutation({
            query: (id) => ({
                    url: `/${id}`,
                    method: 'DELETE'    
            }),
            invalidatesTags: ['Content']
        }),

        editOne: builder.mutation({
            query: ({id, content}) => ({
                url: `/${id}`,
                method: 'PATCH',
                body: content
            }),
            invalidatesTags: ['Content']
        }),
    })
    
})

export const { 
    useGetAllQuery, 
    useGetOneQuery, 
    useAddOneMutation, 
    useEditOneMutation, 
    useDeleteOneMutation 
} = crudApi