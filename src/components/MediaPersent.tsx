
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Interfaces
interface MediaItem {
  id: number;
  text: string;
  publisher: string;
  logo: React.ReactNode;
}

export default function MediaPesent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [isPaused, setIsPaused] = useState(false); // Controls auto-play pausing on hover/interaction

  // Track window resizing for responsive slide math
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine how many slides are visible at once based on tailwind-like breakpoints
  const getVisibleSlidesCount = () => {
    if (windowWidth >= 1024) return 3; // lg
    if (windowWidth >= 768) return 2;  // md
    return 1;                          // sm / mobile
  };

  const visibleSlides = getVisibleSlidesCount();

  // Media data including the exact texts and stylized SVG logos from the uploaded image
  const mediaItems: MediaItem[] = [
    {
      id: 1,
      text: "Data Science course curriculum at Boston Institute of Analytics ranked as the most industry-relevant by IAF.",
      publisher: "ThePrint",
      logo: (
        <svg viewBox="0 0 300 65" className="h-10 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text 
            x="50%" 
            y="50" 
            textAnchor="middle" 
            fontFamily="Georgia, serif" 
            fontWeight="900" 
            fontSize="44" 
            fill="#E24623" 
            letterSpacing="-1"
          >
            ThePrint
          </text>
        </svg>
      )
    },
    {
      id: 2,
      text: "Boston Institute of Analytics launches its 25th training campus in India, plans for 100 campuses in 2023.",
      publisher: "Business Standard",
      logo: (
        <svg viewBox="0 0 320 65" className="h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text 
            x="50%" 
            y="48" 
            textAnchor="middle" 
            fontFamily="Georgia, serif" 
            fontWeight="bold" 
            fontSize="30" 
            fill="#A31D1D"
          >
            Business Standard
          </text>
        </svg>
      )
    },
    {
      id: 3,
      text: "Boston Institute of Analytics expands footprint to Middle East, Dubai campus to launch by August, 2023.",
      publisher: "Hindustan Times",
      logo: (
        <div className="flex items-center justify-center space-x-2">
          {/* HT Crest/Icon */}
          <svg viewBox="0 0 40 40" className="h-9 w-9 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" fill="#00A2C9" />
            <path d="M12 11h4v7h8v-7h4v18h-4v-7h-8v7h-4V11z" fill="white" />
          </svg>
          {/* HT Typo */}
          <span className="font-serif font-black text-2xl tracking-tighter text-[#1F2937]" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
            Hindustan Times
          </span>
        </div>
      )
    },
    {
      id: 4,
      text: "BIA partners with international technology giants to deliver advanced hands-on dual-certification programs in deep learning.",
      publisher: "The Economic Times",
      logo: (
        <svg viewBox="0 0 320 65" className="h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text 
            x="50%" 
            y="46" 
            textAnchor="middle" 
            fontFamily="Georgia, serif" 
            fontWeight="900" 
            fontSize="26" 
            fill="#111827" 
            letterSpacing="-0.5"
          >
            The Economic Times
          </text>
        </svg>
      )
    },
    {
      id: 5,
      text: "With world-class instructors and an elite curriculum, Boston Institute of Analytics sets a high benchmark for technology training globally.",
      publisher: "Financial Express",
      logo: (
        <svg viewBox="0 0 320 65" className="h-8 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text 
            x="50%" 
            y="46" 
            textAnchor="middle" 
            fontFamily="Impact, sans-serif" 
            fontSize="32" 
            fill="#1E3A8A" 
            letterSpacing="1"
          >
            FINANCIAL EXPRESS
          </text>
        </svg>
      )
    }
  ];

  const maxIndex = Math.max(0, mediaItems.length - visibleSlides);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  // --- Auto Slide Feature ---
  useEffect(() => {
    // If the user is actively hovering or interacting, pause the sliding
    if (isPaused) return;

    // Slide to the next index every 3.5 seconds
    const interval = setInterval(() => {
      nextSlide();
    }, 3500);

    // Clean up the interval when the component re-renders, unmounts, or paused state changes
    return () => clearInterval(interval);
  }, [isPaused, maxIndex]);

  // Touch handlers for responsive swiping on mobile devices
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true); // Pause auto slide during swipe interactions
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    setIsPaused(false); // Resume auto slide after swipe complete
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div className="w-full min-h-[40vh] bg-[#F4F5F6] flex flex-col justify-center pt-4 pb-15 px-4 md:px-8 select-none">
      <div className="max-w-[1800px] mx-auto w-full">
        {/* Component Title */}
        <div className="mb-10 px-4">
          <h2 className="text-3xl md:text-4xl leading-none m-0 font-normal text-[#0F2942] tracking-wide font-sans">
            Our Media Presence
          </h2>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative flex items-center justify-center px-12"
          onMouseEnter={() => setIsPaused(true)}  // Pause sliding when cursor hovers
          onMouseLeave={() => setIsPaused(false)} // Resume sliding when cursor leaves
        >
          
          {/* Left Arrow Button */}
          <button
            onClick={prevSlide}
            className="absolute left-0 z-10 p-2 md:p-3 rounded-full hover:bg-gray-200/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-black font-extrabold cursor-pointer"
            style={{ transform: 'translateX(-10%)' }}
            aria-label="Previous slide"
          >
            <ChevronLeft size={44} strokeWidth={3.5} className="text-gray-900" />
          </button>

          {/* Slider Window */}
          <div 
            className="w-full overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)`
              }}
            >
              {mediaItems.map((item) => (
                <div 
                  key={item.id} 
                 className="flex-shrink-0 px-2 py-2"
                  style={{ width: `${100 / visibleSlides}%` }}
                >
            <div className="bg-white rounded-[1rem] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-2 md:p-3 h-[220px] md:h-[240px] flex flex-col justify-between items-center text-center border border-gray-100/80">                   {/* Top Content Quote */}
<div className="w-full">
  <p className="text-sm md:text-base leading-normal font-normal text-gray-600 text-center">
    {item.text}
  </p>
</div>
                    
                    {/* Bottom Logo Frame */}
                    <div className="w-full flex items-center justify-center mt-3 h-12">
                      {item.logo}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={nextSlide}
            className="absolute right-0 z-10 p-2 md:p-3 rounded-full hover:bg-gray-200/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-black font-extrabold cursor-pointer"
            style={{ transform: 'translateX(10%)' }}
            aria-label="Next slide"
          >
            <ChevronRight size={44} strokeWidth={3.5} className="text-gray-900" />
          </button>
        </div>

      </div>
    </div>
  );
}