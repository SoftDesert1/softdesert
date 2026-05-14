"use client";

import {
  motion,
} from "framer-motion";

interface AnimatedSectionProps {

  children:
    React.ReactNode;

  delay?: number;

  className?: string;
}

export function AnimatedSection({
  children,
  delay = 0,
  className = "",
}: AnimatedSectionProps) {

  return (

    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}

      whileInView={{
        opacity: 1,
        y: 0,
      }}

      viewport={{
        once: true,
        amount: 0.2,
      }}

      transition={{
        duration: 0.7,
        delay,
        ease: "easeOut",
      }}

      className={className}
    >
      {children}
    </motion.div>
  );
}