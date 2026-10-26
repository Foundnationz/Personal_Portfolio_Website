// Runtime configuration and original reference data.
// Independently editable visible section text lives directly in the JSX components,
// not in shared array templates. Keep the placeholder notices until content is verified.

export type IconKey = "ledger" | "code" | "people";
export type ArtKind = "ledger" | "grid" | "document" | "flow";

export interface Project {
  id: string;
  title: string;
  category: string;
  summary: string;
  art: ArtKind;
  overview: string;
  role: string;
  tools: string[];
  highlights: string[];
  isExample: boolean;
}

export const profile = {
  name: "Shawn Stephen Abok",
  greeting: "Hi There, I'm",
  headline: "Final-year Financial Technology Student",
  role: "Bachelor of Financial Technology (Honours) Student",
  university: "UCSI University",
  intro:
    "Seeking a finance internship where I can pair a financial technology education with careful, curious work.",
  // Set a real URL to enable the LinkedIn link. Empty means "not configured yet".
  linkedinUrl: "",
  // Set a real URL/path to a PDF to enable the resume. Empty means "not added yet".
  resumeUrl: "",
  logo: "/images/shawn-logo.png",
  portrait: "/images/shawn-portrait.jpg",
};

export const about = {
  bio: [
    "I am a final-year Bachelor of Financial Technology (Honours) student at UCSI University, studying where finance meets technology.",
    "I am looking for a finance internship to learn how teams work with real numbers, processes and clients. (Example sentence: replace with your own story and interests.)",
  ],
  email: "your.email@example.com",
  location: "Kuala Lumpur, Malaysia",
  metaIsExample: true,
};

export const skills: {
  icon: IconKey;
  title: string;
  description: string;
  tags: string[];
}[] = [
  {
    icon: "ledger",
    title: "Finance Foundations",
    description: "Example: core finance topics you have studied. Replace with your own.",
    tags: ["Financial Accounting", "Corporate Finance", "Financial Markets", "Risk Basics"],
  },
  {
    icon: "code",
    title: "Technical Tools",
    description: "Example: tools you use for analysis and building. Replace with your own.",
    tags: ["Excel", "Python", "SQL", "Data Analysis"],
  },
  {
    icon: "people",
    title: "Professional Skills",
    description: "Example: working style strengths. Replace with your own.",
    tags: ["Communication", "Teamwork", "Attention to Detail", "Time Management"],
  },
];

export const education = [
  {
    school: "UCSI University (Kuala Lumpur Campus)",
    image: "images/ucsi-university.jpg",
    imageAlt: "UCSI University campus building and entrance",
    degree: "Bachelor of Financial Technology (Honours)",
    period: "Final year",
    note: "Currently in the final year of the programme.",
    isExample: false,
  },
  {
    school: "Example: Previous Institution",
    image: "images/sunway-college.jpg",
    imageAlt: "Sunway College campus building and courtyard",
    degree: "Example: Pre-university qualification",
    period: "Example: Year - Year",
    note: "Placeholder entry. Replace with your pre-university studies and results.",
    isExample: true,
  },
];

export const projects: Project[] = [
  {
    id: "ledger-reconciliation",
    title: "Ledger Reconciliation Walkthrough",
    category: "Accounting Workflow",
    summary: "Example project: matching entries between two sample ledgers.",
    art: "ledger",
    overview:
      "A sample write-up showing how a project would be described: the problem, the approach and what was learned. Replace with a real coursework or personal project.",
    role: "Example: Individual project",
    tools: ["Excel", "Sample dataset"],
    highlights: ["Example: defined the matching rules", "Example: documented exceptions", "Example: reflected on controls"],
    isExample: true,
  },
  {
    id: "payments-journey",
    title: "Digital Payments Journey Map",
    category: "FinTech Research",
    summary: "Example project: mapping the steps of a customer payment.",
    art: "flow",
    overview:
      "A sample overview of a research-style project mapping how a payment moves between parties. Replace with a real project description.",
    role: "Example: Group project",
    tools: ["Presentation", "Desk research"],
    highlights: ["Example: mapped each party", "Example: noted risk points", "Example: presented findings"],
    isExample: true,
  },
  {
    id: "budget-model",
    title: "Personal Budget Model",
    category: "Spreadsheet Modelling",
    summary: "Example project: a structured monthly budget template.",
    art: "grid",
    overview:
      "A sample project card for a spreadsheet model with clear inputs and assumptions. All figures would be sample data. Replace with your own.",
    role: "Example: Personal project",
    tools: ["Excel"],
    highlights: ["Example: separated inputs from outputs", "Example: documented assumptions"],
    isExample: true,
  },
  {
    id: "case-brief",
    title: "Company Case Brief",
    category: "Financial Analysis",
    summary: "Example project: a short written brief on a company case.",
    art: "document",
    overview:
      "A sample brief format: context, key questions, findings and recommendation. Replace with a real piece of coursework.",
    role: "Example: Coursework",
    tools: ["Word", "Public filings"],
    highlights: ["Example: summarised the context", "Example: raised key questions"],
    isExample: true,
  },
];

export const featuredProjectIds = ["ledger-reconciliation", "payments-journey"];

export const experience = [
  {
    title: "Example: Finance Intern",
    org: "Example Organisation",
    period: "Example: Month Year - Month Year",
    points: ["Placeholder: describe a task you supported.", "Placeholder: note a tool or process you learned."],
  },
  {
    title: "Example: Student Society Role",
    org: "Example Society",
    period: "Example: Year - Year",
    points: ["Placeholder: describe your responsibility.", "Placeholder: describe the outcome."],
  },
  {
    title: "Example: Part-time or Volunteer Role",
    org: "Example Organisation",
    period: "Example: Year - Year",
    points: ["Placeholder: describe what you did.", "Placeholder: describe what you learned."],
  },
];

export const contact = {
  email: "your.email@example.com",
  connect: "LinkedIn link not configured yet",
  location: "Kuala Lumpur, Malaysia",
  isExample: true,
};

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];
