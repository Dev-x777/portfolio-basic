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
    linkedin: string; // 'TODO'
    leetcode: string; // 'TODO'
    resumePdf: string; // '/resume.pdf' (TODO)
    portfolioUrl: string; // 'TODO'
  };
  education: Education[];
  coursework: string[];
}

export const profile: Profile = {
  name: 'Shruti Raj',
  roleLine: 'Designer and developer. UI/UX, full-stack and data engineering.',
  heroDescriptor: 'I design it. I build it. I make the data behind it make sense.',
  location: 'Chennai, India',
  email: 'shrutirajjmp@gmail.com',
  phone: '+91 9693904090',
  links: {
    github: 'https://github.com/Shrutiraj22',
    pinnedRepo: 'https://github.com/Shrutiraj22/FaceTrace',
    linkedin: 'TODO',
    leetcode: 'TODO',
    resumePdf: 'TODO',
    portfolioUrl: 'TODO',
  },
  education: [
    {
      institution: 'SRM Institute of Science and Technology, Chennai',
      degree: 'B.Tech Computer Science (Big Data Analytics)',
      period: '2023 to 2027',
      grade: 'CGPA 8.5/10',
    },
    {
      institution: 'Notre Dame Academy',
      degree: 'Senior Secondary (XII)',
      period: 'Completed',
      grade: '91%',
    },
    {
      institution: 'Notre Dame Academy',
      degree: 'Matriculation (X)',
      period: 'Completed',
      grade: '94%',
    },
  ],
  coursework: [
    'Data Structures and Algorithms',
    'DBMS',
    'Operating Systems',
    'Machine Learning',
    'Artificial Intelligence',
    'Big Data Techniques',
    'OpenCV',
    'Web Development',
  ],
};
