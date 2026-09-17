"use client"
import { useState, useEffect } from "react"

const FALLBACK_COLORS = [
  { name: "Cream", hex: "#e8dcc6" },
  { name: "True Black", hex: "#111111" },
  { name: "Crimson", hex: "#ef4444" }
]

const CURRENCIES = [
  { code: "USD", symbol: "$" },
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
  
  // Умное состояние для динамической палитры
  const [colors, setColors] = useState([])
  const [color, setColor] = useState(p["Цвет"] || "Cream")
  const [newColorHex, setNewColorHex] = useState("#2dd4bf")
  const [newColorName, setNewColorName] = useState("")

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

  // Загрузка палитры из пропсов Supabase
  useEffect(() => {
    let dbPalette = FALLBACK_COLORS
    try {
      if (p["Палитра"]) {
        dbPalette = typeof p["Палитра"] === 'string' ? JSON.parse(p["Палитра"]) : p["Палитра"]
      }
    } catch (e) { 
      dbPalette = FALLBACK_COLORS 
    }
    const mapped = dbPalette.map(c => typeof c === 'string' ? { name: c, hex: c } : c)
    setColors(mapped)
  }, [project])

  let currentSymbol = "$"
  for (let i = 0; i < CURRENCIES.length; i++) {
    if (CURRENCIES[i].code === currency) {
      currentSymbol = CURRENCIES[i].symbol
    }
  }

  let currentHex = "#e8dcc6"
  for (let i = 0; i < colors.length; i++) {
    if (colors[i].name === color) {
      currentHex = colors[i].hex
    }
  }

  useEffect(() => {
    if (project && project.image_url) {
      setImg(project.image_url)
    }
  }, [project])

  // Функция добавления нового цвета в базу данных прямо с телефона
  const handleAddColor = () => {
    const name = newColorName.trim() || `Color ${colors.length + 1}`
    const updatedColors = [...colors, { name: name, hex: newColorHex }]
    setColors(updatedColors)
    setColor(name)
    setNewColorName("")
    
    if (onUpdate) {
      onUpdate({ "Палитра": JSON.stringify(updatedColors) })
    }
  }

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

          {/* ТОП-БЛОК ДИНАМИЧЕСКОЙ ПАЛИТРЫ ЦВЕТОВ */}
          <div className="border-t border-white/5 pt-3">
            <h4 className="font-bold text-[#2dd4bf] text-[11px] uppercase tracking-wider mb-2.5">🎨 Fabric Palette ({colors.length})</h4>
            <div className="flex gap-2 flex-wrap items-center max-h-[100px] overflow-y-auto p-1 bg-black/20 rounded-xl">
              {colors.map(c => (
                <button 
                  type="button" 
                  key={c.name} 
                  onClick={() => setColor(c.name)} 
                  className={`w-7 h-7 rounded-full border-2 transition ${color === c.name ? 'border-[#2dd4bf] scale-110' : 'border-transparent'}`} 
                  style={{ backgroundColor: c.hex }} 
                  title={c.name} 
                />
              ))}
            </div>
            
            {/* Панель добавления нового кастомного цвета */}
            <div className="mt-3 bg-white/[0.02] border border-white/5 p-2 rounded-xl space-y-2">
              <div className="text-[9px] text-white/40 uppercase">Add custom color</div>
              <div className="flex gap-2 items-center">
                <input type="color" value={newColorHex} onChange={e => setNewColorHex(e.target.value)} className="w-7 h-7 bg-transparent border-0 rounded cursor-pointer" />
                <input type="text" value={newColorName} onChange={e => setNewColorName(e.target.value)} placeholder="Color name (e.g. Silk Blue)" className="flex-1 bg-black border border-white/10 rounded-lg px-2 py-1 text-[11px] text-white outline-none" />
                <button type="button" onClick={handleAddColor} className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg text-[11px] transition">+</button>
              </div>
            </div>
            <div className="text-[11px] mt-2 text-white/40">Selected: <b className="text-white font-medium">{color}</b></div>
          </div>
        </div>

        <div className="bg-[#0d0f14] border border-white/5 rounded-2xl p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-white text-[11px] uppercase">📋 Tech Pack Specs</h4>
            <select value={currency} onChange={e => setCurrency(e.target.value)} className="bg-black border border-white/10 rounded-lg text-white text-[11px]">
  
