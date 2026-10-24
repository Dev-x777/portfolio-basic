export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: 'Languages',
    skills: ['Java', 'Python', 'TypeScript', 'C++', 'Go', 'SQL', 'JavaScript', 'C', 'Dart', 'Swift'],
  },
  {
    category: 'Frameworks & Backend',
    skills: [
      'Spring Boot',
      'Node.js',
      'Express',
      'React JS',
      'Django',
      'Apache Spark',
      'Flutter',
      'Firebase',
      'Supabase',
    ],
  },
  {
    category: 'Systems & Tools',
    skills: [
      'Docker',
      'Redis',
      'PostgreSQL',
      'Databricks',
      'Git',
      'Postman',
      'MySQL',
      'MongoDB',
      'Cassandra',
    ],
  },
  {
    category: 'Machine Learning',
    skills: [
      'TensorFlow',
      'PyTorch',
      'OpenCV',
      'Keras',
      'Scikit-Learn',
      'Pandas',
      'NumPy',
    ],
  },
];
