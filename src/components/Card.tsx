import React from "react";
import { productType } from "../../types";
import { MdAddCircleOutline } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart, setCartProductsToLS } from "@/redux/slices/cartSlice";
import Link from "next/link";
import Image from "next/image";
import { searchBtnToggle } from "@/redux/slices/searchSlice";

interface Props {
	product?: productType;
}

const Card = (props: Props) => {
	if (!props.product) return null; 

	const { id, thumbnail, title, price, description } = props.product;

	const dispatch = useAppDispatch();
	const searchModal = useAppSelector(state => state.searchSlice.modalIsOpen);

	const [showSnackbar, setShowSnackbar] = React.useState(false);

	const handleAddToCart = () => {
		dispatch(addToCart(props.product!)); 
		dispatch(setCartProductsToLS());

		setTimeout(() => {
			setShowSnackbar(true);
			setTimeout(() => setShowSnackbar(false), 1000);
		}, 500);
	};

	return (
		<>
			{showSnackbar && (
				<div className="fixed top-5 mx-auto bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
					Product Added to Your Cart
				</div>
			)}
			<div className="card relative">
				<Link
					onClick={() => searchModal && dispatch(searchBtnToggle())}
					href={`products/${id}`}
				>
					<Image
						src={thumbnail}
						width={300}
						height={300}
						alt={title}
						loading="lazy"
						className="product-image"
					/>
				

				<div className="flex justify-between items-center">
					<h4 className="title">{title}</h4>
					<span className="price">{price}$</span>
				</div>

					<p className="description">{description}</p>
			   </Link>

				<button onClick={handleAddToCart} className="btn cart">
					<MdAddCircleOutline size={20} />
					Cart
				</button>
			</div>
		</>
	);
};


export default Card;
