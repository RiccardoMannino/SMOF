import Link from "next/link";
import Image from "next/image";

export function Header() {
	return (
		<div className="from-pink-50 to-white bg-gradient-to-b p-6">
			<header className="bg-white/80 shadow-md flex items-center justify-between p-6 rounded-lg container mx-auto shadow-pink-50">
				<Link href="/">
					<Image
						src="/logo_smof.jpg"
						alt="home"
						height={50}
						width={100}
						className="md:w-40 md:h-20"
					/>
				</Link>
				<ul className="flex items-center gap-4 font-semibold text-slate-700">
					<li>
						<Link
							className="hover:text-pink-500 transition-colors"
							href="/eventi"
						>
							Eventi
						</Link>
					</li>
					<li>
						<Link
							className="hover:text-pink-500 transition-colors"
							href="/about"
						>
							Chi siamo
						</Link>
					</li>
					<li>
						<Link
							className="hover:text-pink-500 transition-colors"
							href="/studio"
						>
							Sanity Studio
						</Link>
					</li>
				</ul>
			</header>
		</div>
	);
}
