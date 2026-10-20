import Decimal from 'decimal.js'

export function porcentagemDe(porcentagem: Decimal.Value, valor: Decimal.Value): Decimal {
  return new Decimal(porcentagem).mul(valor).div(100)
}

export function quantoPorcentoE(valor: Decimal.Value, sobreOValor: Decimal.Value): Decimal {
  const base = new Decimal(sobreOValor)
  if (base.isZero()) return new Decimal(0)
  return new Decimal(valor).div(base).mul(100)
}

export function diferencaPercentual(inicial: Decimal.Value, final: Decimal.Value): Decimal {
  const base = new Decimal(inicial)
  if (base.isZero()) return new Decimal(0)
  return new Decimal(final).minus(base).div(base).mul(100)
}

export function somarPorcentagem(valor: Decimal.Value, porcentagem: Decimal.Value): Decimal {
  return new Decimal(valor).plus(porcentagemDe(porcentagem, valor))
}

export function subtrairPorcentagem(valor: Decimal.Value, porcentagem: Decimal.Value): Decimal {
  return new Decimal(valor).minus(porcentagemDe(porcentagem, valor))
}

export function quantasVezes(percentualAcumulado: Decimal.Value): Decimal {
  return new Decimal(percentualAcumulado).div(100).plus(1)
}
