import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, GraduationCap } from "lucide-react";
import ResourceButtons from "@/components/ResourceButtons";
import { getSubjects, semesters } from "@/lib/data";

export function generateStaticParams() {
  return semesters.map((semester) => ({ semester: String(semester.number) }));
}

export default async function SemesterPage({ params }: { params: Promise<{ semester: string }> }) {
  const { semester: semesterParam } = await params;
  const number = Number(semesterParam);
  const semester = semesters.find((item) => item.number === number);
  const subjects = getSubjects(number);

  if (!semester) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f7f8fc] px-5">
        <div className="text-center">
          <h1 className="text-3xl font-black">Semester not found</h1>
          <Link href="/" className="mt-5 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white">Back home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
      <header className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-5 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-950">
            <ArrowLeft size={16} /> Back to home
          </Link>
          <div className="mt-8 flex items-start gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-slate-950 text-white">
              <GraduationCap size={25} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-600">JIET Exam Prep</p>
              <h1 className="mt-1 text-4xl font-black tracking-tight">{semester.title}</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{semester.description}</p>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-600">Study resources</p>
            <h2 className="mt-1 text-xl font-black">What do you want to study?</h2>
          </div>
          <ResourceButtons semester={number} />
        </div>

        <div className="mt-12 flex items-end justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-600">Subjects</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">Choose a subject</h2>
          </div>
          <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-500 ring-1 ring-slate-200">{subjects.length} subjects</span>
        </div>

        {subjects.length ? (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {subjects.map((subject) => (
              <div key={subject.slug} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">
                <Link href={`/semester/${number}/${subject.slug}`} className="group block">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">{subject.code}</span>
                      <h3 className="mt-4 text-xl font-black tracking-tight">{subject.name}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-500">{subject.description}</p>
                    </div>
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-slate-950 text-white transition group-hover:scale-105">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </Link>
                <div className="mt-6 border-t border-slate-100 pt-5">
                  <ResourceButtons semester={number} subject={subject.slug} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <BookOpen className="mx-auto text-slate-300" size={30} />
            <h3 className="mt-4 text-lg font-black">Content coming soon</h3>
            <p className="mt-2 text-sm text-slate-500">Subjects and their resources for this semester will be added here.</p>
          </div>
        )}
      </section>
    </main>
  );
}
