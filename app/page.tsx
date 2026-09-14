"use client"
import Link from "next/link"
import { useState, useEffect } from "react"

const dict = {
  en: {
    badge: "🚀 Launching today • For ALL Designers",
    hero: "The Operating System for ALL Design",
    sub: "Design fashion, interiors, landscapes, architecture, and web — in one place. Unified. Fast. Powerful. Made in Baku, built for the world.",
    start: "Start building free →", demo: "Book a demo",
    f: "Fashion", i: "Interior", l: "Landscape",
    f1: "Summer Collection '26", f1s: "12 looks • Tech pack ready",
    f2: "Denim Line", f2s: "5 patterns • Fabric sourced",
    f3: "Evening Dresses", f3s: "In review • 3 comments",
    i1: "Loft Apartment Baku", i1s: "85m² • 3D ready • Client approved",
    i2: "Villa Furniture Set", i2s: "24 objects • Materials included",
    i3: "Moodboard Minimal", i3s: "12 materials • Shared",
    l1: "Villa Garden + Pool", l1s: "Garden • Pool • Pergola • Pathway",
    l2: "Terrace Lighting", l2s: "LED • 8 zones • Auto irrigation",
    l3: "Planting Plan", l3s: "32 plants • Climate: Baku",
    ai: "Also for Architecture • Web Design • Product Design",
  },
  ru: {
    badge: "🚀 Запуск сегодня • Для ВСЕХ дизайнеров",
    hero: "Операционная Система для ВСЕГО Дизайна",
    sub: "Дизайн одежды, интерьеров, ландшафтов, архитектуры и веба — в одном месте. Унифицировано. Быстро. Мощно. Сделано в Баку для всего мира.",
    start: "Начать бесплатно →", demo: "Забронировать демо",
    f: "Одежда", i: "Интерьер", l: "Ландшафт",
    f1: "Летняя Коллекция '26", f1s: "12 образов • Техпак готов",
    f2: "Деним Линия", f2s: "5 лекал • Ткань подобрана",
    f3: "Вечерние Платья", f3s: "На проверке • 3 коммента",
    i1: "Лофт Квартира Баку", i1s: "85м² • 3D готов • Клиент одобрил",
    i2: "Мебель для Виллы", i2s: "24 объекта • Материалы внутри",
    i3: "Мудборд Минимал", i3s: "12 материалов • Общий",
    l1: "Сад + Бассейн Вилла", l1s: "Сад • Бассейн • Пергола • Дорожки",
    l2: "Освещение Террасы", l2s: "LED • 8 зон • Автополив",
    l3: "План Посадок", l3s: "32 растения • Климат: Баку",
    ai: "Также для Архитектуры • Веб-дизайна • Продуктов",
  },
  az: {
    badge: "🚀 Bu gün start • BÜTÜN dizaynerlər üçün",
    hero: "BÜTÜN Dizayn üçün Əməliyyat Sistemi",
    sub: "Moda, interyer, landşaft, memarlıq və veb dizayn — hamısı bir yerdə. Vahid. Sürətli. Güclü. Bakıda hazırlanıb, dünya üçün qurulub.",
    start: "Pulsuz başla →", demo: "Demo bron et",
    f: "Moda", i: "İnteryer", l: "Landşaft",
    f1: "Yay Kolleksiyası '26", f1s: "12 obraz • Texniki paket hazır",
    f2: "Denim Xətti", f2s: "5 qəlib • Parça seçilib",
    f3: "Ziyafət Geyimləri", f3s: "Baxışda • 3 rəy",
    i1: "Loft Mənzil Bakı", i1s: "85m² • 3D hazır • Müştəri təsdiqlədi",
    i2: "Villa Mebel Dəsti", i2s: "24 obyekt • Materiallar daxil",
    i3: "Moodboard Minimal", i3s: "12 material • Paylaşıldı",
    l1: "Villa Bağı + Hovuz", l1s: "Bağ • Hovuz • Pergola • Yollar",
    l2: "Terras İşıqlandırma", l2s: "LED • 8 zona • Avto suvarma",
    l3: "Əkin Planı", l3s: "32 bitki • İqlim: Bakı",
    ai: "Həmçinin Memarlıq • Veb Dizayn • Məhsul Dizaynı üçün",
  }
}

export default function Page(){
  const [lang,setLang]=useState<"en"|"ru"|"az">("en")
  const [open,setOpen]=useState(false)
  useEffect(()=>{const s=localStorage.getItem("dzynos-lang") as any; if(s&&dict[s]) setLang(s)},[])
  const setL=(l:"en"|"ru"|"az")=>{setLang(l); localStorage.setItem("dzynos-lang",l); setOpen(false)}
  const c=dict[lang]

  return(
    <div className="min-h-screen bg-[#0a0d14] text-white relative flex flex-col overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute top-[380px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#00f5d4]/25 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1100px] mx-auto w-full px-4 pt-6 flex-1">
        <header className="flex items-center justify-between bg-[#11141d]/90 backdrop-blur-xl border border-white/[0.06] rounded-2xl px-4 py-3 shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
          <Link href="/" className="flex items-center gap-2.5"><div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00f5d4] to-[#00a8a0] flex items-center justify-center text-black">◈</div><span className="font-bold text-[16px]">DzynOS</span></Link>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button onClick={()=>setOpen(!open)} className="flex items-center gap-1.5 bg-white/[0.06] border border-white/10 rounded-lg px-2.5 py-1.5 text-[11px]">🌐 {lang.toUpperCase()} ▼</button>
              {open && <div className="absolute right-0 top-9 bg-[#171a27] border border-white/10 rounded-xl p-1 w-[140px] z-50">
                {(["en","ru","az"] as const).map(l=><button key={l} onClick={()=>setL(l)} className={`w-full text-left px-3 py-2 rounded-lg text-[12px] ${lang===l?"bg-white text-black font-bold":"text-white/60 hover:bg-white/5"}`}>{l==="en"?"English":l==="ru"?"Русский":"Azərbaycan"} {lang===l&&"✓"}</button>)}
              </div>}
            </div>
            {/* ИСПРАВИЛ ТУТ: теперь ведет в панель */}
            <Link href="/dashboard"><button className="px-4 py-1.5 rounded-lg bg-[#2dd4bf] text-black text-[13px] font-bold shadow-[0_0_15px_rgba(45,212,191,0.3)]">Get Started</button></Link>
          </div>
        </header>

        <div className="text-center mt-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#00f5d4]/10 border border-[#00f5d4]/30 rounded-full px-3 py-1 text-[11px] text-[#2dd4bf] mb-5">{c.badge}</div>
          <h1 className="text-[30px] md:text-[48px] font-bold tracking-tight leading-[1.1]">{c.hero}</h1>
          <p className="text-white/50 text-[13px] md:text-[15px] mt-4 max-w-[680px] mx-auto leading-relaxed">{c.sub}</p>
          <div className="flex justify-center gap-3 mt-6">
            <Link href="/dashboard"><button className="px-6 py-3 rounded-xl bg-[#2dd4bf] text-black font-bold text-[13px] shadow-[0_0_25px_rgba(45,212,191,0.5)]">{c.start}</button></Link>
            <Link href="/dashboard?cat=brand"><button className="px-6 py-3 rounded-xl bg-white/[0.06] border border-white/15 text-[13px]">{c.demo}</button></Link>
          </div>
        </div>

        <div className="mt-10 mx-auto max-w-[960px] bg-[#0e1018] border border-[#00f5d4]/40 rounded-[24px] p-6 md:p-8 shadow-[0_0_0_1px_rgba(0,245,212,0.25),0_0_70px_rgba(0,245,212,0.3)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="flex items-center gap-2 text-[#2dd4bf] font-bold text-[16px] mb-5">👗 {c.f}</h3>
              <div className="space-y-4">
                <Link href="/dashboard?cat=fashion" className="block hover:bg-white/[0.03] rounded-xl p-2 -m-2 transition"><div className="inline-flex bg-[#2dd4bf] text-black text-[10px] font-bold px-2 py-0.5 rounded-full">In Progress</div><p className="font-bold text-[13px] mt-1.5">{c.f1}</p><p className="text-[11px] text-white/40">{c.f1s}</p></Link>
                <Link href="/dashboard?cat=fashion" className="block hover:bg-white/[0.03] rounded-xl p-2 -m-2 transition"><p className="font-bold text-[13px]">{c.f2}</p><p className="text-[11px] text-white/40">{c.f2s}</p></Link>
                <Link href="/dashboard?cat=fashion" className="block hover:bg-white/[0.03] rounded-xl p-2 -m-2 transition"><p className="font-bold text-[13px]">{c.f3}</p><p className="text-[11px] text-white/40">{c.f3s}</p></Link>
              </div>
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-[#2dd4bf] font-bold text-[16px] mb-5">🏠 {c.i}</h3>
              <div className="space-y-4">
                <Link href="/dashboard?cat=interior" className="block hover:bg-white/[0.03] rounded-xl p-2 -m-2 transition"><div className="inline-flex bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded">85m²</div><p className="font-bold text-[13px] mt-1.5">{c.i1}</p><p className="text-[11px] text-white/40">{c.i1s}</p></Link>
                <Link href="/dashboard?cat=interior" className="block hover:bg-white/[0.03] rounded-xl p-2 -m-2 transition"><p className="font-bold text-[13px]">{c.i2}</p><p className="text-[11px] text-white/40">{c.i2s}</p></Link>
                <Link href="/dashboard?cat=interior" className="block hover:bg-white/[0.03] rounded-xl p-2 -m-2 transition"><p className="font-bold text-[13px]">{c.i3}</p><p className="text-[11px] text-white/40">{c.i3s}</p></Link>
              </div>
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-[#2dd4bf] font-bold text-[16px] mb-5">🌿 {c.l}</h3>
              <div className="space-y-4">
                <Link href="/dashboard?cat=landscape" className="block bg-[#12302e] border border-[#2dd4bf]/40 rounded-xl p-3 hover:bg-[#12302e]/80 transition"><p className="font-bold text-[13px]">{c.l1}</p><p className="text-[11px] text-white/50 mt-1">{c.l1s}</p></Link>
                <Link href="/dashboard?cat=landscape" className="block hover:bg-white/[0.03] rounded-xl p-2 -m-2 transition"><p className="font-bold text-[13px]">{c.l2}</p><p className="text-[11px] text-white/40">{c.l2s}</p></Link>
                <Link href="/dashboard?cat=landscape" className="block hover:bg-white/[0.03] rounded-xl p-2 -m-2 transition"><p className="font-bold text-[13px]">{c.l3}</p><p className="text-[11px] text-white/40">{c.l3s}</p></Link>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-white/5 text-center text-[11px] text-[#2dd4bf]/60">{c.ai}</div>
        </div>
        <div className="h-10" />
      </div>

      <footer className="relative z-10 border-t border-white/[0.06] py-5 text-center">
        <p className="text-[11px] text-white/30">© 2026 DzynOS • Основан в 2026 • dzynos.com • Fashion • Interior • Landscape • Architecture • Web</p>
      </footer>
    </div>
  )
                                                                                                                                                                                                                 }
