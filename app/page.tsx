"use client"
import Link from "next/link"
import { useState, useEffect } from "react"

const tr = {
  en: {
    hero: "The Operating System for Design Teams",
    sub: "A collaborative workspace for modern design teams to manage projects, design assets, and AI-powered workflows — all in one place.",
    start: "Start Free →", demo: "View Demo ▷", dash: "DASHBOARD",
    p: "Projects", a: "Assets", ai: "AI Studio",
    inProgress: "In Progress", completed: "Completed", inReview: "In Review",
    p1: "Mobile App Redesign", p1s: "Updated 2h ago",
    p2: "Brand Guidelines", p2s: "Done yesterday",
    p3: "Website v3", p3s: "Updated 1d ago",
    a1: "Icons Pack 2.1", a1s: "284 components • Updated today",
    a2: "Design System", a2s: "12 patterns • 47 components",
    a3: "Illustrations", a3s: "36 assets • Shared",
    ai1: "Generate Variations", ai1s: "Create 4 new variants from selection",
    ai2: "Remove BG", ai2s: "Processed 12 images",
    ai3: "Style Transfer", ai3s: "Applied Neo-Minimal theme",
    cardP: "Brand Redesign 2026", cardA: "Color System", cardAi: "Generate & iterate designs",
  },
  ru: {
    hero: "Операционная Система для Дизайн Команд",
    sub: "Совместное пространство для управления проектами, ассетами и AI-воркфлоу — всё в одном месте.",
    start: "Начать Бесплатно →", demo: "Демо ▷", dash: "ПАНЕЛЬ",
    p: "Проекты", a: "Ассеты", ai: "AI Студия",
    inProgress: "В работе", completed: "Готово", inReview: "На проверке",
    p1: "Редизайн Приложения", p1s: "Обновлено 2ч назад",
    p2: "Бренд Гайд", p2s: "Готово вчера",
    p3: "Сайт v3", p3s: "Обновлено 1д назад",
    a1: "Пак Иконок 2.1", a1s: "284 компонента • Сегодня",
    a2: "Дизайн Система", a2s: "12 паттернов • 47 компонентов",
    a3: "Иллюстрации", a3s: "36 ассетов • Общий",
    ai1: "Генерировать Варианты", ai1s: "Создать 4 новых варианта",
    ai2: "Удалить Фон", ai2s: "Обработано 12 изображений",
    ai3: "Перенос Стиля", ai3s: "Применена Neo-Minimal тема",
    cardP: "Редизайн Бренда 2026", cardA: "Система Цветов", cardAi: "Генерируй дизайны с AI",
  },
  az: {
    hero: "Dizayn Komandaları üçün Əməliyyat Sistemi",
    sub: "Layihələri, resursları və AI iş axınlarını idarə etmək üçün birgə iş sahəsi — hamısı bir yerdə.",
    start: "Pulsuz Başla →", demo: "Demoya Bax ▷", dash: "İDARƏ PANELİ",
    p: "Layihələr", a: "Resurslar", ai: "AI Studiya",
    inProgress: "Davam edir", completed: "Tamamlandı", inReview: "Baxışda",
    p1: "Mobil App Yenilənməsi", p1s: "2 saat əvvəl yeniləndi",
    p2: "Brend Bələdçisi", p2s: "Dünən hazır",
    p3: "Veb sayt v3", p3s: "1 gün əvvəl yeniləndi",
    a1: "İkon Paketi 2.1", a1s: "284 komponent • Bu gün yeniləndi",
    a2: "Dizayn Sistemi", a2s: "12 pattern • 47 komponent",
    a3: "İllüstrasiyalar", a3s: "36 resurs • Paylaşıldı",
    ai1: "Varyasiyalar Yarat", ai1s: "Seçimdən 4 yeni variant yarat",
    ai2: "Fon Sil", ai2s: "12 şəkil işləndi",
    ai3: "Stil Köçür", ai3s: "Neo-Minimal mövzu tətbiq edildi",
    cardP: "Brend Yenilənməsi 2026", cardA: "Rəng Sistemi", cardAi: "AI ilə dizayn yarat",
  }
}

export default function Home() {
  const [lang, setLang] = useState<"en" | "ru" | "az">("en")
  useEffect(() => {
    const saved = localStorage.getItem("dzynos-lang") as "en" | "ru" | "az" | null
    if (saved && tr[saved]) setLang(saved)
  }, [])
  const change = (l: "en" | "ru" | "az") => {
    setLang(l)
    localStorage.setItem("dzynos-lang", l)
  }
  const c = tr[lang]

  return (
    <div className="min-h-screen bg-[#070a14] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff07_1px,transparent_1px),linear-gradient(to_bottom,#ffffff07_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#00f5d4]/20 blur-[100px] rounded-full pointer-events-none" />

      <header className="relative z-50 max-w-5xl mx-auto pt-3 md:pt-6 px-4">
        <div className="flex justify-between items-center bg-[#0f121d]/90 backdrop-blur-md border border-white/10 rounded-2xl px-4 md:px-6 py-3">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-[18px]">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2dd4bf] to-[#0ea5e9] flex items-center justify-center text-black">⬙</span>
            DzynOS.com
          </Link>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex bg-white/5 border border-white/10 rounded-lg p-1">
              {(["ru","az","en"] as const).map((l) => (
                <button key={l} onClick={() => change(l)} className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide ${lang===l? "bg-[#2dd4bf] text-black" : "text-white/40 hover:text-white"}`}>{l.toUpperCase()}</button>
              ))}
            </div>
            <Link href="/demo"><button className="px-4 py-1.5 rounded-lg bg-[#e5e7eb] text-black text-[13px] font-semibold">Log in</button></Link>
            <Link href="/demo"><button className="px-4 py-1.5 rounded-lg bg-[#2dd4bf] text-black text-[13px] font-bold">Get Started</button></Link>
          </div>
        </div>
        <div className="flex md:hidden justify-center mt-3">
          <div className="flex bg-white/5 border border-white/10 rounded-lg p-1">
            {(["ru","az","en"] as const).map((l) => (
              <button key={l} onClick={() => change(l)} className={`px-3 py-1 rounded text-[11px] font-bold ${lang===l? "bg-[#2dd4bf] text-black" : "text-white/40"}`}>{l.toUpperCase()}</button>
            ))}
          </div>
        </div>
      </header>

      <section className="relative z-10 text-center pt-10 md:pt-20 pb-8 px-6 max-w-3xl mx-auto">
        <h1 className="text-[30px] md:text-[42px] font-bold leading-[1.1] tracking-tight">{c.hero}</h1>
        <p className="text-white/50 max-w-[580px] mx-auto mt-4 text-[13px] md:text-[14px] leading-relaxed">{c.sub}</p>
        <div className="flex flex-col md:flex-row justify-center gap-3 mt-8 max-w-sm md:max-w-none mx-auto">
          <Link href="/demo" className="w-full md:w-auto"><button className="w-full px-7 py-4 md:py-3 rounded-2xl md:rounded-xl bg-[#2dd4bf] text-black font-bold text-[16px] md:text-[14px] shadow-[0_0_20px_rgba(45,212,191,0.4)]">{c.start}</button></Link>
          <Link href="/demo" className="w-full md:w-auto"><button className="w-full px-7 py-4 md:py-3 rounded-2xl md:rounded-xl bg-white/[0.06] border border-white/20 text-[16px] md:text-[14px]">{c.demo}</button></Link>
        </div>
      </section>

      {/* MOBILE - как на твоем фото */}
      <div className="md:hidden relative z-10 px-4 pb-12">
        <p className="text-[11px] text-white/30 tracking-[2px] mb-3 px-2">{c.dash}</p>
        <div className="space-y-3">
          <div className="bg-[#111417] border border-white/10 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">📁</div>
            <div><h3 className="font-bold text-[15px]">{c.p}</h3><p className="text-[13px] text-white/50">{c.cardP}</p></div>
          </div>
          <div className="bg-[#111417] border border-white/10 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">🗂️</div>
            <div><h3 className="font-bold text-[15px]">{c.a}</h3><p className="text-[13px] text-white/50">{c.cardA}</p></div>
          </div>
          <div className="bg-[#111417] border border-white/10 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">✨</div>
            <div><h3 className="font-bold text-[15px]">{c.ai}</h3><p className="text-[13px] text-white/50">{c.cardAi}</p></div>
          </div>
        </div>
      </div>

      {/* DESKTOP - как на первом скрине */}
      <div className="hidden md:block relative z-10 max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-[#0d101c] border border-[#2dd4bf]/30 rounded-[24px] p-8 shadow-[0_0_80px_rgba(45,212,191,0.25),inset_0_1px_0_rgba(255,255,255,0.08)]">
          <div className="grid grid-cols-3 gap-8">
            <div>
              <h3 className="flex items-center gap-2 text-[#2dd4bf] font-bold text-[15px] mb-5">📁 {c.p}</h3>
              <div className="space-y-5">
                <div><div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#2dd4bf]/20 text-[#2dd4bf] text-[11px] font-bold">● {c.inProgress}</div><p className="font-semibold text-[13px] mt-2">{c.p1}</p><p className="text-[11px] text-white/40 mt-1">{c.p1s}</p></div>
                <div><div className="flex items-center gap-1.5 text-[#10b981] text-[12px] font-semibold">● {c.completed}</div><p className="font-semibold text-[13px] mt-1">{c.p2}</p><p className="text-[11px] text-white/40 mt-1">{c.p2s}</p></div>
                <div><div className="flex items-center gap-1.5 text-[#f59e0b] text-[12px] font-semibold">● {c.inReview}</div><p className="font-semibold text-[13px] mt-1">{c.p3}</p><p className="text-[11px] text-white/40 mt-1">{c.p3s}</p></div>
              </div>
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-[#2dd4bf] font-bold text-[15px] mb-5">▦ {c.a}</h3>
              <div className="space-y-5">
                <div><div className="inline-flex px-2 py-0.5 rounded bg-[#2dd4bf] text-black text-[10px] font-bold">v2.1</div><p className="font-semibold text-[13px] mt-2">{c.a1}</p><p className="text-[11px] text-white/40 mt-1">{c.a1s}</p></div>
                <div><p className="font-semibold text-[13px]">{c.a2}</p><p className="text-[11px] text-white/40 mt-1">{c.a2s}</p></div>
                <div><p className="font-semibold text-[13px]">{c.a3}</p><p className="text-[11px] text-white/40 mt-1">{c.a3s}</p></div>
              </div>
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-[#2dd4bf] font-bold text-[15px] mb-5">✦ {c.ai}</h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-[#2dd4bf]/20 to-[#0e3d36] border border-[#2dd4bf]/30 rounded-xl p-3.5"><p className="font-semibold text-[13px]">{c.ai1}</p><p className="text-[11px] text-white/60 mt-1">{c.ai1s}</p></div>
                <div className="p-1"><p className="font-semibold text-[13px]">{c.ai2}</p><p className="text-[11px] text-white/40 mt-1">{c.ai2s}</p></div>
                <div className="p-1"><p className="font-semibold text-[13px]">{c.ai3}</p><p className="text-[11px] text-white/40 mt-1">{c.ai3s}</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
