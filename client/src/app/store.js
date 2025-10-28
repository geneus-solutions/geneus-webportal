import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./api/apiSlice";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/Cart/cartSlice";
import careersReducer from '../features/careers/careersSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cartData: cartReducer,
        careers: careersReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
});