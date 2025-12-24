import { cn } from "@/lib/utils";
import hriveLogo from "@/assets/hrive-logo.png";

export function HRiveLogo({ className, showText = true, size = "md", variant = "default" }) {
  const sizes = {
    sm: { icon: "h-8 w-8", text: "text-lg", tagline: "text-[10px]" },
    md: { icon: "h-10 w-10", text: "text-xl", tagline: "text-xs" },
    lg: { icon: "h-14 w-14", text: "text-2xl", tagline: "text-sm" },
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <img
        src={hriveLogo}
        alt="HRive Logo"
        className={cn("object-contain", sizes[size].icon)}
      />
      {showText && (
        <div className="flex flex-col">
          <span className={cn(
            "font-bold tracking-tight",
            sizes[size].text,
            variant === "light" ? "text-white" : "text-foreground"
          )}>
            HRive
          </span>
          <span className={cn(
            "-mt-0.5",
            sizes[size].tagline,
            variant === "light" ? "text-white/70" : "text-muted-foreground"
          )}>
            AI-Driven HR
          </span>
        </div>
      )}
    </div>
  );
}



