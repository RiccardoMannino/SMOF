"use client";

import { useForm, SubmitHandler } from "react-hook-form";

type IFormInput = {
	nome: string;
	cognome: string;
	email: string;
	telefono: string;
	messaggio: string;
};

export default function Page() {
	const {
		register,
		handleSubmit,
		// formState: { errors },
	} = useForm<IFormInput>();
	const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

	return (
		<section className="container mx-auto mb-14 max-sm:mb-5">
			<div className="max-h-max">
				<h1 className="text-2xl sm:text-3xl md:text-4xl mt-20 font-bold text-center max-sm:mb-5 mb-20 text-mustard">
					Contatti
				</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 h-full w-full bg-ivory text-chocolate rounded-2xl p-4">
					<h2 className="text-2xl sm:text-3xl md:text-4xl max-sm:mt-5 mt-20 font-bold">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias,
						quia. Quod, quibusdam ab! Maiores, voluptatibus vel libero veniam
						non quam suscipit eos tenetur sint, dolore blanditiis. Iste non
						voluptatum officia. Lorem ipsum dolor sit amet consectetur
						adipisicing elit. Iste minus et reprehenderit quas nesciunt illo,
						vitae consequatur facilis quaerat deserunt eum sed eius ut, eos
						voluptates veritatis exercitationem rerum ad!
					</h2>
					<div>
						<h2 className="text-2xl sm:text-3xl md:text-4xl mt-20 font-bold pl-4">
							Per informazioni Compila il Form
						</h2>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="flex flex-col h-full p-4 gap-4 font-semibold"
						>
							<label>Nome</label>
							<input
								className="border-2 border-chocolate rounded p-2"
								{...register("nome", { required: true, maxLength: 20 })}
							/>
							<label>Cognome</label>
							<input
								className="border-2 border-chocolate rounded p-2"
								{...register("cognome", {
									required: true,
									pattern: /^[A-Za-z]+$/i,
								})}
							/>
							<label>Email</label>
							<input
								className="border-2 border-chocolate rounded p-2"
								type="email"
								{...(register("email"), { required: true })}
							/>
							<label>Messaggio</label>
							<textarea
								className="border-2 border-chocolate rounded p-2"
								{...register("messaggio")}
							/>
							<input
								type="submit"
								className="border-2 border-chocolate rounded p-2 w-fit hover:cursor-pointer hover:text-ivory hover:bg-chocolate transition-colors"
							/>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
