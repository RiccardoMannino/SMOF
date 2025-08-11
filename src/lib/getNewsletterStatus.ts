import { writeClient } from "@/sanity/lib/client";
import { auth } from "@/lib/auth";

export async function getNewsletterStatus() {
	const session = await auth();

	const userEmail = session?.user?.email;

	let isSubscribed = false;

	if (userEmail) {
		const user = await writeClient.fetch(
			`*[_type == "user" && email == $email][0]{
                subscribeNewsletter
            }`,
			{ email: userEmail },
			{
				next: { tags: ["newsletter-status", `newsletter-status:${userEmail}`] },
			}
		);
		isSubscribed = !!user?.subscribeNewsletter;
	}

	return {
		session,
		isSubscribed,
	};
}
