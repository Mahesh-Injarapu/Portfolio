import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Mahesh Injarapu | Full Stack Web Developer & AI Engineer",
  description: "Personal 3D portfolio of Mahesh Injarapu, a Computer Science Engineering student specializing in AI & ML. Showcasing computer vision air mouse, speech assistant systems, and Next.js applications.",
  keywords: [
    "Mahesh Injarapu",
    "Full Stack Developer",
    "AI Engineer",
    "Python Developer",
    "Computer Science Student",
    "Dr.RVR NRI Institute of Technology Deemed to be University",
    "AI Air Mouse",
    "Jarvis AI Assistant",
    "3D Portfolio"
  ],
  authors: [{ name: "Mahesh Injarapu" }],
  creator: "Mahesh Injarapu",
  openGraph: {
    title: "Mahesh Injarapu | Portfolio",
    description: "Computer Science Engineering student specializing in AI & ML. Designing modern web apps and developing AI solutions.",
    url: "https://github.com/Mahesh-Injarapu",
    siteName: "Mahesh Injarapu Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahesh Injarapu | Portfolio",
    description: "Computer Science Engineering student specializing in AI & ML.",
    creator: "@Mahesh_Injarapu",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} antialiased bg-[#020205] text-[#e2e8f0]`}>
        {children}
      </body>
    </html>
  );
}
