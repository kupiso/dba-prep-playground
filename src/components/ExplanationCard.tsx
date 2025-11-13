import { useState } from "react";
import { ChevronDown, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ExplanationCardProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const ExplanationCard = ({
  title,
  children,
  defaultOpen = false,
}: ExplanationCardProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Card className="border-border bg-card overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-secondary/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-info" />
          <span className="font-medium text-foreground">{title}</span>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform",
            isOpen && "transform rotate-180"
          )}
        />
      </button>
      {isOpen && (
        <div className="px-4 py-3 border-t border-border bg-secondary/30">
          <div className="text-sm text-muted-foreground space-y-2">
            {children}
          </div>
        </div>
      )}
    </Card>
  );
};
