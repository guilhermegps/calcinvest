import type Decimal from 'decimal.js'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { formatMoney } from '@/lib/format/brl'

type MontanteChartProps = {
  investido: Decimal
  rendimento: Decimal
  impostos: Decimal
}

const COLORS = ['#1f9bbb', '#34d399', '#fb7185']

export function MontanteChart({ investido, rendimento, impostos }: MontanteChartProps) {
  const data = [
    { name: 'Investimento', value: Math.max(0, investido.toNumber()) },
    { name: 'Rendimento', value: Math.max(0, rendimento.toNumber()) },
    { name: 'Impostos', value: Math.max(0, impostos.toNumber()) },
  ].filter((item) => item.value > 0)

  if (!data.length) {
    return (
      <p className="text-sm text-ink-muted dark:text-ink-muted-dark">
        Sem dados suficientes para o gráfico.
      </p>
    )
  }

  return (
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
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => formatMoney(value)}
            contentStyle={{
              borderRadius: 12,
              border: '1px solid #d5e0e5',
              background: 'var(--tooltip-bg, #fff)',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <ul className="mt-2 flex flex-wrap justify-center gap-4 text-xs text-ink-muted dark:text-ink-muted-dark">
        {data.map((item, index) => (
          <li key={item.name} className="inline-flex items-center gap-2">
            <span
              className="size-2.5 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
