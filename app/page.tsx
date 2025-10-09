"use client"

import { useEffect, useRef, useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { SkillTag, ToolTag } from "@/components/skill-tags"

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  // Function to get descriptions for each tool
  const getToolDescription = (tool: string) => {
    const descriptions: Record<string, string> = {
      "JavaScript": "Building interactive web applications with modern ES6+ features and frameworks",
      "Git": "Version control for collaborative development and code management",
      "Docker": "Containerizing applications for consistent development and deployment environments",
      "Figma": "Designing user interfaces and prototyping web and mobile applications",
      "Tailwind CSS": "Rapid UI development using utility-first CSS framework",
      "React Native Maps": "Implementing interactive maps and location-based features in mobile apps",
      "Appwrite": "Building backend services and authentication for web and mobile applications",
      "Vive code fixer": "Debugging and optimizing code performance issues",
      "Expo": "Accelerating React Native development with managed workflow tools",
      "Reanimated": "Creating smooth animations and gestures in React Native applications"
    };
    
    return descriptions[tool] || `Proficient in ${tool} for building high-quality applications`;
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "work", "skills", "connect"].map((section) => (
            <div key={section} className="group relative flex items-center h-8">
              <button
                onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
                className={`w-2 h-8 rounded-full transition-all duration-500 group-hover:w-24 group-hover:bg-primary/10 ${
                  activeSection === section ? "bg-primary" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                }`}
                aria-label={`Navigate to ${section}`}
              />
              <button
                onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
                className="absolute left-8 h-8 flex items-center opacity-0 group-hover:opacity-100 transition-all duration-300 text-sm text-foreground capitalize whitespace-nowrap cursor-pointer"
              >
                {section}
              </button>
            </div>
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        <header
          id="intro"
          ref={(el) => { sectionsRef.current[0] = el; }}
          className="min-h-screen flex items-center opacity-0"
        >
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                {/* Show image before Portfolio text on mobile */}
                <div className="lg:hidden w-48 h-48 mx-auto mt-18 mb-10">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
                    <img 
                      src="/profile.png" 
                      alt="Imtiaz Royhan" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="text-sm text-muted-foreground font-mono tracking-wider">PORTFOLIO / 2025</div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  Imtiaz
                  <br />
                  <span className="text-muted-foreground">Royhan</span>
                </h1>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Developing 
                  <span className="text-foreground"> design</span>,<span className="text-foreground"> technology</span>,
                  and
                  <span className="text-foreground"> personal experience</span>.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    Available for work
                  </div>
                  <div>Bangladesh</div>
                </div>
              </div>
            </div>
             <div className="hidden lg:block  w-78 h-78">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <img 
                    src="/profile.png" 
                    alt="Imtiaz Royhan" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0 ">
              
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">CURRENTLY</div>
                <div className="space-y-2">
                  <div className="text-foreground">Student</div>
                  <div className="text-muted-foreground">@IIUC</div>
                  <div className="text-xs text-muted-foreground">2023 — Present</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
                <div className="flex flex-wrap gap-2 relative min-h-24">
                  {[
                    { 
                      name: "React Native", 
                      description: "Expertly building cross-platform mobile applications for iOS and Android, focusing on performance and native feel.", 
                      experience: "" 
                    },
                    { 
                      name: "Appwrite", 
                      description: "Experienced in using Appwrite as a Backend-as-a-Service for authentication, realtime databases, and serverless functions.", 
                      experience: "" 
                    },
                    { 
                      name: "Javascript", 
                      description: "Good understanding of modern JavaScript (ES6+), asynchronous programming, and performance optimization.", 
                      experience: "" 
                    },
                    { 
                      name: "OpenStreetMaps", 
                      description: "Skilled in integrating and customizing OpenStreetMaps and related libraries (Leaflet, Mapbox GL JS) for web and mobile mapping solutions.", 
                      experience: "" 
                    },
                    { 
                      name: "Node.js", 
                      description: "Building scalable backend services, REST APIs, and microservices Node.js frameworks.", 
                      experience: "" 
                    },
                    { 
                      name: "Mapping Algorithms", 
                      description: "Proficient in implementing algorithms like Dijkstra's, A*, and custom routing logic for pathfinding and distance calculation.", 
                      experience: "" 
                    }
                  ].map((skill) => (
                    <SkillTag key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section
          id="work"
          ref={(el) => { sectionsRef.current[1] = el; }}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">My Works</h2>
              <div className="text-sm text-muted-foreground font-mono">2023 — 2025</div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  year: "2025",
                  role: "PRIM",
                  company: "Github Assistant Web App",
                  description: "A github assistant web app that helps you contribute better in github by documenting your PULL request, Reviewing PRs etc.",
                  tech: ["React Native", "Appwrite", "JavaScript"],
                },
                {
                  year: "2024",
                  role: "Crimson",
                  company: "Blood Donation App",
                  description: "An android and IOS based app for blood donation.",
                  tech: ["React Native", "Appwrite", "JavaScript"],
                },
                {
                  year: "2024",
                  role: "TravX",
                  company: "Local Routing App",
                  description: "A local routing app which can help people travel easily with directions and map and local vehicles fare data. It showed which way to and where to go and which local vehicles are available with cost.",
                  tech: ["React Native", "Appwrite", "JavaScript"],
                },
                {
                  year: "2023",
                  role: "Chat Application",
                  company: "University Project",
                  description: "A chat application made with C++ and QT.",
                  tech: ["C++", "QT"],
                },
               
              ].map((Project, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-2">
                    <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {Project.year}
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium">{Project.role}</h3>
                      <div className="text-muted-foreground">{Project.company}</div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg">{Project.description}</p>
                  </div>

                  <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                    {Project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="skills"
          ref={(el) => { sectionsRef.current[2] = el; }}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">Skills</h2>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Technical Skills */}
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-muted-foreground">Technical Skills</h3>
                <div className="space-y-4">
                  {[
                    { name: "React Native", level: 80 },
                    { name: "JavaScript", level: 84 },
                    { name: "Node.js", level: 75 },
                    { name: "C++", level: 90 },
                    { name: "Appwrite", level: 75 },
                    { name: "SQL", level: 72 },
                  ].map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-muted-foreground">Soft Skills</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Problem Solving",
                    "Designing",
                    "App Development",
                    "AI Integration",
                    "Support",
                    "Taking the easy way out",
                    "Code Review",
                  ].map((skill) => (
                    <div
                      key={skill}
                      className="p-3 border border-border rounded-lg hover:border-primary/50 transition-colors duration-300 text-center"
                    >
                      <span className="text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tools & Technologies */}
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-muted-foreground">Tools & Technologies</h3>
              <div className="flex flex-wrap gap-3 relative min-h-24">
                {[
                  { 
                    name: "JavaScript", 
                    description: "Building interactive web applications with modern ES6+ features and frameworks" 
                  },
                  { 
                    name: "Git", 
                    description: "Version control for collaborative development and code management" 
                  },
                  { 
                    name: "Docker", 
                    description: "Containerizing applications for consistent development and deployment environments" 
                  },
                  { 
                    name: "Figma", 
                    description: "Designing user interfaces and prototyping web and mobile applications" 
                  },
                  { 
                    name: "Tailwind CSS", 
                    description: "Rapid UI development using utility-first CSS framework" 
                  },
                  { 
                    name: "React Native Maps", 
                    description: "Implementing interactive maps and location-based features in mobile apps" 
                  },
                  { 
                    name: "Appwrite", 
                    description: "Building backend services and authentication for web and mobile applications" 
                  },
                  { 
                    name: "Vive code fixer", 
                    description: "Debugging and optimizing code performance issues" 
                  },
                  { 
                    name: "Expo", 
                    description: "Accelerating React Native development with managed workflow tools" 
                  },
                  { 
                    name: "Reanimated", 
                    description: "Creating smooth animations and gestures in React Native applications" 
                  },
                ].map((tool) => (
                  <ToolTag key={tool.name} tool={tool} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section 
          id="connect" 
          ref={(el) => { sectionsRef.current[3] = el; }} 
          className="py-20 sm:py-32 opacity-0"
        >
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light">Connect</h2>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Always interested in new opportunities, collaborations, and conversations about technology and design.
                </p>

                <div className="space-y-4">
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=imtiaz.axi@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-foreground hover:text-primary transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg">imtiaz.axi@gmail.com</span>
                    
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "GitHub", handle: "@imtia33", url: "https://github.com/imtia33" },
                  { name: "Discord", handle: "@axistro.ff", url: "https://discord.com/users/axistro.ff" },
                  { name: "Facebook", handle: "@imtiaz.axi", url: "https://facebook.com/imtiaz.axi" },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 border border-border rounded-lg hover:border-primary/50 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="text-foreground group-hover:text-primary transition-colors duration-300">
                        {social.name}
                      </div>
                      <div className="text-sm text-muted-foreground">{social.handle}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">© 2025 Imtiaz Royhan. All rights reserved.</div>
              <div className="text-xs text-muted-foreground">Built with inspiration.</div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="group p-3 rounded-lg border border-border hover:border-primary/50 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414 0zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              
            </div>
          </div>
        </footer>
      </main>
      
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
      
      {/* Minimal CSS: only the keyframes required for the "Scale Pop" animation */}
      <style>{`
        /* Scale Pop animation provides the entrance for Shadow Pop */
        @keyframes scalePop {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scalePop {
          animation: scalePop 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

