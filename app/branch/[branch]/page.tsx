import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import { getBranches, getSubjects, semesters } from "@/lib/data";
import { getDriveUrl } from "@/lib/drive";

export function generateStaticParams() {
  return getBranches().map((branch) => ({ branch: branch.slug }));
}

export default async function BranchOverviewPage({
  params,
}: {
  params: Promise<{ branch: string }>; 
}) {
  const { branch: slug } = await params;
  const branch = getBranches().find((item) => item.slug === slug);
  if (!branch) notFound();

  const semesterGroups = await Promise.all(
    semesters.filter((semester) => semester.number >= 3).map(async (semester) => {
      const subjects = getSubjects(semester.number, slug);
      const withDrive = await Promise.all(subjects.map(async (subject) => ({
        subject,
        drive: await getDriveUrl(semester.number, slug, subject.slug, subject.driveUrl),
      })));
      return { semester, subjects: withDrive };
    })
  );

  const totalSubjects = semesterGroups.reduce((total, group) => total + group.subjects.length, 0);

  return (
    <main className="min-h-screen bg-[#f6f7fb]">
      <SiteHeader />
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-9 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-400">
            <Link href="/">Home</Link><span>/</span><span className="text-slate-800">{branch.code}</span>
          </div>
          <div className="mt-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[.18em] text-indigo-600">Branch subject library</p>
              <h1 className="mt-2 text-4xl font-black tracking-[-.04em]">{branch.name}</h1>
              <p className="mt-3 text-sm leading-6 text-slate-500">All available subjects from Semester 3 onwards for this branch.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
              <p className="text-2xl font-black">{totalSubjects}</p>
              <p className="text-[10px] font-black uppercase tracking-[.12em] text-slate-400">Total subjects</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1240px] px-5 py-12 lg:px-8">
        <div className="space-y-12">
          {semesterGroups.map(({ semester, subjects }) => (
            <section key={semester.number}>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[.18em] text-indigo-600">Semester {semester.number}</p>
                  <h2 className="mt-2 text-2xl font-black">{semester.title}</h2>
                  <p className="mt-2 text-sm text-slate-500">{subjects.length ? "All subjects available for this branch." : "Subjects coming soon for this branch."}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-2 text-[11px] font-bold text-slate-400 ring-1 ring-slate-200">{subjects.length} subjects</span>
              </div>
              {subjects.length ? (
                <div className="mt-7 grid gap-4 md:grid-cols-2">
                  {subjects.map(({ subject, drive }) => (
                    <article key={subject.slug} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                      <div className="flex items-start gap-4">
                        <Link href={"/semester/" + semester.number + "/branch/" + branch.slug + "/" + subject.slug} className="min-w-0 flex-1">
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black text-slate-600">{subject.code}</span>
                          <h3 className="mt-4 text-lg font-black leading-6">{subject.name}</h3>
                          <p className="mt-2 text-sm leading-6 text-slate-500">{subject.description}</p>
                          <div className="mt-5 flex flex-wrap gap-1.5">
                            {["Notes", "Important Questions", "PYQs"].map((resource) => <span key={resource} className="rounded-full bg-slate-50 px-2.5 py-1 text-[10px] font-bold text-slate-400">{resource}</span>)}
                          </div>
                        </Link>
                        <a href={drive || ("https://drive.google.com/drive/u/0/search?q=" + encodeURIComponent(subject.name))} target="_blank" rel="noopener noreferrer" aria-label={"Open " + subject.name + " in Google Drive"} title="Open in Google Drive" className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-slate-950 text-white transition hover:scale-105 hover:bg-indigo-600">
                          <ArrowRight size={17} />
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="mt-7 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center"><BookOpen className="mx-auto text-slate-300" /><p className="mt-3 text-sm font-bold text-slate-500">Subjects coming soon.</p></div>
              )}
            </section>
          ))}
        </div>
        <Link href="/#branches" className="mt-10 inline-flex items-center gap-2 text-xs font-extrabold text-slate-400 hover:text-slate-900"><ArrowLeft size={14} /> Back to branches</Link>
      </section>
    </main>
  );
}
