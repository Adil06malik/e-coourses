import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Twitter, 
  X, 
  ExternalLink, 
  Search, 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  CheckCircle2, 
  ArrowUpRight,
  MapPin,
  Calendar,
  Users
} from 'lucide-react';

const ENROLLED_COURSES = [
  { name: "Data Science and Artificial Intelligence", duration: "10 Months", levels: "Beginner to Advanced", description: "Comprehensive specialization in predictive modeling, neural networks, ML systems, and advanced generative AI frameworks." },
  { name: "Generative AI & Agentic AI Development", duration: "6 Months", levels: "Intermediate", description: "Mastering Large Language Models (LLMs), LangChain, custom AI agents, Vector Databases, and architectural deployment." },
  { name: "Investment Banking and Financial Analytics", duration: "8 Months", levels: "Beginner to Intermediate", description: "Focuses on financial modeling, valuations, deal structure mechanics, and quantitative financial computational tools." },
  { name: "Cyber Security & Ethical Hacking", duration: "9 Months", levels: "Beginner to Advanced", description: "Advanced penetration testing, network defense systems, secure architecture design, threat intelligence, and digital forensics." },
  { name: "Chartered Financial Analyst (CFA)", duration: "12 Months", levels: "Advanced Prep", description: "Tailored educational program focused on global investment management standards, financial analysis, and portfolio optimization." },
  { name: "Digital Marketing and Analytics", duration: "6 Months", levels: "Beginner", description: "Data-driven marketing methodologies, programmatic buying, attribution analysis, search marketing, and consumer psychology." },
  { name: "Integrated 2D & 3D Animation", duration: "10 Months", levels: "Beginner to Professional", description: "Creative pipeline training covering asset generation, cinematic layouts, organic rigging, lighting rendering, and visual effects." },
  { name: "Advertising, PR & Corporate Communications", duration: "8 Months", levels: "Intermediate", description: "Strategic public image planning, media relations, brand messaging mechanics, crises communication management, and copywriting." }
];

const BIA_SCHOOLS = [
  { name: "Boston School of Technology and AI", focus: "AI, Blockchain, Software & Infrastructure Engineering", location: "Boston & Global Hubs" },
  { name: "Boston School of Management", focus: "MBA Analytics, Business Intelligence & Product Strategy", location: "Boston & Europe Hubs" },
  { name: "Boston School of Animation and Design", focus: "Visual Effects, Metaverse Art & Interactive Design", location: "Boston Studio Hub" },
  { name: "Boston School of Media and Communication", focus: "PR Strategy, Creative Directing & Investigative Media", location: "Boston Campus" },
  { name: "Boston School of Corporate Training", focus: "Upskilling, Executive Retreats & AI Adaption Seminars", location: "Corporate Services" },
  { name: "Boston School of Finance", focus: "FinTech Innovation, Algo Trading & Quantitative Assets", location: "Global Finance Campus" }
];

const QUICK_LINKS = [
  { name: "Home", action: "home" },
  { name: "Become A BIA® Partner", action: "partner" },
  { name: "Advisory Council", action: "advisory" },
  { name: "Fees Payment", action: "fees" },
  { name: "Careers", action: "careers" },
  { name: "Student Testimonials", action: "testimonials" },
  { name: "Privacy Policy", action: "privacy" },
  { name: "Terms and Conditions", action: "terms" },
  { name: "Live Interactive", action: "live" },
  { name: "Blogs", action: "blogs" }
];

export default function Footer() {
  const [activeCourse, setActiveCourse] = useState<typeof ENROLLED_COURSES[0] | null>(null);
  const [activeSchool, setActiveSchool] = useState<typeof BIA_SCHOOLS[0] | null>(null);
  const [activeInfo, setActiveInfo] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [subscribedEmail, setSubscribedEmail] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 4000);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscribedEmail) {
      showToast(`Thank you! Information pack has been dispatched to ${subscribedEmail}`);
      setSubscribedEmail("");
    }
  };

  const filteredCourses = ENROLLED_COURSES.filter(course => 
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#0d0e10] text-slate-300 font-sans selection:bg-neutral-700 selection:text-white">
      
      {}
      
      {}
      {searchQuery && (
        <section className="bg-neutral-950/60 border-b border-neutral-900 px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-4">
              Matched Program Results ({filteredCourses.length})
            </h3>
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCourses.map((course, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setActiveCourse(course)}
                    className="p-4 bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl cursor-pointer transition flex justify-between items-center group"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-blue-400 transition">{course.name}</h4>
                      <p className="text-xs text-slate-500 mt-1">{course.duration} • {course.levels}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">No program matched your query. Browse all offerings in the interactive list below.</p>
            )}
          </div>
        </section>
      )}

      {/* Main Sandbox Interactive Portal Area */}
     
      {}
      <footer className="w-full bg-[#0c0c0e] text-slate-400 pt-16 pb-8 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* Main Footer columns structure matching layout in image_97a2a3.png */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16">
            
            {/* Column 1: Top Enrolled Courses (image_97a2a3.png - left column) */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-white font-semibold text-sm tracking-wide mb-5 uppercase relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-8 after:h-0.5 after:bg-neutral-800">
                Top Enrolled Courses
              </h4>
              <ul className="space-y-2.5 text-[13px] font-normal leading-relaxed">
                {ENROLLED_COURSES.map((course, index) => (
                  <li key={index}>
                    <button 
                      onClick={() => setActiveCourse(course)}
                      className="text-left text-slate-400 hover:text-white transition duration-200 flex items-center group"
                    >
                      <span className="w-1.5 h-1.5 bg-neutral-800 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200"></span>
                      <span className="group-hover:translate-x-0.5 transition-transform duration-200">{course.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: BIA® Schools (image_97a2a3.png - second column) */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-white font-semibold text-sm tracking-wide mb-5 uppercase relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-8 after:h-0.5 after:bg-neutral-800">
                BIA® Schools
              </h4>
              <ul className="space-y-2.5 text-[13px] font-normal leading-relaxed">
                {BIA_SCHOOLS.map((school, index) => (
                  <li key={index}>
                    <button 
                      onClick={() => setActiveSchool(school)}
                      className="text-left text-slate-400 hover:text-white transition duration-200 flex items-center group"
                    >
                      <span className="w-1.5 h-1.5 bg-neutral-800 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200"></span>
                      <span className="group-hover:translate-x-0.5 transition-transform duration-200">{school.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Quick Links (image_97a2a3.png - third column) */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-white font-semibold text-sm tracking-wide mb-5 uppercase relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-8 after:h-0.5 after:bg-neutral-800">
                Quick Links
              </h4>
              <ul className="space-y-2.5 text-[13px] font-normal leading-relaxed">
                {QUICK_LINKS.map((link, index) => (
                  <li key={index}>
                    <button 
                      onClick={() => setActiveInfo(link.name)}
                      className="text-left text-slate-400 hover:text-white transition duration-200 flex items-center group"
                    >
                      <span className="w-1.5 h-1.5 bg-neutral-800 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200"></span>
                      <span className="group-hover:translate-x-0.5 transition-transform duration-200">{link.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Branding Logo, Contact and Social Media Icons (image_97a2a3.png - right column) */}
            <div className="lg:col-span-4 space-y-6 lg:pl-4">
              
              {/* Custom High-Fidelity BIA Logo Construction */}
              <div className="flex items-center space-x-3.5 select-none py-1">
                {/* Left block of the BIA logo */}
                <div className="text-[40px] font-black tracking-tighter leading-none text-white font-sans">
                  BIA
                </div>
                {/* Vertical Divider line */}
                <div className="h-10 w-[1.5px] bg-neutral-700" />
                {/* Right stacked text block of logo */}
                <div className="flex flex-col justify-center text-[10px] tracking-[0.16em] uppercase font-bold text-white/95 leading-[1.3] font-sans">
                  <span>Boston</span>
                  <span>Institute of</span>
                  <div className="flex items-center gap-1">
                    <span>Analytics</span>
                    <span className="text-[7px] relative -top-1 font-normal font-sans">®</span>
                  </div>
                </div>
              </div>

              {/* Contact Information block precisely matching the text style in image_97a2a3.png */}
              <div className="space-y-3.5 text-[13px] pt-2">
                <span className="block text-slate-400 text-xs font-semibold tracking-wider">Contact:</span>
                
                {/* Email Address with dynamic simulation trigger */}
                <a 
                  href="mailto:connect@bostoninstituteofanalytics.org"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast("Opening system mail handler for connect@bostoninstituteofanalytics.org");
                  }}
                  className="flex items-center space-x-2.5 text-slate-400 hover:text-white transition group"
                >
                  <Mail className="w-4 h-4 text-slate-500 group-hover:text-white transition shrink-0" />
                  <span className="underline underline-offset-4 decoration-neutral-800 hover:decoration-white transition">
                    connect@bostoninstituteofanalytics.org
                  </span>
                </a>

                {/* Primary phone number */}
                <a 
                  href="tel:+16172236315"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast("Dialing primary advisory line: +1 617 223 6315");
                  }}
                  className="flex items-center space-x-2.5 text-slate-400 hover:text-white transition group"
                >
                  <Phone className="w-4 h-4 text-slate-500 group-hover:text-white transition shrink-0" />
                  <span>+1 617 223 6315</span>
                </a>

                {/* Secondary phone number */}
                <a 
                  href="tel:+919619000123"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast("Dialing secondary global line: +91 96190 00123");
                  }}
                  className="flex items-center space-x-2.5 text-slate-400 hover:text-white transition group"
                >
                  <Phone className="w-4 h-4 text-slate-500 group-hover:text-white transition shrink-0" />
                  <span>+91 96190 00123</span>
                </a>
              </div>

              {}
              <div className="pt-4">
                <div className="flex flex-wrap gap-2.5">
                  <button 
                    onClick={() => showToast("Navigating to BIA Official Facebook Profile...")}
                    className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-800 text-slate-400 hover:text-white transition flex items-center justify-center shadow-lg"
                    title="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </button>

                  <button 
                    onClick={() => showToast("Navigating to BIA Official Instagram Profile...")}
                    className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-800 text-slate-400 hover:text-white transition flex items-center justify-center shadow-lg"
                    title="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </button>

                  <button 
                    onClick={() => showToast("Navigating to BIA Official LinkedIn Profile...")}
                    className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-800 text-slate-400 hover:text-white transition flex items-center justify-center shadow-lg"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </button>

                  <button 
                    onClick={() => showToast("Navigating to BIA Official YouTube Channel...")}
                    className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-800 text-slate-400 hover:text-white transition flex items-center justify-center shadow-lg"
                    title="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </button>

                  {/* The X (previously Twitter) icon structured exact like the X glyph in image_97a2a3.png */}
                  <button 
                    onClick={() => showToast("Navigating to BIA Official X Profile...")}
                    className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-800 text-slate-400 hover:text-white transition flex items-center justify-center shadow-lg"
                    title="X (Twitter)"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </button>
                </div>
              </div>

            </div>

          </div>

          {}
          <div className="border-t border-neutral-900/60 pt-8 mt-4 flex flex-col sm:flex-row items-center justify-center text-center">
            <p className="text-slate-500 text-xs sm:text-[13px] tracking-wide font-normal">
              © 2026 Boston Institute of Analytics - All rights reserved
            </p>
          </div>

        </div>
      </footer>

      {}
      {/* Course detailed modal */}
      {activeCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setActiveCourse(null)} />
          <div className="relative z-10 w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400 bg-blue-950/60 border border-blue-900 px-2.5 py-1 rounded-md">Course Syllabus Spotlight</span>
                  <h3 className="text-xl font-bold text-white mt-2.5">{activeCourse.name}</h3>
                </div>
                <button 
                  onClick={() => setActiveCourse(null)} 
                  className="p-1 text-slate-500 hover:text-white rounded-lg hover:bg-neutral-800 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed pt-2">
                {activeCourse.description}
              </p>

              <div className="grid grid-cols-2 gap-4 bg-neutral-950 p-4 rounded-xl border border-neutral-800/80 text-xs">
                <div>
                  <span className="block text-slate-500 uppercase font-semibold tracking-wider mb-1">Standard Duration</span>
                  <div className="flex items-center gap-1.5 text-white font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> {activeCourse.duration}
                  </div>
                </div>
                <div>
                  <span className="block text-slate-500 uppercase font-semibold tracking-wider mb-1">Assumed Difficulty</span>
                  <div className="flex items-center gap-1.5 text-white font-medium">
                    <Users className="w-3.5 h-3.5 text-slate-400" /> {activeCourse.levels}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => {
                    showToast(`Admissions request registered for: ${activeCourse.name}`);
                    setActiveCourse(null);
                  }}
                  className="flex-1 bg-white hover:bg-slate-200 text-black text-sm font-bold py-3 px-4 rounded-xl transition flex items-center justify-center gap-2"
                >
                  <span>Inquire Admissions Info</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => {
                    showToast(`Dispatched study curriculum PDF file to user downloads.`);
                    setActiveCourse(null);
                  }}
                  className="flex-1 bg-neutral-950 border border-neutral-800 hover:bg-neutral-800 text-white text-sm font-semibold py-3 px-4 rounded-xl transition"
                >
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* School detailed modal */}
      {activeSchool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setActiveSchool(null)} />
          <div className="relative z-10 w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-900 px-2.5 py-1 rounded-md">BIA Academic Department</span>
                  <h3 className="text-xl font-bold text-white mt-2.5">{activeSchool.name}</h3>
                </div>
                <button 
                  onClick={() => setActiveSchool(null)} 
                  className="p-1 text-slate-500 hover:text-white rounded-lg hover:bg-neutral-800 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Primary Research Focuses</h4>
                <p className="text-sm text-slate-300 leading-relaxed bg-neutral-950 p-3.5 rounded-xl border border-neutral-800/80">
                  {activeSchool.focus}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Operational Campus Hubs</h4>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{activeSchool.location}</span>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  onClick={() => {
                    showToast(`Routing to department page of ${activeSchool.name}`);
                    setActiveSchool(null);
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold py-3 px-4 rounded-xl transition flex items-center justify-center gap-2"
                >
                  <span>Go to Department Homepage</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick links detailed modal */}
      {activeInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setActiveInfo(null)} />
          <div className="relative z-10 w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6 space-y-4 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-950/50 border border-blue-900/60 text-blue-400 mb-2">
                <CheckCircle2 className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-lg font-bold text-white">{activeInfo} Section Trigger</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                You have requested information about the "{activeInfo}" page. This portal serves as a simulated entry point for Boston Institute of Analytics core architecture.
              </p>
              <div className="pt-4 flex gap-2">
                <button 
                  onClick={() => {
                    showToast(`Launching navigation flow to: ${activeInfo}`);
                    setActiveInfo(null);
                  }}
                  className="flex-1 bg-white hover:bg-slate-200 text-black text-xs font-bold py-2.5 rounded-lg transition"
                >
                  Confirm Navigation
                </button>
                <button 
                  onClick={() => setActiveInfo(null)}
                  className="flex-1 bg-neutral-950 border border-neutral-800 hover:bg-neutral-800 text-white text-xs font-semibold py-2.5 rounded-lg transition"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating interactive notification system */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-neutral-900 border border-neutral-800 text-white text-xs p-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300">
          <div className="h-2 w-2 rounded-full bg-emerald-400 shrink-0 animate-ping"></div>
          <span className="flex-grow font-medium text-slate-200">{toastMessage}</span>
          <button 
            onClick={() => setToastMessage("")} 
            className="text-slate-500 hover:text-white font-bold ml-1 text-sm outline-none"
          >
            ×
          </button>
        </div>
      )}

    </div>
  );
}