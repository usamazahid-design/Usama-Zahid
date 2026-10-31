'use client';

import { motion } from 'framer-motion';
import { CARD_SHARE_URL } from '@/lib/card-data';

export default function CardShareButton() {
  const handleShare = async () => {
    const payload = {
      title: 'Usama Zahid | Brand & Product Designer',
      text: 'Digital business card',
      url: CARD_SHARE_URL,
    };

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(payload);
        return;
      } catch {
        /* user cancelled */
      }
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(CARD_SHARE_URL);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleShare}
      data-card-interactive
      aria-label="Share visiting card"
      className="fixed bottom-6 right-6 z-[100] flex h-11 w-11 items-center justify-center border border-uz-slate/80 bg-uz-graphite"
      whileTap={{ scale: 0.96 }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M12 16V4m0 0 4 4m-4-4-4 4"
          stroke="#F6F6F6"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      </svg>
    </motion.button>
  );
}
