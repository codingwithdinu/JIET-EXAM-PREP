"use client";

import Link from "next/link";
import { FileQuestion, FileText, FlaskConical, LibraryBig } from "lucide-react";

const resources = [
  { key: "notes", label: "Notes", icon: FileText },
  { key: "lab-notes", label: "Lab Notes", icon: FlaskConical },
  { key: "important-questions", label: "Important Questions", icon: FileQuestion },
  { key: "pyq", label: "PYQs", icon: LibraryBig },
];

export default function ResourceButtons({
  semester,
  subject,
  branch,
}: {
  semester: number;
  subject?: string;
  branch?: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {resources.map((item) => {
        const Icon = item.icon;
        const base = branch
          ? `/semester/${semester}/branch/${branch}`
          : `/semester/${semester}`;
        const href = subject
          ? branch
            ? `${base}/${subject}/${item.key}`
            : `${base}/${subject}/${item.key}`
          : `${base}?resource=${item.key}`;

        return (
          <Link key={item.key} href={href} className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-center text-xs font-extrabold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 hover:shadow-md sm:text-sm">
            <Icon size={16} className="shrink-0 text-indigo-600 transition group-hover:scale-105" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
