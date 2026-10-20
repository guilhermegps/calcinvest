import Decimal from 'decimal.js'
import { diferencaPercentual, quantasVezes } from './percentuais'

export type CagrInput = {
  valorInicial: Decimal.Value
  valorFinal: Decimal.Value
  anos: Decimal.Value
}

export type CagrResult = {
  periodoAnos: Decimal
  cagrPercent: Decimal
  acumuladoPercent: Decimal
  vezesInicial: Decimal
}

export function calcularCagr(input: CagrInput): CagrResult {
  const inicial = new Decimal(input.valorInicial)
  const final = new Decimal(input.valorFinal)
  const anos = new Decimal(input.anos)

  if (inicial.lte(0) || final.lte(0) || anos.lte(0)) {
    throw new Error('Informe valores iniciais, finais e duração (anos) maiores que zero.')
  }

  const cagrPercent = final.div(inicial).pow(new Decimal(1).div(anos)).minus(1).mul(100)
  const acumuladoPercent = diferencaPercentual(inicial, final)

  return {
    periodoAnos: anos,
    cagrPercent,
    acumuladoPercent,
    vezesInicial: quantasVezes(acumuladoPercent),
  }
}
