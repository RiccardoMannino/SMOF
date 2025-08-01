import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { User2Icon } from "lucide-react";
import { GALLERIES_QUERY, LIST_PAGE_QUERY } from "@/sanity/lib/queries";
import ButtonMenu from "./ButtonMenu";
import { auth } from "@/lib/auth";
// import { User2Icon } from "lucide-react";

export async function Header() {
	const { data: pages } = await sanityFetch({
		query: LIST_PAGE_QUERY,
	});

	const { data: galleria } = await sanityFetch({
		query: GALLERIES_QUERY,
	});

	const session = await auth();
	console.log(session);

	return (
		<header className=" flex flex-col items-center justify-between max-sm:pt-0   p-6 rounded-t-none rounded-b-lg bg-ivory ">
			<div className="flex justify-end self-end cursor-pointer gap-2.5">
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
							<span>{session.user.name?.slice(1).split(" ").slice(0, 1)}</span>
						</p>
					</>
				) : (
					<>
						<span className="font-bold ">Login</span>
						<Link href={"/login"}>
							<User2Icon />
						</Link>{" "}
					</>
				)}
			</div>

			<div className="flex justify-between items-center w-full">
				<Link href="/">
					<Image
						src="/logo_smof.png"
						alt="home"
						height={50}
						width={100}
						className="md:w-40 md:h-20"
					/>
				</Link>
				<ButtonMenu list={pages} />
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
