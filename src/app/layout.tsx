import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Buuk Admin Console",
  description:
    "Monitor survey progress, assignments, and communications across the Buuk platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
