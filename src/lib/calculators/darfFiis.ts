import Decimal from 'decimal.js'
import { roundMoney } from '../format/brl'
import { quantoPorcentoE } from './percentuais'

export type CompraFii = {
  quantidade: Decimal.Value
  valorCota: Decimal.Value
  taxas: Decimal.Value
}

export type VendaFii = {
  quantidade: Decimal.Value
  valorCota: Decimal.Value
  taxas: Decimal.Value
}

export type DarfFiisInput = {
  nome?: string
  compras: CompraFii[]
  venda: VendaFii
}

export type DarfFiisResult = {
  nome: string
  vlrMedioCompra: Decimal
  totalCompras: Decimal
  qtdTotalCompras: Decimal
  totalRecebido: Decimal
  totalMediaVenda: Decimal
  dedoDuro: Decimal
  vendaSemDedoDuro: Decimal
  lucroBruto: Decimal
  pctLucro: Decimal
  irDevido: Decimal
}

const DEDO_DURO_RATE = new Decimal('0.00005')
const IR_RATE = new Decimal('0.2')

export function totalPagoCompra(compra: CompraFii): Decimal {
  return new Decimal(compra.quantidade)
    .mul(compra.valorCota)
    .plus(compra.taxas)
}

export function totalRecebidoVenda(venda: VendaFii): Decimal {
  return new Decimal(venda.quantidade).mul(venda.valorCota).minus(venda.taxas)
}

/**
 * Estimates FII capital-gains DARF.
 * Dedo-duro (0.005%) is applied on gross sale (price × qty) and reduces
 * proceeds before computing taxable profit — matching the prior app intent.
 * IR is 20% on positive profit only; average cost basis across all lots.
 */
export function calcularDarfFiis(input: DarfFiisInput): DarfFiisResult {
  if (!input.compras.length) {
    throw new Error('Informe ao menos uma compra.')
  }

  let qtdTotal = new Decimal(0)
  let valorTotal = new Decimal(0)

  for (const compra of input.compras) {
    const qtd = new Decimal(compra.quantidade)
    if (qtd.lte(0)) {
      throw new Error('A quantidade comprada deve ser maior que zero.')
    }
    qtdTotal = qtdTotal.plus(qtd)
    valorTotal = valorTotal.plus(totalPagoCompra(compra))
  }

  const qtdVenda = new Decimal(input.venda.quantidade)
  if (qtdVenda.lte(0)) {
    throw new Error('A quantidade vendida deve ser maior que zero.')
  }
  if (qtdVenda.gt(qtdTotal)) {
    throw new Error('Não é possível vender mais cotas do que comprou.')
  }

  const mediaCompra = valorTotal.div(qtdTotal)
  const totalRecebido = totalRecebidoVenda(input.venda)
  const totalMediaVenda = roundMoney(qtdVenda.mul(mediaCompra))
  const dedoDuro = roundMoney(
    new Decimal(input.venda.valorCota).mul(qtdVenda).mul(DEDO_DURO_RATE),
  )
  const vendaSemDedoDuro = roundMoney(totalRecebido.minus(dedoDuro))
  const lucroBruto = roundMoney(vendaSemDedoDuro.minus(totalMediaVenda))
  const irDevido = lucroBruto.gt(0) ? roundMoney(lucroBruto.mul(IR_RATE)) : new Decimal(0)
  const pctLucro = quantoPorcentoE(lucroBruto, totalMediaVenda)

  return {
    nome: input.nome?.trim() ?? '',
    vlrMedioCompra: mediaCompra,
    totalCompras: roundMoney(valorTotal),
    qtdTotalCompras: qtdTotal,
    totalRecebido: roundMoney(totalRecebido),
    totalMediaVenda,
    dedoDuro,
    vendaSemDedoDuro,
    lucroBruto,
    pctLucro,
    irDevido,
  }
}
