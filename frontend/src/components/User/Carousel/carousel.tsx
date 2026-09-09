import { useState, useEffect, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CarouselCard from "../CarouselCard/carouselCard";
import { useGetSolutionsQuery } from "../../../store/slices/apiSlices";
import { IService } from "../../../types";
import { DUMMY_SOLUTIONS, pickList } from "../../../data/dummyContent";

export default function CustomCarousel() {
  const { data: solutions } = useGetSolutionsQuery(undefined);
  const solutionsArray: IService[] = useMemo(() => {
    return pickList(
      solutions?.solutions as IService[] | undefined,
      DUMMY_SOLUTIONS
    );
  }, [solutions]);

  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleItems, setVisibleItems] = useState(2);

  const totalItems = solutionsArray.length;
  const maxIndex = Math.max(0, totalItems - visibleItems);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setVisibleItems(2);
      } else if (window.innerWidth < 1200) {
        setVisibleItems(3);
      } else {
        setVisibleItems(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Keep index in range when data or visible count changes
  useEffect(() => {
    setCurrentItemIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating || totalItems === 0) return;
      const next = Math.max(0, Math.min(index, maxIndex));
      if (next === currentItemIndex) return;

      setIsAnimating(true);
      setCurrentItemIndex(next);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating, totalItems, maxIndex, currentItemIndex]
  );

  const handleNextItem = useCallback(() => {
    if (isAnimating || totalItems === 0) return;

    setIsAnimating(true);
    setCurrentItemIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, totalItems, maxIndex]);

  const handlePrevItem = useCallback(() => {
    if (isAnimating || totalItems === 0) return;

    setIsAnimating(true);
    setCurrentItemIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, totalItems, maxIndex]);

  useEffect(() => {
    if (isPaused || totalItems <= visibleItems) return;

    const interval = setInterval(() => {
      handleNextItem();
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, handleNextItem, totalItems, visibleItems]);

  const getItemWidthClass = () => {
    switch (visibleItems) {
      case 1:
        return "w-full";
      case 2:
        return "w-1/2";
      case 3:
        return "w-1/3";
      case 4:
        return "w-1/4";
      default:
        return "w-1/2";
    }
  };

  if (totalItems === 0) {
    return null;
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative -my-3 overflow-hidden py-3">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${(currentItemIndex * 100) / visibleItems}%)`,
          }}
        >
          {solutionsArray.map((item, index) => (
            <div
              key={item._id ?? index}
              className={`${getItemWidthClass()} relative z-0 flex-none px-0.5 transition-[z-index] hover:z-20 sm:px-1.5 md:px-2`}
            >
              <CarouselCard title={item?.title} image={item?.image} />
            </div>
          ))}
        </div>
      </div>

      {totalItems > visibleItems && (
        <>
          <button
            onClick={handlePrevItem}
            className="absolute left-0 top-[34%] z-10 flex h-9 w-9 -translate-x-1 items-center justify-center rounded-full bg-[var(--color-panel)] text-white shadow-lg transition hover:bg-[var(--color-accent)] focus:outline-none sm:left-1 sm:h-10 sm:w-10 sm:translate-x-0"
            aria-label="Previous item"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            onClick={handleNextItem}
            className="absolute right-0 top-[34%] z-10 flex h-9 w-9 translate-x-1 items-center justify-center rounded-full bg-[var(--color-panel)] text-white shadow-lg transition hover:bg-[var(--color-accent)] focus:outline-none sm:right-1 sm:h-10 sm:w-10 sm:translate-x-0"
            aria-label="Next item"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}

      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {solutionsArray.map((item, index) => {
          const isInView =
            index >= currentItemIndex &&
            index < currentItemIndex + visibleItems;
          const isLead = index === currentItemIndex;

          return (
            <button
              key={item._id ?? `dot-${index}`}
              type="button"
              onClick={() => goTo(Math.min(index, maxIndex))}
              className={`h-2 rounded-full transition-all ${
                isLead
                  ? "w-7 bg-[var(--color-accent)]"
                  : isInView
                    ? "w-3.5 bg-[var(--color-accent)]/55"
                    : "w-2 bg-[var(--color-ink)]/15 hover:bg-[var(--color-ink)]/30"
              }`}
              aria-label={`Go to solution ${index + 1}: ${item.title}`}
              aria-current={isLead ? "true" : undefined}
            />
          );
        })}
      </div>
    </div>
  );
}
