import SignInButton from "@/components/SignInButton";
import { auth } from "@/lib/auth";

export default async function page() {
	const session = await auth();

	return (
		<section className=" flex justify-center items-center h-[30rem]">
			<div className="flex flex-col gap-6 mt-10 items-center justify-center bg-ivory rounded-2xl">
				{!session ? (
					<>
						<h2
							className="text-3xl font-semibold w-full text-center text-chocolate mt-2.5
						"
						>
							Accedi
						</h2>
						<SignInButton />
					</>
				) : (
					<p className="p-2">Sei già autenticato!</p>
				)}
			</div>
		</section>
	);
}
