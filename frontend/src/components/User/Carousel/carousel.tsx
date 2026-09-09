import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CarouselCard from "../CarouselCard/carouselCard";
import { useGetSolutionsQuery } from "../../../store/slices/apiSlices";
import { IService } from "../../../types";
import { DUMMY_SOLUTIONS, pickList } from "../../../data/dummyContent";

const SWIPE_THRESHOLD = 48;

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

  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const swipeLocked = useRef<"x" | "y" | null>(null);
  const isAnimatingRef = useRef(false);

  const totalItems = solutionsArray.length;
  const maxIndex = Math.max(0, totalItems - visibleItems);

  useEffect(() => {
    isAnimatingRef.current = isAnimating;
  }, [isAnimating]);

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

  useEffect(() => {
    setCurrentItemIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const runSlide = useCallback((updater: (prev: number) => number) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsAnimating(true);
    setCurrentItemIndex(updater);
    window.setTimeout(() => {
      isAnimatingRef.current = false;
      setIsAnimating(false);
    }, 500);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (totalItems === 0) return;
      const next = Math.max(0, Math.min(index, maxIndex));
      if (next === currentItemIndex) return;
      runSlide(() => next);
    },
    [totalItems, maxIndex, currentItemIndex, runSlide]
  );

  const handleNextItem = useCallback(() => {
    if (totalItems === 0) return;
    runSlide((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [totalItems, maxIndex, runSlide]);

  const handlePrevItem = useCallback(() => {
    if (totalItems === 0) return;
    runSlide((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [totalItems, maxIndex, runSlide]);

  useEffect(() => {
    if (isPaused || totalItems <= visibleItems) return;

    const interval = setInterval(() => {
      handleNextItem();
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, handleNextItem, totalItems, visibleItems]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    pointerStart.current = { x: e.clientX, y: e.clientY };
    swipeLocked.current = null;
    setIsPaused(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerStart.current || swipeLocked.current) return;

    const dx = e.clientX - pointerStart.current.x;
    const dy = e.clientY - pointerStart.current.y;

    if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;

    if (Math.abs(dx) > Math.abs(dy)) {
      swipeLocked.current = "x";
      e.currentTarget.setPointerCapture?.(e.pointerId);
    } else {
      swipeLocked.current = "y";
      pointerStart.current = null;
    }
  };

  const finishSwipe = (clientX: number) => {
    if (!pointerStart.current || swipeLocked.current !== "x") {
      pointerStart.current = null;
      swipeLocked.current = null;
      return;
    }

    const dx = clientX - pointerStart.current.x;
    pointerStart.current = null;
    swipeLocked.current = null;

    if (Math.abs(dx) < SWIPE_THRESHOLD || totalItems <= visibleItems) return;

    if (dx < 0) handleNextItem();
    else handlePrevItem();
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    finishSwipe(e.clientX);
  };

  const onPointerCancel = () => {
    pointerStart.current = null;
    swipeLocked.current = null;
  };

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
      <div
        className="relative -my-3 touch-pan-y overflow-hidden py-3 select-none"
        data-lenis-prevent
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        style={{ touchAction: "pan-y" }}
      >
        <div
          className="flex transition-transform duration-500 ease-out will-change-transform"
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
