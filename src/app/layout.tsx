import "../app/globals.scss";
import { Providers } from "@/redux/provider";
import { lazy } from "react";
import icon from "@/app/favicon.ico";

const NavbarCom = lazy(() => import("@/components/navbar/Navbar"));

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<title>E-commerce</title>
				<link
					rel="icon"
					type="image/x-icon"
					href="https://www.iconarchive.com/download/i99749/sonya/swarm/Shopping.ico"
				/>
			</head>
			<body>
				<Providers>
					<NavbarCom />
					{children}
				</Providers>
			</body>
		</html>
	);
}
