// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   CreditCard, 
//   Phone, 
//   User, 
//   Mail, 
//   MapPin, 
//   BookOpen, 
//   GraduationCap, 
//   AlertCircle, 
//   Check, 
//   CheckCircle2, 
//   Globe, 
//   Search, 
//   ExternalLink, 
//   Copy, 
//   ShieldCheck, 
//   QrCode, 
//   Smartphone, 
//   Building,
//   Info,
//   DollarSign,
//   ChevronRight,
//   ArrowLeft,
//   Pause,
//   Play
// } from 'lucide-react';

// // Simulated BIA Student Database
// const MOCK_REGISTERED_STUDENTS: Record<string, { fullName: string; email: string; campus: string; course: string; program: string; amount: string }> = {
//   "9876543210": {
//     fullName: "Alexandra Vance",
//     email: "alexandra.vance@example.edu",
//     campus: "Boston - United States",
//     course: "Dual Master in AI & Data Science",
//     program: "Post Graduate Program",
//     amount: "1850"
//   },
//   "9998887776": {
//     fullName: "Rohan Sharma",
//     email: "rohan.sharma@bia.org",
//     campus: "Andheri - Mumbai",
//     course: "Investment Banking & Global Markets",
//     program: "Master Diploma",
//     amount: "120000"
//   },
//   "8887776665": {
//     fullName: "Emily Thorne",
//     email: "emily.t@londonanalytics.uk",
//     campus: "London - United Kingdom",
//     course: "Predictive Analytics & Digital Marketing",
//     program: "Certification",
//     amount: "1400"
//   }
// };

// // Campuses Data
// const CAMPUSES = [
//   { id: "boston", name: "Boston - United States", currency: "USD", symbol: "$", region: "International" },
//   { id: "london", name: "London - United Kingdom", currency: "GBP", symbol: "£", region: "International" },
//   { id: "andheri", name: "Andheri - Mumbai", currency: "INR", symbol: "₹", region: "Mumbai" },
//   { id: "thane", name: "Thane - Mumbai", currency: "INR", symbol: "₹", region: "Mumbai" },
//   { id: "lowerparel", name: "Lower Parel - Mumbai", currency: "INR", symbol: "₹", region: "Mumbai" },
//   { id: "powai", name: "Powai - Mumbai", currency: "INR", symbol: "₹", region: "Mumbai" },
//   { id: "koramangala", name: "Koramangala - Bengaluru", currency: "INR", symbol: "₹", region: "Bengaluru" },
//   { id: "chennai", name: "Kizhalambaram - Chennai", currency: "INR", symbol: "₹", region: "Chennai" }
// ];

// // Campus slides for the bottom slider
// const CAROUSEL_CAMPUSES = [
//   { label: "Boston", loc: "United States", fullName: "Boston - United States" },
//   { label: "London", loc: "United Kingdom", fullName: "London - United Kingdom" },
//   { label: "Andheri", loc: "Mumbai", fullName: "Andheri - Mumbai" },
//   { label: "Thane", loc: "Mumbai", fullName: "Thane - Mumbai" },
//   { label: "Lower Parel", loc: "Mumbai", fullName: "Lower Parel - Mumbai" },
//   { label: "Powai", loc: "Mumbai", fullName: "Powai - Mumbai" },
//   { label: "Koramangala", loc: "Bengaluru", fullName: "Koramangala - Bengaluru" },
//   { label: "Chennai", loc: "Tamil Nadu", fullName: "Kizhalambaram - Chennai" },
//   { label: "Ahmedabad", loc: "Gujarat", fullName: "Andheri - Mumbai" }, // fallbacks
//   { label: "Pune", loc: "Maharashtra", fullName: "Andheri - Mumbai" }
// ];

// // Courses Data
// const COURSES = [
//   "Dual Master in AI & Data Science",
//   "Predictive Analytics & Digital Marketing",
//   "Investment Banking & Global Markets",
//   "Cyber Security & Ethical Hacking",
//   "Cloud Computing & DevOps Solutions",
//   "Product Management & Business Analytics"
// ];

// // Programs Data
// const PROGRAMS = [
//   "Master Diploma",
//   "Post Graduate Program",
//   "Executive Program",
//   "Certification Course"
// ];

// export default function App() {
//   // Form State
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [campus, setCampus] = useState('');
//   const [course, setCourse] = useState('');
//   const [program, setProgram] = useState('');
//   const [amount, setAmount] = useState('');
  
//   // Interactive UI Helpers
//   const [isSearching, setIsSearching] = useState(false);
//   const [autoFilledBadge, setAutoFilledBadge] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [touched, setTouched] = useState<Record<string, boolean>>({});
//   const [copiedEmail, setCopiedEmail] = useState(false);
//   const [footerSearch, setFooterSearch] = useState('');
//   const [isPaused, setIsPaused] = useState(false);
  
//   const formRef = useRef<HTMLDivElement>(null);
  
//   // Custom Terms Modal
//   const [showTermsModal, setShowTermsModal] = useState(false);
  
//   // Payment Flow State
//   const [paymentFlowState, setPaymentFlowState] = useState<'form' | 'processing' | 'gateway' | 'success'>('form');
//   const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card');
//   const [transactionId, setTransactionId] = useState('');
  
//   // Auto-set Currency based on campus selection
//   const currentCampusObj = CAMPUSES.find(c => c.name === campus);
//   const currencySymbol = currentCampusObj ? currentCampusObj.symbol : '₹';
//   const currencyCode = currentCampusObj ? currentCampusObj.currency : 'INR';

//   // Live Auto-fill Simulator when entering a 10-digit number
//   useEffect(() => {
//     const cleanNum = mobileNumber.replace(/\D/g, '');
//     if (cleanNum.length === 10) {
//       setIsSearching(true);
      
//       const timer = setTimeout(() => {
//         setIsSearching(false);
//         if (MOCK_REGISTERED_STUDENTS[cleanNum]) {
//           const student = MOCK_REGISTERED_STUDENTS[cleanNum];
//           setFullName(student.fullName);
//           setEmail(student.email);
//           setCampus(student.campus);
//           setCourse(student.course);
//           setProgram(student.program);
//           setAmount(student.amount);
//           setAutoFilledBadge(true);
//           setErrors({});
//         } else {
//           setAutoFilledBadge(false);
//         }
//       }, 900);

//       return () => clearTimeout(timer);
//     } else {
//       setAutoFilledBadge(false);
//     }
//   }, [mobileNumber]);

//   // Validation function
//   const validateField = (name: string, value: string) => {
//     let errorMsg = '';
    
//     if (!value || value.trim() === '') {
//       if (name === 'mobileNumber') errorMsg = 'Please enter your Mobile Number';
//       else if (name === 'fullName') errorMsg = 'Please enter your Full Name';
//       else if (name === 'email') errorMsg = 'Please enter your Email ID';
//       else if (name === 'campus') errorMsg = 'Please select your Campus';
//       else if (name === 'course') errorMsg = 'Please select your Course';
//       else if (name === 'program') errorMsg = 'Please select your Program';
//       else if (name === 'amount') errorMsg = 'Please enter Payment Amount';
//     } else {
//       if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
//         errorMsg = 'Please enter a valid Email ID';
//       }
//       if (name === 'mobileNumber' && value.replace(/\D/g, '').length < 8) {
//         errorMsg = 'Please enter a valid Mobile Number';
//       }
//       if (name === 'amount') {
//         const numVal = parseFloat(value);
//         if (isNaN(numVal)) {
//           errorMsg = 'Please enter a valid numeric amount';
//         } else if (numVal <= 0) {
//           errorMsg = 'Amount must be greater than zero';
//         }
//       }
//     }
//     return errorMsg;
//   };

//   // Live validation on field changes
//   const handleInputChange = (fieldName: string, val: string) => {
//     if (fieldName === 'mobileNumber') setMobileNumber(val);
//     else if (fieldName === 'fullName') setFullName(val);
//     else if (fieldName === 'email') setEmail(val);
//     else if (fieldName === 'campus') setCampus(val);
//     else if (fieldName === 'course') setCourse(val);
//     else if (fieldName === 'program') setProgram(val);
//     else if (fieldName === 'amount') setAmount(val);

//     setTouched(prev => ({ ...prev, [fieldName]: true }));
    
//     const err = validateField(fieldName, val);
//     setErrors(prev => ({ ...prev, [fieldName]: err }));
//   };

//   // Selection from Bottom sliding cards
//   const selectCampusFromSlide = (campusName: string) => {
//     handleInputChange('campus', campusName);
//     // Smoothly scroll back to form view
//     formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText('connect@bostoninstituteofanalytics.org');
//     setCopiedEmail(true);
//     setTimeout(() => setCopiedEmail(false), 2000);
//   };

//   const handlePaymentInitiation = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     const newErrors: Record<string, string> = {};
//     const allFields = { mobileNumber, fullName, email, campus, course, program, amount };
    
//     Object.entries(allFields).forEach(([key, val]) => {
//       const err = validateField(key, val);
//       if (err) newErrors[key] = err;
//     });

//     setErrors(newErrors);
    
//     const allTouched: Record<string, boolean> = {};
//     Object.keys(allFields).forEach(key => { allTouched[key] = true; });
//     setTouched(allTouched);

//     if (Object.keys(newErrors).length === 0) {
//       setPaymentFlowState('processing');
//       setTimeout(() => {
//         setTransactionId('TXN-' + Math.floor(100000 + Math.random() * 900000));
//         setPaymentFlowState('gateway');
//       }, 1500);
//     }
//   };

//   const handleFinalSuccess = () => {
//     setPaymentFlowState('success');
//   };

//   const handleDemoTrigger = (num: string) => {
//     handleInputChange('mobileNumber', num);
//   };

//   // Multiply campus cards for infinite horizontal seamless looping
//   const filteredCampuses = CAROUSEL_CAMPUSES.filter(item => 
//     item.label.toLowerCase().includes(footerSearch.toLowerCase()) || 
//     item.loc.toLowerCase().includes(footerSearch.toLowerCase())
//   );
  
//   // Triple the items to ensure seamless infinite looping on wider displays
//   const slidingList = [...filteredCampuses, ...filteredCampuses, ...filteredCampuses];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#eff5ff] via-[#f7f9fc] to-[#eff5ff] text-[#2d3748] font-sans antialiased selection:bg-blue-200">
      
//       {/* Dynamic Marquee Custom Styles injected directly into JSX */}
//       <style>{`
//         @keyframes autoSlideMarquee {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(-33.3333%);
//           }
//         }
//         .animate-marquee-loop {
//           display: flex;
//           width: max-content;
//           animation: autoSlideMarquee 24s linear infinite;
//         }
//         .animate-marquee-paused {
//           animation-play-state: paused !important;
//         }
//       `}</style>

//       {/* Dynamic Header */}
  

//       {/* Main Content Body */}
//       <main ref={formRef} className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
//         {paymentFlowState === 'form' && (
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
            
//             {/* LEFT: PAYMENT FORM CARD (Image 1, 2, 3 Reference) */}
//             <div className="lg:col-span-7 bg-white rounded-[24px] sm:rounded-[32px] border border-[#e2e8f0]/80 shadow-2xl shadow-blue-900/5 overflow-hidden transition-all duration-300">
//               <div className="p-6 sm:p-10">
                
//                 {/* Header Block */}
//                 <div className="flex flex-col items-center text-center mb-8">
//                   <div className="bg-[#ebf4ff] p-3 rounded-full mb-3 text-blue-600">
//                     <CreditCard className="h-8 w-8" />
//                   </div>
//                   <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a365d] tracking-tight">Fees Payment</h2>
//                   <p className="text-sm text-gray-500 mt-2 max-w-sm">
//                     Please enter your mobile number. If it is already registered, your details will be fetched automatically.
//                   </p>
                  
//                   {/* Demo Help Banner */}
//                   <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3 text-left w-full">
//                     <div className="flex gap-2 items-start">
//                       <Info className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
//                       <div>
//                         <span className="text-xs font-bold text-amber-800">Quick Sandbox Demo:</span>
//                         <div className="text-[11px] text-amber-700 mt-0.5">
//                           Enter registered number <button type="button" onClick={() => handleDemoTrigger('9876543210')} className="underline font-bold text-[#1e3a8a] hover:text-blue-700">9876543210</button> or <button type="button" onClick={() => handleDemoTrigger('9998887776')} className="underline font-bold text-[#1e3a8a] hover:text-blue-700">9998887776</button> to simulate live lookup.
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <form onSubmit={handlePaymentInitiation} className="space-y-6">
                  
//                   {/* Mobile Number Input */}
//                   <div>
//                     <label className="flex items-center text-sm font-bold text-gray-700 mb-1.5">
//                       <Phone className="h-4 w-4 text-blue-600 mr-1.5" />
//                       Mobile Number <span className="text-rose-500 ml-1 font-bold">*</span>
//                     </label>
//                     <div className="relative">
//                       <input
//                         type="tel"
//                         value={mobileNumber}
//                         onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
//                         placeholder="Enter Mobile Number"
//                         className={`w-full py-3.5 pl-4 pr-12 rounded-xl text-base border-2 font-medium transition-all ${
//                           errors.mobileNumber 
//                             ? 'border-rose-500 bg-rose-50/10 focus:ring-rose-500 focus:border-rose-500 text-rose-900' 
//                             : autoFilledBadge
//                             ? 'border-emerald-500 focus:ring-emerald-500 focus:border-emerald-500'
//                             : 'border-gray-200 hover:border-gray-300 focus:ring-blue-500 focus:border-blue-500'
//                         }`}
//                       />
//                       <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
//                         {isSearching && (
//                           <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent" />
//                         )}
//                         {!isSearching && errors.mobileNumber && (
//                           <AlertCircle className="h-5 w-5 text-rose-500" />
//                         )}
//                         {!isSearching && autoFilledBadge && !errors.mobileNumber && (
//                           <span className="flex items-center gap-1 text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2 py-1 rounded-md animate-bounce">
//                             <Check className="h-3 w-3" /> Found Student
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                     {errors.mobileNumber && (
//                       <p className="mt-1.5 text-xs text-rose-500 font-semibold flex items-center gap-1">
//                         <AlertCircle className="h-3 w-3" /> {errors.mobileNumber}
//                       </p>
//                     )}
//                   </div>

//                   {/* Two Column Layout: Full Name & Email ID */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
//                     {/* Full Name */}
//                     <div>
//                       <label className="flex items-center text-sm font-bold text-gray-700 mb-1.5">
//                         <User className="h-4 w-4 text-blue-600 mr-1.5" />
//                         Full Name <span className="text-rose-500 ml-1 font-bold">*</span>
//                       </label>
//                       <div className="relative">
//                         <input
//                           type="text"
//                           value={fullName}
//                           onChange={(e) => handleInputChange('fullName', e.target.value)}
//                           placeholder="Full Name"
//                           className={`w-full py-3.5 pl-4 pr-10 rounded-xl text-base border-2 font-medium transition-all ${
//                             errors.fullName 
//                               ? 'border-rose-500 bg-rose-50/10 focus:ring-rose-500' 
//                               : 'border-gray-200 hover:border-gray-300 focus:ring-blue-500'
//                           }`}
//                         />
//                         {errors.fullName && (
//                           <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-rose-500" />
//                         )}
//                       </div>
//                       {errors.fullName && (
//                         <p className="mt-1.5 text-xs text-rose-500 font-semibold flex items-center gap-1">
//                           <AlertCircle className="h-3 w-3" /> Please enter your Full Name
//                         </p>
//                       )}
//                     </div>

//                     {/* Email ID */}
//                     <div>
//                       <label className="flex items-center text-sm font-bold text-gray-700 mb-1.5">
//                         <Mail className="h-4 w-4 text-blue-600 mr-1.5" />
//                         Email ID <span className="text-rose-500 ml-1 font-bold">*</span>
//                       </label>
//                       <div className="relative">
//                         <input
//                           type="text"
//                           value={email}
//                           onChange={(e) => handleInputChange('email', e.target.value)}
//                           placeholder="something@example.com"
//                           className={`w-full py-3.5 pl-4 pr-10 rounded-xl text-base border-2 font-medium transition-all ${
//                             errors.email 
//                               ? 'border-rose-500 bg-rose-50/10 focus:ring-rose-500' 
//                               : 'border-gray-200 hover:border-gray-300 focus:ring-blue-500'
//                           }`}
//                         />
//                         {errors.email && (
//                           <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-rose-500" />
//                         )}
//                       </div>
//                       {errors.email && (
//                         <p className="mt-1.5 text-xs text-rose-500 font-semibold flex items-center gap-1">
//                           <AlertCircle className="h-3 w-3" /> Please enter your Email ID
//                         </p>
//                       )}
//                     </div>

//                   </div>

//                   {/* Campus Selection */}
//                   <div>
//                     <label className="flex items-center text-sm font-bold text-gray-700 mb-1.5">
//                       <Building className="h-4 w-4 text-blue-600 mr-1.5" />
//                       Campus <span className="text-rose-500 ml-1 font-bold">*</span>
//                     </label>
//                     <div className="relative">
//                       <select
//                         value={campus}
//                         onChange={(e) => handleInputChange('campus', e.target.value)}
//                         className={`w-full py-3.5 pl-4 pr-10 rounded-xl text-base border-2 font-medium appearance-none bg-white transition-all ${
//                           errors.campus 
//                             ? 'border-rose-500 bg-rose-50/10 focus:ring-rose-500' 
//                             : 'border-gray-200 hover:border-gray-300 focus:ring-blue-500'
//                         }`}
//                       >
//                         <option value="">Select Campus</option>
//                         {CAMPUSES.map(camp => (
//                           <option key={camp.id} value={camp.name}>
//                             {camp.name} ({camp.currency})
//                           </option>
//                         ))}
//                       </select>
//                       <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
//                         <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
//                       </div>
//                       {errors.campus && (
//                         <AlertCircle className="absolute right-8 top-1/2 -translate-y-1/2 h-5 w-5 text-rose-500" />
//                       )}
//                     </div>
//                     {errors.campus && (
//                       <p className="mt-1.5 text-xs text-rose-500 font-semibold flex items-center gap-1">
//                         <AlertCircle className="h-3 w-3" /> Please select your Campus
//                       </p>
//                     )}
//                   </div>

//                   {/* Two Column Layout: Course & Program */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
//                     {/* Course */}
//                     <div>
//                       <label className="flex items-center text-sm font-bold text-gray-700 mb-1.5">
//                         <BookOpen className="h-4 w-4 text-blue-600 mr-1.5" />
//                         Course <span className="text-rose-500 ml-1 font-bold">*</span>
//                       </label>
//                       <div className="relative">
//                         <select
//                           value={course}
//                           onChange={(e) => handleInputChange('course', e.target.value)}
//                           className={`w-full py-3.5 pl-4 pr-10 rounded-xl text-base border-2 font-medium appearance-none bg-white transition-all ${
//                             errors.course 
//                               ? 'border-rose-500 bg-rose-50/10 focus:ring-rose-500' 
//                               : 'border-gray-200 hover:border-gray-300 focus:ring-blue-500'
//                           }`}
//                         >
//                           <option value="">Select Course</option>
//                           {COURSES.map(crs => (
//                             <option key={crs} value={crs}>{crs}</option>
//                           ))}
//                         </select>
//                         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
//                           <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
//                         </div>
//                         {errors.course && (
//                           <AlertCircle className="absolute right-8 top-1/2 -translate-y-1/2 h-5 w-5 text-rose-500" />
//                         )}
//                       </div>
//                       {errors.course && (
//                         <p className="mt-1.5 text-xs text-rose-500 font-semibold flex items-center gap-1">
//                           <AlertCircle className="h-3 w-3" /> Please select your Course
//                         </p>
//                       )}
//                     </div>

//                     {/* Program */}
//                     <div>
//                       <label className="flex items-center text-sm font-bold text-gray-700 mb-1.5">
//                         <GraduationCap className="h-4 w-4 text-blue-600 mr-1.5" />
//                         Program <span className="text-rose-500 ml-1 font-bold">*</span>
//                       </label>
//                       <div className="relative">
//                         <select
//                           value={program}
//                           onChange={(e) => handleInputChange('program', e.target.value)}
//                           className={`w-full py-3.5 pl-4 pr-10 rounded-xl text-base border-2 font-medium appearance-none bg-white transition-all ${
//                             errors.program 
//                               ? 'border-rose-500 bg-rose-50/10 focus:ring-rose-500' 
//                               : 'border-gray-200 hover:border-gray-300 focus:ring-blue-500'
//                           }`}
//                         >
//                           <option value="">Select Program</option>
//                           {PROGRAMS.map(prg => (
//                             <option key={prg} value={prg}>{prg}</option>
//                           ))}
//                         </select>
//                         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
//                           <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
//                         </div>
//                         {errors.program && (
//                           <AlertCircle className="absolute right-8 top-1/2 -translate-y-1/2 h-5 w-5 text-rose-500" />
//                         )}
//                       </div>
//                       {errors.program && (
//                         <p className="mt-1.5 text-xs text-rose-500 font-semibold flex items-center gap-1">
//                           <AlertCircle className="h-3 w-3" /> Please select your Program
//                         </p>
//                       )}
//                     </div>

//                   </div>

//                   {/* Interactive Fee Amount Input Box */}
//                   <div>
//                     <label className="flex items-center text-sm font-bold text-gray-700 mb-1.5">
//                       <CreditCard className="h-4 w-4 text-blue-600 mr-1.5" />
//                       Amount <span className="text-rose-500 ml-1 font-bold">*</span>
//                     </label>
                    
//                     <div className="relative flex items-stretch">
//                       {/* Left currency badge prefix */}
//                       <span className="inline-flex items-center px-4 rounded-l-xl border-2 border-r-0 border-gray-200 bg-gray-50 text-gray-600 font-bold text-lg select-none">
//                         {currencySymbol}
//                       </span>
                      
//                       {/* Middle editable value */}
//                       <input
//                         type="text"
//                         value={amount}
//                         onChange={(e) => handleInputChange('amount', e.target.value)}
//                         placeholder="0"
//                         className={`w-full py-3.5 px-4 text-base border-2 font-extrabold focus:outline-none transition-all ${
//                           errors.amount 
//                             ? 'border-rose-500 bg-rose-50/10 focus:ring-rose-500' 
//                             : 'border-gray-200 focus:ring-blue-500 focus:border-blue-500'
//                         }`}
//                       />

//                       {/* Right .00 decimals segment */}
//                       <span className="inline-flex items-center px-4 rounded-r-xl border-2 border-l-0 border-gray-200 bg-gray-50 text-gray-400 font-bold text-base select-none">
//                         .00
//                       </span>

//                       {/* Status Checkmark icon */}
//                       {amount && !errors.amount && (
//                         <div className="absolute right-14 top-1/2 -translate-y-1/2">
//                           <Check className="h-5 w-5 text-emerald-500 font-bold" />
//                         </div>
//                       )}
//                     </div>
                    
//                     {/* Dynamic helper context */}
//                     <div className="flex justify-between items-center mt-2 px-1">
//                       <p className="text-xs text-gray-400 font-medium">
//                         Payment in native currency: <span className="font-bold text-gray-600">{currencyCode}</span>
//                       </p>
//                       {amount && !errors.amount && (
//                         <p className="text-xs text-emerald-600 font-bold">
//                           Validated successfully
//                         </p>
//                       )}
//                     </div>

//                     {errors.amount && (
//                       <p className="mt-1.5 text-xs text-rose-500 font-semibold flex items-center gap-1">
//                         <AlertCircle className="h-3 w-3" /> {errors.amount}
//                       </p>
//                     )}
//                   </div>

//                   {/* Terms & Conditions Agreement */}
//                   <div className="pt-2">
//                     <p className="text-xs text-gray-500 leading-relaxed">
//                       By clicking, you are confirming that you have read, understood and agreed to{' '}
//                       <button 
//                         type="button" 
//                         onClick={() => setShowTermsModal(true)} 
//                         className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-0.5"
//                       >
//                         BIA® Terms and Conditions <ExternalLink className="h-3 w-3" />
//                       </button>.
//                     </p>
//                   </div>

//                   {/* Main Action Submit Button */}
//                   <button
//                     type="submit"
//                     className="w-full mt-6 py-4 px-6 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/10 hover:shadow-blue-500/25 active:scale-[0.98] flex items-center justify-center gap-2 text-base"
//                   >
//                     <span>Continue Payment</span>
//                     <ChevronRight className="h-5 w-5" />
//                   </button>

//                 </form>

//               </div>
//             </div>

//             {/* RIGHT: GRADUATION DESIGN BANNER */}
//             <div className="lg:col-span-5 h-full flex flex-col justify-between self-stretch">
//               <div className="bg-gradient-to-b from-blue-600 to-[#1e3a8a] text-white rounded-[24px] sm:rounded-[32px] p-8 sm:p-10 shadow-xl relative overflow-hidden flex flex-col justify-between h-full min-h-[480px]">
                
//                 <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl -mr-20 -mt-20 pointer-events-none"></div>
//                 <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

//                 <div className="relative z-10">
//                   <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full mb-6">
//                     <ShieldCheck className="h-4 w-4 text-emerald-300" /> Authorized Official Link
//                   </div>
//                   <h3 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight">
//                     Empowering Global Careers in Tech & Business
//                   </h3>
//                   <p className="text-blue-100/90 text-sm mt-3 leading-relaxed">
//                     Boston Institute of Analytics® is an international academy offering top-ranked master diploma and certifications. Join our thousands of students placed across blue-chip corporate giants.
//                   </p>
//                 </div>

//                 {/* Highly structured CSS-based Graduate Illustration */}
//                 <div className="relative z-10 my-8 flex justify-center items-center">
//                   <div className="relative w-48 h-48 sm:w-56 sm:h-56">
//                     <div className="absolute inset-0 bg-[#4285f4] rounded-full scale-100 shadow-lg border-4 border-white/25 animate-pulse" style={{ animationDuration: '4s' }}></div>
                    
//                     <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full text-white">
//                       <path d="M40 160 L160 160 L180 200 L20 200 Z" fill="#1e293b" />
//                       <polygon points="100,140 85,160 115,160" fill="#f8fafc" />
//                       <polygon points="100,150 90,160 110,160" fill="#dc2626" />
//                       <circle cx="100" cy="110" r="35" fill="#fbcfe8" />
//                       <path d="M85 105 Q90 102 95 105" stroke="#1e293b" strokeWidth="2.5" fill="none" />
//                       <path d="M105 105 Q110 102 115 105" stroke="#1e293b" strokeWidth="2.5" fill="none" />
//                       <path d="M88 122 Q100 135 112 122" stroke="#e11d48" strokeWidth="3" fill="none" />
//                       <path d="M65 110 Q100 75 135 110 Q140 135 135 150 Q130 110 100 110 Q70 110 65 150 Z" fill="#451a03" />
//                       <polygon points="100,60 160,78 100,96 40,78" fill="#0f172a" />
//                       <rect x="85" y="80" width="30" height="20" fill="#0f172a" />
//                       <path d="M100,78 L45,86 L45,115" stroke="#fbbf24" strokeWidth="2.5" fill="none" />
//                       <circle cx="45" cy="118" r="4" fill="#fbbf24" />
//                     </svg>

//                     <div className="absolute -bottom-2 right-4 bg-white text-[#1e3a8a] py-1.5 px-3 rounded-full text-[11px] font-black shadow-md flex items-center gap-1.5 border border-blue-100">
//                       📜 Graduate Certified
//                     </div>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
//                   <div>
//                     <span className="block text-xl sm:text-2xl font-extrabold text-amber-300">85+</span>
//                     <span className="text-xs text-blue-100">Global Corporate Partners</span>
//                   </div>
//                   <div>
//                     <span className="block text-xl sm:text-2xl font-extrabold text-amber-300">100%</span>
//                     <span className="text-xs text-blue-100">Interactive Practical Training</span>
//                   </div>
//                 </div>

//               </div>
//             </div>

//           </div>
//         )}

//         {/* PROCESSING LOADER VIEW */}
//         {paymentFlowState === 'processing' && (
//           <div className="max-w-md mx-auto bg-white rounded-3xl p-10 shadow-xl border border-gray-100 text-center py-16">
//             <div className="inline-block relative w-16 h-16 mb-6">
//               <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
//               <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
//             </div>
//             <h3 className="text-xl font-bold text-gray-800">Verifying Enrollment Records</h3>
//             <p className="text-sm text-gray-500 mt-2">Connecting with BIA campus servers securely...</p>
//             <div className="mt-8 bg-gray-50 p-4 rounded-xl text-left text-xs text-gray-600 space-y-1.5">
//               <div className="flex justify-between"><span>Name:</span> <span className="font-bold text-gray-800">{fullName}</span></div>
//               <div className="flex justify-between"><span>Campus:</span> <span className="font-bold text-gray-800">{campus}</span></div>
//               <div className="flex justify-between"><span>Amount:</span> <span className="font-bold text-gray-800">{currencySymbol}{amount}.00</span></div>
//             </div>
//           </div>
//         )}

//         {/* STEP: PAYMENT METHOD SELECTION & INTERACTIVE PROCESSOR */}
//         {paymentFlowState === 'gateway' && (
//           <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden">
            
//             <div className="bg-[#1e3a8a] text-white p-6 sm:p-8 flex items-center justify-between">
//               <div>
//                 <span className="text-xs font-bold uppercase tracking-wider text-blue-200">Secure Payment Gateway</span>
//                 <h3 className="text-xl sm:text-2xl font-extrabold">Complete Transaction</h3>
//               </div>
//               <div className="text-right">
//                 <span className="text-xs text-blue-200 block">Total Due</span>
//                 <span className="text-2xl font-black text-amber-300">{currencySymbol}{amount}.00</span>
//               </div>
//             </div>

//             <div className="p-6 sm:p-8">
              
//               <button 
//                 onClick={() => setPaymentFlowState('form')} 
//                 className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-800 mb-6"
//               >
//                 <ArrowLeft className="h-4 w-4" /> Go Back to Details Edit
//               </button>

//               <div className="grid grid-cols-3 gap-3 mb-8">
//                 <button
//                   type="button"
//                   onClick={() => setPaymentMethod('card')}
//                   className={`p-4 rounded-xl border-2 text-center transition-all ${
//                     paymentMethod === 'card' 
//                       ? 'border-blue-600 bg-blue-50/50 text-blue-700 font-bold' 
//                       : 'border-gray-200 hover:border-gray-300 text-gray-600 font-medium'
//                   }`}
//                 >
//                   <CreditCard className="h-6 w-6 mx-auto mb-2" />
//                   <span className="text-xs block">Card Payment</span>
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setPaymentMethod('upi')}
//                   className={`p-4 rounded-xl border-2 text-center transition-all ${
//                     paymentMethod === 'upi' 
//                       ? 'border-blue-600 bg-blue-50/50 text-blue-700 font-bold' 
//                       : 'border-gray-200 hover:border-gray-300 text-gray-600 font-medium'
//                   }`}
//                 >
//                   <QrCode className="h-6 w-6 mx-auto mb-2" />
//                   <span className="text-xs block">UPI Pay QR</span>
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setPaymentMethod('netbanking')}
//                   className={`p-4 rounded-xl border-2 text-center transition-all ${
//                     paymentMethod === 'netbanking' 
//                       ? 'border-blue-600 bg-blue-50/50 text-blue-700 font-bold' 
//                       : 'border-gray-200 hover:border-gray-300 text-gray-600 font-medium'
//                   }`}
//                 >
//                   <Building className="h-6 w-6 mx-auto mb-2" />
//                   <span className="text-xs block">NetBanking</span>
//                 </button>
//               </div>

//               {/* Dynamic Subforms */}
//               {paymentMethod === 'card' && (
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Card Number</label>
//                     <input 
//                       type="text" 
//                       placeholder="•••• •••• •••• ••••" 
//                       defaultValue="4111 2222 3333 4444"
//                       className="w-full p-3 rounded-xl border border-gray-300 font-mono tracking-widest text-sm"
//                     />
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Expiry Date</label>
//                       <input 
//                         type="text" 
//                         placeholder="MM/YY" 
//                         defaultValue="12/29"
//                         className="w-full p-3 rounded-xl border border-gray-300 font-mono text-sm"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-xs font-bold uppercase text-gray-500 mb-1">CVV Security</label>
//                       <input 
//                         type="password" 
//                         placeholder="•••" 
//                         defaultValue="123"
//                         className="w-full p-3 rounded-xl border border-gray-300 font-mono text-sm"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {paymentMethod === 'upi' && (
//                 <div className="text-center p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-gray-200">
//                   <div className="mx-auto w-32 h-32 bg-white p-2 rounded-xl shadow-inner border border-gray-100 flex items-center justify-center relative mb-4">
//                     <div className="w-28 h-28 bg-slate-950 flex flex-wrap p-1 gap-0.5">
//                       {Array.from({ length: 49 }).map((_, i) => (
//                         <div 
//                           key={i} 
//                           className={`w-[14.28%] h-[14.28%] ${
//                             (i % 3 === 0 || i % 7 === 0 || i < 10 || i > 38) ? 'bg-black' : 'bg-white'
//                           }`} 
//                         />
//                       ))}
//                     </div>
//                     <div className="absolute inset-0 m-auto w-8 h-8 bg-white rounded-full flex items-center justify-center text-[10px] font-black text-blue-600 shadow-md">
//                       BIA
//                     </div>
//                   </div>
//                   <p className="text-xs text-gray-600 font-medium">Scan this secure QR code using GooglePay, PhonePe, or BHIM</p>
//                   <p className="text-[11px] text-amber-600 font-bold mt-1">Simulated Session expires in 5:00 minutes</p>
//                 </div>
//               )}

//               {paymentMethod === 'netbanking' && (
//                 <div className="space-y-3">
//                   <p className="text-xs text-gray-500">Choose your secure partner banking institution:</p>
//                   <div className="grid grid-cols-2 gap-2">
//                     {["Chase Bank", "Barclays London", "State Bank of India", "HSBC", "HDFC Bank", "ICICI Bank"].map(bank => (
//                       <button 
//                         key={bank}
//                         type="button" 
//                         className="p-3 text-left border rounded-xl hover:bg-slate-50 transition text-xs font-semibold flex items-center gap-2"
//                       >
//                         <Building className="h-4 w-4 text-blue-600" /> {bank}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               <div className="mt-8 flex items-center gap-3 bg-slate-50 p-4 rounded-xl text-xs text-gray-500">
//                 <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
//                 <p>Your connection is fortified with standard AES 256-Bit SSL protection protocols. Boston Institute of Analytics never saves CVV parameters.</p>
//               </div>

//               <button
//                 type="button"
//                 onClick={handleFinalSuccess}
//                 className="w-full mt-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 text-base"
//               >
//                 Confirm Payment of {currencySymbol}{amount}.00
//               </button>

//             </div>

//           </div>
//         )}

//         {/* STEP: SUCCESS TRANSACTION RECEIPT */}
//         {paymentFlowState === 'success' && (
//           <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden text-center">
            
//             <div className="bg-emerald-600 text-white p-8">
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 animate-pulse">
//                 <CheckCircle2 className="h-10 w-10 text-white" />
//               </div>
//               <h3 className="text-2xl font-black">Fees Paid Successfully!</h3>
//               <p className="text-sm text-emerald-100 mt-1">Enrollment processed and confirmed</p>
//             </div>

//             <div className="p-8 space-y-6 text-left">
              
//               <div className="border-b pb-4">
//                 <span className="text-xs text-gray-400 font-bold block uppercase tracking-wider">Transaction ID</span>
//                 <span className="text-lg font-mono font-bold text-gray-800">{transactionId || "TXN-854721"}</span>
//               </div>

//               <div className="grid grid-cols-2 gap-4 text-sm">
//                 <div>
//                   <span className="text-xs text-gray-400 font-medium block">Student Name</span>
//                   <span className="font-bold text-gray-800">{fullName}</span>
//                 </div>
//                 <div>
//                   <span className="text-xs text-gray-400 font-medium block">Email Registered</span>
//                   <span className="font-bold text-gray-800 break-all">{email}</span>
//                 </div>
//                 <div>
//                   <span className="text-xs text-gray-400 font-medium block">Campus Location</span>
//                   <span className="font-bold text-gray-800">{campus}</span>
//                 </div>
//                 <div>
//                   <span className="text-xs text-gray-400 font-medium block">Admitted Course</span>
//                   <span className="font-bold text-gray-800">{course}</span>
//                 </div>
//                 <div>
//                   <span className="text-xs text-gray-400 font-medium block">Program Level</span>
//                   <span className="font-bold text-gray-800">{program}</span>
//                 </div>
//                 <div>
//                   <span className="text-xs text-gray-400 font-medium block">Amount Captured</span>
//                   <span className="font-extrabold text-emerald-600">{currencySymbol}{amount}.00</span>
//                 </div>
//               </div>

//               <div className="bg-slate-50 p-4 rounded-xl text-xs text-gray-500 border border-slate-100">
//                 <span className="font-bold text-gray-700 block mb-1">Next steps:</span>
//                 An official payment invoice has been dispatched to <span className="font-semibold text-gray-700">{email}</span>. Please present this to verify your entry at the <span className="font-semibold text-gray-700">{campus}</span> branch.
//               </div>

//               <button
//                 type="button"
//                 onClick={() => {
//                   setMobileNumber('');
//                   setFullName('');
//                   setEmail('');
//                   setCampus('');
//                   setCourse('');
//                   setProgram('');
//                   setAmount('');
//                   setErrors({});
//                   setTouched({});
//                   setAutoFilledBadge(false);
//                   setPaymentFlowState('form');
//                 }}
//                 className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all text-xs"
//               >
//                 Reset and Process New Student Payment
//               </button>

//             </div>

//           </div>
//         )}

//       </main>

//       {/* FOOTER SECTION with the Auto-Sliding Infinite Carousel Cards */}
//       <footer className="bg-[#121824] text-white pt-12 pb-8 px-4 border-t border-slate-800 mt-16 overflow-hidden">
//         <div className="max-w-7xl mx-auto">
          
//           <div className="text-center mb-8">
//             <h3 className="text-xl sm:text-2xl font-black tracking-widest text-[#a0aec0] uppercase">CONTACT US</h3>
            
//             <div className="mt-4 inline-flex items-center gap-3 bg-[#1e293b] hover:bg-[#334155] border border-slate-700 px-6 py-3.5 rounded-xl transition-all cursor-pointer group" onClick={copyToClipboard}>
//               <span className="text-[#e2e8f0] font-semibold text-sm sm:text-lg tracking-wider break-all">
//                 connect@bostoninstituteofanalytics.org
//               </span>
//               <button className="text-blue-400 group-hover:text-blue-300 p-1" title="Copy email address">
//                 {copiedEmail ? <CheckCircle2 className="h-5 w-5 text-emerald-400 animate-bounce" /> : <Copy className="h-5 w-5" />}
//               </button>
//             </div>
//             {copiedEmail && (
//               <p className="text-emerald-400 text-xs mt-2 font-bold animate-pulse">Email address copied to clipboard!</p>
//             )}
//           </div>

//           {/* Interactive Campus Search Bar */}
//           <div className="max-w-md mx-auto mb-8 relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Search className="h-4 w-4 text-slate-400" />
//             </div>
//             <input 
//               type="text"
//               value={footerSearch}
//               onChange={(e) => setFooterSearch(e.target.value)}
//               placeholder="Filter campuses (e.g. London, Boston, Powai)..."
//               className="w-full pl-10 pr-4 py-2.5 bg-[#1e293b] border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* AUTOMATIC CONTINUOUS SLIDING CAROUSEL (Infinite Loop) */}
//           <div className="mb-10 relative">
//             <div className="flex justify-between items-center mb-4 max-w-5xl mx-auto px-4">
//               <span className="text-[11px] text-slate-400 uppercase font-black tracking-widest">
//                 Our Worldwide Hubs &middot; Click to select in form
//               </span>
              
//               {/* Play / Pause indicator button */}
//               <button 
//                 onClick={() => setIsPaused(!isPaused)}
//                 className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-all bg-slate-800/80 hover:bg-slate-700/80 py-1 px-3 rounded-full"
//               >
//                 {isPaused ? (
//                   <>
//                     <Play className="h-3 w-3 text-emerald-400" />
//                     <span>Auto-Play</span>
//                   </>
//                 ) : (
//                   <>
//                     <Pause className="h-3 w-3 text-amber-400 animate-pulse" />
//                     <span>Pause</span>
//                   </>
//                 )}
//               </button>
//             </div>
            
//             {/* Carousel track container with linear masking shadow */}
//             <div className="relative w-full overflow-hidden py-2 select-none">
              
//               {/* Fade masks for visual continuity */}
//               <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-[#121824] to-transparent z-10 pointer-events-none"></div>
//               <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-[#121824] to-transparent z-10 pointer-events-none"></div>

//               {/* Seamless animated sliding strip */}
//               <div 
//                 className={`animate-marquee-loop ${isPaused ? 'animate-marquee-paused' : ''} hover:animate-marquee-paused gap-4 flex`}
//                 onMouseEnter={() => setIsPaused(true)}
//                 onMouseLeave={() => setIsPaused(false)}
//               >
//                 {slidingList.map((chip, idx) => (
//                   <button 
//                     key={`${chip.label}-${idx}`}
//                     type="button"
//                     onClick={() => selectCampusFromSlide(chip.fullName)}
//                     className="bg-[#1e293b] hover:bg-blue-900 hover:border-blue-500 hover:scale-105 transition-all duration-300 border border-slate-700 rounded-xl px-6 py-3 text-center min-w-[145px] max-w-[180px] flex flex-col items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     title={`Click to set ${chip.fullName} in the form above`}
//                   >
//                     <MapPin className="h-4 w-4 text-blue-400 mb-1" />
//                     <p className="text-xs font-black text-white whitespace-nowrap">{chip.label}</p>
//                     <p className="text-[10px] text-slate-400 mt-0.5 whitespace-nowrap">{chip.loc}</p>
//                   </button>
//                 ))}
//               </div>

//             </div>
//           </div>

//           {/* Navigation Links block */}
//           <div className="border-t border-slate-800 pt-8 flex flex-col items-center">
            
//             <div className="flex flex-wrap justify-center gap-y-2 gap-x-4 text-center text-[10px] sm:text-xs font-black text-[#cbd5e0] tracking-wider mb-6">
//               <a href="#home" className="hover:text-blue-400 transition-colors">HOME</a>
//               <span className="text-slate-600">|</span>
//               <a href="#roadmap" className="hover:text-blue-400 transition-colors">LEARNING ROADMAP</a>
//               <span className="text-slate-600">|</span>
//               <a href="#council" className="hover:text-blue-400 transition-colors">ADVISORY COUNCIL</a>
//               <span className="text-slate-600">|</span>
//               <a href="#inaction" className="hover:text-blue-400 transition-colors">BIA IN ACTION</a>
//               <span className="text-slate-600">|</span>
//               <a href="#campuses" className="hover:text-blue-400 transition-colors">CAMPUS LOCATIONS</a>
//               <span className="text-slate-600">|</span>
//               <a href="#payment" className="text-blue-400 hover:underline">FEES PAYMENT</a>
//             </div>

//             <p className="text-[10px] text-slate-400 text-center">
//               © 2026 <span className="font-bold text-white">Boston Institute of Analytics</span>. All Rights Reserved.
//             </p>

//             <div className="flex gap-4 mt-3 text-[10px] text-slate-400">
//               <button onClick={() => setShowTermsModal(true)} className="hover:text-blue-400 transition-colors underline">Privacy Policy</button>
//               <span>•</span>
//               <button onClick={() => setShowTermsModal(true)} className="hover:text-blue-400 transition-colors underline">Terms and Conditions</button>
//             </div>

//           </div>

//         </div>
//       </footer>

//       {/* TERMS & CONDITIONS INTERACTIVE MODAL */}
//       {showTermsModal && (
//         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            
//             <h3 className="text-lg font-bold text-[#1e3a8a] mb-4">BIA® Terms and Conditions</h3>
            
//             <div className="space-y-3 text-xs text-gray-600 overflow-y-auto max-h-[50vh] pr-2">
//               <p className="font-bold">1. Fee Payments and Enrollments</p>
//               <p>All program fees computed inside this portal must match currency guidelines set by local regional regulatory branches. Fees paid are valid for the selected academic term block only.</p>
              
//               <p className="font-bold">2. Refund Guidelines</p>
//               <p>Refunds or transfers between dynamic training modules are subject to written clearance by the Registrar's Office of Boston Institute of Analytics at least 14 working days before program commencement.</p>

//               <p className="font-bold">3. Sandbox Disclaimer</p>
//               <p>This is a simulated deployment application designed for evaluating modern design fidelity. No real bank instruments or financial resources are exchanged in this session.</p>
//             </div>

//             <div className="mt-6 pt-4 border-t flex justify-end">
//               <button 
//                 type="button" 
//                 onClick={() => setShowTermsModal(false)}
//                 className="bg-[#1e3a8a] hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-lg text-xs"
//               >
//                 Close & Accept Terms
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }






import React, { useState, useEffect } from 'react';
import { getCampuses, getCourses, createPayment, PaymentPayload } from '../api/payment';

interface Campus {
  id: number;
  campus_name: string;
  city: { city_name: string };
}

interface Course {
  id: number;
  course_name: string;
  courseGroup: { title: string };
}

const PaymentForm = () => {
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    amount: '',
    payment_method: 'Credit Card',
    campus_id: '',
    course_id: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [campusData, courseData] = await Promise.all([
          getCampuses(),
          getCourses()
        ]);
        setCampuses(Array.isArray(campusData) ? campusData : []);
        setCourses(Array.isArray(courseData) ? courseData : []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload: PaymentPayload = {
        full_name: formData.full_name,
        email: formData.email,
        phone_number: formData.phone_number,
        amount: parseFloat(formData.amount),
        payment_method: formData.payment_method,
        campus_id: parseInt(formData.campus_id),
        course_id: parseInt(formData.course_id),
      };
      await createPayment(payload);
      alert('Payment and Lead created successfully!');
    } catch (error) {
      console.error(error);
      alert('Error creating payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        {/* Left Form Section */}
        <div style={styles.formCard}>
          <div style={styles.header}>
            <span style={styles.icon}>💳</span>
            <h2 style={styles.title}>Fees Payment</h2>
          </div>
          <p style={styles.subtitle}>
            Please enter your mobile number. If it is already registered, your details will be fetched automatically.
          </p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Mobile Number <span style={styles.required}>*</span></label>
              <input 
                name="phone_number" 
                value={formData.phone_number} 
                placeholder="Enter Mobile Number" 
                required 
                onChange={handleChange} 
                style={styles.input}
              />
            </div>

            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name <span style={styles.required}>*</span></label>
                <input 
                  name="full_name" 
                  value={formData.full_name} 
                  placeholder="Full Name" 
                  required 
                  onChange={handleChange} 
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email ID <span style={styles.required}>*</span></label>
                <input 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  placeholder="something@example.com" 
                  required 
                  onChange={handleChange} 
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Campus <span style={styles.required}>*</span></label>
              <select 
                name="campus_id" 
                value={formData.campus_id} 
                required 
                onChange={handleChange}
                style={styles.select}
              >
                <option value="">Select</option>
                {campuses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.campus_name} - {c.city?.city_name}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Course <span style={styles.required}>*</span></label>
                <select 
                  name="course_id" 
                  value={formData.course_id} 
                  required 
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="">Select</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.course_name} ({c.courseGroup.title})
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Payment Method</label>
                <select 
                  name="payment_method" 
                  value={formData.payment_method} 
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="Credit Card">Credit Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Amount <span style={styles.required}>*</span></label>
              <div style={styles.amountWrapper}>
                <span style={styles.currencyPrefix}>₹</span>
                <input 
                  name="amount" 
                  type="number" 
                  value={formData.amount} 
                  placeholder="Enter Amount" 
                  required 
                  onChange={handleChange} 
                  style={styles.amountInput}
                />
                <span style={styles.currencySuffix}>.00</span>
              </div>
            </div>

            <p style={styles.termsText}>
              By clicking, you are confirming that you have read, understood and agreed to <a href="#terms" style={styles.link}>BIA® Terms and Conditions</a>.
            </p>

            <button type="submit" disabled={loading} style={styles.button}>
              {loading ? 'Processing...' : 'Continue Payment'}
            </button>
          </form>
        </div>

        {/* Right Image Banner Section with responsive hide/show support */}
        <div className="image-banner-container" style={styles.imageCard}>
          <div style={styles.blueCircle}></div>
          <img 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80" 
            alt="Graduate Student" 
            style={styles.graduateImage}
          />
        </div>
      </div>

      {/* Media query styling injected dynamically for full layout responsiveness */}
      <style>{`
        @media (max-width: 900px) {
          div[style*="max-width: 980px"] {
            flex-direction: column !important;
            max-width: 520px !important;
          }
          .image-banner-container {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  pageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f7fc',
    minHeight: '100vh',
    padding: '16px',
    boxSizing: 'border-box' as const,
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  },
  container: {
    display: 'flex',
    flexDirection: 'row' as const,
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    boxShadow: '0 12px 35px rgba(0, 0, 0, 0.06)',
    width: '100%',
    maxWidth: '980px',
    overflow: 'hidden',
    boxSizing: 'border-box' as const,
  },
  formCard: {
    flex: 1,
    padding: '36px',
    boxSizing: 'border-box' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
  },
  imageCard: {
    flex: 1,
    backgroundColor: '#eaf1fc',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'relative' as const,
    overflow: 'hidden',
    minHeight: '450px',
  },
  blueCircle: {
    position: 'absolute' as const,
    width: '300px',
    height: '300px',
    backgroundColor: '#9abcf8',
    borderRadius: '50%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -55%)',
    zIndex: 1,
  },
  graduateImage: {
    position: 'relative' as const,
    zIndex: 2,
    maxHeight: '460px',
    objectFit: 'contain' as const,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px',
  },
  icon: {
    fontSize: '24px',
  },
  title: {
    margin: 0,
    fontSize: '22px',
    fontWeight: '700',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: '12px',
    color: '#666',
    lineHeight: '1.4',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '14px',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '5px',
    flex: 1,
  },
  label: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#2d3748',
  },
  required: {
    color: '#e53e3e',
  },
  input: {
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    fontSize: '13px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  select: {
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    fontSize: '13px',
    outline: 'none',
    cursor: 'pointer',
  },
  amountWrapper: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    backgroundColor: '#f8fafc',
    overflow: 'hidden',
  },
  currencyPrefix: {
    padding: '10px 0 10px 12px',
    color: '#64748b',
    fontWeight: '500',
    fontSize: '13px',
  },
  amountInput: {
    flex: 1,
    border: 'none',
    backgroundColor: 'transparent',
    padding: '10px 6px',
    fontSize: '13px',
    outline: 'none',
  },
  currencySuffix: {
    padding: '10px 12px 10px 0',
    color: '#64748b',
    fontWeight: '500',
    fontSize: '13px',
  },
  termsText: {
    fontSize: '11px',
    color: '#64748b',
    lineHeight: '1.4',
    margin: '2px 0',
  },
  link: {
    color: '#2563eb',
    textDecoration: 'underline',
  },
  button: {
    marginTop: '4px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};

export default PaymentForm;