import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, GraduationCap } from "lucide-react";
import { getBranches, getSubject, getSubjects, semesters } from "@/lib/data";

export function generateStaticParams() {
  return semesters.flatMap((semester) =>
    semester.number >= 3
      ? getBranches().flatMap((branch) =>
          getSubjects(semester.number, branch.slug).map((subject) => ({
            semester: String(semester.number),
            branch: branch.slug,
            subject: subject.slug,
          })),
        )
      : [],
  );
}

export default async function BranchSubjectPage({
  params,
}: {
  params: Promise<{ semester: string; branch: string; subject: string }>;
}) {
  const { semester: semesterParam, branch: branchSlug, subject: subjectSlug } = await params;
  const number = Number(semesterParam);
  const semester = semesters.find((item) => item.number === number);
  const branch = getBranches().find((item) => item.slug === branchSlug);
  const subject = getSubject(number, branchSlug, subjectSlug);

  if (!semester || !branch || !subject || number < 3) notFound();

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
      <header className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-5 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-slate-500">
            <Link href="/" className="hover:text-slate-950">Home</Link>
            <span>/</span>
            <Link href={`/semester/${number}`} className="hover:text-slate-950">{semester.title}</Link>
            <span>/</span>
            <Link href={`/semester/${number}/branch/${branch.slug}`} className="hover:text-slate-950">{branch.code}</Link>
            <span>/</span>
            <span className="text-slate-950">{subject.code}</span>
          </div>

          <div className="mt-8 flex items-start gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-slate-950 text-white">
              <GraduationCap size={25} />
            </div>
            <div>
              <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-black text-indigo-700">{subject.code}</span>
              <h1 className="mt-3 text-4xl font-black tracking-tight">{subject.name}</h1>
              <p className="mt-2 text-sm font-semibold text-slate-500">{semester.title} · {branch.name}</p>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{subject.description}</p>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <a
            href={`https://drive.google.com/drive/u/0/search?q=${encodeURIComponent(subject.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-700 ring-1 ring-slate-200">
              <ExternalLink size={19} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-black">Open {subject.code} in Google Drive</p>
              <p className="mt-1 truncate text-xs text-slate-500">Search study material for {subject.name}</p>
            </div>
            <ArrowRight className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-950" size={18} />
          </a>
        </div>

        <Link href={`/semester/${number}/branch/${branch.slug}`} className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-950">
          <ArrowLeft size={15} /> Back to {branch.code}
        </Link>
      </section>
    </main>
  );
}
