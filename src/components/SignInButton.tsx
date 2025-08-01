import Image from "next/image";

import { signInAction } from "@/lib/action";

function SignInButton() {
	return (
		<form
			// server action
			action={
				// async () => {
				// "use server";
				// await signIn("google");}
				signInAction
			}
		>
			<button
				className="flex items-center justify-center gap-6 text-lg px-10 py-4 font-medium hover:cursor-pointer"
				type="submit"
			>
				<Image
					src="https://authjs.dev/img/providers/google.svg"
					alt="Google logo"
					height="24"
					width="24"
				/>
				<span className="text-chocolate">Accedi con Google</span>
			</button>
		</form>
	);
}

export default SignInButton;
