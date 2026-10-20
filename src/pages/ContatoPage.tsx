import { Mail, Code2 } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'

export function ContatoPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Site"
        title="Contato"
        description="Tem dúvida ou sugestão? Envie um e-mail ou abra uma conversa no GitHub."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <a
          href="mailto:calcinvest.contact@gmail.com"
          className="flex items-start gap-3 rounded-2xl border border-border bg-surface-elevated p-5 transition hover:border-brand-400 dark:border-border-dark dark:bg-surface-elevated-dark"
        >
          <Mail className="mt-0.5 size-5 text-brand-600 dark:text-brand-300" />
          <div>
            <h2 className="font-semibold text-ink dark:text-ink-dark">E-mail</h2>
            <p className="mt-1 text-sm text-ink-muted dark:text-ink-muted-dark">
              calcinvest.contact@gmail.com
            </p>
          </div>
        </a>

        <a
          href="https://github.com/guilhermegps/calcinvest"
          target="_blank"
          rel="noreferrer"
          className="flex items-start gap-3 rounded-2xl border border-border bg-surface-elevated p-5 transition hover:border-brand-400 dark:border-border-dark dark:bg-surface-elevated-dark"
        >
          <Code2 className="mt-0.5 size-5 text-brand-600 dark:text-brand-300" />
          <div>
            <h2 className="font-semibold text-ink dark:text-ink-dark">GitHub</h2>
            <p className="mt-1 text-sm text-ink-muted dark:text-ink-muted-dark">
              github.com/guilhermegps/calcinvest
            </p>
          </div>
        </a>
      </div>
    </div>
  )
}
