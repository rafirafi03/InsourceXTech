const SpinnerLoader = () => {
  return (
    <div
      className="loader-overlay fixed inset-0 z-50 flex items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="loader-panel flex flex-col items-center gap-5 px-8 py-7">
        <div className="relative h-[4.5rem] w-[4.5rem]">
          <span className="loader-ring loader-ring-outer" aria-hidden />
          <span className="loader-ring loader-ring-inner" aria-hidden />
          <span className="loader-ring loader-ring-dash" aria-hidden />

          <div className="absolute inset-[0.9rem] flex items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(11,31,68,0.08)]">
            <img
              src="/insourcextechlogo.png"
              alt=""
              className="loader-mark h-7 w-7 rounded-full object-cover"
            />
          </div>
        </div>

        <div className="text-center">
          <p className="font-display text-2xl leading-none tracking-[0.04em] text-[var(--color-ink)]">
            INSOURCE
          </p>
          <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
            Loading
            <span className="loader-dots" aria-hidden>
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </p>
        </div>

        <div className="loader-track h-[2px] w-28 overflow-hidden rounded-full bg-[var(--color-muted)]">
          <span className="loader-bar block h-full w-1/2 rounded-full bg-[var(--color-accent)]" />
        </div>
      </div>
    </div>
  );
};

export default SpinnerLoader;
