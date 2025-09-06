"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { User2Icon, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { signOutAction } from "@/lib/action";
import { LIST_PAGE_QUERYResult } from "@/sanity/types";
import { useMenuLockBodyScroll } from "@/app/hooks/useLockBodyScroll";
import { Session } from "next-auth";
import Image from "next/image";

type PageProps = LIST_PAGE_QUERYResult;

export default function ButtonMenu({
	list,
	session,
}: {
	list: PageProps;
	session: Session | null;
}) {
	const [open, setOpen] = useState(false);

	useMenuLockBodyScroll(open, setOpen);

	return (
		<>
			{/* Logo Smof */}
			<Link href="/" className={`${open && "z-60"}`}>
				<Image
					src="/logo_smof.png"
					alt="home"
					height={50}
					width={100}
					className={`md:w-40 md:h-20`}
				/>
			</Link>
			{/* tutto il div  */}
			<motion.div
				className={`hidden max-[899px]:flex w-full max-[899]: max-[899px]:items-center max-[899px]:gap-2 z-60 `}
			>
				{/* div avatar/login */}
				<div className="flex gap-2 w-full items-center justify-end">
					{session?.user?.email ? (
						<>
							<Image
								src={session?.user?.image as string}
								alt="avatar"
								width={24}
								height={24}
								className="rounded-full mr-1"
							/>
							<p>
								{session.user.name?.toUpperCase().slice(0, 1)}
								<span>
									{session.user.name?.slice(1).split(" ").slice(0, 1)}
								</span>
							</p>
							<form action={signOutAction} className="">
								<button type="submit" className="cursor-pointer flex gap-1">
									<LogOutIcon />
								</button>
							</form>
						</>
					) : (
						<>
							<Link
								className="flex gap-1 z-60 "
								href={"/login"}
								onClick={() => setOpen(false)}
							>
								<span className="font-bold">Login</span>
								<User2Icon />
							</Link>
						</>
					)}

					<motion.button
						className={`z-60 rounded hover:cursor-pointer flex `}
						onClick={() => setOpen(!open)}
					>
						<motion.svg
							xmlns="http://www.w3.org/2000/svg"
							className="size-7 "
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							animate={{ rotate: open ? 0 : 180 }}
							transition={{ duration: 1 }}
						>
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
				{/* pulsante apertura menù */}
			</motion.div>

			{/* menù a tendina */}
			<motion.div
				className={`${(open && "fixed left-0 top-0 z-50 hidden max-[899px]:inline-flex max-[899px]:w-screen") || "fixed max-md:w-0 w-screen right-0 top-0 z-50 "}`}
				animate={{ x: open ? 0 : -1000 }}
				initial={false}
				transition={{
					duration: 0.7,
					ease: open ? "easeIn" : "easeOut",
				}}
			>
				<motion.ul
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
					className={`flex h-dvh flex-col items-center max-sm:justify-end justify-center bg-ivory text-center text-sm w-full ${!open && "hidden"}`}
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
							className="my-1.5 w-fit rounded-md p-2 text-2xl font-semibold text-chocolate transition-colors duration-700  hover:text-rust"
							key={link.slug}
						>
							{link.slug ? (
								<Link
									href={link?.slug.toString()}
									onClick={() => setOpen(false)}
								>
									{link.title}
								</Link>
							) : null}
						</motion.li>
					))}
				</motion.ul>
			</motion.div>
		</>
	);
}
