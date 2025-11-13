import { AlertTriangle, AlertCircle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FragmentationLevel {
  level: "low" | "medium" | "high";
  range: string;
  action: string;
  icon: React.ReactNode;
  color: string;
}

const levels: FragmentationLevel[] = [
  {
    level: "low",
    range: "0-10%",
    action: "No action needed",
    icon: <CheckCircle className="h-5 w-5" />,
    color: "text-success border-success/30 bg-success/10",
  },
  {
    level: "medium",
    range: "10-30%",
    action: "Consider REORGANIZE",
    icon: <AlertCircle className="h-5 w-5" />,
    color: "text-warning border-warning/30 bg-warning/10",
  },
  {
    level: "high",
    range: "30%+",
    action: "REBUILD required",
    icon: <AlertTriangle className="h-5 w-5" />,
    color: "text-destructive border-destructive/30 bg-destructive/10",
  },
];

export const FragmentationIndicator = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {levels.map((level) => (
        <div
          key={level.level}
          className={cn(
            "p-4 rounded-lg border-2 transition-all hover:scale-105",
            level.color
          )}
        >
          <div className="flex items-center gap-2 mb-2">
            {level.icon}
            <span className="font-semibold uppercase text-sm">
              {level.level} Fragmentation
            </span>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium">{level.range}</div>
            <div className="text-xs opacity-80">{level.action}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
