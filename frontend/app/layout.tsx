import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const aaltoFont = localFont({
  src: "../public/fonts/aalto-display-personal-use.otf",
  variable: "--font-aalto-local",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Coding Club Events — Coming Soon",
  description: "Official Coding Club Events Platform — Season 2026. Hackathons, Workshops, Open Source Sprints & Keynotes.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.variable, spaceGrotesk.variable, aaltoFont.variable, "font-sans", geist.variable)}>
      <body className="antialiased bg-[#4a32f9] text-[#fdcdd7] min-h-screen flex flex-col justify-between selection:bg-[#fdcdd7] selection:text-[#4a32f9]">
        {children}
      </body>
    </html>
  );
}
