export default function page() {
	return (
		<section className="px-4 py-8 max-w-6xl mx-auto max-sm:text-lg text-xl flex flex-col gap-6 bg-ivory rounded-lg my-10 text-chocolate">
			<div>
				<h1 className="font-semibold">✅ PRIVACY POLICY – smofest.it</h1>
			</div>
			<article className="flex flex-col gap-4">
				<h2 className="font-semibold">1. Titolare del trattamento</h2>
				<p>
					Il titolare del trattamento dei dati è Effetto Outdoor - Natura e
					Territorio APS ETS, con sede in Via Ninnì Cassarà 8, San Martino delle
					Scale - Monreale (PA)
					<br /> email: effettooutdoor@gmail.com.
				</p>
				<h2 className="font-semibold">2. Tipologie di dati raccolti</h2>
				<p>
					Il sito smofest.it raccoglie le seguenti categorie di dati personali:
				</p>
				<ul className="list-disc pl-6">
					<li>
						<strong>Dati forniti volontariamente dall'utente:</strong> Nome,
						cognome, indirizzo email e altri dati inseriti tramite il form di
						contatto.
					</li>
					<li>
						<strong>Dati di autenticazione:</strong> In caso di accesso tramite
						Google OAuth, il sito riceve alcune informazioni del profilo Google
						(es. nome, email, immagine profilo).
					</li>
					<li>
						<strong>Dati di pagamento:</strong> I pagamenti per eventi vengono
						gestiti tramite Stripe. Il sito non memorizza i dati delle carte di
						credito.
					</li>
					<li>
						<strong>Dati di navigazione:</strong> Indirizzo IP, tipo di browser,
						sistema operativo.
					</li>
				</ul>
				<h2 className="font-semibold">3. Finalità del trattamento</h2>
				<p>I dati personali sono trattati esclusivamente per:</p>
				<ul className="list-disc pl-6">
					<li>
						rispondere alle richieste inviate tramite il form di contatto;
					</li>
					<li>gestire l'accesso tramite Google OAuth;</li>
					<li>consentire l'iscrizione e pagamento degli eventi;</li>
					<li>adempiere a obblighi legali o fiscali.</li>
				</ul>
				<p>
					Nessun dato viene utilizzato per finalità di marketing o profilazione.
				</p>
				<h2 className="font-semibold">4. Base giuridica del trattamento</h2>
				<p>Il trattamento si basa su:</p>
				<ul className="list-disc pl-6">
					<li>consenso dell'utente;</li>
					<li>esecuzione di misure contrattuali;</li>
					<li>obblighi di legge.</li>
				</ul>
				<h2 className="font-semibold">5. Modalità del trattamento</h2>
				<p>
					I dati sono trattati con strumenti informatici e telematici, adottando
					misure di sicurezza adeguate.
				</p>
				<h2 className="font-semibold">6. Conservazione dei dati</h2>
				<p>
					I dati personali sono conservati solo per il tempo necessario a
					rispondere alle richieste. I dati di pagamento sono conservati da
					Stripe secondo le loro politiche.
				</p>
				<h2 className="font-semibold">
					7. Comunicazione dei dati a terze parti
				</h2>
				<p>
					I dati possono essere comunicati a: Stripe Inc., Google LLC, e
					fornitori tecnici del sito.
				</p>
				<p>
					Questi soggetti agiscono come responsabili del trattamento o titolari
					autonomi.
				</p>
				<h2 className="font-semibold">8. Trasferimento dati extra UE</h2>
				<p>
					Alcuni dati potrebbero essere trasferiti verso Paesi extra UE tramite
					servizi come Google e Stripe, nel rispetto del GDPR.
				</p>
				<h2 className="font-semibold">9. Diritti dell'utente</h2>
				<p>L'utente ha il diritto di:</p>
				<ul className="list-disc pl-6">
					<li>ottenere conferma dell'esistenza di dati personali;</li>
					<li>accedere ai propri dati;</li>
					<li>chiederne la rettifica o cancellazione;</li>
					<li>limitarne il trattamento;</li>
					<li>proporre reclamo al Garante.</li>
				</ul>
				<br /> Le richieste vanno inviate a effettooutdoor@gmail.com.
			</article>
		</section>
	);
}
