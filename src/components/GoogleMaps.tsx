// components/GoogleMap.tsx
import React from "react";

interface MapProps {
  address: string;
}

export default function GoogleMap({ address }: MapProps) {
  return (
    <iframe
      title="Mappa SMOF"
      src={address}
      className="w-full h-48 sm:h-64 md:h-80"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
