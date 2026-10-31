'use client';

import { motion } from 'framer-motion';

export default function CardPageTransition() {
  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-uz-indigo pointer-events-none"
      initial={{ y: 0 }}
      animate={{ y: '-100%' }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      aria-hidden="true"
    />
  );
}
