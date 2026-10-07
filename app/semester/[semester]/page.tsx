import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import { getBranches, getSubjects, semesters } from "@/lib/data";

export function generateStaticParams() {
  return [...semesters.map((s) => ({ semester: String(s.number) })), { semester: "1-2" }];
}

export default async function SemesterPage({
  params,
}: {
  params: Promise<{ semester: string }>;
}) {
  const { semester: semesterParam } = await params;
  const common = semesterParam === "1-2";
  const number = common ? 1 : Number(semesterParam);

  const semester = common
    ? {
        title: "Semester 1 & 2",
        description: "Common foundation syllabus for the first year.",
      }
    : semesters.find((s) => s.number === number);

  if (!semester) {
    return (
      <main className="grid min-h-screen place-items-center">
        <div className="text-center">
          <h1 className="text-3xl font-black">Semester not found</h1>
          <Link className="mt-4 inline-block font-bold" href="/">
            Back home
          </Link>
        </div>
      </main>
    );
  }

  const branches = getBranches();
  const subjects = common
    ? [...getSubjects(1), ...getSubjects(2)]
    : getSubjects(number);

  const foundationSubjects = common
    ? subjects.filter((subject) => subject.kind !== "lab")
    : subjects;

  const labSubjects = common
    ? Array.from(
        new Map(
          subjects
            .filter((subject) => subject.kind === "lab")
            .map((subject) => [subject.name, subject])
        ).values()
      )
    : [];

  const renderSubjectCards = (items: typeof subjects) => (
    <div className="mt-7 grid gap-4 md:grid-cols-2">
      {items.map((s) => (
        <article
          key={s.slug}
          className="group relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
        >
          <Link
            href={`/semester/${number}/${s.slug}`}
            className="block pr-14"
          >
            <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black text-slate-600">
              {s.code}
            </span>
            <h3 className="mt-4 text-lg font-black tracking-tight">
              {s.name}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {s.description}
            </p>
          </Link>

          <a
            href={
              s.driveUrl ||
              `https://drive.google.com/drive/u/0/search?q=${encodeURIComponent(s.name)}`
            }
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${s.name} in Google Drive`}
            title="Open in Google Drive"
            className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-xl bg-slate-950 text-white transition hover:scale-105 hover:bg-indigo-600"
          >
            <ArrowRight size={16} />
          </a>
        </article>
      ))}
    </div>
  );

  const renderEmpty = () => (
    <div className="mt-7 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
      <BookOpen className="mx-auto text-slate-300" />
      <h3 className="mt-4 font-black">Subjects coming soon</h3>
      <p className="mt-2 text-sm text-slate-500">
        This semester structure is ready for academic content.
      </p>
    </div>
  );

  const branchSection =
    !common && number >= 3 ? (
      <>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[.18em] text-indigo-600">
              Select branch
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Continue with your branch
            </h2>
          </div>
          <span className="hidden rounded-full bg-white px-3 py-2 text-[11px] font-bold text-slate-400 ring-1 ring-slate-200 sm:block">
            {branches.length} branches
          </span>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {branches.map((b) => (
            <Link
              key={b.slug}
              href={`/semester/${number}/branch/${b.slug}`}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <span className="text-[10px] font-black uppercase tracking-[.15em] text-indigo-600">
                {b.code}
              </span>
              <h3 className="mt-4 min-h-12 text-base font-black leading-6">
                {b.name}
              </h3>
              <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-xs font-bold text-slate-400">
                  Open branch
                </span>
                <ArrowRight
                  size={16}
                  className="text-slate-300 group-hover:translate-x-1 group-hover:text-slate-950"
                />
              </div>
            </Link>
          ))}
        </div>
      </>
    ) : (
      <>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[.18em] text-indigo-600">
              Subjects
            </p>
            <h2 className="mt-2 text-2xl font-black">Foundation subjects</h2>
          </div>
          <span className="rounded-full bg-white px-3 py-2 text-[11px] font-bold text-slate-400 ring-1 ring-slate-200">
            {foundationSubjects.length} subjects
          </span>
        </div>

        {foundationSubjects.length > 0 ? renderSubjectCards(foundationSubjects) : renderEmpty()}

        {common && (
          <div className="mt-14">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[.18em] text-indigo-600">
                  Practical courses
                </p>
                <h2 className="mt-2 text-2xl font-black">Laboratory & Practical Courses</h2>
                <p className="mt-2 text-sm text-slate-500">
                  All first-year lab and practical subjects are grouped here.
                </p>
              </div>
              <span className="rounded-full bg-white px-3 py-2 text-[11px] font-bold text-slate-400 ring-1 ring-slate-200">
                {labSubjects.length} labs
              </span>
            </div>

            {labSubjects.length > 0 ? renderSubjectCards(labSubjects) : renderEmpty()}
          </div>
        )}
      </>
    );

  return (
    <main className="min-h-screen bg-[#f6f7fb]">
      <SiteHeader />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-10 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-400 hover:text-slate-900"
          >
            <ArrowLeft size={14} /> Home
          </Link>

          <div className="mt-8 max-w-3xl">
            <p className="text-[11px] font-black uppercase tracking-[.18em] text-indigo-600">
              Semester portal
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-[-.04em] sm:text-5xl">
              {semester.title}
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              {semester.description}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-12 lg:px-8">
        {branchSection}

        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 text-xs font-extrabold text-slate-400 hover:text-slate-900"
        >
          <ArrowLeft size={14} /> Back to semesters
        </Link>
      </section>
    </main>
  );
}
