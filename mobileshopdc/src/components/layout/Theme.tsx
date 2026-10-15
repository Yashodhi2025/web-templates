import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

type Theme = "light" | "dark";
const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({ theme: "dark", toggle: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("phonex-theme");
      if (saved === "light" || saved === "dark") setTheme(saved);
    } catch { /* Storage may be unavailable in private browsing. */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
    try { localStorage.setItem("phonex-theme", theme); } catch { /* Theme still works without storage. */ }
  }, [theme, ready]);

  return <ThemeContext.Provider value={{ theme, toggle: () => setTheme((current) => current === "dark" ? "light" : "dark") }}>{children}</ThemeContext.Provider>;
}

export function ThemeToggle() {
  const { theme, toggle } = useContext(ThemeContext);
  const label = `Switch to ${theme === "dark" ? "light" : "dark"} theme`;
  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label={label} title={label} className="h-10 w-10 shrink-0 rounded-full">
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}