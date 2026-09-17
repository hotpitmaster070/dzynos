"use client"
import { useState, useEffect } from "react"

const FALLBACK_COLORS = [
  { name: "Cream", hex: "#e8dcc6" },
  { name: "True Black", hex: "#111111" },
  { name: "Crimson", hex: "#ef4444" },
]

const CURRENCIES = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "AZN", symbol: "₼" },
  { code: "RUB", symbol: "₽" }
]

export default function FashionTool({ project, onUpdate }: any) {
  const p = project?.props || {}

  // 1. Динамическая валюта
  const [currency, setCurrency] = useState(p["Валюта"] || "USD")
  const currentSymbol = CURRENCIES.find(c => c.code === currency)?.symbol || "$"

  // 2. Цвета из базы данных без хардкода
  let dbPalette: any[] = FALLBACK_COLORS
  try {
    if (p["Палитра"]) {
      dbPalette = typeof p["Палитра"] === 'string' ? JSON.parse(p["Палитра"]) : p["Палитра"]
    }
  } catch { dbPalette = FALLBACK_COLORS }

  const colors = dbPalette.map((c: any) => {
    if (typeof c === 'string') return { name: c, hex: c }
    return c
  })

  // 3. Состояния кроя и визуала
  const [color, setColor] = useState(p["Цвет"] || colors[0]?.name || "Cream")
  const [img, setImg] = useState(project?.image_url || "")
  const [shoulders, setShoulders] = useState(Number(p["Плечи см"] || 48))
  const [backOpen, setBackOpen] = useState(Number(p["Спина %"] || 0))
  const [flare, setFlare] = useState(p["Клеш"] || "Straight")
  const [activeTool, setActiveTool] = useState("select")

  // 4. Экономический блок (Глобальный)
  const [meters, setMeters] = useState(Number(p["Расход м"] || 2.3))
  const [priceM, setPriceM] = useState(Number(p["Цена за м"] || 18))
  const [work, setWork] = useState(Number(p["Пошив"] || 25))
  const [furn, setFurn] = useState(Number(p["Фурнитура"] || 5))

  // 5. ИИ Генератор принтов
  const [prompt, setPrompt] = useState("")
  const [aiGenerating, setAiGenerating] = useState(false)

  const totalFabric = meters * priceM
  const total = totalFabric + work + furn

  useEffect(() => { setImg(project?.image_url || "") }, [project?.id])

  // Автосохранение изменений в Supabase
  useEffect(() => {
    if (!onUpdate) return
    onUpdate({
      "Валюта": currency,
      "Цвет": color,
      "Плечи см": String(shoulders),
      "Спина %": String(backOpen),
      "Клеш": flare,
      "Расход м": String(meters),
      "Цена за м": String(priceM),
      "Пошив": String(work),
      "Фурнитура": String(furn),
      "Себестоимость": String(total.toFixed(2)),
      "Опыт": `Валюта ${currency}, Цвет ${color}, Плечи ${shoulders}см, Клеш ${flare}`
    })
  }, [currency, color, shoulders, backOpen, flare, meters, priceM, work, furn])

  const generateAiPattern = () => {
    if (!prompt) return
    setAiGenerating(true)
    setTimeout(() => {
      const mockPattern = "https://unsplash.com"
      setImg(mockPattern)
      setAiGenerating(false)
      if (onUpdate) onUpdate({ image_url: mockPattern } as any)
    }, 1500)
  }

  const saveImage = () => {
    if (onUpdate && img) onUpdate({ image_url: img } as any)
    alert("Saved to cloud! ✅")
  }

  const currentHex = colors.find((c: any) => c.name === color)?.hex || "#e8dcc6"

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 text-white bg-black p-2 md:p-4 rounded-3xl">
      
      {/* ЛЕВАЯ ПАНЕЛЬ: ПРОФЕССИОНАЛЬНЫЕ CAD-ИНСТРУМЕНТЫ */}
      <div className="lg:col-span-1 flex lg:flex-col justify-center lg:justify-start items-center gap-3 bg-[#0d0f14] border border-white/5 p-3 rounded-2xl">
        {[
          { id: "select", icon: "◈", label: "Select" },
          { id: "pen", icon: "✒️", label: "Pen Tool" },
          { id: "sew", icon: "🧵", label: "Stitch" },
          { id: "cut", icon: "✂️", label: "Pattern" },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTool(t.id)}
            className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center text-[16px] transition relative group ${activeTool === t.id ? "bg-[#2dd4bf] text-black font-bold" : "bg-white/[0.04] text-white/60 hover:bg-white/10"}`}
          >
            {t.icon}
            <span className="absolute left-14 bg-black border border-white/10 text-[#2dd4bf] text-[10px] px-2 py-1 rounded hidden lg:group-hover:inline z-50 whitespace-nowrap">{t.label}</span>
          </button>
        ))}
      </div>

      {/* ЦЕНТРАЛЬНАЯ ЗОНА: 3D ОКНО И ИИ ГЕНЕРАТОР ТКАНИ */}
      <div className="lg:col-span-6 space-y-4">
        <div className="bg-[#0d0f14] border border-[#2dd4bf]/20 rounded-2xl p-4 relative">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-[#2dd4bf] text-[13px] tracking-tight">👗 {project?.title || "Untitled Design"}</h3>
            <span className="text-[10px] bg-white/[0.05] border border-white/10 px-2.5 py-0.5 rounded-full text-white/50 uppercase tracking-wider">Studio 2D/3D</span>
          </div>
          
          <div className="h-[360px] bg-[#050608] rounded-xl flex items-center justify-center relative overflow-hidden border border-white/5">
            {img ? (
              <img src={img} className="h-full w-full object-cover transition-all duration-500 rounded-xl" style={{ filter: `sepia(0.2) hue-rotate(10deg) drop-shadow(0 10px 20px ${currentHex}30)` }} />
            ) : (
              <div className="text-center space-y-2 text-white/20">
                <div className="text-[28px]">◈</div>
                <div className="text-[11px]">Drop image URL or use AI Generator below</div>
              </div>
            )}
            <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-[10px] text-white/70 font-mono">
              {shoulders}cm • {backOpen}% • {flare} • {color}
            </div>
          </div>

          {/* ИИ Вкладка */}
          <div className="mt-4 bg-black/40 border border-white/5 p-3 rounded-xl space-y-2">
            <div className="text-[10px] text-[#2dd4bf] font-bold uppercase tracking-wider">🤖 AI Fabric Texture Generator</div>
            <div className="flex gap-2">
              <input 
                value={prompt} 
                onChange={e => setPrompt(e.target.value)} 
                placeholder="Describe texture: Baroque silk pattern, golden threads, seamless..." 
                className="flex-1 bg-black border border-white/10 rounded-lg px-3 py-2 text-[12px] text-white outline-none focus:border-[#2dd4bf]" 
              />
              <button 
                onClick={generateAiPattern} 
                disabled={aiGenerating} 
                className="px-4 bg-[#2dd4bf] text-black rounded-lg text-[12px] font-bold hover:bg-[#00f5d4] transition disabled:opacity-50"
              >
                {aiGenerating ? "Generating..." : "Generate"}
              </button>
            </div>
          </div>

          <div className="flex gap-2 mt-3">
            <input value={img} onChange={e => setImg(e.target.value)} placeholder="Or paste custom image link..." className="flex-1 bg-white/[0.03] border border-white/5 rounded-lg px-3 py-2 text-[11px] outline-none text-white/60 focus:border-white/20" />
            <button onClick={saveImage} className="px-4 bg-white/10 text-white hover:bg-white/20 transition rounded-lg text-[11px] font-bold">Save</button>
          </div>
        </div>
      </div>

      {/* ПРАВАЯ ПАНЕЛЬ: НАСТРОЙКИ КРОЯ, ТЕХПАК И СМЕТА */}
      <div className="lg:col-span-5 space-y-4">
        
        {/* КРОЙ И ПАЛИТРА */}
        <div className="bg-[#0d0f14] border border-white/5 rounded-2xl p-4 space-y-4">
          <div>
            <h4 className="font-bold text-[#2dd4bf] text-[11px] uppercase tracking-wider mb-2.5">📐 Pattern Engineering</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[11px] mb-1"><span>Shoulders Width</span><span className="text-[#2dd4bf] font-mono">{shoulders} cm</span></div>
                <input type="range" min="36" max="60" value={shoulders} onChange={e => setShoulders(Number(e.target.value))} className="w-full accent-[#2dd4bf] bg-white/10 h-1 rounded-full cursor-pointer" />
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1"><span>Back Opening</span><span className="text-[#2dd4bf] font-mono">{backOpen} %</span></div>
                <input type="range" min="0" max="100" value={backOpen} onChange={e => setBackOpen(Number(e.target.value))} className="w-full accent-[#2dd4bf] bg-white/10 h-1 rounded-full cursor-pointer" />
              </div>
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                {["Straight", "Flare", "Mermaid"].map(f => (
                  <button key={f} onClick={() => setFlare(f)} className={`py-1.5 rounded-lg text-[10px] font-bold border transition ${flare === f ? 'bg-[#2dd4bf] text-black border-[#2dd4bf]' : 'bg-white/5 text-white/60 border-white/5 hover:bg-white/10'}`}>{f}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-3">
            <h4 className="font-bold text-[#2dd4bf] text-[11px] uppercase tracking-wider mb-2">🎨 Fabric Palette ({colors.length})</h4>
            <div className="flex gap-2 flex-wrap">
              {colors.map((c: any) => (
                <button key={c.name} onClick={() => setColor(c.name)} className={`w-8 h-8 rounded-full border-2 transition ${color === c.name ? 'border-[#2dd4bf] scale-110' : 'border-transparent'}`} style={{ backgroundColor: c.hex }} title={c.name} />
              ))}
            </div>
            <div className="text-[11px] mt-2 text-white/40">Selected: <b className="text-white font-medium">{color}</b></div>
          </div>
                           
