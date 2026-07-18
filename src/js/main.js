import Alpine from 'alpinejs'
import en from '../i18n/en.json'
import zh from '../i18n/zh.json'

// Detect current language from HTML lang attribute
const lang = document.documentElement.lang.startsWith('zh') ? 'zh' : 'en'
const i18n = lang === 'zh' ? zh : en

window.Alpine = Alpine

Alpine.data('app', () => ({
  // ── i18n ──
  t: i18n,

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