"use client";
import { dataSoloData } from "@/lib/date";
import { useState } from "react";
import { TicketPurchaseButton } from "./TicketPurchaseButton";
import type { Session } from "next-auth";

type Tickets = {
  singleEvent: SingleTicket[];
};

type Sessione = {
  _key: string;
  dataSelezionata: string;
  quantita: number;
};

type SingleTicket = {
  _id: string;
  _type: string;
  biglietto: {
    eventName: string;
  };
  prezzo: number;
  quantita: number;
  sessioni: Sessione[];
};

export default function TicketSelect({
  date,
  tickets,
  sessione,
}: {
  date: string[];
  tickets: Tickets;
  sessione: Session | null;
}) {
  const [select, setSelect] = useState<string>(date[0]);

  return (
    <>
      <div className="flex  gap-2 w-fit">
        <p className="text-ivory self-center font-semibold">Date Eventi: </p>
        <select
          value={select}
          onChange={(e) => setSelect(e.target.value)}
          className="bg-ivory p-2 font-semibold rounded-lg mb-4"
        >
          {date.map((dat) => (
            <option key={dat}>{dat}</option>
          ))}
        </select>
      </div>
      {tickets.singleEvent && (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tickets?.singleEvent
            ?.filter((tick) =>
              tick.sessioni.some(
                (s) => dataSoloData(s.dataSelezionata) === select,
              ),
            )
            .map((ticket: SingleTicket) => (
              <div
                key={`${ticket._type}-${ticket._id}`}
                className="bg-ivory shadow-md rounded-lg p-6 border border-chocolate/20"
              >
                <h2 className="text-xl font-semibold text-rust mb-2">
                  {ticket.biglietto.eventName}
                </h2>
                <p className="text-chocolate text-lg font-bold mb-4">
                  €{ticket.prezzo}
                </p>
                <TicketPurchaseButton
                  ticket={ticket}
                  email={sessione?.user?.email}
                />
              </div>
            ))}
        </div>
      )}
    </>
  );
}
