import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  title: string;
  description: string;
}

interface WorkflowTimelineProps {
  steps: Step[];
  variant?: "horizontal" | "vertical";
}

export const WorkflowTimeline = ({
  steps,
  variant = "horizontal",
}: WorkflowTimelineProps) => {
  if (variant === "horizontal") {
    return (
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-2 flex-shrink-0">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-semibold">
                {index + 1}
              </div>
              <div className="mt-2 text-center min-w-[120px]">
                <div className="text-sm font-medium text-foreground">
                  {step.title}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {step.description}
                </div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="h-0.5 w-8 bg-primary/30 mb-8" />
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className="w-0.5 h-full min-h-[40px] bg-primary/30 mt-2" />
            )}
          </div>
          <div className="flex-1 pb-4">
            <h4 className="text-sm font-semibold text-foreground">
              {step.title}
            </h4>
            <p className="text-sm text-muted-foreground mt-1">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
