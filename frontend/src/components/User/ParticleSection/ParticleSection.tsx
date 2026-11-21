import ParticleText from "../Motion/ParticleText";

/**
 * The INSOURCE wordmark as interactive particles. No borders, labels or
 * backdrop of its own, so it reads as part of the page flow rather than a
 * separate band.
 */
export default function ParticleSection() {
  return (
    <section aria-label="Insource" className="relative bg-[var(--bg)] py-4 sm:py-8 lg:py-10 xl:py-16">
      <div className="shell relative">
        <ParticleText text="INSOURCE" className="w-full" />
      </div>
    </section>
  );
}
