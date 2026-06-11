import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// @ts-ignore
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gabes Is Suffocating — An Interactive Story",
  description: "For 53 years, a Tunisian city has been slowly poisoned by industrial chemicals. No one came to help. This is the story the world forgot — until the people refused to stay silent. An immersive, interactive storytelling experience about the environmental crisis in Gabes, Tunisia.",
  keywords: ["Gabes", "Tunisia", "pollution", "environmental crisis", "phosphate", "GCT", "interactive story"],
  authors: [{ name: "Gabes Story Project" }],
  openGraph: {
    title: "Gabes Is Suffocating",
    description: "An interactive story about the environmental crisis in Gabes, Tunisia",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
