"use client"
import { useState } from "react"

export default function FashionTool({ project, onUpdate }: any) {
  const p = project?.props || {}
  const [meters, setMeters] = useState(Number(p["Расход м"]||2.3))
  const [priceM, setPriceM] = useState(Number(p["Цена за м"]||18))
  const [work, setWork] = useState(Number(p["Пошив AZN"]||25))
  const [furn, setFurn] = useState(Number(p["Фурнитура AZN"]||5))

  const totalFabric = meters * priceM
  const total = totalFabric + work + furn

  const handleSave = ()=>{
    if(onUpdate) onUpdate({
      "Расход м": String(meters),
      "Цена за м": String(priceM),
      "Пошив AZN": String(work),
      "Фурнитура AZN": String(furn),
      "Себестоимость AZN": String(total.toFixed(2))
    })
    alert("Сохранено! ✅")
  }

  return (
    <div className="space-y-4">
      <div className="bg-[#11141d] border border-white/10 rounded-2xl p-5">
        <h3 className="font-bold text-[#2dd4bf] mb-3">👗 {project?.title}</h3>
        <div className="grid grid-cols-2 gap-2 text-[12px] text-white/70">
          <div>Ткань: <b className="text-white">{p["Ткань"]||"—"}</b></div>
          <div>Цвет: <b className="text-white">{p["Цвет"]||"—"}</b></div>
        </div>
      </div>

      <div className="bg-[#151821] border border-[#2dd4bf]/20 rounded-2xl p-5">
        <h3 className="font-bold mb-4">📦 Калькулятор себестоимости</h3>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-[10px] text-white/40">Расход м</label><input type="number" step="0.1" value={meters} onChange={e=>setMeters(Number(e.target.value))} className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[13px]" /></div>
          <div><label className="text-[10px] text-white/40">Цена за м</label><input type="number" value={priceM} onChange={e=>setPriceM(Number(e.target.value))} className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[13px]" /></div>
          <div><label className="text-[10px] text-white/40">Пошив AZN</label><input type="number" value={work} onChange={e=>setWork(Number(e.target.value))} className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[13px]" /></div>
          <div><label className="text-[10px] text-white/40">Фурнитура AZN</label><input type="number" value={furn} onChange={e=>setFurn(Number(e.target.value))} className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[13px]" /></div>
        </div>

        <div className="mt-5 bg-black/40 rounded-xl p-4 space-y-2 text-[13px]">
          <div className="flex justify-between"><span className="text-white/50">Ткань {meters}м × {priceM}</span><b>{totalFabric.toFixed(2)} AZN</b></div>
          <div className="flex justify-between"><span className="text-white/50">Пошив + фурн.</span><b>{(work+furn).toFixed(2)} AZN</b></div>
          <div className="flex justify-between border-t border-white/10 pt-2 text-[15px]"><span className="font-bold">Себестоимость</span><b className="text-[#2dd4bf] text-[18px]">{total.toFixed(2)} AZN</b></div>
          <div className="flex justify-between text-[11px] text-white/40"><span>Продажа x2.5</span><span>{(total*2.5).toFixed(2)} AZN</span></div>
        </div>

        <button onClick={handleSave} className="mt-4 w-full bg-[#2dd4bf] text-black font-bold py-2.5 rounded-xl text-[13px]">💾 Сохранить расчет</button>
      </div>
    </div>
  )
}
