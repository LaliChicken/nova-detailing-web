const BODY_PATH =
  "M44 172c-11 0-16-11-12-23 4-12 16-19 30-21l88-40c10-6 22-9 36-9h86c16 0 28 4 39 12l45 33 56 9c24 4 38 13 40 25 2 10-5 15-14 15H44z";

const SPARKLES = [
  { x: 96, y: 104, scale: 0.9, delay: "0s" },
  { x: 238, y: 54, scale: 1.2, delay: "0.9s" },
  { x: 398, y: 110, scale: 0.75, delay: "1.7s" },
  { x: 322, y: 58, scale: 0.6, delay: "2.4s" },
];

/**
 * Abstract vehicle mark for the hero: a navy silhouette with a polish sweep
 * that travels across the bodywork and sparkles that twinkle out of phase.
 * Pure SVG + CSS, so it needs neither photography nor JavaScript.
 */
export function HeroVehicle() {
  return (
    <svg
      className="hero-car"
      viewBox="0 0 480 230"
      role="img"
      aria-label="Illustration of a freshly detailed car"
    >
      <defs>
        <linearGradient id="bodyPaint" x1="60" y1="70" x2="420" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1f57a8" />
          <stop offset="0.45" stopColor="#102c5c" />
          <stop offset="1" stopColor="#081833" />
        </linearGradient>
        <linearGradient id="glassPaint" x1="150" y1="80" x2="330" y2="125" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8ec5ff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#35e0e8" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="sweepPaint" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.7" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="groundGlow" cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#4f9dff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#4f9dff" stopOpacity="0" />
        </radialGradient>

        <clipPath id="bodyClip">
          <path d={BODY_PATH} />
        </clipPath>

        <path
          id="sparkleShape"
          d="M0 -10C1.6 -3.6 3.6 -1.6 10 0C3.6 1.6 1.6 3.6 0 10C-1.6 3.6 -3.6 1.6 -10 0C-3.6 -1.6 -1.6 -3.6 0 -10Z"
        />
      </defs>

      <ellipse cx="240" cy="206" rx="200" ry="18" fill="url(#groundGlow)" />

      <path d={BODY_PATH} fill="url(#bodyPaint)" stroke="rgba(143,197,255,0.45)" strokeWidth="1.5" />

      {/* Greenhouse and B-pillar */}
      <path
        d="M152 122l58-38c8-5 17-8 27-8h72c13 0 23 3 32 10l42 36H152z"
        fill="url(#glassPaint)"
        opacity="0.6"
      />
      <path d="M243 78v44" stroke="rgba(3,10,26,0.55)" strokeWidth="4" strokeLinecap="round" />

      {/* Character line and door seam */}
      <path d="M62 150c90 8 232 8 350-2" stroke="rgba(143,197,255,0.35)" strokeWidth="1.5" fill="none" />
      <path d="M243 124v46" stroke="rgba(143,197,255,0.2)" strokeWidth="1.5" />

      {/* Lights and polish sweep, all clipped to the bodywork */}
      <g clipPath="url(#bodyClip)">
        <path d="M424 144h30c10 2 16 7 17 14h-47z" fill="#e9f1ff" opacity="0.9" />
        <path d="M28 146h30v14H26z" fill="#ff7a90" opacity="0.7" />
        <rect className="hero-car-sweep" x="0" y="30" width="110" height="190" fill="url(#sweepPaint)" />
      </g>

      {/* Wheels */}
      {[142, 372].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="172" r="32" fill="#030a1a" stroke="rgba(143,197,255,0.35)" strokeWidth="2" />
          <circle cx={cx} cy="172" r="17" fill="#0b2044" stroke="rgba(143,197,255,0.5)" strokeWidth="1.5" />
          <g className="hero-car-rim">
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <rect
                key={angle}
                x={cx - 1.5}
                y={159}
                width="3"
                height="13"
                rx="1.5"
                fill="rgba(143,197,255,0.6)"
                transform={`rotate(${angle} ${cx} 172)`}
              />
            ))}
          </g>
        </g>
      ))}

      {/* Sparkles */}
      {SPARKLES.map((sparkle) => (
        <g key={`${sparkle.x}-${sparkle.y}`} transform={`translate(${sparkle.x} ${sparkle.y}) scale(${sparkle.scale})`}>
          <use
            className="hero-car-sparkle"
            href="#sparkleShape"
            fill="#ffffff"
            style={{ animationDelay: sparkle.delay }}
          />
        </g>
      ))}
    </svg>
  );
}
