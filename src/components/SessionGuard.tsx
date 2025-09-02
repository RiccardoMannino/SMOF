// "use client";

// import { useEffect } from "react";
// import { signOut } from "next-auth/react";

// export function SessionGuard({ children }: { children: React.ReactNode }) {
// 	useEffect(() => {
// 		console.log("SessionGuard: Componente montato. Avvio verifica.");

// 		(async () => {
// 			try {
// 				// Aggiungiamo 'cache: 'no-store'' per essere sicuri di non avere risposte da una cache
// 				const response = await fetch("/api/session/verify", {
// 					cache: "no-store",
// 				});
// 				console.log("SessionGuard: Risposta API ricevuta.", response);

// 				const data = await response.json();
// 				console.log("SessionGuard: Dati JSON dall'API:", data);

// 				if (data.shouldSignOut) {
// 					console.log(
// 						"SessionGuard: L'API ha richiesto il logout. Chiamo signOut()..."
// 					);
// 					// Usiamo await per assicurarci che completi prima di fare altro
// 					await signOut({ redirectTo: "/login" });
// 					console.log("SessionGuard: signOut() completato.");
// 				} else {
// 					console.log(
// 						"SessionGuard: L'API dice che non è necessario il logout."
// 					);
// 				}
// 			} catch (error) {
// 				console.error(
// 					"SessionGuard: Errore durante la verifica della sessione:",
// 					error
// 				);
// 			}
// 		})();
// 	}, []);

// 	return <>{children}</>;
// }
