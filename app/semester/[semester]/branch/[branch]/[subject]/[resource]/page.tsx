import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, FileQuestion, FileText, FlaskConical, LibraryBig } from "lucide-react";
import { getBranches, getSubject, getSubjects, semesters } from "@/lib/data";

const resourceMap = {
  notes: { title: "Notes", icon: FileText, description: "Unit-wise notes and focused revision material." },
  "lab-notes": { title: "Lab Notes", icon: FlaskConical, description: "Lab records, programs, experiments and viva preparation." },
  "important-questions": { title: "Important Questions", icon: FileQuestion, description: "Exam-focused questions arranged by unit and marks." },
  pyq: { title: "PYQs", icon: LibraryBig, description: "Previous year and internal examination papers." },
} as const;

export function generateStaticParams() {
  return semesters.flatMap((semester) =>
    semester.number >= 3
      ? getBranches().flatMap((branch) =>
          getSubjects(semester.number, branch.slug).flatMap((subject) =>
            Object.keys(resourceMap).map((resource) => ({
              semester: String(semester.number), branch: branch.slug, subject: subject.slug, resource,
            })),
          ),
        )
      : [],
  );
}

export default async function BranchResourcePage({ params }: { params: Promise<{ semester: string; branch: string; subject: string; resource: string }> }) {
  const { semester: semesterParam, branch: branchSlug, subject: subjectSlug, resource } = await params;
  const number = Number(semesterParam);
  const semester = semesters.find((item) => item.number === number);
  const branch = getBranches().find((item) => item.slug === branchSlug);
  const subject = getSubject(number, branchSlug, subjectSlug);
  const data = resourceMap[resource as keyof typeof resourceMap];

  if (!semester || !branch || !subject || !data || number < 3) notFound();

  const Icon = data.icon;

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
      <header className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-5 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-slate-500">
            <Link href="/" className="hover:text-slate-950">Home</Link><span>/</span>
            <Link href={`/semester/${number}`} className="hover:text-slate-950">{semester.title}</Link><span>/</span>
            <Link href={`/semester/${number}/branch/${branch.slug}`} className="hover:text-slate-950">{branch.code}</Link><span>/</span>
            <Link href={`/semester/${number}/${branch.slug}/${subject.slug}`} className="hover:text-slate-950">{subject.code}</Link><span>/</span>
            <span className="text-slate-950">{data.title}</span>
          </div>
        </div>
      </header>
      <section className="mx-auto max-w-5xl px-5 py-14 lg:px-8">
        <div className="rounded-[32px] bg-slate-950 p-7 text-white shadow-2xl shadow-slate-950/10 sm:p-10">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-slate-950"><Icon size={25} /></div>
          <p className="mt-7 text-xs font-black uppercase tracking-[0.18em] text-indigo-300">{subject.code} · {branch.code} · {semester.title}</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight">{data.title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">{data.description}</p>
        </div>
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-50 ring-1 ring-slate-200"><Icon size={24} /></div>
          <h2 className="mt-5 text-xl font-black">Google Drive content will appear here</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">This {data.title.toLowerCase()} section is ready. We will connect the matching branch/semester/subject Drive folder in the content integration phase.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href={`/semester/${number}/${branch.slug}/${subject.slug}`} className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-extrabold text-white"><ArrowLeft size={15} /> Back to subject</Link>
            <button disabled className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-extrabold text-slate-400"><ExternalLink size={15} /> Drive coming soon</button>
          </div>
        </div>
      </section>
    </main>
  );
}
