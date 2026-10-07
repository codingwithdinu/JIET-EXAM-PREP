"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, BookOpen, CheckCircle2, ChevronRight, FileQuestion, Search, Sparkles, Layers3, GraduationCap } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import { getBranches, getSubjects, semesters } from "@/lib/data";

export default function Home() {
  const [query, setQuery] = useState("");

  const allSubjects = useMemo(() => {
    const common = [1,2].flatMap((n) => getSubjects(n).map(subject => ({
      subject, href: `/semester/${n}/${subject.slug}`, meta: `Semester ${n}`
    })));
    const branchSubjects = semesters.slice(2).flatMap((s) =>
      getBranches().flatMap((b) => getSubjects(s.number, b.slug).map(subject => ({
        subject, href: `/semester/${s.number}/branch/${b.slug}/${subject.slug}`, meta: `${s.title} · ${b.code}`
      })))
    );
    return [...common, ...branchSubjects];
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allSubjects.filter(({subject:s}) => [s.name, s.code, s.shortName].some(v => v.toLowerCase().includes(q))).slice(0, 8);
  }, [query, allSubjects]);

  const populatedSubjects = allSubjects.length;
  const branchCount = getBranches().length;

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-[#101828]">
      <SiteHeader />

      <section className="portal-grid relative overflow-hidden border-b border-slate-200/80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(99,102,241,.13),transparent_28%),radial-gradient(circle_at_90%_10%,rgba(14,165,233,.10),transparent_24%)]" />
        <div className="relative mx-auto max-w-[1240px] px-5 pb-20 pt-16 lg:px-8 lg:pb-24 lg:pt-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/90 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[.13em] text-indigo-700 shadow-sm">
              <Sparkles size={13} /> Built for JIET students
            </div>
            <h1 className="mt-6 text-5xl font-black leading-[.98] tracking-[-.055em] sm:text-6xl lg:text-[76px]">
              Your JIET syllabus.<br />
              <span className="text-indigo-600">Organized to study.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              A clean academic portal for semester-wise subjects, notes, important questions and previous-year papers — without the clutter.
            </p>

            <div className="relative mt-8 max-w-2xl">
              <div className="flex items-center rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_18px_50px_rgba(16,24,40,.08)]">
                <Search className="ml-3 shrink-0 text-slate-400" size={19} />
                <input value={query} onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search subject name or code..."
                  className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm font-medium outline-none placeholder:text-slate-400" />
                <span className="hidden rounded-xl bg-slate-100 px-3 py-2 text-[10px] font-black text-slate-400 sm:block">SEARCH</span>
              </div>
              {query.trim() && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                  {results.length ? results.map(({subject:s, href, meta}) => (
                    <Link key={href} href={href} onClick={() => setQuery("")}
                      className="flex items-center justify-between border-b border-slate-100 px-4 py-3.5 last:border-0 hover:bg-slate-50">
                      <div><p className="text-sm font-extrabold">{s.name}</p><p className="mt-1 text-[11px] font-bold text-slate-400">{s.code} · {meta}</p></div>
                      <ChevronRight size={17} className="text-slate-300" />
                    </Link>
                  )) : <p className="px-4 py-4 text-sm font-semibold text-slate-500">No subject found.</p>}
                </div>
              )}
            </div>
          </div>

          <div className="mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { value: String(semesters.length).padStart(2, "0"), label: "Semesters", icon: GraduationCap },
              { value: String(branchCount).padStart(2, "0"), label: "Branches", icon: Layers3 },
              { value: String(populatedSubjects).padStart(2, "0"), label: "Subjects", icon: BookOpen },
              { value: "04", label: "Core resources", icon: FileQuestion },
            ].map(({ value, label, icon: Icon }) => (
              <div key={label} className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm backdrop-blur">
                <Icon size={17} className="text-indigo-600" />
                <p className="mt-3 text-2xl font-black tracking-tight">{value}</p>
                <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[.08em] text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="semesters" className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[.18em] text-indigo-600">01 / Navigate</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-.035em] sm:text-4xl">Choose a semester</h2>
            <p className="mt-2 text-sm text-slate-500">Start with your year and continue into the subjects.</p>
          </div>
          <span className="text-xs font-bold text-slate-400">Semester 1 → 8</span>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/semester/1-2" className="group relative overflow-hidden rounded-3xl border border-indigo-100 bg-indigo-50 p-6 lg:col-span-2">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-200/50" />
            <span className="relative text-[11px] font-black uppercase tracking-[.15em] text-indigo-600">01 — 02</span>
            <h3 className="relative mt-10 text-2xl font-black tracking-tight">Semester 1 & 2</h3>
            <p className="relative mt-2 text-sm font-semibold text-indigo-900/55">Common foundation syllabus</p>
            <ArrowRight className="relative mt-8 text-indigo-600 transition group-hover:translate-x-1" size={19} />
          </Link>
          {semesters.slice(2).map((s) => (
            <Link key={s.number} href={"/semester/"+s.number} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">
              <span className="text-[11px] font-black uppercase tracking-[.15em] text-slate-400">0{s.number}</span>
              <h3 className="mt-10 text-lg font-black">{s.title}</h3>
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-xs font-bold text-slate-400">View semester</span>
                <ArrowRight size={16} className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-slate-950" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="branches" className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-[11px] font-black uppercase tracking-[.18em] text-indigo-600">02 / Branches</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-.035em] sm:text-4xl">Built around your branch</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">For Semester 3 onwards, select the branch to see its subject structure and study resources.</p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {getBranches().map((b) => (
              <div key={b.slug} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
                <span className="text-[10px] font-black uppercase tracking-[.15em] text-indigo-600">{b.code}</span>
                <h3 className="mt-3 text-sm font-black leading-5">{b.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="resources" className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8">
        <div className="rounded-[32px] bg-[#111827] p-7 text-white sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[.18em] text-indigo-300">03 / Resources</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">Everything stays organized by subject.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">Open a subject and continue to its study resources. The portal is designed to keep the path from semester → branch → subject simple.</p>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-3">
              {["Notes","Questions","PYQs"].map((item) => <div key={item} className="rounded-2xl bg-white/8 px-4 py-5 text-center ring-1 ring-white/10"><CheckCircle2 size={17} className="mx-auto text-indigo-300" /><p className="mt-2 text-xs font-extrabold">{item}</p></div>)}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-2 px-5 py-8 text-xs font-semibold text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© 2026 JIET Exam Prep</p><p>Academic resources, organized simply.</p>
        </div>
      </footer>
    </main>
  );
}
