import React from "react";
import { productType } from "../../../types";
import { IoMdAddCircle, IoMdRemoveCircle } from "react-icons/io";
import {
	decrementItem,
	incrementItem,
	removeFromCart,
} from "@/redux/slices/cartSlice";
import { AiFillDelete } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";

type Props = {
	product: productType;
	count: number;
};

const CartProduct = (props: Props) => {
	const { count } = props;
	const { id, thumbnail, title, brand, description, price, category } =
		props.product;

	const dispatch = useAppDispatch();

	return (
		<tr className="[&>td]:p-2 [&>th]:p-0 md:[&>td]:p-4">
			<td>
				<div className="flex items-center space-x-3">
					<div className="relative avatar">
						<span className="absolute w-6 h-6 font-semibold bg-blue-500 text-white rounded-full flex justify-center items-center overflow-visible z-50 top-[-3px] left-[-3px]">
							{count}
						</span>
						<div className="mask mask-squircle w-12 h-12">
							<Image
								width={100}
								height={100}
								src={thumbnail}
								
								alt="Avatar Tailwind CSS Component"
							/>
						</div>
					</div>
					<div>
						<Link
							href={`/products/${id}`}
							className="font-bold w-full text-xs line-clamp-1"
						>
							{title}
						</Link>
						<div className="text-sm opacity-50">{brand}</div>
					</div>
				</div>
			</td>
			<td className="max-w-[12rem] text-ellipsis overflow-hidden hidden md:table-cell">
				<p className="line-clamp-1 mb-3 text-gray-200">{description}</p>
				<span className="badge badge-ghost badge-sm">{category}</span>
			</td>
			<td>{price}$</td>
			<td>
				<div className="flex justify-end items-center">
					<button
						onClick={() => dispatch(incrementItem(id))}
						className="btn btn-ghost !min-h-[12px] !h-8 px-1"
					>
						<IoMdAddCircle size={20} />
					</button>
					<button
						onClick={() => dispatch(decrementItem(id))}
						className="btn btn-ghost !min-h-[12px] !h-8 px-1"
					>
						<IoMdRemoveCircle size={20} />
					</button>
					<button
						onClick={() => dispatch(removeFromCart(id))}
						className="btn btn-ghost !min-h-[12px] !h-8 px-1 mdml-3 text-red-500"
					>
						<AiFillDelete size={20} />
					</button>
				</div>
			</td>
		</tr>
	);
};

export default CartProduct;
