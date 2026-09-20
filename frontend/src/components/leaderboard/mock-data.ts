export type LeaderboardDepartment =
  | "CSE"
  | "ISE"
  | "ECE"
  | "EEE"
  | "MECH"
  | "CV"
  | "AIML";

export interface StudentLeaderboardRecord {
  rank: number;
  name: string;
  usn: string;
  department: LeaderboardDepartment;
  points: number;
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
  },
  {
    rank: 2,
    name: "Vikram Rao",
    usn: "1RV22IS031",
    department: "ISE",
    points: 88,
  },
  {
    rank: 3,
    name: "Meera Kulkarni",
    usn: "1RV23EC014",
    department: "ECE",
    points: 84,
  },
  {
    rank: 4,
    name: "Karthik Menon",
    usn: "1RV21ME078",
    department: "MECH",
    points: 79,
  },
  {
    rank: 5,
    name: "Rhea D'Souza",
    usn: "1RV22AI019",
    department: "AIML",
    points: 76,
  },
  {
    rank: 6,
    name: "Arjun Prakash",
    usn: "1RV23CS112",
    department: "CSE",
    points: 72,
  },
  {
    rank: 7,
    name: "Nidhi Bhat",
    usn: "1RV22EE026",
    department: "EEE",
    points: 69,
  },
  {
    rank: 8,
    name: "Samar Khan",
    usn: "1RV21CV052",
    department: "CV",
    points: 65,
  },
  {
    rank: 9,
    name: "Ishita Nair",
    usn: "1RV23IS067",
    department: "ISE",
    points: 61,
  },
  {
    rank: 10,
    name: "Dev Patel",
    usn: "1RV22EC089",
    department: "ECE",
    points: 57,
  },
  {
    rank: 11,
    name: "Pooja Hegde",
    usn: "1RV23ME043",
    department: "MECH",
    points: 52,
  },
  {
    rank: 12,
    name: "Rahul Shetty",
    usn: "1RV22EE104",
    department: "EEE",
    points: 48,
  },
  {
    rank: 13,
    name: "Saanvi Ramesh",
    usn: "1RV23AI074",
    department: "AIML",
    points: 43,
  },
  {
    rank: 14,
    name: "Neil George",
    usn: "1RV21CV088",
    department: "CV",
    points: 39,
  },
  {
    rank: 15,
    name: "Tanvi Sinha",
    usn: "1RV22CS129",
    department: "CSE",
    points: 34,
  },
];
