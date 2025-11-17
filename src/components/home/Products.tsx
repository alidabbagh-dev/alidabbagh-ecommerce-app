"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProducts } from "@/redux/slices/fetchProductsSlice";
import React, { useEffect, useState } from "react";
import { productType } from "../../../types";
import { API_URL } from "../../../constants";
import Loading from "../Loading";
import Card from "../Card";

const Products = () => {
	const categories = ["all", "tops", "smartphones", "laptops"];

	const [category, setCategory] = useState("all");
	const dispatch = useAppDispatch();
	const products = useAppSelector(state => state.productsSlice.products);
	const cartProducts = useAppSelector(state => state.cartSlice.products);

	useEffect(() => {
		if (category == "all") {
			dispatch(fetchProducts(API_URL));
		} else {
			dispatch(fetchProducts(`${API_URL}/category/${category}`));
		}
	}, [category]);

	return (
		<div className="container mt-8">
			<div>
				<ul className="flex gap-4 px-4">
					{categories.map((item, index) => (
						<li
							key={index}
							onClick={() => {
								setCategory(item);
							}}
							className={`category-btn ${item == category ? "active" : ""}`}
						>
							{item}
						</li>
					))}
				</ul>
			</div>
			<div className="flex flex-wrap justify-center gap-2 py-4">
				{products.length != 0 ? (
					products.map((item: productType) => (
						<Card key={item.id} product={item} />
					))
				) : (
					<Loading />
				)}
			</div>
		</div>
	);
};

export default Products;
