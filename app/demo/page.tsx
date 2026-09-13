"use client"
import { useState } from "react"
import Link from "next/link"

type Cat = "fashion" | "interior" | "landscape"

const data = {
  fashion: {
    title: "👗 Fashion Studio",
    projects: [
      { name: "Summer Collection '26", status: "In Progress", meta: "12 looks • Tech pack ready", color: "bg-[#2dd4bf]" },
      { name: "Denim Line", status: "Fabric Sourced", meta: "5 patterns • Baku factory", color: "bg-white" },
      { name: "Evening Dresses", status: "In Review", meta: "3 comments from client", color: "bg-[#f59e0b]" },
    ],
    assets: [
      { name: "Fabrics Library", meta: "142 fabrics • Silk, Denim, Linen" },
      { name: "Patterns v2.1", meta: "58 patterns • Ready to cut" },
      { name: "Tech Packs", meta: "24 packs • PDF export" },
    ],
    ai: [
      { name: "Generate 4 Variants", desc: "AI создает 4 варианта платья из 1 эскиза" },
      { name: "Print Generator", desc: "Сгенерировать принт для ткани" },
      { name: "Size Grading", desc: "Автоматическая градация размеров" },
    ]
  },
  interior: {
    title: "🏠 Interior Studio",
    projects: [
      { name: "Loft 85m² - Baku", status: "Client Approved", meta: "3D • смета: 24,500 AZN", color: "bg-[#10b981]" },
      { name: "Villa - Novkhani", status: "In Progress", meta: "320m² • 5 rooms", color: "bg-[#2dd4bf]" },
      { name: "Office - Port Baku", status: "In Review", meta: "120m² • Minimal", color: "bg-[#f59e0b]" },
    ],
    assets: [
      { name: "Furniture Library", meta: "1,240 items • IKEA, local" },
      { name: "Materials", meta: "86 materials • Marble, wood, textile" },
      { name: "Lighting Plans", meta: "12 plans • LED zones" },
    ],
    ai: [
      { name: "Render in 30s", desc: "Фотореалистичный рендер из плана" },
      { name: "Style Transfer", desc: "Применить Loft / Japandi ко всей квартире" },
      { name: "Budget Calc", desc: "Автоматическая смета по материалам" },
    ]
  },
  landscape: {
    title: "🌿 Landscape Studio",
    projects: [
      { name: "Villa Garden + Pool", status: "In Progress", meta: "600m² • Pool • Pergola", color: "bg-[#2dd4bf]" },
      { name: "Terrace - Sea Breeze", status: "Planting Plan", meta: "32 plants • Auto irrigation", color: "bg-white" },
      { name: "Courtyard - Old City", status: "Approved", meta: "Stone • Lighting • Fountain", color: "bg-[#10b981]" },
    ],
    assets: [
      { name: "Plants - Baku Climate", meta: "180 plants • Полив, тень" },
      { name: "Hardscape", meta: "Pools, pathways, pergolas" },
      { name: "Lighting + Irrigation", meta: "LED, auto water system" },
    ],
    ai: [
      { name: "Generate Garden Plan", desc: "AI план сада по фото участка" },
      { name: "Season Preview", desc: "Как будет выглядеть сад летом/зимой" },
      { name: "Water Calculation", desc: "Расчет полива и освещения" },
    ]
  }
}

export default function Demo(){
  const [cat, setCat] = useState<Cat>("interior")
  const c = data[cat]

  return(
    <div className="min-h-screen bg-[#080a12] text-white">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:28px_28px]" />
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 pt-4">
        {/* Header */}
        <div className="flex items-center justify-between bg-[#11141d] border border-white/10 rounded-xl px-4 py-2.5">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 font-bold"><div className="w-7 h-7 rounded-lg bg-[#2dd4bf] flex items-center justify-center text-black">◈</div>DzynOS</Link>
            <div className="hidden md:flex bg-black/40 border border-white/10 rounded-lg p-1">
              {(["fashion","interior","landscape"] as Cat[]).map(k=>(
                <button key={k} onClick={()=>setCat(k)} className={`px-3 py-1 rounded-md text-[12px] font-bold capitalize transition ${cat===k?"bg-white text-black":"text-white/50 hover:text-white"}`}>{k==="fashion"?"👗 Fashion":k==="interior"?"🏠 Interior":"🌿 Landscape"}</button>
              ))}
            </div>
          </div>
          <Link href="/"><button className="text-[12px] bg-white text-black px-3 py-1.5 rounded-lg font-bold">← Landing</button></Link>
        </div>

        {/* Mobile switcher */}
        <div className="md:hidden flex bg-black/40 border border-white/10 rounded-xl p-1 mt-4">
          {(["fashion","interior","landscape"] as Cat[]).map(k=>(
            <button key={k} onClick={()=>setCat(k)} className={`flex-1 py-2 rounded-lg text-[12px] font-bold ${cat===k?"bg-white text-black":"text-white/50"}`}>{k}</button>
          ))}
        </div>

        {/* Main */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[260px_1fr_260px] gap-4">
          {/* Left - Projects */}
          <div className="bg-[#0e1018] border border-white/10 rounded-2xl p-4">
            <h3 className="text-[#2dd4bf] font-bold text-[13px] mb-4">📁 Projects • {c.title}</h3>
            <div className="space-y-3">
              {c.projects.map((p,i)=>(
                <div key={i} className="bg-white/[0.03] border border-white/5 rounded-xl p-3 hover:border-white/10 cursor-pointer">
                  <div className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${p.color} ${p.color==="bg-white"?"text-black":"text-black"}`}>{p.status}</div>
                  <p className="font-bold text-[12px] mt-2">{p.name}</p>
                  <p className="text-[11px] text-white/40 mt-1">{p.meta}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-[12px] hover:bg-white/[0.08]">+ New Project</button>
          </div>

          {/* Center - Canvas */}
          <div className="bg-[#0e1018] border border-[#2dd4bf]/30 rounded-2xl p-4 min-h-[500px] shadow-[0_0_40px_rgba(45,212,191,0.15)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[13px]">{cat==="fashion"?"Canvas • Collection Board":cat==="interior"?"Canvas • Floor Plan - 85m²":"Canvas • Garden Plan - 600m²"}</h3>
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-[#2dd4bf]"></span>
                <span className="w-2 h-2 rounded-full bg-white/20"></span>
                <span className="w-2 h-2 rounded-full bg-white/20"></span>
              </div>
            </div>

            {/* Fake canvas content based on category */}
            {cat==="fashion" && (
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-xl h-[180px] flex items-center justify-center text-black text-[11px]">👗 Dress Sketch 1</div>
                <div className="bg-white rounded-xl h-[180px] flex items-center justify-center text-black text-[11px]">👗 Dress Sketch 2</div>
                <div className="bg-[#12302e] border border-[#2dd4bf]/30 rounded-xl h-[120px] flex items-center justify-center text-[#2dd4bf] text-[11px]">+ AI Variations x4</div>
                <div className="bg-white/[0.05] border border-dashed border-white/20 rounded-xl h-[120px] flex items-center justify-center text-white/30 text-[11px]">Drop fabric here</div>
              </div>
            )}
            {cat==="interior" && (
              <div className="bg-[#11131c] border border-white/10 rounded-xl p-3">
                <div className="grid grid-cols-3 gap-2 text-[10px]">
                  <div className="bg-[#2dd4bf]/20 border border-[#2dd4bf]/40 rounded p-2 h-[90px]">Living<br/>24m²</div>
                  <div className="bg-white/5 border border-white/10 rounded p-2 h-[90px]">Kitchen<br/>12m²</div>
                  <div className="bg-white/5 border border-white/10 rounded p-2 h-[90px]">Bedroom<br/>18m²</div>
                  <div className="bg-white/5 border border-white/10 rounded p-2 h-[60px] col-span-2">Terrace • 16m²</div>
                  <div className="bg-[#f59e0b]/20 border border-[#f59e0b]/30 rounded p-2 h-[60px]">Bath</div>
                </div>
                <p className="text-[10px] text-white/30 mt-3 text-center">Drag furniture • Click to render • AI budget: 24,500 AZN</p>
              </div>
            )}
            {cat==="landscape" && (
              <div className="bg-[#11131c] border border-white/10 rounded-xl p-3">
                <div className="relative h-[260px] bg-[#0a1a14] rounded-lg border border-[#2dd4bf]/20 p-2">
                  <div className="absolute top-2 left-2 right-2 bottom-2 border border-dashed border-white/20 rounded flex items-center justify-center">
                    <div className="text-center text-[10px] text-white/40">
                      🌿 Garden • 🏊 Pool 6x3m<br/>🪴 Pergola • 💡 Lighting zones<br/>💧 Auto irrigation
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-white/30 mt-3 text-center">600m² • 32 plants • Baku climate • Water: 120L/day</p>
              </div>
            )}
          </div>

          {/* Right - Assets + AI */}
          <div className="space-y-4">
            <div className="bg-[#0e1018] border border-white/10 rounded-2xl p-4">
              <h3 className="text-[#2dd4bf] font-bold text-[13px] mb-4">▦ Assets</h3>
              <div className="space-y-3">
                {c.assets.map((a,i)=><div key={i}><p className="font-bold text-[12px]">{a.name}</p><p className="text-[11px] text-white/40">{a.meta}</p></div>)}
              </div>
            </div>
            <div className="bg-[#0e1018] border border-[#2dd4bf]/30 rounded-2xl p-4 shadow-[0_0_20px_rgba(45,212,191,0.15)]">
              <h3 className="text-[#2dd4bf] font-bold text-[13px] mb-4">✨ AI Studio</h3>
              <div className="space-y-3">
                {c.ai.map((a,i)=>(
                  <div key={i} className={`${i===0?"bg-[#12302e] border border-[#2dd4bf]/40 rounded-xl p-3":"px-1"}`}>
                    <p className="font-bold text-[12px]">{a.name}</p>
                    <p className="text-[11px] text-white/50 mt-0.5">{a.desc}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 rounded-xl bg-[#2dd4bf] text-black font-bold text-[12px]">Generate with AI →</button>
            </div>
          </div>
        </div>

        <div className="h-8" />
      </div>
    </div>
  )
}
