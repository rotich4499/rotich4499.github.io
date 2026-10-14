import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Charles Kipchumba Rotich | Computational Materials Researcher",
  description: "Charles Kipchumba Rotich is a materials scientist using first-principles calculations to study functional oxides for clean-energy applications.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
