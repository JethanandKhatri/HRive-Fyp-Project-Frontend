import { cn } from "@/lib/utils";

interface HRiveLogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export function HRiveLogo({ className, showText = true, size = "md" }: HRiveLogoProps) {
  const sizes = {
    sm: { icon: "h-8 w-8", text: "text-lg" },
    md: { icon: "h-10 w-10", text: "text-xl" },
    lg: { icon: "h-14 w-14", text: "text-3xl" },
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn("relative", sizes[size].icon)}>
        {/* Hexagonal logo shape with gradient */}
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(158 50% 42%)" />
              <stop offset="100%" stopColor="hsl(196 38% 33%)" />
            </linearGradient>
          </defs>
          {/* Outer hexagon */}
          <path
            d="M24 4L42 14V34L24 44L6 34V14L24 4Z"
            fill="url(#logoGradient)"
          />
          {/* Inner geometric pattern */}
          <path
            d="M24 12L36 19V33L24 40L12 33V19L24 12Z"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeOpacity="0.3"
          />
          {/* H letter stylized */}
          <path
            d="M17 18V30M31 18V30M17 24H31"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={cn("font-bold tracking-tight", sizes[size].text)}>
            HRive
          </span>
          <span className="text-xs text-muted-foreground -mt-0.5">
            AI-Driven HR
          </span>
        </div>
      )}
    </div>
  );
}