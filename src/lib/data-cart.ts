import { notFound } from "next/navigation";
import { supabase } from "./supabase";

export async function getCart(userMail: string | null | undefined) {
	const { data, error } = await supabase
		.from("oggetti_carrello")
		.select("*")
		.eq("email", userMail);

	if (error) {
		console.error(error);
		notFound();
	}

	return data;
}
