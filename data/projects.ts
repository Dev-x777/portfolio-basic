export type ProjectTrack = 'design' | 'engineering';

export interface ProjectLinks {
  github?: string;
  live?: string;
}

export interface Project {
  slug: string;
  title: string;
  track: ProjectTrack;
  stack: string[];
  facts: string[];
  links: ProjectLinks;
  summary: string;
  problem: string;
  process: string;
  outcome: string;
}

export const projects: Project[] = [
  // Design Track
  {
    slug: 'bhagalpur-silk',
    title: 'Bhagalpur Silk e-commerce redesign',
    track: 'design',
    stack: ['Figma', 'UX research'],
    facts: [
      'bounce rate -25%',
      'mobile conversion +18%',
      'team of 3',
      'May-Jul 2024',
    ],
    links: {
      github: 'TODO',
      live: 'TODO',
    },
    summary:
      'UX research and redesign of the e-commerce platform for Bhagalpur Silk, driving down bounce rates while boosting mobile conversions.',
    problem: 'TODO: confirm with Shruti',
    process:
      'UX research and redesign of the e-commerce platform; responsive wireframes in Figma; worked with cross-functional team of 3 for consistency across devices; delivered final UI assets and handoff documentation.',
    outcome:
      'Bounce rate dropped by 25% and mobile conversion increased by 18%.',
  },
  {
    slug: 'team-aaruush',
    title: 'Team Aaruush tech fest website',
    track: 'design',
    stack: ['Figma', 'web dev'],
    facts: [
      '50+ pages',
      'engagement +30%',
      'team of 4',
      '10+ usability tests',
    ],
    links: {
      github: 'TODO',
      live: 'TODO',
    },
    summary:
      'Designed and built the official tech fest website spanning 50+ dynamic pages with consistent branding and elevated user engagement.',
    problem: 'TODO: confirm with Shruti',
    process:
      'Designed and built the official tech fest website (50+ dynamic pages); led team of 4 to keep branding and UI consistent; ran 10+ usability tests and iterated on student feedback.',
    outcome:
      '50+ dynamic pages delivered on schedule; user engagement rose by 30%.',
  },

  // Engineering Track
  {
    slug: 'cyber-threat-dashboard',
    title: 'Cyber Threat Intelligence Dashboard (Feb 2025)',
    track: 'engineering',
    stack: ['PySpark', 'Elasticsearch', 'Streamlit'],
    facts: [
      'pipeline for 10K+ cyber log entries',
      'anomaly detection with Apache Spark',
      'real-time dashboard',
      '100% uptime',
    ],
    links: {
      github: 'TODO',
    },
    summary:
      'End-to-end data pipeline and real-time visualization dashboard analyzing 10K+ cyber log entries with automated anomaly detection.',
    problem: 'TODO: confirm with Shruti',
    process:
      'Engineered an ingestion and processing pipeline for 10K+ cyber log entries; implemented anomaly detection with Apache Spark; connected real-time visualization dashboard via Streamlit and Elasticsearch.',
    outcome:
      'Maintained 100% uptime during monitoring with instant anomaly detection across 10K+ log entries.',
  },
  {
    slug: 'facetrace',
    title: 'FaceTrace, smart surveillance system (Apr 2025)',
    track: 'engineering',
    stack: ['OpenCV', 'DeepFace'],
    facts: [
      'facial recognition 95% accuracy across 100+ CCTV frames',
      'real-time alerts under 2 s latency',
    ],
    links: {
      github: 'https://github.com/Shrutiraj22/FaceTrace',
    },
    summary:
      'Smart surveillance solution providing high-accuracy facial recognition across CCTV footage with sub-2-second automated alerts.',
    problem: 'TODO: confirm with Shruti',
    process:
      'Constructed facial recognition system using OpenCV and DeepFace; evaluated across 100+ CCTV frames; wired real-time alerting mechanisms.',
    outcome:
      'Achieved 95% recognition accuracy across 100+ CCTV frames with real-time alerting latency under 2 seconds.',
  },
  {
    slug: 'custom-data-warehouse',
    title: 'Custom Data Warehouse (Nov 2024)',
    track: 'engineering',
    stack: ['Apache Spark', 'Delta Lake'],
    facts: [
      'medallion architecture',
      'query time -40% on healthcare dataset of 10M+ records',
      'scalable ETL with automated data quality validation',
    ],
    links: {
      github: 'TODO',
    },
    summary:
      'Medallion architecture data warehouse processing 10M+ healthcare records with automated data quality validation and 40% faster queries.',
    problem: 'TODO: confirm with Shruti',
    process:
      'Designed multi-tier medallion architecture ETL pipelines; incorporated automated data quality checks and validation rules; optimized queries on Delta Lake with Apache Spark.',
    outcome:
      'Cut query execution time by 40% on a massive healthcare dataset containing 10M+ records.',
  },
  {
    slug: 'sentiguard',
    title: 'SentiGuard, toxic comment filter (Mar 2024)',
    track: 'engineering',
    stack: ['Python', 'NLP', 'ML'],
    facts: [
      '88% accuracy on 20K+ comments',
      'logistic regression classifier',
      'real-time moderation under 300 ms',
    ],
    links: {
      github: 'TODO',
    },
    summary:
      'Machine learning moderation system classifying toxic comments with 88% accuracy and rapid sub-300ms evaluation times.',
    problem: 'TODO: confirm with Shruti',
    process:
      'Preprocessed NLP text corpus of 20K+ comments; trained and evaluated a logistic regression classification model; wrapped inference in a fast real-time scoring endpoint.',
    outcome:
      'Achieved 88% accuracy on 20K+ test comments with live moderation response time under 300 ms.',
  },
  {
    slug: 'taskflow',
    title: 'TaskFlow productivity app (Jan 2024)',
    track: 'engineering',
    stack: ['React', 'Node.js'],
    facts: [
      'Kanban-style task manager',
      'JWT login',
      'multi-user',
      'analytics dashboard tracking 5+ metrics across 50+ daily tasks',
    ],
    links: {
      github: 'TODO',
    },
    summary:
      'Multi-user Kanban productivity platform featuring JWT authentication and an interactive metrics analytics dashboard.',
    problem: 'TODO: confirm with Shruti',
    process:
      'Built a full-stack Kanban task manager with React frontend and Node.js backend; implemented secure JWT-based authentication; engineered an analytics dashboard tracking productivity metrics.',
    outcome:
      'Delivered seamless multi-user collaboration tracking 5+ metrics across 50+ daily tasks.',
  },
];
