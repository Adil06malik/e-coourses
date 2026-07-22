/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Course, School, Campus, Testimonial } from './types';

export const SCHOOLS: School[] = [
  {
    id: 'tech-ai',
    name: 'School of Technology and AI',
    description: 'Immersive training in cutting-edge computing, machine learning, cloud architectures, and agentic intelligence.',
    tagline: 'Leading the future of human-machine intelligence.',
    iconName: 'Cpu',
    stats: { students: '15,000+', experts: '1,500+', partners: '350+' }
  },
  {
    id: 'finance',
    name: 'School of Finance',
    description: 'Professional analytics, investment banking, credential prep, and advanced market valuation methodologies.',
    tagline: 'Deciphering markets and compounding analytical value.',
    iconName: 'TrendingUp',
    stats: { students: '5,000+', experts: '200+', partners: '350+' }
  },
  {
    id: 'management',
    name: 'School of Management',
    description: 'Data-driven business administration, digital marketing, analytics-guided operations, and strategic product management.',
    tagline: 'Empowering modern leaders with actionable analytics.',
    iconName: 'Briefcase',
    stats: { students: '10,000+', experts: '1,200+', partners: '350+' }
  },
  {
    id: 'animation-design',
    name: 'School of Animation and Design',
    description: 'Specialized curricula in 2D/3D visual art, VFX composite production, game architectures, architectural visualization, and design systems.',
    tagline: 'Where computational precision meets raw visual expression.',
    iconName: 'Palette',
    stats: { students: '8,000+', experts: '900+', partners: '350+' }
  },
  {
    id: 'media-comm',
    name: 'School of Media and Communication',
    description: 'Elite corporate communications, crisis management, digital public relations, journalism, and executive-level public speaking programs.',
    tagline: 'Bridging human connections through strategic voice and message.',
    iconName: 'MessageSquare',
    stats: { students: '7,500+', experts: '1,000+', partners: '350+' }
  },
  {
    id: 'corporate',
    name: 'School of Corporate Training',
    description: 'Bespoke executive development, cross-skills alignment, and enterprise-wide AI transformation bootcamps.',
    tagline: 'Empowering global workforces with modern technology.',
    iconName: 'ShieldAlert', // Will represent custom shield or globe
    stats: { students: '12,000+', experts: '3,000+', partners: '500+' }
  }
];

export const COURSES: Course[] = [
  // School of Technology & AI
  {
    id: 'data-science-ai',
    title: 'Data Science and Artificial Intelligence',
    description: 'Our flagship program covers python development, advanced machine learning, neural networks, predictive systems, and natural language processing. Master the mathematical models and algorithms that run modern intelligence engines.',
    schoolId: 'tech-ai',
    duration: '6 Months',
    mode: 'Classroom & Live Online',
    audience: ['Working Professionals', 'Aspiring Data Scientists', 'STEM Graduates'],
    topSkills: ['Python', 'Machine Learning', 'TensorFlow', 'Deep Learning', 'SQL', 'Predictive Modeling'],
    highlights: [
      'Dual-certification program with BIA credential',
      '10+ real-industry capstone projects',
      'Dedicated placement officer and mock drills',
      '1-on-1 industry mentor sessions'
    ],
    rating: 4.9,
    popular: true,
    bannerImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80',
    syllabus: [
      {
        module: 'Foundations of Python & Analytics Math',
        topics: ['Python basics, control flows & data structures', 'NumPy & Pandas for heavy matrix operations', 'Descriptive & Inferential Statistics', 'Probability theory & hypothesis testing']
      },
      {
        module: 'Supervised & Unsupervised Machine Learning',
        topics: ['Linear & Logistic Regression models', 'Decision Trees, Random Forests & Gradient Boosting', 'Clustering techniques (K-Means, Hierarchical)', 'Dimensionality Reduction (PCA)']
      },
      {
        module: 'Deep Learning, NLP & Generative AI',
        topics: ['Neural Networks & PyTorch foundations', 'Computer Vision & Convolutional Networks (CNN)', 'Natural Language Processing and Transformers', 'Large Language Models (LLM) fine-tuning']
      },
      {
        module: 'Data Engineering & Model Deployment',
        topics: ['SQL database structures & complex queries', 'AWS SageMaker & Cloud ML systems', 'Dockerizing ML workloads', 'Production hosting with FastAPI']
      }
    ]
  },
  {
    id: 'gen-agentic-ai',
    title: 'Generative AI And Agentic AI Development',
    description: 'Become an elite AI architect. Learn to construct self-correcting agent chains, integrate vector indexes, utilize multi-model orchestration, and deploy safe custom large language models on private infrastructures.',
    schoolId: 'tech-ai',
    duration: '4 Months',
    mode: 'Classroom & Live Online',
    audience: ['Software Engineers', 'AI Engineers', 'Tech Architects'],
    topSkills: ['LangChain', 'LlamaIndex', 'Vector DBs (Pinecone/Milvus)', 'Agentic Workflows', 'Prompt Fine-tuning'],
    highlights: [
      'Focus on Agentic frameworks (CrewAI, LangGraph)',
      'Construct a production multi-agent system from scratch',
      'Learn secure prompt boundary enforcement techniques',
      'Deploy enterprise AI assistants to cloud clusters'
    ],
    rating: 4.8,
    popular: true,
    bannerImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80',
    syllabus: [
      {
        module: 'GenAI Foundations & RAG Architectures',
        topics: ['LLM APIs & Prompt engineering frameworks', 'Retrieval Augmented Generation (RAG) concepts', 'Semantic chunking, embeddings & vector stores', 'Evaluation metrics (RAGAS, G-Eval)']
      },
      {
        module: 'Agentic Frameworks & Tool Use',
        topics: ['State machines and loops in AI workflows', 'LangGraph and CrewAI orchestrators', 'Constructing tools, schema bindings & actions', 'Self-verification and auto-debugging loops']
      },
      {
        module: 'Private Deployments & Governance',
        topics: ['Ollama & Local execution configurations', 'Fine-tuning weights via LoRA and QLoRA', 'Enterprise guardrails (NeMo, LlamaGuard)', 'Token optimization & cost-management patterns']
      }
    ]
  },
  {
    id: 'cyber-security',
    title: 'Cyber Security and Ethical Hacking',
    description: 'Master defense mechanisms by adopting offensive tactics. Learn penetration testing, security auditing, digital forensics, reverse engineering, and cloud infrastructure safeguard structures.',
    schoolId: 'tech-ai',
    duration: '6 Months',
    mode: 'Classroom & Live Online',
    audience: ['IT Administrators', 'Security Seekers', 'CS Students'],
    topSkills: ['Metasploit', 'Kali Linux', 'Wireshark', 'SOC Operations', 'OWASP Top 10', 'Risk Assessment'],
    highlights: [
      'Full sandbox range access for simulated attacks',
      'Matches curriculum for CEH (Certified Ethical Hacker)',
      'Includes active mock incident response drills',
      'Learn directly from licensed threat hunters'
    ],
    rating: 4.8,
    popular: false,
    bannerImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    syllabus: [
      {
        module: 'Information Security & Offensive Reconnaissance',
        topics: ['Network protocols & Wireshark sniffing', 'Passive & Active Footprinting', 'Nmap scanning & vulnerability scanning', 'Kali Linux toolkit utilization']
      },
      {
        module: 'System Penetration & Exploit Engineering',
        topics: ['Metasploit framework & privilege escalation', 'Web/Mobile Application Hacking (OWASP 10)', 'Wireless network breach techniques', 'Social Engineering mechanisms']
      },
      {
        module: 'Defensive Architecture & Cryptography',
        topics: ['SIEM / SOC monitoring configurations', 'Firewall, IDS & IPS rule crafting', 'Symmetric & Asymmetric crypto systems', 'Cloud Security controls (AWS / Azure)']
      }
    ]
  },
  {
    id: 'cloud-computing-devops',
    title: 'Cloud Computing and DevOps',
    description: 'Learn modern DevOps pipelines. Master continuous deployment, target multi-cloud orchestration, configure infrastructure-as-code, and manage heavy microservice networks running on container groups.',
    schoolId: 'tech-ai',
    duration: '5 Months',
    mode: 'Classroom & Live Online',
    audience: ['Sysadmins', 'Software Developers', 'IT Professionals'],
    topSkills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD Pipelines', 'Ansible'],
    highlights: [
      'Multi-cloud focus (AWS, Azure, GCP)',
      'Build 5 production-ready CI/CD pipelines',
      'Configured on real, container-grade clusters',
      'Includes active preparation for AWS Solutions Architect'
    ],
    rating: 4.7,
    popular: false,
    bannerImage: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=600&q=80',
    syllabus: [
      {
        module: 'AWS Cloud Architecture foundations',
        topics: ['EC2, VPC, S3 and IAM design rules', 'Serverless computing (AWS Lambda, API Gateway)', 'Relational & non-relational database services', 'High availability and load balancing concepts']
      },
      {
        module: 'Containerization & Orchestration',
        topics: ['Docker engine, containerization workflows & manifests', 'Kubernetes architecture, pods, deployments & replica sets', 'Service discovery, persistent volumes & config maps', 'Helm chart package control']
      },
      {
        module: 'Infrastructure-as-Code & Pipelines',
        topics: ['Terraform declarations & lock files', 'Ansible playback books & inventories', 'GitHub Actions / GitLab CI scripting', 'SonarQube quality checks & artifact storage']
      }
    ]
  },

  // School of Finance
  {
    id: 'investment-banking',
    title: 'Investment Banking and Financial Analytics',
    description: 'A quantitative immersion into investment decision modeling, corporate valuations, merge & acquisition structures, and leveraged buyout spreadsheets. Transition into an elite Wall Street analyst role.',
    schoolId: 'finance',
    duration: '6 Months',
    mode: 'Classroom & Live Online',
    audience: ['Commerce Graduates', 'Finance Professionals', 'MBA Aspirants'],
    topSkills: ['Financial Modeling', 'DCF Valuation', 'M&A Structuring', 'LBO Models', 'Bloomberg Terminal', 'Excel PowerUser'],
    highlights: [
      'Live mock deal-making and pitches',
      'Exotic spreadsheet templates and corporate structures',
      'Placement channels to global investment banks',
      'Access to premium real-world financial databases'
    ],
    rating: 4.9,
    popular: true,
    bannerImage: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80',
    syllabus: [
      {
        module: 'Core Corporate Finance Theory',
        topics: ['Understanding Financial Statements', 'Ratio analysis, cash flow metrics & working capital', 'Time value of money & capital budgeting', 'Cost of capital (WACC) calculations']
      },
      {
        module: 'Valuation Methodologies',
        topics: ['Comparable Companies Analysis (Trading Multiples)', 'Precedent Transaction Analysis', 'Discounted Cash Flow (DCF) modeling', 'Enterprise Value vs. Equity Value']
      },
      {
        module: 'M&A and LBO Structuring',
        topics: ['Accretion / Dilution (M&A) analysis', 'Leveraged Buyout (LBO) capital backing structures', 'Debt schedules and circular references', 'Deal pitch book construction']
      }
    ]
  },
  {
    id: 'financial-modeling',
    title: 'Financial Modeling & Valuation Fundamentals',
    description: 'Acquire precise skills to translate corporate ideas into flawless spreadsheet forecasts. Learn dynamic modeling structures, sensitivity tables, and valuation formulas used directly by private equity firms.',
    schoolId: 'finance',
    duration: '4 Months',
    mode: 'Classroom & Live Online',
    audience: ['Chartered Accountants', 'Business Analyst', 'Finance Students'],
    topSkills: ['Advanced Excel', 'VBA Coding', 'Sensitivity Analysis', 'Scenario Management', 'Industry Case Modeling'],
    highlights: [
      'Recreate 8 active corporate sheets from scratch',
      'Interactive dashboard templates in Excel',
      'Preparation for FMVA certification exams',
      'Intense focus on error mitigation habits'
    ],
    rating: 4.8,
    popular: false,
    bannerImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
    syllabus: [
      {
        module: 'Excel Master Class Methods',
        topics: ['INDEX-MATCH-XLOOKUP nested arrays', 'Dynamic arrays & spilling rules', 'What-If analyses and Scenario Manager', 'VBA scripts for recurring macros']
      },
      {
        module: 'Three Statement Integration',
        topics: ['Linking Income Statement, Balance Sheet and Cash Flow', 'Depreciation & Working Capital schedules', 'Resolving circular errors gracefully', 'Formatting formulas for print & C-Suite presentation']
      }
    ]
  },

  // School of Management
  {
    id: 'business-analytics-management',
    title: 'Business Management and Analytics',
    description: 'Prepare for data-driven strategic leadership. Learn to process operations telemetry, manage team performance metrics, make decisions through game theory, and lead transformation strategies.',
    schoolId: 'management',
    duration: '6 Months',
    mode: 'Classroom & Live Online',
    audience: ['Team Leaders', 'Business Executives', 'MBA Students'],
    topSkills: ['PowerBI', 'Tableau', 'Strategic KPI design', 'SQL', 'Predictive Forecasting', 'Agile Product Roles'],
    highlights: [
      'Focus on real executive decision cases',
      'Construct a portfolio of 5 dashboard suites',
      'Includes leadership and negotiation masterclasses',
      'Co-certified by prestigious partner management institutions'
    ],
    rating: 4.8,
    popular: true,
    bannerImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    syllabus: [
      {
        module: 'Business Analytics & KPI structures',
        topics: ['Converting strategy maps into numeric KPIs', 'Database connection queries with SQL', 'Tableau advanced data transformations', 'Designing clear executive dashboard views']
      },
      {
        module: 'Strategic Project Oversight & Agile',
        topics: ['Agile, Scrum and Lean project tools', 'Risk assessment frameworks (FMEA)', 'Resource loading & gantt tracking', 'Budgeting & financial return calculation (ROI, IRR)']
      }
    ]
  },
  {
    id: 'digital-marketing-analytics',
    title: 'Digital Marketing and Analytics',
    description: 'Bypassing vanilla social media posting. Master modern programmatic advertising, run high-ROI search campaigns, structure dynamic funnels, configure user tracking cookies, and decode attribution graphs.',
    schoolId: 'management',
    duration: '4 Months',
    mode: 'Classroom & Live Online',
    audience: ['Marketing Specialists', 'Business Owners', 'Creative Grads'],
    topSkills: ['Google Tag Manager', 'Google Analytics 4', 'Meta Ads Manager', 'SEO systems', 'Programmatic Bid Strategy'],
    highlights: [
      'Manage live budget experiments in class',
      'Configure deep GA4 attribution maps',
      'Covers absolute search engine logic mechanics',
      'Learn high-converting growth hacker copywriting'
    ],
    rating: 4.7,
    popular: false,
    bannerImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    syllabus: [
      {
        module: 'GA4 Tracking & attribution models',
        topics: ['Custom events & parameters in GA4', 'Cross-domain user session mechanics', 'Attribution modeling (First Click vs Data-driven)', 'Google Tag Manager trigger systems']
      },
      {
        module: 'Paid Ad Engine Mastery & SEO',
        topics: ['Meta pixel custom conversion definitions', 'Keyword mapping and index mechanics', 'Running A/B testing on multi-version creative suites', 'Budget allocation algorithms']
      }
    ]
  },

  // School of Animation & Design
  {
    id: 'graphic-design-video-editing',
    title: 'Graphic Design, Video Editing and 2D Animation',
    description: 'Learn the principles of modern visual assets. Master raster/vector layouts, handle multi-track audio/video timeline editing, create complex visual effects assets, and build motion design packages for commercial brands.',
    schoolId: 'animation-design',
    duration: '5 Months',
    mode: 'Classroom & Live Online',
    audience: ['Creative Directors', 'Visual Designers', 'YouTube Creators'],
    topSkills: ['Adobe Premiere Pro', 'After Effects', 'Photoshop', 'Illustrator', 'Motion Design', 'Brand Systems'],
    highlights: [
      'Prepare a professional, commercial design portfolio',
      'Get licensed software suite recommendations',
      'Construct exact assets for 4 mock brand books',
      '100% project-based graphic testing'
    ],
    rating: 4.8,
    popular: false,
    bannerImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    syllabus: [
      {
        module: 'Brand Visual design systems',
        topics: ['Layout grid structures & Typography laws', 'Vector rendering in Illustrator', 'Image manipulation & compositing in Photoshop', 'Defining cohesive color systems']
      },
      {
        module: 'Video Timeline Mechanics & Effects',
        topics: ['Premiere Pro asset importing & timeline editing', 'Color correction (Lumetri color scopes)', 'Sound editing & dynamic link integration', 'Keyframing motion graphics in After Effects']
      }
    ]
  },
  {
    id: 'three-d-animation-vfx',
    title: '3D Animation and VFX Film Making',
    description: 'Explore deep 3D asset workflows. Master asset modeling, organic character rigging, procedural texturing, fluid simulations, lighting rendering rigs, and production compositing inside global level studios.',
    schoolId: 'animation-design',
    duration: '6 Months',
    mode: 'Classroom & Live Online',
    audience: ['Aspiring VFX Artists', 'Game asset creators', 'Creative Thinkers'],
    topSkills: ['Maya', 'Blender', 'Substance Painter', 'Nuke', 'Character Rigging', 'RayTracing Renderers'],
    highlights: [
      'Access to top visual asset reference books',
      'Render your own capstone visual short film in Blender',
      'Regular industry grading rounds on visual assignments',
      'Direct pipelines to gaming & production agencies'
    ],
    rating: 4.9,
    popular: true,
    bannerImage: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=600&q=80',
    syllabus: [
      {
        module: '3D Modeling & texturing maps',
        topics: ['Hard-surface vs Organic polygon topology', 'UV unwrapping & layout optimization', 'Procedural texture maps in Substance Painter', 'PBR materials configuration']
      },
      {
        module: 'Rigging, Animation & VFX Composition',
        topics: ['Joint skeletal systems & weight painting', 'Principles of high-fidelity character movement', 'Fluid and particle simulations (smoke, glass)', 'Nuke green-screen keying & visual compounding']
      }
    ]
  },

  // School of Media and Communication
  {
    id: 'advertising-pr-corporate',
    title: 'Advertising, PR & Corporate Communications',
    description: 'Master the art of high-impact narrative engineering. Learn to construct persuasive brand stories, execute high-profile PR strategies, coordinate crises response networks, and structure communication policies.',
    schoolId: 'media-comm',
    duration: '5 Months',
    mode: 'Classroom & Live Online',
    audience: ['Public Relations Managers', 'PR Advisors', 'Communications Majors'],
    topSkills: ['Crisis Management', 'Media Writing', 'PR Campaigns', 'Corporate Branding', 'Storytelling', 'Stakeholder alignment'],
    highlights: [
      'Write real-time press responses to dynamic simulated disasters',
      'Review classic and modern PR Case documents',
      'Build relationships with top-tier publication media editors',
      'Mock newsroom style panel questioning drills'
    ],
    rating: 4.7,
    popular: false,
    bannerImage: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=600&q=80',
    syllabus: [
      {
        module: 'Corporate Narrative construction',
        topics: ['Brand guidelines and press release drafts', 'Crisis management framework & press statements', 'Stakeholder matrixing & communication flows', 'Internal employee brand alignments']
      },
      {
        module: 'PR Campaign execution & digital outreach',
        topics: ['Selecting publisher channels', 'Influencer PR outreach protocols & briefs', 'Quantifying PR performance (Earned media math)', 'Building deep relationships with key editors']
      }
    ]
  },
  {
    id: 'english-comm-public-speaking',
    title: 'English Communication and Public Speaking',
    description: 'Transform your vocal delivery and presence. Designed for executives, leaders, and academics, this high-coaching program hones articulation, body language, audience reading, and storytelling structures.',
    schoolId: 'media-comm',
    duration: '3 Months',
    mode: 'Classroom & Live Online',
    audience: ['Executive Directors', 'Sales Experts', 'Public Speakers', 'Students'],
    topSkills: ['Vocal Modulation', 'Body Language', 'Speech Construction', 'Overcoming Stage Fright', 'Persuasive Rhetoric'],
    highlights: [
      'Includes 10 live recorded and reviewed speaking drills',
      'Overcome communication blocks with targeted voice coach support',
      'Structure high-stakes boardroom arguments on the fly',
      'Master professional physical stance and presence'
    ],
    rating: 4.8,
    popular: false,
    bannerImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80',
    syllabus: [
      {
        module: 'The Mechanics of Speech articulation',
        topics: ['Breathing exercises & voice resonance', 'Vocal pacing, pitch modulation & dramatic pauses', 'Eliminating filler words from delivery', 'Targeted international accent clarity patterns']
      },
      {
        module: 'Rhetoric & Audience engagement',
        topics: ['Monroe Motivated Sequence speech structure', 'Hook elements & emotional storytelling', 'Handling hostile Q&A panels with poise', 'Structuring elegant visual presentations slide decks']
      }
    ]
  }
];

export const CAMPUSES: Campus[] = [
  { id: 'boston', city: 'Boston', country: 'United States', type: 'Global Hub', address: '125 Broad St, Financial District, Boston, MA 02110', phone: '+1 (617) 543-9821', email: 'boston@bostoninstituteofanalytics.org' },
  { id: 'london', city: 'London', country: 'United Kingdom', type: 'Global Hub', address: 'Level 18, 40 Bank St, Canary Wharf, London E14 5NR', phone: '+44 20 7153 9032', email: 'london@bostoninstituteofanalytics.org' },
  { id: 'dubai', city: 'Dubai', country: 'United Arab Emirates', type: 'Regional Center', address: 'Office 702, Block A, Dubai Knowledge Park, Dubai', phone: '+971 4 482 1982', email: 'dubai@bostoninstituteofanalytics.org' },
  { id: 'singapore', city: 'Singapore', country: 'Singapore', type: 'Regional Center', address: '8 Temasek Blvd, Suntec Tower 3, Singapore 038988', phone: '+65 6832 9110', email: 'singapore@bostoninstituteofanalytics.org' },
  { id: 'mumbai', city: 'Mumbai', country: 'India', type: 'Global Hub', address: 'BIA Tower, Bandra Kurla Complex (BKC), Mumbai, 400051', phone: '+91 22 6902 4400', email: 'mumbai@bostoninstituteofanalytics.org' },
  { id: 'paris', city: 'Paris', country: 'France', type: 'Regional Center', address: '36 Boulevard de Sébastopol, 75004 Paris', phone: '+33 1 42 78 55 90', email: 'paris@bostoninstituteofanalytics.org' },
  { id: 'sydney', city: 'Sydney', country: 'Australia', type: 'Regional Center', address: 'Level 22, 1 O\'Connell St, Sydney NSW 2000', phone: '+61 2 8223 4900', email: 'sydney@bostoninstituteofanalytics.org' }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    role: 'Senior Data Scientist',
    company: 'Google',
    courseName: 'Data Science and Artificial Intelligence',
    feedback: 'The classroom-based data science program at BIA completely redefined my career. The intensity of physical lab projects and direct mentoring from senior scientists unlocked paths that self-paced videos never could. It is the most rigorous curriculum I have encountered.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 't2',
    name: 'Rohit Sharma',
    role: 'M&A Deal Associate',
    company: 'Goldman Sachs',
    courseName: 'Investment Banking and Financial Analytics',
    feedback: 'Building Leveraged Buyout formulations under the strict oversight of Wall Street veterans gave me the muscle memory required for modern corporate banking interviews. The credential opened doors in Canary Wharf and BKC.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 't3',
    name: 'Elena Rostova',
    role: 'Lead AI Engineer',
    company: 'Deloitte',
    courseName: 'Generative AI And Agentic AI Development',
    feedback: 'BIA is always lightyears ahead. While other institutes were still discussing basic prompt templates, our classroom lab sessions had us compiling multi-agentic orchestration flows. Today, I lead enterprise automation implementations for Fortune 500 banks.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 't4',
    name: 'David Ng',
    role: 'VFX Compositor',
    company: 'Double Negative (DNEG)',
    courseName: '3D Animation and VFX Film Making',
    feedback: 'The Blender and Maya instructors at safety labs run production-level workflows. My final project reel was reviewed by Hollywood animation scouts, leading immediately to an internship in London.',
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  }
];

export const FAQS = [
  {
    question: 'How does the BIA certification process work?',
    answer: 'Upon finishing your program, you are evaluated based on your attendance, your practical scores across 10+ core capstone projects, and a final board presentation. Upon successful clearing, you receive a dual certification: the industry-accredited Boston Institute of Analytics Credential, and your specific specialization badge. Many global university/industry partners also co-issue these credentials.'
  },
  {
    question: 'Are there options for weekend and evening batches for working professionals?',
    answer: 'Yes. Most of our students are actively working in fast-paced corporate roles. BIA offers dedicated flexible education tracks including Weekend Classroom bootcamps (Saturdays & Sundays) and Advanced Evening Live Classes (held post-6 PM local campus hours).'
  },
  {
    question: 'Do you offer a placement program or guaranteed internships?',
    answer: 'Absolutely. Every student enrolled in our 6-month Professional Master Tracks receives dedicated support from the BIA Placement Cell. This includes portfolio defense prep, resume tuning sessions, mock panels, and exclusive priority entrance to interview drives across our 350+ global partner corporations.'
  },
  {
    question: 'Is prior technology, maths, or programming experience required?',
    answer: 'No. Our curricula are designed using an adaptive "Zero-to-One" educational pattern. We start with fundamental statistical frameworks, code libraries, or basic design principles before compounding into advanced generative neural networks or corporate leveraged banking deals. Individual catch-up tutoring is provided if necessary.'
  },
  {
    question: 'What is the fee adjustment structure or student financing options?',
    answer: 'BIA champions education access. We offer flexible zero-cost EMI plans from leading campus financial credit partners, allowing students to pay tuition across 6 to 18 split monthly installments. Meritorious student scholarships up to 35% are also awarded quarterly.'
  }
];
