"use client";

interface NavbarProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

export function Navbar({ activeSection, scrollToSection }: NavbarProps) {
  const sections: { id: string; label: string }[] = [
    { id: "intro", label: "Intro" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "articles", label: "Articles" },
    { id: "work", label: "Work" },
    { id: "reverse-engineering", label: "Reverse Engineering" },
    { id: "skills", label: "Skills" },
    { id: "connect", label: "Connect" },
  ];

  return (
    <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
      <div className="flex flex-col gap-4">
        {sections.map((section) => (
          <div key={section.id} className="group relative flex items-center h-8">
            <button
              onClick={() => scrollToSection(section.id)}
              className={`w-2 h-8 rounded-full transition-all duration-500 group-hover:w-24 group-hover:bg-primary/10 ${
                activeSection === section.id
                  ? "bg-primary"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section.label}`}
            />
            <button
              onClick={() => scrollToSection(section.id)}
              className="absolute left-8 h-8 flex items-center opacity-0 group-hover:opacity-100 transition-all duration-300 text-sm text-foreground whitespace-nowrap cursor-pointer"
            >
              {section.label}
            </button>
          </div>
        ))}
      </div>
    </nav>
  );
}
