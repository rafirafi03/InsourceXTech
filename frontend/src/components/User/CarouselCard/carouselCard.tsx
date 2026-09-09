import { motion } from "framer-motion";

interface CarouselCardProps {
  title: string;
  image: string;
}

const CarouselCard = ({ title, image }: CarouselCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
      className="group relative z-0 flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#dce5f5] bg-white shadow-[0_8px_24px_rgba(11,31,68,0.05)] transition-shadow hover:z-10 hover:shadow-[0_12px_28px_rgba(37,99,235,0.12)]"
    >
      <div className="relative h-28 overflow-hidden bg-[var(--color-muted)] sm:h-36">
        <img
          src={image || "/api/placeholder/400/320"}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-panel)]/25 to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col px-2.5 py-2.5 sm:px-4 sm:py-4">
        <h3 className="font-display text-base uppercase leading-tight tracking-wide text-[var(--color-ink)] line-clamp-2 sm:text-lg">
          {title}
        </h3>
      </div>
    </motion.div>
  );
};

export default CarouselCard;
