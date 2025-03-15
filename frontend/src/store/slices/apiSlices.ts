import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl, HttpMethod } from "../../constants";

export const apiSlices = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAboutCompany : builder.query({
        query: ()=> ({
            url: '/aboutCompany',
            method: HttpMethod.GET
        })
    }),
    getWhyUs : builder.query({
        query: ()=> ({
            url: '/whyUs',
            method: HttpMethod.GET
        })
    }),
    getServices : builder.query({
        query : ()=> ({
            url: '/getServices',
            method: HttpMethod.GET
        })
    }),
    getSolutions : builder.query({
        query: ()=> ({
            url: '/getSolutions',
            method: HttpMethod.GET
        })
    }),
    addServices : builder.mutation({
        query: (postData)=> ({
            url: '/addServices',
            method: HttpMethod.POST,
            body: postData
        })
    }),
    addSolutions : builder.mutation({
        query: (postData)=> ({
            url: '/addSolutions',
            method: HttpMethod.POST,
            body: postData
        })
    }),
    sendMail : builder.mutation({
        query: (postData) => ({
            url: "/sendMail",
            method: HttpMethod.POST,
            body: postData
        })
    }),
    editAboutCompany : builder.mutation({
        query: (postData)=> ({
            url: "/editAboutCompany",
            method: HttpMethod.PUT,
            body: postData
        })
    }),
    editWhyUs : builder.mutation({
        query: (postData)=> ({
            url: "/editWhyUs",
            method: HttpMethod.PUT,
            body: postData
        })
    }),
  }),
});

export const {
    useGetAboutCompanyQuery,
    useGetServicesQuery,
    useGetSolutionsQuery,
    useGetWhyUsQuery,
    useAddServicesMutation,
    useAddSolutionsMutation,
    useEditAboutCompanyMutation,
    useEditWhyUsMutation,
} = apiSlices;
