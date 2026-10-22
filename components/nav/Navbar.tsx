'use client';

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-5 md:px-12 flex justify-between items-center transition-transform duration-300">
      <div className="font-display text-xl font-bold tracking-tight text-[var(--ink)]">
        Shruti Raj
      </div>
      <nav className="flex items-center gap-6 text-sm font-medium">
        <a href="#work" className="hover:opacity-70 transition-opacity">Work</a>
        <a href="#about" className="hover:opacity-70 transition-opacity">About</a>
        <a href="#experience" className="hover:opacity-70 transition-opacity">Experience</a>
        <a href="#contact" className="hover:opacity-70 transition-opacity">Contact</a>
      </nav>
    </header>
  );
}
