import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projects } from '@/data/projects';

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
    <article className="min-h-screen py-24 px-6 md:px-12 bg-[var(--paper)] text-[var(--ink)]">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/#work"
          className="inline-block mb-12 text-sm font-medium hover:text-[var(--cobalt)] transition-colors"
        >
          ← Back to selected work
        </Link>

        <header className="mb-16">
          <span className="text-xs uppercase tracking-widest text-[var(--cobalt)] font-semibold mb-3 block">
            {project.track}
          </span>
          <h1 className="font-display text-4xl md:text-7xl font-bold tracking-tight mb-6">
            {project.title}
          </h1>
          <p className="font-body text-xl md:text-2xl text-[var(--ink)]/80 max-w-2xl leading-relaxed">
            {project.summary}
          </p>
        </header>

        <section className="mb-16 border-y border-[var(--ink)]/15 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h2 className="text-xs font-mono uppercase opacity-50 mb-1">Track</h2>
            <p className="font-medium capitalize">{project.track}</p>
          </div>
          <div>
            <h2 className="text-xs font-mono uppercase opacity-50 mb-1">Technologies</h2>
            <p className="font-medium">{project.stack.join(', ')}</p>
          </div>
          <div>
            <h2 className="text-xs font-mono uppercase opacity-50 mb-1">Key Impact</h2>
            <p className="font-medium">{project.facts[0]}</p>
          </div>
          <div>
            <h2 className="text-xs font-mono uppercase opacity-50 mb-1">Links</h2>
            <div className="space-y-1">
              {project.links.github && project.links.github !== 'TODO' ? (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm underline hover:text-[var(--cobalt)]"
                >
                  GitHub
                </a>
              ) : (
                <span className="text-xs text-[var(--ink)]/40 block">GitHub TODO</span>
              )}
            </div>
          </div>
        </section>

        <div className="space-y-12 font-body text-lg leading-relaxed">
          <div>
            <h2 className="font-display text-2xl font-bold mb-3">Process & Execution</h2>
            <p className="text-[var(--ink)]/85">{project.process}</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-3">Outcome & Facts</h2>
            <ul className="list-disc pl-5 space-y-2 text-[var(--ink)]/85">
              {project.facts.map((fact, idx) => (
                <li key={idx}>{fact}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
