import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TestUser {
  email: string;
  password: string;
  fullName: string;
  role: "admin" | "hr_manager" | "line_manager" | "employee";
}

const testUsers: TestUser[] = [
  { email: "admin@hrive.test", password: "Admin@123", fullName: "Admin User", role: "admin" },
  { email: "hr@hrive.test", password: "HRManager@123", fullName: "HR Manager", role: "hr_manager" },
  { email: "manager@hrive.test", password: "Manager@123", fullName: "Line Manager", role: "line_manager" },
  { email: "employee@hrive.test", password: "Employee@123", fullName: "Employee User", role: "employee" },
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const results: { email: string; status: string; error?: string }[] = [];

    for (const user of testUsers) {
      // Create user in auth.users
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true,
        user_metadata: { full_name: user.fullName },
      });

      if (authError) {
        // Check if user already exists
        if (authError.message.includes("already been registered")) {
          results.push({ email: user.email, status: "already exists" });
          continue;
        }
        results.push({ email: user.email, status: "error", error: authError.message });
        continue;
      }

      if (!authData.user) {
        results.push({ email: user.email, status: "error", error: "No user returned" });
        continue;
      }

      // Insert role into user_roles table
      const { error: roleError } = await supabaseAdmin
        .from("user_roles")
        .insert({ user_id: authData.user.id, role: user.role });

      if (roleError) {
        results.push({ email: user.email, status: "created but role failed", error: roleError.message });
        continue;
      }

      results.push({ email: user.email, status: "success" });
    }

    return new Response(JSON.stringify({ success: true, results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ success: false, error: message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
