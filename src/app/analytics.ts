declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function initAnalytics() {
  const id = import.meta.env.VITE_GA_ID
  if (!id || typeof document === 'undefined') return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', id)
}

export function trackPageView(path: string) {
  if (!import.meta.env.VITE_GA_ID || !window.gtag) return
  window.gtag('event', 'page_view', { page_path: path })
}
