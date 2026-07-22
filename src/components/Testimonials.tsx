// /**
//  * @license
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import React from 'react';
// import { Star, MessageSquareQuote, Quote, ShieldCheck, HelpCircle } from 'lucide-react';
// import { TESTIMONIALS } from '../data';

// export default function Testimonials() {
//   return (
//     <section className="bg-white py-16" id="testimonials">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
//         {/* Entrance Heading */}
//         <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
//           <span className="font-mono text-xs font-black text-orange-500 uppercase tracking-widest">
//             STUDENT SUCCESS CORNER
//           </span>
//           <h2 className="text-3xl font-black tracking-tight sm:text-4xl text-slate-900">
//             Real Alumni, Real Career Shifts
//           </h2>
//           <p className="text-sm text-slate-500">
//             Hear directly from BIA cohorts of technology, banking, data, and design specialties who successfully shifted into global companies.
//           </p>
//         </div>

//         {/* Testimonials cards list */}
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//           {TESTIMONIALS.map((test) => (
//             <div
//               key={test.id}
//               className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm shadow-black/5 hover:border-slate-300 transition-all duration-300 relative group"
//             >
//               {/* Quotation icon overlay */}
//               <div className="absolute top-4 right-4 text-slate-100 group-hover:text-blue-50/50 transition-colors">
//                 <Quote className="h-10 w-10 rotate-180 fill-current" />
//               </div>

//               <div className="space-y-4 relative z-10">
//                 {/* Visual rating stars */}
//                 <div className="flex space-x-0.5">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className={`h-4 w-4 ${
//                         i < Math.floor(test.rating)
//                           ? 'fill-amber-500 text-amber-500'
//                           : 'fill-slate-100 text-slate-100'
//                       }`}
//                     />
//                   ))}
//                 </div>

//                 {/* Actual review feedback */}
//                 <p className="text-xs text-slate-600 italic font-medium leading-relaxed">
//                   "{test.feedback}"
//                 </p>
//               </div>

//               {/* Author biographical profiles */}
//               <div className="border-t border-slate-100 pt-4 mt-6 flex items-center space-x-3.5 relative z-10">
//                 <img
//                   src={test.avatar}
//                   alt={test.name}
//                   referrerPolicy="no-referrer"
//                   className="h-11 w-11 rounded-full object-cover border border-slate-200"
//                 />
//                 <div>
//                   <h4 className="text-xs font-black text-slate-950">{test.name}</h4>
//                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
//                     {test.role}
//                   </p>
//                   <span className="inline-flex items-center text-[10px] text-blue-600 font-extrabold uppercase tracking-wide mt-1">
//                     {test.company}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Verified plaque badges */}
//         <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 mt-12 text-center max-w-xl mx-auto flex items-center justify-center space-x-3 text-slate-500">
//           <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
//           <p className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">
//             All reviews verified via professional networks (LinkedIn) & Trustpilot protocols.
//           </p>
//         </div>

//       </div>
//     </section>
//   );
// }




import React from 'react';

export default function Testimonials() {
  // Data remains the same for consistency
  const advantages = [
    {
      title: "IMMERSIVE CLASSROOM EXPERIENCE",
      textColor: "text-amber-600",
      description: "With live, in-person professional training courses by industry experts, immerse yourself in a classroom experience that transcends traditional learning, focusing on real-world applications.",
      icon: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor">
          <circle cx="50" cy="40" r="10" stroke="#f59e0b" strokeWidth="2.5" />
          <path d="M35 68 C35 55, 65 55, 65 68" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="22" cy="35" r="7" stroke="#f59e0b" strokeWidth="2" />
          <line x1="29" y1="35" x2="40" y2="40" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="78" cy="35" r="7" stroke="#f59e0b" strokeWidth="2" />
          <line x1="71" y1="35" x2="60" y2="40" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="50" cy="82" r="7" stroke="#f59e0b" strokeWidth="2" />
          <line x1="50" y1="75" x2="50" y2="68" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M20 68 H80" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    },
    {
      title: "GLOBALLY RECOGNIZED CERTIFICATION",
      textColor: "text-rose-500",
      description: "BIA® Certification, globally recognized by leading multinational corporations, provides you an international edge with an industry-focused curriculum.",
      icon: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor">
          <path d="M35 45 C35 30, 65 30, 65 45 C65 55, 58 60, 58 68 H42 C42 60, 35 55, 35 45 Z" stroke="#f43f5e" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M44 74 H56 M46 79 H54" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="50" y1="18" x2="50" y2="24" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
          <line x1="24" y1="30" x2="30" y2="34" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
          <line x1="76" y1="30" x2="70" y2="34" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
          <circle cx="50" cy="46" r="8" stroke="#f43f5e" strokeWidth="2" />
          <line x1="50" y1="38" x2="50" y2="54" stroke="#f43f5e" strokeWidth="1.5" />
          <line x1="42" y1="46" x2="58" y2="46" stroke="#f43f5e" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      title: "HANDS-ON TRAINING BY INDUSTRY EXPERTS",
      textColor: "text-indigo-600",
      description: "Immerse yourself in a transformative learning experience as leading industry professionals guide you through hands-on training, equipping you with practical expertise to excel in the fast changing technology field.",
      icon: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor">
          <path d="M50 20 L85 33 L50 46 L15 33 Z" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M28 38 V58 C28 65, 72 65, 72 58 V38" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M75 35 V52 L80 50 V33" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M25 72 H75 V78 H25 Z" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinejoin="round" />
          <path d="M20 78 H80" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )
    },
    {
      title: "REAL WORLD PROJECTS & CASE STUDIES",
      textColor: "text-blue-600",
      description: "Gain substantial practical exposure by working on direct corporate-style live projects and case studies carefully selected from leading companies to ready you for high-stakes positions.",
      icon: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor">
          <circle cx="28" cy="55" r="5" stroke="#3b82f6" strokeWidth="2" />
          <path d="M22 75 V66 C22 62, 34 62, 34 66 V75" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
          <path d="M28 35 H34 V47 H28 Z" fill="none" stroke="#3b82f6" strokeWidth="2" />
          <line x1="31" y1="47" x2="31" y2="52" stroke="#3b82f6" strokeWidth="2" />
          <text x="29" y="44" fill="#3b82f6" fontSize="8" fontWeight="bold" fontFamily="sans-serif">1</text>
          <circle cx="50" cy="52" r="5" stroke="#3b82f6" strokeWidth="2" />
          <path d="M44 75 V63 C44 59, 56 59, 56 63 V75" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
          <path d="M47 30 H53 V42 H47 Z" fill="none" stroke="#3b82f6" strokeWidth="2" />
          <line x1="50" y1="42" x2="50" y2="47" stroke="#3b82f6" strokeWidth="2" />
          <text x="48" y="39" fill="#3b82f6" fontSize="8" fontWeight="bold" fontFamily="sans-serif">2</text>
          <circle cx="72" cy="55" r="5" stroke="#3b82f6" strokeWidth="2" />
          <path d="M66 75 V66 C66 62, 78 62, 78 66 V75" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
          <path d="M66 35 H72 V47 H66 Z" fill="none" stroke="#3b82f6" strokeWidth="2" />
          <line x1="69" y1="47" x2="69" y2="52" stroke="#3b82f6" strokeWidth="2" />
          <text x="67" y="44" fill="#3b82f6" fontSize="8" fontWeight="bold" fontFamily="sans-serif">3</text>
        </svg>
      )
    },
    {
      title: "360° DEGREE CAREER SUPPORT",
      textColor: "text-emerald-600",
      description: "Receive step-by-step career path counseling, exhaustive mock interview drills, profile-building guidance, and high-priority access to BIA's prominent hiring partner pipeline.",
      icon: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor">
          <rect x="25" y="25" width="50" height="35" rx="3" stroke="#10b981" strokeWidth="2.5" />
          <line x1="35" y1="60" x2="25" y2="80" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="65" y1="60" x2="75" y2="80" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="50" y1="60" x2="50" y2="83" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M33 48 L45 38 L55 45 L67 33" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="67" cy="33" r="2.5" fill="#10b981" />
          <path d="M80 62 C80 55, 92 55, 92 62 V70" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="86" cy="52" r="4" stroke="#10b981" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      title: "BIA® ALUMNI STATUS",
      textColor: "text-cyan-600",
      description: "Gain lifelong elite status in the global Boston Institute of Analytics alumni network, opening direct lines of professional reference to leading executives and tech-pioneers.",
      icon: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor">
          <rect x="35" y="32" width="30" height="15" rx="4" stroke="#06b6d4" strokeWidth="2" />
          <line x1="50" y1="47" x2="50" y2="60" stroke="#06b6d4" strokeWidth="2" />
          <circle cx="28" cy="68" r="6" stroke="#06b6d4" strokeWidth="2" />
          <circle cx="42" cy="68" r="6" stroke="#06b6d4" strokeWidth="2" />
          <circle cx="58" cy="68" r="6" stroke="#06b6d4" strokeWidth="2" />
          <circle cx="72" cy="68" r="6" stroke="#06b6d4" strokeWidth="2" />
          <path d="M22 80 C22 75, 34 75, 34 80" stroke="#06b6d4" strokeWidth="2" />
          <path d="M36 80 C36 75, 48 75, 48 80" stroke="#06b6d4" strokeWidth="2" />
          <path d="M52 80 C52 75, 64 75, 64 80" stroke="#06b6d4" strokeWidth="2" />
          <path d="M66 80 C66 75, 78 75, 78 80" stroke="#06b6d4" strokeWidth="2" />
          <path d="M28 62 L42 40 M72 62 L58 40" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3 2" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-5xl mx-auto">
        
        {}
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-slate-900">
            The BIA<sup className="text-xs font-semibold ml-0.5">®</sup> Advantage
          </h2>
          <div className="w-12 h-1 bg-slate-200 mx-auto rounded-full"></div>
        </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {advantages.map((advantage, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Scaled down Icon */}
              <div className="flex-shrink-0 mb-4 scale-75 transform origin-center">
                {advantage.icon}
              </div>

              {/* Smaller Title */}
              <h3 className={`text-xs sm:text-sm font-bold tracking-wider mb-2 px-4 ${advantage.textColor}`}>
                {advantage.title}
              </h3>

              {/* Smaller, more compact description */}
              <p className="text-slate-600 text-xs leading-relaxed max-w-[280px]">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>

        {}
        {/* <div className="mt-16 pt-6 border-t border-slate-50 text-center">
          <p className="text-[10px] text-slate-400 tracking-wide uppercase">
            © {new Date().getFullYear()} Boston Institute of Analytics
          </p>
        </div> */}

      </div>
    </div>
  );
}