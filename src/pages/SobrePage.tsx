import { PageHeader } from '@/components/ui/PageHeader'

export function SobrePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Site"
        title="Sobre"
        description="O CalcInvest ajuda você a simular decisões financeiras com mais transparência."
      />

      <article className="max-w-3xl space-y-4 rounded-2xl border border-border bg-surface-elevated p-6 text-ink-muted dark:border-border-dark dark:bg-surface-elevated-dark dark:text-ink-muted-dark">
        <p>
          Aqui você encontra calculadoras para finanças pessoais e mercado financeiro: renda fixa,
          porcentagens, retorno anualizado (CAGR) e estimativa de IR na venda de FIIs.
        </p>
        <p>
          Escolha a ferramenta, informe os dados e veja o resultado na hora. Não é preciso criar
          conta. Os valores servem de referência e podem diferir do que sua corretora ou contador
          apuram.
        </p>
        <p>O projeto é aberto a contribuições no GitHub.</p>
        <p>
          <a
            className="font-medium text-brand-700 underline-offset-2 hover:underline dark:text-brand-300"
            href="https://github.com/guilhermegps/calcinvest"
            target="_blank"
            rel="noreferrer"
          >
            Ver no GitHub
          </a>
        </p>
      </article>
    </div>
  )
}
