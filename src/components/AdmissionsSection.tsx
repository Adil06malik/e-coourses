
import React, { useState } from 'react';
import { Check, Star, Package } from 'lucide-react';
import { useNavigate } from "react-router-dom";

// Define strict interfaces for TypeScript type safety
interface PillarStats {
  
  students: string;
  trainers: string;
  partners: string;
}

interface PillarSectionProps {
  title?: string;
  description?: string;
  id?: string;
  image?: string;
  stats?: PillarStats;
  isReversed?: boolean;
}

const PillarSection: React.FC<PillarSectionProps> = ({ 
  id,
  title = "School Title", 
  description = "No description available.", 
  image = "", 
  stats = { students: "0+", trainers: "0+", partners: "0+" }, 
  isReversed = false 
}) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState<boolean>(false);

  return (
    <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 py-12 border-b border-slate-100 last:border-0`}>
      
      {/* Image Container with Safe Fallback State */}
      <div className="w-full md:w-1/2">
        <div className="relative rounded-2xl overflow-hidden shadow-xl transition-transform duration-500 hover:scale-[1.02] bg-slate-100 aspect-[16/10] flex items-center justify-center">
          {image && !imageError ? (
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="text-slate-400 text-sm font-medium">Image not available</span>
          )}
        </div>
      </div>

      {/* Content Container */}
      <div className="w-full md:w-1/2 space-y-6">
        <h3 className="text-2xl font-medium text-slate-800 tracking-tight">
          {title}
        </h3>
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          {description}
        </p>

        {/* Metrics Grid with Type-Safe Property Access */}
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
              <Check className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900">{stats?.students ?? "0+"}</div>
              <div className="text-[10px] sm:text-xs text-slate-500 font-medium uppercase tracking-wider">BIA Trained Students</div>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900">{stats?.trainers ?? "0+"}</div>
              <div className="text-[10px] sm:text-xs text-slate-500 font-medium uppercase tracking-wider">Industry Trainers</div>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
              <Package className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900">{stats?.partners ?? "0+"}</div>
              <div className="text-[10px] sm:text-xs text-slate-500 font-medium uppercase tracking-wider">Corporate Partners</div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-6">
        <button
           onClick={() => navigate(`/CourseDetiled/${id}`)}
              className="bg-[#FF9F00] hover:bg-[#e68f00] text-white font-bold py-3 px-10 rounded-lg shadow-lg"
           >
        Know More
        </button>
        </div>
      </div>
    </div>
  );
};



export default function AdmissionsSection() {
  const pillars: PillarSectionProps[] = [
    {
      title: "School of Technology and AI",
      description: "Embark on a journey into the future at the School of Tech and AI. Here, we nurture the minds that will shape the technological landscape of tomorrow. Our cutting-edge professional training courses and state-of-the-art facilities empower students to harness the power of technology and artificial intelligence. From Data Science and AI to Cybersecurity and more, we cultivate the skills that drive progress in the digital age.",
      image: "image_e598a5.jpg",
      id: "technology",
      stats: { students: "15,000+", trainers: "1,500+", partners: "350+" },
      isReversed: false
    },
    {
      title: "School of Management",
      description: "Welcome to the beating heart of strategic education – the School of Management. Here, we don't just cultivate leaders; we tailor expertise to meet the demands of a dynamic business landscape. Explore our specialized courses in Business Management, Investment Banking, Digital Marketing, and more. All our professional training courses offer a cutting-edge curriculum and real-world insights, empowering students to excel in their chosen domains.",
      image: "image_e595b6.jpg",
      id: "management",
      stats: { students: "15,000+", trainers: "1,500+", partners: "350+" },
      isReversed: true
    },
    {
      title: "School of Finance",
      description: "Step into the high-stakes world of global finance and wealth management. The School of Finance offers specialized instruction in Investment Banking, Equity Research, Corporate Valuation, and Fintech. Empower yourself with advanced financial tools and strategic economic modeling skills designed to navigate contemporary markets and optimize institutional growth.",
      image: "image_finance.jpg",
      id:"finance",// Fallback gracefully displays if image doesn't exist
      stats: { students: "12,000+", trainers: "1,200+", partners: "280+" },
      isReversed: false
    },
    {
      title: "School of Animation and Design",
      description: "Bring your visual ideas to life and master the craft of storytelling. The School of Animation and Design equips you with hands-on skills in 3D Modeling, VFX, UI/UX Design, and Digital Illustration. Work alongside experienced visual creators and industry designers to translate pure imagination into highly engaging, digital experiences.",
      image: "image_design.jpg",
      id: "design",
      stats: { students: "8,500+", trainers: "750+", partners: "190+" },
      isReversed: true
    },
    {
      title: "School of Media and Communication",
      description: "Analyze, adapt, and lead in today's rapid digital media environment. Our School of Media and Communication provides intensive development in digital journalism, public relations, brand content management, and strategic marketing. Cultivate a powerful communication voice to construct impactful messages across corporate and social channels.",
      image: "image_media.jpg",
      id: "media",
      stats: { students: "9,500+", trainers: "900+", partners: "220+" },
      isReversed: false
    },
    {
      title: "School of Corporate Training",
      description: "Nurture global professional alignment and drive strategic workplace results. The School of Corporate Training crafts customizable workshops, leadership programs, and modern business training curriculum designed for teams and key executives. Cultivate future-ready organizational skills to ensure a clear pathway to enterprise success.",
      image: "image_corporate.jpg",
      id: "corporate",
      stats: { students: "22,000+", trainers: "1,800+", partners: "450+" },
      isReversed: true
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 text-center">
        <p className="text-[#FF9F00] font-normal text-sm sm:text-base mb-2">
          Here are more reasons to choose us
        </p>
        <h2 className="text-3xl sm:text-4xl font-normale text-slate-900 tracking-tight">
          Our Six Pillars of Excellence
        </h2>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="space-y-4">
        {pillars.map((pillar, index) => (
         <PillarSection
             key={index}
         {...pillar}
  />
))}
        </div>
      </div>
    </div>
  );
}