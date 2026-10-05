import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JIET Exam Prep",
  description: "Semester-wise syllabus, notes, important questions and PYQs for JIET students.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
