import React from 'react';

export const Logo = ({ className = "w-32 h-32", showText = true, imageUrl }: { className?: string; showText?: boolean; imageUrl?: string }) => {
  return (
    <svg 
      viewBox="0 0 512 512" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <clipPath id="leftPageClip">
          <path d="M-100 -60 C-100 -60 -20 -70 0 -60 L0 60 C-20 50 -100 60 -100 60 Z" />
        </clipPath>
        <clipPath id="logoCircle">
          <circle cx="256" cy="256" r="120" />
        </clipPath>
      </defs>

      {/* Outer Bead Ring */}
      <g id="BeadRing">
        {Array.from({ length: 60 }).map((_, i) => {
          const angle = (i * 360) / 60;
          const radius = 240;
          const x = 256 + radius * Math.cos((angle * Math.PI) / 180);
          const y = 256 + radius * Math.sin((angle * Math.PI) / 180);
          const colors = ['#D4AF37', '#F5F1E8', '#C47A2C'];
          return (
            <circle 
              key={i} 
              cx={x} 
              cy={y} 
              r="3" 
              fill={colors[i % 3]} 
            />
          );
        })}
      </g>

      {/* Top Element: Wrench and Gear */}
      <g id="TopElement" transform="translate(256, 100)">
        {/* Gear */}
        <circle cx="0" cy="0" r="25" stroke="#D4AF37" strokeWidth="4" />
        {Array.from({ length: 8 }).map((_, i) => (
          <rect 
            key={i}
            x="-4" y="-32" width="8" height="10" 
            fill="#D4AF37" 
            transform={`rotate(${i * 45})`}
          />
        ))}
        <circle cx="0" cy="0" r="10" fill="none" stroke="#D4AF37" strokeWidth="4" />
        
        {/* Crossed Wrench (Simplified) */}
        <g transform="rotate(45)">
          <rect x="-30" y="-3" width="60" height="6" fill="#D4AF37" rx="2" />
          <circle cx="-30" cy="0" r="8" fill="none" stroke="#D4AF37" strokeWidth="4" />
          <rect x="-38" y="-2" width="10" height="4" fill="var(--card-bg, white)" /> {/* Cutout */}
        </g>
      </g>

      {imageUrl ? (
        /* Custom Logo Image integrated into the professional design */
        <g id="CustomLogo" clipPath="url(#logoCircle)">
          <rect x="136" y="136" width="240" height="240" fill="var(--card-bg, white)" rx="120" />
          <image 
            href={imageUrl} 
            x="136" y="136" width="240" height="240" 
            preserveAspectRatio="xMidYMid slice"
          />
          <circle cx="256" cy="256" r="120" stroke="currentColor" strokeWidth="4" fill="none" />
        </g>
      ) : (
        /* Center Element: Open Book */
        <g id="Book" transform={`translate(256, ${showText ? 240 : 256})`}>
          {/* Left Page */}
          <path 
            d="M-100 -60 C-100 -60 -20 -70 0 -60 L0 60 C-20 50 -100 60 -100 60 Z" 
            fill="var(--card-bg, white)" 
            stroke="currentColor" 
            strokeWidth="4" 
          />
          {/* Imigongo Chevron (Terracotta) */}
          <g clipPath="url(#leftPageClip)">
            <path d="M-80 -40 L-50 -20 L-20 -40 M-80 -20 L-50 0 L-20 -20 M-80 0 L-50 20 L-20 0" stroke="#C47A2C" strokeWidth="3" fill="none" />
          </g>
          
          {/* Right Page */}
          <path 
            d="M100 -60 C100 -60 20 -70 0 -60 L0 60 C20 50 100 60 100 60 Z" 
            fill="var(--card-bg, white)" 
            stroke="currentColor" 
            strokeWidth="4" 
          />
          {/* Imigongo Triangles (Deep Green) */}
          <g transform="translate(20, -40)">
            <path d="M10 0 L30 20 L10 40 Z M40 10 L60 30 L40 50 Z" fill="currentColor" opacity="0.6" />
          </g>
        </g>
      )}

      {/* Typography */}
      {showText && (
        <g id="Text" transform="translate(256, 380)">
          <text 
            textAnchor="middle" 
            fontFamily="sans-serif" 
            fontWeight="bold" 
            fontSize="28" 
            fill="currentColor"
          >
            RWANDA TVET LOGBOOK FORM
          </text>
          <text 
            y="35"
            textAnchor="middle" 
            fontFamily="sans-serif" 
            fontWeight="500" 
            fontSize="12" 
            fill="#D4AF37"
            letterSpacing="0.5"
          >
            Building Skills. Skilled Hands. Recording Progress. Rwandan Pride.
          </text>
        </g>
      )}
    </svg>
  );
};
