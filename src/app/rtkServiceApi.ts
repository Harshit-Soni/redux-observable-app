import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { User } from '../_interface_/types'

export const contactsApi = createApi({
    reducerPath: 'contactsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/'}),
    tagTypes: [ 'User' ],
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
          query: () => `/users`,
          providesTags: [ 'User' ] // for query we use providesTags
        }),
        addUser: builder.mutation<{}, User>({
            query: user => ({
                url: '/users',
                method: 'POST',
                body: user
            }),
            invalidatesTags: [ 'User' ] // for mutation we use invalidatesTags
        }),
        deleteUser: builder.mutation<User[], number>({
            query: id => ({
                url: `/users/${ id }`,
                method: 'DELETE'
            }),
            invalidatesTags: [ 'User' ] // for mutation we use invalidatesTags
        })
    }),
})

export const { useGetUsersQuery, useAddUserMutation, useDeleteUserMutation } = contactsApi;
