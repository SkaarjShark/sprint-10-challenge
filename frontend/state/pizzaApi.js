import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pizzaApi = createApi({
    reducerPath: 'pizzaApi',
    tagTypes: ["Pizza"],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api/pizza/'}),
    endpoints: builder => ({
        getOrders: builder.query({
            query: () => 'history',
            providesTags: ["Pizza"]
        }),
        createOrders: builder.mutation({
            query: (items) => ({
                url: 'order',
                method: 'POST',
                body: items
            }),
            invalidatesTags: ["Pizza"]
        })
    })
})

export const {
    useGetOrdersQuery, useCreateOrdersMutation
} = pizzaApi