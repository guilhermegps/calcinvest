import type { ReactNode } from 'react'

type FieldProps = {
  label: string
  htmlFor: string
  error?: string
  hint?: string
  children: ReactNode
}

export function Field({ label, htmlFor, error, hint, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-ink dark:text-ink-dark">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p className="text-xs text-ink-muted dark:text-ink-muted-dark">{hint}</p>
      )}
      {error && <p className="text-xs text-rose-600 dark:text-rose-400">{error}</p>}
    </div>
  )
}

export const inputClassName =
  'w-full rounded-xl border border-border bg-surface-elevated px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-ink-muted/70 focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30 dark:border-border-dark dark:bg-surface-dark dark:text-ink-dark dark:placeholder:text-ink-muted-dark/70'

export const buttonPrimaryClassName =
  'inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-500/25 transition hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 disabled:cursor-not-allowed disabled:opacity-60'

export const buttonSecondaryClassName =
  'inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface-elevated px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-brand-400 dark:border-border-dark dark:bg-surface-elevated-dark dark:text-ink-dark'
