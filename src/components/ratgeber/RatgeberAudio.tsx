"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { Play, Pause } from "@/components/brand/FirmenflowUiIcon";
import { cn } from "@/lib/cn";

interface RatgeberAudioProps {
  src: string;
  title: string;
  className?: string;
}

const SPEED_STEPS = [1, 1.25, 1.5, 2];
const BAR_COUNT = 44;

// Deterministisches Wellenbild: Aus Titel und Pfad entsteht immer dieselbe
// pseudo-zufällige Wellenform, ganz ohne echte Audio-Analyse.
function buildWaveform(seed: string): number[] {
  let state = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    state ^= seed.charCodeAt(i);
    state = Math.imul(state, 16777619) >>> 0;
  }
  if (state === 0) state = 0x9e3779b9;
  const next = () => {
    state ^= state << 13;
    state >>>= 0;
    state ^= state >>> 17;
    state ^= state << 5;
    state >>>= 0;
    return state / 0xffffffff;
  };
  const bars: number[] = [];
  for (let i = 0; i < BAR_COUNT; i++) {
    // Weiche Hüllkurve: außen flach, zur Mitte hin höher.
    const envelope = 0.35 + 0.65 * Math.sin((Math.PI * (i + 0.5)) / BAR_COUNT);
    bars.push(Math.round(Math.min(100, Math.max(22, envelope * (55 + next() * 45)))));
  }
  return bars;
}

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
  const bars = useMemo(() => buildWaveform(`${title}|${src}`), [title, src]);

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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      audio.currentTime = Math.min(duration, audio.currentTime + 5);
      setCurrent(audio.currentTime);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      audio.currentTime = Math.max(0, audio.currentTime - 5);
      setCurrent(audio.currentTime);
    } else if (event.key === "Home") {
      event.preventDefault();
      audio.currentTime = 0;
      setCurrent(0);
    } else if (event.key === "End") {
      event.preventDefault();
      audio.currentTime = duration;
      setCurrent(duration);
    }
  };

  const handleSpeed = () => {
    const next = (speedIndex + 1) % SPEED_STEPS.length;
    setSpeedIndex(next);
    if (audioRef.current) {
      audioRef.current.playbackRate = SPEED_STEPS[next];
    }
  };

  const playedCount = duration > 0 ? Math.round((current / duration) * BAR_COUNT) : 0;

  return (
    <div
      className={cn(
        "double-bezel-outer animate-[ratgeber-player-in_0.8s_cubic-bezier(0.22,1,0.36,1)_backwards]",
        className
      )}
    >
      <div className="double-bezel-inner relative overflow-hidden p-5 sm:p-6">
        <audio ref={audioRef} src={src} preload="metadata" />
        {/* Sanfte Farbflächen im Hintergrund */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-[var(--color-coral)]/10 blur-3xl" />
          <div className="absolute -bottom-28 -left-24 h-64 w-64 rounded-full bg-[var(--color-plum-light)]/10 blur-3xl" />
        </div>

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
          <button
            type="button"
            onClick={handleToggle}
            aria-label={
              playing ? `Audio-Zusammenfassung zu ${title} pausieren` : `Audio-Zusammenfassung zu ${title} abspielen`
            }
            className={cn(
              "group/play relative grid shrink-0 cursor-pointer place-items-center rounded-full",
              "h-14 w-14 bg-gradient-to-br from-[var(--color-plum-light)] via-[var(--color-plum)] to-[#38184d] text-white sm:h-[4.25rem] sm:w-[4.25rem]",
              "shadow-[0_0.75rem_1.75rem_-0.625rem_rgba(72,35,97,0.6),inset_0_1px_0_rgba(255,255,255,0.28)]",
              "transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "hover:-translate-y-0.5 hover:shadow-[0_1rem_2.25rem_-0.625rem_rgba(72,35,97,0.65),inset_0_1px_0_rgba(255,255,255,0.28)]",
              "active:translate-y-0 active:scale-[0.97]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-coral)]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            )}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-[3px] rounded-full border border-white/15"
            />
            {playing ? (
              <Pause className="h-5 w-5 sm:h-6 sm:w-6" />
            ) : (
              <Play className="h-5 w-5 translate-x-[1px] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/play:translate-x-[3px] sm:h-6 sm:w-6" />
            )}
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <p className="flex min-w-0 items-center gap-2 text-sm font-bold text-[var(--color-ink)]">
                <span className="truncate">Audio-Zusammenfassung</span>
                <span className="shrink-0 rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                  KI-Stimme
                </span>
              </p>
              <span className="shrink-0 font-mono text-xs tabular-nums text-[var(--color-muted)]">
                {formatTime(current)} <span aria-hidden="true" className="text-[var(--color-muted)]/50">/</span>{" "}
                {formatTime(duration)}
              </span>
            </div>

            <div
              role="slider"
              aria-label="Wiedergabeposition"
              aria-valuemin={0}
              aria-valuemax={Math.round(duration)}
              aria-valuenow={Math.round(current)}
              aria-valuetext={`${formatTime(current)} von ${formatTime(duration)}`}
              tabIndex={0}
              onClick={handleSeek}
              onKeyDown={handleKeyDown}
              className="mt-3 flex h-12 cursor-pointer items-center gap-[3px] rounded-2xl px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-coral)]/60 sm:h-14"
            >
              {bars.map((height, index) => (
                <span
                  key={index}
                  aria-hidden="true"
                  className={cn(
                    "min-w-0 flex-1 rounded-full transition-colors duration-300",
                    playing && "animate-[ratgeber-wave-pulse_1.4s_cubic-bezier(0.4,0,0.6,1)_infinite]"
                  )}
                  style={{
                    height: `${height}%`,
                    backgroundColor:
                      index < playedCount
                        ? `color-mix(in oklab, var(--color-plum) ${100 - Math.round((index / (BAR_COUNT - 1)) * 100)}%, var(--color-coral))`
                        : "color-mix(in srgb, var(--color-ink) 12%, transparent)",
                    animationDelay: `${(index % 6) * 0.12}s`,
                  }}
                />
              ))}
            </div>

            <div className="mt-2.5 flex items-center justify-between gap-3">
              <p className="hidden text-[11px] text-[var(--color-muted)] sm:block">
                Auf die Wellen tippen, um zu spulen.
              </p>
              <button
                type="button"
                onClick={handleSpeed}
                aria-label={`Wiedergabegeschwindigkeit: ${SPEED_STEPS[speedIndex]}x, ändern`}
                className={cn(
                  "inline-flex cursor-pointer items-center rounded-full border px-3 py-1 font-mono text-[11px] font-bold",
                  "transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-coral)]/60",
                  speedIndex === 0
                    ? "border-[var(--color-line)] bg-[var(--color-paper)] text-[var(--color-muted)] hover:border-[var(--color-coral)]/40 hover:text-[var(--color-plum)]"
                    : "border-[var(--color-coral)]/30 bg-[var(--color-coral)]/10 text-[var(--color-plum)]"
                )}
              >
                {SPEED_STEPS[speedIndex]}x
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
