import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView } from './analytics'

const TITLES: Record<string, string> = {
  '/': 'CalcInvest - Calculadora de Investimentos',
  '/percentuais': 'Percentuais | CalcInvest',
  '/renda-fixa': 'Renda Fixa | CalcInvest',
  '/cagr': 'CAGR | CalcInvest',
  '/darf-fiis': 'DARF FIIs | CalcInvest',
  '/contato': 'Contato | CalcInvest',
  '/sobre': 'Sobre | CalcInvest',
}

export function Seo() {
  const location = useLocation()

  useEffect(() => {
    document.title = TITLES[location.pathname] ?? 'CalcInvest'
    trackPageView(location.pathname + location.search)
  }, [location])

  return null
}
