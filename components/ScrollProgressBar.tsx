'use client';

import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#8949f2] via-[#c4a0f7] to-[#e0a458] origin-left z-[9999] pointer-events-none"
      style={{ scaleX }}
    />
  );
}
