import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function ProtectedRoute({ children, allowedRoles }) {
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
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (role && !allowedRoles.includes(role)) {
    // Redirect to their appropriate portal
    const redirectPath = getPortalPath(role);
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}

function getPortalPath(role) {
  switch (role) {
    case "admin":
      return "/dashboard";
    case "hr_manager":
      return "/hr/dashboard";
    case "line_manager":
      return "/manager";
    case "employee":
      return "/employee";
    default:
      return "/auth/login";
  }
}



