import Decimal from 'decimal.js'
import { porcentagemDe } from './percentuais'

export type PeriodoRendimento = 'ano' | 'mes' | 'dia'

export type RendaFixaInput = {
  periodoRendimento: PeriodoRendimento
  rendimentoPercent: Decimal.Value
  valorInicial: Decimal.Value
  incrementoMensal: Decimal.Value
  duracaoMeses: number
  irRegressivo: boolean
  irPercentManual?: Decimal.Value
  dataBase?: Date
}

export type RendaFixaResult = {
  valorTotalBruto: Decimal
  totalInvestido: Decimal
  lucroBruto: Decimal
  lucroLiquido: Decimal
  valorTotalLiquido: Decimal
  irPago: Decimal
  diasTotais: number
}

/** Brazilian regressive IR table for fixed income (calendar days). */
export function valueOfIR(diasCorridos: number): number {
  if (diasCorridos < 181) return 22.5
  if (diasCorridos < 361) return 20
  if (diasCorridos < 721) return 17.5
  return 15
}

export function calcularJurosCompostos(
  valor: Decimal.Value,
  jurosPercent: Decimal.Value,
  periodos: Decimal.Value,
): Decimal {
  const i = new Decimal(jurosPercent).div(100)
  return new Decimal(valor).mul(new Decimal(1).plus(i).pow(periodos))
}

function startOfDay(date: Date): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

/** Add months on calendar (corrects previous setFullYear(+months) bug). */
export function addMonths(date: Date, months: number): Date {
  const result = startOfDay(date)
  const day = result.getDate()
  result.setMonth(result.getMonth() + months)
  if (result.getDate() < day) {
    result.setDate(0)
  }
  return result
}

export function diasEntre(inicio: Date, fim: Date): number {
  const a = startOfDay(inicio).getTime()
  const b = startOfDay(fim).getTime()
  return Math.max(0, Math.ceil(Math.abs(b - a) / (1000 * 60 * 60 * 24)))
}

export function calcularRendaFixa(input: RendaFixaInput): RendaFixaResult {
  const duracao = Math.trunc(input.duracaoMeses)
  if (duracao < 0) {
    throw new Error('A duração em meses não pode ser negativa.')
  }

  const valorIni = new Decimal(input.valorInicial)
  const incremento = new Decimal(input.incrementoMensal)
  const rendimento = new Decimal(input.rendimentoPercent)
  const dataBase = startOfDay(input.dataBase ?? new Date())
  const dataTermino = addMonths(dataBase, duracao)
  const diasTotais = diasEntre(dataBase, dataTermino)

  let tempoRendimento: Decimal
  if (input.periodoRendimento === 'ano') {
    tempoRendimento = new Decimal(duracao).div(12)
  } else if (input.periodoRendimento === 'mes') {
    tempoRendimento = new Decimal(duracao)
  } else {
    tempoRendimento = new Decimal(diasTotais)
  }

  const irInicial = input.irRegressivo
    ? valueOfIR(diasTotais)
    : new Decimal(input.irPercentManual ?? 0).toNumber()

  let valorTotalBruto = calcularJurosCompostos(valorIni, rendimento, tempoRendimento)
  let totalInvestido = valorIni
  let irPago = porcentagemDe(irInicial, valorTotalBruto.minus(valorIni))

  const diasPorMes = duracao > 0 ? new Decimal(diasTotais).div(duracao) : new Decimal(0)
  let rentabilidadeMes: Decimal
  if (input.periodoRendimento === 'ano') {
    rentabilidadeMes = rendimento.div(12)
  } else if (input.periodoRendimento === 'mes') {
    rentabilidadeMes = rendimento
  } else {
    rentabilidadeMes = rendimento.mul(diasPorMes)
  }

  for (let i = 1; i <= duracao; i++) {
    const mesesRestantes = duracao - i
    const montanteAporte = calcularJurosCompostos(incremento, rentabilidadeMes, mesesRestantes)
    const rendimentoBruto = montanteAporte.minus(incremento)
    const irCobrar = input.irRegressivo
      ? valueOfIR(diasPorMes.mul(mesesRestantes).toNumber())
      : new Decimal(input.irPercentManual ?? 0).toNumber()
    const irPeriodo = porcentagemDe(irCobrar, rendimentoBruto)

    valorTotalBruto = valorTotalBruto.plus(incremento).plus(rendimentoBruto)
    totalInvestido = totalInvestido.plus(incremento)
    irPago = irPago.plus(irPeriodo)
  }

  const lucroBruto = valorTotalBruto.minus(totalInvestido)
  const valorTotalLiquido = valorTotalBruto.minus(irPago)
  const lucroLiquido = valorTotalLiquido.minus(totalInvestido)

  return {
    valorTotalBruto,
    totalInvestido,
    lucroBruto,
    lucroLiquido,
    valorTotalLiquido,
    irPago,
    diasTotais,
  }
}
