"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { Play, Pause } from "@/components/brand/FirmenflowUiIcon";
import { cn } from "@/lib/cn";

interface RatgeberAudioProps {
  src: string;
  title: string;
  className?: string;
}

const SPEED_STEPS = [1, 1.25, 1.5, 2];

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const rest = Math.floor(seconds % 60);
  return `${minutes}:${rest.toString().padStart(2, "0")}`;
}

export function RatgeberAudio({ src, title, className }: RatgeberAudioProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speedIndex, setSpeedIndex] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrent(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => setPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const handleToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      void audio.play();
      setPlaying(true);
      try {
        track("ratgeber_audio_play", { title });
      } catch {}
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const handleSeek = (event: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * duration;
    setCurrent(audio.currentTime);
  };

  const handleSpeed = () => {
    const next = (speedIndex + 1) % SPEED_STEPS.length;
    setSpeedIndex(next);
    if (audioRef.current) {
      audioRef.current.playbackRate = SPEED_STEPS[next];
    }
  };

  const progress = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <div
      className={cn(
        "rounded-2xl bg-white border border-[var(--color-line)] shadow-sm p-4 sm:p-5",
        className
      )}
    >
      <audio ref={audioRef} src={src} preload="metadata" />
      <div className="flex items-center gap-3.5 sm:gap-4">
        <button
          type="button"
          onClick={handleToggle}
          aria-label={
            playing ? `Audio-Zusammenfassung zu ${title} pausieren` : `Audio-Zusammenfassung zu ${title} abspielen`
          }
          className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[var(--color-plum)] text-white flex items-center justify-center hover:opacity-90 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-coral)]/50 transition-all cursor-pointer"
        >
          {playing ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5 translate-x-[1px]" />
          )}
        </button>

        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-bold text-[var(--color-ink)] flex items-center gap-2 min-w-0">
              <span className="truncate">Audio-Zusammenfassung</span>
              <span className="shrink-0 text-[10px] font-mono font-semibold uppercase tracking-wider text-[var(--color-muted)] border border-[var(--color-line)] rounded-full px-2 py-0.5">
                KI-Stimme
              </span>
            </p>
            <span className="shrink-0 text-xs font-mono text-[var(--color-muted)] tabular-nums">
              {formatTime(current)} / {formatTime(duration)}
            </span>
          </div>

          <div
            role="slider"
            aria-label="Wiedergabeposition"
            aria-valuemin={0}
            aria-valuemax={Math.round(duration)}
            aria-valuenow={Math.round(current)}
            tabIndex={0}
            onClick={handleSeek}
            className="h-2 rounded-full bg-[var(--color-paper)] border border-[var(--color-line)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-coral)]/50"
          >
            <div
              className="h-full rounded-full bg-[var(--color-coral)] pointer-events-none transition-[width] duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSpeed}
              aria-label={`Wiedergabegeschwindigkeit: ${SPEED_STEPS[speedIndex]}x, ändern`}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold text-[var(--color-muted)] border border-[var(--color-line)] bg-[var(--color-paper)] hover:border-[var(--color-coral)]/40 hover:text-[var(--color-plum)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-coral)]/50 transition-colors cursor-pointer"
            >
              {SPEED_STEPS[speedIndex]}x
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
