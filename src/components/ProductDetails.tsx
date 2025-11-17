"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProduct } from "@/redux/slices/fetchSingleProduct";
import Loading from "@/components/Loading";
import Image from "next/image";
import { RxDot, RxDotFilled } from "react-icons/rx";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { addToCart, setCartProductsToLS } from "@/redux/slices/cartSlice";
import { MdAddCircleOutline } from "react-icons/md";
import { productType } from "../../types";
import { API_URS_SINGLE } from "../../constants";
import PageLink from "@/app/products/[id]/PageLink";

const ProductDetails = () => {
	const [imageToShow, setImageToShow] = useState<number>(-1);
	const [product, setProduct] = useState<productType | null>(null);

	const pathname = usePathname().split("/");

	const dispatch = useAppDispatch();
	const state = useAppSelector(state => state.productSlice);

	useEffect(() => {
		dispatch(
			fetchProduct(`${API_URS_SINGLE}/${pathname.slice(-1).toString()}`)
		);
	}, []);

	const handleSelectImage = (e: string) => {
		if (product != null) {
			if (e == "right" && imageToShow < product.images.length - 1) {
				setImageToShow(prev => prev + 1);
			} else if (e == "left" && imageToShow > -1) {
				setImageToShow(prev => prev - 1);
			}
		}
	};

	useEffect(() => {
		if (state != null) {
			setProduct(state);
		}
	}, [state]);

	return (
		<div className="container">
			<div className="text-sm breadcrumbs">
				<ul>
					{pathname.map((_, index) => (
						<PageLink key={index} link={pathname.slice(0, index + 1)} />
					))}
				</ul>
			</div>
			<div>
				{product != null ? (
					<div className="w-full h-[40rem]  flex flex-col justify-center">
						<div className="container flex flex-col-reverse lg:flex-row items-center gap-4 p-4">
							<div className="w-full lg:w-2/4">
								<span>({product.rating})</span>
								<h1 className="text-4xl font-bold">{product.title}</h1>
								<h4 className="font-semibold text-green-500">
									{product.brand}
								</h4>
								<p className="text-gray-500 my-4">{product.description}</p>
								<span className="text-xl font-semibold">
									{(
										product.price -
										(product.discountPercentage / 100) * product.price
									).toFixed(2)}
									$
								</span>
								<span className="text-xl text-gray-300 pl-4 line-through">
									{product.price}$
								</span>
								<div>
									<button
										onClick={() => {
											dispatch(addToCart(product));
											dispatch(setCartProductsToLS());
										}}
										className="btn cart"
									>
										<MdAddCircleOutline size={20} />
										Cart
									</button>
								</div>
							</div>
							<div className="w-full">
								<div className="relative aspect-video w-full">
									<Image
										className="w-full h-full object-cover rounded-md"
										priority
										width={500}
										height={500}
										src={
											imageToShow < 0
												? product.thumbnail
												: product.images[imageToShow]
										}
										alt=""
									/>
									<div className="absolute w-full top-2/4 translate-y-[-50%] flex justify-between px-3">
										<button
											onClick={() => handleSelectImage("left")}
											className="arrow-btn main-btn"
										>
											<GoArrowLeft />
										</button>
										<button
											onClick={() => handleSelectImage("right")}
											className="arrow-btn main-btn"
										>
											<GoArrowRight />
										</button>
									</div>
								</div>
								<div className="w-full flex justify-center mt-4">
									<>
										<button onClick={() => setImageToShow(-1)}>
											{imageToShow == -1 ? (
												<RxDotFilled size={30} />
											) : (
												<RxDot size={30} />
											)}
										</button>
										{product.images.map((_, index) => (
											<button key={index} onClick={() => setImageToShow(index)}>
												{imageToShow == index ? (
													<RxDotFilled size={30} />
												) : (
													<RxDot size={30} />
												)}
											</button>
										))}
									</>
								</div>
							</div>
						</div>
					</div>
				) : (
					<Loading />
				)}
			</div>
		</div>
	);
};

export default ProductDetails;
