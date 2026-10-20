import { PageHeader } from '@/components/ui/PageHeader'

export function SobrePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Site"
        title="Sobre"
        description="O CalcInvest nasceu para tornar simulações financeiras mais acessíveis e transparentes."
      />

      <article className="prose-like max-w-3xl space-y-4 rounded-2xl border border-border bg-surface-elevated p-6 text-ink-muted dark:border-border-dark dark:bg-surface-elevated-dark dark:text-ink-muted-dark">
        <p>
          Esta é uma plataforma de cálculos financeiros voltada a quem quer simular situações de
          finanças pessoais e mercado financeiro — sem cadastro e sem backend.
        </p>
        <p>
          Escolha a operação desejada, informe os dados e a ferramenta calcula o restante. Os
          resultados são estimativas educacionais e podem divergir de corretoras ou sistemas oficiais.
        </p>
        <p>
          Código aberto e contribuições são bem-vindas no repositório do projeto.
        </p>
        <p>
          <a
            className="font-medium text-brand-700 underline-offset-2 hover:underline dark:text-brand-300"
            href="https://github.com/calcinvest/calcinvest.github.io"
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
