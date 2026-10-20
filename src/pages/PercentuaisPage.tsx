import { useMemo, useState } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { ResultCard } from '@/components/ui/ResultCard'
import { Field, inputClassName, buttonPrimaryClassName } from '@/components/forms/Field'
import {
  diferencaPercentual,
  porcentagemDe,
  quantoPorcentoE,
  somarPorcentagem,
  subtrairPorcentagem,
} from '@/lib/calculators'
import { formatBrl, formatPercent } from '@/lib/format/brl'

type TabId = 'quanto' | 'de' | 'diff' | 'somar' | 'subtrair'

const tabs: { id: TabId; label: string }[] = [
  { id: 'quanto', label: 'Quanto % é' },
  { id: 'de', label: '% de' },
  { id: 'diff', label: 'Diferença %' },
  { id: 'somar', label: 'Somar %' },
  { id: 'subtrair', label: 'Subtrair %' },
]

export function PercentuaisPage() {
  const [tab, setTab] = useState<TabId>('quanto')
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [result, setResult] = useState<string | null>(null)

  const labels = useMemo(() => {
    switch (tab) {
      case 'quanto':
        return { a: 'Valor A', b: 'Valor B (base)' }
      case 'de':
        return { a: 'Porcentagem (%)', b: 'Valor' }
      case 'diff':
        return { a: 'Valor inicial', b: 'Valor final' }
      case 'somar':
      case 'subtrair':
        return { a: 'Valor', b: 'Porcentagem (%)' }
    }
  }, [tab])

  function calcular(e: React.FormEvent) {
    e.preventDefault()
    const nA = Number(a.replace(',', '.'))
    const nB = Number(b.replace(',', '.'))
    if (Number.isNaN(nA) || Number.isNaN(nB)) {
      setResult(null)
      return
    }

    switch (tab) {
      case 'quanto':
        setResult(formatPercent(quantoPorcentoE(nA, nB)))
        break
      case 'de':
        setResult(formatBrl(porcentagemDe(nA, nB)))
        break
      case 'diff':
        setResult(formatPercent(diferencaPercentual(nA, nB)))
        break
      case 'somar':
        setResult(formatBrl(somarPorcentagem(nA, nB)))
        break
      case 'subtrair':
        setResult(formatBrl(subtrairPorcentagem(nA, nB)))
        break
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Ferramenta"
        title="Percentuais"
        description="Operações básicas de porcentagem para consultas rápidas."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setTab(item.id)
              setResult(null)
            }}
            className={[
              'rounded-full px-3 py-1.5 text-sm font-medium transition',
              tab === item.id
                ? 'bg-brand-500 text-white'
                : 'bg-black/5 text-ink-muted hover:text-ink dark:bg-white/5 dark:text-ink-muted-dark dark:hover:text-ink-dark',
            ].join(' ')}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <form
          onSubmit={calcular}
          className="space-y-4 rounded-2xl border border-border bg-surface-elevated p-5 dark:border-border-dark dark:bg-surface-elevated-dark sm:p-6"
        >
          <Field label={labels.a} htmlFor="pct-a">
            <input
              id="pct-a"
              className={inputClassName}
              inputMode="decimal"
              value={a}
              onChange={(e) => setA(e.target.value)}
              required
            />
          </Field>
          <Field label={labels.b} htmlFor="pct-b">
            <input
              id="pct-b"
              className={inputClassName}
              inputMode="decimal"
              value={b}
              onChange={(e) => setB(e.target.value)}
              required
            />
          </Field>
          <button type="submit" className={buttonPrimaryClassName}>
            Calcular
          </button>
        </form>

        {result !== null && (
          <ResultCard title="Resultado" rows={[{ label: 'Valor', value: result, emphasis: 'highlight' }]} />
        )}
      </div>
    </div>
  )
}
