export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  highlights: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: 'infosys',
    role: 'iOS Developer Intern',
    organization: 'Infosys',
    period: 'March 2026 to Present',
    highlights: [
      'Led development of the Maintenance Module for a Fleet Management System using Swift, handling service scheduling, defect tracking, and history management for 100+ vehicles.',
      'Collaborated in a 10-member Agile team using Jira, completing 40+ user stories across sprints and reducing manual maintenance tracking effort by 30–35%.',
    ],
  },
  {
    id: 'apple-student-dev',
    role: 'Student Developer',
    organization: 'Apple Student Developer Program (Apple • Infosys • SRMIST)',
    period: 'May 2025 to Present',
    highlights: [
      'Selected out of 2,000+ applicants for the prestigious Apple Student Developer Program, powered by Apple in collaboration with Infosys at SRMIST.',
      'Developing 2+ production-grade iOS applications using Swift and UIKit, rigorously aligned with Apple Human Interface Guidelines.',
    ],
  },
  {
    id: 'team-envision',
    role: 'Flutter App Developer',
    organization: 'Team Envision — Aarush Techfest (SRM IST)',
    period: 'Oct 2024 to Jun 2025',
    highlights: [
      'Built an event registration app in Flutter adopted by 1,000+ attendees; integrated REST APIs for schedule sync and real-time notifications.',
      'Mentored 3 juniors on modular UI design and GetX patterns; improved code reuse and reduced review cycles.',
      'Deployed 5 production-ready builds following full SDLC; resolved 10+ pre-event issues to ensure 100% uptime.',
    ],
  },
];
