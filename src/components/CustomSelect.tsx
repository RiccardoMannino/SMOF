"use client";

import * as motion from "motion/react-client";
import { dataGiornaliera } from "@/lib/date";
import { useState } from "react";
import { EventCard } from "./EventCard";
import { EVENTS_QUERY_RESULT } from "../sanity/sanity.types";
import { ArrowBigDown, ArrowBigUp, LucideLightbulb } from "lucide-react";
import { AnimatePresence } from "motion/react";

export function CustomSelect({
	data,
	eventi,
	tipo,
}: {
	eventi: EVENTS_QUERY_RESULT;
	data: string[];
	tipo: (
		| "Inaugurazione"
		| "Dog Trekking"
		| "Musica"
		| "Smof Grill"
		| "Trail"
		| "Trekking"
		| "Yoga"
		| "Sicurezza in Natura"
		| null
	)[];
}) {
	const validTypes = tipo.filter((t) => t !== null) as string[];

	const [select, setSelect] = useState(data.at(0));
	const [open, setOpen] = useState(false);

	const [type, setType] = useState(
		validTypes.reduce(
			(acc, currentType) => {
				acc[currentType] = false;
				return acc;
			},
			{} as Record<string, boolean>,
		),
	);

	const handleTypeChange = (typ: string) => {
		if (typ !== null) {
			setType((prevState) => ({
				...prevState,
				[typ]: !prevState[typ], // Inverte il valore booleano per il tipo cliccato
			}));
		}
	};

	const filteredEvents = eventi.filter((event) => {
		// filtro per anno
		const isYearMatch = dataGiornaliera(event.data) === select;

		// tipi selezionati (es. ["conferenza", "yoga"])
		const selectedTypes = Object.entries(type)
			.filter(([, value]) => value)
			.map(([key]) => key);

		// se l'anno non corrisponde, scarta subito
		if (!isYearMatch) return false;

		// se nessun checkbox è selezionato, mostra tutti gli eventi di quell'anno
		if (selectedTypes.length === 0) return true;

		// altrimenti mostra solo gli eventi il cui eventType è uno di quelli selezionati
		return selectedTypes.includes(event.eventType as string);
	});

	return (
		<>
			<div className="flex  w-full gap-3">
				<div className="flex max-[440px]:flex-col max-[440px]:gap-5 gap-2 self-center bg-ivory p-6 rounded-2xl w-full justify-around">
					{data.map((d, idx) => (
						<button
							key={idx}
							onClick={() => setSelect(d)}
							className={
								select === d ? "font-semibold bg-mustard rounded-2xl p-2  " : ""
							}
						>
							<span>{d}</span>
						</button>
					))}
				</div>
			</div>
			<div className="flex flex-col h-auto gap-2 bg-ivory text-chocolate max-md:w-full w-fit rounded-2xl p-4">
				<div
					onClick={() => setOpen(!open)}
					className="flex gap-2 hover:cursor-pointer"
				>
					<p className=" ">Seleziona tipo evento</p>
					<motion.button
						animate={{ rotate: !open ? 0 : 180 }}
						transition={{ duration: 0.5, delay: 0 }}
						className="flex gap-2"
					>
						{open ? <ArrowBigUp /> : <ArrowBigDown />}
					</motion.button>
				</div>

				<AnimatePresence>
					{open && (
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							exit={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
							className="flex flex-col items-center gap-1 relative group"
						>
							{tipo.map((t, idx) => (
								<div key={idx} className="flex gap-2">
									<input
										className="accent-chocolate hover:cursor-pointer"
										type="checkbox"
										checked={type[t as string]}
										onChange={() => handleTypeChange(t as string)}
										value={t as string}
										name={t as string}
										id={`checkbox-${t}`}
									/>
									<label htmlFor={`checkbox-${t}`}>{t}</label>
								</div>
							))}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
			<p className="flex gap-2 text-ivory font-semibold">
				<span>
					<LucideLightbulb />
				</span>
				Il programma è in costante aggiornamento , nuovi eventi verranno
				aggiunti presto!!
			</p>
			<div className="flex w-full max-lg:flex-col max-lg:self-center gap-10">
				{/* Eventi filtrabili */}
				{filteredEvents.map((event) => (
					<EventCard key={event._id} {...event} />
				))}
			</div>
		</>
	);
}
