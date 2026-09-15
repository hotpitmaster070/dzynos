"use client"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

import FashionTool from "./tools/fashion"
import InteriorTool from "./tools/interior"
import LandscapeTool from "./tools/landscape"
import ArchitectureTool from "./tools/architecture"
import JewelryTool from "./tools/jewelry"
import ProductTool from "./tools/product"
import GraphicTool from "./tools/graphic"
import WebTool from "./tools/web"
import Visual3dTool from "./tools/visual3d"
import CustomTool from "./tools/custom"

const CATS = [
  { id:'fashion', label:'👗 Moda / Fashion' },
  { id:'interior', label:'🏠 Interyer' },
  { id:'landscape', label:'🌿 Landşaft' },
  { id:'architecture', label:'🏗️ Memarlıq' },
  { id:'jewelry', label:'💍 Zərgərlik' },
  { id:'product', label:'📦 Məhsul' },
  { id:'graphic', label:'🎨 Qrafika' },
  { id:'web', label:'💻 Web & App' },
  { id:'3d', label:'🎬 3D & Vizual' },
  { id:'custom', label:'➕ Custom' },
]

function DashboardInner() {
  const search = useSearchParams()
  const cat = search.get('cat') || 'fashion'
  const [projects, setProjects] = useState<any[]>([])
  const [selected, setSelected] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('projects').select('*').eq('cat', cat).order('created_at', {ascending:false})
    if(data) setProjects(data)
    setLoading(false)
  }
  useEffect(()=>{ load(); setSelected(null); setMenuOpen(false) },[cat])

  const addProject = async () => {
    const title = prompt("Adı / Название:")
    if(!title) return
    const { data } = await supabase.from('projects').insert({ cat, title, status: 'To Review', props: {} }).select().single()
    if(data) { setProjects([data,...projects]); setSelected(data) }
  }

  const updateProps = async (newFields:any) => {
    if(!selected) return
    const newProps = {...(selected.props||{}),...newFields}
    await supabase.from('projects').update({ props: newProps }).eq('id', selected.id)
    setSelected({...selected, props: newProps})
    setProjects(prev=> prev.map(p=> p.id===selected.id? {...p, props:newProps} : p))
  }

  const addField = async () => {
    if(!selected) return
    const key = prompt("Название поля:")
    if(!key) return
    const value = prompt(`Значение для "${key}":`)
    if(value===null) return
    updateProps({ [key]: value })
  }

  const renderTool = () => {
    if(!selected) return <div className="text-white/20 text-center mt-20 text-[13px]">Выбери проект<br/>или создай новый</div>
    const props = { project: selected, onUpdate: updateProps }
    switch(cat){
      case 'fashion': return <FashionTool {...props} />
      case 'interior': return <InteriorTool {...props} />
      case 'landscape': return <LandscapeTool {...props} />
      case 'architecture': return <ArchitectureTool {...props} />
      case 'jewelry': return <JewelryTool {...props} />
      case 'product': return <ProductTool {...props} />
      case 'graphic': return <GraphicTool {...props} />
      case 'web': return <WebTool {...props} />
      case '3d': return <Visual3dTool {...props} />
      case 'custom': return <CustomTool {...props} />
      default: return <CustomTool {...props} />
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row relative">
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0a0a0a] border-b border-white/[0.06] sticky top-0 z-30 backdrop-blur-2xl">
        <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-[#2dd4bf] flex items-center justify-center text-black font-bold">◈</div><span className="font-bold text-[15px]">DzynOS</span></div>
        <button onClick={()=>setMenuOpen(!menuOpen)} className="w-9 h-9 rounded-full bg-white/[0.08] border border-white/10 flex items-center justify-center">
          <div className="space-y-1">{menuOpen? <span className="text-[16px]">✕</span> : <><div className="w-4 h-0.5 bg-white"></div><div className="w-4 h-0.5 bg-white"></div><div className="w-4 h-0.5 bg-white"></div></>}
          </div>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-xl pt-[64px]">
          <div className="bg-[#111111] border-b border-white/10 p-5 rounded-b-[24px]">
            <div className="space-y-2 text-[14px]">
              {CATS.map(c=>(
                <a key={c.id} href={`/dashboard?cat=${c.id}`} className={`block px-4 py-3.5 rounded-xl border transition-all ${cat==c.id?'bg-[#2dd4bf] text-black font-bold border-[#2dd4bf] shadow-[0_0_20px_rgba(45,212,191,0.3)]':'text-white/70 bg-[#141414] border-white/[0.06] hover:bg-[#1e1e1e] hover:border-white/10'}`}>{c.label}</a>
              ))}
            </div>
            <button onClick={addProject} className="mt-5 w-full py-3 rounded-xl bg-white text-black font-bold text-[14px]">+ New Project</button>
            <a href="/" className="mt-3 block text-center text-[12px] text-white/40">← На лендинг</a>
          </div>
        </div>
      )}

      <div className="w-[260px] bg-[#0a0a0a] border-r border-white/[0.06] p-5 hidden md:flex flex-col">
        <div className="flex items-center gap-2 mb-8"><div className="w-8 h-8 rounded-lg bg-[#2dd4bf] flex items-center justify-center text-black font-bold">◈</div><span className="font-bold tracking-tight">DzynOS</span><span className="text-[10px] bg-[#2dd4bf]/20 text-[#2dd4bf] px-1.5 py-0.5 rounded-full ml-1">TRUE BLACK</span></div>
        <div className="space-y-2 text-[13px]">
          {CATS.map(c=>(
            <a key={c.id} href={`/dashboard?cat=${c.id}`} className={`block px-3 py-3 rounded-xl border transition-all ${cat==c.id?'bg-[#2dd4bf] text-black font-bold border-[#2dd4bf] shadow-[0_0_20px_rgba(45,212,191,0.3)]':'text-white/50 bg-[#141414] border-white/[0.06] hover:text-white hover:bg-[#1e1e1e]'}`}>{c.label}</a>
          ))}
        </div>
        <button onClick={addProject} className="mt-auto w-full py-3 rounded-xl bg-white text-black font-bold text-[13px] hover:bg-[#2dd4bf] transition">+ New Project</button>
        <a href="/" className="mt-3 text-center text-[11px] text-white/30 hover:text-white">← На лендинг</a>
      </div>

      <div className="flex-1 p-4 md:p-6 overflow-auto bg-black">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-[18px] font-bold tracking-tight">{cat.toUpperCase()} — <span className="text-white/40 font-normal">{projects.length}</span></h1>
          <button onClick={addProject} className="md:hidden px-4 py-2 bg-[#2dd4bf] text-black rounded-full text-[12px] font-bold">+ New</button>
        </div>
        {loading? <div className="text-white/30 text-[13px]">Загрузка...</div> :
        <div className="grid md:grid-cols-2 gap-3">
          {projects.map(p=>(
            <div key={p.id} onClick={()=>setSelected(p)} className={`p-4 rounded-[16px] border cursor-pointer transition ${selected?.id===p.id?'bg-[#2dd4bf]/[0.08] border-[#2dd4bf]/40 shadow-[0_0_20px_rgba(45,212,191,0.15)]':'bg-[#111111] border-white/[0.06] hover:border-white/10'}`}>
              <div className="text-[10px] bg-[#2dd4bf]/15 text-[#2dd4bf] inline-flex px-2 py-0.5 rounded-full font-bold tracking-wide">{p.status}</div>
              <div className="font-bold text-[14px] mt-2">{p.title}</div>
              <div className="text-[11px] text-white/30 mt-1">{Object.keys(p.props||{}).length} полей</div>
            </div>
          ))}
        </div>}
      </div>

      <div className="w-[360px] bg-[#0a0a0a] border-l border-white/[0.06] p-5 hidden lg:block overflow-auto">
        {renderTool()}
        {selected && (
          <div className="mt-6 pt-6 border-t border-white/[0.06]">
            <h4 className="text-[10px] text-white/30 uppercase tracking-[0.15em] mb-3">Все поля проекта</h4>
            <div className="space-y-2">
              {Object.entries(selected.props||{}).map(([k,v]:any)=>(
                <div key={k} className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-3 py-2.5">
                  <div className="text-[10px] text-white/40 uppercase tracking-wide">{k}</div>
                  <div className="text-[13px] mt-0.5">{String(v)}</div>
                </div>
              ))}
            </div>
            <button onClick={addField} className="mt-4 w-full py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-[13px] hover:bg-white/10">+ Добавить поле</button>
          </div>
        )}
      </div>

      {selected && (
        <div className="lg:hidden bg-[#0a0a0a] border-t border-white/[0.06] p-4">
          {renderTool()}
        </div>
      )}
    </div>
  )
}

export default function Dashboard(){
  return <Suspense fallback={<div className="min-h-screen bg-black text-white p-10">Loading...</div>}><DashboardInner/></Suspense>
    }
