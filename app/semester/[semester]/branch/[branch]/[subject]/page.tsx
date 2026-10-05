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

const resources = [
  { title: "Notes", key: "notes", icon: FileText, text: "Unit-wise notes and focused revision material." },
  { title: "Lab Notes", key: "lab-notes", icon: FlaskConical, text: "Lab records, programs, experiments and viva preparation." },
  { title: "Important Questions", key: "important-questions", icon: FileQuestion, text: "Exam-focused questions arranged by unit and marks." },
  { title: "PYQs", key: "pyq", icon: LibraryBig, text: "Previous year and internal examination papers." },
];

export default async function BranchSubjectPage({ params }: { params: Promise<{ semester: string; branch: string; subject: string }> }) {
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
            <Link href="/" className="hover:text-slate-950">Home</Link><span>/</span>
            <Link href={`/semester/${number}`} className="hover:text-slate-950">{semester.title}</Link><span>/</span>
            <Link href={`/semester/${number}/branch/${branch.slug}`} className="hover:text-slate-950">{branch.code}</Link><span>/</span>
            <span className="text-slate-950">{subject.code}</span>
          </div>
          <div className="mt-8 flex items-start gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-slate-950 text-white"><GraduationCap size={25} /></div>
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
                  <ArrowRight size={18} className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-slate-950" />
                </div>
                <h3 className="mt-6 text-lg font-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{item.text}</p>
                <div className="mt-5 text-xs font-black uppercase tracking-wider text-indigo-600">Open resource</div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <a
            href={`https://drive.google.com/drive/u/0/search?q=${encodeURIComponent(subject.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-2xl bg-slate-950 px-5 py-4 text-white transition hover:bg-slate-800"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10">
              <ExternalLink size={19} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-black">Open {subject.code} in Google Drive</p>
              <p className="mt-1 truncate text-xs text-slate-400">Search study material for {subject.name}</p>
            </div>
            <ArrowRight className="text-slate-400 transition group-hover:translate-x-1" size={18} />
          </a>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-7">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-600">Unit roadmap</p>
          <h2 className="mt-2 text-2xl font-black">Study unit by unit</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {Array.from({ length: subject.units }, (_, index) => (
              <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-black text-slate-400">UNIT {index + 1}</p>
                <p className="mt-2 text-sm font-black">Content will be linked</p>
                <p className="mt-1 text-xs text-slate-500">Notes · Lab Notes · PYQs</p>
              </div>
            ))}
          </div>
        </div>

        <Link href={`/semester/${number}/branch/${branch.slug}`} className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-950">
          <ArrowLeft size={15} /> Back to {branch.code}
        </Link>
      </section>
    </main>
  );
}
