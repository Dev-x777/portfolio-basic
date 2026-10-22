import type { Metadata } from 'next';
import { Bricolage_Grotesque, Newsreader, Syne } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { Navbar } from '@/components/nav/Navbar';
import { Footer } from '@/components/footer/Footer';
import { AskShruti } from '@/components/ai/AskShruti';
import { CommandPalette } from '@/components/command/CommandPalette';
import { CustomCursor } from '@/components/cursor/CustomCursor';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
  axes: ['wdth'],
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  weight: ['700', '800'],
});

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Shruti Raj — Designer & Developer',
  description:
    'Portfolio of Shruti Raj. Designer and developer specializing in UI/UX, full-stack, and big data engineering.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${syne.variable} ${newsreader.variable} dark`}
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
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[var(--background)] text-[var(--color)] antialiased font-display selection:bg-[var(--silk)] selection:text-white relative">
        {/* Full-bleed Architectural Dotted Background Grid */}
        <div className="pointer-events-none fixed inset-0 z-0 dotted-bg" />
        <CustomCursor />
        <SmoothScroll>
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
          <AskShruti />
          <CommandPalette />
        </SmoothScroll>
      </body>
    </html>
  );
}
