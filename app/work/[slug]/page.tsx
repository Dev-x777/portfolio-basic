import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projects } from '@/data/projects';
import { StarIcon } from '@/components/ui/StarIcon';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="min-h-screen py-32 px-4 sm:px-8 md:px-16 max-w-5xl mx-auto bg-[var(--background)] text-[var(--color)]">
      {/* Back button */}
      <Link
        href="/#work"
        className="inline-flex items-center gap-2 mb-12 px-4 py-2 rounded-full glass-pill text-xs font-mono text-[var(--color)]/70 hover:text-[var(--color)] hover:border-[var(--silk)]/40 transition-colors"
      >
        <span>←</span>
        <span>Back to selected work</span>
      </Link>

      {/* Header */}
      <header className="mb-16">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--silk)] font-semibold mb-4">
          <StarIcon className="text-sm" />
          <span>Case Study · {project.track}</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[var(--color-light)] mb-8 leading-[1.05]">
          {project.title}
        </h1>

        <p className="font-body text-xl sm:text-2xl text-[var(--color)]/80 max-w-3xl leading-relaxed">
          {project.summary}
        </p>
      </header>

      {/* Meta Specs Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl glass-card mb-16 border border-[var(--color)]/10">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color)]/40 block mb-1">
            Track
          </span>
          <p className="font-display font-semibold text-sm capitalize text-[var(--silk)]">
            {project.track}
          </p>
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color)]/40 block mb-1">
            Technologies
          </span>
          <p className="font-mono text-xs text-[var(--color-light)]">
            {project.stack.join(', ')}
          </p>
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color)]/40 block mb-1">
            Primary Impact
          </span>
          <p className="font-display font-semibold text-sm text-[var(--color-light)]">
            {project.facts[0]}
          </p>
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color)]/40 block mb-1">
            Repository
          </span>
          {project.links.github && project.links.github !== 'TODO' ? (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[var(--silk)] underline underline-offset-4 hover:opacity-80"
            >
              View on GitHub ↗
            </a>
          ) : (
            <span className="text-xs font-mono text-[var(--color)]/40">
              GitHub repo TODO
            </span>
          )}
        </div>
      </div>

      {/* Deep-Dive Content Sections */}
      <div className="space-y-16">
        {/* Problem */}
        <section className="p-8 sm:p-10 rounded-3xl glass-card">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-light)] mb-4">
            Context &amp; Challenge
          </h2>
          <p className="font-body text-lg text-[var(--color)]/80 leading-relaxed">
            {project.problem}
          </p>
        </section>

        {/* Process */}
        <section className="p-8 sm:p-10 rounded-3xl glass-card">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-light)] mb-4">
            Process &amp; Implementation
          </h2>
          <p className="font-body text-lg text-[var(--color)]/80 leading-relaxed">
            {project.process}
          </p>
        </section>

        {/* Outcome & Metrics */}
        <section className="p-8 sm:p-10 rounded-3xl glass-card">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-light)] mb-4">
            Verified Outcomes &amp; Key Facts
          </h2>
          <ul className="space-y-3 font-body text-lg text-[var(--color)]/85 list-disc pl-5">
            {project.facts.map((fact, idx) => (
              <li key={idx}>{fact}</li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
