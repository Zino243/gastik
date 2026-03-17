"use client"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="h-12 w-12 rounded-full bg-secondary"
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  )
}