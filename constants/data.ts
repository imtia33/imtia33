export const experiences = [
  {
    company: "Appwrite",
    role: "Backend Contributor",
    duration: "August 2026 - Present",
    logo: "/avatars/appwrite.svg",
    website: "https://appwrite.io/",
    points: [
      "Building backend features at Appwrite — the open-source, self-hosted backend-as-a-service platform that gives developers authentication, databases, storage, functions, and real-time capabilities out of the box.",
      "Working alongside Matej Bačo (Engineering Lead at Appwrite) on core authentication and backend platform features.",
      "Building features that simplify backend development for thousands of Appwrite users.",
    ],
    /*
     * ─────────────────────────────────────────────────────────────────────
     *  FEATURE TIMELINE  —  Appwrite backend contributions
     * ─────────────────────────────────────────────────────────────────────
     *  Each feature below has a `status` field. To mark a feature as
     *  completed from the GitHub repo, simply change its `status` value
     *  from "pending"  →  "done".  The live site will reflect the change
     *  automatically on the next build / deploy.
     *
     *  `platform`     : the brand shown as a badge (icon + name).
     *  `title`        : short label of the feature.
     *  `description`  : one-line explanation of the feature.
     *  `status`       : "done" | "pending"
     *  `link`         : (optional) PR / docs / issue URL — shown when the
     *                   feature is marked `status: "done"`. Replace the
     *                   placeholder PR-search links below with the exact
     *                   pull-request URL once it is merged.
     *  `image`        : (optional) path to a preview/banner image (e.g. a
     *                   screenshot or announcement graphic) that is shown
     *                   below the feature's text as a rounded thumbnail.
     *  `imageAlt`     : (optional) alt text for the image.
     * ─────────────────────────────────────────────────────────────────────
     */
    features: [
      {
        platform: "Appwrite",
        title: "getPhoto() — OAuth avatar fetching",
        description:
          "Implemented the getPhoto() method to fetch avatar links related to OAuth providers from the Appwrite backend.",
        status: "done",
        link: "https://github.com/appwrite/appwrite/pulls?q=avatar+oauth",
        image: "/images/get-photo.jpg",
        imageAlt:
          "Appwrite functionality — getPhoto method for universal avatar fetching across all user profile sources",
      },
      {
        platform: "Cloudflare",
        title: "Cloudflare OAuth2 provider",
        description:
          "Added Cloudflare as an OAuth2 authentication provider in the Appwrite backend.",
        status: "done",
        link: "https://github.com/appwrite/appwrite/pulls?q=cloudflare+oauth",
        image: "/images/cloudflare-add.png",
        imageAlt:
          "Cloudflare is now on Appwrite — manage DNS, Workers, R2 and more from your Appwrite project",
      },
      {
        platform: "Appwrite",
        title: "setPhoto() — direct photo upload",
        description:
          "Building setPhoto() to let users upload any photo directly to the Appwrite backend — removing the storage management hassle for developers.",
        status: "pending",
        image: "/images/set-photo.jpg",
        imageAlt:
          "Appwrite functionality — setPhoto method for direct photo uploading to the Appwrite backend",
      },
      {
        platform: "Appwrite",
        title: "OTP — Email verification, Password reset & Teams Invite",
        description:
          "Extending Appwrite's verification system with an OTP method (code-based) for Email verification, Password reset, and the Teams Invite API — an alternative to magic-URL verification that is hard to implement on mobile apps relying on deep links.",
        status: "pending",
        image: "/images/otp.jpg",
        imageAlt:
          "Appwrite functionality — OTP (one-time password) support for Password Reset and Email Verification, with enhanced security for account actions",
      },
      {
        platform: "Vercel",
        title: "Vercel integration",
        description:
          "Add an integration with Vercel so developers can use Vercel's features while keeping Appwrite as their primary backend.",
        status: "pending",
      },
      {
        platform: "Supabase",
        title: "Supabase integration",
        description:
          "Add an integration with Supabase so developers can use Supabase's features while keeping Appwrite as their primary backend.",
        status: "pending",
      },
      {
        platform: "Netlify",
        title: "Netlify integration",
        description:
          "Add an integration with Netlify so developers can use Netlify's features while keeping Appwrite as their primary backend.",
        status: "pending",
      },
      {
        platform: "Firebase",
        title: "Firebase integration",
        description:
          "Add an integration with Firebase so developers can use Firebase's features while keeping Appwrite as their primary backend.",
        status: "pending",
      },
    ],
  },
  {
    company: "UniferaIT",
    role: "Mobile App Developer Intern",
    duration: "August 3 - September 12, 2026",
    logo: "https://avatar.vercel.sh/UniferaIT",
    points: [
      "Internship focused on building the company's own multi-tenant HRMS (Human Resource Management System) mobile application.",
      "Developed core features of a multi-tenant HRMS mobile app, handling tenant isolation and shared backend infrastructure.",
      "Gained hands-on experience with multi-tenant architecture and production mobile app development.",
    ],
  },
  {
    company: "FocusBear",
    role: "Mobile App Developer Intern",
    duration: "November 2025 - January 2026",
    logo: "/avatars/focusbear.png",
    points: [
      "Mobile app development internship focused on building productivity tools and enhancing user experiences using React Native.",
      "Developing high-quality features and optimizing performance for the mobile application.",
      "Collaborating with the design and engineering teams to implement modern UI/UX patterns.",
    ],
    website: "https://www.focusbear.io/",
    recommendation: "https://www.focusbear.io/certificate/imtiaz-royhan",
  },
];

export const education = [
  {
    school: "International Islamic University Chittagong",
    degree: "Bachelor of Science in CSE",
    duration: "2023 - 2026",
    logo: "/avatars/iiuc.png",
  },
  {
    school: "BAF Shaheen College",
    degree: "Higher Secondary School Certificate",
    duration: "2021 - 2022",
    logo: "/avatars/baf.png",
  },
];

export const projects = [
  {
    year: "2026",
    role: "Open Claude",
    company: "Open source alternative to Claude's workspace",
    description:
      "Virtual Workspace in your browser. Sandbox any js framework project in your browser without any setup. Complete workspace with every tool that Claude uses with any LLM of your choice.",
    tech: ["Remix", "Vite"],
    links: {
      github: "https://github.com/imtia33/Open_Claude",
    },
    image: "/images/open-claude.png",
  },
  {
    year: "2026",
    role: "DrawSync",
    company: "Realtime drawing collaboration",
    description:
      "A high-performance collaborative drawing application featuring real-time synchronization powered by SignalR. Seamlessly integrated with Appwrite for user authentication and drawing persistence, allowing multiple users to create and edit art together in real-time.",
    tech: ["Dotnet", "Appwrite", "SignalR"],
    links: {
      github: "https://github.com/imtia33/DrawSync",
    },
    image: "/images/drawsync.png",
  },
  {
    year: "2026",
    role: "Bridge Marketing",
    company: "Business Landing Page",
    description:
      "Modern, high-converting landing page for a marketing agency, currently in active development using Next.js and Framer Motion.",
    tech: ["Next.js", "Framer Motion", "Tailwind CSS"],
    links: {
      live: "https://bridgemrkting.vercel.app/",
    },
    image: "/images/bridge-marketing.png",
  },
  {
    year: "2026",
    role: "Appwrite Native",
    company: "Unofficial mobile Client",
    description:
      "A native mobile application for managing Appwrite projects efficiently, providing a smoother experience for developers.",
    tech: ["React Native", "Appwrite", "Mobile"],
    links: {
      github: "https://github.com/imtia33/Appwrite-Native",
    },
    image: "/images/appwrite-native.png",
  },
  {
    year: "2026",
    role: "ClassRep",
    company: "Classroom Management App",
    description:
      "A comprehensive classroom management system built with Next.js and Appwrite, featuring real-time updates and seamless student-teacher interaction.",
    tech: ["Next.js", "Appwrite", "Tailwind CSS"],
    links: {
      github: "https://github.com/imtia33/ClassRep",
      live: "https://classrep.appwrite.network",
    },
    image: "/images/classrep.png",
  },
  {
    year: "2025",
    role: "PRIM",
    company: "Github Assistant Web App",
    description:
      "A github assistant web app that helps you contribute better in github by documenting your PULL request, Reviewing PRs etc.",
    tech: ["React Native", "Appwrite", "JavaScript"],
    links: {
      github: "https://github.com/imtia33/PRIM",
      live: "https://prim.appwrite.network/",
    },
    image: "/images/prim.png",
  },

  {
    year: "2024",
    role: "Crimson",
    company: "Blood Donation App",
    description:
      "An android and IOS based app for blood donation, helping connect donors with those in need.",
    tech: ["React Native", "Appwrite", "JavaScript"],
    links: {
      github: "https://github.com/imtia33/Crimson",
    },
    image: "/images/crimson.png",
  },
  {
    year: "2024",
    role: "TravX",
    company: "Local Routing App",
    description:
      "A local routing app helping people travel easily with directions, maps, and local vehicle fare data.",
    tech: ["React Native", "Appwrite", "JavaScript"],
    links: {
      github: "https://github.com/imtia33/TravelMate",
    },
    image: "/images/travx.png",
  },
  {
    year: "2023",
    role: "Chat App",
    company: "University Project",
    description:
      "A secure and efficient chat application developed using C++ and the QT framework.",
    tech: ["C++", "QT"],
    links: {
      github: "https://github.com/imtia33/Projects/tree/main/pro%20back",
    },
    image: "/images/chat-app.png",
  },
];

export const techStack = [
  {
    name: "Languages",
    items: [
      {
        icon: "devicon:c",
        name: "C",
      },
      {
        icon: "devicon:cplusplus",
        name: "C++",
      },
      {
        icon: "devicon:java",
        name: "Java",
      },
      {
        icon: "devicon:javascript",
        name: "JavaScript",
      },
      {
        icon: "devicon:mysql",
        name: "SQL",
      },
    ],
  },
  {
    name: "Frontend",
    items: [
      {
        icon: "devicon:nextjs",
        name: "Next.js",
      },
      {
        icon: "devicon:react",
        name: "React",
      },
      {
        icon: "devicon:react",
        name: "React Native",
      },
      {
        icon: "devicon:vitejs",
        name: "Vite",
      },
      {
        icon: "devicon:qt",
        name: "QT",
      },
      {
        icon: "devicon:figma",
        name: "Figma",
      },
      {
        icon: "devicon:tailwindcss",
        name: "TailwindCSS",
      },
      {
        icon: "simple-icons:tailwindcss",
        name: "NativeWind",
        invert: true,
      },
      {
        icon: "simple-icons:shadcnui",
        name: "shadcn/ui",
        invert: true,
      },
      {
        icon: "simple-icons:expo",
        name: "Expo",
        invert: true,
      },
      {
        icon: "simple-icons:gsap",
        name: "GSAP",
      },
      {
        icon: "logos:framer",
        name: "Framer Motion",
      },
    ],
  },
  {
    name: "Backend",
    items: [
      {
        icon: "devicon:nodejs",
        name: "Node.js",
      },
    ],
  },
  {
    name: "Database",
    items: [
      {
        icon: "devicon:mysql",
        name: "SQL",
      },
      {
        icon: "devicon:mongodb",
        name: "MongoDB",
      },
      {
        icon: "devicon:appwrite",
        name: "Appwrite",
      },
    ],
  },
  {
    name: "Self hosting",
    items: [
      {
        icon: "mdi:map-marker-path",
        name: "MapTiler Server",
        invert: true,
      },
      {
        icon: "openmoji:openstreetmap",
        name: "OSM",
      },
      {
        icon: "devicon:docker",
        name: "Docker",
      },
    ],
  },
  {
    name: "Entertainment",
    items: [
      {
        icon: "simple-icons:espressif",
        name: "ESP32",
        invert: true,
      },
      {
        icon: "devicon:arduino",
        name: "Arduino",
      },
    ],
  },
];
