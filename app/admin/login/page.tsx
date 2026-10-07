"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, LogIn } from "lucide-react";
import { requireSupabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);

  async function submit(e:FormEvent){
    e.preventDefault(); setLoading(true); setError("");
    try {
      const client=requireSupabase();
      const {error}=await client.auth.signInWithPassword({email,password});
      if(error) throw error;
      router.push("/admin");
      router.refresh();
    } catch(err) { setError(err instanceof Error ? err.message : "Login failed."); }
    finally { setLoading(false); }
  }

  return <main className="grid min-h-screen place-items-center bg-[#f7f8fc] px-5">
    <form onSubmit={submit} className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-7 shadow-xl">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 text-white"><LockKeyhole size={20}/></div>
      <h1 className="mt-5 text-3xl font-black">Admin Login</h1>
      <p className="mt-2 text-sm text-slate-500">Manage JIET subject Google Drive links.</p>
      <label className="mt-6 block text-xs font-black uppercase tracking-wider text-slate-500">Email</label>
      <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-950"/>
      <label className="mt-4 block text-xs font-black uppercase tracking-wider text-slate-500">Password</label>
      <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-950"/>
      {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
      <button disabled={loading} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3.5 text-sm font-black text-white disabled:opacity-50"><LogIn size={17}/>{loading?"Signing in…":"Sign in"}</button>
    </form>
  </main>;
}
