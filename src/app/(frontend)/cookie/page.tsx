export default function page() {
	return (
		<section className="px-4 py-8 max-w-6xl mx-auto text-[clamp(1rem,3vw+2rem,1.5rem)] flex flex-col gap-6 bg-ivory rounded-lg my-10 text-chocolate">
			<div>
				<h1 className="font-semibold">🍪 COOKIE POLICY – smofest.it</h1>
			</div>
			<article className="flex flex-col gap-4">
				<h2 className="font-semibold">1. Cosa sono i cookie?</h2>
				<p>
					I cookie sono piccoli file di testo che i siti visitati inviano al
					browser dell’utente per migliorare l’esperienza di navigazione.
				</p>
				<h2 className="font-semibold">2. Tipologie di cookie utilizzate</h2>
				<p className="font-semibold">
					Cookie tecnici (necessari) <br />
				</p>
				<p>
					Utilizzati per garantire il corretto funzionamento del sito, inclusi:
				</p>
				<ul className="list-disc pl-6">
					{" "}
					<li>gestione della sessione;</li>
					<li>autenticazione tramite Google OAuth.</li>
				</ul>
				<p>Questi cookie non richiedono consenso.</p>
				<p className="font-semibold">Cookie di terze parti</p>
				<p>
					Il sito utilizza servizi di terze parti che possono installare cookie
				</p>
				<ul className="list-disc pl-6">
					<li>Google OAuth – per l’autenticazione degli utenti;</li>
					<li>Stripe – per la gestione dei pagamenti</li>
				</ul>
				<p>
					L’uso di tali cookie è regolato dalle rispettive privacy policy dei
					fornitori.
				</p>
				<h2 className="font-semibold">3. Gestione dei cookie</h2>
				<p>
					L’utente può gestire o disabilitare i cookie tramite le impostazioni
					del proprio browser. La disabilitazione dei cookie tecnici può
					compromettere il funzionamento del sito.
				</p>
			</article>
		</section>
	);
}
