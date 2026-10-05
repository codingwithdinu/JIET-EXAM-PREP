export type ResourceType = "Notes" | "Lab Notes" | "Important Questions" | "PYQs";

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
  { number: 1, title: "Semester 1", description: "Foundation subjects and engineering basics." },
  { number: 2, title: "Semester 2", description: "Core programming, mathematics and engineering concepts." },
  { number: 3, title: "Semester 3", description: "Core computer science and analytical subjects." },
  { number: 4, title: "Semester 4", description: "Advanced programming and computer science foundations." },
  { number: 5, title: "Semester 5", description: "AI/ML and core CS subjects focused on exam preparation." },
  { number: 6, title: "Semester 6", description: "Advanced subjects, electives and practical preparation." },
  { number: 7, title: "Semester 7", description: "Advanced electives, projects and placement-focused study." },
  { number: 8, title: "Semester 8", description: "Final semester subjects, project and revision." },
];

const defaultResources: ResourceType[] = ["Notes", "Lab Notes", "Important Questions", "PYQs"];

export const subjectsBySemester: Record<number, Subject[]> = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: [
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
  ],
  6: [],
  7: [],
  8: [],
};

export function getSubjects(semester: number) {
  return subjectsBySemester[semester] ?? [];
}

export function getSubject(semester: number, slug: string) {
  return getSubjects(semester).find((subject) => subject.slug === slug);
}
