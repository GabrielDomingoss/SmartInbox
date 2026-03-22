import { Moon, Sun } from "lucide-react";
import { cn } from "../lib/utils";

interface IThemeToggleProps {
  theme: "light" | "dark";
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: IThemeToggleProps) {
  return (
    <div className="inline-flex items-center rounded-full border bg-muted p-1">
      <button
        onClick={onToggle}
        className={cn(
          "flex items-center gap-1 rounded-full px-3 py-1 text-xs transition cursor-pointer",
          theme === "light"
            ? "bg-background text-foreground shadow"
            : "text-muted-foreground",
        )}
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        onClick={onToggle}
        className={cn(
          "flex items-center gap-1 rounded-full px-3 py-1 text-xs transition cursor-pointer",
          theme === "dark"
            ? "bg-background text-foreground shadow"
            : "text-muted-foreground",
        )}
      >
        <Moon className="h-4 w-4" />
      </button>
    </div>
  );
}
