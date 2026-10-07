import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import { getBranches, getSubject, getSubjects, semesters } from "@/lib/data";
import { getDriveUrl } from "@/lib/drive";

export function generateStaticParams() {
  return semesters.flatMap(s => s.number>=3 ? getBranches().flatMap(b => getSubjects(s.number,b.slug).map(subject=>({semester:String(s.number),branch:b.slug,subject:subject.slug}))) : []);
}

export default async function BranchSubjectPage({params}:{params:Promise<{semester:string;branch:string;subject:string}>}) {
  const {semester:p,branch:slug,subject:subjectSlug}=await params;
  const number=Number(p), semester=semesters.find(s=>s.number===number), branch=getBranches().find(b=>b.slug===slug), subject=getSubject(number,slug,subjectSlug);
  if(!semester||!branch||!subject||number<3)notFound();
  const drive=await getDriveUrl(number,slug,subject.slug,subject.driveUrl);

  return <main className="min-h-screen bg-[#f6f7fb]">
    <SiteHeader />
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-[1240px] px-5 py-9 lg:px-8">
        <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-400"><Link href="/">Home</Link><span>/</span><Link href={`/semester/${number}`}>{semester.title}</Link><span>/</span><Link href={`/semester/${number}/branch/${branch.slug}`}>{branch.code}</Link><span>/</span><span className="text-slate-800">{subject.code}</span></div>
        <div className="mt-10 max-w-3xl"><span className="rounded-full bg-indigo-50 px-3 py-1 text-[10px] font-black uppercase tracking-[.12em] text-indigo-700">{subject.code}</span><h1 className="mt-4 text-4xl font-black tracking-[-.045em] sm:text-5xl">{subject.name}</h1><p className="mt-3 text-sm font-semibold text-slate-400">{semester.title} · {branch.name}</p><p className="mt-4 text-base leading-7 text-slate-500">{subject.description}</p></div>
      </div>
    </section>
    <section className="mx-auto max-w-[1240px] px-5 py-12 lg:px-8">
      <div className="grid gap-5 lg:grid-cols-[1.5fr_.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-xl bg-slate-950 text-white"><BookOpen size={18}/></div><div><p className="text-[10px] font-black uppercase tracking-[.15em] text-indigo-600">Study resources</p><h2 className="text-xl font-black">Subject workspace</h2></div></div>
          <p className="mt-6 text-sm leading-7 text-slate-500">Use the resource folder to access the available study material for this subject.</p>
          <div className="mt-7 flex flex-wrap gap-2">{["Notes","Important Questions","PYQs"].map(r=><span key={r} className="rounded-full bg-slate-50 px-3 py-2 text-xs font-extrabold text-slate-600 ring-1 ring-slate-100">{r}</span>)}</div>
          <a href={drive ?? `https://drive.google.com/drive/u/0/search?q=${encodeURIComponent(subject.name)}`} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-xs font-extrabold text-white transition hover:bg-indigo-600">Open study folder <ExternalLink size={14}/></a>
        </div>
        <aside className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[.15em] text-slate-400">Course details</p>
          <div className="mt-5 divide-y divide-slate-100">{[["Code",subject.code],["Type",subject.kind==="lab"?"Practical":"Theory"],["Units",subject.units ? String(subject.units) : "Practical"]].map(([k,v])=><div key={k} className="flex items-center justify-between py-3"><span className="text-xs font-bold text-slate-400">{k}</span><span className="max-w-[65%] text-right text-xs font-black text-slate-800">{v}</span></div>)}</div>
        </aside>
      </div>
      <Link href={`/semester/${number}/branch/${branch.slug}`} className="mt-10 inline-flex items-center gap-2 text-xs font-extrabold text-slate-400 hover:text-slate-900"><ArrowLeft size={14}/> Back to {branch.code}</Link>
    </section>
  </main>;
}
