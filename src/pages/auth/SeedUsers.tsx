import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

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

export default function SeedUsers() {
  const [results, setResults] = useState<{ email: string; status: "pending" | "success" | "error"; message?: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const seedUsers = async () => {
    setLoading(true);
    const newResults: typeof results = [];

    for (const user of testUsers) {
      // Sign up user
      const { data, error } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: { full_name: user.fullName },
        },
      });

      if (error) {
        newResults.push({ email: user.email, status: "error", message: error.message });
        continue;
      }

      if (!data.user) {
        newResults.push({ email: user.email, status: "error", message: "No user created" });
        continue;
      }

      // Insert role - we need to use service role for this, so we'll do it via edge function
      // For now, just mark as created and we'll assign roles via migration
      newResults.push({ email: user.email, status: "success", message: `Created with ID: ${data.user.id}` });
    }

    setResults(newResults);
    setLoading(false);

    const successCount = newResults.filter(r => r.status === "success").length;
    if (successCount > 0) {
      toast.success(`Created ${successCount} test users. Roles will be assigned via migration.`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Seed Test Users</CardTitle>
          <CardDescription>
            Create test accounts for all four roles. After creation, run the role assignment migration.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {testUsers.map((user) => {
              const result = results.find(r => r.email === user.email);
              return (
                <div key={user.email} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{user.email}</p>
                    <p className="text-sm text-muted-foreground capitalize">{user.role.replace("_", " ")}</p>
                  </div>
                  {result ? (
                    result.status === "success" ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )
                  ) : null}
                </div>
              );
            })}
          </div>

          <Button onClick={seedUsers} disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Users...
              </>
            ) : (
              "Create Test Users"
            )}
          </Button>

          {results.length > 0 && (
            <div className="text-sm text-muted-foreground">
              <p>After creating users, copy the user IDs and run the role assignment migration.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
