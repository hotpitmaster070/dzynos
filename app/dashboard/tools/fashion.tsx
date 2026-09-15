"use client"
import { useState, useEffect } from "react"

const FABRIC_COLORS = [
  { name: "Красный", hex: "#ef4444", filter: "hue-rotate(0deg) saturate(1.5)" },
  { name: "Синий", hex: "#3b82f6", filter: "hue-rotate(200deg) saturate(1.3)" },
  { name: "Черный", hex: "#111111", filter: "brightness(0.3)" },
  { name: "Бежевый", hex: "#e8dcc6", filter: "sepia(0.5) brightness(1.1)" },
  { name: "Вельвет", hex: "#2a4d3a", filter: "hue-rotate(80deg) saturate(0.8)" },
]

export default function FashionTool({ project, onUpdate }: any) {
  const p = project?.props || {}

  // БАЗОВЫЕ ДАННЫЕ - без хардкода, берем из проекта
  const [color, setColor] = useState(p["Цвет"] || "Бежевый")
  const [colorFilter, setColorFilter] = useState("")

  // ПОЛЗУНКИ - ТВОЯ ИДЕЯ КЛОУНА / ДВОЙНИКА
  const [shoulders, setShoulders] = useState(Number(p["Плечи см"]||48))
  const [backOpen, setBackOpen] = useState(Number(p["Спина %"]||0))
  const [flare, setFlare] = useState(p["Клеш"] || "Straight") // Straight | Flare | Mermaid

  // КАЛЬКУЛЯТОР
  const [meters, setMeters] = useState(Number(p["Расход м"]||2.3))
  const [priceM, setPriceM] = useState(Number(p["Цена за м"]||18))
  const [work, setWork] = useState(Number(p["Пошив AZN"]||25))
  const [furn, setFurn] = useState(Number(p["Фурнитура AZN"]||5))

  const totalFabric = meters * priceM
  const total = totalFabric + work + furn

  // АВТОСОХРАНЕНИЕ В БАЗУ ЗНАНИЙ - для твоего бота 1000 человек
  useEffect(()=>{
    if(onUpdate){
      onUpdate({
        "Цвет": color,
        "Плечи см": String(shoulders),
        "Спина %": String(backOpen),
        "Клеш": flare,
        "Расход м": String(meters),
        "Цена за м": String(priceM),
        "Пошив AZN": String(work),
        "Фурнитура AZN": String(furn),
        "Себестоимость AZN": String(total.toFixed(2)),
        // Для бота
        "Опыт": `Клиент выбрал цвет ${color}, плечи ${shoulders}см, клеш ${flare}. Расход ${meters}м`
      })
    }
  },[color, shoulders, backOpen, flare, meters, priceM, work, furn])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

      {/* ЛЕВАЯ ПАНЕЛЬ - ВИЗУАЛ */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-[#11141d] border border-[#2dd4bf]/20 rounded-2xl p-5">
          <h3 className="font-bold text-[#2dd4bf] mb-3">👗 {project?.title} — Студия</h3>

          {/* ИМИТАЦИЯ ПЕРЕКРАСА - работает на любой картинке */}
          <div className="relative bg-black/50 rounded-xl h-[340px] flex items-center justify-center overflow-hidden">
            <img
              src={project?.image_url || "/placeholder.jpg"}
              alt="godekce"
              className="h-full object-contain transition-all duration-300"
              style={{ filter: colorFilter }}
            />
            {/* Визуализация клеша */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] bg-black/70 px-3 py-1 rounded-full text-white/60">
              Плечи: {shoulders}см • Спина: {backOpen}% • Клеш: {flare}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] text-white/60 mt-3">
            <div>Ткань: <b className="text-white">{p["Ткань"]||"Любая"}</b></div>
            <div>Размер: <b className="text-white">{p["Размер"]||"Универсальный"}</b></div>
          </div>
        </div>

        {/* КАЛЬКУЛЯТОР - ОСТАВИЛ ТВОЙ */}
        <div className="bg-[#151821] border border-white/10 rounded-2xl p-5">
          <h3 className="font-bold mb-4 text-[13px]">📦 Смета (автосохранение в базу)</h3>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-[10px] text-white/40">Расход м</label><input type="number" step="0.1" value={meters} onChange={e=>setMeters(Number(e.target.value))} className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[13px]" /></div>
            <div><label className="text-[10px] text-white/40">Цена за м</label><input type="number" value={priceM} onChange={e=>setPriceM(Number(e.target.value))} className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[13px]" /></div>
          </div>
          <div className="mt-4 flex justify-between text-[14px]"><span>Себестоимость</span><b className="text-[#2dd4bf]">{total.toFixed(2)} AZN</b></div>
        </div>
      </div>

      {/* ПРАВАЯ ПАНЕЛЬ - CONTROL PANEL КАК НА КАРТИНКЕ */}
      <div className="space-y-4">
        <div className="bg-[#11141d] border border-[#2dd4bf]/30 rounded-2xl p-5">
          <h4 className="font-bold text-[#2dd4bf] text-[12px] mb-3">🎨 ЦВЕТ И ТКАНЬ</h4>
          <div className="flex gap-2 flex-wrap">
            {FABRIC_COLORS.map(c=>(
              <button key={c.name} onClick={()=>{setColor(c.name); setColorFilter(c.filter)}}
                className={`w-10 h-10 rounded-full border-2 ${color===c.name? 'border-[#2dd4bf] scale-110' : 'border-white/10'}`}
                style={{backgroundColor: c.hex}} title={c.name} />
            ))}
          </div>
          <div className="text-[11px] mt-2 text-white/50">Выбран: <b className="text-white">{color}</b> — работает для любой модели</div>
        </div>

        <div className="bg-[#151821] border border-white/10 rounded-2xl p-5">
          <h4 className="font-bold text-white/80 text-[12px] mb-4">📐 КРОЙ (без хардкода)</h4>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-[11px]"><span className="text-white/50">Плечи</span><span className="text-[#2dd4bf]">{shoulders} см</span></div>
              <input type="range" min="36" max="60" value={shoulders} onChange={e=>setShoulders(Number(e.target.value))} className="w-full accent-[#2dd4bf] mt-1" />
            </div>
            <div>
              <div className="flex justify-between text-[11px]"><span className="text-white/50">Спина открытая</span><span className="text-[#2dd4bf]">{backOpen}%</span></div>
              <input type="range" min="0" max="100" value={backOpen} onChange={e=>setBackOpen(Number(e.target.value))} className="w-full accent-[#2dd4bf] mt-1" />
            </div>
            <div>
              <div className="text-[11px] text-white/50 mb-2">Подол — Клеш</div>
              <div className="grid grid-cols-3 gap-1">
                {["Straight","Flare","Mermaid"].map(f=>(
                  <button key={f} onClick={()=>setFlare(f)} className={`py-1.5 rounded-lg text-[10px] font-bold border ${flare===f? 'bg-[#2dd4bf] text-black border-[#2dd4bf]' : 'bg-white/5 border-white/10 text-white/60'}`}>{f}</button>
                ))}
              </div>
            </div>
          </div>

          <button className="mt-6 w-full bg-[#2dd4bf] text-black font-bold py-2.5 rounded-xl text-[12px]">👤 Надеть на клиента (Двойник)</button>
          <p className="text-[9px] text-white/20 text-center mt-2">Этот опыт уйдет в твою базу знаний</p>
        </div>
      </div>
    </div>
  )
}
