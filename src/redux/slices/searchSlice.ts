import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productType } from "../../../types";
import axios from "axios";

type searchState = {
	modalIsOpen: boolean;
	results: productType[];
};

const initialState = {
	modalIsOpen: false,
	results: [],
} as searchState;

export const fetchSearchProducts = createAsyncThunk(
	"searchSlice/search",
	async (q: string) => {
		try {
			const { data } = await axios.get(
				`https://dummyjson.com/products/search?q=${q}`
			);
			return data.products;
		} catch {
			console.log(Error);
		}
	}
);

const searchSlice = createSlice({
	name: "search",
	initialState: initialState,
	reducers: {
		searchBtnToggle: state => void (state.modalIsOpen = !state.modalIsOpen),
	},
	extraReducers: builder => {
		builder.addCase(fetchSearchProducts.fulfilled, (state, action) => {
			state.results = action.payload;
		});
	},
});

export const { searchBtnToggle } = searchSlice.actions;
export default searchSlice.reducer;
