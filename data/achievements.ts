export interface AchievementItem {
  id: string;
  title: string;
  issuer?: string;
  type: 'achievement' | 'certification';
}

export const achievements: AchievementItem[] = [
  {
    id: 'apple-student-dev',
    title: 'Apple Student Developer Program (Selected out of 2,000+ applicants)',
    issuer: 'Apple · Infosys · SRMIST',
    type: 'achievement',
  },
  {
    id: 'infosys-internship',
    title: 'iOS Developer Intern — Fleet Management System',
    issuer: 'Infosys',
    type: 'achievement',
  },
  {
    id: 'srmist-distinction',
    title: 'B.Tech Big Data Specialization — CGPA 9.01/10',
    issuer: 'SRM Institute of Science and Technology',
    type: 'achievement',
  },
  {
    id: 'team-envision-lead',
    title: 'Aarush Techfest Event App Adoption by 1,000+ Attendees',
    issuer: 'Team Envision',
    type: 'achievement',
  },
  {
    id: 'leetcode-profile',
    title: 'LeetCode Problem Solving Profile: DEV009x',
    issuer: 'LeetCode',
    type: 'certification',
  },
];
