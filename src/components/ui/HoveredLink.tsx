"use client";

import { ReactNode, useState } from "react";
import * as motion from "motion/react-client";

export default function HoveredLink({
	ospitalita,
	children,
}: {
	ospitalita: React.JSX.Element;
	children: ReactNode;
}) {
	const [active, setActive] = useState(false);

	return (
		<div
			className=""
			onMouseEnter={() => setActive(true)}
			onMouseLeave={() => setActive(false)}
		>
			{children}
			<motion.div
				layout
				className={`${active ? "border-2 border-rust" : ""} absolute bg-ivory rounded-2xl p-2 right-89 top-28 text-center `}
			>
				{active && ospitalita}
			</motion.div>
		</div>
	);
}
