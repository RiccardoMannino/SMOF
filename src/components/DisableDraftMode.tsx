"use client";
import { useIsPresentationTool } from "next-sanity/hooks";
import Link from "next/link";

export function DisableDraftMode() {
  const isPresentationTool = useIsPresentationTool();

  // Nasconde il bottone quando si è dentro il Presentation Tool
  if (isPresentationTool) return null;

  return (
    <Link
      href="/api/draft-mode/disable"
      className="fixed bottom-4 right-4 bg-gray-50 px-4 py-2"
    >
      Disabilita Draft Mode
    </Link>
  );
}
