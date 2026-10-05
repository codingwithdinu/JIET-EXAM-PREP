import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, GraduationCap } from "lucide-react";
import { getSubject, getSubjects, semesters } from "@/lib/data";

export function generateStaticParams() {
  return semesters.flatMap((semester) =>
    getSubjects(semester.number).map((subject) => ({
      semester: String(semester.number),
      subject: subject.slug,
    })),
  );
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ semester: string; subject: string }>;
}) {
  const { semester: semesterParam, subject: subjectSlug } = await params;
  const semesterNumber = Number(semesterParam);
  const subject = getSubject(semesterNumber, undefined, subjectSlug);
  const semester = semesters.find((item) => item.number === semesterNumber);

  if (!subject || !semester) notFound();

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
      <header className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-5 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-slate-500">
            <Link href="/" className="hover:text-slate-950">Home</Link>
            <span>/</span>
            <Link href={`/semester/${semesterNumber}`} className="hover:text-slate-950">{semester.title}</Link>
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
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{subject.description}</p>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">


        <Link href={`/semester/${semesterNumber}`} className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-950">
          <ArrowLeft size={15} /> Back to {semester.title}
        </Link>
      </section>
    </main>
  );
}
