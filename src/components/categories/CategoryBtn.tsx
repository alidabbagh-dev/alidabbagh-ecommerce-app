import React from "react";
import { MdOutlineCategory } from "react-icons/md";

type Props = {
	title: string;
};

const CategoryBtn = (props: Props) => {
	return (
		<div className="">
			<h3>{props.title}</h3>
			{/* <button>
				<MdOutlineCategory size={20} />
			</button> */}
		</div>
	);
};

export default CategoryBtn;
