import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/app/theme-context'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Ativar tema claro' : 'Ativar tema noturno'}
      className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-surface-elevated text-ink transition hover:border-brand-400 hover:text-brand-600 dark:border-border-dark dark:bg-surface-elevated-dark dark:text-ink-dark dark:hover:border-brand-400 dark:hover:text-brand-300"
    >
      {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </button>
  )
}
