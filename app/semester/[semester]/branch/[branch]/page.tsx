import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, FlaskConical, Layers3 } from "lucide-react";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import { getBranches, getSubjects, semesters } from "@/lib/data";
import { getDriveUrl } from "@/lib/drive";

export function generateStaticParams() {
  return semesters.flatMap(s => s.number >= 3 ? getBranches().map(b => ({ semester:String(s.number), branch:b.slug })) : []);
}

export default async function BranchPage({ params }: { params: Promise<{ semester:string; branch:string }> }) {
  const { semester: p, branch: slug } = await params;
  const number = Number(p), semester = semesters.find(s=>s.number===number), branch = getBranches().find(b=>b.slug===slug);
  if (!semester || !branch || number < 3) notFound();
  const subjects = getSubjects(number, slug);
  const withDrive = await Promise.all(subjects.map(async subject => ({subject, drive:await getDriveUrl(number,slug,subject.slug,subject.driveUrl)})));

  return <main className="min-h-screen bg-[#f6f7fb]">
    <SiteHeader />
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-[1240px] px-5 py-9 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-400"><Link href="/">Home</Link><span>/</span><Link href={`/semester/${number}`}>{semester.title}</Link><span>/</span><span className="text-slate-800">{branch.code}</span></div>
        <div className="mt-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="text-[11px] font-black uppercase tracking-[.18em] text-indigo-600">{semester.title} · Branch</p><h1 className="mt-2 text-4xl font-black tracking-[-.04em]">{branch.name}</h1><p className="mt-3 text-sm text-slate-500">Subjects and study resources for this branch.</p></div><div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4"><p className="text-2xl font-black">{subjects.length}</p><p className="text-[10px] font-black uppercase tracking-[.12em] text-slate-400">Subjects</p></div></div>
      </div>
    </section>

    <section className="mx-auto max-w-[1240px] px-5 py-12 lg:px-8">
      {subjects.length ? <div className="space-y-12">{(["theory","lab","other"] as const).map(kind => {
        const group=withDrive.filter(x=>x.subject.kind===kind); if(!group.length)return null;
        const meta=kind==="theory"?["Theory Subjects","Core and elective theory courses",Layers3]:kind==="lab"?["Practical Subjects","Laboratory and practical courses",FlaskConical]:["Other Academic Courses","Additional academic components",BookOpen];
        const Icon=meta[2] as typeof BookOpen;
        return <section key={kind}><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-950 text-white"><Icon size={17}/></div><div><h2 className="text-xl font-black">{meta[0] as string}</h2><p className="text-xs text-slate-500">{meta[1] as string}</p></div><span className="ml-auto rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-slate-400 ring-1 ring-slate-200">{group.length}</span></div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">{group.map(({subject,drive})=><article key={subject.slug} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className="flex items-start gap-4"><Link href={`/semester/${number}/branch/${branch.slug}/${subject.slug}`} className="min-w-0 flex-1"><span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black text-slate-600">{subject.code}</span><h3 className="mt-4 text-lg font-black leading-6">{subject.name}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{subject.description}</p><div className="mt-5 flex flex-wrap gap-1.5">{["Notes","Important Questions","PYQs"].map(r=><span key={r} className="rounded-full bg-slate-50 px-2.5 py-1 text-[10px] font-bold text-slate-400">{r}</span>)}</div></Link><a href={drive ?? `https://drive.google.com/drive/u/0/search?q=${encodeURIComponent(subject.name)}`} target="_blank" rel="noopener noreferrer" aria-label={`Open ${subject.name} resources`} className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-slate-950 text-white transition hover:scale-105 hover:bg-indigo-600"><ArrowRight size={17}/></a></div></article>)}</div></section>;
      })}</div> : <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center"><BookOpen className="mx-auto text-slate-300"/><h2 className="mt-4 font-black">Subjects coming soon</h2><p className="mt-2 text-sm text-slate-500">The branch is ready for academic content.</p></div>}
      <Link href={`/semester/${number}`} className="mt-10 inline-flex items-center gap-2 text-xs font-extrabold text-slate-400 hover:text-slate-900"><ArrowLeft size={14}/> Change branch</Link>
    </section>
  </main>;
}
