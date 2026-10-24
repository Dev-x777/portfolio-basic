export type ProjectTrack = 'backend' | 'product';

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
  // Backend Track
  {
    slug: 'rateguard',
    title: 'RateGuard – Distributed Rate Limiting Service',
    track: 'backend',
    stack: ['Spring Boot', 'Redis Lua', 'PostgreSQL', 'Docker', 'React'],
    facts: [
      'Token Bucket & Sliding Window algorithms',
      'sub-5ms latency across 3 instances',
      '0 race conditions over 10K+ load tests',
      '0 limit breaches on 500+ concurrent connections',
    ],
    links: {
      github: 'https://github.com/Dev-x777/Rate_Limiter_As_A_Service',
    },
    summary:
      'Distributed rate limiting microservice architecture enforcing multi-tier limits at sub-5ms latency with atomic Redis Lua scripts.',
    problem:
      'High-throughput microservices require resilient, low-latency distributed rate limiters to protect upstream APIs from abuse without introducing latency bottlenecks.',
    process:
      'Implemented Token Bucket and Sliding Window algorithms with atomic Redis Lua scripts across 3 instances, enforcing 3-tier limits (100/1K/10K req/min); built a React dashboard with live WebSocket traffic graphs and PostgreSQL counter recovery on Redis restarts.',
    outcome:
      'Validated 0 limit breaches and 0 race conditions across 10K+ load-tested requests at sub-5ms response latency.',
  },
  {
    slug: 'distributed-scheduler',
    title: 'Distributed Job Scheduler & Queue Engine',
    track: 'backend',
    stack: ['TypeScript', 'Node.js', 'Redis', 'Docker', 'Worker Queues'],
    facts: [
      'Fault-tolerant worker orchestration',
      'Heartbeat health monitoring',
      'Exponential backoff job retries',
      'Sub-millisecond queue dispatching',
    ],
    links: {
      github: 'https://github.com/Dev-x777/Distributed-Job-Scheduler',
    },
    summary:
      'High-throughput distributed task queue and worker coordination engine designed for fault-tolerant asynchronous job scheduling.',
    problem:
      'Large backend architectures require reliable decoupled execution of heavy asynchronous jobs with guaranteed delivery and zero duplicate processing.',
    process:
      'Engineered a distributed master-worker scheduling engine utilizing Redis pub/sub and atomic keys; implemented worker heartbeat detection, exponential backoff retries, and task deduplication queues.',
    outcome:
      'Engineered fault-tolerant job dispatching capable of orchestrating concurrent asynchronous tasks across multiple distributed worker nodes with zero message drops.',
  },
  {
    slug: 'message-cache',
    title: 'High-Throughput Message Caching System',
    track: 'backend',
    stack: ['Node.js', 'In-Memory Cache', 'Redis', 'Concurrency'],
    facts: [
      'Sub-millisecond read/write latency',
      'LRU eviction with TTL expiration',
      'Thread-safe atomic operations',
      'High concurrency throughput',
    ],
    links: {
      github: 'https://github.com/Dev-x777/message-cache-system',
    },
    summary:
      'Ultra-fast in-memory caching and queuing service optimizing high-throughput message persistence and instant retrieval.',
    problem:
      'Direct database writes during traffic spikes degrade response times and threaten downstream service availability.',
    process:
      'Built a low-latency caching layer featuring Least Recently Used (LRU) memory eviction, sliding window TTL expiration, and atomic lock-free reads.',
    outcome:
      'Reduced database read pressure by caching hot messages with sub-millisecond retrieval speeds under high concurrent connection loads.',
  },
  {
    slug: 'lakeflow-pipeline',
    title: 'Lakeflow Databricks Data Pipeline',
    track: 'backend',
    stack: ['Python', 'Apache Spark', 'Databricks', 'Delta Lake'],
    facts: [
      'Automated ETL ingestion pipelines',
      'Delta Lake ACID transaction guarantees',
      'Automated data quality verification',
      'Scalable batch & stream architecture',
    ],
    links: {
      github: 'https://github.com/Dev-x777/lakeflow-databricks-pipeline',
    },
    summary:
      'Scalable cloud data engineering pipeline on Databricks executing automated data ingestion, transformation, and medallion storage.',
    problem:
      'Processing massive raw logs into analytics-ready structured tables requires robust schema validation and ACID guarantees.',
    process:
      'Constructed a multi-stage medallion data architecture on Databricks utilizing Delta Lake and Apache Spark; incorporated automated schema validation and anomaly filtering.',
    outcome:
      'Delivered automated data pipelines converting disparate streaming and batch logs into reliable, analytics-ready Delta Lake datasets.',
  },

  // Product Track
  {
    slug: 'autisense',
    title: 'AutiSense – Autism Screening Platform',
    track: 'product',
    stack: ['Dart', 'Flutter', 'React JS', 'Flask', 'TensorFlow', 'PostgreSQL'],
    facts: [
      'Pre-autism screening for ages 2–6',
      'CNN on 5,000+ labeled samples',
      '86%+ classification accuracy',
      'sub-200ms REST inference latency',
    ],
    links: {
      github: 'https://github.com/Dev-x777/AutiSense',
    },
    summary:
      'Comprehensive pre-autism screening product for kids aged 2–6 pairing deep CNN computer vision with clinician dashboards.',
    problem:
      'Early detection of childhood developmental conditions is often hindered by long clinical waitlists and inaccessible computational tools.',
    process:
      'Trained a convolutional neural network on 5,000+ behavioral and facial image samples achieving 86%+ classification accuracy; served predictions via Flask REST API with sub-200ms latency; built mobile and web clinician interfaces backed by PostgreSQL.',
    outcome:
      'Delivered an accessible screening tool with 86%+ diagnostic accuracy and real-time clinical reporting across 100+ patient records.',
  },
  {
    slug: 'rehearse',
    title: 'ReHearse – Sheet Music to Playable Audio',
    track: 'product',
    stack: ['Python', 'Audiveris', 'Azure', 'Docker', 'UIKit', 'AVFoundation'],
    facts: [
      'Live App Store product',
      '90%+ OMR sheet accuracy',
      '100+ active musicians',
      '25% reduction in learning curve',
    ],
    links: {
      github: 'https://github.com/Dev-x777/re-hearse-v1',
    },
    summary:
      'Interactive music product converting scanned sheet music into real-time playable audio with step-by-step practice tutorials.',
    problem:
      'Beginner musicians struggle to translate complex sheet music notation into accurate pitch and tempo without audio playback.',
    process:
      'Architected Optical Music Recognition pipeline using Python and Audiveris containerized on Azure with Docker; developed native playback engine with AVFoundation, animated note tutorials, and interactive practice feedback.',
    outcome:
      'Published on the App Store with 100+ active users; cut beginner learning time by 25% and boosted practice engagement by 35%.',
  },
  {
    slug: 'tripsync',
    title: 'TripSync – Collaborative Travel Platform',
    track: 'product',
    stack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    facts: [
      'Real-time collaborative planning',
      'Integrated itinerary sync',
      'Smart group expense tracking',
      'Interactive map & timeline views',
    ],
    links: {
      github: 'https://github.com/Dev-x777/TripSync',
    },
    summary:
      'Full-stack collaborative travel platform enabling groups to plan itineraries, split shared expenses, and synchronize schedules in real time.',
    problem:
      'Planning group trips across messy chat threads and spreadsheets leads to conflicting schedules, lost reservations, and friction.',
    process:
      'Designed and engineered full-stack web product in React and Node.js; implemented real-time itinerary synchronization, interactive day-by-day timelines, and an automated expense reconciliation engine.',
    outcome:
      'Delivered a unified travel product turning chaotic group travel coordination into an intuitive, real-time shared workspace.',
  },
  {
    slug: 'replymate',
    title: 'ReplyMate – Intelligent Response Assistant',
    track: 'product',
    stack: ['JavaScript', 'Browser Extension', 'LLM API', 'React'],
    facts: [
      '16 GitHub Stars community acclaim',
      'Context-aware message drafting',
      '1-click tone customization',
      'Zero-friction browser integration',
    ],
    links: {
      github: 'https://github.com/Dev-x777/ReplyMate',
    },
    summary:
      'AI-powered productivity extension generating contextual, intelligent draft responses for communications in one click.',
    problem:
      'Repetitive professional communication takes hours of manual effort, drafting similar responses across emails and messaging platforms.',
    process:
      'Built a lightweight browser extension that analyzes conversation context and prompts generative AI models to compose tailored drafts in professional, friendly, or concise tones.',
    outcome:
      'Gained 16 GitHub stars and positive developer adoption, drastically reducing message drafting time.',
  },
  {
    slug: 'fms',
    title: 'Fleet Management System (FMS)',
    track: 'product',
    stack: ['Swift', 'UIKit', 'REST APIs', 'Agile / Jira'],
    facts: [
      '100+ vehicle fleet management',
      '40+ sprint user stories delivered',
      '30–35% reduction in manual overhead',
      '10-member Agile engineering team',
    ],
    links: {
      github: 'https://github.com/Dev-x777/FMS',
    },
    summary:
      'Enterprise fleet management system streamlining vehicle service scheduling, defect tracking, and historical audit logs.',
    problem:
      'Manual paper logs delayed maintenance schedules and caused costly vehicle downtime across commercial fleet operations.',
    process:
      'Led client-side module engineering in Swift; built vehicle service scheduling, defect triage, and audit history screens; collaborated across two-week Agile sprints using Jira.',
    outcome:
      'Shipped 40+ user stories, managing 100+ commercial vehicles and cutting manual maintenance tracking overhead by 30–35%.',
  },
];
