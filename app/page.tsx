"use client"
import Link from "next/link"
import { useState } from "react"

const CATS = ['fashion','interior','landscape','architecture','jewelry','product','graphic','web','3d','custom']

const dict = {
  en: { badge:"🚀 Launching today • 10 Categories", hero:"The Operating System for ALL Design", sub:"Design fashion, interiors, landscapes, architecture, jewelry, product, graphic, web and 3D — in one place. Unified. Fast. Powerful. Made in Baku.", start:"Start building free →", demo:"View dashboard", cats:["👗 Fashion","🛋️ Interior","🌿 Landscape","🏗️ Architecture","💍 Jewelry","📦 Product","🎨 Graphic","💻 Web & App","🎬 3D Visual","➕ Custom"], f:"Fashion", i:"Interior", l:"Landscape", authTitleIn:"Welcome Back", authTitleUp:"Create Account", email:"Email Address", pass:"Password", signIn:"Sign In", signUp:"Sign Up", googleIn:"Continue with Google", needAcc:"Don't have an account? Sign Up", haveAcc:"Already have an account? Sign In" },
  ru: { badge:"🚀 Запуск сегодня • 10 категорий", hero:"Операционная Система для ВСЕГО Дизайна", sub:"Одежда, интерьер, ландшафт, архитектура, украшения, продукты, графика, веб и 3D — в одном месте. Сделано в Баку для мира.", start:"Начать бесплатно →", demo:"В дашборд", cats:["👗 Мода","🛋️ Интерьер","🌿 Ландшафт","🏗️ Архитектура","💍 Украшения","📦 Продукт","🎨 Графика","💻 Веб & App","🎬 3D","➕ Custom"], f:"Одежда", i:"Интерьер", l:"Ландшафт", authTitleIn:"С возвращением", authTitleUp:"Создать аккаунт", email:"Электронная почта", pass:"Пароль", signIn:"Войти", signUp:"Регистрация", googleIn:"Войти через Google", needAcc:"Нет аккаунта? Зарегистрироваться", haveAcc:"Уже есть аккаунт? Войти" },
  az: { badge:"🚀 Bu gün start • 10 Kateqoriya", hero:"BÜTÜN Dizayn üçün Əməliyyat Sistemi", sub:"Moda, interyer, landşaft, memarlıq, zərgərlik, məhsul, qrafika, veb və 3D — hamısı bir yerdə. Bakıda hazırlanmışdır.", start:"Pulsuz başla →", demo:"Panelə bax", cats:["👗 Moda","🛋️ İnteryer","🌿 Landşaft","🏗️ Memarlıq","💍 Zərgərlik","📦 Məhsul","🎨 Qrafika","💻 Web & App","🎬 3D Vizual","➕ Custom"], f:"Moda", i:"İnteryer", l:"Landşaft", authTitleIn:"Xoş gəldiniz", authTitleUp:"Hesab yarat", email:"E-poçt ünvanı", pass:"Şifrə", signIn:"Daxil ol", signUp:"Qeydiyyat", googleIn:"Google ilə davam et", needAcc:"Hesabınız yoxdur? Qeydiyyat", haveAcc:"Artıq hesabınız var? Daxil ol" }
}

export default function Page() {
  const [lang, setLang] = useState<"en" | "ru" | "az">("en")
  const [open, setOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [selectedCat, setSelectedCat] = useState("fashion")

  const c = dict[lang]

  const triggerAuth = (category: string) => {
    setSelectedCat(category)
    setShowAuthModal(true)
  }

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Временная переадресация в дашборд, пока настраиваем клиент
    window.location.href = `/dashboard?cat=${selectedCat}`
  }

  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.3]" />
      
      <div className="relative z-10 max-w-[1100px] mx-auto w-full px-4 pt-6 flex-1">
        <header className="flex items-center justify-between bg-[#111111]/80 backdrop-blur-2xl border border-white/[0.08] rounded-2xl px-4 py-3">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00f5d4] to-[#00a8a0] flex items-center justify-center text-black font-bold">◈</div>
            <span className="font-bold text-[16px] tracking-tight">DzynOS</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button onClick={() => setOpen(!open)} className="flex items-center gap-1.5 bg-white/[0.06] border border-white/10 rounded-full px-3 py-1.5 text-[11px]">🌐 {lang.toUpperCase()} ▼</button>
              {open && (
                <div className="absolute right-0 top-9 bg-[#1a1a1a] border border-white/10 rounded-xl p-1 w-[140px] z-50 shadow-2xl">
                  {((["en", "ru", "az"] as const)).map(l => (
                    <button key={l} onClick={() => { setLang(l); setOpen(false) }} className={`w-full text-left px-3 py-2 rounded-lg text-[12px] ${lang === l ? "bg-white text-black font-bold" : "text-white/60 hover:bg-white/5"}`}>{l.toUpperCase()} {lang === l && "✓"}</button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => triggerAuth("fashion")} className="px-5 py-2 rounded-full bg-[#2dd4bf] text-black text-[13px] font-bold hover:bg-[#00f5d4] transition">Get Started</button>
          </div>
        </header>

        <div className="text-center mt-16 md:mt-20 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#00f5d4]/[0.08] border border-[#00f5d4]/20 rounded-full px-3.5 py-1.5 text-[11px] text-[#2dd4bf] mb-6 tracking-wide">{c.badge}</div>
          <h1 className="text-[34px] md:text-[56px] font-bold tracking-[-0.03em] leading-[0.95]">{c.hero}</h1>
          <p className="text-white/50 text-[14px] md:text-[16px] mt-5 max-w-[680px] mx-auto leading-relaxed">{c.sub}</p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-8 max-w-[720px] mx-auto">
            {c.cats.map((catName, i) => (
              <button key={i} onClick={() => triggerAuth(CATS[i])} className="px-3.5 py-2 rounded-full bg-white/[0.06] border border-white/10 text-[12px] text-white/70 hover:bg-[#2dd4bf]/10 hover:border-[#2dd4bf]/30 hover:text-[#2dd4bf] transition">
                {catName}
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-8">
            <button onClick={() => triggerAuth("fashion")} className="px-7 py-3.5 rounded-full bg-[#2dd4bf] text-black font-bold text-[14px] shadow-[0_0_30px_rgba(45,212,191,0.4)] hover:shadow-[0_0_40px_rgba(45,212,191,0.6)] hover:bg-[#00f5d4] transition">{c.start}</button>
            <button onClick={() => triggerAuth("custom")} className="px-7 py-3.5 rounded-full bg-white/[0.06] border border-white/15 text-[14px] hover:bg-white/[0.1] transition">{c.demo}</button>
          </div>
        </div>
        <div className="h-16" />
      </div>

      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-[#0c0c0c] border border-white/[0.08] rounded-3xl w-full max-w-[400px] p-6 relative shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 text-white/40 hover:text-white text-[18px]">✕</button>
            
            <h2 className="text-[22px] font-bold tracking-tight text-center mb-1">{isSignUp ? c.authTitleUp : c.authTitleIn}</h2>
            <p className="text-[11px] text-[#2dd4bf] text-center mb-5 uppercase tracking-wider font-semibold">Studio: {selectedCat.toUpperCase()}</p>

            <form onSubmit={handleAuthSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] text-white/40 mb-1.5 uppercase tracking-wider">{c.email}</label>
                <input type="email" required className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-[14px] focus:outline-none focus:border-[#2dd4bf] text-white transition" placeholder="design@dzynos.com" />
              </div>
              <div>
                <label className="block text-[11px] text-white/40 mb-1.5 uppercase tracking-wider">{c.pass}</label>
                <input type="password" required className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-[14px] focus:outline-none focus:border-[#2dd4bf] text-white transition" placeholder="••••••••" />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-[#2dd4bf] text-black font-bold text-[14px] hover:bg-[#00f5d4] transition mt-2">
                {isSignUp ? c.signUp : c.signIn}
              </button>
            </form>

            <div className="relative flex py-4 items-center">
              <div className="flex-grow border-t border-white/[0.06]"></div>
              <span className="flex-shrink mx-3 text-white/20 text-[11px] uppercase tracking-wider">or</span>
              <div className="flex-grow border-t border-white/[0.06]"></div>
            </div>

            <button onClick={handleAuthSubmit} className="w-full py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white font-medium text-[13px] hover:bg-white/[0.1] transition flex items-center justify-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/></svg>
              {c.googleIn}
            </button>

            <button onClick={() => setIsSignUp(!isSignUp)} className="w-full text-center text-[12px] text-white/40 hover:text-[#2dd4bf] transition mt-5 block">
              
