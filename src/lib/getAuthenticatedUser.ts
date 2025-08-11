import { auth } from "@/lib/auth";
import { readClient } from "@/sanity/lib/client";

export async function getAuthenticatedUser() {
	const session = await auth();
	const userEmail = session?.user?.email;
	let existingUser = null;
	if (userEmail) {
		existingUser = await readClient.fetch(
			`*[_type == "user" && email == $email][0]`,
			{ email: userEmail }
		);
	}
	return { session, existingUser };
}
