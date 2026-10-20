import { useMemo, useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { ResultCard } from '@/components/ui/ResultCard'
import {
  Field,
  inputClassName,
  buttonPrimaryClassName,
  buttonSecondaryClassName,
} from '@/components/forms/Field'
import { MoneyInput } from '@/components/forms/MoneyInput'
import {
  calcularDarfFiis,
  totalPagoCompra,
  totalRecebidoVenda,
  type DarfFiisResult,
} from '@/lib/calculators'
import { formatBrl, formatMoney, formatPercent, parseBrl } from '@/lib/format/brl'

type CompraRow = {
  id: string
  quantidade: string
  valorCota: string
  taxas: string
}

function newCompra(): CompraRow {
  return {
    id: crypto.randomUUID(),
    quantidade: '',
    valorCota: '',
    taxas: '',
  }
}

export function DarfFiisPage() {
  const [nome, setNome] = useState('')
  const [compras, setCompras] = useState<CompraRow[]>([newCompra()])
  const [qtdVenda, setQtdVenda] = useState('')
  const [vlrCotaVenda, setVlrCotaVenda] = useState('')
  const [taxasVenda, setTaxasVenda] = useState('')
  const [result, setResult] = useState<DarfFiisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const totalRecebidoPreview = useMemo(() => {
    return formatBrl(
      totalRecebidoVenda({
        quantidade: Number(qtdVenda) || 0,
        valorCota: parseBrl(vlrCotaVenda),
        taxas: parseBrl(taxasVenda),
      }),
    )
  }, [qtdVenda, vlrCotaVenda, taxasVenda])

  function updateCompra(id: string, patch: Partial<CompraRow>) {
    setCompras((rows) => rows.map((row) => (row.id === id ? { ...row, ...patch } : row)))
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      setError(null)
      const computed = calcularDarfFiis({
        nome,
        compras: compras.map((c) => ({
          quantidade: Number(c.quantidade) || 0,
          valorCota: parseBrl(c.valorCota),
          taxas: parseBrl(c.taxas),
        })),
        venda: {
          quantidade: Number(qtdVenda) || 0,
          valorCota: parseBrl(vlrCotaVenda),
          taxas: parseBrl(taxasVenda),
        },
      })
      setResult(computed)
    } catch (err) {
      setResult(null)
      setError(err instanceof Error ? err.message : 'Não foi possível calcular.')
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Ferramenta"
        title="DARF FIIs"
        description="Estime preço médio de compra, dedo-duro (0,005%) e IR de 20% sobre o lucro."
      />

      <form onSubmit={onSubmit} className="space-y-6">
        <section className="space-y-4 rounded-2xl border border-border bg-surface-elevated p-5 dark:border-border-dark dark:bg-surface-elevated-dark sm:p-6">
          <Field label="Nome do FII" htmlFor="nome" hint="Até 6 caracteres (ex.: HGLG11)">
            <input
              id="nome"
              maxLength={6}
              className={inputClassName}
              value={nome}
              onChange={(e) => setNome(e.target.value.toUpperCase())}
            />
          </Field>

          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-2xl text-ink dark:text-ink-dark">Compras</h2>
            <button
              type="button"
              className={buttonSecondaryClassName}
              onClick={() => setCompras((rows) => [...rows, newCompra()])}
            >
              <Plus className="size-4" />
              Adicionar
            </button>
          </div>

          <div className="space-y-4">
            {compras.map((compra, index) => {
              const total = formatBrl(
                totalPagoCompra({
                  quantidade: Number(compra.quantidade) || 0,
                  valorCota: parseBrl(compra.valorCota),
                  taxas: parseBrl(compra.taxas),
                }),
              )
              return (
                <div
                  key={compra.id}
                  className="grid gap-3 rounded-xl border border-border/80 p-3 dark:border-border-dark/80 sm:grid-cols-2 lg:grid-cols-5"
                >
                  <Field label="Quantidade" htmlFor={`qtd-${compra.id}`}>
                    <input
                      id={`qtd-${compra.id}`}
                      type="number"
                      min={1}
                      className={inputClassName}
                      value={compra.quantidade}
                      onChange={(e) => updateCompra(compra.id, { quantidade: e.target.value })}
                      required
                    />
                  </Field>
                  <Field label="Valor da cota (R$)" htmlFor={`vlr-${compra.id}`}>
                    <MoneyInput
                      id={`vlr-${compra.id}`}
                      value={compra.valorCota}
                      onChange={(masked) => updateCompra(compra.id, { valorCota: masked })}
                    />
                  </Field>
                  <Field label="Taxas (R$)" htmlFor={`tax-${compra.id}`}>
                    <MoneyInput
                      id={`tax-${compra.id}`}
                      value={compra.taxas}
                      onChange={(masked) => updateCompra(compra.id, { taxas: masked })}
                    />
                  </Field>
                  <Field label="Total pago (R$)" htmlFor={`tot-${compra.id}`}>
                    <input id={`tot-${compra.id}`} className={inputClassName} value={total} readOnly />
                  </Field>
                  <div className="flex items-end">
                    <button
                      type="button"
                      className={`${buttonSecondaryClassName} w-full text-rose-600 dark:text-rose-400`}
                      disabled={compras.length === 1}
                      onClick={() => setCompras((rows) => rows.filter((r) => r.id !== compra.id))}
                      aria-label={`Remover compra ${index + 1}`}
                    >
                      <Trash2 className="size-4" />
                      Remover
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-border bg-surface-elevated p-5 dark:border-border-dark dark:bg-surface-elevated-dark sm:p-6">
          <h2 className="font-display text-2xl text-ink dark:text-ink-dark">Venda</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Field label="Quantidade" htmlFor="qtdVenda">
              <input
                id="qtdVenda"
                type="number"
                min={1}
                className={inputClassName}
                value={qtdVenda}
                onChange={(e) => setQtdVenda(e.target.value)}
                required
              />
            </Field>
            <Field label="Valor da cota (R$)" htmlFor="vlrCotaVenda">
              <MoneyInput id="vlrCotaVenda" value={vlrCotaVenda} onChange={(masked) => setVlrCotaVenda(masked)} />
            </Field>
            <Field label="Taxas (R$)" htmlFor="taxasVenda">
              <MoneyInput id="taxasVenda" value={taxasVenda} onChange={(masked) => setTaxasVenda(masked)} />
            </Field>
            <Field label="Total recebido (R$)" htmlFor="totalRecebido">
              <input id="totalRecebido" className={inputClassName} value={totalRecebidoPreview} readOnly />
            </Field>
          </div>
        </section>

        {error && (
          <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-300">
            {error}
          </p>
        )}

        <button type="submit" className={buttonPrimaryClassName}>
          Calcular DARF
        </button>
      </form>

      {result && (
        <div className="mt-6">
          <ResultCard
            title={result.nome ? `Resultado — ${result.nome}` : 'Resultado'}
            rows={[
              { label: 'Valor médio da compra', value: formatMoney(result.vlrMedioCompra) },
              { label: 'Total das compras', value: formatMoney(result.totalCompras) },
              { label: 'Dedo duro (0,005%)', value: formatMoney(result.dedoDuro) },
              {
                label: 'Lucro bruto',
                value: formatMoney(result.lucroBruto),
                emphasis: result.lucroBruto.gte(0) ? 'success' : 'danger',
              },
              { label: 'Percentual de lucro', value: formatPercent(result.pctLucro) },
              {
                label: 'Total venda − dedo duro',
                value: formatMoney(result.vendaSemDedoDuro),
              },
              ...(result.irDevido.gt(0)
                ? [
                    {
                      label: 'IR devido (20%) / DARF',
                      value: formatMoney(result.irDevido),
                      emphasis: 'danger' as const,
                    },
                  ]
                : []),
            ]}
          />
        </div>
      )}
    </div>
  )
}
