// lib/supabaseServer.ts
import { createClient } from "@supabase/supabase-js";
import { CONFIG } from "./config";

const url = CONFIG.backendURL!;
const serviceRole = CONFIG.backendServiceKey!;

if (!url || !serviceRole) {
  throw new Error("Missing SUPABASE environment variables");
}

console.log("✅ SUPABASE URL:", url);
console.log("✅ SERVICE ROLE:", serviceRole ? "OK ✅" : "MISSING ❌");

export const supabaseServer = createClient(url, serviceRole, {
  auth: { persistSession: false },
});
