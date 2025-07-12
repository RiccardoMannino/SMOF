// import { EVENTS_QUERYResult } from "@/sanity/types";

// import {
// 	Select,
// 	SelectContent,
// 	SelectGroup,
// 	SelectItem,
// 	SelectLabel,
// 	SelectTrigger,
// 	SelectValue,
// } from "@/components/ui/Select";
// import { useState } from "react";

// export function CustomSelect(data: EVENTS_QUERYResult[0]) {
// 	const [select, setSelect] = useState(data);

// 	return (
// 		<Select value={select} onValueChange={setSelect}>
// 			<SelectTrigger className="w-[280px]">
// 				<SelectValue placeholder="Seleziona anno" />
// 			</SelectTrigger>
// 			<SelectContent>
// 				<SelectGroup>
// 					<SelectLabel>Data</SelectLabel>

// 					<SelectItem value={select}>{data}</SelectItem>
// 				</SelectGroup>
// 			</SelectContent>
// 		</Select>
// 	);
// }
