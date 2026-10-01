/**
 * Mock event fixtures for the Event Details page.
 * Aligned with the event cards developed by Mithul in PR #22.
 * All data is purely client-side; no backend is involved.
 *
 * Implements the 6 events shown in the cards & grid screenshots:
 *   1. aimlHackathon           — "aiml-hackathon-2026" (Hackathon, 20 AICTE Pts, Free, Open)
 *   2. webDevBootcamp          — "web-development-bootcamp" (Workshop, 10 AICTE Pts, ₹150, Paid)
 *   3. footballLeagueTrials    — "rvce-football-league-trials" (Sports, 5 AICTE Pts, Free, Fast-filling)
 *   4. culturalFestFinale      — "cultural-fest-finale" (Cultural, 5 AICTE Pts, Free, Sold Out)
 *   5. cybersecurityMasterclass— "cybersecurity-masterclass" (Technical, 15 AICTE Pts, ₹100, Paid)
 *   6. photographyContest      — "photography-contest" (Cultural, 8 AICTE Pts, Free, Past/Concluded)
 */
import type { EventDetail } from "./event-types";

/** 1. Flagship AI/ML Hackathon 2026 — Card 1 in screenshots */
export const aimlHackathon: EventDetail = {
  slug: "aiml-hackathon-2026",
  title: "AI/ML Hackathon 2026",
  description: `Build. Innovate. Solve real-world problems.

Join the Coding Club RVCE for our premier 24-hour flagship AI/ML Hackathon 2026! Gather your team of 2 to 4 student developers, researchers, and data scientists to tackle pressing challenges across industry and society.

This year's competition features four cutting-edge tracks:
• Generative AI & Autonomous Agent Systems
• Computer Vision for Smart Campus & Healthcare Diagnostics
• Climate Intelligence, Energy Optimization & Sustainability
• High-Frequency Financial Modeling & Algorithmic Insights

What to expect:
• Dedicated high-performance GPU cloud compute vouchers sponsored by industry partners
• 1-on-1 architecture feedback and continuous mentoring from alumni engineers and faculty researchers
• Access to curated enterprise datasets and benchmark evaluation frameworks
• ₹1,00,000+ total prize pool, plus fast-track interview opportunities with sponsor tech firms
• +20 AICTE Activity Points officially certified for all completing participants

Bring your laptops, chargers, and curiosity — meals, midnight caffeine, and high-speed campus networking are fully provided!`,
  bannerUrl:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  clubName: "Coding Club RVCE",
  clubLogoUrl: "/logos/coding_club_logo_blush.png",
  category: "Hackathon",
  dateTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now
  timezone: "IST",
  venue: "RVCE Main Auditorium, Ground Floor",
  registrationState: "open",
  fee: 0,
  aictePoints: 20,
  capacity: 200,
  registeredCount: 142,
  agenda: [
    {
      time: "09:00 AM",
      title: "Check-in, Breakfast & Badge Verification",
      description: "Welcome kit distribution, badge scanning, and team desk allocation.",
    },
    {
      time: "10:00 AM",
      title: "Opening Ceremony & Problem Track Unveiling",
      speaker: "Dr. K. N. Subramanya, Principal RVCE",
      description: "Keynote on AI innovation at RVCE and official release of challenge problem statements.",
    },
    {
      time: "11:00 AM",
      title: "Hacking Begins",
      description: "24-hour hack clock starts. Repo setup and pipeline architecture.",
    },
    {
      time: "01:00 PM",
      title: "Catered Lunch & Networking",
      description: "Lunch provided for all participants in the food court marquee.",
    },
    {
      time: "03:30 PM",
      title: "Tech Talk: Production LLM & RAG Systems",
      speaker: "Siddharth Rao, Lead AI Architect",
      description: "Best practices for low-latency inference, vector search, and agent orchestration.",
    },
    {
      time: "07:00 PM",
      title: "Mentorship Round 1: Feasibility & Design Review",
      speaker: "Technical Mentors Panel",
      description: "Judges review system design, baseline models, and API integrations.",
    },
    {
      time: "08:30 PM",
      title: "Dinner & Midnight Fuel",
      description: "Hot dinner served followed by energy drinks and snack stations.",
    },
    {
      time: "02:00 AM",
      title: "Midnight Refresh: Speed Chess & Mini CTF",
      description: "Casual 30-minute brain break with fun prizes.",
    },
    {
      time: "08:00 AM",
      title: "Breakfast & Code Freeze Countdown",
      description: "1-hour warning before final code submission and deployment check.",
    },
    {
      time: "09:00 AM",
      title: "Code Freeze & Live Jury Demos",
      description: "Teams present 5-minute interactive demos and answer jury questions.",
    },
    {
      time: "11:30 AM",
      title: "Grand Finale, Awards & Certificate Handout",
      speaker: "Distinguished Alumni & Faculty Jury",
      description: "Announcement of top 3 teams, track winners, and distribution of AICTE certificates.",
    },
  ],
  organizer: {
    clubName: "Coding Club RVCE",
    contactName: "Amartya Sen",
    email: "codingclub@rvce.edu.in",
    instagramUrl: "https://instagram.com/codingclubrvce",
    linkedinUrl: "https://linkedin.com/company/codingclubrvce",
    websiteUrl: "https://codingclubrvce.com",
  },
  tags: ["ai", "ml", "hackathon", "python", "deep-learning", "coding-club"],
};

/** 2. Web Development Bootcamp — Card 2 in screenshots (Paid Workshop) */
export const webDevBootcamp: EventDetail = {
  slug: "web-development-bootcamp",
  title: "Web Development Bootcamp",
  description: `Build. Innovate. Solve real-world problems.

Accelerate your journey into professional full-stack software development with Coding Club RVCE's intensive Web Development Bootcamp.

Bridging classroom theory with modern production engineering, this hands-on workshop takes you step-by-step through architecting, building, and deploying performant web applications using Next.js 16 App Router, TypeScript, Tailwind CSS v4, Base UI, and typed gRPC services.

What you'll master:
• React 19 Server Components, Streaming SSR, and Server Actions
• Modern Design Systems: Tailwind CSS v4 design tokens, CSS variables, and fluid typography
• BFF (Backend-for-Frontend) architecture with typed gRPC wrapper clients
• Containerization with multi-stage Dockerfiles and continuous deployment
• +10 AICTE Activity Points upon project completion and peer code review

Registration fee: ₹150 per seat (covers infrastructure credits, course handbook, and high-tea). Payable at the venue or via UPI verification upon registration.`,
  bannerUrl:
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
  clubName: "Coding Club RVCE",
  clubLogoUrl: "/logos/coding_club_logo_blush.png",
  category: "Workshop",
  dateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
  timezone: "IST",
  venue: "Seminar Hall 2, CSE Department",
  registrationState: "open",
  fee: 150,
  aictePoints: 10,
  capacity: 100,
  registeredCount: 65,
  agenda: [
    {
      time: "02:00 PM",
      title: "Environment Setup & Next.js 16 Fundamentals",
      speaker: "Frontend Core Leads",
      description: "Setting up Node.js 20, TypeScript strict mode, and App Router project scaffolding.",
    },
    {
      time: "03:00 PM",
      title: "Building Component Libraries with Tailwind v4 & Shadcn",
      description: "Deep dive into CSS tokens, accessible interactive widgets, and Storybook stories.",
    },
    {
      time: "04:15 PM",
      title: "High-Tea & Q&A Break",
      description: "Snacks, tea, and informal discussion with club developers.",
    },
    {
      time: "04:45 PM",
      title: "BFF Layer, gRPC Translation & State Management",
      speaker: "Backend Core Team",
      description: "Writing clean TypeScript wrappers and separating presentation from domain logic.",
    },
    {
      time: "06:00 PM",
      title: "Production Deployment & Project Showcase",
      description: "Building production bundles, Docker containers, and CI pipeline setup.",
    },
  ],
  organizer: {
    clubName: "Coding Club RVCE",
    contactName: "Mithul Talanki",
    email: "codingclub@rvce.edu.in",
    instagramUrl: "https://instagram.com/codingclubrvce",
    linkedinUrl: "https://linkedin.com/company/codingclubrvce",
    websiteUrl: "https://codingclubrvce.com",
  },
  tags: ["web-dev", "nextjs", "react", "tailwind", "typescript"],
};

/** 3. RVCE Football League Trials — Card 3 in screenshots (Sports, Fast-filling) */
export const footballLeagueTrials: EventDetail = {
  slug: "rvce-football-league-trials",
  title: "RVCE Football League Trials",
  description: `Build. Innovate. Solve real-world problems.

The Department of Physical Education and the RVCE Sports Committee invite student footballers across all academic years and engineering branches to the official RVCE Football League Trials for the 2026–2027 athletic season.

These trials represent the primary scouting selection for:
• The official RVCE University Men's & Women's Football Squad (VTU Inter-Collegiate Tournaments)
• The annual RVCE Inter-Department Football Championship
• Athletic merit credits and university sports sponsorships

Trial Structure:
• Standard physical conditioning assessments (shuttle runs, 40m sprint timing, beep test)
• Technical drills: passing under pressure, receiving in tight spaces, crossing and aerial duels
• Small-sided positional scrimmages (5v5 and 7v7) evaluated by VTU certified coaches
• Full 11v11 match play for shortlisted contenders
• +5 AICTE Activity Points under Sports & Athletics category

Gear Requirements: Football boots with molded/metal studs suitable for grass/turf, mandatory shin guards, and athletic jerseys. Water stations and campus first-aid paramedics are stationed on-site.`,
  bannerUrl:
    "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80",
  clubName: "Sports Committee",
  clubLogoUrl: "/logos/rvce_logo_blush.png",
  category: "Sports",
  dateTime: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString(), // 9 days from now
  timezone: "IST",
  venue: "College Ground, RVCE Campus",
  registrationState: "open",
  fee: 0,
  aictePoints: 5,
  capacity: 60,
  registeredCount: 54, // Fast filling (>85%)
  agenda: [
    {
      time: "06:00 PM",
      title: "Reporting & Kit Inspection",
      description: "College ID check, bib allocation, and equipment verification at Field House.",
    },
    {
      time: "06:20 PM",
      title: "Warm-up & Agility Battery",
      speaker: "Coach Rajesh Kumar",
      description: "Dynamic stretching, sprint acceleration, and change-of-direction testing.",
    },
    {
      time: "07:00 PM",
      title: "Positional Technical Circuits",
      description: "Ball mastery, passing accuracy grids, and 1v1 defensive/offensive scenarios.",
    },
    {
      time: "07:45 PM",
      title: "Match Scrimmages & Tactical Assessment",
      description: "Full-pitch match situations evaluated by sports committee selectors.",
    },
    {
      time: "09:00 PM",
      title: "Cool-down, Debrief & Shortlist Announcement",
      description: "Recovery stretches, trial feedback, and first-cut squad declaration.",
    },
  ],
  organizer: {
    clubName: "Sports Committee",
    contactName: "Prof. Vinay Kumar (Physical Director)",
    email: "sports@rvce.edu.in",
    instagramUrl: "https://instagram.com/rvce_sports",
    websiteUrl: "https://rvce.edu.in/sports",
  },
  tags: ["sports", "football", "vtu", "athletics", "trials"],
};

/** 4. Cultural Fest Finale — Card 4 in screenshots (Cultural, Sold Out) */
export const culturalFestFinale: EventDetail = {
  slug: "cultural-fest-finale",
  title: "Cultural Fest Finale",
  description: `The grand stage finale of 8th Mile — RVCE's flagship annual inter-collegiate cultural festival!

Under the stars at RVCE's iconic Open Air Theatre, witness the most anticipated night of the campus calendar. Over three grueling days of preliminary rounds, more than 2,000 collegiate artists competed across 35 disciplines in music, dance, theater, literature, and visual art. Tonight, the championship trophies find their rightful homes.

Evening Program:
• Final Showcase: Top 3 finalists in the Western Acoustic Band Championship
• High-energy Classical & Contemporary Choreography Showdown
• Runway Haute Couture: The 8th Mile Fashion Extravaganza
• Live Headline Performance by nationally acclaimed indie rock ensemble
• Valedictory Ceremony & Overall Championship Trophy presentation
• +5 AICTE Activity Points for registered student attendees

Registration Notice:
This event has reached full capacity (500/500 reserved seats). Online registrations are officially closed. Entry to the venue is strictly limited to confirmed digital pass holders with valid college ID cards.`,
  bannerUrl:
    "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
  clubName: "Cultural Committee",
  clubLogoUrl: "/logos/rvce_logo_blush.png",
  category: "Cultural",
  dateTime: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days from now
  timezone: "IST",
  venue: "Open Air Theatre, RVCE Campus",
  registrationState: "sold_out",
  fee: 0,
  aictePoints: 5,
  capacity: 500,
  registeredCount: 500, // Sold out
  agenda: [
    {
      time: "06:00 PM",
      title: "Gates Open & Seating",
      description: "Digital pass scanning and auditorium seating allocation.",
    },
    {
      time: "06:30 PM",
      title: "Choreography Championship Showcase",
      description: "Top 3 university dance crews deliver their final 12-minute routines.",
    },
    {
      time: "07:30 PM",
      title: "Battle of the Bands: Final Showdown",
      description: "Finalist bands perform original tracks and crowd anthems.",
    },
    {
      time: "08:45 PM",
      title: "Awards & Overall Championship Trophy",
      speaker: "Cultural Committee Patron & Celebrity Guest",
      description: "Distribution of awards, trophies, and felicitations.",
    },
    {
      time: "09:30 PM",
      title: "Headlining Live Concert & Musical Night",
      description: "90-minute live concert to conclude the annual 8th Mile festival.",
    },
  ],
  organizer: {
    clubName: "Cultural Committee",
    contactName: "Ananya Sharma",
    email: "cultural@rvce.edu.in",
    instagramUrl: "https://instagram.com/rvce_cultural",
    websiteUrl: "https://rvce.edu.in/cultural",
  },
  tags: ["cultural", "8th-mile", "music", "dance", "fest", "concert"],
};

/** 5. Cybersecurity Masterclass — Card 5 in screenshots (Paid Technical) */
export const cybersecurityMasterclass: EventDetail = {
  slug: "cybersecurity-masterclass",
  title: "Cybersecurity Masterclass",
  description: `Defensive engineering, vulnerability exploitation & network forensics hands-on lab.

Step into the world of offensive and defensive information security with Coding Club RVCE's Cybersecurity Masterclass. Taught by certified ethical hackers and alumni security engineers, this 4-hour hands-on session covers practical vulnerability research and system hardening.

Syllabus Highlights:
• Web Application Security: In-depth exploration of OWASP Top 10 vulnerabilities (SQLi, SSRF, IDOR, XSS)
• Modern network sniffing, packet analysis, and Wireshark forensics
• API security flaws in REST and GraphQL microservices
• Container breakout mechanics and Kubernetes pod security standards
• Fast-paced live Capture The Flag (CTF) tournament with cash rewards
• +15 AICTE Activity Points officially accredited

Requirements: Laptop with minimum 8GB RAM, Kali Linux VM or Docker installed. High-speed isolated lab network provided.`,
  bannerUrl:
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
  clubName: "Coding Club RVCE",
  clubLogoUrl: "/logos/coding_club_logo_blush.png",
  category: "Technical",
  dateTime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
  timezone: "IST",
  venue: "Lab 5, Computer Science Block",
  registrationState: "open",
  fee: 100,
  aictePoints: 15,
  capacity: 80,
  registeredCount: 38,
  agenda: [
    {
      time: "03:00 PM",
      title: "Modern Attack Vectors & Threat Landscapes",
      speaker: "Security Research Team",
      description: "Understanding MITRE ATT&CK matrix and recent enterprise breach analyses.",
    },
    {
      time: "04:00 PM",
      title: "Hands-on Lab: OWASP Vulnerability Exploitation & Remediation",
      description: "Interactive vulnerable targets lab using Burp Suite and custom test harnesses.",
    },
    {
      time: "05:15 PM",
      title: "Network Forensics & Packet Dissection",
      description: "Analyzing packet captures to identify command & control channels.",
    },
    {
      time: "06:15 PM",
      title: "Live Mini-CTF & Certifications",
      description: "30-minute competitive hacking challenge and certification issuance.",
    },
  ],
  organizer: {
    clubName: "Coding Club RVCE",
    contactName: "Rohan Varma",
    email: "codingclub@rvce.edu.in",
    instagramUrl: "https://instagram.com/codingclubrvce",
    linkedinUrl: "https://linkedin.com/company/codingclubrvce",
    websiteUrl: "https://codingclubrvce.com",
  },
  tags: ["security", "cybersecurity", "hacking", "ctf", "owasp"],
};

/** 6. Photography Contest — Card 6 in screenshots (Past / Concluded Event) */
export const photographyContest: EventDetail = {
  slug: "photography-contest",
  title: "Photography Contest",
  description: `Through the Lens: Capturing campus culture, architectural symmetry, and vivid motion.

The annual RVCE Media Club Photography Contest brought together visual artists, mobile photographers, and DSLR hobbyists from every academic semester.

Event Summary:
This event has concluded. Over 300 stunning photographic submissions were received across three creative categories:
• Architectural Geometry: The interplay of concrete, shadows, and brutalist lines of the RVCE campus
• Student Life & Emotion: Unscripted moments across collegiate festivals, sporting grounds, and late-night labs
• Minimalist Monochrome: High-contrast black-and-white compositions

The top 25 curated prints are currently on public display at the Central Library Exhibition Hall through the end of the month. All registered student participants have been awarded their +8 AICTE Activity Points.`,
  bannerUrl:
    "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=1200&q=80",
  clubName: "Media Club RVCE",
  clubLogoUrl: "/logos/rvce_logo_blush.png",
  category: "Cultural",
  dateTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago (past)
  timezone: "IST",
  venue: "Campus Grounds & Media Studio",
  registrationState: "past",
  fee: 0,
  aictePoints: 8,
  capacity: 120,
  registeredCount: 120,
  agenda: [
    {
      time: "10:00 AM",
      title: "Orientation & Theme Unveiling (Concluded)",
      description: "Introduction to category rules and ethical photography guidelines.",
    },
    {
      time: "11:00 AM",
      title: "Campus Photowalk & Capture Session (Concluded)",
      description: "Coordinated photowalk across architectural spots and gardens.",
    },
    {
      time: "03:00 PM",
      title: "Submission Deadline & Metadata Curation (Concluded)",
      description: "High-resolution RAW/JPEG submissions processed for jury screening.",
    },
    {
      time: "05:00 PM",
      title: "Jury Critique, Gallery Display & Prize Ceremony (Concluded)",
      speaker: "Senior Photojournalists Panel",
      description: "Evaluation and awarding of the Best Campus Photograph 2026.",
    },
  ],
  organizer: {
    clubName: "Media Club RVCE",
    contactName: "Tanvi Hegde",
    email: "mediaclub@rvce.edu.in",
    instagramUrl: "https://instagram.com/rvce_mediaclub",
    websiteUrl: "https://rvce.edu.in/media-club",
  },
  tags: ["photography", "media", "art", "creative", "campus-life"],
};

/**
 * Backward-compatible aliases mapped to the 4 core lifecycle state fixtures
 * mandated by Issue #29 and AGENTS.md:
 *   1. upcomingOpenEvent  -> aimlHackathon (Open, upcoming, countdown timer active)
 *   2. paidHackathon      -> webDevBootcamp (Paid event, ₹150 fee, payment notice)
 *   3. soldOutWorkshop    -> culturalFestFinale (Sold out, full capacity, disabled CTA)
 *   4. pastConference     -> photographyContest (Past, concluded event, muted styling)
 */
export const upcomingOpenEvent = aimlHackathon;
export const paidHackathon = webDevBootcamp;
export const soldOutWorkshop = culturalFestFinale;
export const pastConference = photographyContest;

/** Dictionary of all mock events keyed by their URL slug */
export const MOCK_EVENTS: Record<string, EventDetail> = {
  [aimlHackathon.slug]: aimlHackathon,
  [webDevBootcamp.slug]: webDevBootcamp,
  [footballLeagueTrials.slug]: footballLeagueTrials,
  [culturalFestFinale.slug]: culturalFestFinale,
  [cybersecurityMasterclass.slug]: cybersecurityMasterclass,
  [photographyContest.slug]: photographyContest,
};

/** Array of all mock events */
export const ALL_MOCK_EVENTS: EventDetail[] = Object.values(MOCK_EVENTS);
