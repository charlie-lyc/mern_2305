import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


/**
 * Already set up the proxy server in 'vite.config.js' file
 */
const baseQuery = fetchBaseQuery({ baseUrl: ''}) 

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'],
    endpoints: (builder) => ({})
})

