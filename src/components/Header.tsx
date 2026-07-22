
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { SCHOOLS, COURSES } from '../data';
import { EnquireModal } from './EnquireModal';


interface HeaderProps {
  onSearch: (query: string) => void;
  onSelectSchool: (schoolId: string | null) => void;
  onNavigate: (section: string) => void;
  selectedSchoolId: string | null;
  onOpenApplyModal: () => void;
  onOpenEnquireModal: () => void;
}

export default function Header({
  onSearch,
  onSelectSchool,
  onNavigate,
  selectedSchoolId,
  onOpenApplyModal,
  
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSchoolDropdownOpen, setIsSchoolDropdownOpen] = useState(false);
  const [isMobileCoursesOpen, setIsMobileCoursesOpen] = useState(false);
  const [expandedMobileSchool, setExpandedMobileSchool] = useState<string | null>(null);
  const [searchVal, setSearchVal] = useState('');
   const [isEnquireModalOpen, setIsEnquireModalOpen] = useState(false);
  

  
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSchoolDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMobileMenuOpen]);

  const handleSchoolClick = (schoolId: string | null) => {
    setIsSchoolDropdownOpen(false);
    setIsMobileMenuOpen(false);

    // CASE 1: Filtering by a Specific School Track
    if (schoolId !== null) {
      if (location.pathname === '/') {
        onSelectSchool(schoolId);
        const element = document.getElementById('courses');
        if (element) {
          const yOffset = -70; 
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      } else {
        navigate('/', { 
          state: { 
            forceScrollToCatalog: true, 
            targetSchoolId: schoolId 
          } 
        });
      }
    } 
    // CASE 2: Clicking the Main "Home" Actions (schoolId === null)
    else {
      onSelectSchool(null);
      onSearch('');
      setSearchVal('');

      if (location.pathname === '/') {
        // Already home -> Smoothly go to absolute top view block
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // On another page -> Navigate cleanly to home base
        navigate('/');
      }
    }
  };

  const handleCourseClick = (schoolId: string, courseKey: string) => {
    const targetCourse = COURSES.find(
      (c) => c.schoolId === schoolId && c.id.toLowerCase().includes(courseKey.toLowerCase())
    ) || COURSES.find((c) => c.schoolId === schoolId);

    setIsSchoolDropdownOpen(false);
    setIsMobileMenuOpen(false);

    if (targetCourse) {
      navigate(`/course/${targetCourse.id}`);
      setTimeout(() => {
        onSelectSchool(schoolId);
      }, 50);
    } else {
      navigate(`/?school=${schoolId}`);
    }

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 120);
  };

  const menuItems = [
    { label: 'Campuses', route: '/campuses' },
    { label: 'Advisory Council', route: '/advisory-council' },
    { label: 'Fees Payment', route: '/fees-payment' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-slate-200/80 bg-white" id="bia-header">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 sm:h-16 items-center justify-between">
            
            <div className="flex items-center space-x-4 sm:space-x-8">
              <div
                className="flex items-center gap-2 cursor-pointer select-none"
                onClick={() => handleSchoolClick(null)}
              >
                <span className="font-black text-xl sm:text-2xl tracking-tight text-[#182B5C]">
                  Tensor<span className="text-violet-600">Nova</span>
                </span>
                <div className="h-7 w-[1px] bg-slate-300" />
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase tracking-[0.25em] font-bold text-slate-500">
                    Experience The Future
                  </span>
                  <span className="text-[8px] uppercase tracking-[0.25em] font-bold text-violet-600">
                    Of Innovation
                  </span>
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-5 text-[12.5px] font-black text-slate-800">
                <button
                  onClick={() => handleSchoolClick(null)}
                  className="hover:text-blue-700 transition-colors cursor-pointer text-slate-900 font-extrabold"
                >
                  Home
                </button>

                <div ref={dropdownRef} className="relative">
                  <button
                    onClick={() => setIsSchoolDropdownOpen(!isSchoolDropdownOpen)}
                    className="flex items-center space-x-1 text-slate-850 hover:text-blue-700 transition-colors py-2 cursor-pointer"
                  >
                    <span className="font-extrabold">Courses</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isSchoolDropdownOpen ? 'rotate-180 text-blue-700' : ''}`} />
                  </button>

                  {isSchoolDropdownOpen && (
                    <div className="fixed left-0 right-0 top-14 sm:top-16 w-screen bg-white border-b border-slate-200/90 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="mx-auto max-w-7xl px-8 py-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-10">
                          
                          {/* Tech School Column */}
                          <div className="space-y-8">
                            <div>
                              <button 
                                onClick={() => handleSchoolClick('tech-ai')}
                                className="block text-left text-[11px] font-black text-[#0a1d4a] uppercase tracking-wider border-b border-slate-100 pb-2 mb-3.5 w-full hover:text-blue-700 transition-colors"
                              >
                                BOSTON SCHOOL OF TECHNOLOGY & AI
                              </button>
                              <ul className="space-y-2">
                                {[
                                  { name: 'Data Science And Artificial Intelligence', key: 'data-science' },
                                  { name: 'Generative AI And Agentic AI Development', key: 'generative' },
                                  { name: 'Cyber Security And Ethical Hacking', key: 'cyber' },
                                  { name: 'Cloud Computing And DevOps', key: 'cloud' },
                                  { name: 'Java And JavaScript Full Stack Development', key: 'java' },
                                  { name: 'Big Data, AWS And Hadoop', key: 'big-data' },
                                  { name: 'Full Stack Web Development', key: 'web-development' }
                                ].map((item, idx) => (
                                  <li key={idx}>
                                    <button
                                      onClick={() => handleCourseClick('tech-ai', item.key)}
                                      className="text-left text-[12px] font-medium text-slate-650 hover:text-blue-700 transition-all hover:translate-x-1 duration-150 block line-clamp-1 py-0.5 cursor-pointer"
                                    >
                                      {item.name}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <button 
                                onClick={() => handleSchoolClick('media-comm')}
                                className="block text-left text-[11px] font-black text-[#0a1d4a] uppercase tracking-wider border-b border-slate-100 pb-2 mb-3.5 w-full hover:text-blue-700 transition-colors"
                              >
                                BOSTON SCHOOL OF MEDIA & COMMUNICATIONS
                              </button>
                              <ul className="space-y-2">
                                {[
                                  { name: 'Advertising, PR & Corporate Communications', key: 'advertising' },
                                  { name: 'Journalism', key: 'journalism' },
                                  { name: 'Event Management', key: 'event' },
                                  { name: 'Photography', key: 'photography' },
                                  { name: 'English Communication and Public Speaking', key: 'english' },
                                  { name: 'Foreign Languages: French, Spanish, Japanese', key: 'languages' }
                                ].map((item, idx) => (
                                  <li key={idx}>
                                    <button
                                      onClick={() => handleCourseClick('media-comm', item.key)}
                                      className="text-left text-[12px] font-medium text-slate-650 hover:text-blue-700 transition-all hover:translate-x-1 duration-150 block line-clamp-1 py-0.5 cursor-pointer"
                                    >
                                      {item.name}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Management School Column */}
                          <div className="space-y-8">
                            <div>
                              <button 
                                onClick={() => handleSchoolClick('management')}
                                className="block text-left text-[11px] font-black text-[#0a1d4a] uppercase tracking-wider border-b border-slate-100 pb-2 mb-3.5 w-full hover:text-blue-700 transition-colors"
                              >
                                BOSTON SCHOOL OF MANAGEMENT
                              </button>
                              <ul className="space-y-2">
                                {[
                                  { name: 'Business Management And Analytics', key: 'management' },
                                  { name: 'Digital Marketing And Analytics', key: 'digital-marketing' },
                                  { name: 'Legal Analytics', key: 'legal' },
                                  { name: 'Marketing Analytics And AI', key: 'marketing' },
                                  { name: 'Sports Management And Analytics', key: 'sports' },
                                  { name: 'Product Management And Analytics', key: 'product' },
                                  { name: 'International Business And Economics', key: 'international' }
                                ].map((item, idx) => (
                                  <li key={idx}>
                                    <button
                                      onClick={() => handleCourseClick('management', item.key)}
                                      className="text-left text-[12px] font-medium text-slate-650 hover:text-blue-700 transition-all hover:translate-x-1 duration-150 block line-clamp-1 py-0.5 cursor-pointer"
                                    >
                                      {item.name}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <button 
                                onClick={() => handleSchoolClick('corporate')}
                                className="block text-left text-[11px] font-black text-[#0a1d4a] uppercase tracking-wider border-b border-slate-100 pb-2 mb-3.5 w-full hover:text-blue-700 transition-colors"
                              >
                                BOSTON SCHOOL OF CORPORATE TRAINING
                              </button>
                              <ul className="space-y-2">
                                {[
                                  { name: 'Data Science For Business Decision Making', key: 'data-science' },
                                  { name: 'Mastering Data Visualization', key: 'data-visualization' },
                                  { name: 'Generative AI For Enterprises', key: 'generative' },
                                  { name: 'Cyber Security And Ethical Hacking For Enterprises', key: 'cyber' },
                                  { name: 'Financial Modeling & Valuation Fundamentals', key: 'financial' },
                                  { name: 'Strategic Project Management', key: 'project' },
                                  { name: 'Customized Corporate Training', key: 'corporate' }
                                ].map((item, idx) => (
                                  <li key={idx}>
                                    <button
                                      onClick={() => handleCourseClick('corporate', item.key)}
                                      className="text-left text-[12px] font-medium text-slate-650 hover:text-blue-700 transition-all hover:translate-x-1 duration-150 block line-clamp-1 py-0.5 cursor-pointer"
                                    >
                                      {item.name}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Finance Column */}
                          <div>
                            <button 
                              onClick={() => handleSchoolClick('finance')}
                              className="block text-left text-[11px] font-black text-[#0a1d4a] uppercase tracking-wider border-b border-slate-100 pb-2 mb-3.5 w-full hover:text-blue-700 transition-colors"
                            >
                              BOSTON SCHOOL OF FINANCE
                            </button>
                            <ul className="space-y-2">
                              {[
                                { name: 'Investment Banking And Financial Analytics', key: 'investment' },
                                { name: 'Equity Research And Valuation Analytics', key: 'equity' },
                                { name: 'Financial Modeling And Business Analytics', key: 'modeling' },
                                { name: 'Chartered Financial Analyst (CFA)', key: 'cfa' },
                                { name: 'Financial Risk Manager (FRM)', key: 'frm' },
                                { name: 'Certified Public Accountant (US CPA)', key: 'cpa' },
                                { name: 'Certified Management Accountant (CMA)', key: 'cma' }
                              ].map((item, idx) => (
                                <li key={idx}>
                                  <button
                                    onClick={() => handleCourseClick('finance', item.key)}
                                    className="text-left text-[12px] font-medium text-slate-650 hover:text-blue-700 transition-all hover:translate-x-1 duration-150 block line-clamp-1 py-0.5 cursor-pointer"
                                  >
                                    {item.name}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Design Column */}
                          <div>
                            <button 
                              onClick={() => handleSchoolClick('animation-design')}
                              className="block text-left text-[11px] font-black text-[#0a1d4a] uppercase tracking-wider border-b border-slate-100 pb-2 mb-3.5 w-full hover:text-blue-700 transition-colors"
                            >
                              BOSTON SCHOOL OF ANIMATION & DESIGN
                            </button>
                            <ul className="space-y-2">
                              {[
                                { name: 'Integrated 2D, 3D Animation & VFX', key: 'animation' },
                                { name: 'Graphic Design, Video Editing and 2D Animation', key: 'design' },
                                { name: '3D Animation And VFX', key: 'vfx' },
                                { name: 'Game Design And Development', key: 'game' },
                                { name: 'VFX Film Making And Motion Graphics', key: 'motion' },
                                { name: '3D Architectural Visualization', key: 'architectural' },
                                { name: 'Fashion CAD And Analytics', key: 'fashion' }
                              ].map((item, idx) => (
                                <li key={idx}>
                                  <button
                                    onClick={() => handleCourseClick('animation-design', item.key)}
                                    className="text-left text-[12px] font-medium text-slate-650 hover:text-blue-700 transition-all hover:translate-x-1 duration-150 block line-clamp-1 py-0.5 cursor-pointer"
                                  >
                                    {item.name}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>

                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {menuItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigate(item.route)}
                    className="hover:text-blue-700 transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center space-x-3">
               <button
            onClick={() => setIsEnquireModalOpen(true)}
            className="rounded bg-[#ff9800] px-4 py-2 text-[11px] font-black text-white uppercase hover:bg-[#e68a00] transition-colors cursor-pointer"
          >
            ENQUIRE NOW
          </button>

              <div className="flex items-center space-x-1.5 sm:space-x-2.5 lg:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="rounded p-1.5 sm:p-2 text-slate-600 hover:bg-slate-100 transition-colors"
                  aria-label="Toggle main menu"
                >
                  {isMobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="fixed left-0 right-0 bottom-0 top-14 sm:top-16 bg-white border-t border-slate-200 px-5 py-5 shadow-2xl lg:hidden overflow-y-auto z-50 pb-24 md:pb-32 flex flex-col">
            <div className="space-y-6 text-slate-800 pb-10">
              <div>
                <p className="text-[11px] font-black uppercase tracking-widest text-[#0a1d4a] mb-4 pb-1 border-b border-slate-100">Navigation Menu</p>
                <div className="flex flex-col space-y-1">
                  
                  <button
                    onClick={() => handleSchoolClick(null)}
                    className="text-left py-2.5 px-2 text-sm font-extrabold text-slate-800 hover:text-blue-700 hover:bg-slate-50 rounded transition-colors block"
                  >
                    Home Screen
                  </button>

                  <div className="border-b border-slate-100 last:border-none">
                    <div className="flex items-center justify-between py-1 px-1 text-sm font-extrabold text-[#0a1d4a] hover:bg-slate-50 rounded transition-all">
                      <button
                        onClick={() => handleSchoolClick(null)}
                        className="flex-1 text-left py-1.5 px-1 flex items-center gap-2 font-extrabold text-[#0a1d4a] hover:text-blue-700 transition-colors cursor-pointer"
                      >
                        Courses
                      </button>
                      <button
                        onClick={() => setIsMobileCoursesOpen(!isMobileCoursesOpen)}
                        className="p-1.5 px-2.5 rounded bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-600 border border-slate-200/80 shadow-xs transition-all cursor-pointer"
                      >
                        <ChevronDown className={`h-4 w-4 transition-transform duration-250 ${isMobileCoursesOpen ? 'rotate-180 text-blue-600' : ''}`} />
                      </button>
                    </div>

                    {isMobileCoursesOpen && (
                      <div className="pl-3 pr-1 py-2 mt-1 space-y-3 bg-slate-50/50 border-l-2 border-blue-600/30 rounded-r-md">
                        <div className="border-b border-slate-200/40 pb-2">
                          <button
                            onClick={() => handleSchoolClick(null)}
                            className="w-full text-left text-xs font-black text-blue-600 hover:text-blue-800 py-1.5 flex items-center gap-1.5"
                          >
                            <span>🔍 VIEW FULL CATALOG</span>
                          </button>
                        </div>

                        {SCHOOLS.map((school) => {
                          const isExpanded = expandedMobileSchool === school.id;
                          const schoolCourses = COURSES.filter(c => c.schoolId === school.id);
                          
                          return (
                            <div key={school.id} className="border-b border-slate-200/40 last:border-none pb-2 pt-1">
                              <button
                                onClick={() => setExpandedMobileSchool(isExpanded ? null : school.id)}
                                className="w-full flex items-center justify-between text-left text-xs transition-colors font-bold py-2 text-slate-750 hover:text-blue-600"
                              >
                                <span className={selectedSchoolId === school.id ? 'text-blue-700 font-extrabold' : ''}>
                                  {school.name.toUpperCase()}
                                </span>
                                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-250 shrink-0 ml-2 ${isExpanded ? 'rotate-180 text-blue-600' : ''}`} />
                              </button>

                              {isExpanded && (
                                <div className="pl-3 mt-1.5 space-y-2.5 border-l-2 border-blue-500/25 py-1">
                                  <button
                                    onClick={() => handleSchoolClick(school.id)}
                                    className="w-full text-left text-[11px] font-extrabold text-blue-600 hover:text-blue-700 py-1 block"
                                  >
                                    ➔ View All in {school.name}
                                  </button>
                                  
                                  {schoolCourses.map((course) => (
                                    <button
                                      key={course.id}
                                      onClick={() => handleCourseClick(school.id, course.id)}
                                      className="w-full text-left text-[11px] font-bold text-slate-600 hover:text-blue-700 py-1 transition-colors block leading-relaxed hover:translate-x-0.5 duration-150 pl-1"
                                    >
                                      • {course.title}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {menuItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate(item.route);
                      }}
                      className="text-left py-2.5 px-2 text-sm font-extrabold text-slate-800 hover:text-blue-700 hover:bg-slate-50 rounded transition-colors block"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <div className="h-14 sm:h-16 w-full clear-both" />
            <EnquireModal 
              isOpen={isEnquireModalOpen} 
              onClose={() => setIsEnquireModalOpen(false)} 
            />
    </>
  );
}












// /**
//  * @license
//  * SPDX-License-Identifier: Apache-2.0
//  */
// import { useNavigate, useLocation } from "react-router-dom";
// import React, { useState, useRef, useEffect } from 'react';
// import { ChevronDown, Menu, X } from 'lucide-react';
// import { SCHOOLS, COURSES } from '../data';

// interface HeaderProps {
//   onSearch: (query: string) => void;
//   onSelectSchool: (schoolId: string | null) => void;
//   onNavigate: (section: string) => void;
//   selectedSchoolId: string | null;
//   onOpenApplyModal: () => void;
//   onOpenEnquireModal: () => void; // Added prop definition
// }

// export default function Header({
//   onSearch,
//   onSelectSchool,
//   onNavigate,
//   selectedSchoolId,
//   onOpenApplyModal,
//   onOpenEnquireModal, // Destructured prop
// }: HeaderProps) {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isSchoolDropdownOpen, setIsSchoolDropdownOpen] = useState(false);
//   const [isMobileCoursesOpen, setIsMobileCoursesOpen] = useState(false);
//   const [expandedMobileSchool, setExpandedMobileSchool] = useState<string | null>(null);
//   const [searchVal, setSearchVal] = useState('');
  
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsSchoolDropdownOpen(false);
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.classList.add('overflow-hidden');
//     } else {
//       document.body.classList.remove('overflow-hidden');
//     }
//     return () => {
//       document.body.classList.remove('overflow-hidden');
//     };
//   }, [isMobileMenuOpen]);

//   const handleSchoolClick = (schoolId: string | null) => {
//     setIsSchoolDropdownOpen(false);
//     setIsMobileMenuOpen(false);

//     if (schoolId !== null) {
//       if (location.pathname === '/') {
//         onSelectSchool(schoolId);
//         const element = document.getElementById('courses');
//         if (element) {
//           const yOffset = -70; 
//           const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
//           window.scrollTo({ top: y, behavior: 'smooth' });
//         }
//       } else {
//         navigate('/', { 
//           state: { 
//             forceScrollToCatalog: true, 
//             targetSchoolId: schoolId 
//           } 
//         });
//       }
//     } else {
//       onSelectSchool(null);
//       onSearch('');
//       setSearchVal('');

//       if (location.pathname === '/') {
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//       } else {
//         navigate('/');
//       }
//     }
//   };

//   const handleCourseClick = (schoolId: string, courseKey: string) => {
//     const targetCourse = COURSES.find(
//       (c) => c.schoolId === schoolId && c.id.toLowerCase().includes(courseKey.toLowerCase())
//     ) || COURSES.find((c) => c.schoolId === schoolId);

//     setIsSchoolDropdownOpen(false);
//     setIsMobileMenuOpen(false);

//     if (targetCourse) {
//       navigate(`/course/${targetCourse.id}`);
//       setTimeout(() => {
//         onSelectSchool(schoolId);
//       }, 50);
//     } else {
//       navigate(`/?school=${schoolId}`);
//     }

//     setTimeout(() => {
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }, 120);
//   };

//   const menuItems = [
//     { label: 'Campuses', route: '/campuses' },
//     { label: 'Advisory Council', route: '/advisory-council' },
//     { label: 'Fees Payment', route: '/fees-payment' },
//   ];

//   return (
//     <>
//       <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-slate-200/80 bg-white" id="bia-header">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="flex h-14 sm:h-16 items-center justify-between">
            
//             <div className="flex items-center space-x-4 sm:space-x-8">
//               <div
//                 className="flex items-center gap-2 cursor-pointer select-none"
//                 onClick={() => handleSchoolClick(null)}
//               >
//                 <span className="font-black text-xl sm:text-2xl tracking-tight text-[#182B5C]">
//                   Tensor<span className="text-violet-600">Nova</span>
//                 </span>
//                 <div className="h-7 w-[1px] bg-slate-300" />
//                 <div className="flex flex-col">
//                   <span className="text-[8px] uppercase tracking-[0.25em] font-bold text-slate-500">
//                     Experience The Future
//                   </span>
//                   <span className="text-[8px] uppercase tracking-[0.25em] font-bold text-violet-600">
//                     Of Innovation
//                   </span>
//                 </div>
//               </div>

//               {/* Desktop Navigation */}
//               <nav className="hidden lg:flex items-center space-x-5 text-[12.5px] font-black text-slate-800">
//                 <button
//                   onClick={() => handleSchoolClick(null)}
//                   className="hover:text-blue-700 transition-colors cursor-pointer text-slate-900 font-extrabold"
//                 >
//                   Home
//                 </button>

//                 <div ref={dropdownRef} className="relative">
//                   <button
//                     onClick={() => setIsSchoolDropdownOpen(!isSchoolDropdownOpen)}
//                     className="flex items-center space-x-1 text-slate-850 hover:text-blue-700 transition-colors py-2 cursor-pointer"
//                   >
//                     <span className="font-extrabold">Courses</span>
//                     <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isSchoolDropdownOpen ? 'rotate-180 text-blue-700' : ''}`} />
//                   </button>

//                   {isSchoolDropdownOpen && (
//                     <div className="fixed left-0 right-0 top-14 sm:top-16 w-screen bg-white border-b border-slate-200/90 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
//                       <div className="mx-auto max-w-7xl px-8 py-10">
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-10">
                          
//                           {/* Tech School Column */}
//                           <div className="space-y-8">
//                             <div>
//                               <button 
//                                 onClick={() => handleSchoolClick('tech-ai')}
//                                 className="block text-left text-[11px] font-black text-[#0a1d4a] uppercase tracking-wider border-b border-slate-100 pb-2 mb-3.5 w-full hover:text-blue-700 transition-colors"
//                               >
//                                 BOSTON SCHOOL OF TECHNOLOGY & AI
//                               </button>
//                               <ul className="space-y-2">
//                                 {[
//                                   { name: 'Data Science And Artificial Intelligence', key: 'data-science' },
//                                   { name: 'Generative AI And Agentic AI Development', key: 'generative' },
//                                   { name: 'Cyber Security And Ethical Hacking', key: 'cyber' },
//                                   { name: 'Cloud Computing And DevOps', key: 'cloud' },
//                                   { name: 'Java And JavaScript Full Stack Development', key: 'java' },
//                                   { name: 'Big Data, AWS And Hadoop', key: 'big-data' },
//                                   { name: 'Full Stack Web Development', key: 'web-development' }
//                                 ].map((item, idx) => (
//                                   <li key={idx}>
//                                     <button
//                                       onClick={() => handleCourseClick('tech-ai', item.key)}
//                                       className="text-left text-[12px] font-medium text-slate-650 hover:text-blue-700 transition-all hover:translate-x-1 duration-150 block line-clamp-1 py-0.5 cursor-pointer"
//                                     >
//                                       {item.name}
//                                     </button>
//                                   </li>
//                                 ))}
//                               </ul>
//                             </div>

//                             <div>
//                               <button 
//                                 onClick={() => handleSchoolClick('media-comm')}
//                                 className="block text-left text-[11px] font-black text-[#0a1d4a] uppercase tracking-wider border-b border-slate-100 pb-2 mb-3.5 w-full hover:text-blue-700 transition-colors"
//                               >
//                                 BOSTON SCHOOL OF MEDIA & COMMUNICATIONS
//                               </button>
//                               <ul className="space-y-2">
//                                 {[
//                                   { name: 'Advertising, PR & Corporate Communications', key: 'advertising' },
//                                   { name: 'Journalism', key: 'journalism' },
//                                   { name: 'Event Management', key: 'event' },
//                                   { name: 'Photography', key: 'photography' },
//                                   { name: 'English Communication and Public Speaking', key: 'english' },
//                                   { name: 'Foreign Languages: French, Spanish, Japanese', key: 'languages' }
//                                 ].map((item, idx) => (
//                                   <li key={idx}>
//                                     <button
//                                       onClick={() => handleCourseClick('media-comm', item.key)}
//                                       className="text-left text-[12px] font-medium text-slate-650 hover:text-blue-700 transition-all hover:translate-x-1 duration-150 block line-clamp-1 py-0.5 cursor-pointer"
//                                     >
//                                       {item.name}
//                                     </button>
//                                   </li>
//                                 ))}
//                               </ul>
//                             </div>
//                           </div>

//                           {/* Management School Column */}
//                           <div className="space-y-8">
//                             <div>
//                               <button 
//                                 onClick={() => handleSchoolClick('management')}
//                                 className="block text-left text-[11px] font-black text-[#0a1d4a] uppercase tracking-wider border-b border-slate-100 pb-2 mb-3.5 w-full hover:text-blue-700 transition-colors"
//                               >
//                                 BOSTON SCHOOL OF MANAGEMENT
//                               </button>
//                               <ul className="space-y-2">
//                                 {[
//                                   { name: 'Business Management And Analytics', key: 'management' },
//                                   { name: 'Digital Marketing And Analytics', key: 'digital-marketing' },
//                                   { name: 'Legal Analytics', key: 'legal' },
//                                   { name: 'Marketing Analytics And AI', key: 'marketing' },
//                                   { name: 'Sports Management And Analytics', key: 'sports' },
//                                   { name: 'Product Management And Analytics', key: 'product' },
//                                   { name: 'International Business And Economics', key: 'international' }
//                                 ].map((item, idx) => (
//                                   <li key={idx}>
//                                     <button
//                                       onClick={() => handleCourseClick('management', item.key)}
//                                       className="text-left text-[12px] font-medium text-slate-650 hover:text-blue-700 transition-all hover:translate-x-1 duration-150 block line-clamp-1 py-0.5 cursor-pointer"
//                                     >
//                                       {item.name}
//                                     </button>
//                                   </li>
//                                 ))}
//                               </ul>
//                             </div>

//                             <div>
//                               <button 
//                                 onClick={() => handleSchoolClick('corporate')}
//                                 className="block text-left text-[11px] font-black text-[#0a1d4a] uppercase tracking-wider border-b border-slate-100 pb-2 mb-3.5 w-full hover:text-blue-700 transition-colors"
//                               >
//                                 BOSTON SCHOOL OF CORPORATE TRAINING
//                               </button>
//                               <ul className="space-y-2">
//                                 {[
//                                   { name: 'Data Science For Business Decision Making', key: 'data-science' },
//                                   { name: 'Mastering Data Visualization', key: 'data-visualization' },
//                                   { name: 'Generative AI For Enterprises', key: 'generative' },
//                                   { name: 'Cyber Security And Ethical Hacking For Enterprises', key: 'cyber' },
//                                   { name: 'Financial Modeling & Valuation Fundamentals', key: 'financial' },
//                                   { name: 'Strategic Project Management', key: 'project' },
//                                   { name: 'Customized Corporate Training', key: 'corporate' }
//                                 ].map((item, idx) => (
//                                   <li key={idx}>
//                                     <button
//                                       onClick={() => handleCourseClick('corporate', item.key)}
//                                       className="text-left text-[12px] font-medium text-slate-650 hover:text-blue-700 transition-all hover:translate-x-1 duration-150 block line-clamp-1 py-0.5 cursor-pointer"
//                                     >
//                                       {item.name}
//                                     </button>
//                                   </li>
//                                 ))}
//                               </ul>
//                             </div>
//                           </div>

//                           {/* Finance Column */}
//                           <div>
//                             <button 
//                               onClick={() => handleSchoolClick('finance')}
//                               className="block text-left text-[11px] font-black text-[#0a1d4a] uppercase tracking-wider border-b border-slate-100 pb-2 mb-3.5 w-full hover:text-blue-700 transition-colors"
//                             >
//                               BOSTON SCHOOL OF FINANCE
//                             </button>
//                             <ul className="space-y-2">
//                               {[
//                                 { name: 'Investment Banking And Financial Analytics', key: 'investment' },
//                                 { name: 'Equity Research And Valuation Analytics', key: 'equity' },
//                                 { name: 'Financial Modeling And Business Analytics', key: 'modeling' },
//                                 { name: 'Chartered Financial Analyst (CFA)', key: 'cfa' },
//                                 { name: 'Financial Risk Manager (FRM)', key: 'frm' },
//                                 { name: 'Certified Public Accountant (US CPA)', key: 'cpa' },
//                                 { name: 'Certified Management Accountant (CMA)', key: 'cma' }
//                               ].map((item, idx) => (
//                                 <li key={idx}>
//                                   <button
//                                     onClick={() => handleCourseClick('finance', item.key)}
//                                     className="text-left text-[12px] font-medium text-slate-650 hover:text-blue-700 transition-all hover:translate-x-1 duration-150 block line-clamp-1 py-0.5 cursor-pointer"
//                                   >
//                                     {item.name}
//                                   </button>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>

//                           {/* Design Column */}
//                           <div>
//                             <button 
//                               onClick={() => handleSchoolClick('animation-design')}
//                               className="block text-left text-[11px] font-black text-[#0a1d4a] uppercase tracking-wider border-b border-slate-100 pb-2 mb-3.5 w-full hover:text-blue-700 transition-colors"
//                             >
//                               BOSTON SCHOOL OF ANIMATION & DESIGN
//                             </button>
//                             <ul className="space-y-2">
//                               {[
//                                 { name: 'Integrated 2D, 3D Animation & VFX', key: 'animation' },
//                                 { name: 'Graphic Design, Video Editing and 2D Animation', key: 'design' },
//                                 { name: '3D Animation And VFX', key: 'vfx' },
//                                 { name: 'Game Design And Development', key: 'game' },
//                                 { name: 'VFX Film Making And Motion Graphics', key: 'motion' },
//                                 { name: '3D Architectural Visualization', key: 'architectural' },
//                                 { name: 'Fashion CAD And Analytics', key: 'fashion' }
//                               ].map((item, idx) => (
//                                 <li key={idx}>
//                                   <button
//                                     onClick={() => handleCourseClick('animation-design', item.key)}
//                                     className="text-left text-[12px] font-medium text-slate-650 hover:text-blue-700 transition-all hover:translate-x-1 duration-150 block line-clamp-1 py-0.5 cursor-pointer"
//                                   >
//                                     {item.name}
//                                   </button>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>

//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {menuItems.map((item, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => navigate(item.route)}
//                     className="hover:text-blue-700 transition-colors cursor-pointer"
//                   >
//                     {item.label}
//                   </button>
//                 ))}
//               </nav>
//             </div>

//             <div className="flex items-center space-x-3">
//               {/* Trigger the parent configuration prop directly */}
//               <button
//                 onClick={onOpenEnquireModal}
//                 className="rounded bg-[#ff9800] px-4 py-2 text-[11px] font-black text-white uppercase hover:bg-[#e68a00] transition-colors cursor-pointer"
//               >
//                 ENQUIRE NOW
//               </button>

//               <div className="flex items-center space-x-1.5 sm:space-x-2.5 lg:hidden">
//                 <button
//                   onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                   className="rounded p-1.5 sm:p-2 text-slate-600 hover:bg-slate-100 transition-colors"
//                   aria-label="Toggle main menu"
//                 >
//                   {isMobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Navigation Drawer */}
//         {isMobileMenuOpen && (
//           <div className="fixed left-0 right-0 bottom-0 top-14 sm:top-16 bg-white border-t border-slate-200 px-5 py-5 shadow-2xl lg:hidden overflow-y-auto z-50 pb-24 md:pb-32 flex flex-col">
//             <div className="space-y-6 text-slate-800 pb-10">
//               <div>
//                 <p className="text-[11px] font-black uppercase tracking-widest text-[#0a1d4a] mb-4 pb-1 border-b border-slate-100">Navigation Menu</p>
//                 <div className="flex flex-col space-y-1">
                  
//                   <button
//                     onClick={() => handleSchoolClick(null)}
//                     className="text-left py-2.5 px-2 text-sm font-extrabold text-slate-800 hover:text-blue-700 hover:bg-slate-50 rounded transition-colors block"
//                   >
//                     Home Screen
//                   </button>

//                   <div className="border-b border-slate-100 last:border-none">
//                     <div className="flex items-center justify-between py-1 px-1 text-sm font-extrabold text-[#0a1d4a] hover:bg-slate-50 rounded transition-all">
//                       <button
//                         onClick={() => handleSchoolClick(null)}
//                         className="flex-1 text-left py-1.5 px-1 flex items-center gap-2 font-extrabold text-[#0a1d4a] hover:text-blue-700 transition-colors cursor-pointer"
//                       >
//                         Courses
//                       </button>
//                       <button
//                         onClick={() => setIsMobileCoursesOpen(!isMobileCoursesOpen)}
//                         className="p-1.5 px-2.5 rounded bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-600 border border-slate-200/80 shadow-xs transition-all cursor-pointer"
//                       >
//                         <ChevronDown className={`h-4 w-4 transition-transform duration-250 ${isMobileCoursesOpen ? 'rotate-180 text-blue-600' : ''}`} />
//                       </button>
//                     </div>

//                     {isMobileCoursesOpen && (
//                       <div className="pl-3 pr-1 py-2 mt-1 space-y-3 bg-slate-50/50 border-l-2 border-blue-600/30 rounded-r-md">
//                         <div className="border-b border-slate-200/40 pb-2">
//                           <button
//                             onClick={() => handleSchoolClick(null)}
//                             className="w-full text-left text-xs font-black text-blue-600 hover:text-blue-800 py-1.5 flex items-center gap-1.5"
//                           >
//                             <span>🔍 VIEW FULL CATALOG</span>
//                           </button>
//                         </div>

//                         {SCHOOLS.map((school) => {
//                           const isExpanded = expandedMobileSchool === school.id;
//                           const schoolCourses = COURSES.filter(c => c.schoolId === school.id);
                          
//                           return (
//                             <div key={school.id} className="border-b border-slate-200/40 last:border-none pb-2 pt-1">
//                               <button
//                                 onClick={() => setExpandedMobileSchool(isExpanded ? null : school.id)}
//                                 className="w-full flex items-center justify-between text-left text-xs transition-colors font-bold py-2 text-slate-750 hover:text-blue-600"
//                               >
//                                 <span className={selectedSchoolId === school.id ? 'text-blue-700 font-extrabold' : ''}>
//                                   {school.name.toUpperCase()}
//                                 </span>
//                                 <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-250 shrink-0 ml-2 ${isExpanded ? 'rotate-180 text-blue-600' : ''}`} />
//                               </button>

//                               {isExpanded && (
//                                 <div className="pl-3 mt-1.5 space-y-2.5 border-l-2 border-blue-500/25 py-1">
//                                   <button
//                                     onClick={() => handleSchoolClick(school.id)}
//                                     className="w-full text-left text-[11px] font-extrabold text-blue-600 hover:text-blue-700 py-1 block"
//                                   >
//                                     ➔ View All in {school.name}
//                                   </button>
                                  
//                                   {schoolCourses.map((course) => (
//                                     <button
//                                       key={course.id}
//                                       onClick={() => handleCourseClick(school.id, course.id)}
//                                       className="w-full text-left text-[11px] font-bold text-slate-600 hover:text-blue-700 py-1 transition-colors block leading-relaxed hover:translate-x-0.5 duration-150 pl-1"
//                                     >
//                                       • {course.title}
//                                     </button>
//                                   ))}
//                                 </div>
//                               )}
//                             </div>
//                           );
//                         })}
//                       </div>
//                     )}
//                   </div>

//                   {menuItems.map((item, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => {
//                         setIsMobileMenuOpen(false);
//                         navigate(item.route);
//                       }}
//                       className="text-left py-2.5 px-2 text-sm font-extrabold text-slate-800 hover:text-blue-700 hover:bg-slate-50 rounded transition-colors block"
//                     >
//                       {item.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </header>

//       <div className="h-14 sm:h-16 w-full clear-both" />
//     </>
//   );
// }

