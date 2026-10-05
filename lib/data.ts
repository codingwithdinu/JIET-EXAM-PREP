export type ResourceType = "Notes" | "Lab Notes" | "Important Questions" | "PYQs";

export type Branch = {
  slug: string;
  code: string;
  name: string;
};

export type Subject = {
  slug: string;
  code: string;
  name: string;
  shortName: string;
  description: string;
  units: number;
  resources: ResourceType[];
  kind: "theory" | "lab" | "other";
};

export const semesters = [
  { number: 1, title: "Semester 1", description: "Common first-semester foundation subjects." },
  { number: 2, title: "Semester 2", description: "Common second-semester engineering and foundation subjects." },
  { number: 3, title: "Semester 3", description: "Choose your branch to access your subjects and study resources." },
  { number: 4, title: "Semester 4", description: "Choose your branch to access your subjects and study resources." },
  { number: 5, title: "Semester 5", description: "Choose your branch to access your subjects and study resources." },
  { number: 6, title: "Semester 6", description: "Choose your branch to access your subjects and study resources." },
  { number: 7, title: "Semester 7", description: "Choose your branch to access your subjects and study resources." },
  { number: 8, title: "Semester 8", description: "Choose your branch to access your subjects and study resources." },
];

export const branches: Branch[] = [
  { slug: "cse-aiml", code: "CSE-AIML", name: "CSE – Artificial Intelligence & Machine Learning" },
  { slug: "cse-cs", code: "CSE-CS", name: "CSE – Computer Science" },
  { slug: "cse-ds", code: "CSE-DS", name: "CSE – Data Science" },
  { slug: "ee", code: "EE", name: "Electrical Engineering" },
  { slug: "ece", code: "ECE", name: "Electronics & Communication Engineering" },
  { slug: "civil", code: "CIVIL", name: "Civil Engineering" },
  { slug: "mechanical", code: "ME", name: "Mechanical Engineering" },
  { slug: "it", code: "IT", name: "Information Technology" },
];

const defaultResources: ResourceType[] = ["Notes", "Lab Notes", "Important Questions", "PYQs"];

function makeSubject(code: string, name: string, kind: Subject["kind"], description: string): Subject {
  return {
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    code, name, shortName: name, description,
    units: kind === "lab" ? 0 : 5, kind, resources: defaultResources,
  };
}

const cseSemesters: Record<number, Subject[]> = {
  3: [
    makeSubject("BCSCCS3101", "Theory of Computation", "theory", "Major core theory course."),
    makeSubject("BCSCCS3102", "Data Structures and Algorithms", "theory", "Major core theory course."),
    makeSubject("BCSCCS3103", "Operating System", "theory", "Major core theory course."),
    makeSubject("BCSCCS3201", "Web Technology Lab", "lab", "Major core practical course."),
    makeSubject("BCSCCS3202", "Data Structures and Algorithms Lab", "lab", "Major core practical course."),
    makeSubject("BCSCCS3203", "Linux Operating System Lab", "lab", "Major core practical course."),
    makeSubject("BCSCCS3204", "Office Automation Lab", "lab", "Major core practical course."),
    makeSubject("BCSECS3111/BCSECS3112", "Software Engineering / Cyber Criminal Law & IPR", "theory", "Minor stream / department elective options."),
    makeSubject("BCSECS3121-BCSECS3125", "Introduction to Web Technology / Statistical Foundation Of Data Science / Analytics Programming Fundamental / Installation & Configuration Server / Introduction To UI/UX", "theory", "Minor stream / department elective options."),
    makeSubject("BCSEMO3131", "MOOC Course-II", "other", "Multidisciplinary course."),
    makeSubject("BCSEAE3211", "Communication Skills-I", "other", "Ability Enhancement Course."),
    makeSubject("BCSCSE3206", "Skill Enhancement Generic Course-III", "other", "Skill Enhancement Course."),
    makeSubject("BCSCVA3141-3150", "Digital Marketing", "other", "Value Added Course."),
    makeSubject("BCSCIP3501", "Industrial Training Seminar-I", "other", "Industrial training / seminar component."),
  ],
  4: [
    makeSubject("BCSCCS4101", "Computer Networks", "theory", "Major core theory course."),
    makeSubject("BCSCCS4102", "OOPS With Java", "theory", "Major core theory course."),
    makeSubject("BCSCCS4103", "Relational Database Management System", "theory", "Major core theory course."),
    makeSubject("BCSCCS4104", "Advance Data Structure", "theory", "Major core theory course."),
    makeSubject("BCSCCS4201", "Computer Networks Lab", "lab", "Major core practical course."),
    makeSubject("BCSCCS4202", "OOPS With Java Lab", "lab", "Major core practical course."),
    makeSubject("BCSCCS4203", "Relational Database Management System Lab", "lab", "Major core practical course."),
    makeSubject("BCSECS4111/BCSECS4112", "Computer Graphics / Digital Image Processing", "theory", "Minor stream / department elective options."),
    makeSubject("BCSECS4211/BCSECS4212", "Computer Graphics Lab / DIP Lab", "lab", "Minor stream / department elective practical options."),
    makeSubject("BCSEMO4121", "MOOC Course-III", "other", "Multidisciplinary course."),
    makeSubject("BCSEAE4221", "Communication Skills-II", "other", "Ability Enhancement Course."),
    makeSubject("BCSCSE4222", "Skill Enhancement Generic Course-IV", "other", "Skill Enhancement Course."),
    makeSubject("BCSEVC4122", "Cybersecurity", "other", "Value Added Course."),
  ],
  5: [
    makeSubject("BCSCCS5101", "Design & Analysis of Algorithms", "theory", "Major core theory course."),
    makeSubject("BCSCCS5102", "Compiler Design", "theory", "Major core theory course."),
    makeSubject("BCSCCS5103", "Computer Architecture", "theory", "Major core theory course."),
    makeSubject("BCSCCS5201", "Design & Analysis of Algorithms Lab", "lab", "Major core practical course."),
    makeSubject("BCSCCS5202", "Compiler Design Lab", "lab", "Major core practical course."),
    makeSubject("BCSCCS5203", "Data Handling & Visualization Lab", "lab", "Major core practical course."),
    makeSubject("BCSECS5111/BCSECS5112", "Introduction to AI & Machine Learning / Ethical Hacking", "theory", "Minor stream / department elective options."),
    makeSubject("BCSECS5121/BCSECS5122", "JavaScript Programming for Web Applications / Advance Java", "theory", "Minor stream / department elective options."),
    makeSubject("BCSECS5211/BCSECS5212", "Machine Learning Lab / Ethical Hacking Lab", "lab", "Minor stream / department elective practical options."),
    makeSubject("BCSECS5221/BCSECS5222", "JavaScript Programming Lab / Advance Java Lab", "lab", "Minor stream / department elective practical options."),
    makeSubject("BCSEMO5131", "MOOC Course-IV", "other", "Multidisciplinary course."),
    makeSubject("BCSEAE5231", "Professional Skills-I", "other", "Ability Enhancement Course."),
    makeSubject("BCSESE5232", "Skill Enhancement Generic Course-V", "other", "Skill Enhancement Course."),
    makeSubject("BCSCIP5204", "Industrial Training Seminar-II", "other", "Industrial training / seminar component."),
  ],
  6: [
    makeSubject("BCSCCS6101", "Big Data Analytics", "theory", "Major core theory course."),
    makeSubject("BCSCCS6102", "Information System Security", "theory", "Major core theory course."),
    makeSubject("BCSCCS6103", "Cloud Computing & Virtualization", "theory", "Major core theory course."),
    makeSubject("BCSCCS6201", "Big Data Analytics Lab", "lab", "Major core practical course."),
    makeSubject("BCSCCS6202", "Cloud Computing Lab", "lab", "Major core practical course."),
    makeSubject("BCSECS6111/BCSECS6112", "Deep Learning / Software Testing", "theory", "Minor stream / department elective options."),
    makeSubject("BCSECS6121/BCSECS6122", "Advanced Web Technologies / Mobile Application Development", "theory", "Minor stream / department elective options."),
    makeSubject("BCSECS6211/BCSECS6212", "Deep Learning Lab / Software Testing Lab", "lab", "Minor stream / department elective practical options."),
    makeSubject("BCSECS6221/BCSECS6222", "Advanced Web Technology Lab / Mobile Application Development Lab", "lab", "Minor stream / department elective practical options."),
    makeSubject("BCSEMO5131", "MOOC Course-V", "other", "Multidisciplinary course."),
    makeSubject("BCSEAE6231", "Professional Skills-II", "other", "Ability Enhancement Course."),
    makeSubject("BCSESE6232", "Skill Enhancement Generic Course-VI", "other", "Skill Enhancement Course."),
  ],
  7: [], 8: [],
};

const commonSubjects: Record<number, Subject[]> = {
  1: [],
  2: [],
};

const branchSubjects: Record<string, Record<number, Subject[]>> = {};

for (const branch of branches) {
  branchSubjects[branch.slug] = {};
  for (let semester = 3; semester <= 8; semester++) {
    branchSubjects[branch.slug][semester] = [];
  }
}

for (const semester of [3, 4, 5, 6]) {
  branchSubjects["cse-cs"][semester] = cseSemesters[semester];
}

export function getBranches() {
  return branches;
}

export function getSubjects(semester: number, branch?: string) {
  if (semester <= 2) return commonSubjects[semester] ?? [];
  if (!branch) return [];
  return branchSubjects[branch]?.[semester] ?? [];
}

export function getSubject(semester: number, branch: string | undefined, slug: string) {
  return getSubjects(semester, branch).find((subject) => subject.slug === slug);
}
