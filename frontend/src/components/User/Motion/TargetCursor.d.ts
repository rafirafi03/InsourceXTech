import type { FC, RefObject } from "react";

export type TargetCursorProps = {
  targetSelector?: string;
  cursorColor?: string;
  cursorColorOnTarget?: string;
  spinDuration?: number;
  hoverDuration?: number;
  parallaxOn?: boolean;
  hideDefaultCursor?: boolean;
  size?: number;
  cornerSize?: number;
  thickness?: number;
  padding?: number;
  matchRadius?: boolean;
  dotSize?: number;
  blendMode?: string;
  showLabel?: boolean;
  clickEffect?: boolean;
  container?: RefObject<HTMLElement | null> | HTMLElement | null;
};

declare const TargetCursor: FC<TargetCursorProps>;
export default TargetCursor;
