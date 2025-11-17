import { lazy } from "react";

const CategoriesCom = lazy(() => import("@/components/categories/Categories"));

const page = () => {
	return <CategoriesCom />;
};

export default page;
