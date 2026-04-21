"use client";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { toast, Slide } from "react-toastify";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import Link from "next/link";

type IFormInput = {
	nome: string;
	cognome: string;
	email: string;
	messaggio: string;
	termini: boolean;
};

type ConfigData = {
	emailJsPublicKey: string;
	emailJsServiceId: string;
	emailJsTemplateId: string;
};

export function ContactForm() {
	const [isSending, setIsSending] = useState(false);

	// riferimento al form
	const form = useRef(null);

	// funzione per inviare email
	const sendEmail = async (data: FieldValues) => {
		try {
			setIsSending(true);

			// recupera la configurazione dall'API
			const response = await fetch("/api/config");

			if (!response.ok) {
				throw new Error("Impossibile recuperare la configurazione");
			}

			const config: ConfigData = await response.json();

			//
			const formData = {
				nome: data.nome,
				cognome: data.cognome,
				email: data.email,
				messaggio: data.messaggio,
				termini: data.termini,
			};

			// invia l'email usando emailjs
			await emailjs.send(
				config.emailJsServiceId,
				config.emailJsTemplateId,
				formData,
				config.emailJsPublicKey,
			);

			// notifica di successo
			toast(
				<div className="w-full flex gap-4 justify-center py-4 text-chocolate">
					Messaggio inviato con successo ✅
				</div>,
				{
					transition: Slide,
					style: { background: "#fdf6ec" },
				},
			);
		} catch (error) {
			console.error(error);
			// notifica di errore
			toast(
				<div
					className={`rounded-full bg-ivory px-6 py-4 text-chocolate shadow-md`}
				>
					Errore nell&apos;invio del messaggio ⛔
				</div>,
				{ transition: Slide, style: { background: "#fdf6ec" } },
			);
		} finally {
			setIsSending(false);
			reset();
		}
	};

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<IFormInput>();

	// osserva i cambiamenti nel form
	const formValue = watch();

	return (
		<div className="grid grid-cols-1  max-sm:place-items-center sm:grid-cols-[350px_1fr] gap-8 h-full w-full bg-ivory text-chocolate rounded-2xl p-4">
			<div className="mt-20 flex flex-col gap-3 pl-4 max-sm:mt-5">
				<Image
					src={"/logo_smof.png"}
					width={200}
					alt="logo"
					height={200}
					className="max-sm:w-40 max-sm:h-[70px] max-sm:self-center mb-2"
				/>
				<div className="flex flex-col gap-3 font-medium">
					<p className="font-semibold">
						Effetto Outdoor – natura e territorio APS ETS
					</p>
					<p>Via Ninnì Cassarà 8,San Martino delle Scale - Monreale (PA)</p>
					<p>effettooutdoor@gmail.com</p>
					<p>PEC effettooutdoor@postecertifica.it</p>
					<p>C.F. 97386790824</p>
					<p>cell. +39 3520940274</p>
					{/* <p>cell. +39 3932802378 (segreteria)</p> */}
				</div>
			</div>
			<div className="w-fit">
				<h2 className="text-2xl max-sm:text-center sm:text-3xl md:text-4xl mt-20 font-bold pl-4">
					Per informazioni Compila il Form
				</h2>
				<form
					ref={form}
					onSubmit={handleSubmit(sendEmail)}
					className="flex flex-col h-full p-4 gap-4 font-semibold"
				>
					<label>Nome</label>
					<input
						placeholder="Nome"
						className="border-2 border-chocolate rounded p-2 focus:ring-chocolate  focus:ring-3 focus:outline-none"
						{...register("nome", { required: true, maxLength: 20 })}
					/>
					<label>Cognome</label>
					<input
						className="border-2 border-chocolate rounded p-2 focus:ring-chocolate  focus:ring-3 focus:outline-none"
						placeholder="Cognome"
						{...register("cognome", {
							required: true,
							pattern: /^[A-Za-z]+$/i,
						})}
					/>
					<label>Email</label>
					<input
						className="border-2 border-chocolate rounded p-2 focus:ring-chocolate  focus:ring-3 focus:outline-none"
						type="email"
						placeholder="Email"
						{...register("email", {
							required: true,
							pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
						})}
					/>
					<label>Messaggio</label>
					<textarea
						placeholder="Messaggio"
						className="border-2 border-chocolate rounded p-2 focus:ring-chocolate  focus:ring-3 focus:outline-none"
						{...register("messaggio", {
							required: true,
							maxLength: 250,
							minLength: 30,
						})}
					/>
					<p className="mt-2 text-lg text-chocolate font-semibold">
						Caratteri Digitati: {formValue.messaggio?.length || 0} / 250
						<br /> (inserisci minimo 30 caratteri)
					</p>

					<div className="flex gap-2 ">
						<input
							type="checkbox"
							className="accent-chocolate hover:cursor-pointer self-start mt-2"
							{...(register("termini"), { required: true })}
						/>
						<label className="">
							Ho letto{" "}
							<Link
								target="_blank"
								className="hover:underline transition-all"
								href={"/privacy"}
							>
								l'informativa
							</Link>{" "}
							e presto il consenso al trattamento dei dati personali
						</label>
					</div>
					<button
						disabled={isSending}
						type="submit"
						className="border-2 border-chocolate rounded p-2 w-fit hover:cursor-pointer hover:text-ivory hover:bg-chocolate transition-colors"
					>
						{isSending ? "Invio in corso..." : "Invia Messaggio"}
					</button>
				</form>
			</div>
		</div>
	);
}
