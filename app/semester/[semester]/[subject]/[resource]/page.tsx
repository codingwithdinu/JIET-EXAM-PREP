import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, FileQuestion, FileText, FlaskConical, LibraryBig } from "lucide-react";
import { getSubject, getSubjects, semesters } from "@/lib/data";

const resourceMap = {
  notes: { title: "Notes", icon: FileText, description: "Unit-wise notes and focused revision material." },
  "lab-notes": { title: "Lab Notes", icon: FlaskConical, description: "Lab records, programs, experiments and viva preparation." },
  "important-questions": { title: "Important Questions", icon: FileQuestion, description: "Exam-focused questions arranged by unit and marks." },
  pyq: { title: "PYQs", icon: LibraryBig, description: "Previous year and internal examination papers." },
} as const;

type ResourceKey = keyof typeof resourceMap;

export function generateStaticParams() {
  return semesters.flatMap((semester) =>
    getSubjects(semester.number).flatMap((subject) =>
      (Object.keys(resourceMap) as ResourceKey[]).map((resource) => ({
        semester: String(semester.number),
        subject: subject.slug,
        resource,
      })),
    ),
  );
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ semester: string; subject: string; resource: string }>;
}) {
  const { semester: semesterParam, subject: subjectSlug, resource } = await params;
  const semesterNumber = Number(semesterParam);

  // Legacy non-branch route: branch is intentionally undefined.
  const subject = getSubject(semesterNumber, undefined, subjectSlug);
  const semester = semesters.find((item) => item.number === semesterNumber);
  const resourceData = resourceMap[resource as ResourceKey];

  if (!subject || !semester || !resourceData) notFound();

  const Icon = resourceData.icon;

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
      <header className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-5 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-slate-500">
            <Link href="/" className="hover:text-slate-950">Home</Link>
            <span>/</span>
            <Link href={`/semester/${semesterNumber}`} className="hover:text-slate-950">{semester.title}</Link>
            <span>/</span>
            <Link href={`/semester/${semesterNumber}/${subject.slug}`} className="hover:text-slate-950">{subject.code}</Link>
            <span>/</span>
            <span className="text-slate-950">{resourceData.title}</span>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-5 py-14 lg:px-8">
        <div className="rounded-[32px] bg-slate-950 p-7 text-white shadow-2xl shadow-slate-950/10 sm:p-10">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-slate-950">
            <Icon size={25} />
          </div>
          <p className="mt-7 text-xs font-black uppercase tracking-[0.18em] text-indigo-300">{subject.code} · {semester.title}</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight">{resourceData.title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">{resourceData.description}</p>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-50 ring-1 ring-slate-200">
            <Icon size={24} />
          </div>
          <h2 className="mt-5 text-xl font-black">Google Drive content will appear here</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
            This resource page is ready. In the next phase, we will connect the matching Google Drive folder so PDFs and study material appear here automatically.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href={`/semester/${semesterNumber}/${subject.slug}`} className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-extrabold text-white">
              <ArrowLeft size={15} /> Back to subject
            </Link>
            <button disabled className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-extrabold text-slate-400">
              <ExternalLink size={15} /> Drive coming soon
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
