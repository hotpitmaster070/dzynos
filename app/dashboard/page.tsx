"use client"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

function DashboardInner() {
  const search = useSearchParams()
  const cat = search.get('cat') || 'brand'
  const [projects, setProjects] = useState<any[]>([])

  useEffect(() => {
    supabase.from('projects').select('*').eq('cat', cat).then(({ data }) => {
      if (data) setProjects(data)
    })
  }, [cat])

  const titles: any = {
    brand: "Brand Identity — Acme Co.",
    fashion: "Yay Kolleksiyası '26",
    interior: "Loft Mənzil Bakı — 85m²",
    landscape: "Villa Bağı + Hovuz"
  }

  const addProject = async () => {
    const title = prompt("Adı yaz / Название проекта:")
    if (!title) return
    const { data } = await supabase.from('projects').insert({ cat, title, status: 'To Review' }).select().single()
    if (data) setProjects([data,...projects])
  }

  return (
    <div className="min-h-screen bg-[#080a12] text-white flex">
      <div className="w-[260px] bg-[#0e1018] border-r border-white/10 p-5 hidden md:flex flex-col">
        <div className="flex items-center gap-3 mb-8"><div className="w-8 h-8 rounded-lg bg-[#2dd4bf] flex items-center justify-center text-black font-bold">◇</div><span className="font-bold">DzynOS</span></div>
        <div className="space-y-1 text-sm">
          <a href="/dashboard?cat=fashion" className={`block px-3 py-2 rounded-xl ${cat=='fashion'?'bg-[#2dd4bf]/10 text-[#2dd4bf]':'text-white/60'}`}>👗 Moda</a>
          <a href="/dashboard?cat=interior" className={`block px-3 py-2 rounded-xl ${cat=='interior'?'bg-[#2dd4bf]/10 text-[#2dd4bf]':'text-white/60'}`}>🏠 Interyer</a>
          <a href="/dashboard?cat=landscape" className={`block px-3 py-2 rounded-xl ${cat=='landscape'?'bg-[#2dd4bf]/10 text-[#2dd4bf]':'text-white/60'}`}>🌿 Landşaft</a>
          <a href="/dashboard?cat=brand" className={`block px-3 py-2 rounded-xl ${cat=='brand'?'bg-white/10 text-white':'text-white/60'}`}>🎨 Brand</a>
        </div>
        <button onClick={addProject} className="mt-auto w-full py-2.5 rounded-xl bg-white text-black font-bold text-sm">+ New Project</button>
        <a href="/" className="mt-3 text-center text-xs text-white/30 block">← На лендинг</a>
      </div>

      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">{titles[cat]} — {projects.length} layihə</h1>
          <button onClick={addProject} className="px-4 py-2 rounded-xl bg-[#2dd4bf] text-black font-bold text-sm">+ Əlavə et</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map(p => (
            <div key={p.id} className="bg-[#151821] rounded-2xl p-4 border border-white/10">
              <div className="inline-flex bg-[#2dd4bf]/20 text-[#2dd4bf] text-[10px] font-bold px-2 py-0.5 rounded-full mb-2">{p.status}</div>
              <div className="font-bold text-sm">{p.title}</div>
              <div className="text-xs text-white/40 mt-1">{p.cat} • {new Date(p.created_at).toLocaleDateString()}</div>
            </div>
          ))}
          <button onClick={addProject} className="bg-[#151821] rounded-2xl p-4 border border-dashed border-white/20 flex items-center justify-center text-white/30 h-[110px]">+ Add new</button>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  return <Suspense fallback={<div className="min-h-screen bg-[#080a12] text-white p-10">Loading...</div>}><DashboardInner /></Suspense>
}
