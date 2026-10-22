import type { Metadata } from 'next';
import { Bricolage_Grotesque, Newsreader } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { Navbar } from '@/components/nav/Navbar';
import { Footer } from '@/components/footer/Footer';
import { AskShruti } from '@/components/ai/AskShruti';
import { CommandPalette } from '@/components/command/CommandPalette';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
  axes: ['wdth'],
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
      className={`${bricolage.variable} ${newsreader.variable}`}
    >
      <body className="min-h-screen bg-[var(--paper)] text-[var(--ink)] antialiased font-body selection:bg-[var(--silk)] selection:text-[var(--ink)]">
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <AskShruti />
          <CommandPalette />
        </SmoothScroll>
      </body>
    </html>
  );
}
