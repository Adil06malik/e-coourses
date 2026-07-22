



// /**
//  * @license
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import React, { useState } from 'react';
// // 1. IMPORT hooks from react-router-dom to read and write URL updates
// import { useParams, useNavigate,useSearchParams } from 'react-router-dom';

// import Header from './Header';
// import Hero from './Hero';
// import StatsSection from './StatsSection';
// import CourseCatalog from './CourseCatalog';
// import Testimonials from './Testimonials';
// import AdmissionsSection from './AdmissionsSection';
// import VirtualAdvisor from './VirtualAdvisor';
// import CourseDetailView from './CourseDetailView';
// import BannerStations from './BannerStations';
// import Footer from './Footer';

// import { Course, InquiryForm } from '../types';
// import { SCHOOLS, COURSES } from '../data';
// import { Mail, Phone, MapPin, Star, Sparkles, X, ChevronRight, CheckCircle2, ShieldCheck, GraduationCap } from 'lucide-react';

// export default function HomePage() {
//   // 2. SETUP Router actions and fetch dynamic params
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
// const [searchParams] = useSearchParams();
//   const [searchQuery, setSearchQuery] = useState('');
// const schoolFromUrl = searchParams.get("school");

// const [selectedSchoolId, setSelectedSchoolId] =
//   useState<string | null>(schoolFromUrl);
  
//   // 3. REPLACED: Derived state fetches item from URL index instead of local state hooks
//   const activeCourseDetail = COURSES.find(c => c.id === id) || null;
  
//   // Modal State Control
//   const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
//   const [modalSelectedCourse, setModalSelectedCourse] = useState<Course | null>(null);
//   const [modalFormData, setModalFormData] = useState<InquiryForm>({
//     fullName: '',
//     email: '',
//     phone: '',
//     selectedSchool: 'tech-ai',
//     selectedCourse: '',
//     mode: 'Classroom',
//     experienceLevel: 'Fresh Graduate',
//     message: ''
//   });
//   const [isModalSubmitted, setIsModalSubmitted] = useState(false);
//   const [modalCountry, setModalCountry] = useState('');
//   const [modalCity, setModalCity] = useState('');
//   const [modalCampus, setModalCampus] = useState('');

//   // Global search trigger
//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//   };

//   const handleSelectSchool = (schoolId: string | null) => {
//     setSelectedSchoolId(schoolId);
//     // Use navigate to clear course sub views safely if switching tracks
//     if (id) navigate('/');
//   };

//   React.useEffect(() => {
//   const school = searchParams.get("school");

//   if (school) {
//     setSelectedSchoolId(school);

//     setTimeout(() => {
//       const coursesSection =
//         document.getElementById("courses");

//       if (coursesSection) {
//         coursesSection.scrollIntoView({
//           behavior: "smooth",
//         });
//       }
//     }, 300);
//   }
// }, [searchParams]);

//   // FIX 1: Enhanced navigation function that ensures the DOM element exists 
//   // after transitioning away from the Course Detail View.
//   const handleNavigate = (sectionId: string) => {
//     // 1. Immediately drop the subpage view to mount home sections using URL path resets
//     navigate('/');
    
//     // 2. Use a recursive check or structured timeout to let DOM render completely
//     const scrollToTarget = (attempts = 0) => {
//       const el = document.getElementById(sectionId);
//       if (el) {
//         // Offset scrolling slightly if you have a sticky header (e.g., 80px layout block)
//         const yOffset = -80; 
//         const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
//         window.scrollTo({ top: y, behavior: 'smooth' });
//       } else if (attempts < 5) {
//         // Re-try up to 5 times if DOM is sluggish
//         setTimeout(() => scrollToTarget(attempts + 1), 50);
//       }
//     };

//     // Initial delay trigger
//     setTimeout(() => scrollToTarget(), 100);
//   };

//   // FIX 2: Explicit function to clear inner views and snap completely back to the main viewport
//   const handleGoHome = () => {
//     setSelectedSchoolId(null);
//     setSearchQuery('');
//     navigate('/'); // 4. CLEAR dynamic param to mount standard home views
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Open apply modal window with optional pre-selected course
//   const handleOpenApplyModal = (course?: Course) => {
//     if (course) {
//       setModalSelectedCourse(course);
//       setModalFormData(prev => ({
//         ...prev,
//         selectedSchool: course.schoolId,
//         selectedCourse: course.id
//       }));
//     } else {
//       setModalSelectedCourse(null);
//     }
//     setModalCountry('');
//     setModalCity('');
//     setModalCampus('');
//     setIsModalSubmitted(false);
//     setIsApplyModalOpen(true);
//   };

//   const handleModalFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setModalFormData(prev => {
//       const updated = { ...prev, [name]: value };
//       if (name === 'selectedSchool') {
//         const matching = COURSES.filter(c => c.schoolId === value);
//         updated.selectedCourse = matching.length > 0 ? matching[0].id : '';
//       }
//       return updated;
//     });
//   };

//   const handleModalSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!modalFormData.fullName || !modalFormData.email || !modalFormData.phone) {
//       alert('Please fill out all required fields.');
//       return;
//     }
//     setIsModalSubmitted(true);
//     // Success timeout dismissal
//     setTimeout(() => {
//       setIsApplyModalOpen(false);
//       setIsModalSubmitted(false);
//       setModalCountry('');
//       setModalCity('');
//       setModalCampus('');
//       setModalFormData({
//         fullName: '',
//         email: '',
//         phone: '',
//         selectedSchool: 'tech-ai',
//         selectedCourse: '',
//         mode: 'Classroom',
//         experienceLevel: 'Fresh Graduate',
//         message: ''
//       });
//     }, 4500);
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-800 font-sans leading-normal selection:bg-blue-100 selection:text-blue-900" id="main-bia-app">
      
//       {/* 1. Header Navigation Bar */}
  
//       {activeCourseDetail ? (
//         <CourseDetailView
//           course={activeCourseDetail}
//           onBackToCatalog={handleGoHome} // Satisfies interface profiles safely
//           onOpenApplyModal={handleOpenApplyModal}
//         />
//       ) : (
//         <>
//           {/* 2. Main Hero Area with Callback Form */}
//           <Hero
//             onInquirySubmit={(data) => {
//               console.log('Enquiry received:', data);
//             }}
//             selectedSchoolId={selectedSchoolId}
//             onSelectSchool={handleSelectSchool}
//           />

//           {/* 3. General Placement Stats and Logos Section */}
//           <StatsSection />

//           {/* 4. Active Course Catalog with Syllabus drawers */}
//           <CourseCatalog
//             searchQuery={searchQuery}
//             selectedSchoolId={selectedSchoolId}
//             onSelectSchool={handleSelectSchool}
//             onOpenApplyModal={handleOpenApplyModal}
//             onViewCourseDetail={(course) => {
//               // 5. UPDATE: Push route updates to layout frame instead of local variable state
//               navigate(`/course/${course.id}`);
//               window.scrollTo({ top: 0, behavior: 'smooth' });
//             }}
//           />

//           {/* 5. Career Advisor Bot Interface Container */}
//           <VirtualAdvisor
//             onSelectCourse={(courseId) => {
//               const selected = COURSES.find(c => c.id === courseId);
//               if (selected) {
//                 setSelectedSchoolId(selected.schoolId);
//                 // 6. UPDATE: Bot selections also leverage paths
//                 navigate(`/course/${selected.id}`);
//                 window.scrollTo({ top: 0, behavior: 'smooth' });
//               }
//             }}
//             onOpenApplyModal={handleOpenApplyModal}
//           />

//           {/* 6. High-Trust Testimonials & Reviews Grid */}
//           <section id="bia-advantage" className="scroll-mt-20">
//             <Testimonials />
//           </section>
        
//           {/* 7. Selective Admissions Roadmap & Campus coordinations */}
//           <AdmissionsSection />
          
//           {/* 7. Banner Stations */}
//           <BannerStations />
//         </>
//       )}

//       {/* 8. Corporate Footer Zone with Credentials and Campus details */}
  
//       {/* 9. Apply Dynamic Modal Pop Up Screen Overlay */}
//       {isApplyModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm" id="apply-overlay">
//           <div className="relative w-full max-w-[340px] rounded-xl border border-slate-100 bg-white p-4 sm:p-5 shadow-2xl max-h-[85vh] overflow-y-auto">
            
//             {/* Close trigger button */}
//             <button
//               onClick={() => setIsApplyModalOpen(false)}
//               className="absolute top-3 right-3 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-800 transition-colors outline-none cursor-pointer"
//               aria-label="Close"
//             >
//               <X className="h-4.5 w-4.5 font-light" />
//             </button>

//             {isModalSubmitted ? (
//               <div className="py-4 text-center space-y-2.5">
//                 <div className="mx-auto h-9 w-9 flex items-center justify-center rounded-full bg-[#00005d]/10 text-[#00005d] mb-1">
//                   <CheckCircle2 className="h-5 w-5" />
//                 </div>
//                 <h3 className="text-base font-bold text-[#0a1d4a]">Enquiry Submitted!</h3>
//                 <p className="text-[11px] text-slate-600 leading-normal px-1">
//                   Thank you <span className="font-bold text-[#00005d]">{modalFormData.fullName}</span>. One of our regional educational experts will contact you soon on <span className="font-semibold text-slate-900">{modalFormData.phone}</span>.
//                 </p>
//                 <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100 text-left text-[10px] text-slate-600 space-y-0.5 max-w-sm mx-auto">
//                   <p>• <strong>Selected Program:</strong> {COURSES.find(c => c.id === modalFormData.selectedCourse)?.title || "General Advisement"}</p>
//                   <p>• <strong>Location Assigned:</strong> {modalCity ? `${modalCity}, ${modalCountry}` : "Online Division"}</p>
//                   <p>• <strong>Nearest Center:</strong> {modalCampus || "Virtual"}</p>
//                 </div>
//                 <div className="pt-0.5">
//                   <span className="inline-block rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-bold text-[#00005d] animate-pulse">
//                     Priority Ticket Created
//                   </span>
//                 </div>
//               </div>
//             ) : (
//               <form onSubmit={handleModalSubmit} className="space-y-2 pt-1">
                
//                 {/* Header text */}
//                 <div className="text-center pb-0.5">
//                   <h3 className="text-lg font-extrabold text-[#0a1d4a] tracking-tight">
//                     Talk to our expert
//                   </h3>
//                   <p className="text-[10px] text-slate-500 font-medium">
//                     Please share your details and we will reach out to you soon.
//                   </p>
//                 </div>

//                 {/* 1. Select Course */}
//                 <div className="relative">
//                   <select
//                     name="selectedCourse"
//                     required
//                     value={modalFormData.selectedCourse}
//                     onChange={handleModalFormChange}
//                     className="w-full h-8 pl-2.5 pr-7 rounded-md border border-slate-200 bg-white text-[11px] text-slate-700 outline-none focus:border-[#00005d] focus:ring-1 focus:ring-[#00005d] appearance-none transition-all cursor-pointer"
//                   >
//                     <option value="" className="text-slate-400">Select Course</option>
//                     {COURSES.map(course => (
//                       <option key={course.id} value={course.id}>
//                         {course.title}
//                       </option>
//                     ))}
//                   </select>
//                   <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-slate-400">
//                     <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </div>
//                 </div>

//                 {/* 2. Full Name Input */}
//                 <div>
//                   <input
//                     type="text"
//                     name="fullName"
//                     required
//                     placeholder="Full Name"
//                     value={modalFormData.fullName}
//                     onChange={handleModalFormChange}
//                     className="w-full h-8 px-2.5 rounded-md border border-slate-200 bg-white text-[11px] text-slate-700 outline-none focus:border-[#00005d] focus:ring-1 focus:ring-[#00005d] transition-all"
//                   />
//                 </div>

//                 {/* 3. Email Input */}
//                 <div>
//                   <input
//                     type="email"
//                     name="email"
//                     required
//                     placeholder="Email"
//                     value={modalFormData.email}
//                     onChange={handleModalFormChange}
//                     className="w-full h-8 px-2.5 rounded-md border border-slate-200 bg-white text-[11px] text-slate-700 outline-none focus:border-[#00005d] focus:ring-1 focus:ring-[#00005d] transition-all"
//                   />
//                 </div>

//                 {/* 4. Phone Input */}
//                 <div>
//                   <input
//                     type="tel"
//                     name="phone"
//                     required
//                     placeholder="Phone"
//                     value={modalFormData.phone}
//                     onChange={handleModalFormChange}
//                     className="w-full h-8 px-2.5 rounded-md border border-slate-200 bg-white text-[11px] text-slate-700 outline-none focus:border-[#00005d] focus:ring-1 focus:ring-[#00005d] transition-all"
//                   />
//                 </div>

//                 {/* 5. Select Your Country */}
//                 <div className="relative">
//                   <select
//                     required
//                     value={modalCountry}
//                     onChange={(e) => {
//                       setModalCountry(e.target.value);
//                       setModalCity('');
//                       setModalCampus('');
//                     }}
//                     className="w-full h-8 pl-2.5 pr-7 rounded-md border border-slate-200 bg-white text-[11px] text-slate-700 outline-none focus:border-[#00005d] focus:ring-1 focus:ring-[#00005d] appearance-none transition-all cursor-pointer"
//                   >
//                     <option value="">Select Your Country</option>
//                     <option value="United States">United States</option>
//                     <option value="United Kingdom">United Kingdom</option>
//                     <option value="United Arab Emirates">United Arab Emirates</option>
//                     <option value="Singapore">Singapore</option>
//                     <option value="India">India</option>
//                     <option value="France">France</option>
//                     <option value="Australia">Australia</option>
//                   </select>
//                   <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-slate-400">
//                     <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </div>
//                 </div>

//                 {/* 6. Select Your City */}
//                 <div className="relative">
//                   <select
//                     required
//                     value={modalCity}
//                     onChange={(e) => {
//                       setModalCity(e.target.value);
//                       const cityToCampusMap: Record<string, string> = {
//                         'Boston': 'Boston Headquarters Campus',
//                         'London': 'London Canary Wharf Campus',
//                         'Dubai': 'Dubai Knowledge Park Campus',
//                         'Singapore': 'Singapore Temasek Campus',
//                         'Mumbai': 'Mumbai BKC Campus',
//                         'Paris': 'Paris Ségur Campus',
//                         'Sydney': 'Sydney O\'Connell Campus'
//                       };
//                       if (cityToCampusMap[e.target.value]) {
//                         setModalCampus(cityToCampusMap[e.target.value]);
//                       }
//                     }}
//                     className="w-full h-8 pl-2.5 pr-7 rounded-md border border-slate-200 bg-white text-[11px] text-slate-700 outline-none focus:border-[#00005d] focus:ring-1 focus:ring-[#00005d] appearance-none transition-all cursor-pointer relative z-10"
//                   >
//                     <option value="">Select Your City</option>
//                     {modalCountry === 'United States' && <option value="Boston">Boston</option>}
//                     {modalCountry === 'United Kingdom' && <option value="London">London</option>}
//                     {modalCountry === 'United Arab Emirates' && <option value="Dubai">Dubai</option>}
//                     {modalCountry === 'Singapore' && <option value="Singapore">Singapore</option>}
//                     {modalCountry === 'India' && <option value="Mumbai">Mumbai</option>}
//                     {modalCountry === 'France' && <option value="Paris">Paris</option>}
//                     {modalCountry === 'Australia' && <option value="Sydney">Sydney</option>}
//                     {!modalCountry && (
//                       <>
//                         <option value="Boston">Boston</option>
//                         <option value="London">London</option>
//                         <option value="Dubai">Dubai</option>
//                         <option value="Singapore">Singapore</option>
//                         <option value="Mumbai">Mumbai</option>
//                         <option value="Paris">Paris</option>
//                         <option value="Sydney">Sydney</option>
//                       </>
//                     )}
//                   </select>
//                   <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-slate-400 z-20">
//                     <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </div>
//                 </div>

//                 {/* 7. Nearest Campus */}
//                 <div className="relative">
//                   <select
//                     required
//                     value={modalCampus}
//                     onChange={(e) => setModalCampus(e.target.value)}
//                     className="w-full h-8 pl-2.5 pr-7 rounded-md border border-slate-200 bg-white text-[11px] text-slate-700 outline-none focus:border-[#00005d] focus:ring-1 focus:ring-[#00005d] appearance-none transition-all cursor-pointer relative z-10"
//                   >
//                     <option value="">Nearest Campus</option>
//                     <option value="Boston Headquarters Campus">Boston Headquarters Campus</option>
//                     <option value="London Canary Wharf Campus">London Canary Wharf Campus</option>
//                     <option value="Dubai Knowledge Park Campus">Dubai Knowledge Park Campus</option>
//                     <option value="Singapore Temasek Campus">Singapore Temasek Campus</option>
//                     <option value="Mumbai BKC Campus">Mumbai BKC Campus</option>
//                     <option value="Paris Ségur Campus">Paris Ségur Campus</option>
//                     <option value="Sydney O'Connell Campus">Sydney O'Connell Campus</option>
//                     <option value="Online Virtual Classroom">Online Virtual Classroom</option>
//                   </select>
//                   <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-slate-400 z-20">
//                     <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </div>
//                 </div>

//                 {/* Centered CTA Submit Button */}
//                 <div className="pt-1 text-center">
//                   <button
//                     type="submit"
//                     className="w-full bg-[#00005d] hover:bg-[#000044] text-[#ffffff] font-extrabold text-[11px] tracking-wide h-8 rounded-md transition-all cursor-pointer hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00005d] block mx-auto select-none"
//                   >
//                     Enquire Now
//                   </button>
//                 </div>

//               </form>
//             )}

//           </div>
//         </div>
//       )}

//     </div>
//   );
// }



//////////////////////////////////////////////////////////////////


// /**
//  * @license
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import React, { useState } from 'react';
// // 1. IMPORT hooks from react-router-dom to read and write URL updates
// import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

// import Header from './Header';
// import Hero from './Hero';
// import StatsSection from './StatsSection';
// import CourseCatalog from './CourseCatalog';
// import Testimonials from './Testimonials';
// import AdmissionsSection from './AdmissionsSection';
// import VirtualAdvisor from './VirtualAdvisor';
// import CourseDetailView from './CourseDetailView';
// import BannerStations from './BannerStations';
// import Footer from './Footer';

// import { Course, InquiryForm } from '../types';
// import { SCHOOLS, COURSES } from '../data';
// import { Mail, Phone, MapPin, Star, Sparkles, X, ChevronRight, CheckCircle2, ShieldCheck, GraduationCap } from 'lucide-react';

// export default function HomePage() {
//   // 2. SETUP Router actions and fetch dynamic params
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const [searchQuery, setSearchQuery] = useState('');
//   const schoolFromUrl = searchParams.get("school");

//   const [selectedSchoolId, setSelectedSchoolId] =
//     useState<string | null>(schoolFromUrl);
  
//   // 3. REPLACED: Derived state fetches item from URL index instead of local state hooks
//   const activeCourseDetail = COURSES.find(c => c.id === id) || null;
  
//   // Modal State Control
//   const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
//   const [modalSelectedCourse, setModalSelectedCourse] = useState<Course | null>(null);
//   const [modalFormData, setModalFormData] = useState<InquiryForm>({
//     fullName: '',
//     email: '',
//     phone: '',
//     selectedSchool: 'tech-ai',
//     selectedCourse: '',
//     mode: 'Classroom',
//     experienceLevel: 'Fresh Graduate',
//     message: ''
//   });
//   const [isModalSubmitted, setIsModalSubmitted] = useState(false);
//   const [modalCountry, setModalCountry] = useState('');
//   const [modalCity, setModalCity] = useState('');
//   const [modalCampus, setModalCampus] = useState('');

//   // Global search trigger
//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//   };

//   const handleSelectSchool = (schoolId: string | null) => {
//     setSelectedSchoolId(schoolId);
//     // Use navigate to clear course sub views safely if switching tracks
//     if (id) navigate('/');
//   };

//   React.useEffect(() => {
//     const school = searchParams.get("school");

//     if (school) {
//       setSelectedSchoolId(school);

//       setTimeout(() => {
//         const coursesSection =
//           document.getElementById("courses");

//         if (coursesSection) {
//           coursesSection.scrollIntoView({
//             behavior: "smooth",
//           });
//         }
//       }, 300);
//     }
//   }, [searchParams]);

//   // FIX 1: Enhanced navigation function that ensures the DOM element exists 
//   // after transitioning away from the Course Detail View.
//   const handleNavigate = (sectionId: string) => {
//     // 1. Immediately drop the subpage view to mount home sections using URL path resets
//     navigate('/');
    
//     // 2. Use a recursive check or structured timeout to let DOM render completely
//     const scrollToTarget = (attempts = 0) => {
//       const el = document.getElementById(sectionId);
//       if (el) {
//         // Offset scrolling slightly if you have a sticky header (e.g., 80px layout block)
//         const yOffset = -80; 
//         const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
//         window.scrollTo({ top: y, behavior: 'smooth' });
//       } else if (attempts < 5) {
//         // Re-try up to 5 times if DOM is sluggish
//         setTimeout(() => scrollToTarget(attempts + 1), 50);
//       }
//     };

//     // Initial delay trigger
//     setTimeout(() => scrollToTarget(), 100);
//   };

//   // FIX 2: Explicit function to clear inner views and snap completely back to the main viewport
//   const handleGoHome = () => {
//     setSelectedSchoolId(null);
//     setSearchQuery('');
//     navigate('/'); // 4. CLEAR dynamic param to mount standard home views
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Open apply modal window with optional pre-selected course
//   const handleOpenApplyModal = (course?: Course) => {
//     if (course) {
//       setModalSelectedCourse(course);
//       setModalFormData(prev => ({
//         ...prev,
//         selectedSchool: course.schoolId,
//         selectedCourse: course.id
//       }));
//     } else {
//       setModalSelectedCourse(null);
//     }
//     setModalCountry('');
//     setModalCity('');
//     setModalCampus('');
//     setIsModalSubmitted(false);
//     setIsApplyModalOpen(true);
//   };

//   const handleModalFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setModalFormData(prev => {
//       const updated = { ...prev, [name]: value };
//       if (name === 'selectedSchool') {
//         const matching = COURSES.filter(c => c.schoolId === value);
//         updated.selectedCourse = matching.length > 0 ? matching[0].id : '';
//       }
//       return updated;
//     });
//   };

//   const handleModalSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!modalFormData.fullName || !modalFormData.email || !modalFormData.phone) {
//       alert('Please fill out all required fields.');
//       return;
//     }
//     setIsModalSubmitted(true);
//     // Success timeout dismissal
//     setTimeout(() => {
//       setIsApplyModalOpen(false);
//       setIsModalSubmitted(false);
//       setModalCountry('');
//       setModalCity('');
//       setModalCampus('');
//       setModalFormData({
//         fullName: '',
//         email: '',
//         phone: '',
//         selectedSchool: 'tech-ai',
//         selectedCourse: '',
//         mode: 'Classroom',
//         experienceLevel: 'Fresh Graduate',
//         message: ''
//       });
//     }, 4500);
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-800 font-sans leading-normal selection:bg-blue-100 selection:text-blue-900" id="main-bia-app">
      
//       {/* 1. Header Navigation Bar */}
//       <Header 
//         onSearch={handleSearch}
//         onSelectSchool={handleSelectSchool}
//         selectedSchoolId={selectedSchoolId}
//         onNavigate={handleNavigate}
//         onOpenApplyModal={() => handleOpenApplyModal()}
//       />
  
//       {activeCourseDetail ? (
//         <CourseDetailView
//           course={activeCourseDetail}
//           onBackToCatalog={handleGoHome} // Satisfies interface profiles safely
//           onOpenApplyModal={handleOpenApplyModal}
//         />
//       ) : (
//         <>
//           {/* 2. Main Hero Area with Callback Form */}
//           <Hero
//             onInquirySubmit={(data) => {
//               console.log('Enquiry received:', data);
//             }}
//             selectedSchoolId={selectedSchoolId}
//             onSelectSchool={handleSelectSchool}
//           />

//           {/* 3. General Placement Stats and Logos Section */}
//           <StatsSection />

//           {/* 4. Active Course Catalog with Syllabus drawers */}
//           <CourseCatalog
//             searchQuery={searchQuery}
//             selectedSchoolId={selectedSchoolId}
//             onSelectSchool={handleSelectSchool}
//             onOpenApplyModal={handleOpenApplyModal}
//             onViewCourseDetail={(course) => {
//               // 5. UPDATE: Push route updates to layout frame instead of local variable state
//               navigate(`/course/${course.id}`);
//               window.scrollTo({ top: 0, behavior: 'smooth' });
//             }}
//           />

//           {/* 5. Career Advisor Bot Interface Container */}
//           <VirtualAdvisor
//             onSelectCourse={(courseId) => {
//               const selected = COURSES.find(c => c.id === courseId);
//               if (selected) {
//                 setSelectedSchoolId(selected.schoolId);
//                 // 6. UPDATE: Bot selections also leverage paths
//                 navigate(`/course/${selected.id}`);
//                 window.scrollTo({ top: 0, behavior: 'smooth' });
//               }
//             }}
//             onOpenApplyModal={handleOpenApplyModal}
//           />

//           {/* 6. High-Trust Testimonials & Reviews Grid */}
//           <section id="bia-advantage" className="scroll-mt-20">
//             <Testimonials />
//           </section>
        
//           {/* 7. Selective Admissions Roadmap & Campus coordinations */}
//           <AdmissionsSection />
          
//           {/* 7. Banner Stations */}
//           <BannerStations />
//         </>
//       )}

//       {/* 8. Corporate Footer Zone with Credentials and Campus details */}
//       {/* <Footer onNavigate={handleNavigate} /> */}
  
//       {/* 9. Apply Dynamic Modal Pop Up Screen Overlay */}
//       {isApplyModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm" id="apply-overlay">
//           <div className="relative w-full max-w-[340px] rounded-xl border border-slate-100 bg-white p-4 sm:p-5 shadow-2xl max-h-[85vh] overflow-y-auto">
            
//             {/* Close trigger button */}
//             <button
//               onClick={() => setIsApplyModalOpen(false)}
//               className="absolute top-3 right-3 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-800 transition-colors outline-none cursor-pointer"
//               aria-label="Close"
//             >
//               <X className="h-4.5 w-4.5 font-light" />
//             </button>

//             {isModalSubmitted ? (
//               <div className="py-4 text-center space-y-2.5">
//                 <div className="mx-auto h-9 w-9 flex items-center justify-center rounded-full bg-[#00005d]/10 text-[#00005d] mb-1">
//                   <CheckCircle2 className="h-5 w-5" />
//                 </div>
//                 <h3 className="text-base font-bold text-[#0a1d4a]">Enquiry Submitted!</h3>
//                 <p className="text-[11px] text-slate-600 leading-normal px-1">
//                   Thank you <span className="font-bold text-[#00005d]">{modalFormData.fullName}</span>. One of our regional educational experts will contact you soon on <span className="font-semibold text-slate-900">{modalFormData.phone}</span>.
//                 </p>
//                 <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100 text-left text-[10px] text-slate-600 space-y-0.5 max-w-sm mx-auto">
//                   <p>• <strong>Selected Program:</strong> {COURSES.find(c => c.id === modalFormData.selectedCourse)?.title || "General Advisement"}</p>
//                   <p>• <strong>Location Assigned:</strong> {modalCity ? `${modalCity}, ${modalCountry}` : "Online Division"}</p>
//                   <p>• <strong>Nearest Center:</strong> {modalCampus || "Virtual"}</p>
//                 </div>
//                 <div className="pt-0.5">
//                   <span className="inline-block rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-bold text-[#00005d] animate-pulse">
//                     Priority Ticket Created
//                   </span>
//                 </div>
//               </div>
//             ) : (
//               <form onSubmit={handleModalSubmit} className="space-y-2 pt-1">
                
//                 {/* Header text */}
//                 <div className="text-center pb-0.5">
//                   <h3 className="text-lg font-extrabold text-[#0a1d4a] tracking-tight">
//                     Talk to our expert
//                   </h3>
//                   <p className="text-[10px] text-slate-500 font-medium">
//                     Please share your details and we will reach out to you soon.
//                   </p>
//                 </div>

//                 {/* 1. Select Course */}
//                 <div className="relative">
//                   <select
//                     name="selectedCourse"
//                     required
//                     value={modalFormData.selectedCourse}
//                     onChange={handleModalFormChange}
//                     className="w-full h-8 pl-2.5 pr-7 rounded-md border border-slate-200 bg-white text-[11px] text-slate-700 outline-none focus:border-[#00005d] focus:ring-1 focus:ring-[#00005d] appearance-none transition-all cursor-pointer"
//                   >
//                     <option value="" className="text-slate-400">Select Course</option>
//                     {COURSES.map(course => (
//                       <option key={course.id} value={course.id}>
//                         {course.title}
//                       </option>
//                     ))}
//                   </select>
//                   <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-slate-400">
//                     <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </div>
//                 </div>

//                 {/* 2. Full Name Input */}
//                 <div>
//                   <input
//                     type="text"
//                     name="fullName"
//                     required
//                     placeholder="Full Name"
//                     value={modalFormData.fullName}
//                     onChange={handleModalFormChange}
//                     className="w-full h-8 px-2.5 rounded-md border border-slate-200 bg-white text-[11px] text-slate-700 outline-none focus:border-[#00005d] focus:ring-1 focus:ring-[#00005d] transition-all"
//                   />
//                 </div>

//                 {/* 3. Email Input */}
//                 <div>
//                   <input
//                     type="email"
//                     name="email"
//                     required
//                     placeholder="Email"
//                     value={modalFormData.email}
//                     onChange={handleModalFormChange}
//                     className="w-full h-8 px-2.5 rounded-md border border-slate-200 bg-white text-[11px] text-slate-700 outline-none focus:border-[#00005d] focus:ring-1 focus:ring-[#00005d] transition-all"
//                   />
//                 </div>

//                 {/* 4. Phone Input */}
//                 <div>
//                   <input
//                     type="tel"
//                     name="phone"
//                     required
//                     placeholder="Phone"
//                     value={modalFormData.phone}
//                     onChange={handleModalFormChange}
//                     className="w-full h-8 px-2.5 rounded-md border border-slate-200 bg-white text-[11px] text-slate-700 outline-none focus:border-[#00005d] focus:ring-1 focus:ring-[#00005d] transition-all"
//                   />
//                 </div>

//                 {/* 5. Select Your Country */}
//                 <div className="relative">
//                   <select
//                     required
//                     value={modalCountry}
//                     onChange={(e) => {
//                       setModalCountry(e.target.value);
//                       setModalCity('');
//                       setModalCampus('');
//                     }}
//                     className="w-full h-8 pl-2.5 pr-7 rounded-md border border-slate-200 bg-white text-[11px] text-slate-700 outline-none focus:border-[#00005d] focus:ring-1 focus:ring-[#00005d] appearance-none transition-all cursor-pointer"
//                   >
//                     <option value="">Select Your Country</option>
//                     <option value="United States">United States</option>
//                     <option value="United Kingdom">United Kingdom</option>
//                     <option value="United Arab Emirates">United Arab Emirates</option>
//                     <option value="Singapore">Singapore</option>
//                     <option value="India">India</option>
//                     <option value="France">France</option>
//                     <option value="Australia">Australia</option>
//                   </select>
//                   <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-slate-400">
//                     <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </div>
//                 </div>

//                 {/* 6. Select Your City */}
//                 <div className="relative">
//                   <select
//                     required
//                     value={modalCity}
//                     onChange={(e) => {
//                       setModalCity(e.target.value);
//                       const cityToCampusMap: Record<string, string> = {
//                         'Boston': 'Boston Headquarters Campus',
//                         'London': 'London Canary Wharf Campus',
//                         'Dubai': 'Dubai Knowledge Park Campus',
//                         'Singapore': 'Singapore Temasek Campus',
//                         'Mumbai': 'Mumbai BKC Campus',
//                         'Paris': 'Paris Ségur Campus',
//                         'Sydney': 'Sydney O\'Connell Campus'
//                       };
//                       if (cityToCampusMap[e.target.value]) {
//                         setModalCampus(cityToCampusMap[e.target.value]);
//                       }
//                     }}
//                     className="w-full h-8 pl-2.5 pr-7 rounded-md border border-slate-200 bg-white text-[11px] text-slate-700 outline-none focus:border-[#00005d] focus:ring-1 focus:ring-[#00005d] appearance-none transition-all cursor-pointer relative z-10"
//                   >
//                     <option value="">Select Your City</option>
//                     {modalCountry === 'United States' && <option value="Boston">Boston</option>}
//                     {modalCountry === 'United Kingdom' && <option value="London">London</option>}
//                     {modalCountry === 'United Arab Emirates' && <option value="Dubai">Dubai</option>}
//                     {modalCountry === 'Singapore' && <option value="Singapore">Singapore</option>}
//                     {modalCountry === 'India' && <option value="Mumbai">Mumbai</option>}
//                     {modalCountry === 'France' && <option value="Paris">Paris</option>}
//                     {modalCountry === 'Australia' && <option value="Sydney">Sydney</option>}
//                     {!modalCountry && (
//                       <>
//                         <option value="Boston">Boston</option>
//                         <option value="London">London</option>
//                         <option value="Dubai">Dubai</option>
//                         <option value="Singapore">Singapore</option>
//                         <option value="Mumbai">Mumbai</option>
//                         <option value="Paris">Paris</option>
//                         <option value="Sydney">Sydney</option>
//                       </>
//                     )}
//                   </select>
//                   <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-slate-400 z-20">
//                     <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </div>
//                 </div>

//                 {/* 7. Nearest Campus */}
//                 <div className="relative">
//                   <select
//                     required
//                     value={modalCampus}
//                     onChange={(e) => setModalCampus(e.target.value)}
//                     className="w-full h-8 pl-2.5 pr-7 rounded-md border border-slate-200 bg-white text-[11px] text-slate-700 outline-none focus:border-[#00005d] focus:ring-1 focus:ring-[#00005d] appearance-none transition-all cursor-pointer relative z-10"
//                   >
//                     <option value="">Nearest Campus</option>
//                     <option value="Boston Headquarters Campus">Boston Headquarters Campus</option>
//                     <option value="London Canary Wharf Campus">London Canary Wharf Campus</option>
//                     <option value="Dubai Knowledge Park Campus">Dubai Knowledge Park Campus</option>
//                     <option value="Singapore Temasek Campus">Singapore Temasek Campus</option>
//                     <option value="Mumbai BKC Campus">Mumbai BKC Campus</option>
//                     <option value="Paris Ségur Campus">Paris Ségur Campus</option>
//                     <option value="Sydney O'Connell Campus">Sydney O'Connell Campus</option>
//                     <option value="Online Virtual Classroom">Online Virtual Classroom</option>
//                   </select>
//                   <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-slate-400 z-20">
//                     <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </div>
//                 </div>

//                 {/* Centered CTA Submit Button */}
//                 <div className="pt-1 text-center">
//                   <button
//                     type="submit"
//                     className="w-full bg-[#00005d] hover:bg-[#000044] text-[#ffffff] font-extrabold text-[11px] tracking-wide h-8 rounded-md transition-all cursor-pointer hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00005d] block mx-auto select-none"
//                   >
//                     Enquire Now
//                   </button>
//                 </div>

//               </form>
//             )}

//           </div>
//         </div>
//       )}

//     </div>
//   );
// }




// /**
//  * @license
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import React, { useState, useEffect } from 'react';
// // IMPORT hooks from react-router-dom to read and write URL updates
// import { useParams, useNavigate, useSearchParams, useLocation } from 'react-router-dom';

// import Header from './Header';
// import Hero from './Hero';
// import StatsSection from './StatsSection';
// import CourseCatalog from './CourseCatalog';
// import Testimonials from './Testimonials';
// import AdmissionsSection from './AdmissionsSection';
// import VirtualAdvisor from './VirtualAdvisor';
// import CourseDetailView from './CourseDetailView';
// import BannerStations from './BannerStations';
// import Footer from './Footer';

// import { Course, InquiryForm } from '../types';
// import { SCHOOLS, COURSES } from '../data';
// import { Mail, Phone, MapPin, Star, Sparkles, X, ChevronRight, CheckCircle2, ShieldCheck, GraduationCap } from 'lucide-react';

// export default function HomePage() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [searchParams] = useSearchParams();
//   const [searchQuery, setSearchQuery] = useState('');
//   const schoolFromUrl = searchParams.get("school");

//   const [selectedSchoolId, setSelectedSchoolId] =
//     useState<string | null>(schoolFromUrl);
  
//   // Derived state fetches item from URL index instead of local state hooks
//   const activeCourseDetail = COURSES.find(c => c.id === id) || null;
  
//   // Modal State Control
//   const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
//   const [modalSelectedCourse, setModalSelectedCourse] = useState<Course | null>(null);
//   const [modalFormData, setModalFormData] = useState<InquiryForm>({
//     fullName: '',
//     email: '',
//     phone: '',
//     selectedSchool: 'tech-ai',
//     selectedCourse: '',
//     mode: 'Classroom',
//     experienceLevel: 'Fresh Graduate',
//     message: ''
//   });
//   const [isModalSubmitted, setIsModalSubmitted] = useState(false);
//   const [modalCountry, setModalCountry] = useState('');
//   const [modalCity, setModalCity] = useState('');
//   const [modalCampus, setModalCampus] = useState('');

//   // Global search trigger
//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//   };

//   const handleSelectSchool = (schoolId: string | null) => {
//     setSelectedSchoolId(schoolId);
//     if (id) navigate('/');
//   };

//   // --- BULLETPROOF CROSS-PAGE SMOOTH SCROLL RESTORATION ENGINE ---
//   useEffect(() => {
//     const hasScrollStateSignal = location.state && (location.state as any).forceScrollToCatalog;
//     const urlSchoolQuery = searchParams.get("school");

//     if (hasScrollStateSignal || urlSchoolQuery) {
//       const targetSchoolId = hasScrollStateSignal 
//         ? (location.state as any).targetSchoolId 
//         : urlSchoolQuery;
      
//       // Sync programmatic school filter states instantly
//       setSelectedSchoolId(targetSchoolId);

//       // Force-disable the browser's aggressive native layout jumping behavior
//       if ('scrollRestoration' in window.history) {
//         window.history.scrollRestoration = 'manual';
//       }

//       let hasExecutedScroll = false;

//       // Watch DOM bounds mutations as heavy components (Hero/Videos) render completely
//       const layoutObserver = new ResizeObserver(() => {
//         const targetElement = document.getElementById('courses');
//         if (targetElement) {
//           const rect = targetElement.getBoundingClientRect();
          
//           // Verify that element sections have a valid programmatic screen rendering presence
//           if (rect.top !== 0 || rect.height > 0) {
//             const yOffset = -70;
//             const absoluteY = rect.top + window.pageYOffset + yOffset;

//             window.scrollTo({
//               top: absoluteY,
//               behavior: 'smooth'
//             });

//             hasExecutedScroll = true;
//             layoutObserver.disconnect(); // Turn off listener to enable normal browsing interaction
//           }
//         }
//       });

//       layoutObserver.observe(document.body);

//       // Secure Fallback timer for sluggish browser client processing speeds
//       const fallbackTimer = setTimeout(() => {
//         if (!hasExecutedScroll) {
//           const targetElement = document.getElementById('courses');
//           if (targetElement) {
//             const yOffset = -70;
//             const absoluteY = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
//             window.scrollTo({ top: absoluteY, behavior: 'smooth' });
//           }
//           layoutObserver.disconnect();
//         }
        
//         // Restore standard layout scrolling configurations for natural page routing
//         if ('scrollRestoration' in window.history) {
//           window.history.scrollRestoration = 'auto';
//         }
//         // Flush navigation state history packet clean
//         window.history.replaceState({}, document.title);
//       }, 600);

//       return () => {
//         layoutObserver.disconnect();
//         clearTimeout(fallbackTimer);
//       };
//     }
//   }, [location, searchParams]);

//   // Enhanced navigation function that ensures the DOM element exists after transitioning away from Course Detail
//   const handleNavigate = (sectionId: string) => {
//     navigate('/');
    
//     const scrollToTarget = (attempts = 0) => {
//       const el = document.getElementById(sectionId);
//       if (el) {
//         const yOffset = -80; 
//         const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
//         window.scrollTo({ top: y, behavior: 'smooth' });
//       } else if (attempts < 5) {
//         setTimeout(() => scrollToTarget(attempts + 1), 50);
//       }
//     };

//     setTimeout(() => scrollToTarget(), 100);
//   };

//   // Explicit function to clear inner views and snap completely back to the main viewport
//   const handleGoHome = () => {
//     setSelectedSchoolId(null);
//     setSearchQuery('');
//     navigate('/'); 
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Open apply modal window with optional pre-selected course
//   const handleOpenApplyModal = (course?: Course) => {
//     if (course) {
//       setModalSelectedCourse(course);
//       setModalFormData(prev => ({
//         ...prev,
//         selectedSchool: course.schoolId,
//         selectedCourse: course.id
//       }));
//     } else {
//       setModalSelectedCourse(null);
//     }
//     setModalCountry('');
//     setModalCity('');
//     setModalCampus('');
//     setIsModalSubmitted(false);
//     setIsApplyModalOpen(true);
//   };

//   const handleModalFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setModalFormData(prev => {
//       const updated = { ...prev, [name]: value };
//       if (name === 'selectedSchool') {
//         const matching = COURSES.filter(c => c.schoolId === value);
//         updated.selectedCourse = matching.length > 0 ? matching[0].id : '';
//       }
//       return updated;
//     });
//   };

//   const handleModalSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!modalFormData.fullName || !modalFormData.email || !modalFormData.phone) {
//       alert('Please fill out all required fields.');
//       return;
//     }
//     setIsModalSubmitted(true);
//     setTimeout(() => {
//       setIsApplyModalOpen(false);
//       setIsModalSubmitted(false);
//       setModalCountry('');
//       setModalCity('');
//       setModalCampus('');
//       setModalFormData({
//         fullName: '',
//         email: '',
//         phone: '',
//         selectedSchool: 'tech-ai',
//         selectedCourse: '',
//         mode: 'Classroom',
//         experienceLevel: 'Fresh Graduate',
//         message: ''
//       });
//     }, 4500);
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-800 font-sans leading-normal selection:bg-blue-100 selection:text-blue-900" id="main-bia-app">
      
//       {/* Header Navigation Bar */}
//       <Header 
//         onSearch={handleSearch}
//         onSelectSchool={handleSelectSchool}
//         selectedSchoolId={selectedSchoolId}
//         onNavigate={handleNavigate}
//         onOpenApplyModal={() => handleOpenApplyModal()}
//       />
  
//       {activeCourseDetail ? (
//         <CourseDetailView
//           course={activeCourseDetail}
//           onBackToCatalog={handleGoHome} 
//           onOpenApplyModal={handleOpenApplyModal}
//         />
//       ) : (
//         <>
//           {/* Main Hero Area with Callback Form */}
//           <Hero
//             onInquirySubmit={(data) => {
//               console.log('Enquiry received:', data);
//             }}
//             selectedSchoolId={selectedSchoolId}
//             onSelectSchool={handleSelectSchool}
//           />

//           {/* General Placement Stats and Logos Section */}
//           <StatsSection />

//           {/* Active Course Catalog Wrapper with explicit ID hook */}
//           <div id="courses" className="scroll-mt-20">
//             <CourseCatalog
//               searchQuery={searchQuery}
//               selectedSchoolId={selectedSchoolId}
//               onSelectSchool={handleSelectSchool}
//               onOpenApplyModal={handleOpenApplyModal}
//               onViewCourseDetail={(course) => {
//                 navigate(`/course/${course.id}`);
//                 window.scrollTo({ top: 0, behavior: 'smooth' });
//               }}
//             />
//           </div>

//           {/* Career Advisor Bot Interface Container */}
//           <VirtualAdvisor
//             onSelectCourse={(courseId) => {
//               const selected = COURSES.find(c => c.id === courseId);
//               if (selected) {
//                 setSelectedSchoolId(selected.schoolId);
//                 navigate(`/course/${selected.id}`);
//                 window.scrollTo({ top: 0, behavior: 'smooth' });
//               }
//             }}
//             onOpenApplyModal={handleOpenApplyModal}
//           />

//           {/* High-Trust Testimonials & Reviews Grid */}
//           <section id="bia-advantage" className="scroll-mt-20">
//             <Testimonials />
//           </section>
        
//           {/* Selective Admissions Roadmap & Campus coordinations */}
//           <AdmissionsSection />
          
//           {/* Banner Stations */}
//           <BannerStations />
//         </>
//       )}

//       {/* Corporate Footer Zone */}
//       {/* <Footer onNavigate={handleNavigate} /> */}
  
//       {/* Apply Dynamic Modal Pop Up Screen Overlay */}
//       {isApplyModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm" id="apply-overlay">
//           <div className="relative w-full max-w-[340px] rounded-xl border border-slate-100 bg-white p-4 sm:p-5 shadow-2xl max-h-[85vh] overflow-y-auto">
            
//             <button
//               onClick={() => setIsApplyModalOpen(false)}
//               className="absolute top-3 right-3 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-800 transition-colors outline-none cursor-pointer"
//               aria-label="Close"
//             >
//               <X className="h-4.5 w-4.5 font-light" />
//             </button>

//             {isModalSubmitted ? (
//               <div className="py-4 text-center space-y-2.5">
//                 <div className="mx-auto h-9 w-9 flex items-center justify-center rounded-full bg-[#00005d]/10 text-[#00005d] mb-1">
//                   <CheckCircle2 className="h-5 w-5" />
//                 </div>
//                 <h3 className="text-base font-bold text-[#0a1d4a]">Enquiry Submitted!</h3>
//                 <p className="text-[11px] text-slate-600 leading-normal px-1">
//                   Thank you <span className="font-bold text-[#00005d]">{modalFormData.fullName}</span>. One of our regional educational experts will contact you soon on <span className="font-semibold text-slate-900">{modalFormData.phone}</span>.
//                 </p>
//                 <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100 text-left text-[10px] text-slate-600 space-y-0.5 max-w-sm mx-auto">
//                   <p>• <strong>Selected Program:</strong> {COURSES.find(c => c.id === modalFormData.selectedCourse)?.title || "General Advisement"}</p>
//                   <p>• <strong>Location Assigned:</strong> {modalCity ? `${modalCity}, ${modalCountry}` : "Online Division"}</p>
//                   <p>• <strong>Nearest Center:</strong> {modalCampus || "Virtual"}</p>
//                 </div>
//                 <div className="pt-0.5">
//                   <span className="inline-block rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-bold text-[#00005d] animate-pulse">
//                     Priority Ticket Created
//                   </span>
//                 </div>
//               </div>
//             ) : (
//               <form onSubmit={handleModalSubmit} className="space-y-2 pt-1">
//                 <div className="text-center pb-0.5">
//                   <h3 className="text-lg font-extrabold text-[#0a1d4a] tracking-tight">
//                     Talk to our expert
//                   </h3>
//                   <p className="text-[10px] text-slate-500 font-medium">
//                     Please share your details and we will reach out to you soon.
//                   </p>
//                 </div>

//                 <div className="relative">
//                   <select
//                     name="selectedCourse"
//                     required
//                     value={modalFormData.selectedCourse}
//                     onChange={handleModalFormChange}
//                     className="w-full h-8 pl-2.5 pr-7 rounded-md border border-slate-200 bg-white text-[11px] text-slate-700 outline-none focus:border-[#00005d] focus:ring-1 focus:ring-[#00005d] appearance-none transition-all cursor-pointer"
//                   >
//                     <option value="" className="text-slate-400">Select Course</option>
//                     {COURSES.map(course => (
//                       <option key={course.id} value={course.id}>
//                         {course.title}
//                       </option>
//                     ))}
//                   </select>
//                   <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-slate-400">
//                     <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </div>
//                 </div>

//                 <div>
//                   <input
//                     type="text"
//                     name="fullName"
//                     required
//                     placeholder="Full Name"
//                     value={modalFormData.fullName}
//                     onChange={handleModalFormChange}
//                     className="w-full h-8 px-2.5 rounded-md border border-slate-200 bg-white text-[11px] text-slate-700 outline-none focus:border-[#00005d] focus:ring-1 focus:ring-[#00005d] transition-all"
//                   />
//                 </div>

//                 <div>
//                   <input
//                     type="email"
//                     name="email"
//                     required
//                     placeholder="Email"
//                     value={modalFormData.email}
//                     onChange={handleModalFormChange}
//                     className="w-full h-8 px-2.5 rounded-md border border-slate-200 bg-white text-[11px] text-slate-700 outline-none focus:border-[#00005d] focus:ring-1 focus:ring-[#00005d] transition-all"
//                   />
//                 </div>

//                 <div>
//                   <input
//                     type="tel"
//                     name="phone"
//                     required
//                     placeholder="Phone"
//                     value={modalFormData.phone}
//                     onChange={handleModalFormChange}
//                     className="w-full h-8 px-2.5 rounded-md border border-slate-200 bg-white text-[11px] text-slate-700 outline-none focus:border-[#00005d] focus:ring-1 focus:ring-[#00005d] transition-all"
//                   />
//                 </div>

//                 <div className="relative">
//                   <select
//                     required
//                     value={modalCountry}
//                     onChange={(e) => {
//                       setModalCountry(e.target.value);
//                       setModalCity('');
//                       setModalCampus('');
//                     }}
//                     className="w-full h-8 pl-2.5 pr-7 rounded-md border border-slate-200 bg-white text-[11px] text-slate-700 outline-none focus:border-[#00005d] focus:ring-1 focus:ring-[#00005d] appearance-none transition-all cursor-pointer"
//                   >
//                     <option value="">Select Your Country</option>
//                     <option value="United States">United States</option>
//                     <option value="United Kingdom">United Kingdom</option>
//                     <option value="United Arab Emirates">United Arab Emirates</option>
//                     <option value="Singapore">Singapore</option>
//                     <option value="India">India</option>
//                     <option value="France">France</option>
//                     <option value="Australia">Australia</option>
//                   </select>
//                   <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-slate-400">
//                     <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </div>
//                 </div>

//                 <div className="relative">
//                   <select
//                     required
//                     value={modalCity}
//                     onChange={(e) => {
//                       setModalCity(e.target.value);
//                       const cityToCampusMap: Record<string, string> = {
//                         'Boston': 'Boston Headquarters Campus',
//                         'London': 'London Canary Wharf Campus',
//                         'Dubai': 'Dubai Knowledge Park Campus',
//                         'Singapore': 'Singapore Temasek Campus',
//                         'Mumbai': 'Mumbai BKC Campus',
//                         'Paris': 'Paris Ségur Campus',
//                         'Sydney': 'Sydney O\'Connell Campus'
//                       };
//                       if (cityToCampusMap[e.target.value]) {
//                         setModalCampus(cityToCampusMap[e.target.value]);
//                       }
//                     }}
//                     className="w-full h-8 pl-2.5 pr-7 rounded-md border border-slate-200 bg-white text-[11px] text-slate-700 outline-none focus:border-[#00005d] focus:ring-1 focus:ring-[#00005d] appearance-none transition-all cursor-pointer relative z-10"
//                   >
//                     <option value="">Select Your City</option>
//                     {modalCountry === 'United States' && <option value="Boston">Boston</option>}
//                     {modalCountry === 'United Kingdom' && <option value="London">London</option>}
//                     {modalCountry === 'United Arab Emirates' && <option value="Dubai">Dubai</option>}
//                     {modalCountry === 'Singapore' && <option value="Singapore">Singapore</option>}
//                     {modalCountry === 'India' && <option value="Mumbai">Mumbai</option>}
//                     {modalCountry === 'France' && <option value="Paris">Paris</option>}
//                     {modalCountry === 'Australia' && <option value="Sydney">Sydney</option>}
//                     {!modalCountry && (
//                       <>
//                         <option value="Boston">Boston</option>
//                         <option value="London">London</option>
//                         <option value="Dubai">Dubai</option>
//                         <option value="Singapore">Singapore</option>
//                         <option value="Mumbai">Mumbai</option>
//                         <option value="Paris">Paris</option>
//                         <option value="Sydney">Sydney</option>
//                       </>
//                     )}
//                   </select>
//                   <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-slate-400 z-20">
//                     <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </div>
//                 </div>

//                 <div className="relative">
//                   <select
//                     required
//                     value={modalCampus}
//                     onChange={(e) => setModalCampus(e.target.value)}
//                     className="w-full h-8 pl-2.5 pr-7 rounded-md border border-slate-200 bg-white text-[11px] text-slate-700 outline-none focus:border-[#00005d] focus:ring-1 focus:ring-[#00005d] appearance-none transition-all cursor-pointer relative z-10"
//                   >
//                     <option value="">Nearest Campus</option>
//                     <option value="Boston Headquarters Campus">Boston Headquarters Campus</option>
//                     <option value="London Canary Wharf Campus">London Canary Wharf Campus</option>
//                     <option value="Dubai Knowledge Park Campus">Dubai Knowledge Park Campus</option>
//                     <option value="Singapore Temasek Campus">Singapore Temasek Campus</option>
//                     <option value="Mumbai BKC Campus">Mumbai BKC Campus</option>
//                     <option value="Paris Ségur Campus">Paris Ségur Campus</option>
//                     <option value="Sydney O'Connell Campus">Sydney O'Connell Campus</option>
//                     <option value="Online Virtual Classroom">Online Virtual Classroom</option>
//                   </select>
//                   <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-slate-400 z-20">
//                     <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </div>
//                 </div>

//                 <div className="pt-1 text-center">
//                   <button
//                     type="submit"
//                     className="w-full bg-[#00005d] hover:bg-[#000044] text-[#ffffff] font-extrabold text-[11px] tracking-wide h-8 rounded-md transition-all cursor-pointer hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00005d] block mx-auto select-none"
//                   >
//                     Enquire Now
//                   </button>
//                 </div>
//               </form>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, useLocation } from 'react-router-dom';

import Header from './Header';
import Hero from './Hero';
import StatsSection from './StatsSection';
import CourseCatalog from './CourseCatalog';
import Testimonials from './Testimonials';
import AdmissionsSection from './AdmissionsSection';
import VirtualAdvisor from './VirtualAdvisor';
import CourseDetailView from './CourseDetailView';
import BannerStations from './BannerStations';

import { Course, InquiryForm } from '../types';
import { SCHOOLS, COURSES } from '../data';
import { Mail, Phone, MapPin, Star, Sparkles, X, ChevronRight, CheckCircle2, ShieldCheck, GraduationCap } from 'lucide-react';

export default function HomePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const schoolFromUrl = searchParams.get("school");

  const [selectedSchoolId, setSelectedSchoolId] = useState<string | null>(schoolFromUrl);
  
  // Derived state details track active routing definitions
  const activeCourseDetail = COURSES.find(c => c.id === id) || null;
  
  // Modal State Configurations
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [modalSelectedCourse, setModalSelectedCourse] = useState<Course | null>(null);
  const [isEnquireOpen, setIsEnquireOpen] = useState(false);
  const [modalFormData, setModalFormData] = useState<InquiryForm>({
    fullName: '',
    email: '',
    phone: '',
    selectedSchool: 'tech-ai',
    selectedCourse: '',
    mode: 'Classroom',
    experienceLevel: 'Fresh Graduate',
    message: ''
  });
  const [isModalSubmitted, setIsModalSubmitted] = useState(false);
  const [modalCountry, setModalCountry] = useState('');
  const [modalCity, setModalCity] = useState('');
  const [modalCampus, setModalCampus] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSelectSchool = (schoolId: string | null) => {
    setSelectedSchoolId(schoolId);
    if (id) navigate('/');
  };

  // Dynamic Layout Paint Tracking Configuration for Inner Cross-Route Triggers
  useEffect(() => {
    const hasScrollStateSignal = location.state && (location.state as any).forceScrollToCatalog;
    const urlSchoolQuery = searchParams.get("school");

    if (hasScrollStateSignal || urlSchoolQuery) {
      const targetSchoolId = hasScrollStateSignal 
        ? (location.state as any).targetSchoolId 
        : urlSchoolQuery;
      
      setSelectedSchoolId(targetSchoolId);

      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }

      let hasExecutedScroll = false;

      const layoutObserver = new ResizeObserver(() => {
        const targetElement = document.getElementById('courses');
        if (targetElement) {
          const rect = targetElement.getBoundingClientRect();
          
          if (rect.top !== 0 || rect.height > 0) {
            const yOffset = -70;
            const absoluteY = rect.top + window.pageYOffset + yOffset;

            window.scrollTo({
              top: absoluteY,
              behavior: 'smooth'
            });

            hasExecutedScroll = true;
            layoutObserver.disconnect(); 
          }
        }
      });

      layoutObserver.observe(document.body);

      const fallbackTimer = setTimeout(() => {
        if (!hasExecutedScroll) {
          const targetElement = document.getElementById('courses');
          if (targetElement) {
            const yOffset = -70;
            const absoluteY = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: absoluteY, behavior: 'smooth' });
          }
          layoutObserver.disconnect();
        }
        
        if ('scrollRestoration' in window.history) {
          window.history.scrollRestoration = 'auto';
        }
        window.history.replaceState({}, document.title);
      }, 600);

      return () => {
        layoutObserver.disconnect();
        clearTimeout(fallbackTimer);
      };
    }
  }, [location, searchParams]);

  const handleNavigate = (sectionId: string) => {
    navigate('/');
    
    const scrollToTarget = (attempts = 0) => {
      const el = document.getElementById(sectionId);
      if (el) {
        const yOffset = -80; 
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else if (attempts < 5) {
        setTimeout(() => scrollToTarget(attempts + 1), 50);
      }
    };

    setTimeout(() => scrollToTarget(), 100);
  };

  // Back to Home Actions bring viewport back to standard header height 0,0 parameters
  const handleGoHome = () => {
    setSelectedSchoolId(null);
    setSearchQuery('');
    navigate('/'); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenApplyModal = (course?: Course) => {
    if (course) {
      setModalSelectedCourse(course);
      setModalFormData(prev => ({
        ...prev,
        selectedSchool: course.schoolId,
        selectedCourse: course.id
      }));
    } else {
      setModalSelectedCourse(null);
    }
    setModalCountry('');
    setModalCity('');
    setModalCampus('');
    setIsModalSubmitted(false);
    setIsApplyModalOpen(true);
  };

  const handleModalFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setModalFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'selectedSchool') {
        const matching = COURSES.filter(c => c.schoolId === value);
        updated.selectedCourse = matching.length > 0 ? matching[0].id : '';
      }
      return updated;
    });
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalFormData.fullName || !modalFormData.email || !modalFormData.phone) {
      alert('Please fill out all required fields.');
      return;
    }
    setIsModalSubmitted(true);
    setTimeout(() => {
      setIsApplyModalOpen(false);
      setIsModalSubmitted(false);
      setModalCountry('');
      setModalCity('');
      setModalCampus('');
      setModalFormData({
        fullName: '',
        email: '',
        phone: '',
        selectedSchool: 'tech-ai',
        selectedCourse: '',
        mode: 'Classroom',
        experienceLevel: 'Fresh Graduate',
        message: ''
      });
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans leading-normal selection:bg-blue-100 selection:text-blue-900" id="main-bia-app">
      
  
      {activeCourseDetail ? (
        <CourseDetailView
          course={activeCourseDetail}
          onBackToCatalog={handleGoHome} 
          onOpenApplyModal={handleOpenApplyModal}
        />
      ) : (
        <>
          <Hero
            onInquirySubmit={(data) => {
              console.log('Enquiry received:', data);
            }}
            selectedSchoolId={selectedSchoolId}
            onSelectSchool={handleSelectSchool}
          />

          <StatsSection />

          {/* Catalog grid component with specific structural identifier */}
          <div id="courses" className="scroll-mt-20">
            <CourseCatalog
              searchQuery={searchQuery}
              selectedSchoolId={selectedSchoolId}
              onSelectSchool={handleSelectSchool}
              onOpenApplyModal={handleOpenApplyModal}
              onViewCourseDetail={(course) => {
                navigate(`/course/${course.id}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>

          <VirtualAdvisor
            onSelectCourse={(courseId) => {
              const selected = COURSES.find(c => c.id === courseId);
              if (selected) {
                setSelectedSchoolId(selected.schoolId);
                navigate(`/course/${selected.id}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            onOpenApplyModal={handleOpenApplyModal}
          />

          <section id="bia-advantage" className="scroll-mt-20">
            <Testimonials />
          </section>
        
          <AdmissionsSection />
          
          <BannerStations />
        </>
      )}

      {/* <Footer onNavigate={handleNavigate} /> */}
  
      {/* Modal Popup overlay frame elements */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm" id="apply-overlay">
          <div className="relative w-full max-w-[340px] rounded-xl border border-slate-100 bg-white p-4 sm:p-5 shadow-2xl max-h-[85vh] overflow-y-auto">
            
            <button
              onClick={() => setIsApplyModalOpen(false)}
              className="absolute top-3 right-3 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-800 transition-colors outline-none cursor-pointer"
              aria-label="Close"
            >
              <X className="h-4.5 w-4.5 font-light" />
            </button>

            {isModalSubmitted ? (
              <div className="py-4 text-center space-y-2.5">
                <div className="mx-auto h-9 w-9 flex items-center justify-center rounded-full bg-[#00005d]/10 text-[#00005d] mb-1">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-[#0a1d4a]">Enquiry Submitted!</h3>
                <p className="text-[11px] text-slate-600 leading-normal px-1">
                  Thank you <span className="font-bold text-[#00005d]">{modalFormData.fullName}</span>. One of our regional experts will contact you soon on <span className="font-semibold text-slate-900">{modalFormData.phone}</span>.
                </p>
                <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100 text-left text-[10px] text-slate-600 space-y-0.5 max-w-sm mx-auto">
                  <p>• <strong>Selected Program:</strong> {COURSES.find(c => c.id === modalFormData.selectedCourse)?.title || "General Advisement"}</p>
                  <p>• <strong>Location Assigned:</strong> {modalCity ? `${modalCity}, ${modalCountry}` : "Online Division"}</p>
                  <p>• <strong>Nearest Center:</strong> {modalCampus || "Virtual"}</p>
                </div>
                <div className="pt-0.5">
                  <span className="inline-block rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-bold text-[#00005d] animate-pulse">
                    Priority Ticket Created
                  </span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleModalSubmit} className="space-y-2 pt-1">
                <div className="text-center pb-0.5">
                  <h3 className="text-lg font-extrabold text-[#0a1d4a] tracking-tight">
                    Talk to our expert
                  </h3>
                  <p className="text-[10px] text-slate-500 font-medium">
                    Please share your details and we will reach out to you soon.
                  </p>
                </div>

                <div className="relative">
                  <select
                    name="selectedCourse"
                    required
                    value={modalFormData.selectedCourse}
                    onChange={handleModalFormChange}
                    className="w-full h-8 pl-2.5 pr-7 rounded-md border border-slate-200 bg-white text-[11px] text-slate-700 outline-none focus:border-[#00005d] focus:ring-1 focus:ring-[#00005d] appearance-none transition-all cursor-pointer"
                  >
                    <option value="" className="text-slate-400">Select Course</option>
                    {COURSES.map(course => (
                      <option key={course.id} value={course.id}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-slate-400">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="Full Name"
                    value={modalFormData.fullName}
                    onChange={handleModalFormChange}
                    className="w-full h-8 px-2.5 rounded-md border border-slate-200 bg-white text-[11px] text-slate-700 outline-none focus:border-[#00005d] focus:ring-1 focus:ring-[#00005d] transition-all"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                    value={modalFormData.email}
                    onChange={handleModalFormChange}
                    className="w-full h-8 px-2.5 rounded-md border border-slate-200 bg-white text-[11px] text-slate-700 outline-none focus:border-[#00005d] focus:ring-1 focus:ring-[#00005d] transition-all"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Phone"
                    value={modalFormData.phone}
                    onChange={handleModalFormChange}
                    className="w-full h-8 px-2.5 rounded-md border border-slate-200 bg-white text-[11px] text-slate-700 outline-none focus:border-[#00005d] focus:ring-1 focus:ring-[#00005d] transition-all"
                  />
                </div>

                <div className="relative">
                  <select
                    required
                    value={modalCountry}
                    onChange={(e) => {
                      setModalCountry(e.target.value);
                      setModalCity('');
                      setModalCampus('');
                    }}
                    className="w-full h-8 pl-2.5 pr-7 rounded-md border border-slate-200 bg-white text-[11px] text-slate-700 outline-none focus:border-[#00005d] focus:ring-1 focus:ring-[#00005d] appearance-none transition-all cursor-pointer"
                  >
                    <option value="">Select Your Country</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Singapore">Singapore</option>
                    <option value="India">India</option>
                    <option value="France">France</option>
                    <option value="Australia">Australia</option>
                  </select>
                  <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-slate-400">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <select
                    required
                    value={modalCity}
                    onChange={(e) => {
                      setModalCity(e.target.value);
                      const cityToCampusMap: Record<string, string> = {
                        'Boston': 'Boston Headquarters Campus',
                        'London': 'London Canary Wharf Campus',
                        'Dubai': 'Dubai Knowledge Park Campus',
                        'Singapore': 'Singapore Temasek Campus',
                        'Mumbai': 'Mumbai BKC Campus',
                        'Paris': 'Paris Ségur Campus',
                        'Sydney': 'Sydney O\'Connell Campus'
                      };
                      if (cityToCampusMap[e.target.value]) {
                        setModalCampus(cityToCampusMap[e.target.value]);
                      }
                    }}
                    className="w-full h-8 pl-2.5 pr-7 rounded-md border border-slate-200 bg-white text-[11px] text-slate-700 outline-none focus:border-[#00005d] focus:ring-1 focus:ring-[#00005d] appearance-none transition-all cursor-pointer relative z-10"
                  >
                    <option value="">Select Your City</option>
                    {modalCountry === 'United States' && <option value="Boston">Boston</option>}
                    {modalCountry === 'United Kingdom' && <option value="London">London</option>}
                    {modalCountry === 'United Arab Emirates' && <option value="Dubai">Dubai</option>}
                    {modalCountry === 'Singapore' && <option value="Singapore">Singapore</option>}
                    {modalCountry === 'India' && <option value="Mumbai">Mumbai</option>}
                    {modalCountry === 'France' && <option value="Paris">Paris</option>}
                    {modalCountry === 'Australia' && <option value="Sydney">Sydney</option>}
                    {!modalCountry && (
                      <>
                        <option value="Boston">Boston</option>
                        <option value="London">London</option>
                        <option value="Dubai">Dubai</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Paris">Paris</option>
                        <option value="Sydney">Sydney</option>
                      </>
                    )}
                  </select>
                  <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-slate-400 z-20">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <select
                    required
                    value={modalCampus}
                    onChange={(e) => setModalCampus(e.target.value)}
                    className="w-full h-8 pl-2.5 pr-7 rounded-md border border-slate-200 bg-white text-[11px] text-slate-700 outline-none focus:border-[#00005d] focus:ring-1 focus:ring-[#00005d] appearance-none transition-all cursor-pointer relative z-10"
                  >
                    <option value="">Nearest Campus</option>
                    <option value="Boston Headquarters Campus">Boston Headquarters Campus</option>
                    <option value="London Canary Wharf Campus">London Canary Wharf Campus</option>
                    <option value="Dubai Knowledge Park Campus">Dubai Knowledge Park Campus</option>
                    <option value="Singapore Temasek Campus">Singapore Temasek Campus</option>
                    <option value="Mumbai BKC Campus">Mumbai BKC Campus</option>
                    <option value="Paris Ségur Campus">Paris Ségur Campus</option>
                    <option value="Sydney O'Connell Campus">Sydney O'Connell Campus</option>
                    <option value="Online Virtual Classroom">Online Virtual Classroom</option>
                  </select>
                  <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-slate-400 z-20">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div className="pt-1 text-center">
                  <button
                    type="submit"
                    className="w-full bg-[#00005d] hover:bg-[#000044] text-[#ffffff] font-extrabold text-[11px] tracking-wide h-8 rounded-md transition-all cursor-pointer hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00005d] block mx-auto select-none"
                  >
                    Enquire Now
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}