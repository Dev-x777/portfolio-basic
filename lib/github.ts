import { Project, projects as curatedProjects, ProjectTrack } from '@/data/projects';

export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage?: string | null;
  language: string | null;
  topics?: string[];
  fork: boolean;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  pushed_at: string;
  created_at: string;
  updated_at: string;
}

const GITHUB_USERNAME = 'Dev-x777';
const REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=100`;

/**
 * Format repo name into clean, human-readable Title Case
 */
export function formatRepoTitle(name: string): string {
  // If acronyms like GPTtoPDF
  if (name.toLowerCase() === 'gpttopdf') return 'GPT to PDF';
  if (name.toLowerCase() === 'epigraphml') return 'EpiGraph ML';
  if (name.toLowerCase() === 'adventofcode25') return 'Advent of Code 2025';
  if (name.toLowerCase() === 'adventofcode24') return 'Advent of Code 2024';

  // Replace underscores and hyphens with spaces
  let formatted = name.replace(/[-_]+/g, ' ').trim();

  // Insert space between lower and uppercase letters (e.g. PokerMasters -> Poker Masters)
  formatted = formatted.replace(/([a-z])([A-Z])/g, '$1 $2');
  // Insert space between letters and numbers (e.g. Code25 -> Code 25)
  formatted = formatted.replace(/([a-zA-Z])([0-9])/g, '$1 $2');

  // Title case each word
  return formatted
    .split(' ')
    .filter(Boolean)
    .map((word) => {
      const lower = word.toLowerCase();
      if (lower === 'ai') return 'AI';
      if (lower === 'ml') return 'ML';
      if (lower === 'api' || lower === 'apis') return 'API';
      if (lower === 'ui') return 'UI';
      if (lower === 'fms') return 'FMS';
      if (lower === 'hr') return 'HR';
      if (lower === 'dsa') return 'DSA';
      if (lower === 'gpt') return 'GPT';
      if (lower === 'pdf') return 'PDF';
      if (lower === 'css' || lower === 'html') return word.toUpperCase();
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

/**
 * Infer whether a repo belongs to 'backend' or 'product' track
 */
export function inferTrack(repo: GitHubRepo): ProjectTrack {
  const text = `${repo.name} ${repo.description || ''} ${(repo.topics || []).join(' ')} ${repo.language || ''}`.toLowerCase();

  const backendKeywords = [
    'rate_limiter',
    'scheduler',
    'cache',
    'pipeline',
    'databricks',
    'spark',
    'redis',
    'docker',
    'distributed',
    'algorithm',
    'backend',
    'microservice',
    'database',
    'sql',
    'python',
    'c++',
    'cpp',
    'java',
    'go',
    'rust',
    'advent-of-code',
    'adventofcode',
    'epigraph',
    'unpacker',
    'orchestra',
    'watermarking',
  ];

  const productKeywords = [
    'autisense',
    're-hearse',
    'rehearse',
    'tripsync',
    'replymate',
    'fms',
    'fleet',
    'flutter',
    'swift',
    'ios',
    'react',
    'next',
    'ui',
    'frontend',
    'app',
    'mobile',
    'extension',
    'store',
    'poker',
    'hr_flow',
    'certificate',
    'login',
    'website',
    'weathergpt',
  ];

  for (const kw of backendKeywords) {
    if (text.includes(kw)) return 'backend';
  }

  for (const kw of productKeywords) {
    if (text.includes(kw)) return 'product';
  }

  // Fallback by primary language
  if (['Python', 'C++', 'C', 'Java', 'Go', 'Jupyter Notebook'].includes(repo.language || '')) {
    return 'backend';
  }

  return 'product';
}

/**
 * Convert a raw GitHub repository to a full Project object
 */
export function transformGitHubRepoToProject(repo: GitHubRepo): Project {
  const slug = repo.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const title = formatRepoTitle(repo.name);
  const track = inferTrack(repo);

  const stack: string[] = [];
  if (repo.language) stack.push(repo.language);
  if (repo.topics && repo.topics.length > 0) {
    repo.topics.forEach((t) => {
      const clean = t.replace(/[-_]+/g, ' ');
      const titleCase = clean.charAt(0).toUpperCase() + clean.slice(1);
      if (!stack.some((s) => s.toLowerCase() === titleCase.toLowerCase())) {
        stack.push(titleCase);
      }
    });
  }
  if (stack.length === 0) {
    stack.push(track === 'backend' ? 'Distributed Systems' : 'Product Engineering');
  }

  let formattedDate = 'Recent';
  if (repo.pushed_at) {
    try {
      const parts = repo.pushed_at.split('T')[0].split('-');
      if (parts.length === 3) {
        const year = parts[0];
        const monthNum = parseInt(parts[1], 10);
        const months = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        ];
        formattedDate = `${months[monthNum - 1] || 'Jan'} ${year}`;
      }
    } catch {
      formattedDate = 'Recent';
    }
  }

  const facts: string[] = [
    repo.stargazers_count > 0
      ? `★ ${repo.stargazers_count} GitHub Star${repo.stargazers_count > 1 ? 's' : ''}`
      : 'Open-Source Public Repository',
    `Primary: ${repo.language || 'Multi-language'}`,
    `Pushed: ${formattedDate}`,
    repo.fork ? 'Collaborative Open Source' : 'Engineered by Devjeet Saha',
  ];

  const summary =
    repo.description ||
    `Open-source ${repo.language || 'software'} project architected with focus on clean structure, modularity, and high-performance execution.`;

  const problem = repo.description
    ? `Technical domain challenge addressed: ${repo.description}`
    : `Designed to explore robust software patterns, algorithmic efficiency, and scalable architectures in ${repo.language || 'modern software engineering'}.`;

  const process = `Engineered in ${stack.slice(0, 3).join(', ')} with git-driven development, modular code architecture, and continuous integration.`;

  const outcome = `Published open-source on GitHub with source code, active revisions, and zero external runtime lock-in.`;

  return {
    slug,
    title,
    track,
    stack,
    facts,
    links: {
      github: repo.html_url,
      live: repo.homepage || undefined,
    },
    summary,
    problem,
    process,
    outcome,
  };
}

/**
 * Merge curated featured projects with all dynamically fetched GitHub repos
 */
export function mergeCuratedWithGitHubRepos(
  curated: Project[],
  repos: GitHubRepo[]
): Project[] {
  // Filter out the profile special README repo (Dev-x777/Dev-x777)
  const validRepos = repos.filter(
    (r) => r.name.toLowerCase() !== GITHUB_USERNAME.toLowerCase()
  );

  const matchedRepoNames = new Set<string>();

  // Enrich curated projects with live GitHub stats (stars, pushed date, live links)
  const enrichedCurated = curated.map((p) => {
    const matchedRepo = validRepos.find((r) => {
      if (!p.links.github) return false;
      const ghUrl = p.links.github.toLowerCase().replace(/\/$/, '');
      const repoUrl = r.html_url.toLowerCase().replace(/\/$/, '');
      if (ghUrl === repoUrl) return true;
      const repoNameClean = r.name.toLowerCase().replace(/[-_]/g, '');
      const slugClean = p.slug.toLowerCase().replace(/[-_]/g, '');
      return repoNameClean === slugClean;
    });

    if (matchedRepo) {
      matchedRepoNames.add(matchedRepo.name.toLowerCase());

      const enrichedFacts = [...p.facts];
      if (matchedRepo.stargazers_count > 0) {
        const starText = `★ ${matchedRepo.stargazers_count} GitHub Stars`;
        if (!enrichedFacts.some((f) => f.includes('Stars') || f.includes('★'))) {
          enrichedFacts.unshift(starText);
        }
      }

      return {
        ...p,
        facts: enrichedFacts,
        links: {
          ...p.links,
          github: matchedRepo.html_url,
          live: matchedRepo.homepage || p.links.live,
        },
      };
    }

    return p;
  });

  // Identify all additional/new repos from GitHub that are not in curated
  const newProjects: Project[] = [];
  for (const repo of validRepos) {
    if (!matchedRepoNames.has(repo.name.toLowerCase())) {
      // Check if slug conflicts with existing curated
      const transformed = transformGitHubRepoToProject(repo);
      const isAlreadyInCurated = enrichedCurated.some(
        (cp) => cp.slug === transformed.slug
      );
      if (!isAlreadyInCurated) {
        newProjects.push(transformed);
      }
    }
  }

  // Return curated first (flagship projects), followed by all other dynamic repos
  return [...enrichedCurated, ...newProjects];
}

/**
 * Fetch all GitHub repositories for Dev-x777
 */
export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'Devjeet-Portfolio-App',
    };

    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(REPOS_URL, {
      headers,
      next: { revalidate: 60 }, // Revalidate every 60 seconds in Next.js
    });

    if (!res.ok) {
      console.warn(`GitHub API returned status ${res.status} ${res.statusText}`);
      return [];
    }

    const data: GitHubRepo[] = await res.json();
    if (!Array.isArray(data)) {
      return [];
    }

    return data;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

/**
 * Get dynamic projects merging curated list with live GitHub repositories
 */
export async function getDynamicProjects(): Promise<{
  projects: Project[];
  total: number;
  lastSynced: string;
  isLive: boolean;
}> {
  const repos = await fetchGitHubRepos();

  if (repos.length === 0) {
    return {
      projects: curatedProjects,
      total: curatedProjects.length,
      lastSynced: 'static-curated',
      isLive: false,
    };
  }

  const merged = mergeCuratedWithGitHubRepos(curatedProjects, repos);
  return {
    projects: merged,
    total: merged.length,
    lastSynced: repos[0]?.pushed_at || 'synced',
    isLive: true,
  };
}

/**
 * Find a project by slug across curated and dynamic GitHub repositories
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const foundCurated = curatedProjects.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase()
  );
  if (foundCurated) {
    return foundCurated;
  }

  const { projects } = await getDynamicProjects();
  const matched = projects.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase()
  );

  return matched || null;
}
