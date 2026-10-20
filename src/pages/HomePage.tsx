import { Link } from 'react-router-dom'
import { ArrowRight, Calculator, ChartPie, Percent, Receipt } from 'lucide-react'

const tools = [
  {
    to: '/percentuais',
    title: 'Percentuais',
    description: 'Descubra quanto um valor representa de outro, some ou subtraia porcentagens.',
    icon: Percent,
  },
  {
    to: '/renda-fixa',
    title: 'Renda Fixa',
    description: 'Projete o montante com juros, aportes mensais e desconto de IR.',
    icon: ChartPie,
  },
  {
    to: '/cagr',
    title: 'CAGR',
    description: 'Veja a rentabilidade média anual entre o valor inicial e o final.',
    icon: Calculator,
  },
  {
    to: '/darf-fiis',
    title: 'DARF FIIs',
    description: 'Calcule preço médio, dedo-duro e quanto de IR pode dever na venda.',
    icon: Receipt,
  },
]

export function HomePage() {
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-3xl border border-border bg-surface-elevated px-6 py-12 sm:px-10 sm:py-16 dark:border-border-dark dark:bg-surface-elevated-dark">
        <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-brand-400/20 blur-3xl" />
        <div className="relative max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-600 dark:text-brand-300">
            CalcInvest
          </p>
          <h1 className="font-display text-4xl font-semibold leading-snug text-ink sm:text-5xl dark:text-ink-dark">
            Simule seus investimentos com clareza
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted dark:text-ink-muted-dark">
            Compare cenários de renda fixa, porcentagens, retorno anualizado e IR de FIIs — de
            graça e sem cadastro.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/renda-fixa"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-500/30 transition hover:bg-brand-600"
            >
              Simular renda fixa
              <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/sobre"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold text-ink transition hover:border-brand-400 dark:border-border-dark dark:text-ink-dark"
            >
              Saiba mais
            </Link>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-6 font-display text-3xl font-semibold leading-snug text-ink dark:text-ink-dark">
          Ferramentas
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {tools.map((tool) => (
            <Link
              key={tool.to}
              to={tool.to}
              className="group rounded-2xl border border-border bg-surface-elevated p-5 transition hover:border-brand-400 hover:shadow-md dark:border-border-dark dark:bg-surface-elevated-dark"
            >
              <tool.icon className="mb-3 size-6 text-brand-600 transition group-hover:scale-105 dark:text-brand-300" />
              <h3 className="text-lg font-semibold text-ink dark:text-ink-dark">{tool.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted dark:text-ink-muted-dark">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
