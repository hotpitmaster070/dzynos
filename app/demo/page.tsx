"use client"
import Link from "next/link"
import { useState } from "react"

export default function DemoPage() {
  const [active, setActive] = useState("Projects")
  const [prompt, setPrompt] = useState("")

  return (
    <div className="min-h-screen bg-[#0a0d14] text-white flex relative overflow-hidden">
      {/* Grid + Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00f5d4]/15 blur-[80px] rounded-full pointer-events-none" />

      {/* Sidebar */}
      <aside className="relative z-10 w-[240px] hidden md:flex flex-col bg-[#0e1018] border-r border-white/[0.06] p-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-[16px] mb-8">
          <div className="w-8 h-8 rounded-lg bg-[#2dd4bf] flex items-center justify-center text-black">◈</div>
          DzynOS.com
        </Link>

        <div className="space-y-1">
          {[
            { name: "Projects", icon: "📁", count: "8" },
            { name: "Assets", icon: "▦", count: "347" },
            { name: "AI Studio", icon: "✨", count: "AI", active: true },
            { name: "Team", icon: "👥", count: "4" },
          ].map((item) => (
            <button key={item.name} onClick={() => setActive(item.name)} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] font-medium transition ${active===item.name? "bg-[#2dd4bf]/15 text-[#2dd4bf] border border-[#2dd4bf]/30" : "text-white/50 hover:bg-white/5 hover:text-white"}`}>
              <span className="flex items-center gap-2.5"><span>{item.icon}</span>{item.name}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${active===item.name? "bg-[#2dd4bf] text-black" : "bg-white/10"}`}>{item.count}</span>
            </button>
          ))}
        </div>

        <div className="mt-auto bg-[#171a27] border border-white/10 rounded-xl p-3">
          <p className="text-[11px] text-white/40">AI Credits</p>
          <div className="mt-2 h-1.5 bg-white/10 rounded-full"><div className="h-full w-[68%] bg-[#2dd4bf] rounded-full"></div></div>
          <p className="text-[11px] text-white/60 mt-2">68% • 1,240 / 2,000 left</p>
        </div>
      </aside>

      {/* Main */}
      <main className="relative z-10 flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-[64px] flex items-center justify-between px-4 md:px-6 border-b border-white/[0.06] bg-[#0e1018]/80 backdrop-blur">
          <div className="flex items-center gap-3">
            <Link href="/" className="md:hidden font-bold">DzynOS</Link>
            <h2 className="font-bold text-[15px]">{active}</h2>
            <span className="hidden md:flex text-[11px] bg-[#2dd4bf]/20 text-[#2dd4bf] px-2 py-0.5 rounded-full">Demo Mode</span>
          </div>
          <div className="flex items-center gap-2">
            <input placeholder="Search..." className="hidden md:block bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[12px] w-[200px] placeholder:text-white/30 focus:outline-none focus:border-[#2dd4bf]/40" />
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2dd4bf] to-[#0ea5e9]"></div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-auto">
          {/* Left - Projects List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-[14px]">Recent Projects</h3>
              <button className="text-[11px] bg-[#2dd4bf] text-black px-3 py-1.5 rounded-lg font-bold">+ New</button>
            </div>

            {[
              { name: "Mobile App Redesign", status: "In Progress", color: "bg-[#2dd4bf] text-black", progress: 70, updated: "2h ago", team: "👥 3" },
              { name: "Brand Guidelines", status: "Completed", color: "bg-green-500/20 text-green-400", progress: 100, updated: "yesterday", team: "✅ Done" },
              { name: "Website v3", status: "In Review", color: "bg-yellow-500/20 text-yellow-400", progress: 85, updated: "1d ago", team: "💬 2 comments" },
            ].map((p) => (
              <div key={p.name} className="bg-[#0e1018] border border-white/[0.06] hover:border-[#2dd4bf]/30 rounded-xl p-4 transition group cursor-pointer">
                <div className="flex justify-between items-start">
                  <div><p className="font-bold text-[13px]">{p.name}</p><p className="text-[11px] text-white/40 mt-1">Updated {p.updated} • {p.team}</p></div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${p.color}`}>● {p.status}</span>
                </div>
                <div className="mt-3 h-1 bg-white/10 rounded-full"><div className="h-1 rounded-full bg-[#2dd4bf]" style={{ width: `${p.progress}%` }}></div></div>
                <div className="mt-3 hidden group-hover:flex gap-2"><button className="text-[11px] bg-white/10 px-2.5 py-1 rounded-lg">Open</button><button className="text-[11px] bg-white/5 px-2.5 py-1 rounded-lg">Share</button><button className="text-[11px] bg-[#2dd4bf]/20 text-[#2dd4bf] px-2.5 py-1 rounded-lg ml-auto">Generate Variant</button></div>
              </div>
            ))}
          </div>

          {/* Right - AI Studio */}
          <div className="space-y-4">
            <div className="bg-[#0e1018] border border-[#2dd4bf]/40 rounded-xl p-4 shadow-[0_0_20px_rgba(45,212,191,0.15)]">
              <h3 className="font-bold text-[14px] text-[#2dd4bf] flex items-center gap-2">✨ AI Studio</h3>
              <div className="mt-4 space-y-3">
                <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Describe what you want to generate... e.g. 'minimal dashboard with 3 cards'" className="w-full h-[80px] bg-[#171a27] border border-white/10 rounded-xl p-3 text-[12px] placeholder:text-white/30 focus:outline-none focus:border-[#2dd4bf]/50 resize-none" />
                <button onClick={()=>alert('Demo: Generating 4 variants for: ' + prompt)} className="w-full bg-[#2dd4bf] text-black font-bold text-[12px] py-2.5 rounded-xl hover:bg-[#5eead4] transition">Generate Variations →</button>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="h-[70px] rounded-lg bg-white/5 border border-white/10"></div>
                <div className="h-[70px] rounded-lg bg-white/5 border border-white/10"></div>
                <div className="h-[70px] rounded-lg bg-white/5 border border-white/10"></div>
                <div className="h-[70px] rounded-lg bg-[#2dd4bf]/10 border border-[#2dd4bf]/20 flex items-center justify-center text-[#2dd4bf] text-[10px]">+ New</div>
              </div>
            </div>

            <div className="bg-[#0e1018] border border-white/[0.06] rounded-xl p-4">
              <h4 className="font-bold text-[13px] mb-3">Assets</h4>
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-[12px]"><span>Icons Pack 2.1</span><span className="text-[10px] bg-[#2dd4bf] text-black px-1.5 py-0.5 rounded font-bold">v2.1</span></div>
                <p className="text-[11px] text-white/40">284 components • Updated today</p>
                <div className="flex gap-1.5 mt-2"><div className="w-6 h-6 rounded bg-[#2dd4bf]"></div><div className="w-6 h-6 rounded bg-white/10"></div><div className="w-6 h-6 rounded bg-white/10"></div></div>
              </div>
            </div>

            <Link href="/" className="block text-center text-[11px] text-white/30 hover:text-white/60 mt-4">← Back to Landing</Link>
          </div>
        </div>
      </main>
    </div>
  )
      }
