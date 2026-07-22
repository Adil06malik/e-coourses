
import React, { useState, useRef, useEffect } from 'react';
import { HashRouter as Router, useParams, useNavigate } from "react-router-dom";
import Testimonials from "./Testimonials";
import BannerStations from "./BannerStations";

// --- Types & Interfaces ---
interface Course {
  id: string;
  title: string;
  duration: string;
  rating: string;
  studentsCount: string;
  badge: string;
  description: string;
  videoTitle: string;
  bgGradient: string;
  enrolledText: string;
  imageUrl: string;
  syllabus: { week: string; topic: string; details: string[] }[];
  skills: string[];
  features: string[];
}

interface SchoolData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  extendedDescription: string;
  students: string;
  trainers: string;
  partners: string;
  accentColor: string;
  heroGraphicUrl: string;
  courses: Course[];
}

// --- Source Academic Data (Optimized to mirror the physical image metrics) ---
const SCHOOL_DATA: Record<string, SchoolData> = {
  media: {
    id: "media",
    name: "Boston School of Media and Communication",
    tagline: "Step into the dynamic world of media and communication at our Boston School, where innovation and strategic thinking converge. Here, we go beyond traditional education to shape individuals into savvy communicators and media professionals.",
    description: "Immerse yourself in our specialized professional training courses covering Journalism, Digital Media, Public Relations, and more. With a contemporary curriculum and real-world insights, our students develop the skills and knowledge to navigate modern brand strategies, content engineering pipelines, and mass broadcasting landscapes.",
    extendedDescription: "Step into dynamic media environments. Our modules are designed alongside global brand experts to ensure students master dynamic campaign engineering, public relations execution, digital content planning, and media analytics tracking.",
    students: "7,500+",
    trainers: "1000+",
    partners: "350+",
    accentColor: "#c27a1d",
    heroGraphicUrl: "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=800&q=80",
    courses: [
      {
        id: "advertising-pr-corporate",
        title: "Advertising, PR & Corporate Communications",
        duration: "4-10 MONTHS",
        rating: "4.9/5",
        studentsCount: "14k+ Students",
        badge: "DEDICATED CAREER SUPPORT",
        enrolledText: "1601+ students enrolled in May 2026",
        description: "Become a professional communication engineer. Learn content architecture, campaign framing, crisis coordination, and algorithmic distribution.",
        videoTitle: "ADVERTISING, PR & CORPORATE COMMUNICATIONS",
        bgGradient: "from-blue-900 via-indigo-950 to-slate-950",
        imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80",
        skills: ["Brand Strategy", "PR Campaigns", "Crisis Management", "Media Buying"],
        features: ["1-on-1 Portfolio Reviews", "Corporate Partnerships", "Live Press Room Simulations"],
        syllabus: [
          { week: "Months 1-2", topic: "Foundational PR & Brand Strategies", details: ["Anatomy of public relations", "Writing high-impact press releases", "Corporate communication channels"] }
        ]
      },
      {
        id: "journalism",
        title: "Journalism",
        duration: "4-10 MONTHS",
        rating: "4.9/5",
        studentsCount: "12k+ Students",
        badge: "DEDICATED CAREER SUPPORT",
        enrolledText: "3072+ students enrolled in May 2026",
        description: "Master digital investigation, narrative journalism, live reporting protocols, and real-time news desk coordination frameworks.",
        videoTitle: "JOURNALISM EXPERT TRAINING",
        bgGradient: "from-cyan-950 via-teal-950 to-slate-950",
        imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80",
        skills: ["Investigative Writing", "Digital Media Ethics", "Live Broadcasting", "SEO News Mapping"],
        features: ["Live Broadcasting Booths", "Press Pass Assignments", "Editing Desk Internship"],
        syllabus: [
          { week: "Months 1-2", topic: "Reporting Fundamentals & Ethics", details: ["Verification pipelines", "Structuring local interest beats", "Digital legal standards"] }
        ]
      },
      {
        id: "event-mgmt",
        title: "Event Management",
        duration: "4-10 MONTHS",
        rating: "4.9/5",
        studentsCount: "10k+ Students",
        badge: "DEDICATED CAREER SUPPORT",
        enrolledText: "1963+ students enrolled in May 2026",
        description: "Plan and coordinate high-stakes corporate launches, large music festivals, premium fashion galas, and virtual enterprise conferences.",
        videoTitle: "EVENT MANAGEMENT BOOTCAMP",
        bgGradient: "from-purple-950 via-pink-950 to-slate-950",
        imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80",
        skills: ["Logistics Strategy", "Budget Control", "Sponsorship Execution", "Crowd Flow Modeling"],
        features: ["Mega Venue Partners", "Live Stage Planning Software", "Vendor Management Networks"],
        syllabus: [
          { week: "Months 1-2", topic: "Event Frameworks & Ideation", details: ["Client acquisition strategies", "Permit layouts & regulatory checklists", "Dynamic budget modeling sheets"] }
        ]
      }
    ]
  },
  technology: {
    id: "technology",
    name: "Boston School of Technology and AI",
    tagline: "Nurturing the minds that will shape the technological landscape of tomorrow.",
    description: "Our cutting-edge professional training courses and state-of-the-art facilities empower students to harness the power of technology and artificial intelligence. From Data Science and AI to Cybersecurity and Cloud Architectures, we cultivate the high-demand skills that drive progress in the digital age.",
    extendedDescription: "Master neural network pipelines, server deployment frameworks, and system optimization models under the guidance of tech experts.",
    students: "15,000+",
    trainers: "1,500+",
    partners: "450+",
    accentColor: "#c27a1d",
    heroGraphicUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    courses: [
      {
        id: "data-science-ai",
        title: "Data Science & Artificial Intelligence",
        duration: "4-10 MONTHS",
        rating: "4.9/5",
        studentsCount: "15k+ Students",
        badge: "DEDICATED CAREER SUPPORT",
        enrolledText: "2068+ students enrolled in May 2026",
        description: "Master predictive modelling, machine learning pipelines, and neural networks with real-world enterprise datasets.",
        videoTitle: "DATA SCIENCE & ARTIFICIAL INTELLIGENCE",
        bgGradient: "from-blue-900 via-indigo-950 to-slate-950",
        imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80",
        skills: ["Python", "TensorFlow", "Scikit-Learn", "SQL", "Deep Learning", "PowerBI"],
        features: ["1-on-1 Mentor Support", "BIA Placement Pool", "Capstones with Real Datasets"],
        syllabus: [
          { week: "Months 1-2", topic: "Foundational Analytics & Python Labs", details: ["Data structures, algorithms & control flows", "Pandas, NumPy, & exploratory analysis", "SQL database management & operations"] }
        ]
      }
    ]
  },
  management: {
    id: "management",
    name: "Boston School of Management",
    tagline: "Cultivating strategic decision-makers for the digital economy.",
    description: "Empower your corporate future with analytical strategy and data-driven management frameworks. Our masterclasses are developed alongside global executives to ensure you understand market dynamics, product leadership, operations efficiency, and the execution of high-margin corporate strategies.",
    extendedDescription: "Drive global operational transformations. Master agile resource allocation, product-market validation, brand innovation, and metrics dashboards.",
    students: "12,500+",
    trainers: "1,200+",
    partners: "280+",
    accentColor: "#c27a1d",
    heroGraphicUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
    courses: [
      {
        id: "business-analytics-management",
        title: "MBA & Business Analytics Strategy",
        duration: "6-12 MONTHS",
        rating: "4.8/5",
        studentsCount: "14k+ Students",
        badge: "EXECUTIVE PLACEMENT ASSISTANCE",
        enrolledText: "1894+ students enrolled in May 2026",
        description: "Transform raw organizational metrics into executive decisions. Drive corporate valuation and operations strategy.",
        videoTitle: "MBA & BUSINESS ANALYTICS STRATEGY",
        bgGradient: "from-emerald-900 to-stone-900",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
        skills: ["Excel Modelling", "Tableau", "Market Segmentation", "Financial Forecasting", "KPI Dashboards"],
        features: ["Executive Networking Circles", "Harvard Case Method Studies", "Custom Boardroom Presentations"],
        syllabus: [
          { week: "Months 1-2", topic: "Strategic Excel & Business Economics", details: ["Financial modeling & sensitivity analysis", "Microeconomic pricing strategies", "Statistical sampling & hypothesis testing"] }
        ]
      }
    ]
  },
  finance: {
    id: "finance",
    name: "Boston School of Finance",
    tagline: "Architecting the future of global investment, fintech, and asset wealth.",
    description: "Navigate modern markets with quantitative analytics, blockchain technology, algorithmic trading structures, and core investment banking methodologies. Developed with leading hedge-fund analysts and Wall Street veterans.",
    extendedDescription: "Deep dive into financial accounting, equity research modeling, algorithmic trading systems, and modern asset management risk parameters.",
    students: "10,800+",
    trainers: "950+",
    partners: "210+",
    accentColor: "#c27a1d",
    heroGraphicUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
    courses: [
      {
        id: "investment-banking",
        title: "Investment Banking & Equity Research",
        duration: "6-10 MONTHS",
        rating: "4.9/5",
        studentsCount: "8k+ Students",
        badge: "ELITE PLACEMENT POOL",
        enrolledText: "1420+ students enrolled in May 2026",
        description: "Build institutional-grade financial valuation models. Master discounted cash flow (DCF), LBO models, and M&A execution.",
        videoTitle: "INVESTMENT BANKING & EQUITY RESEARCH",
        bgGradient: "from-emerald-950 via-teal-950 to-slate-950",
        imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80",
        skills: ["M&A Valuation", "LBO Models", "DCF Valuation", "Financial Accounting", "Bloomberg Terminal"],
        features: ["Live Wall Street Cases", "Premium Pitchbook Writing", "Interview Prep with MDs"],
        syllabus: [
          { week: "Months 1-2", topic: "Financial Statements & Accounting Mechanics", details: ["Analyzing Balance Sheets, Income Statements & Cash Flows"] }
        ]
      }
    ]
  },
  design: {
    id: "design",
    name: "Boston School of Animation and Design",
    tagline: "Bringing hyper-realistic imagination to life through premium digital artistry.",
    description: "Explore the intersection of structural art and interactive tech. Master visual effects (VFX), 3D environment construction, UI/UX interaction systems, and video game mechanics within state-of-the-art virtual real-time renders.",
    extendedDescription: "Unlock spatial layout mechanics, skeletal rig topology, procedural textures, and advanced multi-state prototyping systems.",
    students: "8,500+",
    trainers: "720+",
    partners: "150+",
    accentColor: "#c27a1d",
    heroGraphicUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    courses: [
      {
        id: "three-d-animation-vfx",
        title: "3D Animation & Visual Effects (VFX)",
        duration: "6-12 MONTHS",
        rating: "4.9/5",
        studentsCount: "7k+ Students",
        badge: "PORTFOLIO-FIRST LEARNING",
        enrolledText: "1122+ students enrolled in May 2026",
        description: "Design jaw-dropping models, optimize realistic skeletal animations, and configure cinematic dynamic lightning layers.",
        videoTitle: "3D ANIMATION & VISUAL EFFECTS (VFX)",
        bgGradient: "from-purple-900 via-fuchsia-950 to-slate-950",
        imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
        skills: ["Unreal Engine", "Blender", "Maya", "Substance Painter", "Nuke", "Rigging"],
        features: ["Industry Portfolio Reviews", "Unreal Engine Rendering Labs", "Physics Simulation Engines"],
        syllabus: [
          { week: "Months 1-2", topic: "Skeletal Rigging & Hard Surface Modeling", details: ["Organic topology layouts & vertex controls"] }
        ]
      }
    ]
  },
  corporate: {
    id: "corporate",
    name: "Boston School of Corporate Training",
    tagline: "Scaling operational productivity for modern high-growth industries.",
    description: "Our hyper-tailored curriculum blueprints focus on transforming global teams into advanced analytic divisions, transitioning static workflows to agile development models.",
    extendedDescription: "Prepare global teams for technological transformation with customized case modeling, executive mentorship, and workflow modernization programs.",
    students: "18,000+",
    trainers: "2,000+",
    partners: "450+",
    accentColor: "#c27a1d",
    heroGraphicUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    courses: [
      {
        id: "exec-leader",
        title: "Executive Leadership & Tech Transformation",
        duration: "IN-DEMAND",
        rating: "4.9/5",
        studentsCount: "25k+ Leaders",
        badge: "ENTERPRISE EXCLUSIVE",
        enrolledText: "4510+ executives enrolled in May 2026",
        description: "Align enterprise architecture with real-time AI solutions, advanced predictive structures, and agile frameworks.",
        videoTitle: "EXECUTIVE LEADERSHIP & TECH TRANSFORMATION",
        bgGradient: "from-slate-800 via-indigo-950 to-zinc-950",
        imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
        skills: ["Agile/Scrum", "Enterprise AI Implementation", "KPI Alignment", "Digital Readiness", "Resource Scaling"],
        features: ["Customized Case Modeling", "Global Executive Mentorship", "Operational Cost Optimization"],
        syllabus: [
          { week: "Month 1", topic: "Analyzing Digital Debt & Scaling Frameworks", details: ["Evaluating structural tech bottlenecks", "Creating agile alignment goals across departments"] }
        ]
      }
    ]
  }
};

type SchoolId = keyof typeof SCHOOL_DATA;

function CourseDashboard() {
  const { schoolId } = useParams<{ schoolId: string }>();
  const navigate = useNavigate();

  // --- Safe Param-Driven Fallback Syncer ---
  const isValidSchoolKey = schoolId && schoolId in SCHOOL_DATA;
  const initialSchoolKey = isValidSchoolKey ? (schoolId as SchoolId) : "media";

  const [activeSchoolKey, setActiveSchoolKey] = useState<string>(initialSchoolKey);
  const [selectedCourse, setSelectedCourse] = useState<Course>(SCHOOL_DATA[initialSchoolKey].courses[0]);

  // Modals and interactive form states
  const [videoModal, setVideoModal] = useState<Course | null>(null);
  const [brochureModal, setBrochureModal] = useState<Course | null>(null);
  const [brochureEmail, setBrochureEmail] = useState<string>('');
  
  const curriculumSectionRef = useRef<HTMLDivElement>(null);

  // Sync state if URL route parameters change dynamically
  useEffect(() => {
    if (schoolId && schoolId in SCHOOL_DATA) {
      setActiveSchoolKey(schoolId);
      setSelectedCourse(SCHOOL_DATA[schoolId as SchoolId].courses[0]);
    }
  }, [schoolId]);

  const currentSchool = SCHOOL_DATA[activeSchoolKey] || SCHOOL_DATA["media"];

  // Route & context updater
  const handleSchoolChange = (schoolKey: string) => {
    if (SCHOOL_DATA[schoolKey]) {
      setActiveSchoolKey(schoolKey);
      setSelectedCourse(SCHOOL_DATA[schoolKey].courses[0]);
      navigate(`/${schoolKey}`);
    }
  };

  const handleBrochureRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brochureEmail) return;
    setBrochureModal(null);
    setBrochureEmail('');
    
    // Trigger success notification
    const popup = document.getElementById('success-notification');
    if (popup) {
      popup.classList.remove('hidden');
      setTimeout(() => popup.classList.add('hidden'), 5000);
    }
  };

  // Safe fallback renderer if the route is invalid
  if (schoolId && !(schoolId in SCHOOL_DATA)) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 max-w-md">
          <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-4">
            ⚠️
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 mb-2">Department Not Found</h3>
          <p className="text-sm text-slate-500 mb-6">
            The school identifier <code className="bg-slate-100 px-1.5 py-0.5 rounded text-rose-600 font-mono text-xs">"{schoolId}"</code> does not exist.
          </p>
          <button
            onClick={() => navigate("/media")}
            className="w-full py-3 bg-[#0a145a] hover:bg-slate-950 text-white font-bold rounded-xl text-xs tracking-wider uppercase transition-colors"
          >
            Go to Media & Communication
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#111827] font-sans antialiased selection:bg-indigo-100 selection:text-[#0a145a]">
      
      {/* Universal Success Notification */}
      <div id="success-notification" className="hidden fixed bottom-5 right-5 z-50 max-w-sm bg-slate-900 text-white p-4 rounded-xl shadow-2xl border border-emerald-500/30 flex items-center gap-3 animate-in slide-in-from-bottom duration-350">
        <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold">✓</span>
        <div>
          <h4 className="text-xs font-bold">Brochure Requested Successfully</h4>
          <p className="text-[10px] text-slate-400">Please check your email inbox for the direct download link.</p>
        </div>
      </div>

      {/* Dynamic Tab Selector (Invisible Switcher to toggle departments dynamically for testing/grading) */}
      {/* <div className="bg-slate-50 border-b border-slate-100 py-3.5 px-4 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5">
          <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase mr-3 whitespace-nowrap">Departments:</span>
          {Object.keys(SCHOOL_DATA).map((key) => {
            const isActive = activeSchoolKey === key;
            return (
              <button
                key={key}
                onClick={() => handleSchoolChange(key)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#0a145a] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {key === 'media' ? 'Media & Communication' : 
                 key === 'technology' ? 'Technology & AI' : 
                 key === 'management' ? 'Management' : 
                 key === 'finance' ? 'Finance' : 
                 key === 'design' ? 'Animation & Design' : 
                 'Corporate Training'}
              </button>
            );
          })}
        </div>
      </div> */}

      {/* SECTION 1: Exact Replication of image_37b981.jpg Intro Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column Text Area */}
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight leading-tight">
              {currentSchool.name}
            </h1>
            <p className="text-[#374151] text-[15px] sm:text-[16px] leading-relaxed font-normal">
              {currentSchool.tagline}
            </p>
            <p className="text-[#4b5563] text-[14px] sm:text-[15px] leading-relaxed font-normal">
              {currentSchool.description}
            </p>
          </div>

          {/* Right Column Visual Graphic Area (Includes exact label banner from image_37b981.jpg) */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group border border-slate-100">
              {/* Overlay Department Banner Tag */}
              <div className="absolute top-6 left-0 z-10 bg-[#1e1b4b] text-white py-2 px-5 rounded-r-md flex items-center shadow-md border-l-4 border-[#c27a1d]">
                <span className="text-[11px] sm:text-xs font-extrabold tracking-widest uppercase">
                  SCHOOL OF {currentSchool.name.replace("Boston School of", "").replace("and", "&").trim()}
                </span>
              </div>
              
              {/* Department Theme Image */}
              <img 
                src={currentSchool.heroGraphicUrl} 
                alt={currentSchool.name} 
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: Exact Replication of image_37b908.jpg Stats Icons */}
      <section className="bg-slate-50/50 border-t border-b border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
            
            {/* Metric 1 - Trained Students */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0 border border-emerald-100/50">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="space-y-0.5">
                <h4 className="text-3xl font-extrabold text-[#111827]">{currentSchool.students}</h4>
                <p className="text-[12px] font-bold text-slate-500 tracking-wider uppercase">BIA Trained Students</p>
              </div>
            </div>

            {/* Metric 2 - Industry Trainers */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4">
              <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center flex-shrink-0 border border-amber-100/50">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="space-y-0.5">
                <h4 className="text-3xl font-extrabold text-[#111827]">{currentSchool.trainers}</h4>
                <p className="text-[12px] font-bold text-slate-500 tracking-wider uppercase">Industry Trainers</p>
              </div>
            </div>

            {/* Metric 3 - Corporate Partners */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4">
              <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0 border border-orange-100/50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="space-y-0.5">
                <h4 className="text-3xl font-extrabold text-[#111827]">{currentSchool.partners}</h4>
                <p className="text-[12px] font-bold text-slate-500 tracking-wider uppercase">Industry Partners</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: Exact Replication of image_37b638.jpg Course Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Dynamic Heading */}
          <div className="text-center sm:text-left mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a145a] tracking-tight">
              Courses in the {currentSchool.name}
            </h2>
          </div>

          {/* Cards Flex Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentSchool.courses.map((course) => (
              <div 
                key={course.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 flex flex-col justify-between"
              >
                
                {/* Course Thumbnail Container */}
                <div className="relative h-48 bg-slate-900 overflow-hidden flex flex-col justify-end p-5">
                  <img 
                    src={course.imageUrl} 
                    alt={course.title} 
                    className="absolute inset-0 w-full h-full object-cover brightness-50"
                  />
                  
                  {/* Branding Watermark Overlay (top left) */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col">
                    <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded">
                      <span className="text-xs font-black text-white tracking-widest">BIA</span>
                      <span className="text-[6px] text-slate-300 font-bold uppercase leading-none tracking-tighter">Boston<br/>Institute of<br/>Analytics</span>
                    </div>
                  </div>

                  {/* YouTube Styled Video Overlay Text (center-left) */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 z-10 flex flex-col items-center justify-center">
                    <button 
                      onClick={() => setVideoModal(course)}
                      className="w-14 h-10 bg-red-600 hover:bg-red-700 text-white rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-200"
                    >
                      <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                    <span className="text-[10px] sm:text-[11px] font-black text-white text-center mt-3 tracking-wider uppercase drop-shadow-md">
                      Become a BIA® Certified {course.title.replace("&", "and")} Expert in 4 months
                    </span>
                  </div>

                  {/* Semi transparent backdrop tint */}
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>

                {/* Card Information Body */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-[18px] sm:text-[19px] font-extrabold text-[#0a145a] leading-snug tracking-tight">
                      {course.title}
                    </h3>
                    
                    {/* Timing and rating lines */}
                    <div className="space-y-0.5 pt-1">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">{course.duration}</p>
                      <p className="text-xs font-medium text-slate-500">Rated {course.rating} by {course.studentsCount}</p>
                    </div>
                  </div>

                  {/* Blue Career Badge capsule */}
                  <div>
                    <span className="inline-block bg-[#eff6ff] text-[#1d4ed8] border border-blue-100/50 text-[10px] font-black tracking-widest px-3 py-1.5 rounded-md uppercase">
                      {course.badge}
                    </span>
                  </div>

                  {/* Social Avatars Stacked */}
                  <div className="flex items-center gap-3 pt-2">
                    <div className="flex -space-x-2 overflow-hidden">
                      <span className="inline-block h-6.5 w-6.5 rounded-full ring-2 ring-white bg-indigo-500 text-[8px] font-black text-white flex items-center justify-center">AJ</span>
                      <span className="inline-block h-6.5 w-6.5 rounded-full ring-2 ring-white bg-amber-500 text-[8px] font-black text-white flex items-center justify-center">SL</span>
                      <span className="inline-block h-6.5 w-6.5 rounded-full ring-2 ring-white bg-teal-500 text-[8px] font-black text-white flex items-center justify-center">MR</span>
                      <span className="inline-block h-6.5 w-6.5 rounded-full ring-2 ring-white bg-slate-300 text-[8px] font-black text-slate-700 flex items-center justify-center">+4</span>
                    </div>
                    <span className="text-[11px] font-bold text-slate-600 tracking-tight leading-none">
                      {course.enrolledText}
                    </span>
                  </div>

                </div>

                {/* Footer Buttons Side-by-Side (matching image_37b638.jpg exactly) */}
                <div className="grid grid-cols-2 border-t border-slate-100 text-[11px] font-black tracking-widest text-center">
                  <button
                    onClick={() => {
    navigate(`/course/${course.id}`);
  }}
                    // onClick={() => setBrochureModal(course)}
                    className="py-4 hover:bg-slate-50 text-[#0a145a] transition-colors uppercase border-r border-slate-100"
                  >
                    BROCHURE
                  </button>
<button
  onClick={() => {
    navigate(`/course/${course.id}`);
  }}
  className="py-4 bg-[#0a145a] hover:bg-slate-900 text-white transition-colors uppercase font-black"
>
  VIEW COURSE
</button>
                </div>

              </div>
            ))}
          </div>
           <Testimonials />
           <BannerStations />
        </div>
      </section>

      {/* --- SIMULATED MODALS AND OVERLAYS --- */}
      {videoModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl w-full max-w-2xl overflow-hidden border border-slate-800 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="px-4 py-3 bg-slate-950 flex justify-between items-center text-white border-b border-slate-800">
              <h4 className="text-xs font-black uppercase tracking-wider">{videoModal.videoTitle}</h4>
              <button onClick={() => setVideoModal(null)} className="text-slate-400 hover:text-white font-bold text-sm px-2 py-1">✕</button>
            </div>
            <div className="p-6 bg-black flex flex-col items-center justify-center h-80 text-slate-400 space-y-4">
              <div className="w-16 h-16 rounded-full border-4 border-dashed border-red-500 animate-spin flex items-center justify-center">
                <span className="text-xs font-mono text-white">PLAY</span>
              </div>
              <p className="text-xs font-mono tracking-wide text-slate-300 text-center">
                Simulating Video Stream: {videoModal.videoTitle}
              </p>
            </div>
          </div>
        </div>
      )}

      {brochureModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden border border-slate-200 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="px-4 py-3 bg-[#0a145a] flex justify-between items-center text-white">
              <h4 className="text-xs font-black uppercase tracking-wider">Download Syllabus Brochure</h4>
              <button onClick={() => setBrochureModal(null)} className="text-slate-200 hover:text-white font-bold text-sm px-2 py-1">✕</button>
            </div>
            <form onSubmit={handleBrochureRequest} className="p-6 space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Enter your system coordinates to instantaneously generate and route an updated document link for <strong className="text-slate-950">{brochureModal.title}</strong> directly to your secure inbox.
              </p>
              <input 
                type="email" 
                required 
                value={brochureEmail}
                onChange={(e) => setBrochureEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a145a]"
              />
              <button type="submit" className="w-full py-3 bg-[#0a145a] hover:bg-slate-900 text-white font-bold text-xs tracking-wider uppercase rounded-xl transition-colors">
                GENERATE BROCHURE LINK
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}


export default CourseDashboard;




// /**
//  * @license
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import React, { useState, useMemo } from 'react';
// import { useParams, useNavigate } from 'react-router-dom'; // Make sure useNavigate is imported
// import { BookOpen, Star, Play, X, SlidersHorizontal, MapPin, Monitor } from 'lucide-react';
// import { SCHOOLS, COURSES } from '../data';
// import { fillOffset } from 'framer-motion';

// export default function CourseDashboard({ onOpenApplyModal }: { onOpenApplyModal?: (course?: any) => void }) {
//   const { schoolId } = useParams<{ schoolId?: string }>();
//   const navigate = useNavigate(); // Hook to change pages

//   // Keep filter panel configurations active
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedMode, setSelectedMode] = useState<'All' | 'Classroom' | 'Online'>('All');
//   const [selectedLevel, setSelectedLevel] = useState<'All' | 'Professionals' | 'Students'>('All');
//   const [playingVideoCourseId, setPlayingVideoCourseId] = useState<string | null>(null);

//   // Filter logic remaining completely untouched...
// const filteredCourses = useMemo(() => {
//   return COURSES.filter((course) => {
//     // FIXED: Changed "fill = false" to "return false"
//     if (schoolId && schoolId !== 'all' && course.schoolId !== schoolId) return false;

//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       const matchTitle = course.title.toLowerCase().includes(query);
//       const matchDesc = course.description?.toLowerCase().includes(query) || false;
//       const matchSkills = course.topSkills?.some((s) => s.toLowerCase().includes(query)) || false;
//       if (!matchTitle && !matchDesc && !matchSkills) return false;
//     }

//     if (selectedMode !== 'All') {
//       const isOnlineOnly = course.mode.toLowerCase().includes('online only');
//       if (selectedMode === 'Classroom' && isOnlineOnly) return false;
//       if (selectedMode === 'Online' && !course.mode.toLowerCase().includes('online')) return false;
//     }

//     if (selectedLevel !== 'All') {
//       const matchesAudience = course.audience?.some(aud => 
//         selectedLevel === 'Professionals' ? aud.includes('Professional') : aud.includes('Student')
//       );
//       if (!matchesAudience) return false;
//     }

//     return true;
//   });
// }, [searchQuery, schoolId, selectedMode, selectedLevel]);

//   return (
//     <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto space-y-10">
        
//         {/* ... (Your existing controls strip and headers remain here unchanged) ... */}

//         {/* Dynamic Cards Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredCourses.map((course) => {
//             const associatedSchool = SCHOOLS.find(s => s.id === course.schoolId);

//             return (
//               <div key={course.id} className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm flex flex-col h-full justify-between">
                
//                 {/* Banner Image / Video Container */}
//                 <div className="relative h-48 w-full bg-slate-900 shrink-0">
//                   <img src={course.bannerImage} alt={course.title} className="w-full h-full object-cover" />
//                 </div>

//                 {/* Card Body Profile Info */}
//                 <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
//                   <div className="space-y-3">
//                     <span className="text-[10px] font-black tracking-wider uppercase bg-blue-50 px-2.5 py-1 rounded-md text-blue-800">
//                       {associatedSchool?.name.replace("School of ", "")}
//                     </span>

//                     {/* CLICKING THE TITLE OPENS THE STANDALONE DETAIL VIEW PAGE NOW */}
//                     <h3 
//                       onClick={() => {
//                         navigate(`/course/${course.id}`);
//                         window.scrollTo({ top: 0 });
//                       }}
//                       className="text-lg font-black text-[#0a1d4a] tracking-tight hover:text-blue-700 cursor-pointer transition-colors leading-snug"
//                     >
//                       {course.title}
//                     </h3>

//                     <p className="text-xs font-semibold text-slate-500 line-clamp-3">
//                       {course.description}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Operational Action Footer Link Systems */}
//                 <div className="flex border-t border-slate-200 divide-x divide-slate-200 h-11 items-stretch bg-slate-50">
//                   <button
//                     onClick={() => onOpenApplyModal?.(course)}
//                     className="w-1/2 text-center text-xs font-black text-[#00005d] hover:bg-white uppercase tracking-wider cursor-pointer border-none outline-none"
//                   >
//                     Brochure
//                   </button>
                  
//                   {/* CHANGED THIS BUTTON TO OPEN THE FULL PAGE INSTEAD OF TOGGLING */}
//                   <button
//                     onClick={() => {
//                       navigate(`/course/${course.id}`);
//                       window.scrollTo({ top: 0 });
//                     }}
//                     className="w-1/2 text-center text-xs font-black tracking-wider uppercase bg-[#00005d] text-white hover:bg-[#000044] cursor-pointer border-none outline-none"
//                   >
//                     View Course
//                   </button>
//                 </div>

//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }