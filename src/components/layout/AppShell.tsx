import { NavLink, Outlet } from 'react-router-dom'
import { Menu, X, Wallet } from 'lucide-react'
import { useState } from 'react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const navItems = [
  { to: '/', label: 'Início', end: true },
  { to: '/percentuais', label: 'Percentuais' },
  { to: '/renda-fixa', label: 'Renda Fixa' },
  { to: '/cagr', label: 'CAGR' },
  { to: '/darf-fiis', label: 'DARF FIIs' },
  { to: '/contato', label: 'Contato' },
  { to: '/sobre', label: 'Sobre' },
]

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-lg px-3 py-2 text-sm font-medium transition',
    isActive
      ? 'bg-brand-500/15 text-brand-700 dark:bg-brand-400/15 dark:text-brand-300'
      : 'text-ink-muted hover:bg-black/5 hover:text-ink dark:text-ink-muted-dark dark:hover:bg-white/5 dark:hover:text-ink-dark',
  ].join(' ')

export function AppShell() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-surface/80 backdrop-blur-md dark:border-border-dark/80 dark:bg-surface-dark/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <NavLink to="/" className="flex items-center gap-2 text-ink dark:text-ink-dark" onClick={() => setOpen(false)}>
            <span className="flex size-9 items-center justify-center rounded-xl bg-brand-500 text-white shadow-sm shadow-brand-500/30">
              <Wallet className="size-5" />
            </span>
            <span className="font-display text-2xl tracking-tight">CalcInvest</span>
          </NavLink>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-surface-elevated text-ink lg:hidden dark:border-border-dark dark:bg-surface-elevated-dark dark:text-ink-dark"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-border px-4 py-3 lg:hidden dark:border-border-dark">
            <div className="mx-auto flex max-w-6xl flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={linkClass}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <Outlet />
      </main>

      <footer className="border-t border-border py-6 text-center text-sm text-ink-muted dark:border-border-dark dark:text-ink-muted-dark">
        <p>Copyright © CalcInvest {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}
