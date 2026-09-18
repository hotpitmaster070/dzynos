"use client"
import { useState, useEffect } from "react"
import { getFabricsFromDB, type FabricProperty } from "@/lib/fabricPresets"
import { calculatePatterns } from "@/lib/patternCalculator"

// --- ВСТРОЕННЫЙ AR VIEWER чтобы не ломать сборку ---
function ARViewer({ hex, img }: { hex: string, img: string }) {
  return (
    <div className="relative h-[360px] bg-black rounded-xl overflow-hidden border border-white/5 flex items-center justify-center">
      {img? (
        <img src={img} alt="preview" className="h-full object-contain" style={{ filter: `drop-shadow(0 0 30px ${hex}60)` }} />
      ) : (
        <div className="text-white/20 text-[11px] text-center leading-4">
          Drop image URL or use AI<br/>
          <span className="text-[9px] opacity-50">3D манекен появится здесь</span>
        </div>
      )}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        <div className="bg-[#2dd4bf] text-black px-4 py-1.5 rounded-full font-bold text-[10px]">👓 AR 1:1</div>
        <div className="bg-white/10 text-white/70 px-3 py-1.5 rounded-full text-[9px] font-mono">Orbit • Zoom</div>
      </div>
      <div className="absolute top-2 right-2 w-2 h-2 bg-[#2dd4bf] rounded-full animate-pulse shadow-[0_0_10px_#2dd4bf]" />
    </div>
  )
}

const PANTONE = [
  { name: "Bright White (Pantone 11-0601)", hex: "#f4f5f6" },
  { name: "Classic Blue (Pantone 19-4052)", hex: "#0f4c81" },
  { name: "Marsala (Pantone 18-1438)", hex: "#955251" },
  { name: "Radiant Orchid (Pantone 18-3224)", hex: "#b565a7" },
  { name: "Emerald (Pantone 17-5641)", hex: "#009473" },
  { name: "Tangerine Tango (Pantone 17-1463)", hex: "#dd4124" },
  { name: "Honeysuckle (Pantone 18-2120)", hex: "#d94f70" },
  { name: "Turquoise (Pantone 15-5519)", hex: "#45b5aa" },
  { name: "Mimosa (Pantone 14-0848)", hex: "#f0c05a" },
  { name: "True Black (Pantone 19-4007)", hex: "#111111" },
  { name: "Neon Mint (Custom)", hex: "#2dd4bf" },
  { name: "Cyber Pink (Custom)", hex: "#ff007f" },
]

export default function FashionTool(props: any) {
  const project = props.project; const onUpdate = props.onUpdate; const p = project?.props || {}
  const [fabrics, setFabrics] = useState<FabricProperty[]>([])
  const [selectedFabric, setSelectedFabric] = useState<FabricProperty | null>(null)
  const [color, setColor] = useState(p["Цвет"] || PANTONE[0].name)
  const [searchColor, setSearchColor] = useState("")
  const [img, setImg] = useState(project?.image_url || "")
  const [shoulders, setShoulders] = useState(Number(p["Плечи см"] || 48))
  const [backOpen, setBackOpen] = useState(Number(p["Спина %"] || 22))
  const [flare, setFlare] = useState(p["Клеш"] || "Straight")
  const [meters, setMeters] = useState(Number(p["Расход м"] || 2.3))
  const [priceM, setPriceM] = useState(Number(p["Цена за м"] || 18))
  const [work, setWork] = useState(Number(p["Пошив"] || 25))
  const [furn, setFurn] = useState(Number(p["Фурнитура"] || 5))
  const [prompt, setPrompt] = useState(""); const [aiLoading, setAiLoading] = useState(false)
  const [currency] = useState("USD")

  const currentHex = PANTONE.find(c => c.name === color)?.hex || "#f4f5f6"
  const filteredColors = PANTONE.filter(c => c.name.toLowerCase().includes(searchColor.toLowerCase()))
  const pattern = calculatePatterns({ length: 90, chestWidth: shoulders, sleeveLength: 62, shoulders, backOpen }, selectedFabric?.stiffness || 0.6)
  const totalFabric = meters * priceM; const total = totalFabric + work + furn

  useEffect(() => { getFabricsFromDB().then(f => { setFabrics(f); if (f[0] &&!selectedFabric) setSelectedFabric(f[0] as any) }) }, [])
  useEffect(() => { onUpdate?.({ "Цвет": color, "Ткань": selectedFabric?.name || "", "GSM": String(selectedFabric?.gsm || ""), "Плечи см": String(shoulders), "Спина %": String(backOpen), "Клеш": flare, "Расход м": String(meters), "Цена за м": String(priceM), "Пошив": String(work), "Фурнитура": String(furn), "Себестоимость": String(total.toFixed(2)), "Расход расчет": String(pattern.totalFabricRequired) }) }, [color, selectedFabric, shoulders, backOpen, flare, meters, priceM, work, furn, total])

  const genTexture = async () => {
    if (!prompt) return; setAiLoading(true)
    try {
      const res = await fetch("/api/generate-texture", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt: `${prompt} ${selectedFabric?.category || ''} fabric`, fabric: color }) })
      const data = await res.json(); if (data.image) { setImg(data.image); onUpdate?.({ image_url: data.image } as any) }
    } catch {
      const safe = encodeURIComponent(`seamless ${prompt} ${selectedFabric?.name || ''} textile ${color}`); setImg(`https://image.pollinations.ai/prompt/${safe}?width=1024&height=1024&nologo=true&seed=${Date.now()}`)
    } finally { setAiLoading(false) }
  }

  const exportTechPack = async () => {
    const payload = { length: 90, chestWidth: shoulders, sleeveLength: 62, shoulders, backOpen, fabric: selectedFabric, color, cost: total, vectors: pattern.vectors }
    const res = await fetch("/api/techpack", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
    const data = await res.json()
    // Печать Tech Pack как PDF
    const w = window.open("", "_blank"); if (!w) return
    w.document.write(`<html><head><title>Tech Pack ${project?.title}</title></head><body style="font-family:monospace;padding:20px"><h2>${project?.title} - Tech Pack</h2><p>Fabric: ${selectedFabric?.name} ${selectedFabric?.gsm}gsm ${selectedFabric?.world_standard}</p><p>Color: ${color} ${currentHex}</p><p>Cost: $${total.toFixed(2)} Fabric need: ${pattern.totalFabricRequired}m (calc)</p><h3>Pattern Vectors</h3><svg viewBox="0 0 200 200" width="400" height="400" style="border:1px solid #000"><path d="${pattern.vectors.frontPiece}" stroke="black" fill="none" stroke-width="1"/><text x="5" y="15" font-size="8">FRONT</text></svg><svg viewBox="0 0 200 200" width="400" height="400" style="border:1px solid #000;margin-left:20px"><path d="${pattern.vectors.backPiece}" stroke="red" fill="none" stroke-width="1"/><text x="5" y="15" font-size="8">BACK ${backOpen}% open</text></svg><p>Seam: ${pattern.seamAllowance}cm GOST</p><img src="${img}" style="max-width:300px;border:1px solid #ccc;margin-top:20px"/></body></html>`); w.document.close(); w.print()
  }

  return (
    <div className="space-y-4 pb-10">
      {/* 1. 3D + AR */}
      <div className="bg-[#11141d] border border-[#2dd4bf]/20 rounded-2xl p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-[#2dd4bf] text-[12px]">👗 {project?.title || 'Футболка'} — 3D / AR</h3>
          <span className="text-[9px] text-white/30 font-mono">{selectedFabric?.stiffness} stiffness • {selectedFabric?.density} density</span>
        </div>
        <ARViewer hex={currentHex} img={img} />
        <div className="mt-3 bg-black/40 border border-white/5 p-2.5 rounded-xl flex gap-2">
          <input value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Describe texture (e.g. Silk velvet gold pattern)..." className="flex-1 bg-black border border-white/10 rounded-lg px-3 py-2 text-[11px] outline-none text-white" />
          <button onClick={genTexture} disabled={aiLoading} className="px-4 bg-[#2dd4bf] text-black rounded-lg text-[11px] font-bold">{aiLoading? "..." : "Gen"}</button>
        </div>
      </div>

      {/* 2. FABRIC DB */}
      <div className="bg-[#11141d] border border-white/10 rounded-2xl p-4 space-y-2">
        <h4 className="font-bold text-[#2dd4bf] text-[11px] uppercase">🧵 Fabric Database — GSM / ISO / Physics</h4>
        <div className="grid grid-cols-1 gap-2 max-h-[200px] overflow-y-auto pr-1">
          {fabrics.map(f => (
            <button key={f.id} onClick={() => setSelectedFabric(f)} className={`text-left p-3 rounded-xl border transition text-[11px] ${selectedFabric?.id === f.id? 'bg-[#2dd4bf]/10 border-[#2dd4bf] text-white' : 'bg-black/30 border-white/5 text-white/60 hover:border-white/20'}`}>
              <div className="flex justify-between items-center"><b className="text-[12px]">{f.name}</b><span className="font-mono text-[#2dd4bf] text-[11px]">{f.gsm}gsm</span></div>
              <div className="text-[9px] opacity-70 mt-1 flex gap-2"><span>{f.composition}</span><span>•</span><span>{f.world_standard}</span></div>
              <div className="mt-1.5 flex gap-2 text-[8px] font-mono"><span className="bg-white/5 px-1.5 py-0.5 rounded">stiff {f.stiffness}</span><span className="bg-white/5 px-1.5 py-0.5 rounded">rough {f.roughness}</span><span className="bg-white/5 px-1.5 py-0.5 rounded">metal {f.metalness}</span></div>
            </button>
          ))}
        </div>
      </div>

      {/* 3. COLOR */}
      <div className="bg-[#11141d] border border-white/10 rounded-2xl p-4 space-y-3">
        <h4 className="font-bold text-[#2dd4bf] text-[11px] uppercase">🎨 Глобальная палитра — Pantone / RAL</h4>
        <input value={searchColor} onChange={e => setSearchColor(e.target.value)} placeholder="🔍 Поиск цвета (Blue, Mint, Black...)" className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-[11px] outline-none text-white" />
        <div className="flex gap-2.5 flex-wrap p-2 bg-black/30 rounded-xl border border-white/5">
          {filteredColors.map(c => <button key={c.name} onClick={() => setColor(c.name)} className={`w-9 h-9 rounded-full border-2 transition ${color === c.name? 'border-[#2dd4bf] scale-110 shadow-[0_0_10px_#2dd4bf]' : 'border-white/10'}`} style={{ backgroundColor: c.hex }} title={c.name} />)}
        </div>
        <div className="text-[11px] bg-black/50 p-2.5 rounded-xl border border-white/5">Выбран: <b className="text-[#2dd4bf]">{color}</b> <span className="inline-block w-3 h-3 rounded-full ml-2 align-middle" style={{ background: currentHex }} /></div>
      </div>

      {/* 4. PATTERN ENGINEERING + ВЕКТОРА */}
      <div className="bg-[#151821] border border-white/10 rounded-2xl p-4 space-y-4">
        <h4 className="font-bold text-[11px] uppercase">📐 Pattern Engineering — Live Vectors</h4>
        <div><div className="flex justify-between text-[11px] mb-1"><span>Shoulders Width</span><span className="text-[#2dd4bf] font-mono">{shoulders}cm</span></div><input type="range" min={36} max={60} value={shoulders} onChange={e => setShoulders(Number(e.target.value))} className="w-full accent-[#2dd4bf]" /></div>
        <div><div className="flex justify-between text-[11px] mb-1"><span>Back Opening</span><span className="text-[#2dd4bf] font-mono">{backOpen}%</span></div><input type="range" min={0} max={100} value={backOpen} onChange={e => setBackOpen(Number(e.target.value))} className="w-full accent-[#2dd4bf]" /></div>
        <div className="grid grid-cols-3 gap-2">{["Straight", "Flare", "Mermaid"].map(f => <button key={f} onClick={() => setFlare(f)} className={`py-2 rounded-xl text-[11px] font-bold border ${flare === f? 'bg-[#2dd4bf] text-black border-[#2dd4bf]' : 'bg-white/5 text-white/50 border-white/5'}`}>{f}</button>)}</div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-black rounded-xl p-2 border border-white/5"><div className="text-[9px] text-white/40 mb-1">FRONT PIECE — {pattern.seamAllowance}cm seam</div><svg viewBox="0 0 100 120" className="w-full h-[120px]"><path d={pattern.vectors.frontPiece} stroke="#2dd4bf" strokeWidth="0.8" fill="none" /></svg></div>
          <div className="bg-black rounded-xl p-2 border border-white/5"><div className="text-[9px] text-white/40 mb-1">BACK PIECE — {backOpen}% open</div><svg viewBox="0 0 100 120" className="w-full h-[120px]"><path d={pattern.vectors.backPiece} stroke="white" strokeWidth="0.8" fill="none" /></svg></div>
        </div>
        <div className="text-[10px] font-mono text-white/30">Расход авто-расчет: {pattern.totalFabricRequired}m при ширине рулона 150см (с учетом усадки {((1 - (selectedFabric?.stiffness || 0.6)) * 3).toFixed(1)}%)</div>
      </div>

      {/* 5. COST */}
      <div className="bg-[#151821] border border-white/10 rounded-2xl p-4 space-y-3">
        <h4 className="font-bold text-[11px] uppercase">💸 Cost Calculation — {currency}</h4>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div><label className="text-white/40 text-[10px]">Fabric, m</label><input type="number" step="0.1" value={meters} onChange={e => setMeters(Number(e.target.value))} className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-2 py-2 text-white" /></div>
          <div><label className="text-white/40 text-[10px]">Price per meter</label><input type="number" value={priceM} onChange={e => setPriceM(Number(e.target.value))} className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-2 py-2 text-white" /></div>
          <div><label className="text-white/40 text-[10px]">Labor Cost</label><input type="number" value={work} onChange={e => setWork(Number(e.target.value))} className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-2 py-2 text-white" /></div>
          <div><label className="text-white/40 text-[10px]">Trims</label><input type="number" value={furn} onChange={e => setFurn(Number(e.target.value))} className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-2 py-2 text-white" /></div>
        </div>
        <div className="bg-black/40 rounded-xl p-3 space-y-1 text-[12px] border border-white/5">
          <div className="flex justify-between text-white/50"><span>Fabric Cost</span><span>${totalFabric.toFixed(2)}</span></div>
          <div className="flex justify-between text-white/50"><span>Labor + Trims</span><span>${(work + furn).toFixed(2)}</span></div>
          <div className="flex justify-between border-t border-white/10 pt-2 font-bold"><span>Total Cost</span><b className="text-[#2dd4bf] font-mono">${total.toFixed(2)}</b></div>
          <div className="flex justify-between text-[10px] text-white/30"><span>Target Retail (x2.5)</span><span className="font-mono">${(total * 2.5).toFixed(2)}</span></div>
        </div>
        <button onClick={exportTechPack} className="w-full bg-[#2dd4bf] text-black font-bold py-3 rounded-xl text-[13px]">📄 Export Tech Pack (PDF) — Фабричный файл</button>
      </div>
    </div>
  )
         }
