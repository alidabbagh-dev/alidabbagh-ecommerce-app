import React, { lazy } from "react";

const ProductsCom = lazy(() => import("@/components/home/Products"));

const page = () => {
	return <ProductsCom />;
};

export default page;
