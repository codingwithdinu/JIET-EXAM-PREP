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

const sampleSubjects: Subject[] = [
  {
    slug: "design-analysis-algorithms",
    code: "DAA",
    name: "Design & Analysis of Algorithms",
    shortName: "Design & Analysis of Algorithms",
    description: "Algorithms, complexity, greedy methods, dynamic programming, backtracking and graph algorithms.",
    units: 5,
    resources: defaultResources,
  },
  {
    slug: "digital-image-processing",
    code: "DIP",
    name: "Digital Image Processing",
    shortName: "Digital Image Processing",
    description: "Image fundamentals, enhancement, filtering, transforms, restoration and image analysis.",
    units: 5,
    resources: defaultResources,
  },
  {
    slug: "applied-machine-learning",
    code: "AML",
    name: "Applied Machine Learning",
    shortName: "Applied Machine Learning",
    description: "Feature engineering, dimensionality reduction, model evaluation and statistical learning methods.",
    units: 5,
    resources: defaultResources,
  },
  {
    slug: "compiler-design",
    code: "CD",
    name: "Compiler Design",
    shortName: "Compiler Design",
    description: "Lexical analysis, finite automata, parsing, syntax-directed translation and compiler phases.",
    units: 5,
    resources: defaultResources,
  },
];

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

branchSubjects["cse-aiml"][5] = sampleSubjects;
branchSubjects["cse-cs"][5] = sampleSubjects.filter((s) => ["DAA", "CD"].includes(s.code));
branchSubjects["cse-ds"][5] = sampleSubjects.filter((s) => ["DAA", "AML"].includes(s.code));

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
