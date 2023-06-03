import { configureStore } from "@reduxjs/toolkit";
import { crudApi } from "./ApiQuery";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
    reducer: {
        [crudApi.reducerPath] : crudApi.reducer
    }, 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(crudApi.middleware),
})

setupListeners(store.dispatch)