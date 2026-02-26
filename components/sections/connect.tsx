"use client";

interface ConnectProps {
  setRef: (el: HTMLElement | null) => void;
}

export function Connect({ setRef }: ConnectProps) {
  return (
    <section id="connect" ref={setRef} className="py-20 sm:py-32">
      <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
        <div className="space-y-6 sm:space-y-8">
          <h2 className="text-3xl sm:text-4xl font-light">Connect</h2>

          <div className="space-y-6">
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Always interested in new opportunities, collaborations, and
              conversations about technology and design.
            </p>

            <div className="space-y-4">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=imtiaz.axi@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-foreground hover:text-primary transition-colors duration-300"
              >
                <span className="text-base sm:text-lg">
                  imtiaz.axi@gmail.com
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <div className="text-sm text-muted-foreground font-mono">
            ELSEWHERE
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                name: "GitHub",
                handle: "@imtia33",
                url: "https://github.com/imtia33",
              },
              {
                name: "Discord",
                handle: "@axistro.ff",
                url: "https://discord.com/users/axistro.ff",
              },
              {
                name: "Facebook",
                handle: "@imtiaz.axi",
                url: "https://facebook.com/imtiaz.axi",
              },
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
                  <div className="text-sm text-muted-foreground">
                    {social.handle}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
