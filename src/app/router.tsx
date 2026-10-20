import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { HomePage } from '@/pages/HomePage'
import { PercentuaisPage } from '@/pages/PercentuaisPage'
import { RendaFixaPage } from '@/pages/RendaFixaPage'
import { CagrPage } from '@/pages/CagrPage'
import { DarfFiisPage } from '@/pages/DarfFiisPage'
import { ContatoPage } from '@/pages/ContatoPage'
import { SobrePage } from '@/pages/SobrePage'
import { Seo } from './Seo'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Seo />
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="percentuais" element={<PercentuaisPage />} />
          <Route path="renda-fixa" element={<RendaFixaPage />} />
          <Route path="cagr" element={<CagrPage />} />
          <Route path="darf-fiis" element={<DarfFiisPage />} />
          <Route path="contato" element={<ContatoPage />} />
          <Route path="sobre" element={<SobrePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
