import { describe, expect, it } from 'vitest'
import {
  addMonths,
  calcularJurosCompostos,
  calcularRendaFixa,
  diasEntre,
  valueOfIR,
} from './rendaFixa'

describe('valueOfIR', () => {
  it('returns regressive brackets', () => {
    expect(valueOfIR(180)).toBe(22.5)
    expect(valueOfIR(181)).toBe(20)
    expect(valueOfIR(361)).toBe(17.5)
    expect(valueOfIR(721)).toBe(15)
  })
})

describe('addMonths / diasEntre', () => {
  it('adds months on calendar instead of years', () => {
    const base = new Date(2024, 0, 15)
    const end = addMonths(base, 12)
    expect(end.getFullYear()).toBe(2025)
    expect(end.getMonth()).toBe(0)
    expect(diasEntre(base, end)).toBe(366)
  })
})

describe('calcularJurosCompostos', () => {
  it('compounds correctly', () => {
    expect(calcularJurosCompostos(1000, 10, 1).toNumber()).toBe(1100)
  })
})

describe('calcularRendaFixa', () => {
  it('uses months for IR horizon (not years)', () => {
    const result = calcularRendaFixa({
      periodoRendimento: 'mes',
      rendimentoPercent: 1,
      valorInicial: 1000,
      incrementoMensal: 0,
      duracaoMeses: 12,
      irRegressivo: true,
      dataBase: new Date(2024, 0, 1),
    })
    expect(result.diasTotais).toBeLessThan(400)
    expect(result.valorTotalBruto.toNumber()).toBeCloseTo(1126.825, 2)
  })

  it('accumulates monthly deposits', () => {
    const result = calcularRendaFixa({
      periodoRendimento: 'mes',
      rendimentoPercent: 1,
      valorInicial: 0,
      incrementoMensal: 100,
      duracaoMeses: 2,
      irRegressivo: false,
      irPercentManual: 0,
      dataBase: new Date(2024, 0, 1),
    })
    expect(result.totalInvestido.toNumber()).toBe(200)
    expect(result.valorTotalBruto.toNumber()).toBeGreaterThan(200)
  })
})
