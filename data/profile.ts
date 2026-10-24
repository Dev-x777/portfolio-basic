export interface Education {
  institution: string;
  degree: string;
  period: string;
  grade: string;
  details?: string[];
}

export interface Profile {
  name: string;
  roleLine: string;
  heroDescriptor: string;
  location: string;
  email: string;
  phone: string;
  links: {
    github: string;
    pinnedRepo: string;
    linkedin: string;
    leetcode: string;
    resumePdf: string;
    portfolioUrl: string;
  };
  education: Education[];
  coursework: string[];
}

export const profile: Profile = {
  name: 'Devjeet Saha',
  roleLine: 'Product & Backend Engineer. Distributed systems, high-throughput microservices, and scalable products.',
  heroDescriptor: 'Architecting resilient distributed backends, low-latency microservices, and high-impact products.',
  location: 'Kolkata & Chennai, India',
  email: 'devjeetsaha2@gmail.com',
  phone: '+91 7980258687',
  links: {
    github: 'https://github.com/Dev-x777',
    pinnedRepo: 'https://github.com/Dev-x777/Rate_Limiter_As_A_Service',
    linkedin: 'https://linkedin.com/in/devjeetsaha7777',
    leetcode: 'https://leetcode.com/u/DEV009x',
    resumePdf: '/resume.pdf',
    portfolioUrl: 'https://devisiuuu.me',
  },
  education: [
    {
      institution: 'SRM Institute of Science and Technology, Chennai',
      degree: 'B.Tech in Computer Science (Big Data Specialization)',
      period: 'Aug 2023 – Present',
      grade: 'CGPA 9.01/10',
    },
  ],
  coursework: [
    'Data Structures',
    'Algorithms',
    'DBMS',
    'Artificial Intelligence',
    'Internet Technology',
    'Operating System',
    'System Design',
    'Software Engineering',
  ],
};
