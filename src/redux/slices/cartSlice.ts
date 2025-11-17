import { productType } from "./../../../types.d";
import { createSlice } from "@reduxjs/toolkit";

type ProductCartType = {
	product: productType;
	count: number;
};

type productsType = {
	products: ProductCartType[];
};

const initialState = {
	products: [],
} as productsType;

const cartSlice = createSlice({
	initialState: initialState,
	name: "cart",
	reducers: {
		addToCart: (state, action) => {
			const newProduct = { product: action.payload, count: 1 };
			if (state.products.length == 0) {
				state.products.push(newProduct);
				localStorage.setItem("cartProducts", JSON.stringify(newProduct));
			} else {
				let isDuplicated = false;

				state.products.map(
					item =>
						item.product.id == newProduct.product.id && (isDuplicated = true)
				);

				if (!isDuplicated) {
					state.products.push(newProduct);
				}
			}
		},
		incrementItem: (state, action) => {
			state.products.map(
				item => item.product.id == action.payload && item.count++
			);
		},
		decrementItem: (state, action) => {
			state.products.map(
				item =>
					item.product.id == action.payload && item.count > 1 && item.count--
			);
		},
		removeFromCart: (state, action) => {
			const updated = state.products.filter(
				item => item.product.id != action.payload
			);

			return {
				state,
				products: updated,
			};
		},
		setCartProductsToLS: state => {
			localStorage.setItem("cartProducts", JSON.stringify(state.products));
		},
		setCartProducts: (state, action) => {
			state.products = action.payload;
		},
		clearCart: state => {
			state.products = [];
		},
	},
});

export default cartSlice.reducer;

export const {
	addToCart,
	setCartProductsToLS,
	incrementItem,
	decrementItem,
	removeFromCart,
	clearCart,
	setCartProducts,
} = cartSlice.actions;
