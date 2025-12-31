import { supabase } from "@/integrations/supabase/client";

const supabaseBaseUrl = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const attendanceUrl =
  import.meta.env.VITE_SUPABASE_EDGE_ATTENDENCE_URL ||
  import.meta.env.VITE_SUPABASE_EDGE_ATTENDANCE_URL ||
  (supabaseBaseUrl
    ? `${supabaseBaseUrl}/functions/v1/attendence`
    : "https://ruewgiljaznyllyqmrep.supabase.co/functions/v1/attendence");

async function getAuthHeaders() {
  if (!anonKey) {
    throw new Error("Missing Supabase anon key.");
  }
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) {
    throw sessionError;
  }
  const accessToken = sessionData?.session?.access_token;
  if (!accessToken) {
    throw new Error("Missing access token. Please sign in again.");
  }
  return {
    Authorization: `Bearer ${accessToken}`,
    apikey: anonKey,
    "Content-Type": "application/json",
  };
}

function normalizeRecords(data) {
  const list = Array.isArray(data?.records)
    ? data.records
    : Array.isArray(data?.attendance)
      ? data.attendance
      : Array.isArray(data)
        ? data
        : [];
  return list.map((item) => ({
    id: item?.id ?? item?.attendance_id ?? item?.check_in_time ?? Math.random().toString(36),
    userId: item?.user_id ?? item?.userId ?? null,
    name: item?.full_name ?? item?.user_name ?? item?.name ?? item?.email ?? "Unknown",
    email: item?.email ?? item?.user_email ?? "",
    date: item?.date ?? item?.attendance_date ?? "",
    checkInTime: item?.check_in_time ?? item?.checkInTime ?? null,
    checkOutTime: item?.check_out_time ?? item?.checkOutTime ?? null,
    status: item?.status ?? "present",
  }));
}

export async function fetchAttendanceRecords(params = {}) {
  if (!attendanceUrl || !anonKey) {
    throw new Error("Missing attendance edge function configuration.");
  }
  const headers = await getAuthHeaders();
  const url = new URL(attendanceUrl);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url.toString(), { method: "GET", headers });
  const data = await response.json();
  if (!response.ok || data?.success === false) {
    throw new Error(data?.error || data?.message || "Unable to load attendance.");
  }
  return normalizeRecords(data);
}

async function postAttendanceAction(payload) {
  if (!attendanceUrl || !anonKey) {
    throw new Error("Missing attendance edge function configuration.");
  }
  const headers = await getAuthHeaders();
  const response = await fetch(attendanceUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok || data?.success === false) {
    throw new Error(data?.error || data?.message || "Unable to update attendance.");
  }
  const records = normalizeRecords(data);
  return records[0] || data?.record || null;
}

export async function checkInAttendance(date, payload = {}) {
  return postAttendanceAction({ action: "check_in", date, ...payload });
}

export async function checkOutAttendance(date, payload = {}) {
  return postAttendanceAction({ action: "check_out", date, ...payload });
}
