import { describe, expect, it } from 'vitest'
import { formatBrl, maskBrlInput, parseBrl, roundMoney } from './brl'

describe('parseBrl', () => {
  it('parses Brazilian formatted strings', () => {
    expect(parseBrl('1.234,56').toNumber()).toBe(1234.56)
    expect(parseBrl('10,5').toNumber()).toBe(10.5)
  })

  it('returns 0 for blank', () => {
    expect(parseBrl('').toNumber()).toBe(0)
    expect(parseBrl(null).toNumber()).toBe(0)
  })
})

describe('formatBrl', () => {
  it('formats with thousands and comma', () => {
    expect(formatBrl(1009.9)).toBe('1.009,90')
    expect(formatBrl(0)).toBe('0,00')
  })
})

describe('maskBrlInput', () => {
  it('builds currency from digits', () => {
    expect(maskBrlInput('100990')).toBe('1.009,90')
  })
})

describe('roundMoney', () => {
  it('rounds half up to 2 decimals', () => {
    expect(roundMoney(1.005).toNumber()).toBe(1.01)
  })
})
