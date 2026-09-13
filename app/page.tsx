"use client"
import Link from "next/link"
import { useState, useEffect } from "react"

const dict = {
  en: {
    hero: "The Operating System for Design Teams",
    sub: "A collaborative workspace for modern design teams to manage projects, design assets, and AI-powered workflows — all in one place.",
    start: "Start Free →", demo: "View Demo ▷",
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
  },
  ru: {
    hero: "Операционная Система для Дизайн Команд",
    sub: "Совместное пространство для управления проектами, ассетами и AI-воркфлоу — всё в одном месте.",
    start: "Начать Бесплатно →", demo: "Демо ▷",
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
  },
  az: {
    hero: "Dizayn Komandaları üçün Əməliyyat Sistemi",
    sub: "Layihələri, resursları və AI iş axınlarını idarə etmək üçün birgə iş sahəsi — hamısı bir yerdə.",
    start: "Pulsuz Başla →", demo: "Demoya Bax ▷",
    p: "Layihələr", a: "Resurslar", ai: "AI Studiya",
    inProgress: "Davam edir", completed: "Tamamlandı", inReview: "Baxışda",
    p1: "Mobil App Yenilənməsi", p1s: "2 saat əvvəl",
    p2: "Brend Bələdçisi", p2s: "Dünən hazır",
    p3: "Veb sayt v3", p3s: "1 gün əvvəl",
    a1: "İkon Paketi 2.1", a1s: "284 komponent • Bu gün",
    a2: "Dizayn Sistemi", a2s: "12 pattern • 47 komponent",
    a3: "İllüstrasiyalar", a3s: "36 resurs • Paylaşıldı",
    ai1: "Varyasiyalar Yarat", ai1s: "Seçimdən 4 yeni variant yarat",
    ai2: "Fon Sil", ai2s: "12 şəkil işləndi",
    ai3: "Stil Köçür", ai3s: "Neo-Minimal mövzu tətbiq edildi",
  }
}

export default function Page() {
  const [lang, setLang] = useState<"en"|"ru"|"az">("en")
  const [openLang, setOpenLang] = useState(false)
  useEffect(()=>{const s=localStorage.getItem("dzynos-lang") as any; if(s&&dict[s]) setLang(s)},[])
  const setL=(l:"en"|"ru"|"az")=>{setLang(l); localStorage.setItem("dzynos-lang", l); setOpenLang(false)}
  const c=dict[lang]

  return (
    <div className="min-h-screen bg-[#0a0d14] text-white relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute top-[380px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#00d8c0]/30 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute top-[380px] left-[10%] w-[300px] h-[400px] bg-[#00d8c0]/40 blur-[60px] rounded-full pointer-events-none" />
      <div className="absolute top-[380px] right-[10%] w-[300px] h-[400px] bg-[#00d8c0]/40 blur-[60px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1100px] mx-auto w-full px-4 pt-6 flex-1">
        {/* Header - ТОПОВЫЙ - только DzynOS */}
        <header className="flex items-center justify-between bg-[#11141d]/90 backdrop-blur-xl border border-white/[0.06] rounded-2xl px-4 py-3 shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00f5d4] to-[#00a8a0] flex items-center justify-center text-black text-[14px]">◈</div>
              <span className="font-bold text-[16px] tracking-tight">DzynOS</span>
            </Link>
            <nav className="hidden lg:flex gap-5 text-[13px] text-white/40">
              <span className="hover:text-white cursor-pointer transition">Product</span>
              <span className="hover:text-white cursor-pointer transition">Solutions</span>
              <span className="hover:text-white cursor-pointer transition">Pricing</span>
              <span className="hover:text-white cursor-pointer transition">Resources</span>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            {/* Язык как у топов - иконка глобуса + dropdown */}
            <div className="relative">
              <button onClick={()=>setOpenLang(!openLang)} className="flex items-center gap-1.5 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition">
                <span className="text-[12px]">🌐</span> {lang.toUpperCase()} <span className="text-[10px] opacity-50">▼</span>
              </button>
              {openLang && (
                <div className="absolute right-0 top-[36px] bg-[#171a27] border border-white/10 rounded-xl p-1 shadow-xl w-[120px] z-50">
                  {(["en","ru","az"] as const).map(l=>(
                    <button key={l} onClick={()=>setL(l)} className={`w-full text-left px-3 py-2 rounded-lg text-[12px] flex justify-between items-center ${lang===l?"bg-white text-black font-bold":"text-white/60 hover:bg-white/5 hover:text-white"}`}>
                      {l==="en"?"English":l==="ru"?"Русский":"Azərbaycan"} {lang===l&&"✓"}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Link href="/demo"><button className="hidden md:block px-4 py-1.5 rounded-lg bg-white text-black text-[13px] font-medium hover:bg-white/90">Log in</button></Link>
            <Link href="/demo"><button className="px-4 py-1.5 rounded-lg bg-[#2dd4bf] text-black text-[13px] font-bold hover:bg-[#5eead4] shadow-[0_0_15px_rgba(45,212,191,0.3)]">Get Started</button></Link>
          </div>
        </header>

        {/* Hero */}
        <div className="text-center mt-14 max-w-3xl mx-auto">
          <h1 className="text-[32px] md:text-[40px] font-bold tracking-tight leading-tight">{c.hero}</h1>
          <p className="text-white/50 text-[13px] md:text-[14px] mt-4 max-w-[600px] mx-auto leading-relaxed">{c.sub}</p>
          <div className="flex justify-center gap-3 mt-6">
            <Link href="/demo"><button className="px-5 py-2.5 rounded-xl bg-[#2dd4bf] text-black font-bold text-[13px] shadow-[0_0_20px_rgba(45,212,191,0.4)]">{c.start}</button></Link>
            <Link href="/demo"><button className="px-5 py-2.5 rounded-xl bg-white/[0.06] border border-white/15 text-[13px] hover:bg-white/[0.1]">{c.demo}</button></Link>
          </div>
        </div>

        {/* Карта */}
        <div className="mt-10 mx-auto max-w-[820px] bg-[#0e1018] border border-[#00f5d4]/30 rounded-[24px] p-6 md:p-8 shadow-[0_0_0_1px_rgba(0,245,212,0.2),0_0_60px_rgba(0,245,212,0.25)] relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="flex items-center gap-2 text-[#2dd4bf] font-bold text-[15px] mb-5">📁 {c.p}</h3>
              <div className="space-y-5">
                <div><div className="inline-flex items-center gap-1.5 bg-[#2dd4bf] text-black text-[11px] font-bold px-2.5 py-1 rounded-full">● {c.inProgress}</div><p className="font-bold text-[13px] mt-1.5">{c.p1}</p><p className="text-[11px] text-white/40 mt-0.5">{c.p1s}</p></div>
                <div><div className="flex items-center gap-1.5 text-[#10b981] text-[12px] font-bold">● {c.completed}</div><p className="font-bold text-[13px] mt-0.5">{c.p2}</p><p className="text-[11px] text-white/40 mt-0.5">{c.p2s}</p></div>
                <div><div className="flex items-center gap-1.5 text-[#f59e0b] text-[12px] font-bold">● {c.inReview}</div><p className="font-bold text-[13px] mt-0.5">{c.p3}</p><p className="text-[11px] text-white/40 mt-0.5">{c.p3s}</p></div>
              </div>
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-[#2dd4bf] font-bold text-[15px] mb-5">▦ {c.a}</h3>
              <div className="space-y-5">
                <div><div className="inline-flex bg-[#2dd4bf] text-black text-[10px] font-bold px-2 py-0.5 rounded-md">v2.1</div><p className="font-bold text-[13px] mt-1.5">{c.a1}</p><p className="text-[11px] text-white/40 mt-0.5">{c.a1s}</p></div>
                <div><p className="font-bold text-[13px]">{c.a2}</p><p className="text-[11px] text-white/40 mt-0.5">{c.a2s}</p></div>
                <div><p className="font-bold text-[13px]">{c.a3}</p><p className="text-[11px] text-white/40 mt-0.5">{c.a3s}</p></div>
              </div>
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-[#2dd4bf] font-bold text-[15px] mb-5">✨ {c.ai}</h3>
              <div className="space-y-4">
                <div className="bg-[#12302e] border border-[#2dd4bf]/50 rounded-xl p-3.5 shadow-[0_0_20px_rgba(45,212,191,0.3)]"><p className="font-bold text-[13px]">{c.ai1}</p><p className="text-[11px] text-white/60 mt-1">{c.ai1s}</p></div>
                <div className="px-1"><p className="font-bold text-[13px]">{c.ai2}</p><p className="text-[11px] text-white/40 mt-0.5">{c.ai2s}</p></div>
                <div className="px-1"><p className="font-bold text-[13px]">{c.ai3}</p><p className="text-[11px] text-white/40 mt-0.5">{c.ai3s}</p></div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-12" />
      </div>

      {/* Footer - как ты просил */}
      <footer className="relative z-10 border-t border-white/[0.06] py-5 text-center">
        <p className="text-[11px] text-white/30 tracking-wide">© 2026 DzynOS • Основан в 2026 • dzynos.com • Made in Baku</p>
      </footer>
    </div>
  )
    }
