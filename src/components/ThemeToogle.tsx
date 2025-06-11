"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<button
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			className="p-2 rounded bg-rust text-white hover:bg-burnt transition-colors"
		>
			{theme === "dark" ? "☀️ Luce" : "🌙 Scuro"}
		</button>
	);
}
