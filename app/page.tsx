"use client"
import Link from "next/link"
import { useState, useEffect } from "react"

const dict = {
  en: {
    badge: "🚀 Launching today • For ALL Designers • 10 Categories",
    hero: "The Operating System for ALL Design",
    sub: "Design fashion, interiors, landscapes, architecture, jewelry, product, graphic, web and 3D — in one place. Unified. Fast. Powerful. Made in Baku, built for the world.",
    start: "Start building free →", demo: "View dashboard",
    cats: ["👗 Fashion","🛋️ Interior","🌿 Landscape","🏗️ Architecture","💍 Jewelry","📦 Product","🎨 Graphic","💻 Web & App","🎬 3D Visual","➕ Custom"],
    f: "Fashion", i: "Interior", l: "Landscape",
    f1: "Summer Collection '26", f1s: "12 looks • Tech pack ready",
    f2: "Denim Line", f2s: "5 patterns • Fabric sourced",
    i1: "Loft Apartment Baku", i1s: "85m² • 3D ready • Approved",
    i2: "Villa Furniture Set", i2s: "24 objects • Materials included",
    l1: "Villa Garden + Pool", l1s: "Garden • Pool • Pergola",
    l2: "Terrace Lighting", l2s: "LED • 8 zones • Auto irrigation",
    ai: "Bütün sahələr • 10 Categories • 1 Platforma — Fashion • Interior • Landscape • Architecture • Jewelry • Product • Graphic • Web • 3D • Custom",
  },
  ru: {
    badge: "🚀 Запуск сегодня • 10 категорий • Для всех",
    hero: "Операционная Система для ВСЕГО Дизайна",
    sub: "Одежда, интерьер, ландшафт, архитектура, украшения, продукты, графика, веб и 3D — в одном месте. Сделано в Баку для мира.",
    start: "Начать бесплатно →", demo: "В дашборд",
    cats: ["👗 Мода","🛋️ Интерьер","🌿 Ландшафт","🏗️ Архитектура","💍 Украшения","📦 Продукт","🎨 Графика","💻 Веб & App","🎬 3D","➕ Custom"],
    f: "Одежда", i: "Интерьер", l: "Ландшафт",
    f1: "Летняя Коллекция '26", f1s: "12 образов • Техпак готов",
    f2: "Деним Линия", f2s: "5 лекал • Ткань подобрана",
    i1: "Лофт Квартира Баку", i1s: "85м² • 3D готов",
    i2: "Мебель для Виллы", i2s: "24 объекта",
    l1: "Сад + Бассейн", l1s: "Сад • Бассейн • Пергола",
    l2: "Освещение Террасы", l2s: "LED • 8 зон",
    ai: "Все категории • Fashion • Interior • Landscape • Architecture • Jewelry • Product • Graphic • Web • 3D • Custom",
  },
  az: {
    badge: "🚀 Bu gün start • 10 Kateqoriya • BÜTÜN dizaynerlər",
    hero: "BÜTÜN Dizayn üçün Əməliyyat Sistemi",
    sub: "Moda, interyer, landşaft, memarlıq, zərgərlik, məhsul, qrafika, veb və 3D — hamısı bir yerdə. Vahid. Sürətli. Güclü.",
    start: "Pulsuz başla →", demo: "Panelə bax",
    cats: ["👗 Moda","🛋️ İnteryer","🌿 Landşaft","🏗️ Memarlıq","💍 Zərgərlik","📦 Məhsul","🎨 Qrafika","💻 Web & App","🎬 3D Vizual","➕ Custom"],
    f: "Moda", i: "İnteryer", l: "Landşaft",
    f1: "Yay Kolleksiyası '26", f1s: "12 obraz • Hazır",
    f2: "Denim Xətti", f2s: "5 qəlib • Parça seçilib",
    i1: "Loft Mənzil Bakı", i1s: "85m² • 3D hazır",
    i2: "Villa Mebel", i2s: "24 obyekt",
    l1: "Bağ + Hovuz", l1s: "Bağ • Hovuz • Pergola",
    l2: "İşıqlandırma", l2s: "LED • 8 zona",
    ai: "Bütün sahələr • Moda • İnteryer • Landşaft • Memarlıq • Zərgərlik • Məhsul • Qrafika • Web • 3D • Custom",
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
      <div className="absolute top-[300px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#00f5d4]/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1100px] mx-auto w-full px-4 pt-6 flex-1">
        <header className="flex items-center justify-between bg-[#11141d]/90 backdrop-blur-xl border border-white/[0.06] rounded-2xl px-4 py-3 shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
          <Link href="/" className="flex items-center gap-2.5"><div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00f5d4] to-[#00a8a0] flex items-center justify-center text-black font-bold">◈</div><span className="font-bold text-[16px]">DzynOS</span></Link>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button onClick={()=>setOpen(!open)} className="flex items-center gap-1.5 bg-white/[0.06] border border-white/10 rounded-lg px-2.5 py-1.5 text-[11px]">🌐 {lang.toUpperCase()} ▼</button>
              {open && <div className="absolute right-0 top-9 bg-[#171a27] border border-white/10 rounded-xl p-1 w-[140px] z-50">
                {(["en","ru","az"] as const).map(l=><button key={l} onClick={()=>setL(l)} className={`w-full text-left px-3 py-2 rounded-lg text-[12px] ${lang===l?"bg-white text-black font-bold":"text-white/60 hover:bg-white/5"}`}>{l==="en"?"English":l==="ru"?"Русский":"Azərbaycan"} {lang===l&&"✓"}</button>)}
              </div>}
            </div>
            <Link href="/dashboard?cat=fashion"><button className="px-4 py-1.5 rounded-lg bg-[#2dd4bf] text-black text-[13px] font-bold shadow-[0_0_15px_rgba(45,212,191,0.3)]">Get Started</button></Link>
          </div>
        </header>

        <div className="text-center mt-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#00f5d4]/10 border border-[#00f5d4]/30 rounded-full px-3 py-1 text-[11px] text-[#2dd4bf] mb-5">{c.badge}</div>
          <h1 className="text-[32px] md:text-[52px] font-bold tracking-tight leading-[1.05]">{c.hero}</h1>
          <p className="text-white/50 text-[13px] md:text-[15px] mt-4 max-w-[700px] mx-auto leading-relaxed">{c.sub}</p>

          {/* 10 CATEGORIES CHIPS - ТОП ВИД */}
          <div className="flex flex-wrap justify-center gap-2 mt-6 max-w-[700px] mx-auto">
            {c.cats.map((catName,i)=>{
              const cats = ['fashion','interior','landscape','architecture','jewelry','product','graphic','web','3d','custom']
              return <Link key={i} href={`/dashboard?cat=${cats[i]}`} className="px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-[11px] text-white/70 hover:bg-[#2dd4bf]/10 hover:border-[#2dd4bf]/30 hover:text-[#2dd4bf] transition">{catName}</Link>
            })}
          </div>

          <div className="flex justify-center gap-3 mt-6">
            <Link href="/dashboard?cat=fashion"><button className="px-6 py-3 rounded-xl bg-[#2dd4bf] text-black font-bold text-[13px] shadow-[0_0_25px_rgba(45,212,191,0.5)]">{c.start}</button></Link>
            <Link href="/dashboard?cat=custom"><button className="px-6 py-3 rounded-xl bg-white/[0.06] border border-white/15 text-[13px]">{c.demo}</button></Link>
          </div>
        </div>

        <div className="mt-10 mx-auto max-w-[960px] bg-[#0e1018] border border-[#00f5d4]/30 rounded-[24px] p-6 md:p-8 shadow-[0_0_0_1px_rgba(0,245,212,0.2),0_0_60px_rgba(0,245,212,0.2)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="flex items-center gap-2 text-[#2dd4bf] font-bold text-[16px] mb-5">👗 {c.f}</h3>
              <div className="space-y-4">
                <Link href="/dashboard?cat=fashion" className="block bg-white/[0.03] border border-white/5 rounded-xl p-3 hover:border-[#2dd4bf]/30 transition"><div className="inline-flex bg-[#2dd4bf] text-black text-[10px] font-bold px-2 py-0.5 rounded-full">In Progress</div><p className="font-bold text-[13px] mt-1.5">{c.f1}</p><p className="text-[11px] text-white/40">{c.f1s}</p></Link>
                <Link href="/dashboard?cat=fashion" className="block p-2 hover:bg-white/[0.03] rounded-xl transition"><p className="font-bold text-[13px]">{c.f2}</p><p className="text-[11px] text-white/40">{c.f2s}</p></Link>
              </div>
              <Link href="/dashboard?cat=jewelry" className="block mt-6 p-3 rounded-xl bg-gradient-to-br from-[#2dd4bf]/10 to-transparent border border-[#2dd4bf]/20"><p className="text-[11px] text-[#2dd4bf] font-bold">💍 ZƏRGƏRLİK</p><p className="text-[12px] font-bold mt-1">Qızıl Set Baku</p></Link>
              <Link href="/dashboard?cat=product" className="block mt-3 p-3 rounded-xl bg-white/[0.02] border border-white/5"><p className="text-[11px] text-white/40 font-bold">📦 MƏHSUL</p><p className="text-[12px] font-bold mt-1">Chair Design</p></Link>
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-[#2dd4bf] font-bold text-[16px] mb-5">🏠 {c.i}</h3>
              <div className="space-y-4">
                <Link href="/dashboard?cat=interior" className="block bg-white/[0.03] border border-white/5 rounded-xl p-3 hover:border-[#2dd4bf]/30 transition"><div className="inline-flex bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded">85m²</div><p className="font-bold text-[13px] mt-1.5">{c.i1}</p><p className="text-[11px] text-white/40">{c.i1s}</p></Link>
                <Link href="/dashboard?cat=interior" className="block p-2 hover:bg-white/[0.03] rounded-xl transition"><p className="font-bold text-[13px]">{c.i2}</p><p className="text-[11px] text-white/40">{c.i2s}</p></Link>
              </div>
              <Link href="/dashboard?cat=architecture" className="block mt-6 p-3 rounded-xl bg-gradient-to-br from-[#2dd4bf]/10 to-transparent border border-[#2dd4bf]/20"><p className="text-[11px] text-[#2dd4bf] font-bold">🏗️ MEMARLIQ</p><p className="text-[12px] font-bold mt-1">Villa Project Quba</p></Link>
              <Link href="/dashboard?cat=graphic" className="block mt-3 p-3 rounded-xl bg-white/[0.02] border border-white/5"><p className="text-[11px] text-white/40 font-bold">🎨 QRAFİKA</p><p className="text-[12px] font-bold mt-1">Brand Identity</p></Link>
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-[#2dd4bf] font-bold text-[16px] mb-5">🌿 {c.l}</h3>
              <div className="space-y-4">
                <Link href="/dashboard?cat=landscape" className="block bg-[#12302e] border border-[#2dd4bf]/40 rounded-xl p-3 hover:bg-[#12302e]/80 transition"><p className="font-bold text-[13px]">{c.l1}</p><p className="text-[11px] text-white/50 mt-1">{c.l1s}</p></Link>
                <Link href="/dashboard?cat=landscape" className="block p-2 hover:bg-white/[0.03] rounded-xl transition"><p className="font-bold text-[13px]">{c.l2}</p><p className="text-[11px] text-white/40">{c.l2s}</p></Link>
              </div>
              <Link href="/dashboard?cat=web" className="block mt-6 p-3 rounded-xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10"><p className="text-[11px] text-white/60 font-bold">💻 WEB & APP</p><p className="text-[12px] font-bold mt-1">E-commerce UI</p></Link>
              <Link href="/dashboard?cat=3d" className="block mt-3 p-3 rounded-xl bg-white/[0.02] border border-white/5"><p className="text-[11px] text-white/40 font-bold">🎬 3D VİZUAL</p><p className="text-[12px] font-bold mt-1">Render Scene</p></Link>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-white/5 text-center">
            <div className="inline-flex flex-wrap justify-center gap-2 text-[10px] text-[#2dd4bf]/50 tracking-widest uppercase">{c.ai}</div>
          </div>
        </div>
        <div className="h-10" />
      </div>

      <footer className="relative z-10 border-t border-white/[0.06] py-5 text-center">
        <p className="text-[11px] text-white/30">© 2026 DzynOS • 10 Categories • Made in Baku • Fashion • Interior • Landscape • Architecture • Jewelry • Product • Graphic • Web • 3D • Custom</p>
      </footer>
    </div>
  )
    }
