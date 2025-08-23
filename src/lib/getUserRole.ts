import { auth } from "@/lib/auth";
import { writeClient } from "@/sanity/lib/client";

export async function getCurrentUserRole() {
	const session = await auth();
	const email = session?.user?.email;

	const user = await writeClient.fetch(
		`*[_type == "user" && email == $email][0]{ role }`,
		{ email: email }
	);

	const role = user?.role;

	return { role, session };
}
