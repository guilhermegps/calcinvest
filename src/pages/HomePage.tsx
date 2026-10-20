import { Link } from 'react-router-dom'
import { ArrowRight, Calculator, ChartPie, Percent, Receipt } from 'lucide-react'

const tools = [
  {
    to: '/percentuais',
    title: 'Percentuais',
    description: 'Cinco operações rápidas de porcentagem para o dia a dia.',
    icon: Percent,
  },
  {
    to: '/renda-fixa',
    title: 'Renda Fixa',
    description: 'Simule juros compostos, aportes mensais e IR regressivo.',
    icon: ChartPie,
  },
  {
    to: '/cagr',
    title: 'CAGR',
    description: 'Calcule o retorno anualizado entre dois valores no tempo.',
    icon: Calculator,
  },
  {
    to: '/darf-fiis',
    title: 'DARF FIIs',
    description: 'Estime preço médio, dedo-duro e IR devido na venda de FIIs.',
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
          <h1 className="font-display text-5xl leading-tight text-ink sm:text-6xl dark:text-ink-dark">
            Simule investimentos com clareza.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted dark:text-ink-muted-dark">
            Ferramentas gratuitas para finanças pessoais e mercado financeiro — modernas,
            responsivas e 100% no navegador.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/renda-fixa"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-500/30 transition hover:bg-brand-600"
            >
              Começar pela Renda Fixa
              <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/sobre"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold text-ink transition hover:border-brand-400 dark:border-border-dark dark:text-ink-dark"
            >
              Sobre o projeto
            </Link>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-6 font-display text-3xl text-ink dark:text-ink-dark">Ferramentas</h2>
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

      <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-900 dark:text-amber-100">
        Os resultados são estimativas educacionais. Confira sempre com sua corretora ou
        contador antes de tomar decisões financeiras.
      </p>
    </div>
  )
}
