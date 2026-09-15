"use client"
import { useState, useEffect } from "react"

const FALLBACK = [
  { name: "Бежевый", hex: "#e8dcc6" },
  { name: "Черный", hex: "#111111" },
  { name: "Красный", hex: "#ef4444" },
]

export default function FashionTool({ project, onUpdate }: any) {
  const p = project?.props || {}

  // 1. ЦВЕТА ИЗ БАЗЫ - нет хардкода
  // В Supabase добавь поле "Палитра" = [{"name":"Вельвет","hex":"#2a4d3a"}, {"name":"Синий","hex":"#3b82f6"}]
  // Можешь добавить 100 цветов - код не вырастет
  let dbPalette: any[] = FALLBACK
  try {
    if (p["Палитра"]) {
      dbPalette = typeof p["Палитра"] === 'string'? JSON.parse(p["Палитра"]) : p["Палитра"]
    }
  } catch { dbPalette = FALLBACK }

  const colors = dbPalette.map((c: any) => {
    if (typeof c === 'string') return { name: c, hex: c }
    return c
  })

  const [color, setColor] = useState(p["Цвет"] || colors[0]?.name || "Бежевый")
  const [img, setImg] = useState(project?.image_url || "")
  const [shoulders, setShoulders] = useState(Number(p["Плечи см"]||48))
  const [backOpen, setBackOpen] = useState(Number(p["Спина %"]||0))
  const [flare, setFlare] = useState(p["Клеш"] || "Straight")

  const [meters, setMeters] = useState(Number(p["Расход м"]||2.3))
  const [priceM, setPriceM] = useState(Number(p["Цена за м"]||18))

  useEffect(()=>{ setImg(project?.image_url || "") }, [project?.id])

  // Автосохранение в базу знаний для бота
  useEffect(()=>{
    if(!onUpdate) return
    onUpdate({
      "Цвет": color,
      "Плечи см": String(shoulders),
      "Спина %": String(backOpen),
      "Клеш": flare,
      "Расход м": String(meters),
      "Себестоимость AZN": String((meters*priceM+30).toFixed(2)),
      "Опыт": `Цвет ${color}, плечи ${shoulders}, клеш ${flare}`
    })
  },[color, shoulders, backOpen, flare, meters, priceM])

  const saveImage = () => {
    if(onUpdate && img) onUpdate({ image_url: img } as any)
    alert("Фото сохранено! ✅")
  }

  const currentHex = colors.find((c:any)=>c.name===color)?.hex || "#e8dcc6"

  return (
    <div className="space-y-4">
      {/* ВИЗУАЛ */}
      <div className="bg-[#11141d] border border-[#2dd4bf]/20 rounded-2xl p-4">
        <h3 className="font-bold text-[#2dd4bf] text-[13px]">👗 {project?.title}</h3>
        <div className="mt-3 h-[340px] bg-black rounded-xl flex items-center justify-center relative overflow-hidden border border-white/5">
          {img? <img src={img} className="h-full object-contain" style={{ filter: `drop-shadow(0 0 0 ${currentHex})` }} />
          : <div className="text-white/20 text-[11px]">Вставь ссылку на фото ниже</div>}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/80 px-3 py-1 rounded-full text-[10px] text-white/60">
            {shoulders}см • {backOpen}% • {flare} • {color}
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <input value={img} onChange={e=>setImg(e.target.value)} placeholder="https:// ссылка на Godekce" className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-[11px] outline-none" />
          <button onClick={saveImage} className="px-4 bg-[#2dd4bf] text-black rounded-lg text-[11px] font-bold">Save</button>
        </div>
      </div>

      {/* ЦВЕТА ИЗ БАЗЫ */}
      <div className="bg-[#11141d] border border-white/10 rounded-2xl p-4">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-bold text-[#2dd4bf] text-[11px]">🎨 ПАЛИТРА ИЗ БАЗЫ ({colors.length})</h4>
          <span className="text-[9px] text-white/30">Добавь поле "Палитра" в проекте</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {colors.map((c:any)=>(
            <button key={c.name} onClick={()=>setColor(c.name)} className={`w-9 h-9 rounded-full border-2 ${color===c.name?'border-[#2dd4bf] scale-110':'border-white/10'}`} style={{backgroundColor: c.hex}} title={c.name} />
          ))}
        </div>
        <div className="text-[11px] mt-2 text-white/40">Выбран: <b className="text-white">{color}</b> — {p["Ткань"]||"Любая ткань"} </div>
      </div>

      {/* КРОЙ */}
      <div className="bg-[#151821] border border-white/10 rounded-2xl p-4">
        <h4 className="font-bold text-[11px] mb-3">📐 КРОЙ — без хардкода</h4>
        <div className="space-y-3">
          <div><div className="flex justify-between text-[11px]"><span>Плечи</span><span className="text-[#2dd4bf]">{shoulders}см</span></div><input type="range" min="36" max="60" value={shoulders} onChange={e=>setShoulders(Number(e.target.value))} className="w-full accent-[#2dd4bf]" /></div>
          <div><div className="flex justify-between text-[11px]"><span>Спина</span><span className="text-[#2dd4bf]">{backOpen}%</span></div><input type="range" min="0" max="100" value={backOpen} onChange={e=>setBackOpen(Number(e.target.value))} className="w-full accent-[#2dd4bf]" /></div>
          <div className="grid grid-cols-3 gap-1">{["Straight","Flare","Mermaid"].map(f=>(<button key={f} onClick={()=>setFlare(f)} className={`py-2 rounded-lg text-[10px] font-bold border ${flare===f?'bg-[#2dd4bf] text-black':'bg-white/5 text-white/60 border-white/10'}`}>{f}</button>))}</div>
        </div>
      </div>

      {/* СМЕТА */}
      <div className="bg-black/40 border border-white/5 rounded-xl p-3 flex justify-between text-[13px]">
        <span>Себестоимость</span><b className="text-[#2dd4bf]">{(meters*priceM+30).toFixed(2)} AZN</b>
      </div>
    </div>
  )
}
