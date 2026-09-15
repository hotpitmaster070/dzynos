"use client"
import Link from "next/link"
import { useState, useEffect } from "react"

const CATS = ['fashion','interior','landscape','architecture','jewelry','product','graphic','web','3d','custom']

const dict = {
  en: { badge:"🚀 Launching today • 10 Categories", hero:"The Operating System for ALL Design", sub:"Design fashion, interiors, landscapes, architecture, jewelry, product, graphic, web and 3D — in one place. Unified. Fast. Powerful. Made in Baku.", start:"Start building free →", demo:"View dashboard", cats:["👗 Fashion","🛋️ Interior","🌿 Landscape","🏗️ Architecture","💍 Jewelry","📦 Product","🎨 Graphic","💻 Web & App","🎬 3D Visual","➕ Custom"], f:"Fashion", i:"Interior", l:"Landscape", f1:"Summer Collection '26", f1s:"12 looks • Tech pack ready", f2:"Denim Line", f2s:"5 patterns • Fabric sourced", i1:"Loft Apartment Baku", i1s:"85m² • 3D ready", i2:"Villa Furniture Set", i2s:"24 objects", l1:"Villa Garden + Pool", l1s:"Garden • Pool • Pergola", l2:"Terrace Lighting", l2s:"LED • 8 zones", ai:"10 Categories • 1 Platform" },
  ru: { badge:"🚀 Запуск сегодня • 10 категорий", hero:"Операционная Система для ВСЕГО Дизайна", sub:"Одежда, интерьер, ландшафт, архитектура, украшения, продукты, графика, веб и 3D — в одном месте. Сделано в Баку для мира.", start:"Начать бесплатно →", demo:"В дашборд", cats:["👗 Мода","🛋️ Интерьер","🌿 Ландшафт","🏗️ Архитектура","💍 Украшения","📦 Продукт","🎨 Графика","💻 Веб & App","🎬 3D","➕ Custom"], f:"Одежда", i:"Интерьер", l:"Ландшафт", f1:"Летняя Коллекция '26", f1s:"12 образов • Техпак готов", f2:"Деним Линия", f2s:"5 лекал", i1:"Лофт Квартира Баку", i1s:"85м² • 3D готов", i2:"Мебель для Виллы", i2s:"24 объекта", l1:"Сад + Бассейн", l1s:"Сад • Бассейн", l2:"Освещение Террасы", l2s:"LED • 8 зон", ai:"10 Категорий • 1 Платформа" },
  az: { badge:"🚀 Bu gün start • 10 Kateqoriya", hero:"BÜTÜN Dizayn üçün Əməliyyat Sistemi", sub:"Moda, interyer, landşaft, memarlıq, zərgərlik, məhsul, qrafika, veb və 3D — hamısı bir yerdə.", start:"Pulsuz başla →", demo:"Panelə bax", cats:["👗 Moda","🛋️ İnteryer","🌿 Landşaft","🏗️ Memarlıq","💍 Zərgərlik","📦 Məhsul","🎨 Qrafika","💻 Web & App","🎬 3D Vizual","➕ Custom"], f:"Moda", i:"İnteryer", l:"Landşaft", f1:"Yay Kolleksiyası '26", f1s:"12 obraz", f2:"Denim Xətti", f2s:"5 qəlib", i1:"Loft Mənzil Bakı", i1s:"85m² • 3D hazır", i2:"Villa Mebel", i2s:"24 obyekt", l1:"Bağ + Hovuz", l1s:"Bağ • Hovuz", l2:"İşıqlandırma", l2s:"LED • 8 zona", ai:"10 Kateqoriya • 1 Platforma" }
}

export default function Page(){
  const [lang,setLang]=useState<"en"|"ru"|"az">("en")
  const [open,setOpen]=useState(false)
  const c=dict[lang]
  return(
    <div className="min-h-screen bg-black text-white relative flex flex-col overflow-hidden">
      {/* Сетка теперь почти невидимая - как у Apple */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
      {/* Бирюзовое свечение - мягкое */}
      <div className="absolute top-[250px] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#00f5d4]/[0.12] blur-[120px] rounded-full pointer-events-none" />
      <div className="relative z-10 max-w-[1100px] mx-auto w-full px-4 pt-6 flex-1">
        <header className="flex items-center justify-between bg-[#111111]/80 backdrop-blur-2xl border border-white/[0.08] rounded-2xl px-4 py-3">
          <Link href="/" className="flex items-center gap-2.5"><div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00f5d4] to-[#00a8a0] flex items-center justify-center text-black font-bold">◈</div><span className="font-bold text-[16px] tracking-tight">DzynOS</span></Link>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button onClick={()=>setOpen(!open)} className="flex items-center gap-1.5 bg-white/[0.06] border border-white/10 rounded-full px-3 py-1.5 text-[11px]">🌐 {lang.toUpperCase()} ▼</button>
              {open && <div className="absolute right-0 top-9 bg-[#1a1a1a] border border-white/10 rounded-xl p-1 w-[140px] z-50 shadow-2xl">
                {(["en","ru","az"] as const).map(l=><button key={l} onClick={()=>{setLang(l); setOpen(false)}} className={`w-full text-left px-3 py-2 rounded-lg text-[12px] ${lang===l?"bg-white text-black font-bold":"text-white/60 hover:bg-white/5"}`}>{l.toUpperCase()} {lang===l&&"✓"}</button>)}
              </div>}
            </div>
            <Link href="/dashboard?cat=fashion"><button className="px-5 py-2 rounded-full bg-[#2dd4bf] text-black text-[13px] font-bold hover:bg-[#00f5d4] transition">Get Started</button></Link>
          </div>
        </header>

        <div className="text-center mt-16 md:mt-20 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#00f5d4]/[0.08] border border-[#00f5d4]/20 rounded-full px-3.5 py-1.5 text-[11px] text-[#2dd4bf] mb-6 tracking-wide">{c.badge}</div>
          <h1 className="text-[34px] md:text-[56px] font-bold tracking-[-0.03em] leading-[0.95]">{c.hero}</h1>
          <p className="text-white/50 text-[14px] md:text-[16px] mt-5 max-w-[680px] mx-auto leading-relaxed">{c.sub}</p>
          <div className="flex flex-wrap justify-center gap-2 mt-8 max-w-[720px] mx-auto">
            {c.cats.map((catName,i)=><Link key={i} href={`/dashboard?cat=${CATS[i]}`} className="px-3.5 py-2 rounded-full bg-white/[0.06] border border-white/10 text-[12px] text-white/70 hover:bg-[#2dd4bf]/10 hover:border-[#2dd4bf]/30 hover:text-[#2dd4bf] transition">{catName}</Link>)}
          </div>
          <div className="flex justify-center gap-3 mt-8">
            <Link href="/dashboard?cat=fashion"><button className="px-7 py-3.5 rounded-full bg-[#2dd4bf] text-black font-bold text-[14px] shadow-[0_0_30px_rgba(45,212,191,0.4)] hover:shadow-[0_0_40px_rgba(45,212,191,0.6)] hover:bg-[#00f5d4] transition">{c.start}</button></Link>
            <Link href="/dashboard?cat=custom"><button className="px-7 py-3.5 rounded-full bg-white/[0.06] border border-white/15 text-[14px] hover:bg-white/[0.1] transition">{c.demo}</button></Link>
          </div>
        </div>
        <div className="h-16" />
      </div>
      <footer className="relative z-10 border-t border-white/[0.06] py-6 text-center"><p className="text-[11px] text-white/30 tracking-wide">© 2026 DzynOS • Made in Baku • 10 Categories • True Black Edition</p></footer>
    </div>
  )
            }
