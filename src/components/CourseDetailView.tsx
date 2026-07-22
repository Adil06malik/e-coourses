/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, BookOpen, Clock, Sparkles, ChevronDown, ChevronUp, Download, CheckCircle2, 
  Building2, Play, ArrowLeft, Mail, Phone, MapPin, Star, Laptop, Check, HelpCircle, ArrowRight, X,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { Course } from '../types';
import designerHeroImage from '../assets/images/designer_headphones_stylus_1780403015433.png';

interface CourseDetailViewProps {
  course: Course;
  onBackToCatalog: () => void;
  onOpenApplyModal: (course: Course) => void;
}

// Custom specialized metadata for the courses to match the high-fidelity design
const DYNAMIC_COURSE_METADATA: Record<string, {
  schoolName: string;
  rankBadge: string;
  ratingText: string;
  learnLabel: string;
  bannerDescription: string;
  handsOnPrefix: string;
  handsOnTools: string[];
  highlights: string[];
  dualCert: {
    title1: string;
    description1: string;
    title2: string;
    description2: string;
  };
  tools: { name: string; url: string }[];
  aiTools: { name: string; url: string }[];
  idealCandidate: string;
  eligibility: string;
  topicsCurious: string[];
  learningRoadmap: string;
  jobOpportunities: string[];
  hiringIndustries: string[];
  assignments: { company: string; brief: string; outcome: string }[];
}> = {
  'three-d-animation-vfx': {
    schoolName: 'Boston School of Animation & Design',
    rankBadge: 'Ranked #1 International Training Institute',
    ratingText: 'Rated 4.9/5 by 14k+ Students',
    learnLabel: 'Learn 3D Animation and VFX',
    bannerDescription: 'Embark on the dynamic journey of 3D Animation and VFX, a comprehensive program blend in the AVGC (Visual Effects, Animation, Gaming Association) -- offering vital 3D animation course, sought after VFX skills, and cutting edge tools. This 3D Animation course features live project experiences, industry expert sessions, masterclasses, and live BIA® DoubleBuster sessions.',
    handsOnPrefix: 'Get hands-on experience with',
    handsOnTools: ['Adobe Photoshop', 'Autodesk Maya', 'Substance Painter', 'Arnold', 'Zbrush', 'Nuke', 'After Effects'],
    highlights: [
      "3D Animation Course and VFX Immersive Classroom Experience",
      "Hands-on Training By Industry Experts",
      "50+ Case Studies and Assignments",
      "In-person Job Interview Preparation (1:1)",
      "Exclusive Job Opportunities Portal",
      "Practical Hands-on 3D Animation Projects",
      "Globally Recognized 3D Animation and VFX Dual Certification",
      "Real World Projects and Case Studies",
      "15+ Modules of 3D Animation Course & VFX",
      "200+ Hrs of Learning & Practicals",
      "360 Degree Career Support",
      "Live BIA® DoubtBuster Sessions",
      "Immersive Plus Online Blended Learning",
      "In-person Career Mentorship (1:1)",
      "Modules Integrated with Latest AI Tools",
      "No Cost EMI Options Available",
      "Access to Top Film Studios & MNCs",
      "BIA® Alumni Status"
    ],
    dualCert: {
      title1: '3D Animation Track',
      description1: 'Focuses on 3D asset modeling, skeletal hand rigging, organic sculpting, and camera spatial rules.',
      title2: 'VFX Professional Track',
      description2: 'Focuses on green screen compounding, live motion capture integration, particle systems, and rendering.'
    },
    tools: [
      { name: 'Photoshop', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80' },
      { name: 'Maya', url: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=120&q=80' },
      { name: 'Substance Painter', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80' },
      { name: 'Arnold', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=120&q=80' },
      { name: 'ZBrush', url: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=120&q=80' },
      { name: 'After Effects', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80' }
    ],
    aiTools: [
      { name: 'OpenAI Dall-E', url: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=80&q=80' },
      { name: 'GitHub Copilot', url: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=80&q=80' },
      { name: 'Google Gemini Pro', url: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=80&q=80' }
    ],
    idealCandidate: 'In the era of VFX and animation, this 3D animation course is open to everyone. Whether you’re a student pursuing arts, Commerce, management, Banking, Engineering, or Science, you can dive into the world of 3D Animation & VFX. For professionals eyeing a shift into this dynamic field of 3D Animation & VFX, this 3D Animation course is a great stepping stone. Professionals eager to boost their VFX & 3D animation skills will find valuable insights on this learning path.',
    eligibility: 'In today’s job market, passion and learning trump degrees. Whether you’re a high school graduate or hold a 12th class pass, your zeal for VFX and 3D animation can initiate this journey. Embrace the excitement of new-age technology in these fields and craft a career driven by your enthusiasm. Acquire skills that not only unlock opportunities but also pave the way for new professional horizons.',
    topicsCurious: [
      'Fundamentals of 3D Animation, Introduction to VFX, Character Modeling and Rigging, Texturing and Shading Techniques, Lighting and Rendering in 3D',
      'Animation Principles and Techniques, Dynamics and Simulation, Compositing and Visual Effects, Matte Painting and Set Extensions, Motion Capture Techniques',
      'Special Effects and Particle Systems, Rendering and Post-Processing Effects, Industry-standard Software Training (e.g., Maya, 3ds Max, Houdini, Blender)',
      'Project-based Learning and Portfolio Development, Real-world VFX Case Studies and Projects.'
    ],
    learningRoadmap: 'Begin with the basics and progress to advanced topics step by step. This prevents feeling overwhelmed, aids in better retention, and facilitates a deeper understanding of new concepts. Each topic builds on what you\'ve learned, forming a solid foundation for continued learning.',
    jobOpportunities: [
      '3D Animator',
      'VFX Artist',
      'Compositor',
      'Game Animator',
      '3D Modeler',
      'Texture Artist',
      'Motion Graphics Designer',
      'VFX Supervisor',
      'Architectural Animator',
      '3D Visualization Artist',
      'Medical Animator',
      'Educational Content Developer',
      'VR/AR Developer',
      'Simulation Developer',
      'UI/UX Animator'
    ],
    hiringIndustries: [
      'VFX and Animation Studios',
      'Gaming Companies',
      'Advertising and Branding Agencies',
      'TV Channel Broadcasters',
      'Product Visualization Consultancies',
      'Architectural Engineering Firms',
      'E-Learning Platform Publishers'
    ],
    assignments: [
      { company: 'Coca-Cola Revamped Ad', brief: 'Reimagine a Coca-Cola commercial using innovative 3D asset animation and VFX mechanics.', outcome: '30-second cinema advertisement reel.' },
      { company: 'Apple Product Visualization', brief: 'Develop an ultra-clean, high-contrast 3D visualization showcasing Apple\'s internal phone circuitry.', outcome: 'PBR renders with camera motion loops.' },
      { company: 'Nike Brand Mascot Creation', brief: 'Create and animate an organic character embodying Nike\'s iconic swoosh design lines.', outcome: 'Rigged 2D/3D dynamic mascot module.' },
      { company: 'Tesla Virtual Showroom', brief: 'Construct an immersive web environment enabling prospective car personalization settings.', outcome: 'Pre-rendered high-fidelity visual showroom assets.' }
    ]
  }
};

// Fallback metadata dynamic compilation values
function compileFallbackMetadata(course: Course) {
  return {
    schoolName: 'Boston Institute of Analytics',
    rankBadge: 'Ranked #1 International Training Institute',
    ratingText: `Rated ${course.rating}/5 by 12k+ Students`,
    learnLabel: `Learn ${course.title}`,
    bannerDescription: course.description,
    handsOnPrefix: 'Get hands-on experience with',
    handsOnTools: course.topSkills,
    highlights: course.highlights.length > 0 && course.highlights.length >= 8 ? course.highlights : [
      `Immersive Physical Classroom Experience & Live Lab Modules focused on ${course.title}`,
      'Hands-on Mentoring by Industry Advisory Leaders and Domain Experts',
      '50+ Real-World Case Studies and High-Impact Capability Capstones',
      '100% Comprehensive Placement Assistance, Warm Mock Drills & Interview Coaching',
      `Globally Accredited Dual Certification Credentials recognized by Top Recruiters`,
      `200+ Hours of Intensive Lectures, Real-Time Practice & Practical Exercises`,
      `Interactive One-on-One Career Guidance & Complete Digital Portfolio Review`,
      'State-of-the-Art Classroom Infrastructure with High-Speed Laboratory Access',
      'Flexible No-Cost EMI Options and Student Financial Aid Assistance Available',
      'Direct Access to BIA® Exclusive Alumni Network with 350+ Global Hiring Partners',
      'Custom Standard Sandbox Case-Studies Tailored to Current Industry Trends',
      'Continuous Dedicated doubt-solving and BIA® DoubtBuster Academic Sessions',
      `Full integration with Advanced AI Tools and Automated Production Pipelines`,
      'In-person Career Mentorship and Complete Resume Building Support Structure',
      'Comprehensive Core Learning Modules starting from Basic Foundations to Advanced'
    ],
    dualCert: {
      title1: `${course.title} Core Specialist`,
      description1: 'Focuses on structural fundamentals, baseline methodologies, computational workflows, and basic frameworks.',
      title2: `${course.title} Advanced Professional`,
      description2: 'Focuses on deep automation workflows, advanced tooling, model architecture deployment, and custom portfolios.'
    },
    tools: course.topSkills.map((s, idx) => ({
      name: s,
      url: `https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=120&q=80`
    })),
    aiTools: [
      { name: 'Generative AI Helper Tools', url: '' },
      { name: 'Copilot Assistants', url: '' }
    ],
    idealCandidate: 'Designed for ambitious students, engineers, corporate managers, and creative design veterans seeking a structured path to master modern execution pipelines and toolsets. Open to college graduates of any stream, from science and technology to commerce and arts.',
    eligibility: 'A minimum of a high school degree, 10th or 12th standard pass or corresponding global equivalent. No previous engineering background or complex layout background is strictly requested, as modules start from the foundational basics.',
    topicsCurious: [
      'Foundational mechanics, interface overview and navigation boundaries',
      'Intermediate pipelines, data structures and pipeline optimization patterns',
      'Advanced specialized deployment modules and automated metrics audit loops',
      'Real-world sandbox execution, team troubleshooting masterclasses and final review.'
    ],
    learningRoadmap: 'We start from absolute zero, designing clear building blocks. First, grasp basic syntax and workflows. Next, transition to mid-scale interactive templates. Finally, build cloud or production-ready models to lock down your recruiting value.',
    jobOpportunities: ['Lead Analyst', 'Operations Architect', 'Technical Consultant', 'Domain Specialist', 'Product Supervisor'],
    hiringIndustries: ['Technology Corporates', 'Financial Institutions', 'Global Consultancies', 'E-commerce Networks', 'Marketing Agencies'],
    assignments: [
      { company: 'Google Labs Case', brief: 'Configure model layouts using predictive matrices.', outcome: 'Interactive dashboard module.' },
      { company: 'JP Morgan Deal-Pitch', brief: 'Formulate valuation schedules for high-cap assets.', outcome: 'Financial workbook tracker.' }
    ]
  };
}

// BIA Advantage static items matching layout
const ADVANTAGE_ITEMS = [
  {
    title: "Immersive Classroom Experience",
    badge: "Classroom",
    tagline: "Experience learning driven by physical sandbox labs, interactive projector guides, and in-person peer feedback networks.",
    flippedText: "Blended Learning Opportunities: BIA® blended learning experience enables students to choose between lively IN-CLASSROOM 3D animation course sessions or seamlessly attend the same session ONLINE. With multi-rail options to interact with the trainer and fellow classmates.",
    asynchText: "Asynchronous Learning Modules: Elevate learning with our asynchronous modules, featuring quizzes, assignments, lecture recordings, and extra resources. This allows students to review learning materials at their own pace.",
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Experienced and Supportive Faculty",
    badge: "Expert Gurus",
    tagline: "Our faculty comprises veterans from Hollywood studios, corporate advisory firms, and senior AI scientists.",
    flippedText: "Flipped Classroom Learning: Our model empowers students to review instructional materials online before class, fostering active discussions, problem-solving, and hands-on activities during face-to-face sessions.",
    asynchText: "Continuous Guidance: Receive unmatched mentorship on active live projects directly under the guidance of field directors.",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Practical Exposure and Skills Development",
    badge: "Applied Labs",
    tagline: "Work on direct corporate assignments, gaining true production-grade feedback with no boring abstract theories.",
    flippedText: "Studio Training Methods: Build industry-accepted master pipelines in real-time labs tailored to corporate recruitment requirements.",
    asynchText: "Advanced Engine Mastery: Gain complete comfort operating Maya, Arnold Renderer, Substance, and Photoshop workflows.",
    img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Dedicated Academic Support",
    badge: "Student Desk",
    tagline: "Enjoy a friction-free education cycle backed by administrative advisors, lab managers, and scheduling coordinators.",
    flippedText: "24/7 Question Answering: Leverage our BIA DoubleBuster learning systems to obtain answers anytime, removing roadblocks.",
    asynchText: "Cohort Progress Audits: Receive individual analytical reports identifying speed and modeling gaps dynamically.",
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Career Guidance and Career Support",
    badge: "360 Placement",
    tagline: "Step into global opportunities. Access private job boards, resume screening drills, and mock corporate pitch trials.",
    flippedText: "Resume Optimization: Senior recruitment representatives guide you to format and display visual achievements beautifully.",
    asynchText: "Guaranteed Placement Leads: Connect directly with 350+ multinational partners hiring professional graduates weekly.",
    img: "https://images.unsplash.com/photo-1521791136364-7286472b315c?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Modern Facilities and Technology Integration",
    badge: "Modern Hubs",
    tagline: "Our physical learning hubs house zero-latency rendering GPUs, modern project boards, and high-speed labs.",
    flippedText: "Generative AI Helpers: The curricula are embedded with latest tools like Copilots and ChatGPT to triple your asset velocity.",
    asynchText: "Physical campus networking: Enjoy collaboration rooms, meeting lounges, and dedicated presentation decks.",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80"
  }
];

// Recruiter quote testimonials
const RECRUITER_QUOTES = [
  {
    company: "Dentsu Media",
    bg: "bg-red-50/70 border-red-100 text-red-950",
    role: "HR Manager",
    quote: "We've hired several candidates who completed BIA's 3D Animation and VFX course. Their dynamic modeling pipelines and portfolio rendering were exceptional, allowing them to deliver assets on day one."
  },
  {
    company: "AJIO Media",
    bg: "bg-blue-50/70 border-blue-100 text-blue-950",
    role: "Head, Digital Media",
    quote: "The graduates from BIA's animation showcase a rare group. They combine classical storyboarding with modern compositing, showing depth that self-paced online videos can never build."
  },
  {
    company: "TataAIA Digital",
    bg: "bg-purple-50/70 border-purple-100 text-purple-950",
    role: "Brand Manager",
    quote: "At our studio, we prioritize talent with practical understanding. BIA graduates stand out because they understand viewport limits, material maps, and volumetric rendering beautifully."
  },
  {
    company: "Myntra Brand",
    bg: "bg-amber-50/70 border-amber-100 text-amber-950",
    role: "Head of Operations",
    quote: "BIA's course alumni are a testament to quality. Their understanding of motion kinetics and lighting makes them highly valuable. We look forward to recruiting from their upcoming cohorts."
  }
];

const renderToolIcon = (name: string) => {
  const normalized = name.toLowerCase();
  
  if (normalized.includes('zbrush')) {
    return (
      <svg viewBox="0 0 100 100" className="w-12 h-12 text-slate-800" fill="currentColor">
        <path d="M48 12c2.5 0 4.5-2 4.5-4.5S50.5 3 48 3s-4.5 2-4.5 4.5 2 4.5 4.5 4.5zm1.5 12c-1.5-1.2-3.5-2-6-2.2l-2-12C33.5 8 28.5 12 25 18l-8 15c-1 2-1 4.5.5 6l4 4c1.5 1.5 4 1 5-1l6-10 1.5 12c.2 2 1.5 3.5 3.5 4l12 3 5 15c.5 2 2.5 3 4.5 2s3-2.5 2-4.5l-6-16 2-10 13 8c2.5 1.5 5 1 6.5-1s1-5-1.5-6.5l-18-11z" />
      </svg>
    );
  }
  
  if (normalized.includes('nuke aperture') || normalized === 'nuke' || normalized.includes('nuke-iris') || normalized.includes('aperture')) {
    return (
      <svg viewBox="0 0 100 100" className="w-10 h-10 select-none">
        <defs>
          <linearGradient id="nukeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="40" fill="none" stroke="url(#nukeGrad)" strokeWidth="6" />
        <path d="M50 10 C 65 25, 65 40, 50 50 C 35 40, 35 25, 50 10 Z" fill="url(#nukeGrad)" opacity="0.85" />
        <path d="M10 50 C 25 65, 40 65, 50 50 C 40 35, 25 35, 10 50 Z" fill="url(#nukeGrad)" opacity="0.85" transform="rotate(60 50 50)" />
        <path d="M10 50 C 25 65, 40 65, 50 50 C 40 35, 25 35, 10 50 Z" fill="url(#nukeGrad)" opacity="0.85" transform="rotate(120 50 50)" />
        <path d="M10 50 C 25 65, 40 65, 50 50 C 40 35, 25 35, 10 50 Z" fill="url(#nukeGrad)" opacity="0.85" transform="rotate(180 50 50)" />
        <path d="M10 50 C 25 65, 40 65, 50 50 C 40 35, 25 35, 10 50 Z" fill="url(#nukeGrad)" opacity="0.85" transform="rotate(240 50 50)" />
        <path d="M10 50 C 25 65, 40 65, 50 50 C 40 35, 25 35, 10 50 Z" fill="url(#nukeGrad)" opacity="0.85" transform="rotate(300 50 50)" />
        <circle cx="50" cy="50" r="14" fill="#1e3a8a" />
        <circle cx="50" cy="50" r="6" fill="#60a5fa" />
      </svg>
    );
  }
  
  if (normalized.includes('nuke radioactive') || normalized.includes('chemical') || normalized.includes('radio')) {
    return (
      <svg viewBox="0 0 100 100" className="w-10 h-10 select-none">
        <circle cx="50" cy="50" r="42" fill="#eab308" />
        <circle cx="50" cy="50" r="8" fill="black" />
        <path d="M50 50 L30 15 A42 42 0 0 1 70 15 Z" fill="black" />
        <path d="M50 50 L85 55 A42 42 0 0 1 65 90 Z" fill="black" />
        <path d="M50 50 L15 55 A42 42 0 0 0 35 90 Z" fill="black" />
        <circle cx="50" cy="50" r="14" fill="#eab308" />
        <circle cx="50" cy="50" r="8" fill="black" />
      </svg>
    );
  }
  
  if (normalized.includes('photoshop')) {
    return (
      <svg viewBox="0 0 100 100" className="w-10 h-10 select-none">
        <rect x="5" y="5" width="90" height="90" rx="14" fill="#031628" stroke="#00c8ff" strokeWidth="5.5" />
        <text x="50" y="65" fill="#00c8ff" fontSize="46" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">Ps</text>
      </svg>
    );
  }
  
  if (normalized.includes('maya')) {
    return (
      <svg viewBox="0 0 100 100" className="w-10 h-10 select-none">
        <rect x="5" y="5" width="90" height="90" rx="12" fill="#067ca2" />
        <text x="50" y="54" fill="white" fontSize="48" fontWeight="extrabold" fontFamily="sans-serif" textAnchor="middle">M</text>
        <rect x="20" y="62" width="60" height="2" fill="white" opacity="0.5" />
        <text x="50" y="80" fill="white" fontSize="16" fontWeight="bold" fontFamily="sans-serif" letterSpacing="2" textAnchor="middle">AYA</text>
      </svg>
    );
  }
  
  if (normalized.includes('substance')) {
    return (
      <svg viewBox="0 0 100 100" className="w-10 h-10 select-none animate-pulse">
        <path d="M35 25 C45 15, 65 15, 75 25 C85 35, 80 55, 70 65 C60 75, 45 85, 30 75 C15 65, 25 35, 35 25 Z" fill="#de2c2c" />
        <circle cx="28" cy="45" r="6" fill="white" />
        <circle cx="68" cy="45" r="6" fill="white" />
        <circle cx="28" cy="45" r="3" fill="#de2c2c" />
        <circle cx="68" cy="45" r="3" fill="#de2c2c" />
        <circle cx="48" cy="72" r="5" fill="#de2c2c" />
        <circle cx="82" cy="70" r="4.5" fill="#de2c2c" />
      </svg>
    );
  }
  
  if (normalized.includes('python')) {
    return (
      <svg viewBox="0 0 100 100" className="w-10 h-10 select-none">
        <path d="M49 10c-15.5 0-14.5 13.5-14.5 13.5l14.5 1c14.5 0 14.5 12.5 14.5 12.5s13-1.5 13-14.5c0-11-12-12.5-17.5-12.5zm-14 30C20 40 20 52 20 52s12.5 1.5 12.5 12.5V50c0-14.5 12.5-14.5 12.5-14.5s-14 0-14-1v1z" fill="#3776ab" />
        <path d="M51 90c15.5 0 14.5-13.5 14.5-13.5l-14.5-1C36.5 75.5 36.5 63 36.5 63S23.5 64.5 23.5 77.5c0 11 12 12.5 17.5 12.5zm14-30C80 60 80 48 80 48s-12.5-1.5-12.5-12.5V50c0 14.5-12.5 14.5-12.5 14.5s14 0 14 1v-1z" fill="#ffd343" />
      </svg>
    );
  }
  
  if (normalized.includes('tensorflow')) {
    return (
      <svg viewBox="0 0 100 100" className="w-10 h-10 select-none">
        <path d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z" fill="#ff6f00" />
        <path d="M50 10 L50 90 L85 70 L85 30 Z" fill="#e65100" />
        <path d="M35 40 L65 40 L65 48 L55 48 L55 75 L45 75 L45 48 L35 48 Z" fill="white" />
      </svg>
    );
  }
  
  if (normalized.includes('pytorch') || normalized.includes('deep learning')) {
    return (
      <svg viewBox="0 0 100 100" className="w-10 h-10 select-none">
        <path d="M50 15 L78 50 L50 85 L22 50 Z" fill="#ee4c2c" />
        <circle cx="50" cy="50" r="12" fill="white" />
      </svg>
    );
  }
  
  if (normalized.includes('sql')) {
    return (
      <svg viewBox="0 0 100 100" className="w-10 h-10 select-none" fill="#336791">
        <path d="M50 15 C30 15, 20 35, 20 50 C20 65, 30 85, 50 85 C70 85, 80 65, 80 50 C80 35, 70 15, 50 15 Z" />
        <text x="50" y="58" fill="white" fontSize="24" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">SQL</text>
      </svg>
    );
  }
  
  if (normalized.includes('langchain') || normalized.includes('llm') || normalized.includes('agentic')) {
    return (
      <svg viewBox="0 0 100 100" className="w-10 h-10 select-none" fill="#00af41">
        <rect x="25" y="25" width="50" height="50" rx="10" />
        <circle cx="50" cy="50" r="10" fill="white" />
      </svg>
    );
  }

  const initial = name.charAt(0).toUpperCase();
  return (
    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 text-white flex items-center justify-center font-bold text-lg select-none">
      {initial}
    </div>
  );
};

const renderAiIcon = (type: string) => {
  if (type === 'openai') {
    return (
      <svg viewBox="0 0 100 100" className="w-6 h-6 text-[#10a37f] shrink-0 fill-none stroke-current" strokeWidth="6" strokeLinecap="round">
        <path d="M50 20 C60 20, 70 30, 70 40 C70 50, 60 55, 50 55 C40 55, 35 50, 35 40 Z" />
        <path d="M50 20 C60 20, 70 30, 70 40 C70 50, 60 55, 50 55 C40 55, 35 50, 35 40 Z" transform="rotate(60 50 50)" />
        <path d="M50 20 C60 20, 70 30, 70 40 C70 50, 60 55, 50 55 C40 55, 35 50, 35 40 Z" transform="rotate(120 50 50)" />
        <path d="M50 20 C60 20, 70 30, 70 40 C70 50, 60 55, 50 55 C40 55, 35 50, 35 40 Z" transform="rotate(180 50 50)" />
        <path d="M50 20 C60 20, 70 30, 70 40 C70 50, 60 55, 50 55 C40 55, 35 50, 35 40 Z" transform="rotate(240 50 50)" />
        <path d="M50 20 C60 20, 70 30, 70 40 C70 50, 60 55, 50 55 C40 55, 35 50, 35 40 Z" transform="rotate(300 50 50)" />
      </svg>
    );
  }
  if (type === 'copilot') {
    return (
      <svg viewBox="0 0 100 100" className="w-6 h-6 shrink-0">
        <path d="M30 30 C 45 15, 55 15, 70 30 C 85 45, 85 55, 70 70 C 55 85, 45 85, 30 70 C 15 55, 15 45, 30 30 Z" fill="none" stroke="url(#copilotGrad)" strokeWidth="12" />
        <defs>
          <linearGradient id="copilotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
    );
  }
  if (type === 'gemini') {
    return (
      <svg viewBox="0 0 100 100" className="w-6 h-6 shrink-0">
        <defs>
          <linearGradient id="geminiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>
        <path d="M50 10 C50 35, 65 50, 90 50 C65 50, 50 65, 50 90 C50 65, 35 50, 10 50 C35 50, 50 35, 50 10 Z" fill="url(#geminiGrad)" />
      </svg>
    );
  }
  return null;
};

// --- HIGH-FIDELITY VECTOR CERTIFICATE SUBCOMPONENTS FOR PRESENTATION SYSTEM ---

// Certificate Vector QR Code Helper
const CertificateQrCode = () => (
  <svg viewBox="0 0 40 40" className="w-8 h-8 sm:w-8 sm:h-8 text-slate-800 shrink-0" fill="currentColor">
    {/* QR Outer framing */}
    <rect x="0" y="0" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1" />
    {/* Top Left Finder pattern */}
    <rect x="3" y="3" width="10" height="10" />
    <rect x="5" y="5" width="6" height="6" fill="white" />
    <rect x="6" y="6" width="4" height="4" />
    {/* Top Right Finder pattern */}
    <rect x="27" y="3" width="10" height="10" />
    <rect x="29" y="5" width="6" height="6" fill="white" />
    <rect x="30" y="6" width="4" height="4" />
    {/* Bottom Left Finder pattern */}
    <rect x="3" y="27" width="10" height="10" />
    <rect x="5" y="29" width="6" height="6" fill="white" />
    <rect x="6" y="30" width="4" height="4" />
    {/* Random data squares */}
    <rect x="16" y="4" width="3" height="3" />
    <rect x="21" y="6" width="2" height="2" />
    <rect x="15" y="10" width="4" height="2" />
    <rect x="5" y="16" width="3" height="3" />
    <rect x="10" y="18" width="4" height="2" />
    <rect x="17" y="16" width="2" height="5" />
    <rect x="22" y="15" width="5" height="2" />
    <rect x="30" y="16" width="4" height="3" />
    <rect x="32" y="22" width="2" height="3" />
    <rect x="16" y="24" width="3" height="3" />
    <rect x="23" y="23" width="4" height="4" />
    <rect x="15" y="30" width="4" height="3" />
    <rect x="21" y="31" width="3" height="4" />
    <rect x="3" y="18" width="2" height="2" />
  </svg>
);

// Certificate Official Stamp Seal Helper
const CertificateSeal = () => (
  <div className="relative w-[46px] h-[46px] sm:w-[50px] sm:h-[50px] select-none shrink-0">
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#1d2ebd]">
      {/* Outer scalloped/ring border */}
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1" strokeDasharray="3 1.5" />
      <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="2" />
      <circle cx="50" cy="50" r="37" stroke="currentColor" strokeWidth="0.75" />
      
      {/* Circle path for curved text */}
      <path id="sealTextPath" d="M 50,54 m -28,0 a 28,28 0 1,1 56,0 a 28,28 0 1,1 -56,0" fill="none" />
      <text className="fill-current text-[5px] font-sans font-bold tracking-widest">
        <textPath href="#sealTextPath" startOffset="0%">
          BOSTON INSTITUTE OF ANALYTICS • BIA •
        </textPath>
      </text>

      <circle cx="50" cy="50" r="23" fill="#f8fafc" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="50" cy="50" r="19" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 1" />
      
      {/* Center BIA */}
      <text x="50" y="54" className="fill-[#1d2ebd] text-[10px] font-serif font-black tracking-tight" textAnchor="middle">
        BIA
      </text>
    </svg>
  </div>
);

// Certificate Swallowtail Ribbon Banner Component
const CodeRibbon = () => (
  <div className="relative w-full max-w-[200px] h-8 mx-auto flex items-center justify-center select-none">
    <svg viewBox="0 0 240 40" fill="none" className="w-full h-full drop-shadow-md">
      {/* Swallowtails / shadow folds */}
      <path d="M15 32 L35 12 L35 32 Z" fill="#010044" />
      <path d="M225 32 L205 12 L205 32 Z" fill="#010044" />
      
      <path d="M20 12 L10 22 L20 32 L35 32 L35 12 Z" fill="#0c1154" />
      <path d="M220 12 L230 22 L220 32 L205 32 L205 12 Z" fill="#0c1154" />

      {/* Ribbon Main Body */}
      <path d="M30 8 L210 8 L210 32 L30 32 Z" fill="#0c1154" />
      {/* Ribbon borders */}
      <path d="M30 8 L210 8" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
      <path d="M30 32 L210 32" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
    </svg>
    <span className="absolute text-white font-serif tracking-[0.25em] font-extrabold text-[9.5px] sm:text-[10px] uppercase left-1/2 -translate-x-[47%] top-1/2 -translate-y-[55%]">
      CERTIFICATE
    </span>
  </div>
);

// Main Certificate Card Component
interface RealCertificateCardProps {
  courseName: string;
}

const RealCertificateCard = ({ courseName }: RealCertificateCardProps) => {
  return (
    <div className="bg-[#fbfcff] text-slate-800 rounded-sm shadow-[0_22px_60px_rgba(0,0,0,0.5)] relative w-full h-[325px] sm:h-[350px] p-4 sm:p-5 flex flex-col justify-between overflow-hidden border border-slate-300">
      
      {/* Elegant Classical Border SVG overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none p-1 sm:p-1.5" viewBox="0 0 600 420" fill="none" preserveAspectRatio="none">
        {/* Outer heavy boundary */}
        <rect x="6" y="6" width="588" height="408" rx="1" stroke="#00005a" strokeWidth="5.5" />
        {/* Inner parallel trim */}
        <rect x="13" y="13" width="574" height="394" rx="0.5" stroke="#00005a" strokeWidth="1.5" />
        
        {/* Repeating scroll corner ornaments: Top-Left */}
        <path d="M13 32 Q 22 32, 22 13" stroke="#00005a" strokeWidth="1.5" fill="none" />
        <path d="M13 24 Q 18 24, 18 13" stroke="#00005a" strokeWidth="0.8" fill="none" />
        <circle cx="25" cy="25" r="2" fill="#00005a" />
        <circle cx="18" cy="18" r="1" fill="#00005a" />

        {/* Top-Right Corner */}
        <path d="M587 32 Q 578 32, 578 13" stroke="#00005a" strokeWidth="1.5" fill="none" />
        <path d="M587 24 Q 582 24, 582 13" stroke="#00005a" strokeWidth="0.8" fill="none" />
        <circle cx="575" cy="25" r="2" fill="#00005a" />
        <circle cx="582" cy="18" r="1" fill="#00005a" />

        {/* Bottom-Left Corner */}
        <path d="M13 388 Q 22 388, 22 407" stroke="#00005a" strokeWidth="1.5" fill="none" />
        <path d="M13 396 Q 18 396, 18 407" stroke="#00005a" strokeWidth="0.8" fill="none" />
        <circle cx="25" cy="395" r="2" fill="#00005a" />
        <circle cx="18" cy="402" r="1" fill="#00005a" />

        {/* Bottom-Right Corner */}
        <path d="M587 388 Q 578 388, 578 407" stroke="#00005a" strokeWidth="1.5" fill="none" />
        <path d="M587 396 Q 582 396, 582 407" stroke="#00005a" strokeWidth="0.8" fill="none" />
        <circle cx="575" cy="395" r="2" fill="#00005a" />
        <circle cx="582" cy="402" r="1" fill="#00005a" />

        {/* Inset elegant pattern border */}
        <rect x="18" y="18" width="564" height="384" stroke="#00005a" strokeWidth="0.75" strokeDasharray="3, 2" />
      </svg>

      {/* Internal Content layout */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-1 sm:p-2 font-sans">
        
        {/* Header Block: Centered matching BIA title with divider + Right QR Code */}
        <div className="flex items-center justify-between">
          <div className="w-8 shrink-0" /> {/* Left Spacer symmetry anchor */}
          
          <div className="flex items-center gap-2">
            <span className="text-[14px] sm:text-[17px] font-black tracking-tight text-slate-900 font-serif leading-none">
              BIA
            </span>
            <span className="text-[6.5px] sm:text-[8px] font-extrabold text-slate-800 -mt-1 -ml-1 align-super">®</span>
            <div className="h-5 w-[1px] bg-slate-350 bg-slate-300" />
            <div className="text-left leading-none text-slate-500 font-bold text-[5.5px] sm:text-[6px] uppercase tracking-wider space-y-0.5">
              <div>Boston</div>
              <div>Institute of</div>
              <div>Analytics</div>
            </div>
          </div>

          <div className="shrink-0">
            <CertificateQrCode />
          </div>
        </div>

        {/* Cert Banner */}
        <div className="text-center my-0.5">
          <CodeRibbon />
          <p className="text-[7.5px] sm:text-[8.5px] font-extrabold text-slate-500 tracking-wider uppercase mt-1">
            OF COMPLETION
          </p>
        </div>

        {/* Credential statement */}
        <div className="text-center space-y-1 my-1">
          <p className="text-[6px] sm:text-[7px] font-bold text-slate-400 tracking-widest uppercase">
            THIS CERTIFICATE IS AWARDED TO
          </p>
          <div className="relative inline-block px-2">
            <h4 className="text-[16px] sm:text-[20px] font-serif font-bold tracking-wider text-slate-900 leading-none">
              Your Name Here
            </h4>
            <div className="h-[1.5px] w-full bg-slate-300 mt-1 sm:mt-1.5" />
          </div>
        </div>

        {/* Details section and Seal stamp */}
        <div className="border-t border-slate-200/50 pt-2.5 mt-0.5 flex items-center justify-between">
          
          <div className="text-left font-mono text-[6.5px] sm:text-[7.5px] text-slate-600 font-bold leading-normal uppercase">
            <div className="flex items-center">
              <span className="w-18 inline-block">COURSE</span> : <span className="text-slate-950 ml-1.5 font-bold font-sans">{courseName}</span>
            </div>
            <div className="flex items-center">
              <span className="w-18 inline-block">PROGRAM TYPE</span> : <span className="text-slate-950 ml-1.5 font-bold font-sans">CLASSROOM</span>
            </div>
            <div className="flex items-center">
              <span className="w-18 inline-block">COMPLETED ON</span> : <span className="text-slate-950 ml-1.5 font-bold font-sans font-sans">JANUARY, 2025</span>
            </div>
            <div className="flex items-center">
              <span className="w-18 inline-block">CAMPUS</span> : <span className="text-slate-950 ml-1.5 font-bold font-sans font-sans">CAMPUS LOCATION</span>
            </div>
          </div>

          <div className="shrink-0 mr-0.5">
            <CertificateSeal />
          </div>
        </div>

        {/* Footer verification disclaimer */}
        <p className="text-[4.5px] sm:text-[5px] tracking-tight leading-relaxed font-mono text-center text-slate-400 font-bold uppercase select-all border-t border-slate-200/50 pt-1.5 mt-1">
          THIS CERTIFICATE IS ISSUED ON BEHALF OF BOSTON INSTITUTE OF ANALYTICS LLC, REGISTERED IN THE STATE OF MASSACHUSETTS, UNITED STATES OF AMERICA AND CAN BE VERIFIED FOR AUTHENTICITY ON WWW.BOSTONINSTITUTEOFANALYTICS.ORG
        </p>

      </div>
    </div>
  );
};

export default function CourseDetailView({ course, onBackToCatalog, onOpenApplyModal }: CourseDetailViewProps) {
  const meta = DYNAMIC_COURSE_METADATA[course.id] || compileFallbackMetadata(course);
  
  const toolsScrollRef = React.useRef<HTMLDivElement>(null);

  // Layout States
  const [activeModuleIndex, setActiveModuleIndex] = useState<number | null>(0);
  const [activeAdvantageIndex, setActiveAdvantageIndex] = useState<number>(0);

  // Expert form submission states
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: 'United States',
    city: 'Boston',
    campus: 'Boston Financial District'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) return;
    setFormSubmitted(true);
  };

  // Auto-scroll to top when course changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [course]);

  return (
    <div className="bg-[#f8fafc] min-h-screen text-slate-800 font-sans" id="course-detail-view-container">
      {/* Top Breadcrumb Navigation block */}
      <div className="bg-[#000033] text-white select-none relative overflow-hidden flex items-center h-10 px-4 sm:px-6 lg:px-8 border-b border-white/15 z-40">
        <button 
          onClick={onBackToCatalog}
          className="flex items-center gap-1.5 font-bold text-[11px] text-blue-400 hover:text-blue-300 font-mono tracking-widest uppercase cursor-pointer"
          id="course-back-catalog-action"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Course Catalog
        </button>
        <div className="mx-auto text-[10px] sm:text-[11px] font-bold text-slate-300 truncate max-w-sm sm:max-w-md md:max-w-lg hidden md:block">
          Currently Viewing: <span className="text-white font-black">{course.title}</span> Specialized Program
        </div>
        <div className="text-[10px] font-black text-amber-400 uppercase tracking-widest hidden sm:block">
          ● Admissions Open
        </div>
      </div>

      {/* --- SECTION 1: HIGH-FIDELITY HERO BANNER --- */}
      <section className="bg-[#020208] text-white relative py-12 md:py-16 lg:py-20 overflow-hidden border-b border-white/10">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-blue-950/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-blue-900/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column Content Header (7 Cols) */}
            <div className="lg:col-span-7 space-y-6 py-4 flex flex-col justify-center text-left">
              
              {/* BIA Skewed Athletics Logo */}
              <div className="inline-block self-start relative mb-2">
                <div className="skew-x-[-12deg] border border-white/70 bg-black px-4 py-2 inline-flex flex-col items-start leading-none gap-1 shadow-2xl">
                  <span className="skew-x-[12deg] text-[9px] font-black tracking-[0.18em] text-white font-sans uppercase">
                    {course.id === 'three-d-animation-vfx' ? 'BOSTON SCHOOL OF' : 'BOSTON INSTITUTE OF'}
                  </span>
                  <span className="skew-x-[12deg] text-[12px] font-black tracking-widest text-black bg-white px-2 py-1 leading-none uppercase">
                    {course.id === 'three-d-animation-vfx' ? 'ANIMATION & DESIGN' : 'ANALYTICS'}
                  </span>
                </div>
              </div>

              {/* Three Pill Badges matching screenshot exactly */}
              <div className="flex flex-wrap items-center gap-2 select-none">
                <span className="bg-[#edf9f1] border border-[#d3f4df] text-[#2d6a4f] text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Award className="h-3.5 w-3.5 text-[#2d6a4f] shrink-0" />
                  {meta.rankBadge}
                </span>
                
                <span className="bg-[#fffbeb] border border-[#fde68a] text-[#b57c00] text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Star className="h-3.5 w-3.5 fill-[#ffb703] text-[#b57c00] shrink-0" />
                  {meta.ratingText}
                </span>

                <span className="bg-[#eef2ff] border border-[#e0e7ff] text-[#3730a3] text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Laptop className="h-3.5 w-3.5 text-[#3730a3] shrink-0" />
                  {meta.learnLabel}
                </span>
              </div>

              {/* Grand Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-[45px] font-black tracking-tight leading-none text-white uppercase pt-2" id="course-detail-title">
                {course.id === 'three-d-animation-vfx' ? '3D Animation and VFX' : course.title}
              </h1>

              {/* Three High-Fidelity Paragraph Elements */}
              <div className="space-y-4 max-w-3xl">
                <p className="text-xs sm:text-[13.5px] text-slate-300 leading-relaxed font-semibold">
                  {course.id === 'three-d-animation-vfx' 
                    ? 'Embark on the dynamic journey of 3D Animation and VFX, a comprehensive program blending the best in AVGC (Visual effects, Animation, Gaming Association) – offering vital 3D Animation course, sought-after VFX skills, and cutting-edge tools. This 3D Animation course features live project experiences, industry expert sessions, masterclasses, and live BIA® DoubtBuster sessions.'
                    : meta.bannerDescription}
                </p>

                <p className="text-xs sm:text-[13px] text-slate-200 leading-relaxed font-bold">
                  {course.id === 'three-d-animation-vfx'
                    ? 'Get hands-on experience with Adobe Photoshop, Autodesk Maya, Substance Painter, Arnold, Zbrush, Keyshot, Nuke & other cutting-edge tools in VFX & Animation in our comprehensive 3D Animation and VFX training course.'
                    : `Get hands-on experience with ${meta.handsOnTools.slice(0, 7).join(', ')} & other cutting-edge tools in our comprehensive ${course.title} training course.`}
                </p>

                <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-bold">
                  {course.id === 'three-d-animation-vfx'
                    ? 'BIA® is highly rated at 4.9-star and is ranked #1 International Animation Training Institute by British Columbia Times, Business World, Avalon Global and several recognized forums, making it a one-stop shop for mastering most sought-after skills and the latest 3D Animation and VFX technologies.'
                    : `${meta.schoolName} is highly and consistently rated, ranked among the premier training campuses internationally by leading publications and educational consortiums globally.`}
                </p>
              </div>

              {/* Action Buttons Block */}
              <div className="flex flex-col sm:flex-row items-center gap-4 select-none pt-4 max-w-lg">
                <button
                  onClick={() => onOpenApplyModal(course)}
                  className="w-full sm:w-auto bg-[#03005a] hover:bg-[#020042] text-white border border-white/20 font-extrabold text-[12px] tracking-[0.16em] uppercase h-[48px] px-8 rounded-lg transition-all cursor-pointer shadow-md active:scale-95"
                >
                  ENQUIRE NOW
                </button>
                <button
                  onClick={() => onOpenApplyModal(course)}
                  className="w-full sm:w-auto bg-[#ff9f1c] hover:bg-amber-500 text-white font-extrabold text-[12px] tracking-[0.16em] uppercase h-[48px] px-8 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md active:scale-95"
                >
                  <Download className="h-4 w-4" />
                  DOWNLOAD BROCHURE
                </button>
              </div>
            </div>

            {/* Right Column: Hero Digital Artist/Student Image (5 Cols) with gradient fade */}
            <div 
              className="lg:col-span-5 hidden lg:block relative self-stretch h-full min-h-[460px] select-none overflow-hidden"
            >
              {/* Smooth visual gradient overlay transitioning image to black block background */}
              <div className="absolute inset-y-0 -left-1 w-1/3 bg-gradient-to-r from-[#020208] to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#020208] to-transparent z-10 pointer-events-none" />
              
              <img 
                src={course.id === 'three-d-animation-vfx' ? designerHeroImage : (course.bannerImage || designerHeroImage)} 
                alt={course.title}
                className="w-full h-full object-cover object-center scale-100 opacity-90"
                referrerPolicy="no-referrer"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Cinematic Video Tour is disabled */}

      {/* --- SECTION 2: INTEGRATED "TALK TO OUR EXPERT" QUICK FORM BAR --- */}
      <section className="bg-[#f1f3f6] py-10 relative z-30" id="talk-expert-row">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[12px] p-6 md:p-8 lg:p-10 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.08)] border border-slate-100">
            <div className="text-left pb-6">
              <h3 className="text-xl sm:text-[22px] font-bold text-[#0d1b3e] tracking-tight">Talk to Our Expert</h3>
              <p className="text-[13.5px] text-slate-500 mt-1 font-medium leading-normal">Please share your details and we will reach out to you soon..</p>
            </div>

            {formSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 text-center space-y-2 rounded-lg bg-emerald-50 border border-emerald-100 max-w-xl mx-auto"
              >
                <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto" />
                <h4 className="text-base font-extrabold text-[#00005d]">Callback Request Registered!</h4>
                <p className="text-xs text-slate-605 leading-normal px-4 text-slate-700 font-semibold">
                  Thank you, <span className="font-bold text-[#00005d]">{formData.fullName}</span>. An admissions counselor has received your interest and will reach out on <span className="font-bold font-mono">{formData.phone}</span> shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                  <input 
                    type="text" 
                    name="fullName"
                    required
                    placeholder="Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-[#e2e8f0] rounded-xl px-4 py-3 text-[14px] text-slate-700 placeholder-slate-400 focus:border-[#16174a] focus:ring-1 focus:ring-[#16174a] outline-none h-[48px] shadow-sm transition-colors hover:border-slate-300"
                  />
                  <input 
                    type="email" 
                    name="email"
                    required
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-[#e2e8f0] rounded-xl px-4 py-3 text-[14px] text-slate-700 placeholder-slate-400 focus:border-[#16174a] focus:ring-1 focus:ring-[#16174a] outline-none h-[48px] shadow-sm transition-colors hover:border-slate-300"
                  />
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-[#e2e8f0] rounded-xl px-4 py-3 text-[14px] text-slate-700 placeholder-slate-400 focus:border-[#16174a] focus:ring-1 focus:ring-[#16174a] outline-none h-[48px] shadow-sm transition-colors hover:border-slate-300"
                  />
                  
                  <div className="relative">
                    <select 
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-[#e2e8f0] rounded-xl pl-4 pr-10 py-3 text-[14px] text-slate-650 font-medium outline-none focus:border-[#16174a] focus:ring-1 focus:ring-[#16174a] h-[48px] appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M7%209l3%203%203-3%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%221.8%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[right_16px_center] bg-no-repeat shadow-sm transition-colors hover:border-slate-300"
                    >
                      <option value="United States">Your Country</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="India">India</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>

                  <div className="relative">
                    <select 
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-[#e2e8f0] rounded-xl pl-4 pr-10 py-3 text-[14px] text-slate-650 font-medium outline-none focus:border-[#16174a] focus:ring-1 focus:ring-[#16174a] h-[48px] appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M7%209l3%203%203-3%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%221.8%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[right_16px_center] bg-no-repeat shadow-sm transition-colors hover:border-slate-300"
                    >
                      <option value="Boston">Your City</option>
                      <option value="Boston">Boston</option>
                      <option value="New York">New York</option>
                      <option value="London">London</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Toronto">Toronto</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-3">
                  <button 
                    type="submit"
                    className="w-full sm:w-auto bg-[#1a1f51] hover:bg-[#11153b] text-white font-bold text-[14px] tracking-normal h-11 px-7 rounded-[10px] transition-all cursor-pointer flex items-center justify-center shadow-md active:scale-[0.98]"
                    id="submit-adquiry-expert"
                  >
                    Enquire Now
                  </button>
                  <p className="text-[13.5px] text-slate-500 font-medium tracking-normal text-center sm:text-left leading-normal">
                    By submitting the form, you agree to our <a href="#" className="underline font-medium text-slate-600 hover:text-[#1a1f51]">Terms and Conditions</a> and our <a href="#" className="underline font-medium text-slate-600 hover:text-[#1a1f51]">Privacy Policy</a>.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* --- SECTION 3: UNDER-HERO CORE STATS GRID LINE --- */}
      <section className="bg-[#f1f3f6] pb-10 relative z-30" id="stats-banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[12px] p-6 md:p-8 lg:p-10 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.08)] border border-slate-105 grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-0 md:divide-x md:divide-slate-205">
            
            <div className="flex flex-col justify-start md:px-5 first:pl-0 space-y-1.5 text-left">
              <h4 className="text-[#0d1b3e] font-bold text-[14.5px] sm:text-[15.5px] leading-snug tracking-tight">
                Dual Certification: {course.id === 'three-d-animation-vfx' ? '3D Animation and VFX' : course.title.split('&')[0]}
              </h4>
              <p className="text-[12.5px] text-slate-500 font-medium leading-normal">
                The Two Most In-Demand and Highly Paid Skills.
              </p>
            </div>

            <div className="flex flex-col justify-start md:px-5 space-y-1.5 text-left">
              <h4 className="text-[#0d1b3e] font-bold text-[14.5px] sm:text-[15.5px] leading-snug tracking-tight">
                Ranked #1 International Training Institute
              </h4>
              <p className="text-[12.5px] text-slate-500 font-medium leading-normal">
                In 2023, by British Columbia Times, Business World & Others.
              </p>
            </div>

            <div className="flex flex-col justify-start md:px-5 space-y-1.5 text-left">
              <h4 className="text-[#0d1b3e] font-bold text-[14.5px] sm:text-[15.5px] leading-snug tracking-tight">
                3 Learning Paths
              </h4>
              <p className="text-[12.5px] text-slate-500 font-medium leading-normal">
                {course.id === 'three-d-animation-vfx' 
                  ? 'Certification (4 Months) | Diploma (6 Months) | Master Diploma (10 Months).' 
                  : 'Certification (3 Months) | Diploma (10 Months) | Graduate (10 Months).'}
              </p>
            </div>

            <div className="flex flex-col justify-start md:px-5 space-y-1.5 text-left">
              <h4 className="text-[#0d1b3e] font-bold text-[14.5px] sm:text-[15.5px] leading-snug tracking-tight">
                12000+ Learners
              </h4>
              <p className="text-[12.5px] text-slate-500 font-medium leading-normal">
                {course.id === 'three-d-animation-vfx'
                  ? '3D Animation Course and VFX Trained Students Across 105+ Campus in 7+ Countries.'
                  : `${course.title} Trained Students Across 105+ Campus in 7+ Countries.`}
              </p>
            </div>

            <div className="flex flex-col justify-start md:px-5 last:pr-0 space-y-1.5 text-left">
              <h4 className="text-[#0d1b3e] font-bold text-[14.5px] sm:text-[15.5px] leading-snug tracking-tight">
                360° Career Support
              </h4>
              <p className="text-[12.5px] text-slate-500 font-medium leading-normal">
                Resume Building, Interview Preparation, and Access to Partner Companies.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION 4 & 5: KEY HIGHLIGHTS OVERVIEW & SYLLABUS BANNER STRIP --- */}
      <section className="bg-white py-12 md:py-16 border-b border-slate-200" id="course-overview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Key highlights checklist block structured dynamically to fit the design perfectly */}
          <div className="space-y-6">
            <div className="text-left space-y-2 pb-2">
              <h2 className="text-[25px] sm:text-3xl font-bold text-[#0d1b3e] tracking-tight leading-normal">
                {course.id === 'three-d-animation-vfx' ? '3D Animation Course & VFX Course Overview' : `${course.title} Course Overview`}
              </h2>
              <h3 className="text-[16px] sm:text-[18px] font-bold text-[#0d1b3e] tracking-tight pt-1">
                Key Highlights
              </h3>
            </div>

            {(() => {
              const highlightsCount = meta.highlights.length;
              const colSize = Math.ceil(highlightsCount / 3);
              const col1 = meta.highlights.slice(0, colSize);
              const col2 = meta.highlights.slice(colSize, colSize * 2);
              const col3 = meta.highlights.slice(colSize * 2);

              return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-5">
                  {/* Highlight Column 1 */}
                  <div className="space-y-4">
                    {col1.map((high, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-blue-600 stroke-[3.5]" />
                        </div>
                        <p className="text-[13.5px] sm:text-[14px] text-slate-600 font-medium leading-relaxed font-sans">{high}</p>
                      </div>
                    ))}
                  </div>

                  {/* Highlight Column 2 */}
                  <div className="space-y-4">
                    {col2.map((high, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-blue-600 stroke-[3.5]" />
                        </div>
                        <p className="text-[13.5px] sm:text-[14px] text-slate-600 font-medium leading-relaxed font-sans">{high}</p>
                      </div>
                    ))}
                  </div>

                  {/* Highlight Column 3 */}
                  <div className="space-y-4">
                    {col3.map((high, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-blue-600 stroke-[3.5]" />
                        </div>
                        <p className="text-[13.5px] sm:text-[14px] text-slate-600 font-medium leading-relaxed font-sans">{high}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Core syllabus banner strip */}
          <div className="bg-[#0b132b] text-white rounded-2xl p-6 sm:p-8 border border-white/5 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                Syllabus for {course.title} Course
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-400 font-medium max-w-2xl leading-normal">
                Dive into over 200+ hours of immersive learning and practical exercises curated by industry experts. Our course modules are periodically updated, integrating the latest tools and AI technology, ensuring a state-of-the-art learning journey.
              </p>
            </div>
            <button
              onClick={() => onOpenApplyModal(course)}
              className="bg-[#ff9f1c] hover:bg-amber-500 text-white font-extrabold text-[10.5px] tracking-widest uppercase h-11 px-8 rounded-lg shrink-0 transition-all cursor-pointer shadow-md shadow-amber-500/10 flex items-center gap-1.5"
            >
              <Download className="h-4 w-4" />
              Download Brochure
            </button>
          </div>

        </div>
      </section>

      {/* --- SECTION 6: EDITORIAL TOPICS BENTO GRID --- */}
      <section className="bg-white py-16 sm:py-20 border-b border-slate-200" id="editorial-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 sm:gap-x-16 gap-y-12 sm:gap-y-14">
            
            {/* Card 1: Topics Curiosities */}
            <div className="space-y-3.5">
              <h4 className="text-[20px] sm:text-[22px] font-bold text-[#0d1b3e] tracking-tight leading-normal">
                Topics That Will Keep You Engaged and Curious
              </h4>
              <p className="text-[13.5px] sm:text-[14px] text-slate-500 font-medium leading-relaxed font-sans">{meta.topicsCurious.join(', ').replace(/\.$/, '')}</p>
            </div>

            {/* Card 2: Roadmap */}
            <div className="space-y-3.5">
              <h4 className="text-[20px] sm:text-[22px] font-bold text-[#0d1b3e] tracking-tight leading-normal">
                Your Roadmap to Learning
              </h4>
              <p className="text-[13.5px] sm:text-[14px] text-slate-500 leading-relaxed font-medium">
                {meta.learningRoadmap}
              </p>
            </div>

            {/* Card 3: Ideal Candidates */}
            <div className="space-y-3.5">
              <h4 className="text-[20px] sm:text-[22px] font-bold text-[#0d1b3e] tracking-tight leading-normal">
                {course.id === 'three-d-animation-vfx' ? 'Ideal Candidates for 3D Animation Course' : `Ideal Candidates for ${course.title} Course`}
              </h4>
              <p className="text-[13.5px] sm:text-[14px] text-slate-500 leading-relaxed font-medium font-sans">
                {meta.idealCandidate}
              </p>
            </div>

            {/* Card 4: Minimum Eligibility */}
            <div className="space-y-3.5">
              <h4 className="text-[20px] sm:text-[22px] font-bold text-[#0d1b3e] tracking-tight leading-normal">
                {course.id === 'three-d-animation-vfx' ? 'Minimum Eligibility for 3D Animation Course' : `Minimum Eligibility for ${course.title} Course`}
              </h4>
              <p className="text-[13.5px] sm:text-[14px] text-slate-500 leading-relaxed font-medium font-sans">
                {meta.eligibility}
              </p>
            </div>

            {/* Card 5: Job Opportunities */}
            <div className="space-y-3.5">
              <h4 className="text-[20px] sm:text-[22px] font-bold text-[#0d1b3e] tracking-tight leading-normal">
                {course.id === 'three-d-animation-vfx' 
                  ? 'Job Opportunities After 3D Animation Course and VFX Course' 
                  : `Job Opportunities After ${course.title} Course`}
              </h4>
              <p className="text-[13.5px] sm:text-[14px] text-slate-500 leading-relaxed font-medium font-sans">
                {course.id === 'three-d-animation-vfx'
                  ? '3D Animator, VFX Artist, Compositor, Game Animator, 3D Modeler, Texture Artist, Motion Graphics Designer, VFX Supervisor, Architectural Animator, 3D Visualization Artist, Medical Animator, Educational Content Developer, VR/AR Developer, Simulation Developer, UI/UX Animator.'
                  : meta.jobOpportunities.join(', ') + '.'}
              </p>
            </div>

            {/* Card 6: Hiring Industries */}
            <div className="space-y-3.5">
              <h4 className="text-[20px] sm:text-[22px] font-bold text-[#0d1b3e] tracking-tight leading-normal">
                {course.id === 'three-d-animation-vfx'
                  ? 'Industries That Are Hiring 3D Animation and VFX Specialists'
                  : `Industries That Are Hiring ${course.title} Specialists`}
              </h4>
              <p className="text-[13.5px] sm:text-[14px] text-slate-500 leading-relaxed font-medium font-sans">
                {course.id === 'three-d-animation-vfx'
                  ? 'Industries in need of 3D Animation & VFX Artists range from Branding, Marketing, Technology, Finance, Banking, Healthcare, E-commerce, Retail, Telecom, Entertainment, to Sports, showcasing the extensive opportunities in these creative fields.'
                  : `Industries in need of ${course.title} specialists range from Technology, Finance, Banking, Healthcare, E-commerce, Retail, Telecom, Entertainment, to Sports, showcasing the extensive opportunities in these fields.`}
              </p>
            </div>

          </div>

          {/* Globally Accredited Course Description Block inside editorial-grid */}
          <div className="space-y-4 text-left mt-16 pt-16 border-t border-slate-100">
            <h3 className="text-[26px] sm:text-[32px] md:text-[34px] font-bold text-[#0d1b3e] tracking-tight leading-tight mb-4 font-sans">
              {course.id === 'three-d-animation-vfx' ? 'Globally Accredited 3D Animation and VFX Course' : `Globally Accredited ${course.title} Course`}
            </h3>
            <p className="text-[13.5px] sm:text-[14.5px] text-slate-500 font-medium leading-relaxed font-sans mt-2">
              {course.id === 'three-d-animation-vfx' 
                ? 'Dive into the world of 3D Animation and VFX with our specialized 3D Animation and VFX course at Boston Institute of Analytics, renowned as the most comprehensive animation training institute globally. Our 3D Animation Course and VFX Course offer comprehensive training in both 3D animation and visual effects, preparing you for a career in the dynamic fields of animation and filmmaking.'
                : `Dive into the world of ${course.title} with our specialized ${course.title} course at Boston Institute of Analytics, renowned as the most comprehensive training institute globally. Our ${course.title} Course offers comprehensive training, preparing you for a career in the dynamic fields of technology and analytics.`}
            </p>
            <p className="text-[13.5px] sm:text-[14.5px] text-slate-500 font-medium leading-relaxed font-sans mt-2">
              {course.id === 'three-d-animation-vfx'
                ? 'In our 3D Animation Course and VFX Course, Master the Industry Standard tools like Maya, 3ds Max, Houdini, Blender and explore advanced techniques in modeling, rigging, texturing, animation, and rendering. Explore visual effects (VFX) and learn to create breathtaking visual illusions that enhance storytelling in film, television, and digital media. Master techniques in compositing, matte painting, particle effects, motion tracking, and more using software such as Adobe After Effects, Nuke and many more!'
                : `In our ${course.title} Course, Master the Industry Standard tools and explore advanced techniques. Explore real-world applications and learn to create high-impact, scalable systems to master the dynamic avenues of your trade. Master techniques in orchestration, integration, metrics monitoring, data security, and many more using standard software!`}
            </p>
          </div>


          {/* --- SECTION 7 & 8: TOOLS & TECHNOLOGIES WITH GENAI --- */}
          <div id="accreditations-section" className="space-y-12 mt-20 pt-12 pb-16">
            
            {/* Main 5+ Tools & Tech section */}
            <div className="space-y-5">
              <div className="text-left">
                <h3 className="text-[#0d1b3e] text-[18px] sm:text-[20px] font-extrabold tracking-tight leading-none">
                  5+ Tools & Technologies Covered
                </h3>
              </div>

              {/* Slider container flanked by elegant carets */}
              <div className="relative flex items-center select-none">
                
                {/* Left Caret button */}
                <button 
                  onClick={() => {
                    if (toolsScrollRef.current) {
                      toolsScrollRef.current.scrollBy({ left: -240, behavior: 'smooth' });
                    }
                  }}
                  className="p-1 sm:p-1.5 hover:bg-slate-50 border border-transparent hover:border-slate-100 rounded-full transition-all text-slate-800 shrink-0 cursor-pointer active:scale-90 flex items-center justify-center mr-1"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="h-6 w-6 stroke-[3]" />
                </button>

                {/* Scrolling Cards Row */}
                <div 
                  ref={toolsScrollRef}
                  className="flex flex-1 items-center gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-2 px-1 scroll-smooth"
                >
                  {(course.id === 'three-d-animation-vfx'
                    ? [
                        { name: 'ZBrush' },
                        { name: 'Nuke Aperture' },
                        { name: 'Nuke Radioactive' },
                        { name: 'Photoshop' },
                        { name: 'Maya' },
                        { name: 'Substance Painter' }
                      ]
                    : meta.tools
                  ).map((t, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white rounded-xl border border-slate-100/90 w-[115px] h-[72px] sm:w-[135px] sm:h-[80px] p-2 flex items-center justify-center shrink-0 hover:border-slate-300 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.02)] group"
                    >
                      <div className="flex items-center justify-center w-full h-full transform transition-transform group-hover:scale-105 duration-200">
                        {renderToolIcon(t.name)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Caret button */}
                <button 
                  onClick={() => {
                    if (toolsScrollRef.current) {
                      toolsScrollRef.current.scrollBy({ left: 240, behavior: 'smooth' });
                    }
                  }}
                  className="p-1 sm:p-1.5 hover:bg-slate-50 border border-transparent hover:border-slate-100 rounded-full transition-all text-slate-800 shrink-0 cursor-pointer active:scale-90 flex items-center justify-center ml-1"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="h-6 w-6 stroke-[3]" />
                </button>

              </div>
            </div>

            {/* Generative AI tools section at the bottom */}
            <div className="space-y-5 pt-4">
              <div className="text-left">
                <h3 className="text-[#0d1b3e] text-[18px] sm:text-[20px] font-extrabold tracking-tight leading-none">
                  2+ Generative AI Tools & Technologies Covered
                </h3>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 justify-start">
                {/* OpenAI Pill Card */}
                <div className="bg-white rounded-xl border border-slate-200/50 px-5 py-3 flex items-center gap-3 shadow-[0_4px_12px_rgba(0,0,0,0.02)] h-14 min-w-[140px] sm:min-w-[155px] hover:border-slate-300 transition-colors">
                  {renderAiIcon('openai')}
                  <span className="text-[#0d1b3e] font-bold text-[14px] sm:text-[15px] font-sans tracking-tight">OpenAI</span>
                </div>

                {/* Copilot Pill Card */}
                <div className="bg-white rounded-xl border border-slate-200/50 px-5 py-3 flex items-center gap-3 shadow-[0_4px_12px_rgba(0,0,0,0.02)] h-14 min-w-[140px] sm:min-w-[155px] hover:border-slate-300 transition-colors">
                  {renderAiIcon('copilot')}
                  <span className="text-[#0d1b3e] font-bold text-[14px] sm:text-[15px] font-sans tracking-tight">Copilot</span>
                </div>

                {/* Gemini Pill Card */}
                <div className="bg-white rounded-xl border border-slate-200/50 px-5 py-3 flex items-center gap-3 shadow-[0_4px_12px_rgba(0,0,0,0.02)] h-14 min-w-[140px] sm:min-w-[155px] hover:border-slate-300 transition-colors">
                  {renderAiIcon('gemini')}
                  <span className="text-[#0d1b3e] font-bold text-[14px] sm:text-[15px] font-sans tracking-tight">Gemini</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --- SECTION 9: HIGH-IMPACT DUAL CERTIFICATE DESIGN PRESENTATION --- */}
      <section className="bg-[#04014f] py-16 text-white overflow-hidden relative border-y border-white/10 select-none pb-20" id="certificates-presentation">
        {/* Subtle royal blue glow overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.12),transparent)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative">
          
          {/* Main Title Banner matching mockup */}
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-white text-2xl sm:text-[32px] sm:leading-tight font-extrabold tracking-tight font-sans">
              BIA® Dual Certification In Two Most In-Demand And Highly Paid Skills
            </h2>
          </div>

          {/* Three-Column Grid Content Layout matching mockup */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10">
            
            {/* Left Track Column */}
            <div className="flex flex-col items-center space-y-4 w-full max-w-[450px]">
              <h3 className="text-[#3bdbe5] text-[20px] sm:text-[24px] font-extrabold tracking-wide font-sans text-center uppercase min-h-[32px] flex items-center justify-center">
                {meta.dualCert.title1}
              </h3>
              <RealCertificateCard courseName={meta.dualCert.title1} />
            </div>

            {/* Central "+" Divider Column */}
            <div className="flex items-center justify-center py-2 lg:py-0 self-center">
              <span className="text-5xl sm:text-7xl font-sans font-light text-[#3bdbe5] cursor-default select-none block leading-none">
                +
              </span>
            </div>

            {/* Right Track Column */}
            <div className="flex flex-col items-center space-y-4 w-full max-w-[450px]">
              <h3 className="text-[#3bdbe5] text-[20px] sm:text-[24px] font-extrabold tracking-wide font-sans text-center uppercase min-h-[32px] flex items-center justify-center">
                {meta.dualCert.title2}
              </h3>
              <RealCertificateCard courseName={meta.dualCert.title2} />
            </div>

          </div>

          {/* Verification Badge */}
          <div className="text-center pt-4">
            <span className="inline-block rounded-full bg-slate-950/60 border border-white/10 px-5 py-1.5 flex items-center gap-2 justify-center text-[10.5px] font-semibold text-slate-300 max-w-md mx-auto shadow-md">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
              Secure BIA Accreditation Server Registry: Active Blockchain Hash Verified
            </span>
          </div>

        </div>
      </section>

      {/* --- SECTION 10: "EXPLORE OUR AI POWERED CENTRALIZED LEARNING HUB" --- */}
      <section className="bg-white py-14 border-b border-slate-200" id="lms-overview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LMS details text (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[9.5px] bg-[#ff9f1c]/10 text-amber-800 font-extrabold px-3 py-1 rounded inline-block uppercase font-mono tracking-widest">
              PROPRIETARY CLOUD INFRASTRUCTURE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a1d4a] tracking-tight uppercase leading-none">
              Explore Our AI Powered Centralized Learning Hub
            </h2>
            <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed font-semibold">
              Our AI powered Learning Management System (LMS) is a centralized hub designed to enhance your learning experience. It provides seamless access to study materials, lecture recordings, personalized progress tracking, assignment submission, and automated grading. Additionally, it offers access to BIA® DoubleBuster to clear queries anyway you may have.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-[#ff9f1c] shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <h4 className="text-xs font-black text-slate-800 uppercase leading-none">Automated Grading Engine</h4>
                  <p className="text-[11px] text-slate-500 leading-normal pt-1.5">Code files, shaders and analytics schedules are verified in minutes to output corrections.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-[#ff9f1c] shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <h4 className="text-xs font-black text-slate-800 uppercase leading-none">Dynamic Attendance logs Check</h4>
                  <p className="text-[11px] text-slate-500 leading-normal pt-1.5 font-sans">Track sandbox lecture credits transparently to ensure secure portfolio badge release.</p>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => onOpenApplyModal(course)}
              className="bg-[#00005d] hover:bg-[#000044] text-white font-extrabold text-[10.5px] tracking-widest uppercase h-11 px-8 rounded mt-3 cursor-pointer shadow-md"
            >
              ENQUIRE NOW
            </button>
          </div>

          {/* LMS Graphic mockup (5 Cols) */}
          <div className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm relative overflow-hidden text-left">
            <span className="text-[8.5px] bg-slate-900 text-white font-bold px-2 py-0.5 rounded uppercase select-none font-mono">PORTAL MONITOR</span>
            
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-md space-y-3 relative z-10 select-none">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-1.5">
                  <div className="h-5 w-5 rounded bg-[#00005d] text-white font-black text-[9px] flex items-center justify-center">B</div>
                  <span className="text-[10px] font-black text-slate-700 tracking-wider">LMS CENTRAL</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping" />
                  <span className="text-[8px] font-bold text-slate-400">ACTIVE</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="bg-slate-50 rounded p-2 text-[10px] font-bold text-slate-600 flex justify-between items-center border border-slate-100">
                  <span>Track Syllabus Progress</span>
                  <span className="text-[#00005d] font-black">81% Complete</span>
                </div>
                <div className="bg-slate-50 rounded p-2 text-[10px] font-bold text-slate-600 flex justify-between items-center border border-slate-100">
                  <span>DoubleBuster Tickets Resolved</span>
                  <span className="text-[#ff9f1c] font-black">17 Answered</span>
                </div>
                <div className="bg-slate-50 rounded p-2 text-[10px] font-bold text-slate-600 flex justify-between items-center border border-slate-100">
                  <span>Advisory Sandbox slots</span>
                  <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-1.5 rounded text-[8.5px] font-black uppercase">Reserved</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- SECTION 11: TWO-COLUMN LAYOUT SYLLABUS DISCLOSURE --- */}
      <section className="bg-slate-50 py-16 border-b border-slate-200" id="course-curriculum">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a1d4a] tracking-tight uppercase">
              Comprehensive Curriculum
            </h2>
            <p className="text-xs text-slate-400 font-extrabold uppercase font-mono tracking-widest mt-1">Syllabus breakdown structured in categories</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column (4 Cols): Advisory counselor, details checklist card */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Box 1: Advisory */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-sm text-left">
                <div className="border-b border-slate-100 pb-3 space-y-1.5">
                  <span className="text-[9px] bg-slate-900 text-white font-black px-2 py-0.5 rounded tracking-widest uppercase font-mono">BIA® ACCREDITATION</span>
                  <h4 className="text-xs sm:text-sm font-black text-[#00005d] uppercase tracking-wider">Know Your Trainer and Curricula</h4>
                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                    Our {course.title} course curriculum, meticulously crafted and delivered by industry expert trainers, offers a dynamic fusion of academic depth and real-world know-how.
                  </p>
                </div>

                {/* Grid chips ratios */}
                <div className="grid grid-cols-3 gap-2 text-center select-none pt-0.5">
                  <div className="bg-slate-50 rounded border border-slate-100 p-2 space-y-0.5">
                    <span className="font-extrabold text-blue-900 text-[11px] font-mono block leading-none">200+</span>
                    <span className="text-[8.5px] text-slate-405 font-black uppercase text-slate-500 block leading-none">Hours</span>
                  </div>
                  <div className="bg-slate-50 rounded border border-slate-100 p-2 space-y-0.5">
                    <span className="font-extrabold text-[#ff9f1c] text-[11px] font-mono block leading-none">50+</span>
                    <span className="text-[8.5px] text-slate-405 font-black uppercase text-slate-500 block leading-none font-sans">Capstones</span>
                  </div>
                  <div className="bg-slate-50 rounded border border-slate-100 p-2 space-y-0.5">
                    <span className="font-extrabold text-[#00005d] text-[11px] font-mono block leading-none">7+</span>
                    <span className="text-[8.5px] text-slate-405 font-black uppercase text-slate-500 block leading-none">Tools</span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenApplyModal(course)}
                  className="w-full bg-[#00005d] hover:bg-[#000044] text-white font-extrabold text-[10px] tracking-widest uppercase h-10 rounded transition-all cursor-pointer shadow flex items-center justify-center gap-1.5 leading-none select-none"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download Brochure
                </button>
              </div>

              {/* Box 2: Quick Side Form expert */}
              <div className="bg-cyan-950/5 border border-cyan-700/10 rounded-xl p-5 space-y-3.5 text-left">
                <span className="text-[8.5px] bg-[#00005d] text-white font-mono rounded px-2 py-0.5 uppercase tracking-wider font-extrabold">COORDINATORS HANDBOOK</span>
                <h4 className="text-xs font-black text-slate-800 uppercase leading-tight">Admissions Division helpline</h4>
                <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                  Submit a registration details request to speak directly with program directors regarding merit waiver ratios or partial EMI terms.
                </p>
                <button
                  onClick={() => onOpenApplyModal(course)}
                  className="w-full bg-[#ff9f1c] hover:bg-amber-500 text-white font-extrabold text-[10px] tracking-widest uppercase h-10 rounded transition-colors select-none cursor-pointer text-center leading-none"
                >
                  SCHEDULE CALLBACK
                </button>
              </div>

            </div>

            {/* Right Column (8 Cols): Syllabus chapters accordions mapping */}
            <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm text-left">
              <div className="bg-slate-100 px-4 py-3 border-b border-slate-200">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Course Syllabus modulesbreakdowns</h4>
              </div>

              <div className="divide-y divide-slate-150">
                {course.syllabus.map((m, mIdx) => {
                  const isOpened = activeModuleIndex === mIdx;
                  return (
                    <div key={mIdx} className="bg-white">
                      <button
                        onClick={() => setActiveModuleIndex(isOpened ? null : mIdx)}
                        className="w-full text-left p-4 hover:bg-slate-50/50 transition-colors flex items-center justify-between gap-4 outline-none border-none select-none cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#00005d]/10 text-[#00005d] text-[10px] font-black font-mono leading-none">
                            0{mIdx + 1}
                          </span>
                          <h4 className="text-xs sm:text-[13px] font-extrabold text-slate-900 tracking-tight leading-snug">{m.module}</h4>
                        </div>
                        <span className="text-slate-400 shrink-0">
                          {isOpened ? <ChevronUp className="h-4.5 w-4.5" /> : <ChevronDown className="h-4.5 w-4.5" />}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpened && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 pt-1.5 pl-10 space-y-2 border-t border-slate-100 bg-slate-50/40">
                              {m.topics.map((topic, tIdx) => (
                                <div key={tIdx} className="flex items-start gap-2.5 text-xs text-slate-650 text-slate-600 font-semibold leading-relaxed">
                                  <span className="text-[#ff9f1c] shrink-0 mt-1 select-none leading-none">▪</span>
                                  <span>{topic}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION 12: LEARN THROUGH PRACTICE ASSIGNMENTS --- */}
      <section className="bg-white py-14 border-b border-slate-200" id="assignments-practice">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a1d4a] uppercase tracking-tight">Learn Through Assignments in {course.title} Course</h2>
            <p className="text-xs text-slate-400 font-extrabold uppercase font-mono tracking-widest mt-1">
              Highlighting a selection of real-world assignments and case studies supported by leading companies across industries
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {meta.assignments.map((asg, idx) => (
              <div key={idx} className="bg-[#f8fafc] rounded-2xl border border-slate-200 p-5 hover:border-slate-350 transition-all h-full flex flex-col justify-between text-left shadow-sm">
                <div className="space-y-3">
                  <span className="text-[9px] bg-[#00005d] text-white font-extrabold px-2.5 py-0.5 rounded tracking-wide uppercase select-none inline-block font-mono leading-none">
                    {asg.company}
                  </span>
                  <h4 className="text-xs font-black text-slate-800 uppercase leading-snug">{asg.brief}</h4>
                </div>
                <div className="border-t border-slate-200 pt-3 mt-4 text-[11px] font-semibold text-slate-500 leading-relaxed font-sans">
                  <strong className="text-slate-800 text-[10px] block font-mono uppercase tracking-wider mb-1">Portfolio Outcome:</strong>
                  {asg.outcome}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- SECTION 13: THE BIA® ADVANTAGE PANEL INTERACTIVE ACCORDIONS --- */}
      <section className="bg-slate-950 text-white py-16" id="bia-advantage-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-1.5 select-none">
            <span className="text-[#ff9f1c] text-xs font-black uppercase tracking-widest font-mono">BIA® EDUCATION MODEL</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase">Why Boston Institute of Analytics Outstands</h2>
            <p className="text-xs text-[#ff9f1c] font-semibold font-mono uppercase tracking-wider">The BIA® Advantage</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Clickable selector accordion rows on the left (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-2.5 select-none">
              {ADVANTAGE_ITEMS.map((item, idx) => {
                const isActive = activeAdvantageIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveAdvantageIndex(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 outline-none flex items-center justify-between gap-4 cursor-pointer ${
                      isActive 
                        ? 'bg-[#00005d]/70 border-[#00005d] text-white shadow-lg' 
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-xs sm:text-[13px] font-extrabold tracking-tight font-sans uppercase">{item.title}</span>
                    <span className={`text-[9px] font-black uppercase tracking-wider font-mono px-2 py-0.5 rounded leading-none ${isActive ? 'bg-[#ff9f1c] text-slate-950' : 'bg-white/15 text-slate-350'}`}>
                      {item.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Expanded content area detailing selected features on the right (7 Cols) */}
            <div className="lg:col-span-7 bg-white/5 rounded-2xl border border-white/10 p-5 sm:p-7 space-y-5 animate-fade-in relative overflow-hidden h-full text-left">
              <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[#00005d]/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
                <div className="space-y-4 md:w-2/3">
                  <div className="space-y-1">
                    <span className="text-[#ff9f1c] text-[9.5px] font-black uppercase tracking-widest font-mono">Advantage Overview Details</span>
                    <h3 className="text-base sm:text-lg font-black tracking-tight leading-snug text-white uppercase">{ADVANTAGE_ITEMS[activeAdvantageIndex].title}</h3>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed font-semibold">
                    {ADVANTAGE_ITEMS[activeAdvantageIndex].tagline}
                  </p>
                  
                  <div className="space-y-3 pt-3 text-xs text-slate-400 font-medium leading-relaxed border-t border-white/10">
                    <p>{ADVANTAGE_ITEMS[activeAdvantageIndex].flippedText}</p>
                    <p>{ADVANTAGE_ITEMS[activeAdvantageIndex].asynchText}</p>
                  </div>
                </div>

                <div className="md:w-1/3 w-full h-40 md:h-48 overflow-hidden rounded-xl border border-white/10 bg-slate-900 select-none shrink-0">
                  <img 
                    src={ADVANTAGE_ITEMS[activeAdvantageIndex].img} 
                    alt={ADVANTAGE_ITEMS[activeAdvantageIndex].title}
                    className="w-full h-full object-cover opacity-70" 
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* --- SECTION 14: STEP BY STEP ENROLLMENT PROCESS --- */}
      <section className="bg-white py-14 border-b border-slate-200" id="enrollment-process">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a1d4a] uppercase tracking-tight">Enrollment Process</h2>
            <p className="text-xs text-slate-400 font-extrabold uppercase font-mono tracking-widest">Succeeding Admission Steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative text-left">
            
            <div className="bg-[#f8fafc] border border-slate-200 rounded-xl p-5 relative space-y-3 shadow-sm">
              <span className="text-[9.5px] bg-[#00005d]/10 text-[#00005d] font-black px-2.5 py-1 rounded select-none inline-block font-mono leading-none">STEP 01</span>
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Application Submission</h4>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Prospective students complete and submit an online application form with basic qualification parameters and career intent briefs.
              </p>
            </div>

            <div className="bg-[#f8fafc] border border-slate-200 rounded-xl p-5 relative space-y-3 shadow-sm">
              <span className="text-[9.5px] bg-[#ff9f1c]/10 text-[#ff9f1c] font-black px-2.5 py-1 rounded select-none inline-block font-mono leading-none">STEP 02</span>
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Application Review and Discovery Call</h4>
              <p className="text-xs text-slate-505 text-slate-500 font-semibold leading-relaxed">
                After a thorough review of applications by the academics team, successful candidates are coordinated for a verification discovery screening session.
              </p>
            </div>

            <div className="bg-[#f8fafc] border border-slate-200 rounded-xl p-5 relative space-y-3 shadow-sm">
              <span className="text-[9.5px] bg-emerald-100 text-emerald-800 font-black px-2.5 py-1 rounded select-none inline-block font-mono leading-none">STEP 03</span>
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Confirmation and Enrollment</h4>
              <p className="text-xs text-slate-505 text-slate-500 font-semibold leading-relaxed">
                Admitted students accept formal offers, receive structured program syllabus configurations, and initiate scheduled digital/physical classroom sessions.
              </p>
            </div>

          </div>

          <div className="text-center select-none pt-4">
            <button
              onClick={() => onOpenApplyModal(course)}
              className="bg-[#000033] hover:bg-black text-white font-extrabold text-[11px] tracking-widest uppercase h-11 px-10 rounded-lg transition-transform hover:scale-105 cursor-pointer shadow-md leading-none"
              id="enrollment-root-action"
            >
              APPLY NOW
            </button>
          </div>

        </div>
      </section>

      {/* --- SECTION 15: TESTIMONIAL PANEL WITNESS TRANSFORMS --- */}
      <section className="bg-slate-50 py-16 border-b border-slate-200" id="course-testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-1 select-none">
            <span className="text-[#ff9f1c] text-xs font-black uppercase tracking-widest font-mono">Verified Career Outcomes</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0a1d4a] uppercase">Witness How Our Course Transforms Careers</h2>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">Dialogue from our alumni base succeeding across multinational networks.</p>
          </div>

          {/* Ratios stats numbers row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center select-none">
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <span className="text-2xl sm:text-3xl font-black text-[#00005d] block leading-none font-mono">17,000+</span>
              <span className="text-[9.5px] font-extrabold text-slate-450 text-slate-500 uppercase block pt-1.5 tracking-wider">Career Transitions</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <span className="text-2xl sm:text-3xl font-black text-[#ff9f1c] block leading-none font-mono">50,000+</span>
              <span className="text-[9.5px] font-extrabold text-slate-450 text-slate-500 uppercase block pt-1.5 tracking-wider">Alumni Network</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <span className="text-2xl sm:text-3xl font-black text-blue-600 block leading-none font-mono">7,000+</span>
              <span className="text-[9.5px] font-extrabold text-slate-450 text-slate-500 uppercase block pt-1.5 tracking-wider">Industry Mentors</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 block leading-none font-mono">350+</span>
              <span className="text-[9.5px] font-extrabold text-slate-450 text-slate-500 uppercase block pt-1.5 tracking-wider">Corporate Partners</span>
            </div>
          </div>

          {/* Student Reviews details cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 leading-none">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500 shrink-0" />
                  ))}
                  <span className="text-[10px] text-emerald-600 font-extrabold bg-emerald-50 px-2 rounded-full border border-emerald-100 ml-2">VERIFIED ALUMNI</span>
                </div>
                <p className="text-xs text-slate-600 italic font-semibold leading-relaxed">
                  "Choosing the master track at Boston Institute of Analytics completely revolutionized my design capabilities. The training structure on vertex skeletons, organic topology, and Substance PBR shaders was incredibly fast and practical. I finished the cohort with a production-grade visual portfolio and locked down my active CGI animator credentials immediately."
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-4 leading-none">
                <div className="h-10 w-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0 select-none">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" alt="Priya Shama" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900 font-sans">Priya Sharma</p>
                  <p className="text-[9px] text-slate-400 font-bold block pt-1 uppercase">3D Character Lead, DNEG Studios</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 leading-none">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500 shrink-0" />
                  ))}
                  <span className="text-[10px] text-emerald-600 font-extrabold bg-emerald-50 px-2 rounded-full border border-emerald-100 ml-2">VERIFIED ALUMNI</span>
                </div>
                <p className="text-xs text-slate-600 italic font-semibold leading-relaxed">
                  "Our classroom training sessions was intense but outstanding. Working under instructors carrying years of genuine industry production experience completely removed guesswork. The corporate assignments helped us understand how film pipelines operate. I received physical credentials signed and direct recruitment lines that led me straight to live production workflows."
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-4 leading-none">
                <div className="h-10 w-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0 select-none">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" alt="Ramesh Patel" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900 font-sans">Ramesh Patel</p>
                  <p className="text-[9px] text-slate-400 font-bold block pt-1 uppercase">VFX Compositing Specialist, Technicolor</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hiring partners corporate boards rows */}
          <div className="space-y-5 pt-8 border-t border-slate-200">
            <h4 className="text-slate-805 text-slate-700 text-center font-black text-xs uppercase tracking-widest leading-none">Our Recruiters feedback quote rows</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
              {RECRUITER_QUOTES.map((q, idx) => (
                <div key={idx} className={`rounded-xl border p-4 flex flex-col justify-between h-36 shadow-sm ${q.bg}`}>
                  <p className="text-[10.5px] italic font-semibold leading-normal font-sans">"{q.quote}"</p>
                  <div className="border-t border-current/15 pt-2 mt-2 leading-none">
                    <p className="text-[11px] font-black">{q.company}</p>
                    <p className="text-[9px] opacity-75 block pt-0.5">{q.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* --- SECTION 16: DEDICATED PATHS & TRACK DURATIONS --- */}
      <section className="bg-[#000033] text-white py-14 border-b border-white/5" id="learning-paths">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
          
          <div className="space-y-1">
            <span className="text-[#ff9f1c] text-xs font-black uppercase tracking-widest font-mono">STRUCTURAL TARGET COHORTS</span>
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">The Learning Paths</h3>
            <p className="text-xs text-slate-400 font-medium">Review pathways, durations and certification specifics below.</p>
          </div>

          <div className="bg-slate-950/40 rounded-xl border border-white/10 overflow-hidden font-mono text-[11px] shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 select-none">
              
              <div className="p-5 space-y-2">
                <span className="text-[#ff9f1c] font-black tracking-widest uppercase">Certification</span>
                <p className="text-white font-extrabold text-xs">4 MONTHS DURATION</p>
                <div className="h-[1px] bg-white/10 my-2" />
                <p className="text-slate-400 font-sans leading-normal font-medium text-[11.5px]">Focuses on essential fundamentals, primary editing tools, standard core math models, and starting layout mechanics inside live sandboxes.</p>
              </div>

              <div className="p-5 space-y-2">
                <span className="text-blue-400 font-black tracking-widest uppercase">Diploma</span>
                <p className="text-white font-extrabold text-xs">6 MONTHS (INCLUDES 2 MONTHS INTERNSHIP)</p>
                <div className="h-[1px] bg-white/10 my-2" />
                <p className="text-slate-400 font-sans leading-normal font-medium text-[11.5px]">Steps into intermediate operations including specialized scripting frameworks, material nodes, database connections, and a 2-month verified internship.</p>
              </div>

              <div className="p-5 space-y-2">
                <span className="text-emerald-400 font-black tracking-widest uppercase">Master Diploma</span>
                <p className="text-white font-extrabold text-xs">10 MONTHS (6 MONTHS ON-JOB TRAINING)</p>
                <div className="h-[1px] bg-white/10 my-2" />
                <p className="text-slate-400 font-sans leading-normal font-medium text-[11.5px]">Ultimate specialization. Focuses on full-stack pipeline deployment, pipeline security checks, portfolio defense, and 6 months of paid training.</p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* --- SECTION 17: REFER A FRIEND REWARDS SYSTEM --- */}
      <section className="bg-white py-12 border-b border-slate-200" id="referral-banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#000033]/95 to-[#00005d] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative border border-white/5 select-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[#ff9f1c] text-[10px] font-black uppercase tracking-widest font-mono">BIA COMMUNITY OUTREACH</span>
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight">Refer A Friend and Unlock Rewards!</h3>
              <p className="text-xs sm:text-[13px] text-slate-300 leading-normal max-w-2xl font-medium">
                Earn cash incentives, tuition credit waivers, or specialized digital vouchers for every successful onboarding matching back to your private referral hash.
              </p>
            </div>
            <button
              onClick={() => onOpenApplyModal(course)}
              className="bg-[#ff9f1c] hover:bg-amber-500 text-white font-black text-[10.5px] uppercase tracking-widest h-11 px-8 rounded-lg shrink-0 transition-colors select-none shadow-md cursor-pointer"
            >
              Start Referring
            </button>
          </div>
        </div>
      </section>

      {/* --- SECTION 18 & 19: FAQ ACCORDION PANEL GROUPINGS --- */}
      <section className="bg-[#f8fafc] py-16 border-b border-slate-200" id="faq-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-1 select-none">
            <span className="text-[#ff9f1c] text-xs font-black uppercase tracking-widest font-mono">Frequently Asked Questions</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0a1d4a] uppercase tracking-tight">FAQs on {course.title} Course</h2>
          </div>

          {/* Collapsible details grids inside categorizations */}
          <div className="space-y-4 text-left shadow-sm bg-white rounded-xl border border-slate-205 p-5">
            <div className="border-b border-slate-100 pb-2 flex items-center justify-between pb-3">
              <span className="text-[10px] font-black tracking-wider uppercase text-[#00005d] font-mono leading-none">Curricula & Admission FAQs</span>
              <HelpCircle className="h-4.5 w-4.5 text-slate-400" />
            </div>

            <div className="divide-y divide-slate-150">
              <div className="py-3.5 space-y-1.5">
                <p className="text-xs font-black text-slate-800 leading-snug">What are the daily hours required to attend classroom workshops?</p>
                <p className="text-xs text-slate-505 text-slate-550 leading-relaxed font-semibold">
                  Classroom sessions carry a structured 3-hour duration, operating in multi-rail formats (8:00 AM - 11:00 AM, 2:00 PM - 5:00 PM or weekend schedules). Physical labs are open through 8:00 PM.
                </p>
              </div>

              <div className="py-3.5 space-y-1.5">
                <p className="text-xs font-black text-slate-800 leading-snug">Are admissions merit grants open to international candidates?</p>
                <p className="text-xs text-slate-505 text-slate-550 leading-relaxed font-semibold">
                  Yes. Academic review teams verify transcript scores of candidates globally to distribute merit tuition credits (ranging up to 35% tuition credits).
                </p>
              </div>

              <div className="py-3.5 space-y-1.5">
                <p className="text-xs font-black text-slate-800 leading-snug">Does the course support DoubleBuster query clearings?</p>
                <p className="text-xs text-slate-505 text-[#00005d] leading-relaxed font-bold">
                  BIA DoubleBuster learning support offers unlimited offline sandbox tutoring sessions scheduled dynamically by students whenever coding, texturing, or rendering query assistance is required.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- SECTION 20: ADVISORY HELPDESK OFFICE DETAILS --- */}
      <section className="bg-[#0b132b] text-white py-14" id="bia-helpdesk-location">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[9.5px] bg-[#ff9f1c]/15 text-[#ff9f1c] border border-[#ff9f1c]/20 font-black px-3 py-1 rounded uppercase tracking-wider font-mono">
              ADMISSIONS DESK OFFICES
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight leading-none">
              Questions? Connect With Physical Campus Leaders
            </h2>
            <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed font-medium max-w-2xl">
              An administrative counselor is available Monday through Sunday. Dial office coordinates to obtain zero-fee registration EMI timelines instantly.
            </p>
            
            <div className="space-y-3 pt-2 text-xs sm:text-xs font-semibold text-slate-305 text-slate-300 font-mono">
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[#ff9f1c]" />
                <span>Admissions Helpline: +1 (617) 223-6315 | +1 (617) 849-8482</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-sky-400" />
                <span>Institution Registrar Mail: info@bostoninstituteofanalytics.org</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 rounded-xl border border-white/5 p-5 relative select-none">
            <p className="text-[9px] font-black text-[#ff9f1c] uppercase tracking-widest leading-none mb-2 font-mono">Campus Coordinates</p>
            <p className="text-white font-extrabold text-xs">Boston Headquarters physical address:</p>
            <p className="text-[11px] text-slate-400 pt-1 leading-snug">125 Broad St, Financial District, Boston, MA 02110, United States</p>
            <div className="h-[1px] w-full bg-white/5 my-3" />
            <div className="flex items-center gap-1.5 text-[9.5px] font-black tracking-wider text-emerald-400 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Physical labs open from 8:00 AM local hours.
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
