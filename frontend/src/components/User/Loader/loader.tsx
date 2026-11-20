const SpinnerLoader = () => {
  return (
    <div
      className="flex min-h-[18rem] items-center justify-center bg-[var(--bg)] py-10"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-5">
        <div className="relative h-16 w-16">
          <span className="loader-ring loader-ring-outer" aria-hidden />
          <span className="loader-ring loader-ring-inner" aria-hidden />
          <div className="absolute inset-[0.85rem] flex items-center justify-center rounded-full bg-[var(--bg-card)]">
            <img src="/insourcextechlogo.png" alt="" className="h-6 w-6 rounded-full object-cover" />
          </div>
        </div>
        <p className="font-display text-[10px] tracking-[0.4em] text-[var(--text-faint)]">
          Loading
        </p>
      </div>
    </div>
  );
};

export default SpinnerLoader;
