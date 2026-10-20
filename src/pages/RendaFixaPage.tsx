import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { PageHeader } from '@/components/ui/PageHeader'
import { ResultCard } from '@/components/ui/ResultCard'
import {
  Field,
  inputClassName,
  buttonPrimaryClassName,
} from '@/components/forms/Field'
import { MoneyInput } from '@/components/forms/MoneyInput'
import { MontanteChart } from '@/components/charts/MontanteChart'
import {
  calcularRendaFixa,
  type PeriodoRendimento,
  type RendaFixaResult,
} from '@/lib/calculators'
import { formatMoney, maskPercentInput, parseBrl } from '@/lib/format/brl'

const schema = z
  .object({
    periodoRendimento: z.enum(['ano', 'mes', 'dia']),
    rendimento: z.string().min(1, 'Informe o rendimento'),
    valorInicial: z.string().min(1, 'Informe o valor inicial'),
    incrementoMensal: z.string(),
    duracaoMeses: z.coerce.number().int().min(0, 'Duração inválida'),
    irRegressivo: z.boolean(),
    irPercent: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.irRegressivo && (!data.irPercent || !data.irPercent.trim())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Informe o IR manual ou ative o IR regressivo',
        path: ['irPercent'],
      })
    }
  })

type FormValues = z.infer<typeof schema>

export function RendaFixaPage() {
  const [result, setResult] = useState<RendaFixaResult | null>(null)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      periodoRendimento: 'mes',
      rendimento: '',
      valorInicial: '',
      incrementoMensal: '',
      duracaoMeses: 12,
      irRegressivo: true,
      irPercent: '',
    },
  })

  const irRegressivo = watch('irRegressivo')
  const valorInicial = watch('valorInicial')
  const incrementoMensal = watch('incrementoMensal')
  const rendimento = watch('rendimento')
  const irPercent = watch('irPercent') ?? ''

  function onSubmit(values: FormValues) {
    const computed = calcularRendaFixa({
      periodoRendimento: values.periodoRendimento as PeriodoRendimento,
      rendimentoPercent: parseBrl(values.rendimento),
      valorInicial: parseBrl(values.valorInicial),
      incrementoMensal: parseBrl(values.incrementoMensal || '0'),
      duracaoMeses: values.duracaoMeses,
      irRegressivo: values.irRegressivo,
      irPercentManual: parseBrl(values.irPercent || '0'),
    })
    setResult(computed)
  }

  return (
    <div>
      <PageHeader
        eyebrow="Ferramenta"
        title="Renda Fixa"
        description="Projete quanto seu dinheiro pode render com juros, aportes e IR regressivo."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 rounded-2xl border border-border bg-surface-elevated p-5 dark:border-border-dark dark:bg-surface-elevated-dark sm:p-6"
        >
          <Field label="Período do rendimento" htmlFor="periodoRendimento">
            <select id="periodoRendimento" className={inputClassName} {...register('periodoRendimento')}>
              <option value="ano">Ao ano</option>
              <option value="mes">Ao mês</option>
              <option value="dia">Ao dia</option>
            </select>
          </Field>

          <Field label="Rendimento (%)" htmlFor="rendimento" error={errors.rendimento?.message}>
            <input
              id="rendimento"
              className={inputClassName}
              inputMode="decimal"
              value={rendimento}
              onChange={(e) =>
                setValue('rendimento', maskPercentInput(e.target.value, 3), { shouldValidate: true })
              }
            />
          </Field>

          <Field label="Valor inicial (R$)" htmlFor="valorInicial" error={errors.valorInicial?.message}>
            <MoneyInput
              id="valorInicial"
              value={valorInicial}
              onChange={(masked) => setValue('valorInicial', masked, { shouldValidate: true })}
            />
          </Field>

          <Field label="Incremento mensal (R$)" htmlFor="incrementoMensal">
            <MoneyInput
              id="incrementoMensal"
              value={incrementoMensal}
              onChange={(masked) => setValue('incrementoMensal', masked)}
            />
          </Field>

          <Field label="Duração (meses)" htmlFor="duracaoMeses" error={errors.duracaoMeses?.message}>
            <input
              id="duracaoMeses"
              type="number"
              min={0}
              step={1}
              className={inputClassName}
              {...register('duracaoMeses')}
            />
          </Field>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-ink dark:text-ink-dark">IR regressivo?</legend>
            <div className="flex gap-4 text-sm">
              <label className="inline-flex items-center gap-2">
                <input type="radio" checked={irRegressivo} onChange={() => setValue('irRegressivo', true)} />
                Sim
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" checked={!irRegressivo} onChange={() => setValue('irRegressivo', false)} />
                Não
              </label>
            </div>
          </fieldset>

          {!irRegressivo && (
            <Field label="IR (%)" htmlFor="irPercent" error={errors.irPercent?.message}>
              <input
                id="irPercent"
                className={inputClassName}
                inputMode="decimal"
                value={irPercent}
                onChange={(e) =>
                  setValue('irPercent', maskPercentInput(e.target.value, 2), { shouldValidate: true })
                }
              />
            </Field>
          )}

          <button type="submit" className={buttonPrimaryClassName}>
            Calcular
          </button>
        </form>

        {result && (
          <div className="space-y-6">
            <ResultCard
              title="Resultado"
              rows={[
                { label: 'Valor total bruto', value: formatMoney(result.valorTotalBruto) },
                {
                  label: 'Total investido',
                  value: formatMoney(result.totalInvestido),
                  tone: 'invested',
                },
                {
                  label: 'Lucro bruto',
                  value: formatMoney(result.lucroBruto),
                  tone: 'profit',
                },
                {
                  label: 'Lucro líquido',
                  value: formatMoney(result.lucroLiquido),
                  tone: 'profit',
                },
                {
                  label: 'Imposto de renda pago',
                  value: formatMoney(result.irPago),
                  tone: 'tax',
                },
                {
                  label: 'Valor total líquido',
                  value: formatMoney(result.valorTotalLiquido),
                  tone: 'net',
                },
              ]}
            />
            <section className="rounded-2xl border border-border bg-surface-elevated p-5 dark:border-border-dark dark:bg-surface-elevated-dark sm:p-6">
              <h2 className="mb-4 font-display text-2xl font-semibold leading-snug text-ink dark:text-ink-dark">
                Composição do montante
              </h2>
              <MontanteChart
                investido={result.totalInvestido}
                rendimento={result.lucroLiquido}
                impostos={result.irPago}
              />
            </section>
          </div>
        )}
      </div>
    </div>
  )
}
