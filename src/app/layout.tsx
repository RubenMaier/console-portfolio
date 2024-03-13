import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ruben Maier Enzler",
  description: "Software Engineer",
  referrer: "origin-when-cross-origin",
  authors: [
    { name: "Rub" },
    { name: "Ruben Maier Enzler", url: "https://rub.dev" },
  ],
  keywords: [
    "TypeScript",
    "Developer",
    "Software",
    "Next",
    "AWS",
    "Nest",
    "Engineer",
    "React",
    "JavaScript",
  ],
  openGraph: {
    title: "Rub Portfolio",
    description: "Software Engineer",
    url: "https://rub.dev",
    images: "/og-image.png",
    siteName: "Ruben",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`cyber-background ${inter.className}`}>{children}</body>
    </html>
  );
}
