import type { Metadata } from 'next';
import { Bricolage_Grotesque, Newsreader } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { Navbar } from '@/components/nav/Navbar';
import { Footer } from '@/components/footer/Footer';
import { AskDev } from '@/components/ai/AskDev';
import { CommandPalette } from '@/components/command/CommandPalette';
import { SmoothCursor } from '@/components/ui/smooth-cursor';
import { BackgroundGrainient } from '@/components/ui/BackgroundGrainient';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
  axes: ['wdth', 'opsz'],
});

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Devjeet Saha — Product & Backend Engineer',
  description:
    'Portfolio of Devjeet Saha (Dev). Product and backend engineer specializing in distributed systems, scalable microservices, and high-impact products.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${newsreader.variable} dark`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  if (saved === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                    document.documentElement.setAttribute('data-theme', 'light');
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[var(--background)] text-[var(--color)] antialiased font-display selection:bg-[var(--silk)] selection:text-white relative">
        {/* Dynamic WebGL Grainient Fluid Background */}
        <BackgroundGrainient />
        {/* Full-bleed Architectural Dotted Background Grid */}
        <div className="pointer-events-none fixed inset-0 z-0 dotted-bg" />
        <SmoothScroll>
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
          <AskDev />
          <CommandPalette />
        </SmoothScroll>
        <SmoothCursor />
      </body>
    </html>
  );
}
