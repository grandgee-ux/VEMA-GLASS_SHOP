// Glass Mart Supabase client. The publishable key is safe for browser use when RLS is enabled.
// NEVER put a Supabase secret/service_role key in frontend code.
(() => {
  const SUPABASE_URL = "https://pnionhyyndlyvzhqdnta.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_yzp0DD0g3DrP5T2F1Tcxag_iJK3CYf4";
  if (!window.supabase?.createClient) {
    console.error("Supabase library did not load. Check your internet connection.");
    return;
  }
  window.db = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
})();
