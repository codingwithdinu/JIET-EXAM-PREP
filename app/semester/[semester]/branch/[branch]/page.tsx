import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, FlaskConical, GraduationCap, Layers3 } from "lucide-react";
import { getBranches, getSubjects, semesters } from "@/lib/data";

export function generateStaticParams() {
  return semesters.flatMap((semester) =>
    semester.number >= 3
      ? getBranches().map((branch) => ({ semester: String(semester.number), branch: branch.slug }))
      : [],
  );
}

export default async function BranchPage({ params }: { params: Promise<{ semester: string; branch: string }> }) {
  const { semester: semesterParam, branch: branchSlug } = await params;
  const number = Number(semesterParam);
  const semester = semesters.find((item) => item.number === number);
  const branch = getBranches().find((item) => item.slug === branchSlug);

  if (!semester || !branch || number < 3) notFound();

  const subjects = getSubjects(number, branch.slug);

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
      <header className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-5 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-slate-500">
            <Link href="/" className="hover:text-slate-950">Home</Link><span>/</span>
            <Link href={`/semester/${number}`} className="hover:text-slate-950">{semester.title}</Link><span>/</span>
            <span className="text-slate-950">{branch.code}</span>
          </div>
          <div className="mt-8 flex items-start gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-slate-950 text-white"><GraduationCap size={25} /></div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-600">{semester.title} · Branch</p>
              <h1 className="mt-1 text-4xl font-black tracking-tight">{branch.name}</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Choose a subject or directly open your study resources.</p>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="mt-12 flex items-end justify-between gap-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-600">Subjects</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">Subjects for {branch.code}</h2>
          </div>
          <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-500 ring-1 ring-slate-200">{subjects.length} subjects</span>
        </div>

        {subjects.length ? (
          <div className="mt-8 space-y-10">
            {(["theory", "lab", "other"] as const).map((kind) => {
              const grouped = subjects.filter((subject) => subject.kind === kind);
              if (!grouped.length) return null;

              const meta = kind === "theory"
                ? { title: "Theory Subjects", subtitle: "Core and elective theory subjects", icon: Layers3 }
                : kind === "lab"
                  ? { title: "Practical / Lab Subjects", subtitle: "Laboratory courses and practical work", icon: FlaskConical }
                  : { title: "Other Academic Courses", subtitle: "MOOC, AEC, SEC, VAC and training components", icon: BookOpen };

              const Icon = meta.icon;

              return (
                <section key={kind}>
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-white"><Icon size={19} /></div>
                    <div>
                      <h3 className="text-xl font-black">{meta.title}</h3>
                      <p className="text-sm text-slate-500">{meta.subtitle}</p>
                    </div>
                    <span className="ml-auto rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-500 ring-1 ring-slate-200">{grouped.length}</span>
                  </div>

                  <div className="mt-5 grid gap-5 md:grid-cols-2">
                    {grouped.map((subject) => (
                      <div key={subject.slug} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">
                        <div className="flex items-start justify-between gap-5">
                          <Link href={`/semester/${number}/branch/${branch.slug}/${subject.slug}`} className="group min-w-0 flex-1">
                            <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">{subject.code}</span>
                            <h4 className="mt-4 text-xl font-black tracking-tight">{subject.name}</h4>
                            <p className="mt-2 text-sm leading-6 text-slate-500">{subject.description}</p>
                            <p className="mt-4 text-xs font-bold text-slate-400">Notes · Important Questions · PYQs</p>
                          </Link>
                          <a
                            href={`https://drive.google.com/drive/u/0/search?q=${encodeURIComponent(subject.name)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${subject.name} in Google Drive`}
                            className="group/drive grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-slate-950 text-white transition hover:scale-105 hover:bg-slate-800"
                          >
                            <ArrowRight size={18} className="transition group-hover/drive:translate-x-0.5" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <BookOpen className="mx-auto text-slate-300" size={30} />
            <h3 className="mt-4 text-lg font-black">Branch content coming soon</h3>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">The branch structure is ready. Subjects and Google Drive resources can now be added without changing the website architecture.</p>
          </div>
        )}

        <Link href={`/semester/${number}`} className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-950">
          <ArrowLeft size={15} /> Change branch
        </Link>
      </section>
    </main>
  );
}
