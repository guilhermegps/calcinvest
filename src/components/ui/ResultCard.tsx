import type { ReactNode } from 'react'

type ResultRow = {
  label: string
  value: ReactNode
  emphasis?: 'default' | 'success' | 'danger' | 'highlight'
}

type ResultCardProps = {
  title: string
  rows: ResultRow[]
  footer?: ReactNode
}

const valueClass: Record<NonNullable<ResultRow['emphasis']>, string> = {
  default: 'text-ink dark:text-ink-dark',
  success: 'text-emerald-600 dark:text-emerald-400',
  danger: 'text-rose-600 dark:text-rose-400',
  highlight: 'text-brand-700 dark:text-brand-300',
}

export function ResultCard({ title, rows, footer }: ResultCardProps) {
  return (
    <section className="rounded-2xl border border-border bg-surface-elevated p-5 shadow-sm dark:border-border-dark dark:bg-surface-elevated-dark sm:p-6">
      <h2 className="mb-4 font-display text-2xl text-ink dark:text-ink-dark">{title}</h2>
      <dl className="space-y-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between gap-4 border-b border-border/70 pb-3 last:border-0 last:pb-0 dark:border-border-dark/70"
          >
            <dt className="text-sm text-ink-muted dark:text-ink-muted-dark">{row.label}</dt>
            <dd className={`text-right text-base font-semibold tabular-nums ${valueClass[row.emphasis ?? 'default']}`}>
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
      {footer && <div className="mt-5">{footer}</div>}
    </section>
  )
}
