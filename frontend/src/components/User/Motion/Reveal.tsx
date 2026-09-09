import { ReactNode } from "react";
import { motion, Variants, useReducedMotion } from "framer-motion";
import {
  fadeUp,
  fadeLeft,
  fadeRight,
  scaleIn,
  revealBlur,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "../../../utils/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  variant?: "up" | "left" | "right" | "scale" | "blur";
  delay?: number;
  as?: "div" | "section" | "header" | "footer";
};

const variantMap: Record<NonNullable<RevealProps["variant"]>, Variants> = {
  up: fadeUp,
  left: fadeLeft,
  right: fadeRight,
  scale: scaleIn,
  blur: revealBlur,
};

export function Reveal({
  children,
  className,
  variant = "up",
  delay = 0,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Component
      className={className}
      variants={variantMap[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
};

export function Stagger({ children, className }: StaggerProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}
