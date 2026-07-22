



/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface VirtualAdvisorProps {
  onSelectCourse?: (courseId: string) => void;
  onOpenApplyModal?: (course?: any) => void;
}

interface VideoTestimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  course: string;
  videoCode: string;
  title: string;
  thumbnail: string;
}

const ALUMNI_VIDEOS: VideoTestimonial[] = [
  {
    id: 'v1',
    name: 'Savita M.',
    role: 'Alumni',
    company: 'Goldman Sachs',
    course: 'Investment Banking & Financial Analytics',
    videoCode: '5mZ8-X7p4x4',
    title: "Savita's Testimonial",
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 'v2',
    name: 'Hannah L.',
    role: 'Alumni',
    company: 'BIA Lead Labs',
    course: 'Data Science & Artificial Intelligence',
    videoCode: 'KDGisTEqR9M',
    title: "Hannah's Success Story",
    thumbnail: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 'v3',
    name: 'Ketan & Cohort',
    role: 'Alumni',
    company: 'Deloitte Tech',
    course: 'Cloud Computing & DevOps',
    videoCode: '3hLmDS176UE',
    title: "Ketan's Success Story",
    thumbnail: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 'v4',
    name: 'Anjali Sharma',
    role: 'Alumni',
    company: 'JPMorgan Chase',
    course: 'Risk Management & Quantitative Finance',
    videoCode: 'dQw4w9WgXcQ',
    title: "Anjali's Success",
    thumbnail: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80"
  }
];

export default function VirtualAdvisor({ onSelectCourse, onOpenApplyModal }: VirtualAdvisorProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const maxSlides = ALUMNI_VIDEOS.length - 2;

  useEffect(() => {
    if (hoveredIdx !== null) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % ALUMNI_VIDEOS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [hoveredIdx]);

  const currentSlide = Math.min(Math.max(0, activeIdx), maxSlides);
  const activeVideo = ALUMNI_VIDEOS[activeIdx];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + ALUMNI_VIDEOS.length) % ALUMNI_VIDEOS.length);
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % ALUMNI_VIDEOS.length);
  };

  let originStr = '';
  try {
    originStr = window.location.origin;
    if (!originStr || originStr === 'null' || !originStr.startsWith('http')) {
      originStr = '';
    }
  } catch (e) {
    // Cross-origin fallback
  }
  const originParam = originStr ? `&origin=${encodeURIComponent(originStr)}` : '';

  return (
    <section className="bg-[#f8fafc] py-14 border-y border-slate-200 scroll-mt-20 select-none text-left" id="advisor-portal">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
<div className="text-center mb-8 space-y-2">

  <p className="text-[#ff9f1c] text-sm sm:text-base font-normal uppercase tracking-[0.2em]">
    Real Experiences, Real Achievements
  </p>

  <h2 className="text-xl sm:text-2xl lg:text-3xl font-normal text-black">
    Join the Millions of Students who have Achieved Remarkable Success
  </h2>

</div>

        {/* Outer wrapper wrapper to contain absolute external buttons */}
        <div className="relative px-4 sm:px-8 md:px-19">
          
          {/* THE SINGLE UNIFIED MASTER THEATER DECK CARD */}
          <div className="w-full bg-black rounded-2xl border border-slate-800 overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.3)] grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] h-auto lg:h-[520px]">
            
            {/* LEFT SIDE: Big Main Hero Video Player */}
            <div className="relative bg-black h-[300px] sm:h-[400px] md:h-[460px] lg:h-full w-full">
              <iframe
                key={activeVideo.videoCode}
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${activeVideo.videoCode}?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1${originParam}`}
                title={activeVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full object-cover"
              />
            </div>

            {/* RIGHT SIDE: Pure Video List Column Stack */}
            <div className="w-full bg-black border-t lg:border-t-0 lg:border-l border-slate-900 h-[400px] lg:h-full overflow-hidden relative flex flex-col">
              <div 
                className="flex flex-col transition-transform duration-500 ease-in-out absolute inset-0"
                style={{ 
                  transform: `translateY(-${currentSlide * 50}%)` 
                }}
              >
                {ALUMNI_VIDEOS.map((video, idx) => {
                  const isActive = idx === activeIdx;
                  const isHovered = idx === hoveredIdx;

                  return (
                    <div
                      key={video.id}
                      onClick={() => setActiveIdx(idx)}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      className={`h-1/2 shrink-0 w-full relative cursor-pointer border-b border-black last:border-b-0 transition-all duration-300 ${
                        isActive ? 'ring-2 ring-inset ring-[#11becf] z-20 opacity-100' : 'opacity-70 hover:opacity-95'
                      }`}
                    >
                      {isHovered ? (
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${video.videoCode}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1&showinfo=0${originParam}`}
                          title={video.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          className="w-full h-full object-cover pointer-events-none"
                        />
                      ) : (
                        <img
                          src={video.thumbnail}
                          alt={video.name}
                          className="w-full h-full object-cover"
                        />
                      )}

                      {/* Video Player Overlay UI */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 flex flex-col justify-between p-4 pointer-events-none">
                        <div className="flex items-center space-x-2 drop-shadow-md">
                          <div className="w-7 h-7 rounded-full bg-[#11becf] flex items-center justify-center text-[10px] font-black text-white">
                            BIA
                          </div>
                          <p className="text-white font-semibold text-xs sm:text-sm tracking-wide truncate max-w-[220px]">
                            Success Story: {video.name} ({video.company})
                          </p>
                        </div>

                        {!isHovered && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center border bg-black/30 backdrop-blur-xs transition-all ${
                              isActive ? 'border-[#11becf] scale-105 text-[#11becf]' : 'border-white/40 text-white'
                            }`}>
                              <svg className="w-5 h-5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        )}

                        <div className="self-start bg-white px-2.5 py-1 rounded shadow-md border-l-2 border-[#11becf] mb-1">
                          <p className="text-[#11becf] text-[10px] font-black leading-none uppercase">
                            {video.name}
                          </p>
                          <p className="text-slate-500 text-[8px] font-bold mt-0.5 leading-none">
                            Alumni, Boston Institute of Analytics
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ========================================================== */}
          {/* EXTERNAL CONTROLS: Floating Left and Right Arrow Buttons */}
          {/* ========================================================== */}
          
          {/* LAST LEFT SIDE ARROW */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-40 bg-[#11becf] hover:bg-[#0ea5b6] text-white p-3 rounded-full shadow-lg transition-all active:scale-90 hover:scale-105 focus:outline-none"
            aria-label="Previous Video"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* LAST RIGHT SIDE ARROW */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-40 bg-[#11becf] hover:bg-[#0ea5b6] text-white p-3 rounded-full shadow-lg transition-all active:scale-90 hover:scale-105 focus:outline-none"
            aria-label="Next Video"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

        </div>

      </div>
    </section>
  );
}