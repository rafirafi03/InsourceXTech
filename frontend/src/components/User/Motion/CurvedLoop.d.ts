import type { FC } from "react";

export type CurvedLoopProps = {
  marqueeText?: string;
  speed?: number;
  className?: string;
  curveAmount?: number;
  direction?: "left" | "right";
  interactive?: boolean;
  pauseOnHover?: boolean;
  color?: string;
  edgeFade?: number;
  shape?: "arc" | "wave" | "line" | "circle";
  fontSize?: number;
  fontWeight?: number;
  letterSpacing?: number;
  outline?: boolean;
  separator?: string;
  separatorColor?: string;
  scrollBoost?: number;
};

declare const CurvedLoop: FC<CurvedLoopProps>;
export default CurvedLoop;
