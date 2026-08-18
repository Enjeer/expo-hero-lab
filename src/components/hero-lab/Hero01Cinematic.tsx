import cinematic from "@/assets/hero-cinematic.jpg";
import { range, useReveal, useSectionProgress } from "./use-scroll";

/**
 * 01 — CINEMATIC SPACE
 * Sticky camera push-in: background hall, mid-ground truss silhouettes,
 * foreground haze + letterbox bars that open like a lens.
 */
export function Hero01Cinematic() {
  const [sectionRef, p] = useSectionProgress<HTMLDivElement>();
  const [revealRef, shown] = useReveal<HTMLDivElement>();

  const push = p * 1; // 0..1 camera travel
  const bars = 1 - range(p, 0, 0.12); // letterbox closes back at the end
  const closing = range(p, 0.75, 1);

  return (
    <section ref={sectionRef} className="relative h-[260vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* background: the hall */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `scale(${1.05 + push * 0.5}) translate3d(${push * -3}%, 0, 0)`,
            filter: `brightness(${1 - closing * 0.65}) contrast(${1 + push * 0.12})`,
          }}
        >
          <img
            src={cinematic}
            alt="Масштабное выставочное пространство с подсвеченной стеной"
            width={1920}
            height={1088}
            className="h-full w-full object-cover"
          />
        </div>

        {/* mid-ground: truss silhouette passing the camera */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ transform: `scale(${1 + push * 1.9})`, opacity: 0.85 }}
        >
          <div className="absolute left-[18%] top-0 h-full w-[3px] bg-black/80" />
          <div className="absolute left-[19.6%] top-0 h-full w-[10px] bg-black/45" />
          <div className="absolute right-[22%] top-0 h-full w-[3px] bg-black/70" />
          <div className="absolute inset-x-0 top-[8%] h-[2px] bg-black/60" />
        </div>

        {/* haze + vignette */}
        <div className="pointer-events-none absolute inset-0 bg-cine-vignette" />
        <div
          className="pointer-events-none absolute inset-0 bg-cine-haze"
          style={{ opacity: 0.5 + push * 0.35 }}
        />
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.18] mix-blend-overlay" />

        {/* letterbox */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 bg-black transition-none"
          style={{ height: `calc(6vh + ${bars * 12}vh + ${closing * 44}vh)` }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 bg-black"
          style={{ height: `calc(6vh + ${bars * 12}vh + ${closing * 44}vh)` }}
        />

        {/* camera HUD */}
        <div className="pointer-events-none absolute inset-0 px-6 py-[9vh] font-mono text-[10px] uppercase tracking-[0.3em] text-brand-flame/80 md:px-12">
          <div className="flex justify-between" style={{ opacity: 1 - closing }}>
            <span>● rec — expo hall 01</span>
            <span>{(24 + push * 60).toFixed(0)}mm / f1.4</span>
          </div>
          <div
            className="absolute bottom-[9vh] left-6 flex items-center gap-3 md:left-12"
            style={{ opacity: 1 - closing }}
          >
            <span className="h-[1px] w-16 bg-brand-flame/60" />
            <span>dolly in {(push * 100).toFixed(0)}%</span>
          </div>
        </div>

        {/* type */}
        <div
          ref={revealRef}
          className="absolute inset-0 flex items-center justify-center px-6"
          style={{
            opacity: 1 - range(p, 0.45, 0.7),
            transform: `translate3d(0,${-push * 6}vh,0)`,
          }}
        >
          <div className="max-w-4xl text-center">
            <p
              className={`font-mono text-[10px] uppercase tracking-[0.5em] text-brand-flame ${shown ? "animate-cine-line" : "opacity-0"}`}
            >
              выставки · форумы · городские события
            </p>
            <h2
              className={`mt-6 font-display text-[13vw] leading-[0.86] tracking-[-0.03em] text-white md:text-[8.5vw] ${shown ? "animate-cine-title" : "opacity-0"}`}
            >
              EXPO
            </h2>
            <p
              className={`mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/70 md:text-base ${shown ? "animate-cine-sub" : "opacity-0"}`}
            >
              Мы строим пространства, в которые входят. От идеи до открытия.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
