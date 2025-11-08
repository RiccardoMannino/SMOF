import { writeClient } from "../sanity/lib/client";
import { signOutAction } from "./action";

export async function getAuthenticatedUser() {
	const user = await writeClient.fetch(`*[_type == "user"][0]`);

	const disconnection = user === null ? signOutAction() : user;

	return { disconnection, user };
}
