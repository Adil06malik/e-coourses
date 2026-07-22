import React, { useState, useMemo } from 'react';
import { 
  Search, 
  BookOpen, 
  Cpu, 
  TrendingUp, 
  Palette, 
  Megaphone, 
  Briefcase, 
  GraduationCap, 
  MapPin, 
  Filter, 
  X,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

// Advisory Council Members Data
interface CouncilMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  specialities: string[];
  domainExpertise: string[];
  imageUrl: string;
}

const COUNCIL_MEMBERS: CouncilMember[] = [
  {
    id: "gary-griffin",
    name: "DR. GARY W. GRIFFIN",
    title: "Founder and CEO of TASADA Solutions",
    bio: "Founder and CEO of TASADA Solutions, specializing in enterprise solutions, Ex-Managing Consultant with IBM, Ex-Director at Atlanta Public Schools, Inventor of Datalink 1000 – a Master Data Management and Data Quality tool, Auburn University alumnus, Doctor of Philosophy in Sociology from Georgia State University.",
    specialities: ["Data Strategy", "Data Governance", "Advanced Analytics"],
    domainExpertise: ["Information Technology", "Transportation", "E-commerce", "Business Services", "Education", "Public Health"],
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256&h=256"
  },
  {
    id: "peter-jackson",
    name: "PETER JACKSON",
    title: "Chief Data and Technology Officer at Outra",
    bio: "Chief Data and Technology Officer at Outra, Ex-Chief Data and Analytics Officer at Carruthers and Jackson, Co-Author of best-selling 'Data' books: The Chief Data Officer's Playbook and Data Driven Business Transformation, Co-Founder of the CDO Summer School.",
    specialities: ["Data Strategy", "Data Analytics", "Data Tools", "Data Science", "Data Governance"],
    domainExpertise: ["Government", "Utilities", "Insurance", "Pensions", "Financial Services"],
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256&sat=-100" // Black and white look as in screenshot
  },
  {
    id: "erik-hodges",
    name: "DR. ERIK HODGES",
    title: "Senior Principal Analyst at Biogen",
    bio: "Senior Principal Analyst at Biogen, Postdoctoral research at Harvard Medical School and the VA Boston Healthcare System, specializing in implementing data pipelines that integrate clinical and behavioral datasets in neurological disorder research, University of Oklahoma alumnus, PhD from the University of Mississippi.",
    specialities: ["Neuroscience", "Biotechnology", "Machine Learning", "Statistical Data Analysis", "Software Development", "Data Engineering"],
    domainExpertise: ["Health Care", "Public Health"],
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256&h=256"
  },
  {
    id: "rachel-whitmore",
    name: "DR. RACHEL WHITMORE",
    title: "Chief Data Scientist",
    bio: "Chief Data Scientist at a leading HealthTech firm, with extensive experience in building predictive models for early disease detection and large-scale patient data analytics.",
    specialities: ["Health Data Analytics", "Machine Learning in Medicine", "Predictive Modeling"],
    domainExpertise: ["Healthcare", "Biotech", "Medical AI", "Public Health"],
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256&h=256"
  },
  {
    id: "tony-bordon",
    name: "TONY BORDON",
    title: "Managing Director",
    bio: "Managing Director of a global company specializing in analytics and insurance-based software, Board member of The Boston Children's Museum and BUILD.ORG, Ex-President of Institutional Initiatives with The Princeton Review, Ex-COO of Riverdeep Inc.",
    specialities: ["Marketing Analytics", "Sales Strategies"],
    domainExpertise: ["Digital Media", "Education", "Entertainment", "Publishing"],
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256&h=256"
  },
  {
    id: "james-kerley",
    name: "JAMES KERLEY",
    title: "Managing Partner",
    bio: "Managing Partner at US based business transformation company, Ex-CMO at LIMRA LOMA.",
    specialities: ["Sales Analytics", "Marketing", "Strategy"],
    domainExpertise: ["Insurance", "Finance", "Wealth Management"],
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=256&h=256"
  },
  {
    id: "james-holloway",
    name: "JAMES HOLLOWAY",
    title: "Vice President of Data Platforms",
    bio: "Vice President of Data Platforms at a global financial services organization, specializing in designing multi-cloud data infrastructure and advanced risk modeling systems for investment firms.",
    specialities: ["Financial Data Engineering", "Risk Modeling", "Cloud Data Architecture"],
    domainExpertise: ["Investment Banking", "Asset Management", "FinTech"],
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256"
  }
];

// The 6 Schools of BIA
interface School {
  id: string;
  name: string;
  highlight: string;
  description: string;
  icon: React.ElementType;
  colorClass: string;
  badgeColor: string;
}

const SCHOOLS: School[] = [
  {
    id: "tech-ai",
    name: "BIA® School of Technology & AI",
    highlight: "cutting-edge courses in Data Science, Cybersecurity, AI, and more",
    description: "preparing students for the future of tech.",
    icon: Cpu,
    colorClass: "border-blue-500/20 hover:border-blue-500 bg-blue-50/10",
    badgeColor: "bg-blue-100 text-blue-800"
  },
  {
    id: "management",
    name: "BIA® School of Management",
    highlight: "comprehensive programs in Investment Banking, Financial Analytics, and Business Management",
    description: "shaping strategic, leadership-oriented professionals.",
    icon: Briefcase,
    colorClass: "border-indigo-500/20 hover:border-indigo-500 bg-indigo-50/10",
    badgeColor: "bg-indigo-100 text-indigo-800"
  },
  {
    id: "finance",
    name: "BIA® School of Finance",
    highlight: "rigorous, industry-aligned programs in Investment Banking, CFA, Financial Modeling, and Valuation",
    description: "developing analytical minds to lead in dynamic markets.",
    icon: TrendingUp,
    colorClass: "border-emerald-500/20 hover:border-emerald-500 bg-emerald-50/10",
    badgeColor: "bg-emerald-100 text-emerald-800"
  },
  {
    id: "animation",
    name: "BIA® School of Animation & Design",
    highlight: "creative potential through courses in Animation, Gaming, Fashion Analytics, and VFX",
    description: "blending technology with visual storytelling.",
    icon: Palette,
    colorClass: "border-purple-500/20 hover:border-purple-500 bg-purple-50/10",
    badgeColor: "bg-purple-100 text-purple-800"
  },
  {
    id: "media",
    name: "BIA® School of Media and Communications",
    highlight: "trains students in journalism, advertising, English communication, and public speaking",
    description: "skills vital in today’s media-driven world.",
    icon: Megaphone,
    colorClass: "border-amber-500/20 hover:border-amber-500 bg-amber-50/10",
    badgeColor: "bg-amber-100 text-amber-800"
  },
  {
    id: "corporate",
    name: "BIA® School of Corporate Training",
    highlight: "high-impact programs for organizations",
    description: "focused on emerging tech, leadership, and workforce transformation.",
    icon: GraduationCap,
    colorClass: "border-rose-500/20 hover:border-rose-500 bg-rose-50/10",
    badgeColor: "bg-rose-100 text-rose-800"
  }
];

export default function Council() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState<string | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  // Extract all unique specialities and domains for interactive filters
  const allSpecialities = useMemo(() => {
    const specs = new Set<string>();
    COUNCIL_MEMBERS.forEach(m => m.specialities.forEach(s => specs.add(s)));
    return Array.from(specs);
  }, []);

  const allDomains = useMemo(() => {
    const domains = new Set<string>();
    COUNCIL_MEMBERS.forEach(m => m.domainExpertise.forEach(d => domains.add(d)));
    return Array.from(domains);
  }, []);

  // Filter logic
  const filteredMembers = useMemo(() => {
    return COUNCIL_MEMBERS.filter(member => {
      const matchesSearch = 
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSpeciality = selectedSpeciality ? member.specialities.includes(selectedSpeciality) : true;
      const matchesDomain = selectedDomain ? member.domainExpertise.includes(selectedDomain) : true;

      return matchesSearch && matchesSpeciality && matchesDomain;
    });
  }, [searchQuery, selectedSpeciality, selectedDomain]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSpeciality(null);
    setSelectedDomain(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Top Brand Navigation / Banner */}

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 py-12 space-y-20">

        {/* Section 1: Overview & About BIA */}
        <section id="about" className="space-y-8 scroll-mt-24">
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-extralight text-slate-900 tracking-tight leading-tight">
              Boston Institute of Analytics<span className="text-xl md:text-2xl align-super">®</span>
            </h1>
            <div className="h-0.5 w-16 bg-blue-600 mx-auto rounded"></div>
          </div>

      <div className="relative rounded-2xl overflow-hidden shadow-lg min-h-[600px] flex flex-col justify-start items-start px-6 py-8">
  
  <p className="text-slate-600 text-base md:text-lg leading-relaxed text-justify mb-6">
    As the world's top ranked advanced training institute, Boston Institute of Analytics imparts training to students and working professionals via classroom training conducted by industry experts. With training campuses across US, UK, Europe and Asia, BIA<span className="text-xs align-super">®</span> has training programs across the globe with a mission to bring quality education in emerging fields. BIA<span className="text-xs align-super">®</span> courses are designed to train students and professionals on industry's most widely sought after skills, and make them job ready in today's rapidly evolving world.
  </p>

  {/* <p className="text-slate-800 font-medium text-base md:text-lg leading-relaxed border-l-4 border-blue-500 pl-4 mb-6">
    BIA<span className="text-xs align-super">®</span> stands as a global benchmark for professional education, with six specialized schools designed to meet the fast-evolving demands of industry.
  </p> */}

<p className="text-slate-600 text-base md:text-lg leading-relaxed text-justify mb-4">
  <span className="font-bold">
    The BIA<span className="text-xs align-super">®</span> School of Technology & AI
  </span>{" "}
  delivers cutting-edge courses in Data Science, Cybersecurity, AI, and more – preparing students for the future of tech.
</p>

<p className="text-slate-600 text-base md:text-lg leading-relaxed text-justify mb-4">
  <span className="font-bold">
    The BIA<span className="text-xs align-super">®</span> School of Management
  </span>{" "}
  offers comprehensive programs in Investment Banking, Financial Analytics, and Business Management, shaping strategic, leadership-oriented professionals.
</p>

<p className="text-slate-600 text-base md:text-lg leading-relaxed text-justify mb-4">
  <span className="font-bold">
    The BIA<span className="text-xs align-super">®</span> School of Finance
  </span>{" "}
  provides rigorous, industry-aligned programs in Investment Banking, CFA, Financial Modeling, and Valuation – developing analytical minds to lead in dynamic markets.
</p>

<p className="text-slate-600 text-base md:text-lg leading-relaxed text-justify mb-4">
  <span className="font-bold">
    The BIA<span className="text-xs align-super">®</span> School of Animation & Design
  </span>{" "}
  unlocks creative potential through courses in Animation, Gaming, Fashion Analytics, and VFX, blending technology with visual storytelling.
</p>

<p className="text-slate-600 text-base md:text-lg leading-relaxed text-justify mb-4">
  <span className="font-bold">
    The BIA<span className="text-xs align-super">®</span> School of Media and Communications
  </span>{" "}
  trains students in journalism, advertising, English communication, and public speaking – skills vital in today's media-driven world.
</p>

<p className="text-slate-600 text-base md:text-lg leading-relaxed text-justify mb-6">
  Finally,{" "}
  <span className="font-bold">
    the BIA<span className="text-xs align-super">®</span> School of Corporate Training
  </span>{" "}
  designs high-impact programs for organizations, focused on emerging tech, leadership, and workforce transformation.
</p>

<p className="text-slate-600 text-base md:text-lg leading-relaxed text-justify">
  <span className="font-bold">
    Boston Institute of Analytics (BIA)
    <span className="text-xs align-super">®</span>
  </span>{" "}
  was founded in Boston, Massachusetts as a joint venture by multiple international education and analytics organizations. The day-to-day operations are run by country-specific teams that report to a global advisory board.
</p>

</div>
        </section>

        {/* Section 2: Six Specialized Schools */}
        {/* <section id="schools" className="space-y-10 scroll-mt-24">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-light text-slate-900 tracking-tight">Our Six Specialized Schools</h2>
            <p className="text-sm text-slate-500">Engineered to meet the fast-evolving demands of international business &amp; tech ecosystems</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SCHOOLS.map((school) => {
              const IconComp = school.icon;
              return (
                <div 
                  key={school.id}
                  className={`group relative flex flex-col justify-between p-6 bg-white border rounded-xl transition-all duration-300 hover:shadow-md ${school.colorClass}`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-lg bg-slate-50 text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${school.badgeColor}`}>
                        BIA®
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                        {school.name}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed text-justify">
                        The {school.name} <span className="font-medium text-slate-900">{school.highlight}</span> – {school.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div> */}

          {/* History/Founding Callout */}
          {/* <div className="bg-slate-900 text-slate-200 rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden max-w-4xl mx-auto">
            <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-blue-400 font-bold">Global Presence</h4>
              <p className="text-base md:text-lg leading-relaxed text-slate-300">
                Boston Institute of Analytics (BIA)<span className="text-xs align-super">®</span> was founded in Boston, Massachusetts as a joint venture by multiple international education and analytics organizations. The day-to-day operations are run by country-specific teams that report to a global advisory board.
              </p>
            </div>
          </div>
        </section> */}

        {/* Section 3: Advisory Council Section Header Banner */}
        <section id="advisory" className="scroll-mt-24 space-y-8">
          {/* <div className="relative rounded-2xl overflow-hidden shadow-lg h-60 md:h-80 flex flex-col justify-center items-center text-center px-4"> */}
            {/* Elegant Background Image with Dark Tint */}
            {/* <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-500 transform hover:scale-105" 
              style={{ 
                backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.95)), url('https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=1200')` 
              }}
            ></div> */}
            
            {/* Banner Text */}
            {/* <div className="relative z-10 space-y-2 md:space-y-4 px-4 max-w-2xl">
              <span className="text-xs md:text-sm font-semibold uppercase tracking-widest text-slate-400 block animate-pulse">
                GUIDING EXCELLENCE, SHAPING FUTURES
              </span>
              <h2 className="text-3xl md:text-5xl font-light text-white tracking-wide">
                BIA<span className="text-xl md:text-2xl align-super">®</span> Advisory Council
              </h2>
              <div className="w-12 h-1 bg-blue-500 mx-auto rounded"></div>
            </div>
          </div> */}

          {/* Interactive Filtering UI */}
          {/* <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-slate-900 text-lg">Search &amp; Filter the Council</h3>
                <p className="text-xs text-slate-500">Discover expertise, backgrounds, and domain coverage across the global board</p>
              </div>
              {(selectedSpeciality || selectedDomain || searchQuery) && (
                <button 
                  onClick={clearFilters}
                  className="self-start md:self-auto flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-medium transition-colors border border-rose-100 px-2.5 py-1.5 rounded-lg bg-rose-50"
                >
                  <X className="w-3.5 h-3.5" /> Clear Filters
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> */}
              {/* Search input */}
              {/* <div className="relative">
                <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search by name, bio, keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 placeholder-slate-400"
                />
              </div> */}

   

          <section className="relative h-[250px] md:h-[320px] overflow-hidden">
  {/* Background Image */}
  <img
    src="/your-image.jpg"
    alt="Advisory Council"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/60"></div>

  {/* Content */}
  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
    <p className="text-white text-sm md:text-lg uppercase tracking-wider mb-3">
      GUIDING EXCELLENCE, SHAPING FUTURES
    </p>

    <h1 className="text-white font-bold text-3xl md:text-5xl">
      BIA<sup className="text-sm md:text-lg relative -top-4 ml-1">®</sup>
      {" "}Advisory Council
    </h1>
  </div>
</section>

          {/* Council Grid / Cards */}
          {filteredMembers.length > 0 ? (
            <div className="space-y-6">
              {filteredMembers.map((member) => (
                <div 
                  key={member.id}
                  className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8"
                >
                  {/* Portrait Avatar with standard premium fallback */}
                  <div className="relative flex-shrink-0">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-slate-100 shadow-inner">
                      <img 
                        src={member.imageUrl} 
                        alt={member.name} 
                        className={`w-full h-full object-cover ${member.id === 'peter-jackson' ? 'grayscale' : ''}`}
                        onError={(e) => {
                          // Fallback to high quality avatar generator on image load failure
                          (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}`;
                        }}
                      />
                    </div>
                  </div>

                  {/* Profile Copy Details */}
                  <div className="space-y-4 flex-1 text-center md:text-left">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold tracking-tight text-slate-900">
                        {member.name}
                      </h3>
                      <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                        {member.title}
                      </p>
                    </div>

                    <p className="text-slate-600 text-sm md:text-base leading-relaxed text-justify md:text-left">
                      {member.bio}
                    </p>

                    <div className="space-y-3 pt-2 text-left">
             
               
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center space-y-4">
              <div className="inline-flex p-4 bg-slate-50 text-slate-400 rounded-full">
                <Search className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-slate-900 text-lg">No council members match your filters</p>
                <p className="text-sm text-slate-500">Try adjusting your filters or search keywords.</p>
              </div>
              <button 
                onClick={clearFilters}
                className="px-4 py-2 bg-slate-950 hover:bg-slate-850 text-white rounded-lg text-xs font-semibold"
              >
                Reset Search
              </button>
            </div>
          )}
        </section>


<section className="py-8 md:py-12">
  <div className="max-w-7xl mx-auto px-4 md:px-8">
    <h2 className="text-2xl md:text-4xl font-bold text-slate-900 leading-tight mb-6 text-center">
      We take pride in the collaborative spirit of our Advisory Council, a key driving force behind our commitment to shaping futures and empowering the next generation of leaders.
    </h2>

    <p className="text-slate-600 text-base md:text-lg leading-relaxed text-justify">
      From entrepreneurial trailblazers to corporate titans, the council comprises individuals who have excelled in their respective fields. This diversity in experience and perspective enables us to design and implement a robust pedagogy that ensures our students are well-prepared for the multifaceted demands of the hyper-competitive world of tomorrow.
    </p>
  </div>
</section>
      </main>
    </div>
  );
}