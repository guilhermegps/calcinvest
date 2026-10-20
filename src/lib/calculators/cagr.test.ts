import { describe, expect, it } from 'vitest'
import { calcularCagr } from './cagr'

describe('calcularCagr', () => {
  it('calculates CAGR for doubling in 1 year', () => {
    const result = calcularCagr({
      valorInicial: 1000,
      valorFinal: 2000,
      anos: 1,
    })
    expect(result.cagrPercent.toNumber()).toBe(100)
    expect(result.acumuladoPercent.toNumber()).toBe(100)
    expect(result.vezesInicial.toNumber()).toBe(2)
  })

  it('rejects zero years', () => {
    expect(() =>
      calcularCagr({ valorInicial: 1000, valorFinal: 2000, anos: 0 }),
    ).toThrow()
  })

  it('rejects non-positive values', () => {
    expect(() =>
      calcularCagr({ valorInicial: 0, valorFinal: 2000, anos: 2 }),
    ).toThrow()
  })
})
