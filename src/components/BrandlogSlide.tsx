
import React from 'react';
import CardBlue from './CardBlue';

// Highly accurate inline SVG logo definitions - scaled up to a large, prominent size
const BrandLogos = {
  Oracle: () => (
    <svg viewBox="0 0 120 20" className="h-8 md:h-10 w-auto fill-[#C7251B]" aria-label="Oracle">
      <path d="M12.4 0C5.6 0 0 4.5 0 10c0 5.5 5.6 10 12.4 10h18.3c6.8 0 12.4-4.5 12.4-10c0-5.5-5.6-10-12.4-10H12.4zm18.3 15.6H12.4c-3.8 0-6.9-2.5-6.9-5.6 0-3.1 3.1-5.6 6.9-5.6h18.3c3.8 0 6.9 2.5 6.9 5.6 0 3.1-3.1 5.6-6.9 5.6zM54.1 0.4h5.2v8.1c1.5-2.2 4-3.1 6.5-3.1 5.4 0 8.7 3.8 8.7 9.1v5.1h-5.2v-4.7c0-3.6-2-5.1-4.9-5.1-3 0-5.1 2.2-5.1 5.4v4.4h-5.2V0.4zm23.8 13.9c0-3.9 3.2-9 9.3-9 4.3 0 6.4 2.2 6.4 5c0 4.1-3.4 4.8-8.2 5.1-1.3.1-2.3.4-2.3 1.2 0 .7.8 1.1 2.2 1.1 2.4 0 5-1 6.3-1.8l1.3 3.3c-2.1 1.3-5.2 2-8 2-6.5-.1-10-2.8-10-6.9zm10.4-3.6c0-1-.6-1.7-2.1-1.7-2.1 0-3 .9-3.2 2.3.9-.1 2.2-.2 3.1-.3.9-.1 2.2-.1 2.2-.3zM106.6.4h5.2v19.1h-5.2V.4zm-1.8 14.1c0-4.3 3.3-9.1 9.3-9.1 6 0 8.5 4.3 8.5 8.9 0 .5 0 .9-.1 1.2H109.8c.2 2 1.8 3.3 4.2 3.3 2 0 3.7-.7 5.1-1.6l1.3 3.1c-1.9 1.4-4.6 2.1-7.6 2.1-5.8 0-9.8-3.9-9.8-9zm11.7-2.4c0-2-1.1-3.2-3.2-3.2-2 0-3.1 1.1-3.3 3.2h6.5z" />
    </svg>
  ),
  Microsoft: () => (
    <div className="flex items-center gap-2 shrink-0">
      <svg viewBox="0 0 23 23" className="h-8 md:h-10 w-auto" aria-label="Microsoft Logo">
        <rect x="0" y="0" width="10.5" height="10.5" fill="#F25022" />
        <rect x="11.5" y="0" width="10.5" height="10.5" fill="#7FBA00" />
        <rect x="0" y="11.5" width="10.5" height="10.5" fill="#00A4EF" />
        <rect x="11.5" y="11.5" width="10.5" height="10.5" fill="#FFB900" />
      </svg>
      <span className="font-semibold text-[#737373] text-xl md:text-2xl font-sans tracking-tight">Microsoft</span>
    </div>
  ),
  Amex: () => (
    <svg viewBox="0 0 160 30" className="h-7 md:h-9 w-auto fill-[#0070CD]" aria-label="American Express">
      <path d="M12.5 5h4.6l5.2 14.5L27.5 5h4.6V25h-3.8V11.2l-4.7 13.8h-2.6L16.3 11.2V25h-3.8V5zm24.6 0h12.1v3.4h-8.3v4.6h7.5V16.4h-7.5v5.2h8.6V25H37.1V5zm15.4 0h4.4l3.7 5.8 3.7-5.8h4.4v20h-3.8v-11l-4.3 6.8h-1.3l-4.3-6.8V25h-3.8V5zm19.6 0h10.3c3.8 0 5.8 1.6 5.8 4.6 0 2.3-1.2 3.6-2.9 4.2 2 .6 3.4 2.1 3.4 4.7 0 3.3-2.3 6.5-6.5 6.5H76.7V5zm3.8 3.4v5h5.8c1.6 0 2.6-.8 2.6-2.5 0-1.6-1-2.5-2.6-2.5h-5.8zm0 8.4v4.8h6.2c1.8 0 2.8-.9 2.8-2.4 0-1.6-1-2.4-2.8-2.4h-6.2zM98.8 5c4.8 0 7.8 3.3 7.8 7.5s-3 7.5-7.8 7.5H96v5H92.2V5h6.6zm-2.8 3.4v5.8h2.8c2.4 0 4-1.2 4-2.9s-1.6-2.9-4-2.9h-2.8zM113.8 5h3.8l5.2 8.5 5.2-8.5h3.8V25h-3.8V13.5L122.8 21h-1.6l-5.2-7.5V25h-3.8V5zm25.5 0h11.1v3.4H142v4.6h8.8V16.4H142v5.2h9.1V25h-12.9V5zm14.3 0h3.8v20h-3.8V5z" className="fill-[#006fcf]" />
    </svg>
  ),
  Netflix: () => (
    <svg viewBox="0 0 120 32" className="h-9 md:h-12 w-auto fill-[#E50914]" aria-label="Netflix">
      <path d="M10.5 0H5v32c1.8-.2 3.7-.3 5.5-.5V10.2L21.2 32c1.9-.3 3.8-.5 5.8-.7V0h-5.5v21.5L10.5 0zm25.1 6.5v6.2h8.7v5H35.6v8.6H45V31c-4.3-.2-8.7-.3-13.1-.3V0h13.1v5.2h-9.4v1.3zm27.1-6.5h-5.5v5.2h4.5v24.2c1.8-.1 3.7-.1 5.5 0V5.2h4.5V0h-9zm15.1 0h-5.5v30.9c1.8 0 3.7.1 5.5.2V0zm13.1 6.5v6.2h8v5h-8v13.6c2.1.2 4.1.4 6.2.7v-5.2c-1.1-.1-2.1-.2-3.2-.2v-8.9h4.3v-5h-4.3V5.2h5.5V0h-11v6.5zm20.3-6.5h-5.5v32.2c1.9.4 3.7.8 5.5 1.3V0z" />
    </svg>
  ),
  PG: () => (
    <div className="flex items-center shrink-0">
      <svg viewBox="0 0 100 45" className="h-12 md:h-16 w-auto fill-[#003CA5]" aria-label="P&G Logo">
        <path d="M15 10c-5.5 0-10 4.5-10 10s4.5 10 10 10c2.5 0 4.8-1 6.5-2.5l-2-2C18 26.5 16.5 27 15 27c-3.9 0-7-3.1-7-7s3.1-7 7-7c1.5 0 2.8.5 3.8 1.3l2-2C19.2 11 17.2 10 15 10zm0 3.5c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5c.8 0 1.5-.2 2.1-.6l-5.3-5.3c-.4.6-.6 1.3-.6 2 0 1.9 1.6 3.5 3.5 3.5.5 0 1-.1 1.4-.3L12.1 14.7c-.4.2-.7.5-.7.9s.3.7.7.7c.2 0 .4-.1.6-.2l4.8 4.8c-.6.9-1.6 1.4-2.7 1.4-1.9 0-3.5-1.6-3.5-3.5 0-.8.3-1.5.8-2.1l-1-.9c-.6.8-1 1.9-1 3 0 2.5 2 4.5 4.5 4.5s4.5-2 4.5-4.5c0-1.2-.5-2.3-1.2-3.1L24 23.3c.6-1.1 1-2.5 1-4s-.4-2.9-1.1-4c-1.8-2.8-5-4.8-8.9-4.8z" />
        <path d="M38.5 12h-7.5v21h4v-8.5h3.5c4.5 0 7.5-2.5 7.5-6.5S43 12 38.5 12zm0 8.5h-3.5v-5h3.5c2.3 0 3.5 1 3.5 2.5s-1.2 2.5-3.5 2.5zM56.3 22.8c1-1.3 1.7-2.6 1.7-4.3 0-3.8-3-6.5-7.5-6.5H44v21h3.8v-8.5h2.4l4.1 8.5h4.2l-4.7-9.2c1-.6 1.9-1.5 2.5-2.5zm-5.8-3.3h-2.7v-4.5h2.7c2 0 3 1 3 2.2s-1 2.3-3 2.3z" />
        <text x="58" y="32" className="font-serif font-bold text-2xl italic" fill="#003ca5">&amp;</text>
        <text x="76" y="32" className="font-serif font-extrabold text-3xl" fill="#003ca5">G</text>
      </svg>
    </div>
  ),
  JPMorgan: () => (
    <div className="flex items-center gap-2 shrink-0">
      <div className="flex flex-col text-[#0F2027] font-sans tracking-tight text-sm md:text-base font-semibold text-left">
        <span>JPMorgan Chase</span>
      </div>
      <svg viewBox="0 0 24 24" className="h-8 md:h-10 w-auto fill-[#117ACA]" aria-label="JPMorgan Chase Octagon">
        <polygon points="12,0 20.5,3.5 20.5,12 12,12" />
        <polygon points="24,12 20.5,20.5 12,20.5 12,12" />
        <polygon points="12,24 3.5,20.5 3.5,12 12,12" />
        <polygon points="0,12 3.5,3.5 12,3.5 12,12" />
      </svg>
    </div>
  ),
  Salesforce: () => (
    <svg viewBox="0 0 45 31" className="h-10 md:h-14 w-auto fill-[#00A1E0]" aria-label="Salesforce">
      <path d="M38.2 12.9C36.8 6.5 31.1 1.7 24.3 1.7c-4.9 0-9.2 2.5-11.8 6.4-1.2-.7-2.6-1-4.1-1C3.8 7.1 0 10.9 0 15.6s3.8 8.5 8.4 8.5h29.8c3.8 0 6.8-3.1 6.8-6.8-.1-3.6-3-6.4-6.8-6.4z" />
      <path d="M14.6 18.6c.2.4.5.7 1 .7.4 0 .7-.2.9-.5.2-.3.3-.7.3-1.1v-3.2c0-.5-.1-.8-.3-1.1-.2-.3-.5-.5-.9-.5-.4 0-.7.2-.9.5s-.3.7-.3 1.1v3.2c0 .4.1.8.3 1.1zm.5-4.4c.1-.2.2-.2.4-.2.1 0 .2.1.2.2v3.1c0 .2-.1.2-.2.2-.2 0-.3-.1-.4-.2v-3.1zm4.6.6c0-.5-.1-.8-.3-1.1-.2-.3-.5-.5-.9-.5-.4 0-.7.2-.9.5s-.3.7-.3 1.1v4.7h1.1v-4.3c0-.2.1-.2.2-.2.2 0 .3.1.4.2v4.3h1.1l-.3-4.7zm4.3 3.8c.2.2.4.3.7.3.3 0 .5-.1.6-.2.1-.1.2-.3.2-.5 0-.2-.1-.4-.3-.5s-.5-.3-.9-.4c-.5-.1-.9-.3-1.1-.6-.2-.3-.3-.6-.3-1 0-.4.1-.7.4-.9.3-.3.7-.4 1.2-.4s.9.1 1.2.4l-.5.7c-.2-.1-.5-.2-.7-.2-.2 0-.4.1-.5.2-.1.1-.1.2-.1.3 0 .1.1.2.2.3.1.1.4.2.7.3.5.1.9.3 1.2.5.3.3.4.6.4 1 0 .5-.2.8-.5 1.1-.3.3-.8.4-1.4.4-.4 0-.9-.1-1.3-.4l.5-.8zm5.5-1.9c-.2-.3-.5-.5-1-.5-.4 0-.7.2-.9.5s-.3.7-.3 1.1v.2h2.5v-.2c0-.4-.1-.8-.3-1.1zm-1.3-.2c.2 0 .3.1.4.2v.9h-1.1V16c0-.1.1-.2.1-.3.2 0 .4-.2.6-.2z" fill="#FFF" />
    </svg>
  ),
  HSBC: () => (
    <div className="flex items-center gap-2 shrink-0">
      <span className="font-bold text-[#000000] text-xl md:text-2xl font-sans tracking-[0.1em]">HSBC</span>
      <svg viewBox="0 0 30 30" className="h-7 md:h-8 w-auto fill-[#DB0011]" aria-label="HSBC Hexagon">
        <polygon points="15,4 20,15 10,15" />
        <polygon points="15,26 20,15 10,15" />
        <polygon points="4,15 10,15 10,10" fill="#000" />
        <polygon points="4,15 10,15 10,20" />
        <polygon points="26,15 20,15 20,10" />
        <polygon points="26,15 20,15 20,20" fill="#000" />
      </svg>
    </div>
  ),
  Citibank: () => (
    <div className="flex flex-col items-center justify-center relative pt-1 shrink-0">
      {/* Citibank Arc */}
      <svg viewBox="0 0 40 16" className="h-6 md:h-7 w-auto fill-none absolute top-[-5px] md:top-[-6px]" aria-label="Citi Red Arc">
        <path d="M2 14C10 4 30 4 38 14" stroke="#ED1C24" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <div className="flex items-baseline text-[#003B70] font-sans font-semibold text-xl md:text-2xl tracking-tight">
        <span>citi</span>
        <span className="text-xs font-normal align-super">bank</span>
      </div>
    </div>
  )
};

export default function Brandlogo() {
  return (
    <div className="w-full bg-white flex flex-col items-center justify-center pt-12 pb-6 px-4 font-sans antialiased overflow-hidden">
      
      {/* Precision infinite loop configuration with custom 28s scroll tuning */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 28s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}} />

      <div className="w-full max-w-7xl py-2 text-center">
        
        {/* Banner Section Header */}
        <h2 className="text-2xl md:text-3xl font-semibold text-[#0f2137] tracking-wide mb-8 flex flex-wrap items-center justify-center gap-1">
          <span>BIA</span>
          <sup className="text-[10px] md:text-xs font-semibold relative -top-2 text-[#0f2137]">®</sup>
          <span className="text-[#0f2137] ml-0.5">Alumni Working with Top Global Companies</span>
        </h2>

        {/* Outer Marquee Slider Window */}
        <div className="relative w-full py-6">
          
          {/* Subtle edge masks for clean slide transitions */}
        
          
          
          {/* Animated Slider Track - Inner item gaps compressed tightly to layout cleanly with the new macro logo heights */}
          <div className="marquee-track flex items-center gap-6 md:gap-8 lg:gap-10">
            
            {/* Core Set 1 */}
            <div className="flex items-center gap-6 md:gap-8 lg:gap-10 shrink-0">
              <div className="transition-transform duration-200 hover:scale-105 cursor-pointer flex items-center justify-center"><BrandLogos.Oracle /></div>
              <div className="transition-transform duration-200 hover:scale-105 cursor-pointer flex items-center justify-center"><BrandLogos.Microsoft /></div>
              <div className="transition-transform duration-200 hover:scale-105 cursor-pointer flex items-center justify-center"><BrandLogos.Amex /></div>
              <div className="transition-transform duration-200 hover:scale-105 cursor-pointer flex items-center justify-center"><BrandLogos.Netflix /></div>
              <div className="transition-transform duration-200 hover:scale-105 cursor-pointer flex items-center justify-center"><BrandLogos.PG /></div>
              <div className="transition-transform duration-200 hover:scale-105 cursor-pointer flex items-center justify-center"><BrandLogos.JPMorgan /></div>
              <div className="transition-transform duration-200 hover:scale-105 cursor-pointer flex items-center justify-center"><BrandLogos.Salesforce /></div>
              <div className="transition-transform duration-200 hover:scale-105 cursor-pointer flex items-center justify-center"><BrandLogos.HSBC /></div>
              <div className="transition-transform duration-200 hover:scale-105 cursor-pointer flex items-center justify-center"><BrandLogos.Citibank /></div>
            </div>

            {/* Seamless Mirror Set 2 */}
            <div className="flex items-center gap-6 md:gap-8 lg:gap-10 shrink-0" aria-hidden="true">
              <div className="transition-transform duration-200 hover:scale-105 cursor-pointer flex items-center justify-center"><BrandLogos.Oracle /></div>
              <div className="transition-transform duration-200 hover:scale-105 cursor-pointer flex items-center justify-center"><BrandLogos.Microsoft /></div>
              <div className="transition-transform duration-200 hover:scale-105 cursor-pointer flex items-center justify-center"><BrandLogos.Amex /></div>
              <div className="transition-transform duration-200 hover:scale-105 cursor-pointer flex items-center justify-center"><BrandLogos.Netflix /></div>
              <div className="transition-transform duration-200 hover:scale-105 cursor-pointer flex items-center justify-center"><BrandLogos.PG /></div>
              <div className="transition-transform duration-200 hover:scale-105 cursor-pointer flex items-center justify-center"><BrandLogos.JPMorgan /></div>
              <div className="transition-transform duration-200 hover:scale-105 cursor-pointer flex items-center justify-center"><BrandLogos.Salesforce /></div>
              <div className="transition-transform duration-200 hover:scale-105 cursor-pointer flex items-center justify-center"><BrandLogos.HSBC /></div>
              <div className="transition-transform duration-200 hover:scale-105 cursor-pointer flex items-center justify-center"><BrandLogos.Citibank /></div>
            </div>

          </div>
        </div>

      </div>

      <CardBlue />

    </div>
  );
}