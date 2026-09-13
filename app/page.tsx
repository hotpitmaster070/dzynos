"use client"
import Link from "next/link"
import { useState, useEffect } from "react"

const tr = {
  en: {
    hero: "Design, built for product teams.",
    sub: "A unified workspace to build, ship, and iterate — fast.",
    start: "Get Started", demo: "View Demo",
    p: "Projects", a: "Assets", ai: "AI Studio",
    pDesc: "Manage designs & workflows",
    aDesc: "Icons, components & media",
    aiDesc: "Generate & iterate with AI",
    inProgress: "In Progress", completed: "Completed", inReview: "In Review",
    p1: "Mobile App Redesign", p1s: "Updated 2h ago",
    p2: "Brand Guidelines", p2s: "Done yesterday",
    p3: "Website v3", p3s: "Updated 1d ago",
    a1: "Icons Pack 2.1", a1s: "284 components • Updated today",
    a2: "Design System", a2s: "12 patterns • 47 components",
    a3: "Illustrations", a3s: "36 assets • Shared",
    ai1: "Generate Variations", ai1s: "Create 4 new variants",
    ai2: "Remove BG", ai2s: "Processed 12 images",
    ai3: "Style Transfer", ai3s: "Applied Neo-Minimal theme",
  },
  ru: {
    hero: "Дизайн, созданный для продуктовых команд.",
    sub: "Единое пространство для создания, запуска и итераций — быстро.",
    start: "Начать", demo: "Демо",
    p: "Проекты", a: "Ассеты", ai: "AI Студия",
    pDesc: "Управляй дизайном и процессами",
    aDesc: "Иконки, компоненты и медиа",
    aiDesc: "Генерируй с помощью AI",
    inProgress: "В работе", completed: "Готово", inReview: "На проверке",
    p1: "Редизайн Приложения", p1s: "Обновлено 2ч назад",
    p2: "Бренд Гайд", p2s: "Готово вчера",
    p3: "Сайт v3", p3s: "Обновлено 1д назад",
    a1: "Пак Иконок 2.1", a1s: "284 компонента • Сегодня",
    a2: "Дизайн Система", a2s: "12 паттернов • 47 компонентов",
    a3: "Иллюстрации", a3s: "36 ассетов • Общий",
    ai1: "Генерировать Варианты", ai1s: "Создать 4 варианта",
    ai2: "Удалить Фон", ai2s: "Обработано 12 изобр.",
    ai3: "Перенос Стиля", ai3s: "Тема Neo-Minimal",
  },
  az: {
    hero: "Məhsul komandaları üçün dizayn.",
    sub: "Qurmaq, buraxmaq və iterasiya etmək üçün vahid iş sahəsi — sürətli.",
    start: "Başla", demo: "Demoya Bax",
    p: "Layihələr", a: "Resurslar", ai: "AI Studiya",
    pDesc: "Dizayn və iş axınlarını idarə et",
    aDesc: "İkonlar, komponentlər və media",
    aiDesc: "AI ilə yarat və iterasiya et",
    inProgress: "Davam edir", completed: "Tamamlandı", inReview: "Baxışda",
    p1: "Mobil App Yenilənməsi", p1s: "2 saat əvvəl",
    p2: "Brend Bələdçisi", p2s: "Dünən hazır",
    p3: "Veb sayt v3", p3s: "1 gün əvvəl",
    a1: "İkon Paketi 2.1", a1s: "284 komponent • Bu gün",
    a2: "Dizayn Sistemi", a2s: "12 pattern • 47 komponent",
    a3: "İllüstrasiyalar", a3s: "36 resurs • Paylaşıldı",
    ai1: "Varyasiyalar Yarat", ai1s: "4 yeni variant yarat",
    ai2: "Fon Sil", ai2s: "12 şəkil işləndi",
    ai3: "Stil Köçür", ai3s: "Neo-Minimal tətbiq edildi",
  }
}

export default function Home() {
  const [lang, setLang] = useState<"en" | "ru" | "az">("en")
  useEffect(() => {
    const saved = localStorage.getItem("dzynos-lang") as any
    if (saved && tr[saved]) setLang(saved)
  }, [])
  const change = (l: "en" | "ru" | "az") => {
    setLang(l)
    localStorage.setItem("dzynos-lang", l)
  }
  const c = tr[lang]

  return (
    <div className="min-h-screen bg-[#070a14] text-white relative overflow-hidden flex flex-col">
      {/* Только мягкое свечение снизу, без клеток - как у топов */}
      <div className="absolute bottom-0 left-0 right-0 h-[600px] bg-gradient-to-t from-[#00f5d4]/10 to-transparent blur-[40px] pointer-events-none" />

      <header className="relative z-50 max-w-5xl mx-auto w-full px-4 pt-4 md:pt-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-[20px]">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2dd4bf] to-[#0ea5e9] flex items-center justify-center text-black font-black">D</span>
            DzynOS
          </Link>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex bg-white/5 border border-white/10 rounded-lg p-1 mr-2">
              {(["ru","az","en"] as const).map((l) => (
                <button key={l} onClick={() => change(l)} className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${lang===l? "bg-[#2dd4bf] text-black" : "text-white/40 hover:text-white"}`}>{l.toUpperCase()}</button>
              ))}
            </div>
            <Link href="/demo"><button className="px-4 py-2 rounded-xl bg-white/10 text-[13px] font-medium">Log in</button></Link>
            <Link href="/demo"><button className="px-4 py-2 rounded-xl bg-[#2dd4bf] text-black text-[13px] font-bold">Get Started</button></Link>
          </div>
        </div>
        <div className="flex md:hidden justify-center mt-4">
          <div className="flex bg-white/[0.06] border border-white/10 rounded-xl p-1">
            {(["ru","az","en"] as const).map((l) => (
              <button key={l} onClick={() => change(l)} className={`px-4 py-1.5 rounded-lg text-[12px] font-bold ${lang===l? "bg-[#2dd4bf] text-black" : "text-white/50"}`}>{l.toUpperCase()}</button>
            ))}
          </div>
        </div>
      </header>

      <section className="relative z-10 text-center pt-12 md:pt-24 pb-8 px-6 max-w-3xl mx-auto">
        <h1 className="text-[30px] md:text-[52px] font-bold leading-[1.1] tracking-tight">{c.hero}</h1>
        <p className="text-white/50 max-w-[500px] mx-auto mt-4 text-[14px] md:text-[15px]">{c.sub}</p>
        <div className="flex flex-col md:flex-row justify-center gap-3 mt-10 max-w-sm md:max-w-none mx-auto">
          <Link href="/demo" className="w-full md:w-auto"><button className="w-full px-8 py-4 md:py-3 rounded-2xl bg-[#2dd4bf] text-black font-bold text-[16px] shadow-[0_0_30px_rgba(45,212,191,0.4)]">{c.start}</button></Link>
          <Link href="/demo" className="w-full md:w-auto"><button className="w-full px-8 py-4 md:py-3 rounded-2xl bg-white/[0.06] border border-white/15 text-[16px]">{c.demo} ▷</button></Link>
        </div>
      </section>

      {/* MOBILE */}
      <div className="md:hidden relative z-10 px-4 pb-8">
        <div className="space-y-3">
          <div className="bg-[#12151f] border border-white/10 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#1a2a2a] border border-[#2dd4bf]/20 flex items-center justify-center text-[#2dd4bf]">📁</div>
            <div><h3 className="font-bold text-[15px]">{c.p}</h3><p className="text-[13px] text-white/50">{c.pDesc}</p></div>
          </div>
          <div className="bg-[#12151f] border border-white/10 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#1a2a2a] border border-[#2dd4bf]/20 flex items-center justify-center text-[#2dd4bf]">🗂️</div>
            <div><h3 className="font-bold text-[15px]">{c.a}</h3><p className="text-[13px] text-white/50">{c.aDesc}</p></div>
          </div>
          <div className="bg-[#12151f] border border-white/10 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#1a2a2a] border border-[#2dd4bf]/20 flex items-center justify-center text-[#2dd4bf]">✨</div>
            <div><h3 className="font-bold text-[15px]">{c.ai}</h3><p className="text-[13px] text-white/50">{c.aiDesc}</p></div>
          </div>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:block relative z-10 max-w-4xl mx-auto w-full px-4 pb-16">
        <div className="bg-[#0d101c] border border-white/10 rounded-[24px] p-8 shadow-[0_0_60px_rgba(45,212,191,0.15)]">
          <div className="grid grid-cols-3 gap-8">
            <div><h3 className="text-[#2dd4bf] font-bold mb-4 text-[14px]">📁 {c.p}</h3><div className="space-y-4"><div><span className="text-[10px] bg-[#2dd4bf]/20 text-[#2dd4bf] px-2 py-1 rounded-full">● {c.inProgress}</span><p className="font-semibold text-[13px] mt-2">{c.p1}</p><p className="text-white/40 text-[11px]">{c.p1s}</p></div><div><p className="font-semibold text-[13px]">{c.p2}</p><p className="text-white/40 text-[11px]">{c.p2s}</p></div></div></div>
            <div><h3 className="text-[#2dd4bf] font-bold mb-4 text-[14px]">▦ {c.a}</h3><div className="space-y-4"><div><p className="font-semibold text-[13px]">{c.a1}</p><p className="text-white/40 text-[11px]">{c.a1s}</p></div><div><p className="font-semibold text-[13px]">{c.a2}</p><p className="text-white/40 text-[11px]">{c.a2s}</p></div></div></div>
            <div><h3 className="text-[#2dd4bf] font-bold mb-4 text-[14px]">✦ {c.ai}</h3><div className="bg-[#2dd4bf]/10 border border-[#2dd4bf]/20 rounded-xl p-3"><p className="font-semibold text-[13px]">{c.ai1}</p><p className="text-white/50 text-[11px]">{c.ai1s}</p></div></div>
          </div>
        </div>
      </div>

      <footer className="relative z-10 mt-auto text-center py-8 border-t border-white/5 text-[12px] text-white/30">
        © 2026 DzynOS • dzynos.com
      </footer>
    </div>
  )
    }
