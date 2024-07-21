import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiCalls = createApi({
  reducerPath: "apiCalls",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token")).token
        : "";
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["items", "user", "stock", "stokById"],
  endpoints: (builder) => ({
    getAllEmployee: builder.query({
      query: () => "/allusers",
      providesTags: ["user"],
    }),
    getItems: builder.query({
      query: () => "/items",
      providesTags: ["items"],
    }),
    getstocks: builder.query({
      query: () => "/stock",
      providesTags: ["stock"],
    }),
    inventoryByID: builder.query({
      query: (id) => `/stock/${id}`,
      providesTags: ["stokById"],
    }),
    stockHistory: builder.query({
      query: (id) => `/stockhistory/${id}`,
    }),
    addStock: builder.mutation({
      query: (stock) => ({
        url: "/createstock",
        method: "POST",
        body: stock,
      }),
    }),
    deleteStock: builder.mutation({
      query: (post) => ({
        url: `/stockdelete/${post.id}`,
        method: "PATCH",
        body: post,
      }),
      invalidatesTags: ["stokById"],
    }),

    itemDelete: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/itemsdelete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["item"],
    }),

    userDelete: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/deleteuser/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),

    addEmployee: builder.mutation({
      query: (user) => ({
        url: "/register",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: "/login",
        method: "POST",
        body: user,
      }),
    }),
    updateEmployee: builder.mutation({
      query: (user) => ({
        url: `updateuser/${user.id}`,
        method: "post",
        body: user,
      }),
    }),

    moveinventory: builder.mutation({
      query: (inv) => ({
        url: `/moveinventory`,
        method: "post",
        body: inv,
      }),
    }),
    //moveinventory
    updateStock: builder.mutation({
      query: (stock) => ({
        url: `updatestock/${stock.id}`,
        method: "post",
        body: stock,
      }),
    }),

    updatePassword: builder.mutation({
      query: (user) => ({
        url: "updatepassword/1",
        method: "post",
        body: user,
      }),
    }),

    addItem: builder.mutation({
      query: (item) => ({
        url: "itemscreate",
        method: "post",
        body: item,
      }),
    }),

    editItem: builder.mutation({
      query: (item) => ({
        url: `/edititem/${item.id}`,
        method: "post",
        body: item,
      }),
    }),
  }),
});

export const {
  useGetAllEmployeeQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useUpdatePasswordMutation,
  useAddItemMutation,
  useGetItemsQuery,
  useEditItemMutation,
  useGetstocksQuery,
  useInventoryByIDQuery,
  useMoveinventoryMutation,
  useUpdateStockMutation,
  useAddStockMutation,
  useStockHistoryQuery,
  useDeleteStockMutation,
  useItemDeleteMutation,
  useUserDeleteMutation,
  useLoginMutation,
} = apiCalls;
