"use client";

import { useState } from "react";
import {
	LIST_PAGE_QUERY_RESULT,
	OSPITALITA_QUERY_RESULT,
} from "../sanity/sanity.types";
import { ArrowDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { Session } from "next-auth";

type PageProps = LIST_PAGE_QUERY_RESULT;
type OspitalitaProps = OSPITALITA_QUERY_RESULT;

export default function ButtonMenu({
	list,
	ospitalita,
	session,
}: {
	list: PageProps;
	ospitalita: OspitalitaProps;
	session: Session | null;
}) {
	const [open, setOpen] = useState(false);
	const [isSelected, setIsSelected] = useState(false);
	const [indice, setIndice] = useState<string | null>(null);

	function handleSelect(index: string) {
		setIndice(index);
		setIsSelected(true);

		if (indice === index && isSelected) {
			setIsSelected(!isSelected);
		}
	}

	function handleOpenClose() {
		setOpen(!open);
		setIndice(null);
		setIsSelected(false);
	}

	return (
		<>
			{/* tutto il div  */}
			<div className="flex flex-col max-[899px]:w-full">
				<div
					className={`flex justify-between w-full items-center ${open && "z-60"}`}
				>
					<Link href="/" className={``}>
						{/* Logo Smof */}
						<Image
							src="/logo_smof.png"
							alt="home"
							loading="eager"
							height={50}
							width={150}
							quality={70}
							className={`md:w-48 md:h-24 h-auto w-auto`}
						/>
					</Link>
					<motion.button
						className={`z-60 rounded hover:cursor-pointer hidden max-[899px]:flex`}
						onClick={handleOpenClose}
					>
						<span className="font-semibold text-cholate mr-2">Menù</span>
						<motion.svg
							xmlns="http://www.w3.org/2000/svg"
							className="size-7 "
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							animate={{ rotate: open ? 0 : 180 }}
							transition={{ duration: 1 }}
						>
							{/* pulsante apertura menù */}
							{!open ? (
								<>
									<path
										d="M4 6l16 0"
										fill="none"
										strokeWidth={2}
										stroke="#4e3b31"
									></path>
									<path
										d="M4 12l16 0"
										fill="none"
										strokeWidth={2}
										stroke="#e50415"
									></path>
									<path
										d="M4 18l16 0"
										fill="none"
										strokeWidth={2}
										stroke="#3baa35"
									></path>
								</>
							) : (
								<>
									<path d="M6 6L18 18" stroke="#fccd12" strokeWidth={2} />
									<path d="M6 18L18 6" stroke="#3baa35" strokeWidth={2} />
								</>
							)}
						</motion.svg>
					</motion.button>
				</div>
			</div>
			{/* menù a tendina */}
			<motion.div
				className={`${(open && "relative z-50 hidden max-[899px]:flex max-[899px]:w-screen ") || "fixed max-md:w-0 w-screen right-0 top-0 z-50 "}`}
				animate={{ x: open ? 0 : -1000 }}
				initial={false}
				transition={{
					duration: 0.7,
					ease: open ? "easeIn" : "easeOut",
				}}
			>
				<motion.ul
					role="list"
					initial={false}
					animate={open ? "open" : "closed"}
					variants={{
						open: {
							opacity: 1,
							transition: {
								staggerChildren: 0.4,
								delayChildren: 0.2,
								duration: 1,
							},
						},
						closed: {
							opacity: 0,
						},
					}}
					className={`flex gap-1 relative flex-col items-center max-sm:justify-center mt-10 justify-center bg-ivory text-sm w-full ${!open && "hidden"}`}
				>
					{/* voci menù */}
					{list.map((link) => (
						<motion.li
							variants={{
								open: {
									opacity: 1,
									x: 100,
									transform: "translateX(0)",
								},
								closed: {
									opacity: 0,
									x: -100,
								},
							}}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
							className="w-fit rounded-md p-1 text-xl font-medium text-chocolate group relative transition-colors duration-700  hover:text-rust "
							key={link.slug}
						>
							{link.title === "Ospitalità" ? (
								<div
									className={"flex gap-2 justify-center "}
									onClick={() => handleSelect(link._id)}
								>
									{/* <p>{link.title}</p>
									 */}
									{link.title}
									<motion.button
										animate={{
											rotate: isSelected && link._id === indice ? 180 : 0,
										}}
										transition={{ duration: 0.5, delay: 0 }}
									>
										<ArrowDown />
									</motion.button>
								</div>
							) : (
								<Link
									href={`/${link?.slug}`}
									onClick={() => setOpen(false)}
									className=""
								>
									{link.title}
								</Link>
							)}
							<AnimatePresence>
								{isSelected && link._id === indice && (
									<motion.div
										className={` ${(isSelected && indice === link._id && "group-hover:flex flex-col overflow-y-scroll") || "hidden"}  rounded-md w-fit self-center border border-white mt-3 max-h-48 `}
										transition={{ duration: 0.3 }}
										initial={{ opacity: 0, y: -20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -20 }}
									>
										{ospitalita.map((el) => (
											<Link
												key={el._id}
												href={`/ospitalita/${el.slug?.current}`}
												className={`${isSelected && "hover:text-rust  "}transition-colors font-semibold flex flex-col text-center relative`}
												onClick={() => setOpen(false)}
											>
												<motion.h6 className=" my-2">{el.luogo}</motion.h6>
											</Link>
										))}
									</motion.div>
								)}
							</AnimatePresence>
						</motion.li>
					))}
				</motion.ul>
			</motion.div>
		</>
	);
}
