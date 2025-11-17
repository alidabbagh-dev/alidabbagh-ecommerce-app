import { lazy } from "react";

const ProductDetailsCom = lazy(() => import("@/components/ProductDetails"));

const page = () => {
	return <ProductDetailsCom />;
};

export default page;
