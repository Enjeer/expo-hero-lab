import { useEffect, useRef, useState } from "react";
import forum from "@/assets/hero-forum.jpg";
import { clamp01, usePointer } from "./use-scroll";

/**
 * 05 — UNEXPECTED: "THE CRATE"
 * The hero starts as a sealed black flight case standing in the browser.
 * The user physically drags the crate open (drag the handle sideways) —
 * the panels swing away and the whole exhibition hall unfolds from inside,
 * with the EXPO wordmark assembling as the final reveal.
 */
export function Hero05Portal() {
  const [open, setOpen] = useState(0); // 0 closed .. 1 fully open
  const draggingRef = useRef(false);
  const [stageRef, m] = usePointer<HTMLDivElement>();
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const onUp = () => {
      draggingRef.current = false;
      setOpen((v) => (v > 0.45 ? 1 : 0)); // snap
    };
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      setOpen((v) => clamp01(v + e.movementX / 420));
    };
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const startDrag = () => {
    draggingRef.current = true;
    setHint(false);
  };

  return (
    <section className="relative h-screen overflow-hidden bg-brand-ink">
      <div ref={stageRef} className="absolute inset-0" style={{ perspective: "1600px" }}>
        {/* inside: the hall */}
        <div className="absolute inset-0" style={{ opacity: 0.15 + open * 0.85 }}>
          <img
            src={forum}
            alt="Форум в большом зале — сцена и зрители"
            width={1920}
            height={1088}
            loading="lazy"
            className="h-full w-full object-cover"
            style={{ transform: `scale(${1.25 - open * 0.2}) translate3d(${m.x * -1.5}%, 0, 0)` }}
          />
          <div className="absolute inset-0 bg-brand-ink/45" />
        </div>

        {/* content inside the crate */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{
            opacity: Math.max(0, (open - 0.55) / 0.45),
            transform: `translate3d(0,${(1 - open) * 6}vh,0)`,
          }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-brand-flame">
            распаковано
          </span>
          <h2 className="mt-5 font-display text-[16vw] leading-[0.82] tracking-[-0.05em] text-white md:text-[11vw]">
            EXPO
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
            Внутри каждого кейса — выставка, форум, конференция или городское событие. Мы
            распаковываем их в реальность.
          </p>
        </div>

        {/* crate panels */}
        {(["left", "right"] as const).map((side) => {
          const sign = side === "left" ? -1 : 1;
          return (
            <div
              key={side}
              className="absolute inset-y-0 w-1/2 origin-[var(--o)] bg-crate will-change-transform"
              style={
                {
                  ["--o" as string]: side === "left" ? "left center" : "right center",
                  [side]: 0,
                  transform: `rotateY(${sign * open * 88}deg) translateZ(${open * 40}px)`,
                  boxShadow: "inset 0 0 140px rgba(0,0,0,0.9)",
                } as React.CSSProperties
              }
            >
              <div className="absolute inset-6 border border-white/10" />
              <div className="absolute inset-x-0 top-[18%] h-[2px] bg-white/10" />
              <div className="absolute inset-x-0 bottom-[18%] h-[2px] bg-white/10" />
              {side === "left" ? (
                <div className="absolute bottom-10 left-10 font-mono text-[10px] uppercase leading-6 tracking-[0.3em] text-white/40">
                  case no. 05
                  <br />
                  expo / fragile
                </div>
              ) : (
                <div className="absolute right-10 top-10 text-right font-mono text-[10px] uppercase leading-6 tracking-[0.3em] text-white/40">
                  вес 1 240 кг
                  <br />
                  содержимое: событие
                </div>
              )}
              <div
                className="absolute top-1/2 h-24 w-[10px] -translate-y-1/2 bg-brand-flame"
                style={{ [side === "left" ? "right" : "left"]: "-5px" } as React.CSSProperties}
              />
            </div>
          );
        })}

        {/* seam glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-full w-[3vw] -translate-x-1/2 bg-seam-glow"
          style={{ opacity: 0.25 + Math.sin(open * Math.PI) * 0.75 }}
        />

        {/* drag handle */}
        <button
          type="button"
          onPointerDown={startDrag}
          aria-label="Открыть кейс"
          className="absolute left-1/2 top-1/2 z-10 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center rounded-full border border-brand-flame/70 bg-brand-ink/70 backdrop-blur-sm active:cursor-grabbing"
          style={{ opacity: 1 - open, transform: `translate(-50%,-50%) scale(${1 - open * 0.4})` }}
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-brand-flame">
            drag
          </span>
          <span className="absolute inset-0 animate-ping-slow rounded-full border border-brand-flame/40" />
        </button>

        <div
          className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-brand-dim"
          style={{ opacity: hint ? 1 - open : 0 }}
        >
          ← потяни, чтобы распаковать событие →
        </div>
      </div>
    </section>
  );
}
