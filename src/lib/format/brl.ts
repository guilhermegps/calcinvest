import Decimal from 'decimal.js'

export function parseBrl(value: string | number | null | undefined): Decimal {
  if (value === null || value === undefined || value === '') {
    return new Decimal(0)
  }
  if (typeof value === 'number') {
    return new Decimal(value)
  }

  const cleaned = value
    .trim()
    .replace(/[^\d,.-]/g, '')
    .replace(/\./g, '')
    .replace(',', '.')

  if (!cleaned || cleaned === '-' || cleaned === '.') {
    return new Decimal(0)
  }

  try {
    return new Decimal(cleaned)
  } catch {
    return new Decimal(0)
  }
}

export function formatBrl(value: Decimal.Value, fractionDigits = 2): string {
  const num = new Decimal(value)
  const fixed = num.toFixed(fractionDigits)
  const [intPart, decPart = ''] = fixed.split('.')
  const sign = intPart.startsWith('-') ? '-' : ''
  const digits = intPart.replace('-', '')
  const withThousands = digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `${sign}${withThousands},${decPart.padEnd(fractionDigits, '0')}`
}

export function formatMoney(value: Decimal.Value): string {
  return `R$ ${formatBrl(value)}`
}

export function formatPercent(value: Decimal.Value, fractionDigits = 2): string {
  return `${formatBrl(value, fractionDigits)}%`
}

export function roundMoney(value: Decimal.Value): Decimal {
  return new Decimal(value).toDecimalPlaces(2, Decimal.ROUND_HALF_UP)
}

/** Digits-only mask for BRL currency inputs (reverse fill). */
export function maskBrlInput(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  if (!digits) return ''
  const asNumber = new Decimal(digits).div(100)
  return formatBrl(asNumber)
}

export function maskPercentInput(raw: string, decimals = 3): string {
  const digits = raw.replace(/\D/g, '')
  if (!digits) return ''
  const divisor = new Decimal(10).pow(decimals)
  const asNumber = new Decimal(digits).div(divisor)
  return formatBrl(asNumber, decimals)
}
