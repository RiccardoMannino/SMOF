import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { GALLERIES_QUERY, LIST_PAGE_QUERY } from "@/sanity/lib/queries";
import ButtonMenu from "./ButtonMenu";

export async function Header() {
	const { data: pages } = await sanityFetch({
		query: LIST_PAGE_QUERY,
	});

	const { data: galleria } = await sanityFetch({
		query: GALLERIES_QUERY,
	});

	return (
		<header className=" flex items-center justify-between p-6 rounded-t-none rounded-b-lg bg-ivory ">
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
		</header>
	);
}
