import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HRiveLogo } from "@/components/HRiveLogo";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="flex justify-center">
          <HRiveLogo size="md" />
        </div>

        {!submitted ? (
          <>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Reset your password</h2>
              <p className="text-muted-foreground">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Work Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <Button type="submit" className="w-full h-11 gradient-primary border-0">
                Send Reset Link
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Check your email</h2>
              <p className="text-muted-foreground">
                We've sent a password reset link to{" "}
                <span className="font-medium text-foreground">{email}</span>
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>Didn't receive the email? Check your spam folder.</span>
            </div>
          </div>
        )}

        <div className="text-center">
          <Link
            to="/auth/login"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}


