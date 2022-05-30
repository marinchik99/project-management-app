import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SigninResponseType, UserType } from '../../types/types';

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
      transformResponse: (response: SigninResponseType, _, arg: { login: string }) => {
        return { login: arg.login, ...response };
      },
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

export const { useLoginMutation, useRegisterMutation } = userApi;
