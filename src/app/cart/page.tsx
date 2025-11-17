import React, { lazy } from "react";

const CartCom = lazy(() => import("@/components/cart/Cart"));

const page = () => {
	return <CartCom />;
};

export default page;
