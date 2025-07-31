import React from "react";
import SignInButton from "@/components/SignInButton";

export default function page() {
	return (
		<section className=" flex justify-center items-center h-[30rem]">
			<div className="flex flex-col gap-10 mt-10 items-center bg-ivory rounded-2xl">
				<h2 className="text-3xl font-semibold ">Accedi</h2>
				<SignInButton />
			</div>
		</section>
	);
}
