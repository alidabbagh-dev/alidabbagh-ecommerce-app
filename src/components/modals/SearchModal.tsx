"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProducts } from "@/redux/slices/fetchProductsSlice";
import {
	fetchSearchProducts,
	searchBtnToggle,
} from "@/redux/slices/searchSlice";
import React, { FormEvent, useEffect, useState } from "react";
import { CgCloseR } from "react-icons/cg";
import { BiSearch } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";
import { addToCart, setCartProductsToLS } from "@/redux/slices/cartSlice";
import { MdAddCircleOutline } from "react-icons/md";
import Card from "../Card";

const SearchModal = () => {
	const [inputValue, setInputValue] = useState<string>("");
	const state = useAppSelector(state => state.searchSlice);
	const dispatch = useAppDispatch();
	const { modalIsOpen, results } = state;

	const handleSubmitSearch = (e: FormEvent) => {
		e.preventDefault();
		if (inputValue != "") {
			dispatch(fetchSearchProducts(inputValue));
		}
	};

	useEffect(() => {
		if (state.modalIsOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "visible";
		}
	}, [state.modalIsOpen]);

	if (modalIsOpen) {
		return (
			<div className="absolute w-full h-full top-0 left-0 bg-gray-500 bg-opacity-95 z-40">
				<div className="w-full h-full py-8 grid justify-center items-center z-50">
					<div>
						<form
							onSubmit={e => {
								handleSubmitSearch(e);
							}}
							className="w-[300px] md:w-[400px] mx-auto"
						>
							<button
								onClick={() => {
									dispatch(searchBtnToggle());
								}}
								type="button"
								className="block mb-3 text-white bg-gray-700 hover:bg-gray-800 focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm p-1 text-center shadow-gray-500 shadow-md transition"
							>
								<CgCloseR size={25} />
							</button>
							<div className="flex gap-2">
								<input
									onChange={e => {
										setInputValue(e.target.value);
									}}
									type="text"
									placeholder="Type here"
									className="input input-bordered w-full text-gray-900 bg-gray-200 shadow-md"
								/>
								<button
									type="submit"
									className="flex justify-center items-center min-h-[48px] min-w-[48px] mx-auto mb-3 bg-gray-700 hover:bg-gray-800 rounded-lg text-sm text-center text-white shadow-md transition"
								>
									<BiSearch size={25} />
								</button>
							</div>
						</form>
						{results.length != 0 ? (
							<div className="container w-screen mt-4 h-[calc(100vh-200px)] grid place-items-center pb-4 overflow-x-hidden overflow-scroll">
								<div className="flex flex-cols flex-wrap justify-center items-start gap-2 ">
									{results.map(item => (
										<Card key={item.id} product={item} />
									))}
								</div>
							</div>
						) : (
							<h3 className="text-center">No products to show.</h3>
						)}
					</div>
				</div>
			</div>
		);
	} else return null;
};

export default SearchModal;
