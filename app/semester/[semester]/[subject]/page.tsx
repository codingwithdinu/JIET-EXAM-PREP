import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, FileQuestion, FileText, FlaskConical, GraduationCap, LibraryBig } from "lucide-react";
import ResourceButtons from "@/components/ResourceButtons";
import { getSubject, getSubjects, semesters } from "@/lib/data";

export function generateStaticParams() {
  return semesters.flatMap((semester) =>
    getSubjects(semester.number).map((subject) => ({
      semester: String(semester.number),
      subject: subject.slug,
    })),
  );
}

const resourceMeta = [
  { title: "Notes", icon: FileText, text: "Unit-wise notes and focused revision material." },
  { title: "Lab Notes", icon: FlaskConical, text: "Lab records, programs, experiments and viva preparation." },
  { title: "Important Questions", icon: FileQuestion, text: "Exam-focused questions arranged by unit and marks." },
  { title: "PYQs", icon: LibraryBig, text: "Previous year and internal examination papers." },
];

export default async function SubjectPage({ params }: { params: Promise<{ semester: string; subject: string }> }) {
  const { semester: semesterParam, subject: subjectSlug } = await params;
  const semesterNumber = Number(semesterParam);
  const subject = getSubject(semesterNumber, subjectSlug);
  const semester = semesters.find((item) => item.number === semesterNumber);

  if (!subject || !semester) notFound();

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
      <header className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-5 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-slate-500">
            <Link href="/" className="hover:text-slate-950">Home</Link><span>/</span>
            <Link href={`/semester/${semesterNumber}`} className="hover:text-slate-950">{semester.title}</Link><span>/</span>
            <span className="text-slate-950">{subject.code}</span>
          </div>
          <div className="mt-8 flex items-start gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-slate-950 text-white"><GraduationCap size={25} /></div>
            <div>
              <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-black text-indigo-700">{subject.code}</span>
              <h1 className="mt-3 text-4xl font-black tracking-tight">{subject.name}</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{subject.description}</p>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="rounded-3xl bg-slate-950 p-6 text-white sm:p-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Subject resources</p>
              <h2 className="mt-2 text-2xl font-black">Prepare {subject.code} your way</h2>
              <p className="mt-2 text-sm text-slate-400">{subject.units} units · Notes · Lab Notes · Important Questions · PYQs</p>
            </div>
            <Link href={`/semester/${semesterNumber}`} className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-black text-slate-950"><ArrowLeft size={15} /> All subjects</Link>
          </div>
          <div className="mt-6 max-w-3xl"><ResourceButtons semester={semesterNumber} subject={subject.slug} /></div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {resourceMeta.map((resource) => {
            const Icon = resource.icon;
            const key = resource.title === "Important Questions" ? "important-questions" : resource.title === "Lab Notes" ? "lab-notes" : resource.title === "PYQs" ? "pyq" : "notes";
            return (
              <Link href={`/semester/${semesterNumber}/${subject.slug}/${key}`} key={resource.title} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="flex items-start justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-50 ring-1 ring-slate-200"><Icon size={21} /></div>
                  <ArrowRight size={18} className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-slate-950" />
                </div>
                <h3 className="mt-6 text-lg font-black">{resource.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{resource.text}</p>
                <div className="mt-5 text-xs font-black uppercase tracking-wider text-indigo-600">Open resource</div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-7">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-600">Unit roadmap</p>
          <h2 className="mt-2 text-2xl font-black">Study unit by unit</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {Array.from({ length: subject.units }, (_, index) => (
              <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-black text-slate-400">UNIT {index + 1}</p>
                <p className="mt-2 text-sm font-black">Content will be linked</p>
                <p className="mt-1 text-xs text-slate-500">Notes · Questions · PYQs</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
