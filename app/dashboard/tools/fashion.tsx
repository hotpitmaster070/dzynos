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

export default function FashionTool(props) {
  const project = props.project
  const onUpdate = props.onUpdate
  const p = (project && project.props) || {}

  const [currency, setCurrency] = useState(p["Валюта"] || "USD")
  const [color, setColor] = useState(p["Цвет"] || "Cream")
  const [img, setImg] = useState((project && project.image_url) || "")
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

  let currentSymbol = "\$"
  for (let i = 0; i < CURRENCIES.length; i++) {
    if (CURRENCIES[i].code === currency) {
      currentSymbol = CURRENCIES[i].symbol
    }
  }

  let currentHex = "#e8dcc6"
  for (let i = 0; i < FALLBACK_COLORS.length; i++) {
    if (FALLBACK_COLORS[i].name === color) {
      currentHex = FALLBACK_COLORS[i].hex
    }
  }

  useEffect(() => {
    if (project && project.image_url) {
      setImg(project.image_url)
    }
  }, [project])

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
      if (onUpdate) onUpdate({ image_url: mockPattern })
    }, 1500)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 text-white bg-black p-2 md:p-4 rounded-3xl">
      <div className="lg:col-span-1 flex lg:flex-col justify-center lg:justify-start items-center gap-3 bg-[#0d0f14] border border-white/5 p-3 rounded-2xl">
        {TOOLS_LIST.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTool(t.id)}
            className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center text-[16px] transition relative group ${activeTool === t.id ? "bg-[#2dd4bf] text-black font-bold" : "bg-white/[0.04] text-white/60 hover:bg-white/10"}`}
          >
            <span>{t.icon}</span>
          </button>
        ))}
      </div>

      <div className="lg:col-span-6 space-y-4">
        <div className="bg-[#0d0f14] border border-[#2dd4bf]/20 rounded-2xl p-4 relative">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-[#2dd4bf] text-[13px] tracking-tight">{(project && project.title) || "Untitled Design"}</h3>
            <span className="text-[10px] bg-white/[0.05] border border-white/10 px-2.5 py-0.5 rounded-full text-white/50">Studio 2D/3D</span>
          </div>
          
          <div className="h-[360px] bg-[#050608] rounded-xl flex items-center justify-center relative overflow-hidden border border-white/5">
            {img ? (
              <img src={img} alt="Preview" className="h-full w-full object-cover rounded-xl" style={{ filter: `sepia(0.2) hue-rotate(10deg) drop-shadow(0 10px 20px ${currentHex}30)` }} />
            ) : (
              <div className="text-center space-y-2 text-white/20">
                <div className="text-[11px]">Drop image URL or use AI Generator below</div>
              </div>
            )}
          </div>

          <div className="mt-4 bg-black/40 border border-white/5 p-3 rounded-xl space-y-2">
            <div className="text-[10px] text-[#2dd4bf] font-bold uppercase">🤖 AI Fabric Texture Generator</div>
            <div className="flex gap-2">
              <input value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Describe texture..." className="flex-1 bg-black border border-white/10 rounded-lg px-3 py-2 text-[12px] text-white outline-none" />
              <button type="button" onClick={generateAiPattern} disabled={aiGenerating} className="px-4 bg-[#2dd4bf] text-black rounded-lg text-[12px] font-bold">
                {aiGenerating ? "..." : "Generate"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-4">
        <div className="bg-[#0d0f14] border border-white/5 rounded-2xl p-4 space-y-4">
          <div>
            <h4 className="font-bold text-[#2dd4bf] text-[11px] uppercase mb-2.5">📐 Pattern Engineering</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[11px] mb-1"><span>Shoulders Width</span><span>{shoulders} cm</span></div>
                <input type="range" min="36" max="60" value={shoulders} onChange={e => setShoulders(Number(e.target.value))} className="w-full accent-[#2dd4bf]" />
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1"><span>Back Opening</span><span>{backOpen} %</span></div>
                <input type="range" min="0" max="100" value={backOpen} onChange={e => setBackOpen(Number(e.target.value))} className="w-full accent-[#2dd4bf]" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#0d0f14] border border-white/5 rounded-2xl p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-white text-[11px] uppercase">📋 Tech Pack Specs</h4>
            <select value={currency} onChange={e => setCurrency(e.target.value)} className="bg-black border border-white/10 rounded-lg text-white text-[11px]">
              {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div><label className="text-[9px] text-white/40 uppercase">Fabric, m</label><input type="number" step="0.1" value={meters} onChange={e => setMeters(Number(e.target.value))} className="w-full bg-white/[0.04] border border-white/10 rounded-lg p-1.5 text-[12px]" /></div>
            <div><label className="text-[9px] text-white/40 uppercase">Price</label><input type="number" value={priceM} onChange={e => setPriceM(Number(e.target.value))} className="w-full bg-white/[0.04] border border-white/10 rounded-lg p-1.5 text-[12px]" /></div>
          </div>

          <div className="bg-black p-3 rounded-xl border border-white/5 space-y-1.5 text-[12px]">
            <div className="flex justify-between text-white/50"><span>Total Cost</span><span className="text-[#2dd4bf]">{currentSymbol}{total.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
       }
    
