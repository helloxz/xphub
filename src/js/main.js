import Alpine from 'alpinejs'
import en from '../i18n/en.json'
import zh from '../i18n/zh.json'

// Detect current language from HTML lang attribute
const lang = document.documentElement.lang.startsWith('zh') ? 'zh' : 'en'
const i18n = lang === 'zh' ? zh : en

// ── Language auto-detect & redirect ──
;(function initLang() {
  const currentPath = window.location.pathname
  const isZhPage = currentPath.startsWith('/zh')
  const storedLang = sessionStorage.getItem('lang')

  if (storedLang) {
    // Session has explicit choice — redirect only if mismatched
    if (storedLang === 'zh' && !isZhPage) {
      window.location.replace('/zh/')
      return
    }
    if (storedLang === 'en' && isZhPage) {
      window.location.replace('/')
      return
    }
  } else {
    // No session — detect from browser
    const browserLang = navigator.language || ''
    const prefersZh = browserLang.startsWith('zh')
    sessionStorage.setItem('lang', prefersZh ? 'zh' : 'en')

    if (prefersZh && !isZhPage) {
      window.location.replace('/zh/')
      return
    }
    if (!prefersZh && isZhPage) {
      window.location.replace('/')
      return
    }
  }
})()

window.Alpine = Alpine

Alpine.data('app', () => ({
  // ── i18n ──
  t: i18n,

  // ── Language switch (manual override) ──
  switchLang(target) {
    sessionStorage.setItem('lang', target)
    window.location.href = target === 'zh' ? '/zh/' : '/'
  },

  // ── Mobile menu ──
  mobileMenuOpen: false,

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen
  },

  closeMobileMenu() {
    this.mobileMenuOpen = false
  },

  // ── WeChat QR ──
  showWechatQR: false,

  toggleWechatQR() {
    this.showWechatQR = !this.showWechatQR
  },

  // ── Smooth scroll ──
  scrollTo(id) {
    this.closeMobileMenu()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  },
}))

Alpine.start()