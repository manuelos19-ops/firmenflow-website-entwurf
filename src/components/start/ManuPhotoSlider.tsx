"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const photos = [
  {
    src: "/media/portraits/manu-contact-portrait.webp",
    alt: "Manuel Landeck, Gründer von Firmenflow",
    caption: "Manuel Landeck • Firmenflow",
  },
  {
    src: "/media/authors/manu-smartphone.jpg",
    alt: "Manu mit Smartphone bei der Arbeit",
    caption: "Deine Nachricht landet direkt bei mir",
  },
  {
    src: "/media/authors/manu-camera-hasselblad.jpg",
    alt: "Manu mit Kamera für Vor-Ort-Aufnahmen",
    caption: "Echte Aufnahmen vor Ort am Niederrhein",
  },
  {
    src: "/media/portraits/manu-green-door.webp",
    alt: "Manu vor grüner Tür am Niederrhein",
    caption: "Aus Wesel für die Region",
  },
];

export function ManuPhotoSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-[#E7E2DC] bg-stone-100 shadow-sm"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Image Container with 4:3 Aspect Ratio */}
      <div className="relative w-full aspect-[4/3]">
        {photos.map((photo, index) => (
          <div
            key={photo.src}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority={index === 0}
              sizes="(max-width: 640px) 100vw, 520px"
              className="object-cover object-center"
            />
            {/* Subtle Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Bottom Caption Pill */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs z-20">
              <span className="font-semibold bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                {photo.caption}
              </span>
              <span className="font-mono text-[11px] opacity-80 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full">
                {index + 1} / {photos.length}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="flex items-center justify-center gap-1.5 py-2.5 bg-white border-t border-[#E7E2DC]">
        {photos.map((_, dotIndex) => (
          <button
            key={dotIndex}
            onClick={() => setCurrentIndex(dotIndex)}
            className={`h-2 rounded-full transition-all duration-300 ${
              dotIndex === currentIndex
                ? "w-6 bg-[#FF705D]"
                : "w-2 bg-stone-300 hover:bg-stone-400"
            }`}
            aria-label={`Foto ${dotIndex + 1} anzeigen`}
          />
        ))}
      </div>
    </div>
  );
}
