import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl, HttpMethod } from "../../constants";

export const apiSlices = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAboutCompany: builder.query({
      query: () => ({
        url: "/aboutCompany",
        method: HttpMethod.GET,
      }),
    }),
    getAdminAboutCompany: builder.query({
      query: () => ({
        url: "/admin/aboutCompany",
        method: HttpMethod.GET,
      }),
    }),
    getWhyUs: builder.query({
      query: () => ({
        url: "/whyUs",
        method: HttpMethod.GET,
      }),
    }),
    getAdminWhyUs: builder.query({
      query: () => ({
        url: "/admin/whyUs",
        method: HttpMethod.GET,
      }),
    }),
    getServices: builder.query({
      query: () => ({
        url: "/getServices",
        method: HttpMethod.GET,
      }),
    }),
    getAdminServices: builder.query({
      query: () => ({
        url: "/admin/getServices",
        method: HttpMethod.GET,
      }),
    }),
    getSolutions: builder.query({
      query: () => ({
        url: "/getSolutions",
        method: HttpMethod.GET,
      }),
    }),
    getAdminSolutions: builder.query({
      query: () => ({
        url: "/admin/getSolutions",
        method: HttpMethod.GET,
      }),
    }),
    addServices: builder.mutation({
      query: (postData) => ({
        url: "/admin/addServices",
        method: HttpMethod.POST,
        body: postData,
      }),
    }),
    addSolutions: builder.mutation({
      query: (postData) => ({
        url: "/admin/addSolutions",
        method: HttpMethod.POST,
        body: postData,
      }),
    }),
    sendMail: builder.mutation({
      query: (postData) => ({
        url: "/sendMail",
        method: HttpMethod.POST,
        body: postData,
      }),
    }),
    editAboutCompany: builder.mutation({
      query: (postData) => ({
        url: "/admin/editAboutCompany",
        method: HttpMethod.PUT,
        body: postData,
      }),
    }),
    editWhyUs: builder.mutation({
      query: (postData) => ({
        url: "/admin/editWhyUs",
        method: HttpMethod.PUT,
        body: postData,
      }),
    }),
    deleteSolution: builder.mutation({
      query: (id) => ({
        url: `/admin/deleteSolution/${id}`,
        method: HttpMethod.DELETE,
      }),
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/admin/deleteService/${id}`,
        method: HttpMethod.DELETE,
      }),
    }),
    login: builder.mutation({
      query: (postData) => ({
        url: "/login",
        method: HttpMethod.POST,
        body: postData,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: HttpMethod.POST,
      }),
    }),
    changePass: builder.mutation({
      query: (data) => ({
        url: "/admin/changePass",
        method: HttpMethod.PUT,
        body: data,
      }),
    }),
    forgetPasswordRequest: builder.mutation({
      query: (email) => ({
        url: "/admin/forgetPasswordRequest",
        method: HttpMethod.POST,
        body: email,
      }),
    }),
    resetPass: builder.mutation({
      query: (data) => ({
        url: "/admin/resetPass",
        method: HttpMethod.POST,
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAboutCompanyQuery,
  useGetAdminAboutCompanyQuery,
  useGetServicesQuery,
  useGetAdminServicesQuery,
  useGetSolutionsQuery,
  useGetAdminSolutionsQuery,
  useGetWhyUsQuery,
  useGetAdminWhyUsQuery,
  useAddServicesMutation,
  useAddSolutionsMutation,
  useEditAboutCompanyMutation,
  useEditWhyUsMutation,
  useDeleteServiceMutation,
  useDeleteSolutionMutation,
  useSendMailMutation,
  useLoginMutation,
  useLogoutMutation,
  useChangePassMutation,
  useResetPassMutation,
  useForgetPasswordRequestMutation
} = apiSlices;
