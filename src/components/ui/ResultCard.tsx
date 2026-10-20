import type { ReactNode } from 'react'

export type ResultTone = 'default' | 'invested' | 'profit' | 'tax' | 'net'

type ResultRow = {
  label: string
  value: ReactNode
  tone?: ResultTone
}

type ResultCardProps = {
  title: string
  rows: ResultRow[]
  footer?: ReactNode
}

const TONE: Record<
  ResultTone,
  { value: string; swatch?: string; boxed?: string }
> = {
  default: {
    value: 'text-ink dark:text-ink-dark',
  },
  invested: {
    value: 'text-[#2c9faf] dark:text-[#4ec3d4]',
    swatch: 'bg-[#36b9cc]',
  },
  profit: {
    value: 'text-[#1a9c6c] dark:text-[#3dd6a0]',
    swatch: 'bg-[#1cc88a]',
  },
  tax: {
    value: 'text-[#c93a2e] dark:text-[#f07167]',
    swatch: 'bg-[#e74a3b]',
  },
  net: {
    value: 'text-brand-800 dark:text-brand-200',
    boxed:
      'rounded-xl border border-brand-400/50 bg-brand-500/10 px-3 py-2 dark:border-brand-400/40 dark:bg-brand-400/10',
  },
}

export function ResultCard({ title, rows, footer }: ResultCardProps) {
  return (
    <section className="rounded-2xl border border-border bg-surface-elevated p-5 shadow-sm dark:border-border-dark dark:bg-surface-elevated-dark sm:p-6">
      <h2 className="mb-4 font-display text-2xl font-semibold leading-snug text-ink dark:text-ink-dark">
        {title}
      </h2>
      <dl className="space-y-3">
        {rows.map((row) => {
          const tone = TONE[row.tone ?? 'default']
          return (
            <div
              key={row.label}
              className={[
                'flex items-center justify-between gap-4 border-b border-border/70 pb-3 last:border-0 last:pb-0 dark:border-border-dark/70',
                tone.boxed,
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <dt className="flex items-center gap-2 text-sm text-ink-muted dark:text-ink-muted-dark">
                {tone.swatch && (
                  <span className={`size-2.5 shrink-0 rounded-full ${tone.swatch}`} aria-hidden />
                )}
                {row.label}
              </dt>
              <dd className={`text-right text-base font-semibold tabular-nums ${tone.value}`}>
                {row.value}
              </dd>
            </div>
          )
        })}
      </dl>
      {footer && <div className="mt-5">{footer}</div>}
    </section>
  )
}
