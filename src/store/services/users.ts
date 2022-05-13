import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserType } from '../../types/types';

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://kanban-rest-marina-team.herokuapp.com/' }),
  endpoints: (builder) => ({
    login: builder.mutation<Partial<UserType>, Partial<UserType>>({
      query: (credentials: Partial<UserType>) => ({
        url: 'signin',
        method: 'POST',
        body: credentials,
      }),
      // transformResponse: (response: { data: { token: string } }, meta, arg) => response.data,
    }),
  }),
});

// Export hooks for usage in functional components
export const { useLoginMutation } = userApi;
