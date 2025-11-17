import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

type Props = {
	link: string;
};

const NavLink = (props: Props) => {
	const { link } = props;

	const pathname = usePathname().slice(1);

	return (
		<li className={`navLink ${pathname == link ? "active" : ""}`}>
			<Link href={link} className="capitalize">
				{link}
			</Link>
		</li>
	);
};

export default NavLink;
