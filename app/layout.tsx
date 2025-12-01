import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Utkarsh Rawat | Product + AI",
  description:
    "Product-minded builder at the intersection of AI, design, and systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-pale-gray">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} bg-pale-gray font-body text-charcoal antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
