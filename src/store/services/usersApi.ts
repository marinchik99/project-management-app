import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SigninResponseType, UserType } from '../../types/types';

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://kanban-rest-marina-team.herokuapp.com/' }),
  endpoints: (builder) => ({
    login: builder.mutation<SigninResponseType, Partial<UserType>>({
      query: (credentials: Partial<UserType>) => ({
        url: 'signin',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<Partial<UserType>, Partial<UserType>>({
      query: (credentials: Partial<UserType>) => ({
        url: 'signup',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const { useLoginMutation, useRegisterMutation } = userApi;
