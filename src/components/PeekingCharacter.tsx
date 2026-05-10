import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface PeekingCharacterProps {
  src: string;
  alt: string;
  side: "left" | "right";
  color: string; // hsl color for the gradient glow
  offset?: [number, number]; // scroll range where character peeks [start, end]
  className?: string;
}

const PeekingCharacter = ({ src, alt, side, color, offset = [0.1, 0.6], className = "" }: PeekingCharacterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Character slides in from the side, then slides back out
  // At offset[0]: fully hidden (-120px or +120px off screen)
  // At midpoint between offsets: most visible (only half hidden, -20px)
  // At offset[1]: fully hidden again (caught! slides away fast)
  const midpoint = (offset[0] + offset[1]) / 2;

  const xRange = side === "right"
    ? [80, -20, 80]   // from right: starts off-screen, peeks in, hides again
    : [-80, 20, -80]; // from left: starts off-screen, peeks in, hides again

  const x = useTransform(
    scrollYProgress,
    [offset[0], midpoint, offset[1]],
    xRange
  );

  const opacity = useTransform(
    scrollYProgress,
    [offset[0], midpoint - 0.05, midpoint, midpoint + 0.05, offset[1]],
    [0, 0.7, 0.9, 0.7, 0]
  );

  const rotate = useTransform(
    scrollYProgress,
    [offset[0], midpoint, offset[1]],
    side === "right" ? [15, -5, 15] : [-15, 5, -15]
  );

  return (
    <div ref={ref} className={`absolute ${side === "right" ? "right-0" : "left-0"} top-1/2 -translate-y-1/2 pointer-events-none z-20 ${className}`}>
      {/* Colored gradient glow */}
      <motion.div
        className={`absolute ${side === "right" ? "-left-32" : "-right-32"} top-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[80px]`}
        style={{
          background: `radial-gradient(circle, ${color.replace(")", " / 0.15)").replace("hsl(", "hsl(")}, transparent 70%)`,
          opacity,
        }}
      />
      {/* Character image */}
      <motion.img
        src={src}
        alt={alt}
        className="w-24 sm:w-32 md:w-40 object-contain drop-shadow-xl"
        style={{ x, opacity, rotate }}
        loading="lazy"
      />
    </div>
  );
};

export default PeekingCharacter;
