"use client";
import Image from "next/image";
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
		<section className="container mx-auto mb-14 max-sm:mb-8 max-w-5xl px-2 ">
			<div className="max-h-max">
				<h1 className="text-2xl sm:text-3xl md:text-5xl mt-20 font-bold text-center max-sm:mb-5 mb-20 text-mustard">
					Contatti
				</h1>
				<div className="grid grid-cols-1  max-sm:place-items-center sm:grid-cols-[350px_1fr] gap-8 h-full w-full bg-ivory text-chocolate rounded-2xl p-4">
					<div className="mt-20 flex flex-col gap-3 pl-4 max-sm:mt-5">
						<Image
							src={"/logo_smof.png"}
							width={200}
							alt="logo"
							height={200}
							className="max-sm:w-[160px] max-sm:h-[70px] max-sm:self-center mb-2"
						/>
						<div className="flex flex-col gap-3 font-medium">
							<p>
								Effetto Outdoor – natura e territorio APS ETS Via Ninnì Cassarà
								8,San Martino delle Scale-Monreale (PA)
							</p>

							<p>effettooutdoor@gmail.com</p>
							<p>PEC effettooutdoor@postecertifica.it</p>
							<p>C.F. 97386790824</p>
							<p>cell. +39 3396178587</p>
							<p>cell. +39 3932802378 (segreteria)</p>
						</div>
					</div>
					<div className="w-fit">
						<h2 className="text-2xl max-sm:text-center sm:text-3xl md:text-4xl mt-20 font-bold pl-4">
							Per informazioni Compila il Form
						</h2>
						<form
							onSubmit={() => handleSubmit(onSubmit)}
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
								{...(register("messaggio"), { required: true })}
							/>
							<button
								type="submit"
								className="border-2 border-chocolate rounded p-2 w-fit hover:cursor-pointer hover:text-ivory hover:bg-chocolate transition-colors"
							>
								Invia messaggio
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
