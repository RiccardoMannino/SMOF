"use client";

import { dataAnno } from "@/lib/date";
import { useState } from "react";
import { EventCard } from "./EventCard";
import { EVENTS_QUERYResult } from "@/sanity/types";

export function CustomSelect({
	data,
	eventi,
	tipo,
}: {
	eventi: EVENTS_QUERYResult;
	data: string[];
	tipo: ("conferenza" | "escursione" | "yoga" | null)[];
}) {
	const validTypes = tipo.filter((t) => t !== null) as string[];

	const [select, setSelect] = useState(data.at(0));

	const [type, setType] = useState(
		validTypes.reduce(
			(acc, currentType) => {
				acc[currentType] = false;
				return acc;
			},
			{} as Record<string, boolean>
		)
	);

	const handleTypeChange = (typ: string) => {
		if (typ !== null) {
			setType((prevState) => ({
				...prevState,
				[typ]: !prevState[typ], // Inverte il valore booleano per il tipo cliccato
			}));
		}
	};

	//  Filtro eventi
	const filteredEvents = eventi.filter((event) => {
		//filtro dell'anno
		const isYearMatch = dataAnno(event.data) === select;

		// Controlla se almeno una checkbox è selezionata
		const anyTypeSelected = Object.values(type).some(Boolean);

		// Se non ci sono tipi selezionati, filtra solo per anno.
		// Altrimenti, filtra per anno E per tipo.
		const isTypeMatch = !anyTypeSelected || type[event?.eventType as string];

		return isYearMatch && isTypeMatch;
	});

	return (
		<>
			<div className="flex max-md:flex-col h-auto gap-2 bg-ivory text-chocolate max-md:w-full w-fit rounded-2xl p-4">
				<p className=" ">Edizione</p>
				<select
					className=""
					value={select}
					onChange={(e) => setSelect(e.target.value)}
				>
					{/* anni della select */}
					{data.map((d, idx) => (
						<option key={idx}>{d}</option>
					))}
				</select>
				{tipo.map((t, idx) => (
					<div key={idx} className="flex items-center gap-1">
						<input
							className="accent-chocolate hover:cursor-pointer"
							key={idx}
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
			</div>
			<div className="flex w-full max-lg:flex-col max-lg:self-center gap-4">
				{filteredEvents.map((event) => (
					<EventCard key={event._id} {...event} />
				))}
			</div>
		</>
	);
}
