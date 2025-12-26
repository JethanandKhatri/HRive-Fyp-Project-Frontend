import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const AuthContext = createContext(undefined);
const ROLE_STORAGE_KEY = "hrive_role";
const ROLE_USER_STORAGE_KEY = "hrive_role_user_id";
const ROLE_TABLE_MISSING_KEY = "hrive_role_table_missing";

function getStoredRoleForUser(userId) {
  const storedRole = localStorage.getItem(ROLE_STORAGE_KEY);
  const storedRoleUserId = localStorage.getItem(ROLE_USER_STORAGE_KEY);
  return storedRole && storedRoleUserId === userId ? storedRole : null;
}

export function resolveUserRole(user) {
  if (!user) return null;
  const metadataRole = user.user_metadata?.role || user.app_metadata?.role;
  if (metadataRole) return normalizeRoleValue(metadataRole);
  const storedRole = getStoredRoleForUser(user.id);
  if (storedRole) return normalizeRoleValue(storedRole);
  return null;
}

export function normalizeRoleValue(role) {
  if (!role) return null;
  const value = String(role).trim();
  switch (value.toUpperCase()) {
    case "ADMIN":
      return "admin";
    case "HR":
    case "HR_MANAGER":
      return "hr_manager";
    case "LINE_MANAGER":
    case "MANAGER":
      return "line_manager";
    case "EMPLOYEE":
      return "employee";
    default:
      return value;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedRole = localStorage.getItem(ROLE_STORAGE_KEY);
    const storedRoleUserId = localStorage.getItem(ROLE_USER_STORAGE_KEY);
    if (storedRole && storedRoleUserId) {
      setRole(storedRole);
    }

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        // Defer role fetching to avoid deadlock
        if (currentSession?.user) {
          const currentUserId = currentSession.user.id;
          const resolvedRole = resolveUserRole(currentSession.user);
          if (resolvedRole) {
            setRole(resolvedRole);
            localStorage.setItem(ROLE_STORAGE_KEY, resolvedRole);
            localStorage.setItem(ROLE_USER_STORAGE_KEY, currentUserId);
            setLoading(false);
          } else if (localStorage.getItem(ROLE_TABLE_MISSING_KEY)) {
            setRole(null);
            setLoading(false);
          } else {
            localStorage.removeItem(ROLE_STORAGE_KEY);
            localStorage.removeItem(ROLE_USER_STORAGE_KEY);
            setTimeout(() => {
              fetchUserRole(currentUserId);
            }, 0);
          }
        } else {
          setRole(null);
          localStorage.removeItem(ROLE_STORAGE_KEY);
          localStorage.removeItem(ROLE_USER_STORAGE_KEY);
          setLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: existingSession } }) => {
      setSession(existingSession);
      setUser(existingSession?.user ?? null);
      
      if (existingSession?.user) {
        const existingUserId = existingSession.user.id;
        const resolvedRole = resolveUserRole(existingSession.user);
        if (resolvedRole) {
          setRole(resolvedRole);
          localStorage.setItem(ROLE_STORAGE_KEY, resolvedRole);
          localStorage.setItem(ROLE_USER_STORAGE_KEY, existingUserId);
          setLoading(false);
        } else if (localStorage.getItem(ROLE_TABLE_MISSING_KEY)) {
          setRole(null);
          setLoading(false);
        } else {
          localStorage.removeItem(ROLE_STORAGE_KEY);
          localStorage.removeItem(ROLE_USER_STORAGE_KEY);
          fetchUserRole(existingUserId);
        }
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserRole = async (userId) => {
    if (localStorage.getItem(ROLE_TABLE_MISSING_KEY)) {
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .single();

      if (error) {
        if (error?.code === "PGRST205") {
          console.warn("Role table missing in Supabase; skipping role lookup.");
          localStorage.setItem(ROLE_TABLE_MISSING_KEY, "1");
          setRole(null);
          localStorage.removeItem(ROLE_STORAGE_KEY);
          localStorage.removeItem(ROLE_USER_STORAGE_KEY);
          return;
        }
        console.error("Error fetching role:", error);
        setRole(null);
      } else {
        setRole(data?.role ?? null);
        if (data?.role) {
          localStorage.setItem(ROLE_STORAGE_KEY, data.role);
          localStorage.setItem(ROLE_USER_STORAGE_KEY, userId);
        } else {
          localStorage.removeItem(ROLE_STORAGE_KEY);
          localStorage.removeItem(ROLE_USER_STORAGE_KEY);
        }
      }
    } catch (err) {
      console.error("Error fetching role:", err);
      setRole(null);
      localStorage.removeItem(ROLE_STORAGE_KEY);
      localStorage.removeItem(ROLE_USER_STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setRole(null);
    localStorage.removeItem(ROLE_STORAGE_KEY);
    localStorage.removeItem(ROLE_USER_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, session, role, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function getRedirectPath(userRole) {
  switch (userRole) {
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



