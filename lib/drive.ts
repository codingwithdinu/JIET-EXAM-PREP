import { createClient } from "@supabase/supabase-js";

export async function getDriveUrl(semester:number, branch:string, subjectSlug:string, fallback?:string){
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if(!url||!key) return fallback;
  const client=createClient(url,key);
  const {data}=await client.from("subject_drive_links").select("drive_url").eq("semester",semester).eq("branch",branch).eq("subject_slug",subjectSlug).maybeSingle();
  return data?.drive_url || fallback;
}
