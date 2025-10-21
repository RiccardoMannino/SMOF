import Image from "next/image";
import Link from "next/link";
import { GALLERIES_QUERY, LIST_PAGE_QUERY } from "@/sanity/lib/queries";
import { signOutAction } from "@/lib/action";

import { auth } from "@/lib/auth";

import YoutubeWhite from "../../public/youtube-white.svg";
import InstagramWhite from "../../public/instagram-white.svg";
import FacebookWhite from "../../public/facebook-white.svg";
import ButtonMenu from "./ButtonMenu";
import { sanityFetch } from "@/sanity/lib/live";
import { LogOutIcon, ShoppingCart, User2Icon } from "lucide-react";

export async function Header() {
	const { data: pages } = await sanityFetch({
		query: LIST_PAGE_QUERY,
	});

	const { data: galleria } = await sanityFetch({
		query: GALLERIES_QUERY,
	});

	const session = await auth();

	return (
		<header className=" flex flex-col items-center justify-between w-full pb-6 rounded-t-none rounded-b-lg bg-ivory ">
			<div className="flex justify-end self-end w-full z-80">
				{session?.user?.email ? (
					<div className="flex gap-2.5 justify-between p-2 bg-forest/50 w-full text-ivory">
						<div className="flex gap-2">
							<Link
								href={
									"https://www.facebook.com/profile.php?id=61564533287297&sk=reels_tab"
								}
								target="_blank"
							>
								<Image
									src={FacebookWhite}
									height={25}
									width={25}
									className="h-5 w-5"
									alt="link facebook"
								/>
							</Link>
							<Link
								href={"https://www.instagram.com/effetto.outdoor/"}
								target="_blank"
							>
								<Image
									src={InstagramWhite}
									height={25}
									width={25}
									className="h-5 w-5"
									alt="link Instagram"
								/>
							</Link>
							<Link href={""} target="_blank">
								<Image
									src={YoutubeWhite}
									height={25}
									width={25}
									className="h-5 w-5"
									alt="link canale youtube"
								/>
							</Link>
						</div>
						<div className="flex gap-2 items-center">
							<Link href="/utente" className="flex items-center">
								<Image
									src={session?.user?.image as string}
									alt="avatar"
									width={24}
									height={24}
									className="rounded-full mr-1 cursor-pointer"
								/>
								<p>
									{session.user.name?.toUpperCase().slice(0, 1)}
									<span>
										{session.user.name?.slice(1).split(" ").slice(0, 1)}
									</span>
								</p>
							</Link>
							<Link href={"/carrello"}>
								<ShoppingCart className="stroke-ivory" />
							</Link>
							<form action={signOutAction} className="">
								<button type="submit" className="cursor-pointer flex gap-1">
									<span>Esci</span>
									<LogOutIcon className="stroke-ivory" />
								</button>
							</form>
						</div>
					</div>
				) : (
					<div className="w-full bg-forest/80">
						<Link
							className="flex p-2 text-ivory justify-end gap-1"
							href={"/login"}
						>
							<span className="font-bold ">Login</span>
							<User2Icon className="text-ivory" />
						</Link>
					</div>
				)}
			</div>

			<div className="flex max-[899px]:flex-col items-center justify-between w-full p-4 mr-2 ml-2">
				<ButtonMenu list={pages} session={session} />
				<ul className="hidden min-[899px]:flex items-center gap-4 font-semibold  text-chocolate">
					{pages?.map((page) => (
						<li key={page._id}>
							<Link
								className="hover:text-rust transition-colors"
								href={`/${page.slug}`}
							>
								{page.title === "galleria"
									? galleria.map((el) => (
											<Link
												key={el._id}
												href={`/galleria/${el.slug?.current}`}
												className="text-mustard font-semibold flex flex-col "
											>
												<h1>{el.titolo}</h1>
											</Link>
										))
									: page.title}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</header>
	);
}
