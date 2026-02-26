"use client";

interface NavbarProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

export function Navbar({ activeSection, scrollToSection }: NavbarProps) {
  const sections = [
    "intro",
    "experience",
    "education",
    "work",
    "skills",
    "connect",
  ];

  return (
    <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
      <div className="flex flex-col gap-4">
        {sections.map((section) => (
          <div key={section} className="group relative flex items-center h-8">
            <button
              onClick={() => scrollToSection(section)}
              className={`w-2 h-8 rounded-full transition-all duration-500 group-hover:w-24 group-hover:bg-primary/10 ${
                activeSection === section
                  ? "bg-primary"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section}`}
            />
            <button
              onClick={() => scrollToSection(section)}
              className="absolute left-8 h-8 flex items-center opacity-0 group-hover:opacity-100 transition-all duration-300 text-sm text-foreground capitalize whitespace-nowrap cursor-pointer"
            >
              {section}
            </button>
          </div>
        ))}
      </div>
    </nav>
  );
}
