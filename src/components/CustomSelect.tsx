"use client";

import { dataProva } from "@/sanity/lib/date";
import { Key, useState } from "react";
import { EventCard } from "./EventCard";
import { EVENTS_QUERYResult } from "@/sanity/types";

export function CustomSelect({
	data,
	eventi,
}: {
	eventi: EVENTS_QUERYResult;
	data: string[];
}) {
	const [select, setSelect] = useState(data.at(0));

	return (
		<>
			<div className="flex  gap-2 bg-ivory text-chocolate w-fit rounded-2xl p-2">
				<p>Edizione</p>
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
			</div>
			<div className="flex w-full gap-4">
				{eventi
					.filter((date) => dataProva(date.data) === select)
					.map((event) => (
						<EventCard key={event._id} {...event} />
					))}
			</div>
		</>
	);
}
