"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { FirmenflowButton } from "@/components/ui/FirmenflowButton";
import { FirmenflowIcon } from "@/components/brand/FirmenflowIcon";
import type { RatgeberQuizData, RatgeberQuizQuestion } from "@/lib/ratgeber";

type QuizMode = "kompakt" | "profi";
type QuizState = "intro" | "active" | "result";

type RatgeberQuizProps = {
  quiz?: RatgeberQuizData;
};

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function RatgeberQuiz({ quiz }: RatgeberQuizProps) {
  const [state, setState] = useState<QuizState>("intro");
  const [mode, setMode] = useState<QuizMode>("kompakt");
  const [activeQuestions, setActiveQuestions] = useState<RatgeberQuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return null;
  }

  const currentQuestion = activeQuestions[currentIndex];

  // Start mit zufälliger Frage- und Antwort-Rotation:
  // 1. Fragen aus dem jeweiligen Pool zufällig auswählen (5 für Kompakt, 10 für Meister)
  // 2. Antwort-Optionen (Position 1 bis 3) für jede Frage frisch durchmischen und correctIndex dynamisch berechnen
  const handleStart = (chosenMode: QuizMode) => {
    setMode(chosenMode);
    let selectedRaw: RatgeberQuizQuestion[] = [];
    if (chosenMode === "kompakt") {
      const pool = quiz.questions.filter((q) => q.level === "basis");
      const source = pool.length > 0 ? pool : quiz.questions;
      selectedRaw = shuffleArray(source).slice(0, 5);
    } else {
      const pool = quiz.questions.filter((q) => q.level === "profi");
      const source = pool.length > 0 ? pool : quiz.questions;
      selectedRaw = shuffleArray(source).slice(0, 10);
    }

    // Antworten für jede Frage zufällig durchmischen und neuen correctIndex ermitteln
    const randomizedQuestions = selectedRaw.map((q) => {
      const correctAnswerText = q.options[q.correctIndex];
      const shuffledOptions = shuffleArray(q.options);
      const newCorrectIndex = shuffledOptions.indexOf(correctAnswerText);
      return {
        ...q,
        options: shuffledOptions,
        correctIndex: newCorrectIndex >= 0 ? newCorrectIndex : 0,
      };
    });

    setActiveQuestions(randomizedQuestions);
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setState("active");

    try {
      track("ratgeber_quiz_start", {
        quizTitle: quiz.title,
        mode: chosenMode,
      });
    } catch {}
  };

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null || !currentQuestion) return;
    setSelectedOption(index);
    if (index === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < activeQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setState("result");
      try {
        track("ratgeber_quiz_complete", {
          quizTitle: quiz.title,
          mode,
          score,
          total: activeQuestions.length,
          scorePercent: Math.round((score / activeQuestions.length) * 100),
        });
      } catch {}
    }
  };

  const handleRestart = () => {
    setState("intro");
    setActiveQuestions([]);
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
  };

  const totalQuestions = activeQuestions.length || (mode === "kompakt" ? 5 : 10);
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);
  const scorePercent = Math.round((score / totalQuestions) * 100);

  return (
    <section id="selbst-check" aria-label="Interaktives Ratgeber-Quiz" className="my-12 scroll-mt-28 relative">
      <span id="quiz" className="absolute -top-28 left-0 pointer-events-none" aria-hidden="true" />
      <div className="rounded-[2.5rem] border border-[var(--color-line)] bg-gradient-to-b from-white via-white to-[var(--color-paper)] p-6 sm:p-10 md:p-12 shadow-md relative overflow-hidden">
        
        {/* Dekorativer Hintergrund-Glow */}
        <div 
          aria-hidden="true" 
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[var(--color-coral)]/10 blur-3xl pointer-events-none" 
        />
        <div 
          aria-hidden="true" 
          className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[var(--color-plum)]/10 blur-3xl pointer-events-none" 
        />

        {/* ----------------- STATE 1: INTRO / MODUS-AUSWAHL ----------------- */}
        {state === "intro" && (
          <div className="relative z-10 space-y-8 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-paper)] border border-[var(--color-line)] text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-coral)]">
              <FirmenflowIcon name="struktur-wireframe" size={16} decorative />
              <span>Interaktiver Selbst-Check</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-[var(--color-ink)] leading-tight">
                {quiz.title}
              </h2>
              <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
                {quiz.description}
              </p>
            </div>

            <div className="pt-2 text-left space-y-3">
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-muted)] text-center">
                Wähle deinen Modus:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-[var(--color-line)] bg-white p-5 flex flex-col justify-between space-y-4 shadow-sm hover:border-[var(--color-coral)]/40 transition-all">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold uppercase text-[var(--color-coral)]">
                      ⚡ Praxisnah & Schnell
                    </span>
                    <h3 className="text-lg font-display font-bold text-[var(--color-ink)]">
                      Kompakt-Check
                    </h3>
                    <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                      5 zufällig ausgewählte Fragen zu den wichtigsten Grundlagen dieses Artikels.
                    </p>
                  </div>
                  <FirmenflowButton
                    type="button"
                    buttonIcon="flowscreen"
                    size="compact"
                    subline="5 Fragen · ca. 2 Min."
                    onClick={() => handleStart("kompakt")}
                    className="w-full justify-center"
                  >
                    Kompakt starten
                  </FirmenflowButton>
                </div>

                <div className="rounded-2xl border border-[var(--color-line)] bg-white p-5 flex flex-col justify-between space-y-4 shadow-sm hover:border-[var(--color-plum)]/40 transition-all">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold uppercase text-[var(--color-plum)]">
                      🏆 Eigenständiges Profi-Wissen
                    </span>
                    <h3 className="text-lg font-display font-bold text-[var(--color-ink)]">
                      Meister-Check
                    </h3>
                    <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                      10 vertiefende Fragen aus dem großen Fragenpool mit Fachwissen und Details.
                    </p>
                  </div>
                  <FirmenflowButton
                    type="button"
                    buttonIcon="details"
                    size="compact"
                    subline="10 Fragen · ca. 4 Min."
                    onClick={() => handleStart("profi")}
                    className="w-full justify-center"
                  >
                    Meister-Check starten
                  </FirmenflowButton>
                </div>
              </div>
            </div>

            <p className="text-xs text-[var(--color-muted)] pt-2">
              Großer Fragenpool · Bei jedem Durchlauf rotieren die Fragen zufällig
            </p>
          </div>
        )}

        {/* ----------------- STATE 2: AKTIVES QUIZ ----------------- */}
        {state === "active" && currentQuestion && (
          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            {/* Header mit Modus-Badge, Fortschritt & Punkte */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-[var(--color-muted)]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-paper)] text-[var(--color-plum)]">
                  {mode === "kompakt" ? "⚡ Kompakt-Check" : "🏆 Meister-Check"}
                </span>
                <span>
                  Frage {currentIndex + 1} von {activeQuestions.length}
                </span>
                <span className="text-[var(--color-coral)]">
                  {score} {score === 1 ? "Punkt" : "Punkte"}
                </span>
              </div>

              {/* Fortschrittsbalken */}
              <div 
                className="w-full h-2 rounded-full bg-[var(--color-line)] overflow-hidden" 
                role="progressbar" 
                aria-valuenow={progressPercent} 
                aria-valuemin={0} 
                aria-valuemax={100}
              >
                <div
                  className="h-full bg-gradient-to-r from-[var(--color-coral)] to-[var(--color-plum)] transition-all duration-300 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Frage */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-[var(--color-ink)] leading-snug">
                {currentQuestion.question}
              </h3>

              {/* Antwortoptionen */}
              <div className="grid gap-3 pt-2" role="radiogroup" aria-label="Antwortmöglichkeiten">
                {currentQuestion.options.map((opt, idx) => {
                  const isAnswered = selectedOption !== null;
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQuestion.correctIndex;

                  let btnStyle = "border-[var(--color-line)] bg-white text-[var(--color-ink)] hover:border-[var(--color-coral)]/50 hover:bg-[var(--color-paper)]";

                  if (isAnswered) {
                    if (isSelected && isCorrect) {
                      btnStyle = "border-emerald-500 bg-emerald-50/90 text-emerald-950 font-bold shadow-sm";
                    } else if (isSelected && !isCorrect) {
                      btnStyle = "border-[var(--color-coral)] bg-rose-50 text-rose-950 font-medium shadow-sm";
                    } else if (isCorrect) {
                      btnStyle = "border-emerald-400/70 bg-emerald-50/50 text-emerald-900";
                    } else {
                      btnStyle = "border-[var(--color-line)]/50 bg-white/60 text-[var(--color-muted)] opacity-60";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-4 sm:p-5 rounded-2xl border text-left text-sm sm:text-base transition-all flex items-start justify-between gap-3 ${btnStyle}`}
                    >
                      <span className="leading-relaxed">{opt}</span>
                      {isAnswered && (
                        <span className="shrink-0 mt-0.5">
                          {isCorrect ? (
                            <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                              ✓
                            </span>
                          ) : isSelected ? (
                            <span className="w-6 h-6 rounded-full bg-[var(--color-coral)] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                              ✕
                            </span>
                          ) : null}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Erklärung & Weiterschalten */}
            {selectedOption !== null && (
              <div className="rounded-2xl bg-[var(--color-paper)] border border-[var(--color-line)] p-5 sm:p-6 space-y-4 animate-in fade-in duration-300">
                <div className="flex items-start gap-3">
                  <span className="text-xl shrink-0 mt-0.5">
                    {selectedOption === currentQuestion.correctIndex ? "🎯" : "💡"}
                  </span>
                  <div className="space-y-1">
                    <p className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-coral)]">
                      {selectedOption === currentQuestion.correctIndex ? "Richtig gelöst!" : "Praxishinweis:"}
                    </p>
                    <p className="text-sm sm:text-base text-[var(--color-ink)] leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-coral)] hover:bg-[var(--color-plum)] text-white font-bold text-sm shadow-md transition-all duration-300"
                  >
                    <span>
                      {currentIndex + 1 < activeQuestions.length
                        ? "Nächste Frage"
                        : "Ergebnis ansehen"}
                    </span>
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ----------------- STATE 3: ERGEBNIS & CTA ----------------- */}
        {state === "result" && (
          <div className="relative z-10 space-y-8 text-center max-w-2xl mx-auto animate-in zoom-in-95 duration-400">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-paper)] border border-[var(--color-line)] text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-coral)]">
              <span>{mode === "kompakt" ? "Kompakt-Check" : "Meister-Check"} beendet</span>
            </div>

            {/* Score-Anzeige */}
            <div className="space-y-3">
              <div className="inline-block px-6 py-3 rounded-3xl bg-[var(--color-plum)] text-white font-display font-bold text-3xl sm:text-5xl shadow-lg shadow-[var(--color-plum)]/20">
                {score} / {totalQuestions}
              </div>
              <p className="text-sm font-mono text-[var(--color-muted)]">
                {scorePercent}% der Fragen richtig beantwortet
              </p>
            </div>

            {/* Individuelles Feedback */}
            <div className="rounded-3xl bg-white border border-[var(--color-line)] p-6 sm:p-8 space-y-3 shadow-sm text-left">
              <h3 className="text-lg sm:text-xl font-display font-bold text-[var(--color-ink)] text-center">
                {scorePercent >= 80
                  ? "🏆 Hervorragend: Digitaler Meisterbetrieb!"
                  : scorePercent >= 50
                  ? "📈 Solide Basis mit spürbarem Neukunden-Potenzial"
                  : "💡 Hier liegt bares Geld auf der Straße"}
              </h3>
              <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed text-center">
                {scorePercent >= 80
                  ? "Du kennst die Hebel für Neukunden und Google ganz genau. Lass uns dafür sorgen, dass dein eigener digitaler Auftritt diesen Spitzenstandard auch technisch und optisch widerspiegelt."
                  : scorePercent >= 50
                  ? "Du hast ein gutes Gespür für Kundenbedürfnisse. Bei einigen Feinheiten verliert dein Betrieb aktuell aber noch wertvolle Kundenanfragen an die Konkurrenz."
                  : "Neukunden suchen heute spontan auf dem Smartphone und entscheiden in wenigen Sekunden. Mit einer schnellen, modernen Seite und sauberem Google-Profil setzt du dich sofort von deinen Mitbewerbern ab."}
              </p>
            </div>

            {/* Call to Action mit den 3D-Buttons */}
            <div className="space-y-4 pt-2">
              <p className="text-sm font-bold text-[var(--color-ink)]">
                Möchtest du wissen, wie dein Betrieb bei diesen Punkten abschneidet?
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <FirmenflowButton
                  href="/anfrage"
                  buttonIcon="video-einschaetzung"
                  subline="Unverbindlich · Persönlich mit Manu"
                  className="w-full sm:w-auto"
                >
                  Kostenlose Video-Einschätzung
                </FirmenflowButton>

                <FirmenflowButton
                  href="https://wa.me/4915567277155?text=Hallo%20Manu,%20ich%20habe%20gerade%20das%20Website-Quiz%20gemacht%20und%20w%C3%BCrde%20gerne%20meine%20Website%20pr%C3%BCfen%20lassen."
                  external
                  buttonIcon="whatsapp"
                  subline="Schnelle Antwort aufs Handy"
                  className="w-full sm:w-auto"
                >
                  Per WhatsApp schreiben
                </FirmenflowButton>
              </div>

              {/* Quiz-Wiederholung & Modus-Wechsel */}
              <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-mono font-bold">
                <button
                  type="button"
                  onClick={() => handleStart(mode)}
                  className="px-4 py-2 rounded-full bg-[var(--color-paper)] border border-[var(--color-line)] text-[var(--color-ink)] hover:bg-[var(--color-line)] transition-colors inline-flex items-center gap-1.5 shadow-sm"
                >
                  <span>Neue Fragen im {mode === "kompakt" ? "Kompakt-Check" : "Meister-Check"} rotieren</span>
                  <span aria-hidden="true">↺</span>
                </button>

                <button
                  type="button"
                  onClick={handleRestart}
                  className="text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors inline-flex items-center gap-1"
                >
                  <span>Anderen Modus wählen</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
