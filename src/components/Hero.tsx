/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, Award, MessageSquareCode, ArrowRight, Sparkles, Building, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { SCHOOLS, COURSES } from '../data';
import { InquiryForm } from '../types';
import classroomExpertsImg from '../assets/images/classroom_experts_1780388133908.png';
import curriculumDeliveryImg from '../assets/images/curriculum_delivery_1780388152317.png';

interface HeroProps {
  onInquirySubmit: (data: InquiryForm) => void;
  selectedSchoolId: string | null;
  onSelectSchool: (schoolId: string | null) => void;
}

export default function Hero({ onInquirySubmit, selectedSchoolId, onSelectSchool }: HeroProps) {
  const [formData, setFormData] = useState<InquiryForm>({
    fullName: '',
    email: '',
    phone: '',
    selectedSchool: selectedSchoolId || 'tech-ai',
    selectedCourse: '',
    mode: 'Classroom',
    experienceLevel: 'Fresh Graduate',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto run (autoplay) the slides every 5 seconds.
  // The timer automatically resets if the user manually clicks "Next", "Prev", or dot indicator.
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 2 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
  };

  // Filter courses based on selected school in mock form
  const availableCourses = COURSES.filter(c => c.schoolId === formData.selectedSchool);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      // Reset course when school changes
      if (name === 'selectedSchool') {
        const matchingCourses = COURSES.filter(c => c.schoolId === value);
        updated.selectedCourse = matchingCourses.length > 0 ? matchingCourses[0].id : '';
      }
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('Please fill out all required contact fields.');
      return;
    }
    onInquirySubmit(formData);
    setIsSubmitted(true);
    // Reset form after a timeout to allow new submissions
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        selectedSchool: 'tech-ai',
        selectedCourse: '',
        mode: 'Classroom',
        experienceLevel: 'Fresh Graduate',
        message: ''
      });
    }, 8000);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-slate-105 to-slate-150/40 py-12 lg:py-20 select-none scroll-mt-20" id="advantage">
      {/* Decorative Blobs */}
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-20 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        
        {/* Slide 0: Immersive Classroom Training as seen in the screenshot */}
        <div className={`transition-all duration-500 ease-out ${currentSlide === 0 ? 'opacity-100 translate-x-0 scale-100 relative block' : 'opacity-0 translate-x-12 scale-95 absolute hidden pointer-events-none'}`}>
          <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8 min-h-[420px]">
            {/* Column 1: Left brand text matching screenshot */}
            <div className="space-y-6 md:col-span-6 lg:col-span-6 pr-0 md:pr-4 lg:pr-8 flex flex-col justify-center items-start text-left">
              <h1 className="font-sans text-3xl font-extrabold tracking-tight text-[#0a1d4a] sm:text-4.5xl lg:text-[42px] lg:leading-[1.2]">
                Immersive Classroom Training By Industry Experts.
              </h1>
              
              <p className="max-w-[550px] text-base font-normal leading-relaxed text-slate-500 sm:text-lg">
                Hands-on, expert-led classroom training with real world projects and case studies.
              </p>

<div className="pt-4">
  <button
    onClick={() => {
      const el = document.getElementById('bia-advantage'); // Changed to unique ID
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // Safe fallback: if the section isn't rendered, scroll down 1 full screen
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      }
    }}
    className="rounded-lg bg-[#00005d] py-3.5 px-7 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-opacity-95 transition-all inline-flex items-center gap-2 cursor-pointer"
    id="know-bia-advantage-hero-btn"
  >
    Know the BIA Advantage <span className="text-sm font-sans">→</span>
  </button>
</div>
            </div>

            {/* Column 2: Exact Classroom setting Image from Screenshot */}
            <div className="md:col-span-6 lg:col-span-6 flex justify-center lg:justify-end">
              <div className="w-full max-w-[540px] overflow-hidden rounded-2xl shadow-xl border border-slate-100/65">
                <img 
                  src={classroomExpertsImg} 
                  alt="Immersive Classroom Training By Industry Experts"
                  className="w-full h-auto max-h-[350px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Slide 1: Industry's Best Curriculum, Expertly Delivered matching second screenshot */}
        <div className={`transition-all duration-500 ease-out ${currentSlide === 1 ? 'opacity-100 translate-x-0 scale-100 relative block' : 'opacity-0 translate-x-12 scale-95 absolute hidden pointer-events-none'}`}>
          <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8 min-h-[420px]">
            {/* Column 1: Left brand text matching screenshot */}
            <div className="space-y-6 md:col-span-6 lg:col-span-6 pr-0 md:pr-4 lg:pr-8 flex flex-col justify-center items-start text-left">
              <h1 className="font-sans text-3xl font-extrabold tracking-tight text-[#0a1d4a] sm:text-4.5xl lg:text-[42px] lg:leading-[1.2]">
                Industry’s Best Curriculum, Expertly Delivered.
              </h1>
              
              <p className="max-w-[550px] text-base font-normal leading-relaxed text-slate-500 sm:text-lg">
                Learn the most in-demand skills with industry’s best ranked curriculum delivered by top experts.
              </p>

              <div className="pt-4">
                <button
                  onClick={() => {
                    const el = document.getElementById('courses');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="rounded-lg bg-[#00005d] py-3.5 px-7 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-opacity-95 transition-all inline-flex items-center gap-2 cursor-pointer"
                  id="explore-courses-hero-btn"
                >
                  Explore Courses <span className="text-sm font-sans">→</span>
                </button>
              </div>
            </div>

            {/* Column 2: Exact Classroom setting Image with statistic diagram from screenshot */}
            <div className="md:col-span-6 lg:col-span-6 flex justify-center lg:justify-end">
              <div className="w-full max-w-[540px] overflow-hidden rounded-2xl shadow-xl border border-slate-100/65">
                <img 
                  src={curriculumDeliveryImg} 
                  alt="Industry's Best Curriculum, Expertly Delivered"
                  className="w-full h-auto max-h-[350px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Slide 2: Original Front Page (Authentic Replica state) */}
        <div className={`transition-all duration-500 ease-out ${currentSlide === 2 ? 'opacity-100 translate-x-0 scale-100 relative block' : 'opacity-0 translate-x-12 scale-95 absolute hidden pointer-events-none'}`}>
          <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8 min-h-[420px]">
            {/* Column 1: Left brand subtitle and scroll trigger */}
            <div className="space-y-6 md:col-span-6 lg:col-span-6 pr-0 md:pr-4 lg:pr-8 flex flex-col justify-center items-start text-left">
              <h1 className="font-sans text-3xl font-extrabold tracking-tight text-[#0a1d4a] sm:text-4.5xl lg:text-[42px] lg:leading-[1.2]">
                Global Leader in Professional Training <br />
                <span className="text-[#0a1d4a]">Courses.</span>
              </h1>
              
              <p className="max-w-[550px] text-base font-normal leading-relaxed text-slate-500 sm:text-lg">
                Get immersive technology training courses; classroom & online experience at 107+ campuses across 7+ countries.
              </p>
              
              {/* <div className="pt-4">
                <button
                  onClick={() => {
                    const el = document.getElementById('/campuses');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="rounded-lg bg-[#00005d] py-3.5 px-7 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-opacity-95 transition-all inline-flex items-center gap-2 cursor-pointer"
                  id="locate-campus-hero-btn"
                >
                  Locate Your Nearest BIA® Campus <span className="text-sm font-sans">→</span>
                </button>
              </div> */}

              <div className="pt-4">
  <Link
    to="/campuses"
    className="rounded-lg bg-[#00005d] py-3.5 px-7 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-opacity-95 transition-all inline-flex items-center gap-2 cursor-pointer decorative-none"
    id="locate-campus-hero-btn"
  >
    Locate Your Nearest BIA® Campus <span className="text-sm font-sans">→</span>
  </Link>
</div>
            </div>

            {/* Column 2: Exact replica of the Award visual card on the right */}
            <div className="md:col-span-6 lg:col-span-6 flex justify-center lg:justify-end">
              <div className="w-full max-w-[530px] rounded-2xl bg-white p-6 sm:p-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 border border-slate-200/80 shadow-xl relative overflow-hidden group min-h-[290px]" id="accolades-card">
                {/* Shiny Ambient Yellow golden rays */}
                <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
                
                {/* Left of Card: High-precision SVG golden trophy pedestal */}
                <div className="flex flex-col items-center justify-center shrink-0">
                  <svg width="150" height="170" viewBox="0 0 180 200" fill="none" className="drop-shadow-[0_10px_25px_rgba(245,158,11,0.22)]">
                    <defs>
                      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFF9E0" />
                        <stop offset="35%" stopColor="#FAD375" />
                        <stop offset="70%" stopColor="#CA9228" />
                        <stop offset="100%" stopColor="#AD7719" />
                      </linearGradient>
                      <linearGradient id="goldGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FFFBEB" />
                        <stop offset="50%" stopColor="#F59E0B" />
                        <stop offset="100%" stopColor="#78350F" />
                      </linearGradient>
                      <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    {/* Backglow element */}
                    <circle cx="90" cy="80" r="70" fill="url(#goldGlow)" />

                    {/* Stars arranged in crescent arch */}
                    <path d="M25 90 L28 95 L34 95 L29 99 L31 105 L25 101 L19 105 L21 99 L16 95 L22 95 Z" fill="url(#goldGrad)" />
                    <path d="M32 63 L35 68 L41 68 L36 72 L38 78 L32 74 L26 78 L28 72 L23 68 L29 68 Z" fill="url(#goldGrad)" />
                    <path d="M47 38 L50 43 L56 43 L51 47 L53 53 L47 49 L41 53 L43 47 L38 43 L44 43 Z" fill="url(#goldGrad)" />
                    <path d="M72 23 L75 28 L81 28 L76 32 L78 38 L72 34 L66 38 L68 32 L63 28 L69 28 Z" fill="url(#goldGrad)" />
                    <path d="M108 23 L111 28 L117 28 L112 32 L114 38 L108 34 L102 38 L104 32 L99 28 L105 28 Z" fill="url(#goldGrad)" />
                    <path d="M133 38 L136 43 L142 43 L137 47 L139 53 L133 49 L127 53 L129 47 L124 43 L130 43 Z" fill="url(#goldGrad)" />
                    <path d="M148 63 L151 68 L157 68 L152 72 L154 78 L148 74 L142 78 L144 72 L139 68 L145 68 Z" fill="url(#goldGrad)" />
                    <path d="M155 90 L158 95 L164 95 L159 99 L161 105 L155 101 L149 105 L151 99 L146 95 L152 95 Z" fill="url(#goldGrad)" />

                    {/* Bold central serif #1 */}
                    <text x="90" y="108" fontFamily="'Didot', 'Playfair Display', 'Space Grotesk', serif" fontSize="66" fontWeight="950" fill="url(#goldGrad)" textAnchor="middle" letterSpacing="-2">#1</text>

                    {/* Plates representing base pedestal */}
                    <ellipse cx="90" cy="150" rx="60" ry="12" fill="url(#goldGrad2)" stroke="#CA9228" strokeWidth="1" />
                    <path d="M30 150 C 30 158, 150 158, 150 150 L150 157 C 150 165, 30 165, 30 157 Z" fill="url(#goldGrad2)" stroke="#AD7719" strokeWidth="1" />
                    <ellipse cx="90" cy="140" rx="42" ry="8" fill="url(#goldGrad)" stroke="#AD7719" strokeWidth="1" />
                  </svg>
                </div>

                {/* Right of Card: Accolades descriptions aligned */}
                <div className="flex-1 text-center sm:text-left space-y-3">
                  <h2 className="text-[#0a1d4a] font-extrabold text-[19px] sm:text-[21px] tracking-tight leading-snug">
                    #1 INTERNATIONAL <br />
                    <span className="text-amber-600 font-semibold font-black">TRAINING INSTITUTE</span>
                  </h2>
                  <div className="h-[1px] w-12 bg-amber-500/40 mx-auto sm:ml-0" />
                  <p className="text-slate-500 font-bold text-[9.5px] sm:text-[10px] tracking-wider leading-relaxed uppercase">
                    RANKED BY BUSINESS WORLD, BRITISH COLUMBIA TIMES, BUSINESS STANDARD, AVALON GLOBAL RESEARCH, IFC AND SEVERAL RECOGNIZED FORUMS.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Arrow Controllers exactly matching the physical screen sliders */}
        <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 left-2 lg:left-[-35px] z-20">
          <button
            onClick={handlePrevSlide}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-200 shadow-md hover:bg-slate-50 transition-colors focus:outline-none"
            title="Previous Frame"
          >
            <ChevronLeft className="h-5 w-5 text-slate-700" />
          </button>
        </div>
        <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 right-2 lg:right-[-35px] z-20">
          <button
            onClick={handleNextSlide}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-200 shadow-md hover:bg-slate-50 transition-colors focus:outline-none"
            title="Next Frame"
          >
            <ChevronRight className="h-5 w-5 text-slate-700" />
          </button>
        </div>

        {/* Dynamic Pagination indicators */}
        <div className="flex justify-center items-center space-x-2.5 mt-8 pointer-events-auto">
          <button
            onClick={() => setCurrentSlide(0)}
            className={`h-2.5 rounded-full transition-all duration-300 ${currentSlide === 0 ? 'w-6 bg-[#00005d]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'} cursor-pointer`}
            title="Slide 1: Immersive Training"
          />
          <button
            onClick={() => setCurrentSlide(1)}
            className={`h-2.5 rounded-full transition-all duration-300 ${currentSlide === 1 ? 'w-6 bg-[#00005d]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'} cursor-pointer`}
            title="Slide 2: Curriculum Training"
          />
          <button
            onClick={() => setCurrentSlide(2)}
            className={`h-2.5 rounded-full transition-all duration-300 ${currentSlide === 2 ? 'w-6 bg-[#00005d]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'} cursor-pointer`}
            title="Slide 3: Global Courses Authority"
          />
        </div>

      </div>
    </section>
  );
}
