import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
	"products/productsSlice",
	async (API_URL: string) => {
		try {
			const { data } = await axios.get(API_URL);
			return data.products;
		} catch {
			console.log(Error);
		}
	}
);

export const productsSlice = createSlice({
	name: "products",
	initialState: {
		products: [],
	},
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchProducts.fulfilled, (state, action) => {
			state.products = action.payload;
		});
	},
});

export default productsSlice.reducer;
