"use client";

import { ReactNode, useState } from "react";
import * as motion from "motion/react-client";

export default function HoveredLink({
	galleria,
	children,
}: {
	galleria: React.JSX.Element;
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
			<motion.div layout className="absolute bg-ivory rounded-2xl p-2 right-7">
				{active && galleria}
			</motion.div>
		</div>
	);
}
