export default function page() {
	return (
		<section className="px-4 py-8 max-w-6xl mx-auto max-sm:text-lg text-xl flex flex-col gap-6 bg-ivory rounded-lg my-10 text-chocolate">
			<div>
				<h1 className="font-semibold">📜 TERMINI E CONDIZIONI – smofest.it</h1>
			</div>
			<article className="flex flex-col gap-4">
				<h2 className="font-semibold">1. Oggetto</h2>
				<p>
					I presenti Termini e Condizioni regolano l'accesso e l'utilizzo del
					sito smofest.it e dei servizi offerti, inclusa la partecipazione agli
					eventi organizzati. <br />
					L'uso del sito implica l'accettazione integrale dei presenti Termini.
				</p>
				<h2 className="font-semibold">2. Accesso al sito e registrazione</h2>
				<p>
					L'accesso ad alcune funzionalità può avvenire tramite autenticazione
					con account Google.
					<br />
					L'utente è responsabile della correttezza dei dati forniti e della
					custodia delle proprie credenziali.
				</p>
				<h2 className="font-semibold">3. Utilizzo del sito</h2>
				<p>L'utente si impegna a:</p>
				<ul className="list-disc pl-6">
					<li>utilizzare il sito in modo lecito e corretto;</li>
					<li>non tentare accessi non autorizzati;</li>
					<li>non interferire con il funzionamento del sito.</li>
				</ul>
				<p>
					Il titolare si riserva il diritto di sospendere o bloccare l'accesso
					in caso di violazioni.
				</p>
				<h2 className="font-semibold">4. Eventi e contenuti</h2>
				<p>
					Le informazioni sugli eventi (date, orari, programmi) possono subire
					variazioni.
				</p>
				<p>
					L'organizzazione si riserva il diritto di modificare o annullare
					eventi per cause tecniche, organizzative o di forza maggiore.
				</p>
				<h2 className="font-semibold">5. Pagamenti</h2>
				<p>
					I pagamenti degli eventi sono gestiti tramite Stripe, piattaforma
					esterna e sicura. Il sito non memorizza dati di pagamento sensibili.
				</p>
				<p>
					I prezzi indicati sono comprensivi di eventuali imposte, salvo diversa
					indicazione.
				</p>
				<h2 className="font-semibold">6. Rimborsi e annullamenti</h2>
				<p>
					Eventuali politiche di rimborso sono specificate nella pagina
					dell'evento. In assenza di indicazioni, i biglietti acquistati non
					sono rimborsabili, salvo annullamento dell'evento da parte
					dell'organizzazione.
				</p>
				<h2 className="font-semibold">7. Limitazione di responsabilità</h2>
				<p>
					Il titolare non è responsabile per:
					<ul className="list-disc pl-6">
						<li>
							disservizi dovuti a interruzioni tecniche; malfunzionamenti di
						</li>
						<li>servizi di terze parti (es. Google, Stripe);</li>
						<li>
							danni indiretti derivanti dall'uso del sito o dalla partecipazione
							agli eventi.
						</li>
					</ul>
				</p>
				<h2 className="font-semibold">8. Proprietà intellettuale</h2>
				<p>
					Tutti i contenuti del sito (testi, immagini, loghi) sono di proprietà
					dei rispettivi titolari e non possono essere utilizzati senza
					autorizzazione.
				</p>
				<h2 className="font-semibold">9. Modifiche ai Termini</h2>
				<p>
					Il titolare si riserva il diritto di modificare i presenti Termini in
					qualsiasi momento. Le modifiche avranno effetto dalla pubblicazione
					sul sito.
				</p>
				<h2 className="font-semibold">
					10. Legge applicabile e foro competente
				</h2>
				<p>
					I presenti Termini sono regolati dalla legge italiana. Per ogni
					controversia è competente il foro del luogo di residenza o sede del
					titolare.
				</p>
			</article>
		</section>
	);
}
