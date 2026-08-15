import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rhema Travel & Tours | Flight Booking",
  description: "Book flights worldwide with Rhema Travel & Tours.",
  keywords: ["Rhema Travel & Tours", "flight booking", "travel agency", "flights to London"],
  openGraph: {
    title: "Rhema Travel & Tours",
    description: "Search, compare and book flights worldwide with confidence.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
