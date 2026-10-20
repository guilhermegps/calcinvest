import type { ReactNode } from 'react'

type PageHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  actions?: ReactNode
}

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-300">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-4xl font-semibold leading-snug tracking-normal text-ink sm:text-5xl dark:text-ink-dark">
          {title}
        </h1>
        {description && (
          <p className="mt-3 text-base leading-relaxed text-ink-muted dark:text-ink-muted-dark">
            {description}
          </p>
        )}
      </div>
      {actions}
    </div>
  )
}
