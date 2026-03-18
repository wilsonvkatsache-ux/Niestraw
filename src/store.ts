import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CVData {
  name: string;
  degree: string;
  studentId: string;
  contact: {
    phone: string;
    email: string;
    location: string;
    linkedin: string;
  };
  personal: {
    born: string;
    gender: string;
    nationality: string;
  };
  languages: string[];
  skills: string[];
  digitalSkills: string[];
  summary: string;
  objective: string;
  modules: string[];
  keySkills: string[];
  professionalSkills: string[];
  experience: Array<{
    id: string;
    role: string;
    org: string;
    dates: string;
    bullets: string[];
  }>;
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    year: string;
    details?: string;
  }>;
  achievements: string[];
  references: Array<{
    id: string;
    name: string;
    title: string;
    contact: string;
  }>;
  templateId: string;
}

interface CVStore {
  data: CVData;
  updateField: (path: string, value: any) => void;
  updateTemplate: (id: string) => void;
  addItem: (collection: 'experience' | 'education' | 'references') => void;
  removeItem: (collection: 'experience' | 'education' | 'references', id: string) => void;
  updateItem: (collection: 'experience' | 'education' | 'references', id: string, value: any) => void;
  addListValue: (collection: 'languages' | 'skills' | 'digitalSkills' | 'modules' | 'keySkills' | 'professionalSkills' | 'achievements', value: string) => void;
  removeListValue: (collection: 'languages' | 'skills' | 'digitalSkills' | 'modules' | 'keySkills' | 'professionalSkills' | 'achievements', index: number) => void;
  addBullet: (expId: string, bullet: string) => void;
  removeBullet: (expId: string, index: number) => void;
  resetData: () => void;
}

const initialData: CVData = {
  name: "THANDIWE MWALE PHIRI",
  degree: "BACHELOR OF SCIENCE IN PROJECT MANAGEMENT",
  studentId: "OHSC-58720",
  contact: {
    phone: "+265 991 234 567",
    email: "thandiwe.phiri@email.com",
    location: "Area 47, Lilongwe, Malawi",
    linkedin: "linkedin.com/in/thandiwephiri",
  },
  personal: {
    born: "12 March 1998",
    gender: "Female",
    nationality: "Malawian",
  },
  languages: ["English (Fluent)", "Chichewa (Native)", "Tumbuka (Conversational)"],
  skills: ["Project Planning & Scheduling", "Risk Identification & Mitigation", "Budgeting & Cost Control", "Team Leadership"],
  digitalSkills: ["Microsoft Project", "Excel (Advanced)", "Trello / Asana", "SAP ERP"],
  summary: "A highly motivated and detail-oriented Project Management professional with a strong foundation in planning, executing, and monitoring projects. Proven ability to lead cross-functional teams and deliver results within scope and budget.",
  objective: "To obtain a Project Management role within a progressive development organisation or corporate environment where I can apply structured methodologies, analytical skills, and leadership capabilities to successfully deliver complex, high-impact projects across diverse sectors.",
  modules: [
    "Project Planning & Scheduling",
    "Risk Management & Mitigation",
    "Cost Estimation & Budgeting",
    "Stakeholder Management",
    "Project Monitoring & Evaluation",
    "Procurement in Projects",
    "Leadership & Team Management",
    "Agile & Traditional PM Methodologies",
    "Business Communication",
    "Research Methods",
  ],
  keySkills: [
    "Project Planning & Scheduling",
    "Risk Identification & Mitigation",
    "Stakeholder Engagement",
    "Budget Management & Control",
    "Gantt Chart Development",
    "Team Leadership & Coordination",
    "Report Writing & Documentation",
    "Monitoring & Evaluation",
  ],
  professionalSkills: [
    "Project Planning & Scheduling",
    "Team Leadership & Coordination",
    "Risk Identification & Mitigation",
    "Report Writing & Documentation",
    "Stakeholder Engagement",
    "Monitoring & Evaluation",
    "Budget Management & Control",
    "Conflict Resolution",
    "Gantt Chart Development",
    "Problem-Solving & Critical Thinking",
  ],
  experience: [
    {
      id: '1',
      role: "Project Coordinator (Intern)",
      org: "Malawi Red Cross Society, Lilongwe",
      dates: "January 2023 – August 2023",
      bullets: [
        "Supported planning and coordination of community health outreach projects across 3 districts.",
        "Prepared project reports, tracked budgets and timelines, facilitated stakeholder meetings.",
        "Contributed to a WASH project reaching over 4,000 beneficiaries.",
      ],
    },
    {
      id: '2',
      role: "Administrative Assistant",
      org: "Phiri & Associates Consulting, Lilongwe",
      dates: "June 2021 – December 2022",
      bullets: [
        "Managed scheduling, correspondence, and filing systems for a busy consulting office.",
        "Assisted in preparing client proposals and monitoring deliverables for 6 concurrent projects.",
      ],
    },
  ],
  education: [
    {
      id: '1',
      degree: "Undergraduate Degree in Bachelor of Science in Project Management",
      institution: "OHSC — Open High School College",
      year: "2024",
      details: "Student ID: OHSC-58720",
    },
    {
      id: '2',
      degree: "Malawi School Certificate of Education (MSCE)",
      institution: "St. Mary's Girls Secondary School, Zomba",
      year: "2016",
      details: "Subjects: Mathematics (B), English (A), Biology (B), Geography (A)",
    },
  ],
  achievements: [
    "Academic Excellence Award — OHSC (2023/2024 Academic Year)",
    "Student Council Secretary — OHSC Student Union (2022–2023)",
    "Volunteer Teacher — Chinsapo Community Learning Centre (2021–Present)",
    "Winner — OHSC Inter-College Business Case Competition (2023)",
  ],
  references: [
    {
      id: '1',
      name: "Dr. Kondwani Banda",
      title: "Senior Lecturer, Project Management Dept, OHSC",
      contact: "k.banda@ohsc.ac.mw • +265 1 772 000",
    },
  ],
  templateId: 'modern-sidebar',
};

export const useCVStore = create<CVStore>()(
  persist(
    (set) => ({
      data: initialData,
      updateField: (path, value) =>
        set((state) => {
          const newData = { ...state.data };
          const keys = path.split('.');
          let current: any = newData;
          for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
          }
          current[keys[keys.length - 1]] = value;
          return { data: newData };
        }),
      updateTemplate: (id) =>
        set((state) => ({
          data: { ...state.data, templateId: id }
        })),
      addItem: (collection) =>
        set((state) => {
          const newItem: any = { id: crypto.randomUUID() };
          if (collection === 'experience') {
            newItem.role = ''; newItem.org = ''; newItem.dates = ''; newItem.bullets = [];
          } else if (collection === 'education') {
            newItem.degree = ''; newItem.institution = ''; newItem.year = ''; newItem.details = '';
          } else if (collection === 'references') {
            newItem.name = ''; newItem.title = ''; newItem.contact = '';
          }
          return {
            data: {
              ...state.data,
              [collection]: [...state.data[collection], newItem],
            },
          };
        }),
      removeItem: (collection, id) =>
        set((state) => ({
          data: {
            ...state.data,
            [collection]: state.data[collection].filter((item: any) => item.id !== id),
          },
        })),
      updateItem: (collection, id, value) =>
        set((state) => ({
          data: {
            ...state.data,
            [collection]: state.data[collection].map((item: any) =>
              item.id === id ? { ...item, ...value } : item
            ),
          },
        })),
      addListValue: (collection, value) =>
        set((state) => ({
          data: {
            ...state.data,
            [collection]: [...state.data[collection], value],
          },
        })),
      removeListValue: (collection, index) =>
        set((state) => ({
          data: {
            ...state.data,
            [collection]: state.data[collection].filter((_: any, i: number) => i !== index),
          },
        })),
      addBullet: (expId, bullet) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.map((exp) =>
              exp.id === expId ? { ...exp, bullets: [...exp.bullets, bullet] } : exp
            ),
          },
        })),
      removeBullet: (expId, index) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.map((exp) =>
              exp.id === expId ? { ...exp, bullets: exp.bullets.filter((_, i) => i !== index) } : exp
            ),
          },
        })),
      resetData: () => set({ data: initialData }),
    }),
    {
      name: 'cv-storage-v2',
    }
  )
);
