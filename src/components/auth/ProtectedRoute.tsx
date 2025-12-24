import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

type AppRole = "admin" | "hr_manager" | "line_manager" | "employee";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: AppRole[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  if (role && !allowedRoles.includes(role)) {
    // Redirect to their appropriate portal
    const redirectPath = getPortalPath(role);
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}

function getPortalPath(role: AppRole): string {
  switch (role) {
    case "admin":
      return "/admin";
    case "hr_manager":
      return "/";
    case "line_manager":
      return "/manager";
    case "employee":
      return "/employee";
    default:
      return "/auth/signin";
  }
}
