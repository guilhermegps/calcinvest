import { describe, expect, it } from 'vitest'
import {
  diferencaPercentual,
  porcentagemDe,
  quantoPorcentoE,
  quantasVezes,
  somarPorcentagem,
  subtrairPorcentagem,
} from './percentuais'

describe('percentuais', () => {
  it('porcentagemDe', () => {
    expect(porcentagemDe(10, 200).toNumber()).toBe(20)
  })

  it('quantoPorcentoE', () => {
    expect(quantoPorcentoE(25, 200).toNumber()).toBe(12.5)
    expect(quantoPorcentoE(10, 0).toNumber()).toBe(0)
  })

  it('diferencaPercentual', () => {
    expect(diferencaPercentual(100, 150).toNumber()).toBe(50)
  })

  it('somar e subtrair porcentagem', () => {
    expect(somarPorcentagem(100, 10).toNumber()).toBe(110)
    expect(subtrairPorcentagem(100, 10).toNumber()).toBe(90)
  })

  it('quantasVezes', () => {
    expect(quantasVezes(100).toNumber()).toBe(2)
  })
})
