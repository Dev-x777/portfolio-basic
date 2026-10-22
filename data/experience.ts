export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  highlights: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: 'bhagalpur-silk',
    role: 'UI/UX Design Lead',
    organization: 'Bhagalpur Silk',
    period: 'May 2024 to Jul 2024',
    highlights: [
      'UX research and redesign of the e-commerce platform, bounce rate down 25%',
      'Responsive wireframes in Figma, mobile conversion up 18%',
      'Worked with a cross-functional team of 3 for consistency across devices',
      'Delivered final UI assets and handoff documentation in Figma',
    ],
  },
  {
    id: 'team-aaruush',
    role: 'UI/UX Designer',
    organization: 'Team Aaruush (college tech fest)',
    period: 'Oct 2023 to Mar 2025',
    highlights: [
      'Designed and built the official tech fest website, 50+ dynamic pages',
      'User engagement up 30% through responsive design and optimization',
      'Led a team of 4 to keep branding and UI consistent',
      'Ran 10+ usability tests and iterated on student feedback',
    ],
  },
];
