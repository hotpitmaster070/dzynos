"use client"
import { useState, useEffect } from "react"

const FALLBACK_COLORS = [
  { name: "Cream", hex: "#e8dcc6" },
  { name: "True Black", hex: "#111111" },
  { name: "Crimson", hex: "#ef4444" }
]

const CURRENCIES = [
  { code: "USD", symbol: "\$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "AZN", symbol: "₼" },
  { code: "RUB", symbol: "₽" }
]

const TOOLS_LIST = [
  { id: "select", icon: "◈", label: "Select" },
  { id: "pen", icon: "✒️", label: "Pen Tool" },
  { id: "sew", icon: "🧵", label: "Stitch" },
  { id: "cut", icon: "✂️", label: "Pattern" }
]

export default function FashionTool(props: any) {
  const project = props.project
  const onUpdate = props.onUpdate
  const p = project?.props || {}

  const [currency, setCurrency] = useState(p["Валюта"] || "USD")
  const [color, setColor] = useState(p["Цвет"] || "Cream")
  const [img, setImg] = useState(project?.image_url || "")
  const [shoulders, setShoulders] = useState(Number(p["Плечи см"] || 48))
  const [backOpen, setBackOpen] = useState(Number(p["Спина %"] || 0))
  const [flare, setFlare] = useState(p["Клеш"] || "Straight")
  const [activeTool, setActiveTool] = useState("select")

  const [meters, setMeters] = useState(Number(p["Расход м"] || 2.3))
  const [priceM, setPriceM] = useState(Number(p["Цена за м"] || 18))
  const [work, setWork] = useState(Number(p["Пошив"] || 25))
  const [furn, setFurn] = useState(Number(p["Фурнитура"] || 5))

  const [prompt, setPrompt] = useState("")
  const [aiGenerating, setAiGenerating] = useState(false)

  const totalFabric = meters * priceM
  const total = totalFabric + work + furn

  const currentSymbol = CURRENCIES.find(c => c.code === currency)?.symbol || "\$"
  const currentHex = FALLBACK_COLORS.find(c => c.name === color)?.hex || "#e8dcc6"

  useEffect(() => {
    if (project?.image_url) {
      setImg(project.image_url)
    }
  }, [project?.id])

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
      "Себестоимость": String(total.toFixed(2))
    })
  }, [currency, color, shoulders, backOpen, flare, meters, priceM, work, furn, total])

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

  return (
    <div className="space-y-4">
      {/* ВИЗУАЛ И CAD ПАНЕЛЬ */}
      <div className="bg-[#11141d] border border-[#2dd4bf]/20 rounded-2xl p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-[#2dd4bf] text-[13px]">👗 {project?.title}</h3>
          <div className="flex gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
            {TOOLS_LIST.map(t => (
              <button key={t.id} type="button" onClick={() => setActiveTool(t.id)} className={`px-2.5 py-1 rounded-lg text-[11px] transition ${activeTool === t.id ? "bg-[#2dd4bf] text-black font-bold" : "text-white/40"}`}>{t.icon}</button>
            ))}
          </div>
        </div>

        <div className="h-[340px] bg-black rounded-xl flex items-center justify-center relative overflow-hidden border border-white/5">
          {img ? (
            <img src={img} alt="Preview" className="h-full object-contain" style={{ filter: `drop-shadow(0 0 20px ${currentHex}40)` }} />
          ) : (
            <div className="text-white/20 text-[11px]">Drop image URL or use AI</div>
          )}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/80 px-3 py-1 rounded-full text-[10px] text-white/60 font-mono">
            {shoulders}cm • {backOpen}% • {flare} • {color}
          </div>
        </div>

        {/* AI Генератор тканей прямо под фото */}
        <div className="mt-3 bg-black/30 border border-white/5 p-2 rounded-xl space-y-2">
          <div className="text-[9px] text-[#2dd4bf] uppercase tracking-wider font-bold">🤖 AI Fabric Texture Generator</div>
          <div className="flex gap-2">
            <input value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Describe texture (e.g. Silk pattern)..." className="flex-1 bg-black border border-white/10 rounded-lg px-2.5 py-1.5 text-[11px] outline-none" />
            <button type="button" onClick={generateAiPattern} disabled={aiGenerating} className="px-3 bg-[#2dd4bf] text-black rounded-lg text-[11px] font-bold">{aiGenerating ? "..." : "Gen"}</button>
          </div>
        </div>
      </div>

      {/* ПАЛИТРА ЦВЕТОВ */}
      <div className="bg-[#11141d] border border-white/10 rounded-2xl p-4">
        <h4 className="font-bold text-[#2dd4bf] text-[11px] mb-3 uppercase tracking-wider">🎨 Fabric Palette</h4>
        <div className="flex gap-2 flex-wrap">
          {FALLBACK_COLORS.map(c => (
            <button key={c.name} type="button" onClick={() => setColor(c.name)} className={`w-8 h-8 rounded-full border-2 ${color === c.name ? 'border-[#2dd4bf] scale-110' : 'border-white/10'}`} style={{ backgroundColor: c.hex }} title={c.name} />
          ))}
        </div>
        <div className="text-[11px] mt-2 text-white/40">Selected: <b className="text-white">{color}</b></div>
      </div>

      {/* КРОЙ */}
      <div className="bg-[#151821] border border-white/10 rounded-2xl p-4">
        <h4 className="font-bold text-[11px] mb-3 uppercase tracking-wider">📐 Pattern Engineering</h4>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-[11px]"><span>Shoulders Width</span><span className="text-[#2dd4bf] font-mono">{shoulders}cm</span></div>
            <input type="range" min="36" max="60" value={shoulders} onChange={e => setShoulders(Number(e.target.value))} className="w-full accent-[#2dd4bf]" />
          </div>
          <div>
            <div className="flex justify-between text-[11px]"><span>Back Opening</span><span className="text-[#2dd4bf] font-mono">{backOpen}%</span></div>
            <input type="range" min="0" max="100" value={backOpen} onChange={e => setBackOpen(Number(e.target.value))} className="w-full accent-[#2dd4bf]" />
          </div>
          <div className="grid grid-cols-3 gap-1 pt-1">
            {["Straight", "Flare", "Mermaid"].map(f => (
              <button key={f} type="button" onClick={() => setFlare(f)} className={`py-1.5 rounded-lg text-[10px] font-bold border ${flare === f ? 'bg-[#2dd4bf] text-black border-[#2dd4bf]' : 'bg-white/5 text-white/60 border-white/10'}`}>{f}</button>
            ))}
          </div>
        </div>
      </div>

      {/* МУЛЬТИВАЛЮТНАЯ СМЕТА */}
      <div className="bg-[#151821] border border-white/10 rounded-2xl p-4 space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-white text-[11px] uppercase tracking-wider">💸 Cost Calculation</h4>
          <select value={currency} onChange={e => setCurrency(e.target.value)} className="bg-black border border-white/10 rounded-lg text-[#2dd4bf] font-bold text-[11px] px-1.5 py-0.5 outline-none">
            {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div><label className="text-white/40">Fabric, m</label><input type="number" step="0.1" value={meters} onChange={e => setMeters(Number(e.target.value))} className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1" /></div>
          <div><label className="text-white/40">Price per meter</label><input type="number" value={priceM} onChange={e => setPriceM(Number(e.target.value))} className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1" /></div>
          <div><label className="text-white/40">Labor Cost</label><input type="number" value={work} onChange={e => setWork(Number(e.target.value))} className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1" /></div>
          <div><label className="text-white/40">Trims & Hardware</label><input type="number" value={furn} onChange={e => setFurn(Number(e.target.value))} className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1" /></div>
        </div>

        <div className="mt-2 bg-black/40 rounded-xl p-3 space-y-1.5 text-[12px] border border-white/5">
          <div className="flex justify-between text-white/50"><span>Fabric Cost</span><span>{currentSymbol}{totalFabric.toFixed(2)}</span></div>
          <div className="flex justify-between text-white/50"><span>Labor + Trims</span><span>{currentSymbol}{(work + furn).toFixed(2)}</span></div>
          <div className="flex justify-between border-t border-white/10 pt-2 text-[13px] font-bold"><span>Total Cost</span><b className="text-[#2dd4bf] font-mono">{currentSymbol}{total.toFixed(2)}</b></div>
          <div className="flex justify-between text-[10px] text-white/30"><span>Target Retail (x2.5)</span><span className="font-mono">{currentSymbol}{(total * 2.5).toFixed(2)}</span></div>
        </div>

        <button type="button" onClick={() => window.print()} className="w-full bg-[#2dd4bf] text-black font-bold py-2.5 rounded-xl text-[12px] hover:bg-[#00f5d4] transition">📄 Export Tech Pack (PDF)</button>
      </div>
    </div>
  )
}
