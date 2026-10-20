import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { PageHeader } from '@/components/ui/PageHeader'
import { ResultCard } from '@/components/ui/ResultCard'
import { Field, inputClassName, buttonPrimaryClassName } from '@/components/forms/Field'
import { MoneyInput } from '@/components/forms/MoneyInput'
import { calcularCagr, type CagrResult } from '@/lib/calculators'
import { formatBrl, formatInt, formatPercent, parseBrl } from '@/lib/format/brl'

const schema = z.object({
  valorInicial: z.string().min(1, 'Informe o valor inicial'),
  valorFinal: z.string().min(1, 'Informe o valor final'),
  anos: z.coerce.number().positive('A duração deve ser maior que zero'),
})

type FormValues = z.infer<typeof schema>

export function CagrPage() {
  const [result, setResult] = useState<CagrResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { valorInicial: '', valorFinal: '', anos: undefined },
  })

  const valorInicial = watch('valorInicial')
  const valorFinal = watch('valorFinal')

  function onSubmit(values: FormValues) {
    try {
      setError(null)
      setResult(
        calcularCagr({
          valorInicial: parseBrl(values.valorInicial),
          valorFinal: parseBrl(values.valorFinal),
          anos: values.anos,
        }),
      )
    } catch (err) {
      setResult(null)
      setError(err instanceof Error ? err.message : 'Não foi possível calcular.')
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Ferramenta"
        title="CAGR — Juros anual"
        description="Descubra a rentabilidade média ao ano entre o que você investiu e o que tem hoje."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 rounded-2xl border border-border bg-surface-elevated p-5 dark:border-border-dark dark:bg-surface-elevated-dark sm:p-6"
        >
          <Field label="Valor inicial (R$)" htmlFor="valorInicial" error={errors.valorInicial?.message}>
            <MoneyInput
              id="valorInicial"
              value={valorInicial}
              onChange={(masked) => setValue('valorInicial', masked, { shouldValidate: true })}
            />
          </Field>
          <Field label="Valor final (R$)" htmlFor="valorFinal" error={errors.valorFinal?.message}>
            <MoneyInput
              id="valorFinal"
              value={valorFinal}
              onChange={(masked) => setValue('valorFinal', masked, { shouldValidate: true })}
            />
          </Field>
          <Field label="Duração (anos)" htmlFor="anos" error={errors.anos?.message}>
            <input
              id="anos"
              type="number"
              min={1}
              step={1}
              className={inputClassName}
              {...register('anos')}
            />
          </Field>
          {error && <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>}
          <button type="submit" className={buttonPrimaryClassName}>
            Calcular
          </button>
        </form>

        {result && (
          <ResultCard
            title="Resultado"
            rows={[
              { label: 'Período (anos)', value: formatInt(result.periodoAnos) },
              {
                label: 'CAGR — Juros Anual',
                value: formatPercent(result.cagrPercent),
                emphasis: 'highlight',
              },
              { label: 'Acumulado', value: formatPercent(result.acumuladoPercent), emphasis: 'success' },
              {
                label: 'Valor final / inicial',
                value: `${formatBrl(result.vezesInicial)}×`,
              },
            ]}
          />
        )}
      </div>
    </div>
  )
}
