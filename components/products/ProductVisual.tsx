'use client';

import { useState } from 'react';
import type { Product } from '@/lib/products-data';

interface ProductVisualProps {
  product: Product;
  className?: string;
}

export default function ProductVisual({ product, className = 'w-full h-full' }: ProductVisualProps) {
  const [showFallback, setShowFallback] = useState(false);

  if (product.thumbnail && !showFallback) {
    return (
      <img
        src={product.thumbnail}
        alt={product.name}
        className={className}
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        onError={() => setShowFallback(true)}
      />
    );
  }

  if (product.type === 'figma') {
    return (
      <svg viewBox="0 0 400 300" className={className}>
        <rect width="400" height="300" fill="#1C1C1C" />
        <rect x="16" y="16" width="48" height="268" fill="#040404" />
        <circle cx="40" cy="40" r="6" fill="#4B3FFF" />
        <rect x="32" y="64" width="16" height="16" fill="#9A9A9A" />
        <rect x="32" y="92" width="16" height="16" fill="#9A9A9A" />
        <rect x="32" y="120" width="16" height="16" fill="#9A9A9A" />
        <rect x="32" y="148" width="16" height="16" fill="#9A9A9A" />
        <rect x="80" y="32" width="304" height="48" fill="#F6F6F6" />
        <rect x="80" y="96" width="200" height="32" fill="#F6F6F6" opacity="0.6" />
        <rect x="80" y="144" width="100" height="100" fill="#4B3FFF" />
        <rect x="200" y="144" width="100" height="100" fill="#F6F6F6" opacity="0.4" />
        <rect x="320" y="144" width="64" height="100" fill="#F6F6F6" opacity="0.2" />
      </svg>
    );
  }
  if (product.type === 'nextjs') {
    return (
      <svg viewBox="0 0 400 300" className={className}>
        <rect width="400" height="300" fill="#040404" />
        <rect x="20" y="20" width="360" height="20" fill="#1C1C1C" />
        <circle cx="32" cy="30" r="2.5" fill="#4B3FFF" />
        <circle cx="42" cy="30" r="2.5" fill="#9A9A9A" opacity="0.5" />
        <circle cx="52" cy="30" r="2.5" fill="#9A9A9A" opacity="0.5" />
        <rect x="80" y="24" width="200" height="12" fill="#1C1C1C" stroke="#9A9A9A" strokeWidth="0.5" />
        <rect x="20" y="50" width="360" height="30" fill="#1C1C1C" />
        <rect x="40" y="60" width="80" height="10" fill="#F6F6F6" />
        <rect x="40" y="100" width="200" height="14" fill="#F6F6F6" />
        <rect x="40" y="124" width="160" height="8" fill="#9A9A9A" opacity="0.5" />
        <rect x="40" y="138" width="140" height="8" fill="#9A9A9A" opacity="0.5" />
        <rect x="40" y="170" width="60" height="24" fill="#4B3FFF" />
        <rect x="240" y="100" width="120" height="120" fill="#1C1C1C" />
        <rect x="252" y="112" width="20" height="20" fill="#F6F6F6" />
        <rect x="252" y="138" width="14" height="14" fill="#F6F6F6" />
        <path d="M 266 152 L 266 166 A 12 12 0 0 0 278 178 L 278 152" stroke="#F6F6F6" strokeWidth="3" fill="none" />
        <rect x="278" y="166" width="14" height="14" fill="#4B3FFF" />
      </svg>
    );
  }
  if (product.type === 'notion') {
    return (
      <svg viewBox="0 0 400 300" className={className}>
        <rect width="400" height="300" fill="#1C1C1C" />
        <rect x="0" y="0" width="80" height="300" fill="#040404" />
        <rect x="12" y="20" width="56" height="6" fill="#9A9A9A" />
        <rect x="12" y="36" width="40" height="6" fill="#9A9A9A" opacity="0.5" />
        <rect x="12" y="52" width="48" height="6" fill="#9A9A9A" opacity="0.5" />
        <rect x="12" y="68" width="36" height="6" fill="#9A9A9A" opacity="0.5" />
        <rect x="12" y="84" width="44" height="6" fill="#4B3FFF" />
        <rect x="12" y="100" width="40" height="6" fill="#9A9A9A" opacity="0.5" />
        <rect x="12" y="116" width="48" height="6" fill="#9A9A9A" opacity="0.5" />
        <rect x="100" y="20" width="200" height="14" fill="#F6F6F6" />
        <rect x="100" y="48" width="160" height="6" fill="#9A9A9A" opacity="0.6" />
        <rect x="100" y="80" width="280" height="6" fill="#9A9A9A" opacity="0.3" />
        <rect x="100" y="92" width="240" height="6" fill="#9A9A9A" opacity="0.3" />
        <rect x="100" y="104" width="260" height="6" fill="#9A9A9A" opacity="0.3" />
        <rect x="100" y="120" width="180" height="6" fill="#9A9A9A" opacity="0.3" />
      </svg>
    );
  }
  if (product.type === 'motion') {
    return (
      <svg viewBox="0 0 400 300" className={className}>
        <rect width="400" height="300" fill="#1C1C1C" />
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          return (
            <g key={i} transform={`translate(${20 + col * 124}, ${20 + row * 90})`}>
              <rect width="116" height="80" fill="#040404" stroke="#9A9A9A" strokeWidth="0.5" opacity="0.5" />
              {i === 0 && <circle cx="58" cy="40" r="10" fill="none" stroke="#4B3FFF" strokeWidth="2" />}
              {i === 1 && <rect x="20" y="32" width="76" height="16" fill="#4B3FFF" opacity="0.8" />}
              {i === 2 && <path d="M 30 40 L 86 40" stroke="#F6F6F6" strokeWidth="2" strokeDasharray="4 4" />}
              {i === 3 && <rect x="38" y="28" width="40" height="24" fill="#4B3FFF" opacity="0.6" />}
              {i === 4 && <circle cx="58" cy="40" r="6" fill="#4B3FFF" />}
              {i === 5 && <path d="M 30 60 Q 58 20 86 60" stroke="#F6F6F6" strokeWidth="2" fill="none" />}
            </g>
          );
        })}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 400 300" className={className}>
      <rect width="400" height="300" fill="#1C1C1C" />
      <rect x="80" y="30" width="200" height="240" fill="#F6F6F6" />
      <rect x="100" y="50" width="120" height="10" fill="#040404" />
      <rect x="100" y="70" width="80" height="6" fill="#040404" opacity="0.6" />
      <rect x="100" y="100" width="160" height="4" fill="#040404" opacity="0.3" />
      <rect x="100" y="112" width="140" height="4" fill="#040404" opacity="0.3" />
      <rect x="100" y="124" width="150" height="4" fill="#040404" opacity="0.3" />
      <rect x="100" y="160" width="80" height="8" fill="#4B3FFF" />
      <rect x="100" y="240" width="40" height="14" fill="#4B3FFF" />
    </svg>
  );
}
