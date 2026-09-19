"use client"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
const ARViewer3D = dynamic(() => import("./3d/viewer").then(m => m.ARViewer3D), {
  ssr: false,
  loading: () => <div className="h-[360px] bg-black rounded-xl flex items-center justify-center text-white/20 text-[11px]">Loading 3D Engine...</div>
})
const REAL_PANTONE_DATABASE = [
  { name: "Classic Blue (Pantone 19-4052)", hex: "#0f4c81" },
  { name: "Marsala (Pantone 18-1438)", hex: "#955251" },
  { name: "Radiant Orchid (Pantone 18-3224)", hex: "#b565a7" },
  { name: "Emerald (Pantone 17-5641)", hex: "#009473" },
  { name: "Tangerine Tango (Pantone 17-1463)", hex: "#dd4124" },
  { name: "Honeysuckle (Pantone 18-2120)", hex: "#d94f70" },
  { name: "Turquoise (Pantone 15-5519)", hex: "#45b5aa" },
  { name: "Mimosa (Pantone 14-0848)", hex: "#f0c05a" },
  { name: "True Black (Pantone 19-4007)", hex: "#111111" },
  { name: "Bright White (Pantone 11-0601)", hex: "#f4f5f6" },
  { name: "Neon Mint (Custom)", hex: "#2dd4bf" },
  { name: "Cyber Pink (Custom)", hex: "#ff007f" },
  { name: "Muted Olive (Pantone 18-0525)", hex: "#5c5a42" },
  { name: "Terracotta (Pantone 16-1526)", hex: "#c36c51" },
  { name: "Lavender Fog (Pantone 13-3820)", hex: "#bfb9cc" }
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

export default function FashionTool(props: any) {
  const project = props.project
  const onUpdate = props.onUpdate
  const p = project?.props || {}

  const [currency, setCurrency] = useState(p["Валюта"] || "USD")
  const [color, setColor] = useState(p["Цвет"] || "Classic Blue (Pantone 19-4052)")
  const [searchQuery, setSearchQuery] = useState("")

  const [img, setImg] = useState(project?.image_url || "")
  const [shoulders, setShoulders] = useState(Number(p["Плечи см"] || 48))
  const [backOpen, setBackOpen] = useState(Number(p["Спина %"] || 0))
  const [flare, setFlare] = useState(p["Клеш"] || "Straight")
  const [activeTool, setActiveTool] = useState("select")
  // DzynOS SMART
  const [mannequinType, setMannequinType] = useState<"female"|"male"|"child">("female")

  const [meters, setMeters] = useState(Number(p["Расход м"] || 2.3))
  const [priceM, setPriceM] = useState(Number(p["Цена за м"] || 18))
  const [work, setWork] = useState(Number(p["Пошив"] || 25))
  const [furn, setFurn] = useState(Number(p["Фурнитура"] || 5))

  const [prompt, setPrompt] = useState("")
  const [aiGenerating, setAiGenerating] = useState(false)

  const totalFabric = meters * priceM
  const total = totalFabric + work + furn

  const matchedCurrency = CURRENCIES.find(function(c) { return c.code === currency })
  const currentSymbol = matchedCurrency? matchedCurrency.symbol : "$"

  const matchedColor = REAL_PANTONE_DATABASE.find(function(c) { return c.name === color })
  const currentHex = matchedColor? matchedColor.hex : "#0f4c81"

  const filteredColors = REAL_PANTONE_DATABASE.filter(function(c) {
    return c.name.toLowerCase().indexOf(searchQuery.toLowerCase())!== -1
  })

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

  const generateAiPattern = async () => {
    if (!prompt) return
    setAiGenerating(true)
    try {
      const res = await fetch("/api/generate-texture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, fabric: color })
      })
      const data = await res.json()
      if (data.image) {
        setImg(data.image)
        if (onUpdate) onUpdate({ image_url: data.image } as any)
      }
    } catch (e) {
      const safePrompt = encodeURIComponent(`seamless fabric texture ${prompt} ${color} textile`)
      const freeImage = `https://image.pollinations.ai/prompt/${safePrompt}?width=1024&height=1024&nologo=true&seed=${Date.now()}`
      setImg(freeImage)
      if (onUpdate) onUpdate({ image_url: freeImage } as any)
    } finally {
      setAiGenerating(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-[#11141d] border border-[#2dd4bf]/20 rounded-2xl p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-[#2dd4bf] text-[13px]">👗 {project?.title}</h3>
          <div className="flex gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
            {TOOLS_LIST.map(function(t) {
              return (
                <button key={t.id} type="button" onClick={function() { setActiveTool(t.id) }} className={`px-2.5 py-1 rounded-lg text-[11px] transition ${activeTool === t.id? "bg-[#2dd4bf] text-black font-bold" : "text-white/40"}`}>{t.icon}</button>
              )
            })}
          </div>
        </div>

        {/* DzynOS SMART SWITCH - ВСТАВЛЕНО */}
        <div className="flex gap-2 mb-2 px-1">
          <button type="button" onClick={()=>setMannequinType("female")} className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition ${mannequinType==="female"?"bg-white text-black border-white":"bg-white/10 text-white/60 border-white/10"}`}>♀ Female</button>
          <button type="button" onClick={()=>setMannequinType("male")} className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition ${mannequinType==="male"?"bg-white text-black border-white":"bg-white/10 text-white/60 border-white/10"}`}>♂ Male</button>
          <button type="button" onClick={()=>setMannequinType("child")} className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition ${mannequinType==="child"?"bg-white text-black border-white":"bg-white/10 text-white/60 border-white/10"}`}>Child</button>
        </div>

        <ARViewer3D key={mannequinType} hex={currentHex} img={img} fabric={null} type={mannequinType} /> 

        <div className="mt-3 bg-black/30 border border-white/5 p-2 rounded-xl space-y-2">
          <div className="text-[9px] text-[#2dd4bf] uppercase tracking-wider font-bold">🤖 AI Fabric Texture Generator {aiGenerating? '(generating...)' : ''}</div>
          <div className="flex gap-2">
            <input value={prompt} onChange={function(e) { setPrompt(e.target.value) }} placeholder="Describe texture (e.g. Silk velvet gold pattern)..." className="flex-1 bg-black border border-white/10 rounded-lg px-2.5 py-1.5 text-[11px] outline-none" />
            <button type="button" onClick={generateAiPattern} disabled={aiGenerating} className="px-3 bg-[#2dd4bf] text-black rounded-lg text-[11px] font-bold disabled:opacity-50">{aiGenerating? "..." : "Gen"}</button>
          </div>
          <div className="text-[8px] text-white/20">Без ключа = free mode. С ключом FAL_KEY = FLUX Pro mode.</div>
        </div>
      </div>

      <div className="bg-[#11141d] border border-white/10 rounded-2xl p-4 space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-[#2dd4bf] text-[11px] uppercase tracking-wider">🎨 Глобальная палитра цветов</h4>
          <span className="text-[9px] text-white/30 font-mono">PANTONE / RAL</span>
        </div>
        <input value={searchQuery} onChange={function(e) { setSearchQuery(e.target.value) }} placeholder="🔍 Поиск цвета (например: Blue, Mint, Black...)" className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-[11px] text-white outline-none focus:border-[#2dd4bf] transition" />
        <div className="flex gap-2 flex-wrap max-h-[120px] overflow-y-auto p-1 bg-black/20 rounded-xl border border-white/5">
          {filteredColors.map(function(c) {
            return <button key={c.name} type="button" onClick={function() { setColor(c.name) }} className={`w-7 h-7 rounded-full border-2 transition ${color === c.name? 'border-[#2dd4bf] scale-110' : 'border-white/5'}`} style={{ backgroundColor: c.hex }} title={c.name} />
          })}
        </div>
        <div className="text-[11px] bg-black/40 p-2.5 rounded-xl border border-white/5 truncate">Выбран: <b className="text-[#2dd4bf]">{color}</b></div>
      </div>

      <div className="bg-[#151821] border border-white/10 rounded-2xl p-4">
        <h4 className="font-bold text-[11px] mb-3 uppercase tracking-wider">📐 Pattern Engineering</h4>
        <div className="space-y-3">
          <div><div className="flex justify-between text-[11px]"><span>Shoulders Width</span><span className="text-[#2dd4bf] font-mono">{shoulders}cm</span></div><input type="range" min="36" max="60" value={shoulders} onChange={function(e) { setShoulders(Number(e.target.value)) }} className="w-full accent-[#2dd4bf]" /></div>
          <div><div className="flex justify-between text-[11px]"><span>Back Opening</span><span className="text-[#2dd4bf] font-mono">{backOpen}%</span></div><input type="range" min="0" max="100" value={backOpen} onChange={function(e) { setBackOpen(Number(e.target.value)) }} className="w-full accent-[#2dd4bf]" /></div>
          <div className="grid grid-cols-3 gap-1 pt-1">
            {["Straight", "Flare", "Mermaid"].map(function(f) { return <button key={f} type="button" onClick={function() { setFlare(f) }} className={`py-1.5 rounded-lg text-[10px] font-bold border ${flare === f? 'bg-[#2dd4bf] text-black border-[#2dd4bf]' : 'bg-white/5 text-white/60 border-white/10'}`}>{f}</button> })}
          </div>
        </div>
      </div>

      <div className="bg-[#151821] border border-white/10 rounded-2xl p-4 space-y-3">
        <div className="flex justify-between items-center"><h4 className="font-bold text-white text-[11px] uppercase tracking-wider">💸 Cost Calculation</h4><select value={currency} onChange={function(e) { setCurrency(e.target.value) }} className="bg-black border border-white/10 rounded-lg text-[#2dd4bf] font-bold text-[11px] px-1.5 py-0.5 outline-none">{CURRENCIES.map(function(c) { return <option key={c.code} value={c.code}>{c.code}</option> })}</select></div>
        <div className="grid grid-cols-2 gap-2 text-[11px]"><div><label className="text-white/40">Fabric, m</label><input type="number" step="0.1" value={meters} onChange={function(e) { setMeters(Number(e.target.value)) }} className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-white" /></div><div><label className="text-white/40">Price per meter</label><input type="number" value={priceM} onChange={function(e) { setPriceM(Number(e.target.value)) }} className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-white" /></div><div><label className="text-white/40">Labor Cost</label><input type="number" value={work} onChange={function(e) { setWork(Number(e.target.value)) }} className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-white" /></div><div><label className="text-white/40">Trims & Hardware</label><input type="number" value={furn} onChange={function(e) { setFurn(Number(e.target.value)) }} className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-white" /></div></div>
        <div className="mt-2 bg-black/40 rounded-xl p-3 space-y-1.5 text-[12px] border border-white/5"><div className="flex justify-between text-white/50"><span>Fabric Cost</span><span>{currentSymbol}{totalFabric.toFixed(2)}</span></div><div className="flex justify-between text-white/50"><span>Labor + Trims</span><span>{currentSymbol}{(work + furn).toFixed(2)}</span></div><div className="flex justify-between border-t border-white/10 pt-2 text-[13px] font-bold"><span>Total Cost</span><b className="text-[#2dd4bf] font-mono">{currentSymbol}{total.toFixed(2)}</b></div><div className="flex justify-between text-[10px] text-white/30"><span>Target Retail (x2.5)</span><span className="font-mono">{currentSymbol}{(total * 2.5).toFixed(2)}</span></div></div>
        <button type="button" onClick={function() { if(typeof window!== 'undefined') window.print() }} className="w-full bg-[#2dd4bf] text-black font-bold py-2.5 rounded-xl text-[12px] hover:bg-[#00f5d4] transition">📄 Export Tech Pack (PDF)</button>
      </div>
    </div>
  )
    }
