import { cn } from "@/lib/utils";

const variantStyles = {
  default: "bg-card border border-border",
  primary: "gradient-primary text-primary-foreground",
  success: "gradient-success text-success-foreground",
  warning: "gradient-warning",
  danger: "gradient-danger text-destructive-foreground",
};

const iconVariantStyles = {
  default: "bg-muted text-foreground",
  primary: "bg-primary-foreground/20 text-primary-foreground",
  success: "bg-success-foreground/20 text-success-foreground",
  warning: "bg-white/20 text-foreground",
  danger: "bg-destructive-foreground/20 text-destructive-foreground",
};

const textStyles = {
  default: {
    title: "text-muted-foreground",
    value: "text-foreground",
    change: "text-muted-foreground",
  },
  primary: {
    title: "text-primary-foreground/90",
    value: "text-primary-foreground",
    change: "text-primary-foreground/80",
  },
  success: {
    title: "text-success-foreground/90",
    value: "text-success-foreground",
    change: "text-success-foreground/80",
  },
  warning: {
    title: "text-foreground/80",
    value: "text-foreground",
    change: "text-foreground/70",
  },
  danger: {
    title: "text-destructive-foreground/90",
    value: "text-destructive-foreground",
    change: "text-destructive-foreground/80",
  },
};

export function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  variant = "default",
}) {
  const texts = textStyles[variant];
  
  return (
    <div
      className={cn(
        "rounded-xl p-5 shadow-md transition-all duration-200 hover:shadow-lg animate-fade-in",
        variantStyles[variant]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2 min-w-0 flex-1">
          <p className={cn("text-sm font-medium truncate", texts.title)}>
            {title}
          </p>
          <p className={cn("text-2xl font-bold tracking-tight", texts.value)}>
            {value}
          </p>
          {change && (
            <p
              className={cn(
                "text-xs font-medium",
                changeType === "positive" && variant === "default" && "text-success",
                changeType === "negative" && variant === "default" && "text-destructive",
                changeType === "neutral" && texts.change,
                variant !== "default" && texts.change
              )}
            >
              {change}
            </p>
          )}
        </div>
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-lg shrink-0 ml-3",
            iconVariantStyles[variant]
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}



