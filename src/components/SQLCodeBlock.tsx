import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SQLCodeBlockProps {
  code: string;
  title?: string;
}

export const SQLCodeBlock = ({ code, title }: SQLCodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightSQL = (sql: string) => {
    const keywords = /\b(SELECT|FROM|WHERE|JOIN|INNER|LEFT|RIGHT|OUTER|ON|AND|OR|ORDER BY|GROUP BY|HAVING|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|DATABASE|TABLE|INDEX|VIEW|BACKUP|RESTORE|WITH|AS|INTO|VALUES|SET|BEGIN|END|GO|IF|ELSE|WHILE|DECLARE|EXEC|EXECUTE|NORECOVERY|RECOVERY|MOVE|DISK|LOG|INIT|FORMAT|NAME|SKIP|STATS|REBUILD|REORGANIZE|ONLINE)\b/gi;
    const strings = /('.*?')/g;
    const comments = /(--.*$)/gm;
    const numbers = /\b(\d+)\b/g;

    return sql
      .replace(comments, '<span class="text-sql-comment">$1</span>')
      .replace(strings, '<span class="text-sql-string">$1</span>')
      .replace(keywords, '<span class="text-sql-keyword font-semibold">$1</span>')
      .replace(numbers, '<span class="text-sql-number">$1</span>');
  };

  return (
    <div className="relative group">
      {title && (
        <div className="bg-secondary px-4 py-2 border-b border-code-border">
          <h4 className="text-sm font-medium text-foreground">{title}</h4>
        </div>
      )}
      <div className="bg-code-bg border border-code-border rounded-lg overflow-hidden">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-secondary hover:bg-accent"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="h-4 w-4 text-success" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
          <pre className="p-4 overflow-x-auto text-sm">
            <code
              dangerouslySetInnerHTML={{
                __html: highlightSQL(code),
              }}
              className="text-foreground font-mono"
            />
          </pre>
        </div>
      </div>
    </div>
  );
};
