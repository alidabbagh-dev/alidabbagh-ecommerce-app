import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const fetchProduct = createAsyncThunk(
	"product/productSlice",
	async (API_URL: string) => {
		try {
			const { data } = await axios.get(API_URL);
			return data;
		} catch {
			console.log(Error);
		}
	}
);

export const productSlice = createSlice({
	name: "product",
	initialState: null,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(
			fetchProduct.fulfilled,
			(state, action) => (state = action.payload)
		);
	},
});

export default productSlice.reducer;
