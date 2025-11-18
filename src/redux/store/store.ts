import productSlice from "./../slices/fetchSingleProduct";
import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../slices/fetchProductsSlice";
import searchSlice from "../slices/searchSlice";
import cartSlice from "../slices/cartSlice";
import authReducer from "../slices/authSlice";
export const store = configureStore({
	reducer: {
		productsSlice,
		productSlice,
		searchSlice,
		cartSlice,
		auth:authReducer
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
