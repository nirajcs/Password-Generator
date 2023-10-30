import { apiSlice } from "./apiSlice";
const USERS_URL = '/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/auth-user`,
                method:'POST',
                body:data
            })
        }),
        register:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/register-user`,
                method:'POST',
                body:data
            })
        }),
        savePassword:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/save-password`,
                method:'POST',
                body:data
            })
        }),
        deletePassword:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/delete-saved`,
                method:'POST',
                body:data
            })
        }),
        logout:builder.mutation({
            query:()=>({
                url:`${USERS_URL}/logout`,
                method:'POST'
            })
        }),
    })
})

export const { useLoginMutation,useLogoutMutation,useRegisterMutation,useSavePasswordMutation,useDeletePasswordMutation } = usersApiSlice;