"use client";

import React from "react";
import { dataGiornaliera } from "@/lib/date";
import { useState } from "react";
import { EventCard } from "./EventCard";
import { EVENTS_QUERYResult } from "../sanity/types";

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

	//  da studiare
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
			<div className="flex w-full gap-3">
				<div className="flex gap-2 self-center bg-ivory p-6 rounded-2xl w-full justify-around">
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
			<div className="flex max-md:flex-col h-auto gap-2 bg-ivory text-chocolate max-md:w-full w-fit rounded-2xl p-4">
				<p className=" ">Tipo evento</p>

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
			<div className="flex w-full max-lg:flex-col max-lg:self-center gap-10">
				{/* Eventi filtrabili */}
				{filteredEvents.map((event) => (
					<EventCard key={event._id} {...event} />
				))}
			</div>
		</>
	);
}
