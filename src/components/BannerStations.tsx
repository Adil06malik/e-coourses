import {  useState } from "react";
import worldMap from "..world.png";
import MediaPesent from "./MediaPersent.tsx";
import Brandlogos from "./BrandlogSlide.tsx";


import { 
  BookOpen, 
  ChevronRight, 
  Globe, 
  MapPin, 
  Users, 
  Award, 
  CheckCircle, 
  X, 
  Sparkles, 
  TrendingUp, 
  Laptop, 
  Database 
} from 'lucide-react';

// Interfaces
interface Learner {
  id: number;
  name: string;
  country: string;
  role: string;
  course: string;
  testimonial: string;
  avatar: string;
  borderColor: string;
  position: { top: string; left: string }; // Responsive percentages
}

interface MasterClass {
  id: string;
  title: string;
  duration: string;
  level: string;
  rating: number;
  instructor: string;
  date: string;
  category: 'Data Science' | 'Artificial Intelligence' | 'Cyber Security' | 'Management';
}

const BannerStations: React.FC = () => {
  // State for Enrollment Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string>('Predictive Analytics');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', experience: 'Beginner' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Master Classes Mock Data
  const masterClasses: MasterClass[] = [
    {
      id: 'mc-1',
      title: 'Predictive Analytics & ML Foundations',
      duration: '2 Hours',
      level: 'Beginner Friendly',
      rating: 4.9,
      instructor: 'Dr. Evelyn Harris',
      date: 'This Saturday, 11:00 AM',
      category: 'Data Science'
    },
    {
      id: 'mc-2',
      title: 'Generative AI & LLM Engineering',
      duration: '2.5 Hours',
      level: 'Intermediate',
      rating: 4.8,
      instructor: 'Prof. Marcus Chen',
      date: 'This Sunday, 3:00 PM',
      category: 'Artificial Intelligence'
    },
    {
      id: 'mc-3',
      title: 'Cyber Threat Intelligence & DevSecOps',
      duration: '1.5 Hours',
      level: 'All Levels',
      rating: 4.7,
      instructor: 'Sarah Jenkins, CISSP',
      date: 'Next Tuesday, 7:00 PM',
      category: 'Cyber Security'
    },
    {
      id: 'mc-4',
      title: 'Product Strategy & Business Analytics',
      duration: '2 Hours',
      level: 'Beginner Friendly',
      rating: 4.9,
      instructor: 'David Miller, MBA',
      date: 'Next Thursday, 6:00 PM',
      category: 'Management'
    }
  ];

  // Learners Mock Data
  const learners: Learner[] = [
    {
      id: 1,
      name: "Priya Sharma",
      country: "India",
      role: "Data Analyst at TechCorp",
      course: "Data Science Master Class",
      testimonial: "BIA’s masterclass gave me the perfect blueprint to transition from standard analytics to advanced predictive modeling.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
      borderColor: "border-pink-400 ring-pink-400/30",
      position: { top: "60%", left: "20%" }
    },
    {
      id: 2,
      name: "Mateo Silva",
      country: "Brazil",
      role: "AI Engineer",
      course: "Generative AI Master Class",
      testimonial: "I loved the hands-on code walkthroughs. Very dynamic, engaging, and absolutely state-of-the-art content.",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
      borderColor: "border-blue-400 ring-blue-400/30",
      position: { top: "40%", left: "42%" }
    },
    {
      id: 3,
      name: "Tariq Al-Mansoor",
      country: "Saudi Arabia",
      role: "IT Security Manager",
      course: "Cyber Security Master Class",
      testimonial: "Excellent structure and presentation! The real-world breach scenarios discussed by the mentor were eye-opening.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      borderColor: "border-amber-400 ring-amber-400/30",
      position: { top: "52%", left: "56%" }
    },
    {
      id: 4,
      name: "Clara Dubois",
      country: "France",
      role: "Product Manager",
      course: "Business Analytics Master Class",
      testimonial: "The practical business framework covered in under two hours was worth more than entire online modules I have taken.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      borderColor: "border-indigo-400 ring-indigo-400/30",
      position: { top: "35%", left: "80%" }
    },
    {
      id: 5,
      name: "Liam O'Connor",
      country: "Ireland",
      role: "Solutions Architect",
      course: "Cloud Architectures Master Class",
      testimonial: "Outstanding curriculum depth. Looking forward to enrolling in the full executive program next month!",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      borderColor: "border-emerald-400 ring-emerald-400/30",
      position: { top: "28%", left: "15%" }
    }
  ];

  const handleEnrollClick = (courseTitle: string) => {
    setSelectedClass(courseTitle);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setFormSubmitted(false);
      setFormData({ name: '', email: '', phone: '', experience: 'Beginner' });
    }, 2500);
  };

  const filteredClasses = activeCategory === 'All' 
    ? masterClasses 
    : masterClasses.filter(c => c.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-800 selection:bg-blue-500 selection:text-white">
      
     
      {/* ========================================================= */}
      {/* SECTION 1: GLOBALLY CONNECTED LEARNERS (As in uploaded image 2) */}
      {/* ========================================================= */}


   {/* <GlobalMapSection /> */}

  

        {/* ========================================================= */}
      {/* SECTION 1: MASTER CLASS HERO BANNER (As in uploaded image 1) */}
      {/* ========================================================= */}

    <header className="bg-white py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-slate-900 tracking-tight">
            Accelerate Your Career with Free Masterclasses
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Get practical, hands-on masterclass sessions designed by core industry experts and academic authorities.
          </p>
        </div>
      </header>
      {/* ========================================================= */}
      {/* SECTION 1: MASTER CLASS HERO BANNER (As in uploaded image 1) */}
      {/* ========================================================= */}
      <section id="masterclasses" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-blue-950 rounded-2xl sm:rounded-3xl shadow-xl border border-blue-950 p-6 sm:p-10 lg:p-14">
          
          {/* Animated/Glowing SVGs to emulate the blue wireframe/nodes background */}
          <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              {/* Dynamic Connecting Lines and Nodes */}
              <defs>
                <linearGradient id="grid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2"/>
                  <stop offset="50%" stopColor="#1d4ed8" stopOpacity="0.4"/>
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.1"/>
                </linearGradient>
              </defs>
              <g stroke="url(#grid-grad)" strokeWidth="1">
                {/* Diagonal Network wires imitating the background elements */}
                <line x1="10%" y1="90%" x2="40%" y2="40%" />
                <line x1="40%" y1="40%" x2="20%" y2="10%" />
                <line x1="40%" y1="40%" x2="80%" y2="20%" />
                <line x1="30%" y1="80%" x2="60%" y2="95%" />
                <line x1="80%" y1="20%" x2="95%" y2="80%" />
                <line x1="60%" y1="95%" x2="95%" y2="80%" />
                <line x1="20%" y1="10%" x2="80%" y2="20%" />
              </g>
              {/* Pulsing Dots */}
              <circle cx="10%" cy="90%" r="3" fill="#3b82f6" className="animate-ping" style={{ animationDuration: '4s' }} />
              <circle cx="40%" cy="40%" r="4" fill="#60a5fa" />
              <circle cx="20%" cy="10%" r="3.5" fill="#3b82f6" />
              <circle cx="80%" cy="20%" r="4.5" fill="#93c5fd" />
              <circle cx="95%" cy="80%" r="3" fill="#3b82f6" />
              <circle cx="60%" cy="95%" r="3.5" fill="#60a5fa" />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Text & CTA */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-blue-300 uppercase tracking-widest text-xs font-bold block sm:inline-block">
                  BOSTON INSTITUTE OF ANALYTICS
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                  Explore Free <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-100">
                    Master Classes
                  </span>
                </h2>
              </div>
              
              <p className="text-base sm:text-lg text-blue-100 font-light leading-relaxed max-w-xl">
                Start your learning journey at Boston Institute of Analytics, <strong className="font-semibold text-white">BIA®</strong>, for free with our Free Master Classes across professional training courses.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button 
                  onClick={() => handleEnrollClick(masterClasses[0].title)}
                  className="px-8 py-4 bg-[#FF9900] hover:bg-[#e68a00] active:scale-95 text-white font-bold text-sm tracking-wide rounded-lg shadow-lg hover:shadow-orange-500/20 transition-all duration-150 inline-flex items-center justify-center gap-2 group uppercase"
                >
                  START FOR FREE
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <div className="flex items-center gap-2 text-blue-200 text-xs sm:text-sm pl-1 justify-center sm:justify-start">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>No credit card required</span>
                </div>
              </div>
            </div>

            {/* Right Column: Embedded Card / Class Setting Image */}
            <div className="lg:col-span-6 relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl blur opacity-25"></div>
              <div className="relative bg-white p-2.5 rounded-2xl shadow-2xl">
                
                {/* Classroom Image Container */}
                <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-slate-900 group">
                  <img 
                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80" 
                    alt="BIA Instructor presenting Master Class in clean workspace" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-95"
                    onError={(e) => {
                      // Fallback if image load fails
                      e.currentTarget.src = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80";
                    }}
                  />
                  
              
                </div>
                
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust & Accreditations */}
      {/* ========================================================= */}
      {/* SEAT RESERVATION MODAL FORM */}
      {/* ========================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop blur/shading */}
          <div 
            onClick={() => setIsModalOpen(false)}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
          ></div>

          {/* Modal Container */}
          <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all z-10 animate-scale-up">
            
            {/* Top Bar Styling */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6 relative">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition"
              >
                <X className="w-4 h-4" />
              </button>
              
              <span className="px-2.5 py-0.5 text-[10px] font-bold bg-amber-500 text-slate-950 rounded-full inline-block mb-2 uppercase tracking-wider">
                Limited Seats Available
              </span>
              <h3 className="text-lg sm:text-xl font-bold">Secure Your Master Class Entry</h3>
              <p className="text-xs text-blue-200 mt-1 font-light">
                Join our industry-leading live interactive learning sessions for free.
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {formSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl animate-bounce">
                    ✓
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Seat Reserved Successfully!</h4>
                  <p className="text-sm text-slate-500 max-w-xs mx-auto">
                    We have successfully registered your seat for the <strong className="text-slate-800">{selectedClass}</strong>. 
                    Expect an email containing connection instructions shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  
                  {/* Selected Program Indicator */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                      Target Master Class
                    </label>
                    <select 
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition focus:outline-none"
                    >
                      {masterClasses.map(c => (
                        <option key={c.id} value={c.title}>{c.title}</option>
                      ))}
                    </select>
                  </div>

                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Liam Henderson"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition focus:outline-none"
                    />
                  </div>

                  {/* Email & Phone side by side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        required
                        placeholder="yourname@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                        Phone Number
                      </label>
                      <input 
                        type="tel" 
                        required
                        placeholder="+1 (555) 019-2834"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Prior Experience Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                      Background / Analytics Experience
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Beginner', 'Intermediate', 'Professional'].map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setFormData({...formData, experience: level})}
                          className={`py-2 px-3 text-xs font-semibold rounded-lg border transition ${
                            formData.experience === level 
                              ? 'bg-blue-50 border-blue-500 text-blue-700 font-bold' 
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Consent and submit buttons */}
                  <div className="pt-2 text-[10px] text-slate-400 leading-relaxed">
                    By submitting this form you consent to be contacted by representatives of BIA® with admission details, meeting codes, and curriculum handouts.
                  </div>

                  <button 
                    type="submit"
                    className="w-full mt-4 py-3 bg-[#FF9900] hover:bg-[#e68a00] text-white text-sm font-bold tracking-wider rounded-lg shadow-md transition-transform duration-150 active:scale-[0.98] uppercase"
                  >
                    Confirm My Free Reservation
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      )}

       <MediaPesent />

       <Brandlogos />

    </div>
  );
};

export default BannerStations;

// import React, { useEffect, } from "react";

// interface SimpleLearner {
//   id: number;
//   avatar: string;
//   borderColor: string;
//   position: {
//     top: string;
//     left: string;
//   };
// }

// const GlobalMapSection: React.FC = () => {
//   const mapLearners: SimpleLearner[] = [
//     {
//       id: 1,
//       avatar:
//         "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
//       borderColor: "border-pink-500",
//       position: { top: "32%", left: "18%" },
//     },
//     {
//       id: 2,
//       avatar:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
//       borderColor: "border-blue-500",
//       position: { top: "28%", left: "32%" },
//     },
//     {
//       id: 3,
//       avatar:
//         "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
//       borderColor: "border-emerald-500",
//       position: { top: "68%", left: "28%" },
//     },
//     {
//       id: 4,
//       avatar:
//         "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
//       borderColor: "border-indigo-500",
//       position: { top: "25%", left: "48%" },
//     },
//     {
//       id: 5,
//       avatar:
//         "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
//       borderColor: "border-amber-500",
//       position: { top: "52%", left: "52%" },
//     },
//     {
//       id: 6,
//       avatar:
//         "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80",
//       borderColor: "border-purple-500",
//       position: { top: "36%", left: "62%" },
//     },
//     {
//       id: 7,
//       avatar:
//         "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
//       borderColor: "border-orange-500",
//       position: { top: "42%", left: "72%" },
//     },
//     {
//       id: 8,
//       avatar:
//         "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
//       borderColor: "border-teal-500",
//       position: { top: "30%", left: "84%" },
//     },
//     {
//       id: 9,
//       avatar:
//         "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
//       borderColor: "border-cyan-500",
//       position: { top: "72%", left: "88%" },
//     },
//   ];

//   const [visibleProfiles, setVisibleProfiles] = useState<SimpleLearner[]>([]);

//   useEffect(() => {
//     const updateProfiles = () => {
//       const activeProfiles = mapLearners.filter(
//         () => Math.random() > 0.3
//       );

//       setVisibleProfiles(activeProfiles);
//     };

//     updateProfiles();

//     const interval = setInterval(updateProfiles, 2500);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="w-full bg-white py-12 sm:py-20 border-y border-slate-100 overflow-hidden">
//       {/* Header */}
//       <div className="max-w-7xl mx-auto px-4 text-center mb-10">
//         <h2 className="text-3xl sm:text-5xl font-bold text-slate-900">
//           Our Globally Connected Learning Network
//         </h2>

//         <p className="mt-4 text-slate-500 text-sm sm:text-base">
//           Empowering professionals across borders with live industry mentorship.
//         </p>
//       </div>

//       {/* Map */}
//       <div className="relative w-full h-[500px] sm:h-[650px] md:h-[750px] bg-[#f8fafc]">
//         {/* Grid Background */}
//         <div className="absolute inset-0 opacity-30 pointer-events-none">
//           <svg width="100%" height="100%">
//             <pattern
//               id="grid"
//               width="30"
//               height="30"
//               patternUnits="userSpaceOnUse"
//             >
//               <path
//                 d="M30 0 L0 30"
//                 fill="none"
//                 stroke="#e2e8f0"
//                 strokeWidth="1"
//               />
//             </pattern>

//             <rect width="100%" height="100%" fill="url(#grid)" />
//           </svg>
//         </div>

//         {/* World Map */}
//         <img
//           src={worldMap}
//           alt="World Map"
//           className="absolute inset-0 w-full h-full object-contain"
//         />

//         {/* Floating Profiles */}
//         {visibleProfiles.map((profile) => (
//           <div
//             key={profile.id}
//             style={{
//               top: profile.position.top,
//               left: profile.position.left,
//             }}
//             className="
//               absolute
//               z-10
//               -translate-x-1/2
//               -translate-y-1/2
//               animate-profilePop
//               group
//             "
//           >
//             <div className="relative">
//               {/* Hover Ring */}
//               <div
//                 className="
//                   absolute
//                   -inset-2
//                   rounded-full
//                   bg-slate-100
//                   opacity-0
//                   group-hover:opacity-100
//                   group-hover:scale-110
//                   transition-all
//                   duration-300
//                 "
//               />

//               {/* Avatar */}
//               <div
//                 className={`
//                   relative
//                   w-14
//                   h-14
//                   sm:w-16
//                   sm:h-16
//                   rounded-full
//                   overflow-hidden
//                   border-4
//                   border-white
//                   ${profile.borderColor}
//                   shadow-xl
//                   transition-transform
//                   duration-300
//                   group-hover:scale-105
//                 `}
//               >
//                 <img
//                   src={profile.avatar}
//                   alt="Learner"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };



