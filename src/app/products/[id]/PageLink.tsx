import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
	link: string[];
};

const PageLink = (props: Props) => {
	const pathname = usePathname().split("/");

	return (
		<li>
			{props.link.length == 1 ? (
				<Link href="/">/home</Link>
			) : pathname.length == props.link.length ? (
				props.link.join("/")
			) : (
				<Link href={props.link.join("/")}>{props.link.join("/")}</Link>
			)}
		</li>
	);
};

export default PageLink;
