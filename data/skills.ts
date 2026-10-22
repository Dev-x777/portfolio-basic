export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: 'Programming',
    skills: ['Python', 'C++', 'Java', 'SQL', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    category: 'Technologies',
    skills: [
      'PySpark',
      'Apache Spark',
      'Delta Lake',
      'ReactJS',
      'Node.js',
      'OpenCV',
      'NLP',
    ],
  },
  {
    category: 'Tools',
    skills: [
      'Git',
      'Streamlit',
      'Figma',
      'Power BI',
      'Tableau',
      'Elasticsearch',
    ],
  },
];
