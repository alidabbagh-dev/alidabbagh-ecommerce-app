import { lazy } from "react";

const BannerCom = lazy(() => import("@/components/home/Banner"));
const ProductsCom = lazy(() => import("@/components/home/Products"));

export default function Home() {
	return (
		<div className="mx-auto">
			<BannerCom />
			<ProductsCom />
		</div>
	);
}
