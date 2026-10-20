import { describe, expect, it } from 'vitest'
import { calcularDarfFiis } from './darfFiis'

describe('calcularDarfFiis', () => {
  it('computes average cost, dedo-duro and IR', () => {
    const result = calcularDarfFiis({
      nome: 'HGLG11',
      compras: [
        { quantidade: 10, valorCota: 100, taxas: 0 },
        { quantidade: 10, valorCota: 120, taxas: 0 },
      ],
      venda: { quantidade: 10, valorCota: 150, taxas: 0 },
    })

    expect(result.vlrMedioCompra.toNumber()).toBe(110)
    expect(result.totalMediaVenda.toNumber()).toBe(1100)
    expect(result.dedoDuro.toNumber()).toBe(0.08)
    expect(result.lucroBruto.toNumber()).toBe(399.92)
    expect(result.irDevido.toNumber()).toBe(79.98)
  })

  it('blocks selling more than owned', () => {
    expect(() =>
      calcularDarfFiis({
        compras: [{ quantidade: 5, valorCota: 100, taxas: 0 }],
        venda: { quantidade: 6, valorCota: 100, taxas: 0 },
      }),
    ).toThrow(/vender mais cotas/)
  })

  it('returns zero IR on loss', () => {
    const result = calcularDarfFiis({
      compras: [{ quantidade: 10, valorCota: 100, taxas: 0 }],
      venda: { quantidade: 10, valorCota: 50, taxas: 0 },
    })
    expect(result.lucroBruto.toNumber()).toBeLessThan(0)
    expect(result.irDevido.toNumber()).toBe(0)
  })
})
