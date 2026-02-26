"use client";

import { GitHubContributionsChart } from "@/components/github-contributions-chart";

export function GithubActivity() {
  return (
    <section>
      <h2 className="text-3xl sm:text-4xl font-light mb-2 mt-5">
        GitHub Activity
      </h2>
      <div className="w-full overflow-x-auto scrollbar-hide mt-5">
        <div className="min-w-[340px] md:min-w-0">
          <GitHubContributionsChart username="imtia33" />
        </div>
      </div>
      <a
        href="https://github.com/imtia33"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
      >
        View Profile →
      </a>
    </section>
  );
}
