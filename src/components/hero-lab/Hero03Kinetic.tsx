import aerial from "@/assets/hero-aerial.jpg";
import { range, useReveal, useSectionProgress } from "./use-scroll";

const LETTERS = ["E", "X", "P", "O"];
const MARQUEE =
  "ВЫСТАВОЧНЫЕ СТЕНДЫ · ФОРУМЫ · КОНФЕРЕНЦИИ · ГОРОДСКИЕ СОБЫТИЯ · ФЕСТИВАЛИ · ";

/**
 * 03 — KINETIC TYPOGRAPHY
 * The word EXPO is the architecture: four letter columns assemble on load,
 * then scroll drives them apart like sliding walls, revealing the exhibition
 * floor behind, while a giant masked EXPO scales through the viewport.
 */
export function Hero03Kinetic() {
  const [sectionRef, p] = useSectionProgress<HTMLDivElement>();
  const [revealRef, shown] = useReveal<HTMLDivElement>();

  const split = range(p, 0.05, 0.7);
  const maskScale = 1 + range(p, 0.62, 1) * 2.6;

  return (
    <section ref={sectionRef} className="relative h-[280vh] bg-[#f0eeea]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* exhibition floor behind the letters */}
        <img
          src={aerial}
          alt="Вид сверху на застроенную выставочную площадку"
          width={1920}
          height={1088}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ transform: `scale(${1.15 + split * 0.15}) rotate(${split * 2}deg)` }}
        />
        <div className="absolute inset-0 bg-brand-ink/40" />

        {/* letter columns as physical sliding walls */}
        <div ref={revealRef} className="absolute inset-0 flex">
          {LETTERS.map((l, i) => {
            const dir = i < 2 ? -1 : 1;
            const dist = (i === 0 || i === 3 ? 1 : 0.55) * split * 60;
            return (
              <div
                key={l}
                className={`relative flex flex-1 items-center justify-center overflow-hidden bg-[#f0eeea] ${shown ? "animate-type-drop" : "opacity-0"}`}
                style={{
                  transform: `translate3d(${dir * dist}%,0,0)`,
                  animationDelay: `${i * 110}ms`,
                }}
              >
                <span className="absolute inset-y-0 right-0 w-px bg-brand-ink/10" />
                <span className="select-none font-display text-[42vh] leading-none tracking-[-0.06em] text-brand-ink md:text-[62vh]">
                  {l}
                </span>
              </div>
            );
          })}
        </div>

        {/* masked EXPO scaling out of the floor image */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{ opacity: range(p, 0.6, 0.78) * (1 - range(p, 0.93, 1)) }}
        >
          <span
            className="bg-clip-text font-display text-[30vh] leading-none tracking-[-0.06em] text-transparent"
            style={{
              backgroundImage: `url(${aerial})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: `scale(${maskScale})`,
            }}
          >
            EXPO
          </span>
        </div>

        {/* vertical + rotated micro type */}
        <div className="pointer-events-none absolute inset-0">
          <span
            className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.5em] text-brand-ink/70"
            style={{ writingMode: "vertical-rl" }}
          >
            пространство события
          </span>
          <span
            className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.5em] text-brand-flame"
            style={{ writingMode: "vertical-rl" }}
          >
            expo — с 2012 года
          </span>
        </div>

        {/* marquee strip */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-brand-ink/15 bg-[#f0eeea] py-3">
          <div className="flex whitespace-nowrap animate-marquee font-mono text-[11px] tracking-[0.28em] text-brand-ink">
            <span>{MARQUEE.repeat(4)}</span>
            <span>{MARQUEE.repeat(4)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
