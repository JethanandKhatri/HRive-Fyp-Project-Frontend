-- Create attendance_records table for check-in/check-out tracking
CREATE TABLE public.attendance_records (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    check_in_time TIMESTAMP WITH TIME ZONE,
    check_out_time TIMESTAMP WITH TIME ZONE,
    status TEXT DEFAULT 'present' CHECK (status IN ('present', 'late', 'absent', 'half_day')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    -- Ensure one record per user per day
    UNIQUE(user_id, date)
);

-- Enable Row Level Security
ALTER TABLE public.attendance_records ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own attendance records
CREATE POLICY "Users can view their own attendance"
ON public.attendance_records
FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Users can insert their own attendance records (check-in)
CREATE POLICY "Users can create their own attendance"
ON public.attendance_records
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own attendance records (check-out)
CREATE POLICY "Users can update their own attendance"
ON public.attendance_records
FOR UPDATE
USING (auth.uid() = user_id);

-- Policy: HR Managers can view all attendance records
CREATE POLICY "HR Managers can view all attendance"
ON public.attendance_records
FOR SELECT
USING (has_role(auth.uid(), 'hr_manager'::app_role));

-- Policy: Admins can view all attendance records (for reporting)
CREATE POLICY "Admins can view all attendance"
ON public.attendance_records
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_attendance_records_updated_at
BEFORE UPDATE ON public.attendance_records
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();