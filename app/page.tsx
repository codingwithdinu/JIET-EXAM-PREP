"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  ChevronRight,
  FileText,
  GraduationCap,
  LibraryBig,
  Menu,
  Search,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { useState } from "react";

const semesters = Array.from({ length: 8 }, (_, i) => ({
  number: i + 1,
  label: `Semester ${i + 1}`,
}));





export default function Home() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q;
  }, [query]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f8fc] text-slate-950">
      <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#" className="group flex items-center gap-3">
            <div className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-[15px] bg-slate-950 text-white shadow-lg shadow-slate-950/15 transition duration-300 group-hover:-rotate-2 group-hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 via-transparent to-violet-500/30" />
              <GraduationCap size={22} className="relative" strokeWidth={2.4} />
            </div>
            <div className="leading-none">
              <p className="text-[15px] font-black tracking-[-0.02em] text-slate-950">JIET Exam Prep</p>
              <div className="mt-1.5 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-slate-400">Student Study Hub</p>
              </div>
            </div>
          </a>

          <div className="hidden items-center rounded-2xl border border-slate-200/80 bg-slate-50/80 p-1 md:flex">
            <a href="#semesters" className="rounded-xl bg-white px-4 py-2.5 text-[13px] font-extrabold text-slate-950 shadow-sm ring-1 ring-slate-200/70 transition hover:-translate-y-px">Semesters</a>
          </div>

          <div className="hidden items-center gap-2.5 md:flex">
            <button className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-extrabold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
              Admin
            </button>
            <a href="#semesters" className="group inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-[13px] font-extrabold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800">
              Start studying
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <button
            onClick={() => setMobileMenu((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-800 shadow-sm transition hover:bg-slate-50 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {mobileMenu && (
          <div className="border-t border-slate-200/80 bg-white px-5 py-4 shadow-xl shadow-slate-950/5 md:hidden">
            <div className="grid gap-1.5">
              <a onClick={() => setMobileMenu(false)} href="#semesters" className="rounded-xl px-4 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50">Semesters</a>
                            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
                <button className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-extrabold text-slate-700">Admin</button>
                <a onClick={() => setMobileMenu(false)} href="#semesters" className="rounded-xl bg-slate-950 px-4 py-3 text-center text-sm font-extrabold text-white">Start studying</a>
              </div>
            </div>
          </div>
        )}
      </nav>

      <section className="relative">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_5%,rgba(59,130,246,0.13),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(124,58,237,0.10),transparent_26%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-18 pt-16 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:pb-24 lg:pt-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm">
              <Sparkles size={14} />
              Built for JIET students
            </div>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Everything you need to{" "}
              <span className="bg-gradient-to-r from-slate-950 via-indigo-700 to-violet-600 bg-clip-text text-transparent">
                prepare better.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Semester-wise syllabus, unit-wise notes, important questions and previous papers — organized in one clean place for faster exam preparation.
            </p>

            <div className="mt-8 flex max-w-2xl items-center rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-950/5">
              <Search className="ml-3 text-slate-400" size={20} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a subject, topic or resource..."
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-slate-400"
              />
              <button className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white">Search</button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
              <span className="rounded-full bg-white px-3 py-2 ring-1 ring-slate-200">DAA</span>
              <span className="rounded-full bg-white px-3 py-2 ring-1 ring-slate-200">DIP</span>
              <span className="rounded-full bg-white px-3 py-2 ring-1 ring-slate-200">Compiler Design</span>
              <span className="rounded-full bg-white px-3 py-2 ring-1 ring-slate-200">OS</span>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-950/10">
              <div className="rounded-3xl bg-slate-950 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-400">CURRENT FOCUS</p>
                    <h2 className="mt-1 text-2xl font-black tracking-tight">Semester 5</h2>
                  </div>
                  <BrainCircuit size={28} className="text-slate-300" />
                </div>
                <div className="mt-6 grid gap-3">
                  {[
                    ["DAA", "12 important topics"],
                    ["DIP", "8 unit-wise notes"],
                    ["AML", "6 exam sets"],
                  ].map(([code, meta]) => (
                    <div key={code} className="flex items-center justify-between rounded-2xl bg-white/8 px-4 py-3 ring-1 ring-white/8">
                      <div>
                        <p className="font-extrabold">{code}</p>
                        <p className="text-xs text-slate-400">{meta}</p>
                      </div>
                      <ChevronRight size={17} className="text-slate-500" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  ["8", "Semesters"],
                  ["∞", "Resources"],
                  ["1", "Study hub"],
                ].map(([n, label]) => (
                  <div key={label} className="rounded-2xl bg-slate-50 px-3 py-4 text-center">
                    <p className="text-lg font-black">{n}</p>
                    <p className="mt-1 text-[11px] font-semibold text-slate-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="semesters" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-600">Browse by semester</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Choose your semester</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Jump directly into subjects, syllabus, questions, notes and PYQs.</p>
          </div>
          <span className="hidden rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-500 ring-1 ring-slate-200 sm:block">Sem 1 — Sem 8</span>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          <Link
            href="/semester/1-2"
            className="group col-span-2 rounded-2xl border border-indigo-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl sm:col-span-2"
          >
            <span className="text-xs font-black text-indigo-500">01–02</span>
            <div className="mt-8 flex items-end justify-between">
              <div>
                <span className="text-sm font-extrabold">Semester 1 & 2</span>
                <p className="mt-1 text-xs font-semibold text-slate-400">Common syllabus</p>
              </div>
              <ArrowRight size={16} className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-950" />
            </div>
          </Link>
          {semesters.slice(2).map((sem) => (
            <Link
              key={sem.number}
              href={`/semester/${sem.number}`}
              className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
            >
              <span className="text-xs font-black text-slate-400">0{sem.number}</span>
              <div className="mt-8 flex items-end justify-between">
                <span className="text-sm font-extrabold">{sem.label}</span>
                <ArrowRight size={16} className="translate-x-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-950" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="resources" className="border-y border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-600">Everything in one place</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Study resources that match the exam</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {resources.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white ring-1 ring-slate-200">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-5 text-base font-black">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{item.desc}</p>
                  <button className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-slate-900">
                    Explore <ArrowRight size={15} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© 2026 JIET Exam Prep</p>
          <p>Made for students, organized for exams.</p>
        </div>
      </footer>
    </main>
  );
}
