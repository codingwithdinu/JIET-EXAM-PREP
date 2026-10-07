"use client";

import { useEffect, useMemo, useState } from "react";
import { ExternalLink, LogOut, Save, Search } from "lucide-react";
import { branches, getSubjects, semesters, type Subject } from "@/lib/data";
import { requireSupabase } from "@/lib/supabase";

type Row={semester:number;branch:string;subject_slug:string;drive_url:string|null};

export default function AdminPage(){
  const [semester,setSemester]=useState(5);
  const [branch,setBranch]=useState("cse-cs");
  const [rows,setRows]=useState<Row[]>([]);
  const [search,setSearch]=useState("");
  const [status,setStatus]=useState("");
  const [loading,setLoading]=useState(true);

  const subjects=useMemo(()=>getSubjects(semester,branch).filter(s=>s.name.toLowerCase().includes(search.toLowerCase())||s.code.toLowerCase().includes(search.toLowerCase())),[semester,branch,search]);

  useEffect(()=>{(async()=>{
    const client=requireSupabase();
    const {data:{session}}=await client.auth.getSession();
    if(!session){location.href="/admin/login";return;}
    const {data,error}=await client.from("subject_drive_links").select("semester,branch,subject_slug,drive_url").eq("semester",semester).eq("branch",branch);
    if(error)setStatus(error.message); else setRows((data??[]) as Row[]);
    setLoading(false);
  })()},[semester,branch]);

  function value(s:Subject){return rows.find(r=>r.subject_slug===s.slug)?.drive_url??s.driveUrl??"";}
  async function save(s:Subject,url:string){
    setStatus("Saving…");
    const client=requireSupabase();
    const {error}=await client.from("subject_drive_links").upsert({semester,branch,subject_slug:s.slug,drive_url:url||null},{onConflict:"semester,branch,subject_slug"});
    setStatus(error?error.message:"Saved successfully.");
  }
  async function logout(){await requireSupabase().auth.signOut();location.href="/admin/login";}

  return <main className="min-h-screen bg-[#f7f8fc]">
    <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
      <div><p className="text-xs font-black uppercase tracking-[.18em] text-indigo-600">JIET Exam Prep</p><h1 className="mt-1 text-2xl font-black">Drive Link Manager</h1></div>
      <button onClick={logout} className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold"><LogOut size={16}/>Logout</button>
    </div></header>
    <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
      <div className="grid gap-3 md:grid-cols-[180px_1fr_1fr]">
        <select value={semester} onChange={e=>setSemester(Number(e.target.value))} className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-bold">{semesters.filter(s=>s.number>=3).map(s=><option key={s.number} value={s.number}>Semester {s.number}</option>)}</select>
        <select value={branch} onChange={e=>setBranch(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-bold">{branches.map(b=><option key={b.slug} value={b.slug}>{b.code}</option>)}</select>
        <div className="flex items-center rounded-xl border border-slate-200 bg-white px-3"><Search size={17} className="text-slate-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search subject…" className="min-w-0 flex-1 px-3 py-3 outline-none"/></div>
      </div>
      {status&&<p className="mt-4 rounded-xl bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700">{status}</p>}
      <div className="mt-6 space-y-3">{loading?<div className="rounded-2xl bg-white p-8 text-sm font-bold text-slate-500">Loading…</div>:subjects.map(s=><AdminSubject key={s.slug} subject={s} initial={value(s)} onSave={save}/>)}</div>
    </section>
  </main>;
}

function AdminSubject({subject,initial,onSave}:{subject:Subject;initial:string;onSave:(s:Subject,url:string)=>Promise<void>}){
 const [url,setUrl]=useState(initial);
 return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
   <div className="flex flex-wrap items-start gap-4">
    <div className="min-w-0 flex-1"><span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-black">{subject.code}</span><h2 className="mt-2 text-lg font-black">{subject.name}</h2><p className="mt-1 text-xs font-semibold text-slate-400">{subject.kind}</p></div>
    {url&&<a href={url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-black text-indigo-600"><ExternalLink size={14}/>Open</a>}
   </div>
   <div className="mt-4 flex gap-2"><input value={url} onChange={e=>setUrl(e.target.value)} placeholder="Paste Google Drive folder URL…" className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-950"/><button onClick={()=>onSave(subject,url)} className="flex shrink-0 items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white"><Save size={16}/>Save</button></div>
 </div>
}
