"use client"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

function DashboardInner() {
  const search = useSearchParams()
  const cat = search.get('cat') || 'fashion'
  const [projects, setProjects] = useState<any[]>([])
  const [selected, setSelected] = useState<any>(null)

  const load = async () => {
    const { data } = await supabase.from('projects').select('*').eq('cat', cat).order('created_at', {ascending:false})
    if(data) setProjects(data)
  }
  useEffect(()=>{load()},[cat])

  const addProject = async () => {
    const title = prompt("Adı / Название:")
    if(!title) return
    const { data } = await supabase.from('projects').insert({ cat, title, status: 'To Review', props: {} }).select().single()
    if(data) setProjects([data,...projects])
  }

  const addField = async () => {
    if(!selected) return
    const key = prompt("Название поля (напр: Фабрика, Бюджет):")
    if(!key) return
    const value = prompt(`Значение для "${key}":`)
    if(value===null) return
    const newProps = {...(selected.props||{}), [key]: value }
    await supabase.from('projects').update({ props: newProps }).eq('id', selected.id)
    setSelected({...selected, props: newProps})
    load()
  }

  return (
    <div className="min-h-screen bg-[#080a12] text-white flex">
      <div className="w-[260px] bg-[#0e1018] border-r border-white/10 p-5 hidden md:flex flex-col">
        <div className="flex items-center gap-2 mb-8"><div className="w-8 h-8 rounded-lg bg-[#2dd4bf] flex items-center justify-center text-black font-bold">◈</div><span className="font-bold">DzynOS</span></div>
        <div className="space-y-1 text-[13px]">
          <a href="/dashboard?cat=fashion" className={`block px-3 py-2 rounded-xl ${cat=='fashion'?'bg-[#2dd4bf]/10 text-[#2dd4bf]':'text-white/60'}`}>👗 Moda / Fashion</a>
          <a href="/dashboard?cat=interior" className={`block px-3 py-2 rounded-xl ${cat=='interior'?'bg-[#2dd4bf]/10 text-[#2dd4bf]':'text-white/60'}`}>🏠 Interyer</a>
          <a href="/dashboard?cat=landscape" className={`block px-3 py-2 rounded-xl ${cat=='landscape'?'bg-[#2dd4bf]/10 text-[#2dd4bf]':'text-white/60'}`}>🌿 Landşaft</a>
          <a href="/dashboard?cat=architecture" className={`block px-3 py-2 rounded-xl ${cat=='architecture'?'bg-[#2dd4bf]/10 text-[#2dd4bf]':'text-white/60'}`}>🏗️ Memarlıq</a>
          <a href="/dashboard?cat=jewelry" className={`block px-3 py-2 rounded-xl ${cat=='jewelry'?'bg-[#2dd4bf]/10 text-[#2dd4bf]':'text-white/60'}`}>💍 Zərgərlik</a>
          <a href="/dashboard?cat=product" className={`block px-3 py-2 rounded-xl ${cat=='product'?'bg-[#2dd4bf]/10 text-[#2dd4bf]':'text-white/60'}`}>📦 Məhsul</a>
          <a href="/dashboard?cat=graphic" className={`block px-3 py-2 rounded-xl ${cat=='graphic'?'bg-[#2dd4bf]/10 text-[#2dd4bf]':'text-white/60'}`}>🎨 Qrafika</a>
          <a href="/dashboard?cat=web" className={`block px-3 py-2 rounded-xl ${cat=='web'?'bg-[#2dd4bf]/10 text-[#2dd4bf]':'text-white/60'}`}>💻 Web & App</a>
          <a href="/dashboard?cat=3d" className={`block px-3 py-2 rounded-xl ${cat=='3d'?'bg-[#2dd4bf]/10 text-[#2dd4bf]':'text-white/60'}`}>🎬 3D & Vizual</a>
          <a href="/dashboard?cat=custom" className={`block px-3 py-2 rounded-xl ${cat=='custom'?'bg-white/10 text-white':'text-white/60'}`}>➕ Custom</a>
        </div>
        <button onClick={addProject} className="mt-auto w-full py-2.5 rounded-xl bg-white text-black font-bold text-[13px]">+ New Project</button>
        <a href="/" className="mt-3 text-center text-[11px] text-white/30">← На лендинг</a>
      </div>
      <div className="flex-1 p-6">
        <h1 className="text-[18px] font-bold mb-4">{cat.toUpperCase()} — {projects.length} layihə</h1>
        <div className="grid md:grid-cols-2 gap-3">
          {projects.map(p=>(
            <div key={p.id} onClick={()=>setSelected(p)} className={`p-4 rounded-2xl border cursor-pointer ${selected?.id===p.id?'bg-[#2dd4bf]/10 border-[#2dd4bf]/50':'bg-[#151821] border-white/10'}`}>
              <div className="text-[10px] bg-[#2dd4bf]/20 text-[#2dd4bf] inline-flex px-2 py-0.5 rounded-full font-bold">{p.status}</div>
              <div className="font-bold text-[14px] mt-2">{p.title}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[320px] bg-[#0e1018] border-l border-white/10 p-5 hidden lg:block">
        {!selected? <div className="text-white/30 text-[13px] mt-20 text-center">Выбери проект</div> : (
          <>
            <h3 className="font-bold">{selected.title}</h3>
            <div className="mt-6 space-y-3">
              {Object.entries(selected.props||{}).map(([k,v]:any)=>(
                <div key={k} className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2">
                  <div className="text-[10px] text-white/40 uppercase">{k}</div>
                  <div className="text-[13px]">{String(v)}</div>
                </div>
              ))}
            </div>
            <button onClick={addField} className="mt-6 w-full py-2.5 rounded-xl bg-[#2dd4bf] text-black font-bold text-[13px]">+ Добавить поле</button>
          </>
        )}
      </div>
    </div>
  )
}
export default function Dashboard(){ return <Suspense fallback={<div className="min-h-screen bg-[#080a12] text-white p-10">Loading...</div>}><DashboardInner/></Suspense> }
