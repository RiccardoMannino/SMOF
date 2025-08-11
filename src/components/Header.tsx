import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { LogOutIcon, User2Icon } from "lucide-react";
import { GALLERIES_QUERY, LIST_PAGE_QUERY } from "@/sanity/lib/queries";
import ButtonMenu from "./ButtonMenu";
import { auth } from "@/lib/auth";
import { signOutAction } from "@/lib/action";

export async function Header() {
	const { data: pages } = await sanityFetch({
		query: LIST_PAGE_QUERY,
	});

	const { data: galleria } = await sanityFetch({
		query: GALLERIES_QUERY,
	});

	const session = await auth();

	return (
		<header className=" flex flex-col items-center justify-between  p-6 rounded-t-none rounded-b-lg bg-ivory ">
			<div className="hidden min-[899px]:flex justify-end self-end cursor-pointer gap-2.5 w-fit">
				{session?.user?.email ? (
					<>
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
						<form action={signOutAction} className="">
							<button type="submit" className="cursor-pointer flex gap-1">
								<span>Esci</span>
								<LogOutIcon />
							</button>
						</form>
					</>
				) : (
					<>
						<Link className="flex gap-1" href={"/login"}>
							<span className="font-bold">Login</span>
							<User2Icon />
						</Link>
					</>
				)}
			</div>

			<div className="flex  items-center justify-between w-full">
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
