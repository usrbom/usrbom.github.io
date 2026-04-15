import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ThemeProvider from "@/components/ThemeProvider";
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

// Prefer env-provided ID but default to the site's GA property so analytics is always wired
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-0KN3K9DJTF";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-pale-gray dark:bg-dark-bg" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} bg-pale-gray font-body text-charcoal antialiased dark:bg-dark-bg dark:text-pale-gray`}
      >
        <ThemeProvider>
          {GA_MEASUREMENT_ID ? (
            <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
          ) : null}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
