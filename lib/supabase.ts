export function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  return {
    url,
    anonKey,
    serviceRole,
    configured: Boolean(url && anonKey),
  };
}

export function isSupabaseReady() {
  return getSupabaseConfig().configured;
}
