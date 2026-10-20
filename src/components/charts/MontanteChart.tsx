import type Decimal from 'decimal.js'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { formatPercent } from '@/lib/format/brl'

type MontanteChartProps = {
  investido: Decimal
  rendimento: Decimal
  impostos: Decimal
}

const SLICES = [
  { name: 'Investimento', key: 'investido' as const, color: '#36b9cc' },
  { name: 'Rendimento', key: 'rendimento' as const, color: '#1cc88a' },
  { name: 'Impostos', key: 'impostos' as const, color: '#e74a3b' },
]

export function MontanteChart({ investido, rendimento, impostos }: MontanteChartProps) {
  const amounts = {
    investido: Math.max(0, investido.toNumber()),
    rendimento: Math.max(0, rendimento.toNumber()),
    impostos: Math.max(0, impostos.toNumber()),
  }
  const total = amounts.investido + amounts.rendimento + amounts.impostos

  const data = SLICES.map((slice) => {
    const value = amounts[slice.key]
    const percent = total > 0 ? (value / total) * 100 : 0
    return { ...slice, value, percent }
  }).filter((item) => item.value > 0)

  if (!data.length) {
    return (
      <p className="text-sm text-ink-muted dark:text-ink-muted-dark">
        Sem dados suficientes para o gráfico.
      </p>
    )
  }

  return (
    <div className="w-full">
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="68%"
              outerRadius="88%"
              paddingAngle={2}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(_value, _name, item) => {
                const percent = Number(item?.payload?.percent ?? 0)
                return [formatPercent(percent), item?.payload?.name ?? '']
              }}
              contentStyle={{
                borderRadius: 12,
                border: '1px solid #d5e0e5',
                background: 'var(--tooltip-bg, #fff)',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="mt-2 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-ink-muted dark:text-ink-muted-dark">
        {data.map((item) => (
          <li key={item.name} className="inline-flex items-center gap-2">
            <span className="size-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <span>
              {item.name}{' '}
              <span className="font-semibold tabular-nums text-ink dark:text-ink-dark">
                {formatPercent(item.percent)}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
