export interface AchievementItem {
  id: string;
  title: string;
  issuer?: string;
  type: 'achievement' | 'certification';
}

export const achievements: AchievementItem[] = [
  {
    id: 'sih',
    title: 'Smart India Hackathon, top 10%',
    type: 'achievement',
  },
  {
    id: 'google-analytics',
    title: 'Google Data Analytics Professional Certificate',
    issuer: 'Coursera',
    type: 'certification',
  },
  {
    id: 'oracle-cloud',
    title: 'Oracle Cloud Infrastructure',
    issuer: 'Oracle',
    type: 'certification',
  },
  {
    id: 'nptel-dbms',
    title: 'Introduction to Database Management System',
    issuer: 'NPTEL',
    type: 'certification',
  },
  {
    id: 'cisco-ds',
    title: 'Introduction to Data Science',
    issuer: 'Cisco',
    type: 'certification',
  },
  {
    id: 'udemy-python',
    title: 'Python Bootcamp',
    issuer: 'Udemy',
    type: 'certification',
  },
];
