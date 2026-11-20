import type { FC } from "react";

export type ChromaGridItem = {
  image: string;
  title?: string;
  subtitle?: string;
  alt?: string;
  accent?: string;
  borderColor?: string;
  url?: string;
  /** Insource: small line above the title */
  eyebrow?: string;
  /** Insource: label for the target cursor */
  cursorLabel?: string;
};

export type ChromaGridProps = {
  items?: ChromaGridItem[];
  columns?: number;
  minCardWidth?: number;
  gap?: number;
  radius?: number;
  softness?: number;
  damping?: number;
  fadeOut?: number;
  grayscale?: number;
  dim?: number;
  glow?: number;
  borderGlow?: number;
  reveal?: "spotlight" | "card";
  aspectRatio?: string;
  cardRadius?: number;
  showInfo?: boolean;
  frame?: boolean;
  theme?: "dark" | "light" | "midnight";
  className?: string;
  /** Insource: renders cards as buttons and calls this on click */
  onItemClick?: (item: ChromaGridItem, index: number) => void;
  /** Insource: staggered entrance when scrolled into view (default true) */
  entrance?: boolean;
};

export declare const ChromaGrid: FC<ChromaGridProps>;
declare const _default: FC<ChromaGridProps>;
export default _default;
