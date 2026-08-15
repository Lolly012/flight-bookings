import type { SupabaseClient } from "@supabase/supabase-js";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createClient } from "@/lib/supabase/client";

export async function signUpWithEmail(email: string, password: string, name: string) {
  const client = createClient();
  if (!client) throw new Error("Supabase not configured");

  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (error) throw error;
  return data;
}

export async function signInWithEmail(email: string, password: string) {
  const client = createClient();
  if (!client) throw new Error("Supabase not configured");

  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const client = createClient();
  if (!client) throw new Error("Supabase not configured");

  const { error } = await client.auth.signOut();
  if (error) throw error;
}

export async function getServerSession() {
  try {
    const client = await createServerSupabaseClient();
    if (!client) return null;

    const { data, error } = await client.auth.getSession();
    if (error) throw error;
    return data.session;
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  try {
    const client = createClient();
    if (!client) return null;

    const { data, error } = await client.auth.getUser();
    if (error) throw error;
    return data.user;
  } catch {
    return null;
  }
}
