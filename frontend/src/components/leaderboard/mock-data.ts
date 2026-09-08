export type LeaderboardDepartment =
  | "CSE"
  | "ISE"
  | "ECE"
  | "EEE"
  | "MECH"
  | "CV"
  | "AIML";

export type ActivityCategory =
  | "Hackathons"
  | "Workshops"
  | "Sports"
  | "Cultural"
  | "NSS"
  | "Innovation";

export interface StudentLeaderboardRecord {
  rank: number;
  name: string;
  usn: string;
  department: LeaderboardDepartment;
  points: number;
  events: number;
  badges: string[];
  categories: Partial<Record<ActivityCategory, number>>;
}

export const departments: Array<"All" | LeaderboardDepartment> = [
  "All",
  "CSE",
  "ISE",
  "ECE",
  "EEE",
  "MECH",
  "CV",
  "AIML",
];

export const leaderboardStudents: StudentLeaderboardRecord[] = [
  {
    rank: 1,
    name: "Ananya Sharma",
    usn: "1RV22CS045",
    department: "CSE",
    points: 95,
    events: 18,
    badges: ["Hackathon Ace", "Social Sprint"],
    categories: { Hackathons: 40, Workshops: 20, NSS: 20, Innovation: 15 },
  },
  {
    rank: 2,
    name: "Vikram Rao",
    usn: "1RV22IS031",
    department: "ISE",
    points: 88,
    events: 16,
    badges: ["Innovation Lead", "Workshop Pro"],
    categories: { Innovation: 35, Workshops: 25, Hackathons: 20, Cultural: 8 },
  },
  {
    rank: 3,
    name: "Meera Kulkarni",
    usn: "1RV23EC014",
    department: "ECE",
    points: 84,
    events: 15,
    badges: ["Circuit Champ", "NSS Star"],
    categories: { Workshops: 25, Innovation: 24, NSS: 20, Hackathons: 15 },
  },
  {
    rank: 4,
    name: "Karthik Menon",
    usn: "1RV21ME078",
    department: "MECH",
    points: 79,
    events: 14,
    badges: ["Sports Captain"],
    categories: { Sports: 35, Workshops: 18, Cultural: 14, NSS: 12 },
  },
  {
    rank: 5,
    name: "Rhea D'Souza",
    usn: "1RV22AI019",
    department: "AIML",
    points: 76,
    events: 13,
    badges: ["AI Builder"],
    categories: { Hackathons: 32, Innovation: 22, Workshops: 14, NSS: 8 },
  },
  {
    rank: 6,
    name: "Arjun Prakash",
    usn: "1RV23CS112",
    department: "CSE",
    points: 72,
    events: 12,
    badges: ["Open Source"],
    categories: { Hackathons: 24, Workshops: 22, Innovation: 16, NSS: 10 },
  },
  {
    rank: 7,
    name: "Nidhi Bhat",
    usn: "1RV22EE026",
    department: "EEE",
    points: 69,
    events: 11,
    badges: ["Energy Innovator"],
    categories: { Innovation: 24, Workshops: 20, NSS: 15, Cultural: 10 },
  },
  {
    rank: 8,
    name: "Samar Khan",
    usn: "1RV21CV052",
    department: "CV",
    points: 65,
    events: 10,
    badges: ["Outreach Lead"],
    categories: { NSS: 28, Workshops: 17, Sports: 12, Cultural: 8 },
  },
  {
    rank: 9,
    name: "Ishita Nair",
    usn: "1RV23IS067",
    department: "ISE",
    points: 61,
    events: 9,
    badges: ["Data Quest"],
    categories: { Hackathons: 22, Workshops: 19, Innovation: 12, Cultural: 8 },
  },
  {
    rank: 10,
    name: "Dev Patel",
    usn: "1RV22EC089",
    department: "ECE",
    points: 57,
    events: 9,
    badges: ["Signal Sprint"],
    categories: { Workshops: 20, Hackathons: 18, Sports: 11, NSS: 8 },
  },
  {
    rank: 11,
    name: "Pooja Hegde",
    usn: "1RV23ME043",
    department: "MECH",
    points: 52,
    events: 8,
    badges: ["Cultural Core"],
    categories: { Cultural: 24, Sports: 12, Workshops: 10, NSS: 6 },
  },
  {
    rank: 12,
    name: "Rahul Shetty",
    usn: "1RV22EE104",
    department: "EEE",
    points: 48,
    events: 7,
    badges: ["Volunteer"],
    categories: { NSS: 18, Workshops: 16, Innovation: 8, Sports: 6 },
  },
  {
    rank: 13,
    name: "Saanvi Ramesh",
    usn: "1RV23AI074",
    department: "AIML",
    points: 43,
    events: 7,
    badges: ["Rising Builder"],
    categories: { Hackathons: 18, Workshops: 12, Innovation: 9, Cultural: 4 },
  },
  {
    rank: 14,
    name: "Neil George",
    usn: "1RV21CV088",
    department: "CV",
    points: 39,
    events: 6,
    badges: ["Field Crew"],
    categories: { NSS: 16, Sports: 10, Workshops: 8, Cultural: 5 },
  },
  {
    rank: 15,
    name: "Tanvi Sinha",
    usn: "1RV22CS129",
    department: "CSE",
    points: 34,
    events: 5,
    badges: ["Starter Streak"],
    categories: { Workshops: 14, Hackathons: 10, NSS: 6, Cultural: 4 },
  },
];

