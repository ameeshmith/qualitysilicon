import React from 'react';

export default function AmbientBackground({ theme = 'dark' }) {
  const isLight = theme === 'light';

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-500"
      aria-hidden="true"
    >
      {/* Balanced Deep Royal Cobalt Canvas (Slightly darker, rich & comfortable on the eyes) */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: isLight
            ? 'linear-gradient(160deg, #CFE0FF 0%, #EAF2FF 48%, #F6F9FF 100%)'
            : 'linear-gradient(160deg, #1B3FC4 0%, #14319E 52%, #0E2378 100%)',
        }}
      />

      {/* Soft glassmorphic ambient highlights + subtle warm yellow glow */}
      <div
        className={`absolute -top-32 -left-20 w-[640px] h-[640px] rounded-full blur-[140px] ${
          isLight ? 'bg-blue-400/25' : 'bg-[#3661EB]/30'
        }`}
      />
      <div
        className={`absolute top-[16%] right-[16%] w-[360px] h-[360px] rounded-full blur-[150px] ${
          isLight ? 'bg-amber-300/25' : 'bg-[#FACC15]/[0.12]'
        }`}
      />
      <div
        className={`absolute bottom-[10%] -right-20 w-[560px] h-[560px] rounded-full blur-[150px] ${
          isLight ? 'bg-cyan-300/20' : 'bg-[#2563EB]/25'
        }`}
      />
    </div>
  );
}
