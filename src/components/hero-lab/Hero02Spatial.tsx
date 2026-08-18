import pavilion from "@/assets/hero-pavilion.jpg";
import { range, usePointer, useSectionProgress } from "./use-scroll";

/**
 * 02 — SPATIAL OBJECT
 * A pavilion floating in a 3D stage. Mouse tilts the whole rig,
 * scroll pushes it toward the camera, rotates it and splits the
 * surrounding frame open so text passes through the object's depth.
 */
export function Hero02Spatial() {
  const [sectionRef, p] = useSectionProgress<HTMLDivElement>();
  const [stageRef, m] = usePointer<HTMLDivElement>();

  const zoom = range(p, 0, 0.85);
  const spin = -18 + zoom * 34;
  const open = range(p, 0.25, 0.9);

  return (
    <section ref={sectionRef} className="relative h-[260vh] bg-brand-ink">
      <div ref={stageRef} className="sticky top-0 h-screen overflow-hidden">
        {/* floor grid */}
        <div
          className="absolute inset-x-[-40%] bottom-[-30%] top-[45%] bg-stage-grid opacity-40"
          style={{
            transform: `perspective(900px) rotateX(72deg) translate3d(${m.x * -2}%, ${zoom * 12}%, 0)`,
            transformOrigin: "50% 0%",
          }}
        />
        {/* glow behind object */}
        <div
          className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-ember blur-[120px]"
          style={{ opacity: 0.25 + zoom * 0.35 }}
        />

        {/* text BEHIND object */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: `translate3d(${m.x * -14}px, ${m.y * -8}px, 0)` }}
        >
          <span
            className="font-display text-[26vw] leading-none tracking-[-0.05em] text-white/[0.07]"
            style={{ transform: `scale(${1 + zoom * 0.35})` }}
          >
            STAND
          </span>
        </div>

        {/* the object */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ perspective: "1400px" }}
        >
          <div
            className="relative h-[86vmin] w-[86vmin] will-change-transform"
            style={{
              transform: `rotateX(${-m.y * 6 + 4}deg) rotateY(${spin + m.x * 8}deg) translate3d(0,0,${zoom * 420}px) scale(${1 + zoom * 0.15})`,
              transformStyle: "preserve-3d",
            }}
          >
            <img
              src={pavilion}
              alt="Выставочный стенд — пространственная конструкция"
              width={1536}
              height={1536}
              loading="lazy"
              className="h-full w-full object-contain drop-shadow-[0_60px_120px_rgba(0,0,0,0.9)]"
            />
            {/* structural frame that opens up */}
            <div
              className="absolute inset-[8%] border border-brand-flame/60"
              style={{ transform: `translateZ(${180 + open * 260}px)`, opacity: 0.8 - open * 0.5 }}
            />
            <div
              className="absolute inset-[18%] border border-brand-flame/30"
              style={{ transform: `translateZ(${-220 - open * 320}px)` }}
            />
          </div>
        </div>

        {/* text IN FRONT of object */}
        <div
          className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 md:p-12"
          style={{ transform: `translate3d(${m.x * 22}px, ${m.y * 12}px, 0)` }}
        >
          <div className="flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.32em] text-brand-dim">
            <span>expo / выставочная застройка</span>
            <span>{(zoom * 100).toFixed(0)}% approach</span>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-[11vw] leading-[0.85] tracking-[-0.04em] text-white md:text-[6vw]">
              ОБЪЁМ,
              <br />
              <span className="text-brand-flame">который работает</span>
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              Проектируем и строим стенды, павильоны и event-инсталляции — под ключ.
            </p>
          </div>
        </div>

        {/* opening slit reveal */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 bg-brand-ink"
          style={{ width: `${(1 - open) * 8}vw` }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 bg-brand-ink"
          style={{ width: `${(1 - open) * 8}vw` }}
        />
      </div>
    </section>
  );
}
