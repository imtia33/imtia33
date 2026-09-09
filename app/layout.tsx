import type React from "react";
import type { Metadata, Viewport } from "next";
import { Geist, Almarai, Playfair_Display } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const almarai = Almarai({
  weight: ["300", "400", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-almarai",
});

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

/**
 * Root layout — max SEO metadata + KaTeX stylesheet for blog math.
 *
 * `metadataBase` is REQUIRED for relative OG/Twitter image URLs to resolve
 * correctly and for canonical URLs to work. Update SITE_URL to your
 * production domain (Vercel auto-sets `NEXT_PUBLIC_SITE_URL` if configured).
 */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://imtia33.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Imtiaz Royhan | App Developer",
    template: "%s | Imtiaz Royhan",
  },
  description:
    "I am Imtiaz Royhan, a passionate App Developer specializing in building high-quality mobile and web applications with React Native and Appwrite. Explore my work, experience, and articles.",
  applicationName: "Imtiaz Royhan Portfolio",
  authors: [{ name: "Imtiaz Royhan", url: "https://imtia33.github.io" }],
  creator: "Imtiaz Royhan",
  publisher: "Imtiaz Royhan",
  keywords: [
    "Imtiaz Royhan",
    "App Developer",
    "React Native Developer",
    "Appwrite Contributor",
    "Mobile App Developer Bangladesh",
    "Backend Contributor",
    "React Native",
    "Appwrite",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "Software Engineer",
  ],
  category: "technology",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/axistro.png",
    apple: "/axistro.png",
  },
  openGraph: {
    title: "Imtiaz Royhan | App Developer",
    description:
      "Passionate App Developer specializing in high-quality mobile and web applications with React Native and Appwrite. Explore my work, experience, and articles.",
    url: SITE_URL,
    siteName: "Imtiaz Royhan",
    images: [
      {
        url: "/profile.png",
        width: 1200,
        height: 630,
        alt: "Imtiaz Royhan — App Developer & Appwrite Contributor",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Imtiaz Royhan | App Developer",
    description:
      "Passionate App Developer specializing in high-quality mobile and web applications. Explore my work, experience, and articles.",
    images: ["/profile.png"],
    creator: "@imtia33",
  },
  verification: {
    // Add your Google Search Console verification token here when you have one:
    // google: "your-google-verification-token",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ecf4f0" },
    { media: "(prefers-color-scheme: dark)", color: "#060a11" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${almarai.variable} ${playfair.variable}`}>
      <head>
        {/* KaTeX stylesheet for blog math (rendered server-side via rehype-katex) */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"
          integrity="sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+"
          crossOrigin="anonymous"
        />
        {/* JSON-LD: Person + WebSite structured data for rich Google results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": `${SITE_URL}/#person`,
                  name: "Imtiaz Royhan",
                  url: SITE_URL,
                  image: `${SITE_URL}/profile.png`,
                  jobTitle: "App Developer",
                  description:
                    "App Developer specializing in React Native and Appwrite. Backend Contributor at Appwrite.",
                  sameAs: [
                    "https://github.com/imtia33",
                    "https://matejbaco.eu",
                  ],
                  knowsAbout: [
                    "React Native",
                    "Appwrite",
                    "Next.js",
                    "TypeScript",
                    "Mobile App Development",
                    "Backend Engineering",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: "Imtiaz Royhan",
                  publisher: { "@id": `${SITE_URL}/#person` },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: `${SITE_URL}/blog?q={search_term_string}`,
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "Blog",
                  "@id": `${SITE_URL}/blog/#blog`,
                  url: `${SITE_URL}/blog`,
                  name: "Imtiaz Royhan — Blog",
                  publisher: { "@id": `${SITE_URL}/#person` },
                  description:
                    "Articles on Appwrite, React Native, caching, delta sync, and backend engineering.",
                },
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
