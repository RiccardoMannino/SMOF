"use server";

import { auth } from "@/lib/auth";
import { readClient, writeClient } from "@/sanity/lib/client";

import { cookies } from "next/headers";

// export async function getAuthenticatedUser() {
// 	const cookieStore = await cookies();
// 	const deleteCookie = cookieStore.delete("authjs.session-token");

// 	const session = await auth();
// 	const userEmail = session?.user?.email;

// 	let existingUser = null;
// 	if (userEmail) {
// 		existingUser = await readClient.fetch(
// 			`*[_type == "user" && email == $email][0]`,
// 			{ email: userEmail }
// 		);
// 	}

// 	const user = await readClient.fetch(`*[_type == "user"][0]`);

// 	console.log(user);

// 	const disconnection = !user ? deleteCookie : user;

// 	return { session, existingUser, disconnection };
// }
