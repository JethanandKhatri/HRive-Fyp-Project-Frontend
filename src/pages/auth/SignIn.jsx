import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HRiveLogo } from "@/components/HRiveLogo";
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getRedirectPath, normalizeRoleValue, resolveUserRole } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export default function SignIn() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const FALLBACK_EDGE_LOGIN_URL = "https://ruewgiljaznyllyqmrep.supabase.co/functions/v1/login";
  const FALLBACK_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1ZXdnaWxqYXpueWxseXFtcmVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNjM0MTEsImV4cCI6MjA3OTgzOTQxMX0.SOKHqCWq4Ml9mOaxrkw4yOfmRMLzAfViiAAxOErbajQ";
  const edgeLoginUrl =
    import.meta.env.VITE_SUPABASE_EDGE_LOGIN_URL || FALLBACK_EDGE_LOGIN_URL;
  const anonKey =
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || FALLBACK_SUPABASE_ANON_KEY;
  // Check if already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const resolvedRole = resolveUserRole(session.user);
        const redirectPath = getRedirectPath(resolvedRole);
        navigate(redirectPath, { replace: true });
      }
    };
    checkSession();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      if (!edgeLoginUrl || !anonKey) {
        throw new Error("Missing Supabase edge login configuration.");
      }

      const response = await fetch(edgeLoginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${anonKey}`,
          apikey: anonKey,
        },
        body: JSON.stringify({ email, password }),
      });

      let payload = null;
      try {
        payload = await response.json();
      } catch {
        payload = null;
      }

      if (!response.ok) {
        const message = payload?.error || payload?.message || "Invalid credentials.";
        toast({
          title: "Sign in failed",
          description: message,
          variant: "destructive",
        });
        return;
      }

      const payloadData = payload?.data ?? payload;
      let session = payloadData?.session ?? payload?.session;
      if (!session && payloadData?.access_token && payloadData?.refresh_token) {
        session = {
          access_token: payloadData.access_token,
          refresh_token: payloadData.refresh_token,
        };
      }

      let user = payloadData?.user ?? payload?.user ?? null;
      const roleFromPayload =
        payloadData?.role ||
        payload?.role ||
        payloadData?.user?.role ||
        payload?.user?.role ||
        payloadData?.user?.user_metadata?.role ||
        payloadData?.user?.app_metadata?.role;
      if (session) {
        const { data, error } = await supabase.auth.setSession(session);
        if (error) {
          throw error;
        }
        user = data?.session?.user ?? user;
      }

      if (!user) {
        const { data: sessionData } = await supabase.auth.getSession();
        user = sessionData?.session?.user ?? null;
      }

      if (user) {
        const normalizedRole = normalizeRoleValue(roleFromPayload);
        if (normalizedRole) {
          localStorage.setItem("hrive_role", normalizedRole);
          localStorage.setItem("hrive_role_user_id", user.id);
        }
        const resolvedRole = resolveUserRole(user) || normalizedRole;
        const redirectPath = getRedirectPath(resolvedRole);
        toast({
          title: "Welcome back!",
          description: "Redirecting to your portal...",
        });
        navigate(redirectPath, { replace: true });
        return;
      }

      toast({
        title: "Sign in failed",
        description: "Login succeeded but no user session was returned.",
        variant: "destructive",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err?.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-dark p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-accent blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-primary blur-3xl" />
        </div>
        
        <div className="relative z-10">
          <HRiveLogo size="lg" variant="light" />
        </div>
        
        <div className="relative z-10 space-y-6">
          <h1 className="text-4xl font-bold text-white leading-tight">
            Simplify HR.<br />
            Empower Your Team.
          </h1>
          <p className="text-lg text-white/70 max-w-md">
            AI-powered HR management system that streamlines payroll, attendance, 
            performance, and employee workflows.
          </p>
        </div>

        <div className="relative z-10 text-white/50 text-sm">
          © 2024 HRive. All rights reserved.
        </div>
      </div>

      {/* Right Panel - Sign In Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          <div className="lg:hidden mb-8">
            <HRiveLogo size="md" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Welcome back</h2>
            <p className="text-muted-foreground">
              Sign in to your company account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Work Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 gradient-primary border-0 gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Access is role-based. Contact admin if you need help.
          </p>
        </div>
      </div>
    </div>
  );
}




