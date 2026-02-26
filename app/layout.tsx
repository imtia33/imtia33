import type React from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Imtiaz Royhan | App Developer",
  description:
    "I am Imtiaz Royhan, a passionate App Developer specializing in building high-quality mobile and web applications. Explore my work and experience.",
  icons: {
    icon: "/axistro.png",
  },
  openGraph: {
    title: "Imtiaz Royhan | App Developer",
    description:
      "I am Imtiaz Royhan, a passionate App Developer specializing in building high-quality mobile and web applications. Explore my work and experience.",
    images: [
      {
        url: "/profile.png",
        width: 1200,
        height: 630,
        alt: "Imtiaz Royhan - Portfolio Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Imtiaz Royhan | App Developer",
    description:
      "I am Imtiaz Royhan, a passionate App Developer specializing in building high-quality mobile and web applications. Explore my work and experience.",
    images: ["/profile.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
