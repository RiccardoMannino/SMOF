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
	data: Set<string | undefined>;
	tipo: (
		| "Documentario"
		| "Educazione Ambientale"
		| "Corsi"
		| "Inaugurazione"
		| "Trekking"
		| "Trail"
		| "Yoga"
		| "Dog Trekking"
		| "Musica"
		| "Smof Grill"
		| "Workshop"
		| "Orienteering"
		| "Visite Guidate"
		| null
	)[];
}) {
	const validTypes = tipo.filter((t) => t !== null) as string[];

	const [select, setSelect] = useState(Array.from(data)[2]); // inizializza con il primo elemento dell'array o una stringa vuota se l'array è vuoto
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

	const dateEventi = Array.from(
		new Set(
			eventi.map((date) =>
				date.dateEvento?.map((data) => dataGiornaliera(data)),
			),
		),
	)
		.flat()
		.sort()
		.reverse();

	// console.log(dateEventi.sort().reverse());

	const filteredEvents = eventi.filter((event) => {
		// Converti le date dell'evento nel formato dei giorni (es. "sabato 12 settembre 2026")
		const eventDays =
			event?.dateEvento?.map((date) => dataGiornaliera(date)) || [];

		// Controlla se il giorno selezionato è tra i giorni dell'evento
		const isDayMatch = eventDays.includes(select as string);
		if (!isDayMatch) return false;

		// tipi selezionati (es. ["Yoga", "Trekking"])
		const selectedTypes = Object.entries(type)
			.filter(([, value]) => value)
			.map(([key]) => key);

		// se nessun tipo è selezionato, mostra tutti gli eventi del giorno
		if (selectedTypes.length === 0) return true;

		// altrimenti mostra solo gli eventi il cui eventType è uno di quelli selezionati
		return selectedTypes.includes(event.eventType as string);
	});

	return (
		<>
			<div className="flex w-full gap-3">
				<div className="flex max-[440px]:flex-col max-[440px]:gap-5 gap-2 self-center bg-ivory p-6 rounded-2xl w-full justify-around">
					{/* se undefined lo salta e trova solo i risultati */}
					{Array.from(data)
						// filtrare i non undefined per mostrare solo i risultati con valori
						.filter((d) => d !== undefined)
						.sort()
						.reverse()
						.map((d, idx) => (
							<button
								key={idx}
								onClick={() => setSelect(d)}
								className={
									select === d
										? "font-semibold bg-mustard rounded-2xl p-2  "
										: ""
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
					className="flex max-md:self-center gap-2 hover:cursor-pointer"
				>
					<p className="">Seleziona tipo evento</p>
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
							className="flex max-lg:flex-col items-center gap-1 relative group"
						>
							{tipo.map((t, idx) => (
								<div key={idx} className="flex gap-2 mr-2">
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
				Il programma è in costante aggiornamento.
				<br />I ticket saranno acquistabili nei prossimi mesi , continua a
				seguirci per non perdere nessuna novità!
			</p>
			<div className="grid w-full lg:grid-cols-3 grid-cols-2 max-md:grid-cols-1 max-lg:self-center gap-10 ">
				{/* Eventi filtrabili */}
				{filteredEvents.map((event) => (
					<EventCard key={event._id} {...event} />
				))}
			</div>
		</>
	);
}
