"use client"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function DashboardInner() {
  const search = useSearchParams()
  const cat = search.get('cat') || 'brand'

  const titles: any = {
    brand: "Brand Identity — Acme Co.",
    fashion: "Yay Kolleksiyası '26 — 12 obraz",
    interior: "Loft Mənzil Bakı — 85m²",
    landscape: "Villa Bağı + Hovuz"
  }

  return (
    <div className="min-h-screen bg-[#080a12] text-white flex">
      {/* LEFT */}
      <div className="w-[260px] bg-[#0e1018] border-r border-white/10 p-5 hidden md:flex flex-col">
        <div className="flex items-center gap-3 mb-8"><div className="w-8 h-8 rounded-lg bg-[#2dd4bf] flex items-center justify-center text-black font-bold">◇</div><span className="font-bold">DzynOS</span></div>
        <div className="space-y-1 text-sm">
          <a href="/dashboard?cat=fashion" className={`block px-3 py-2 rounded-xl ${cat=='fashion'?'bg-[#2dd4bf]/10 text-[#2dd4bf]':'text-white/60'}`}>👗 Moda</a>
          <a href="/dashboard?cat=interior" className={`block px-3 py-2 rounded-xl ${cat=='interior'?'bg-[#2dd4bf]/10 text-[#2dd4bf]':'text-white/60'}`}>🏠 Interyer</a>
          <a href="/dashboard?cat=landscape" className={`block px-3 py-2 rounded-xl ${cat=='landscape'?'bg-[#2dd4bf]/10 text-[#2dd4bf]':'text-white/60'}`}>🌿 Landşaft</a>
          <a href="/dashboard?cat=brand" className={`block px-3 py-2 rounded-xl ${cat=='brand'?'bg-white/10 text-white':'text-white/60'}`}>🎨 Brand</a>
        </div>
        <a href="/" className="mt-auto w-full py-2.5 rounded-xl bg-white text-black font-bold text-sm text-center block">← На лендинг</a>
      </div>

      {/* CENTER */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">{titles[cat]}</h1>
          <button className="px-4 py-2 rounded-xl bg-[#2dd4bf] text-black font-bold text-sm">Generate with AI</button>
        </div>

        {cat=='fashion' && (
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#151821] rounded-2xl p-4 border border-white/10"><div className="h-40 bg-gradient-to-br from-pink-500/20 to-violet-500/20 rounded-xl mb-2"></div><div className="font-bold text-sm">Ziyafət Geyimi #1</div><div className="text-xs text-white/40">3 rəy • Sədarək parça</div></div>
            <div className="bg-[#151821] rounded-2xl p-4 border border-white/10"><div className="h-40 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl mb-2"></div><div className="font-bold text-sm">Denim Look #4</div><div className="text-xs text-white/40">AI variant • 94% match</div></div>
            <div className="bg-[#151821] rounded-2xl p-4 border border-dashed border-white/20 flex items-center justify-center text-white/30">+ Add look</div>
          </div>
        )}

        {cat=='interior' && (
          <div className="grid grid-cols-[1fr_280px] gap-5">
            <div className="bg-[#151821] rounded-2xl h-[500px] border border-white/10 flex items-center justify-center text-white/20">🏠 2D План 85m² — скоро тут tldraw</div>
            <div className="space-y-3"><div className="text-xs uppercase text-white/30">Mebel</div>
              <div className="bg-[#151821] p-3 rounded-xl border border-white/10 text-sm">🛋️ Divan — Embawood — 450 AZN</div>
              <div className="bg-[#151821] p-3 rounded-xl border border-white/10 text-sm">💡 Çilçıraq — IKEA — 120 AZN</div>
            </div>
          </div>
        )}

        {cat=='landscape' && (
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#151821] rounded-2xl p-4 border border-white/10"><div className="h-32 bg-green-500/20 rounded-xl mb-2"></div><div className="text-sm font-bold">Bağ zonası</div><div className="text-xs text-white/40">Palma • Suvarma 2x həftə</div></div>
            <div className="bg-[#151821] rounded-2xl p-4 border border-white/10"><div className="h-32 bg-blue-500/20 rounded-xl mb-2"></div><div className="text-sm font-bold">Hovuz + Pergola</div></div>
          </div>
        )}

        {cat=='brand' && (
          <div className="grid grid-cols-3 gap-5">
            <div><div className="text-sm font-bold mb-3">To Review (3)</div><div className="bg-[#151821] rounded-2xl p-4 border border-white/10"><div className="text-[10px] px-2 py-1 bg-[#2dd4bf]/20 text-[#2dd4bf] rounded-full w-fit mb-2">In Progress</div><div className="font-bold text-sm">Logo concepts</div></div></div>
            <div><div className="text-sm font-bold mb-3">In Progress (2)</div><div className="bg-[#151821] rounded-2xl p-4 border border-white/10"><div className="font-bold text-sm">Typography System</div></div></div>
            <div><div className="text-sm font-bold mb-3">Client Approval</div><div className="bg-[#151821] rounded-2xl p-4 border border-white/10"><div className="w-full h-28 bg-gradient-to-br from-[#0A0E27] to-[#14B8A6] rounded-xl mb-3 flex items-center justify-center text-3xl font-bold">A</div><div className="text-xs text-white/60">Sarah: Love the bold mark!</div></div></div>
          </div>
        )}
      </div>

      {/* RIGHT — вернул твою панель */}
      <div className="w-[300px] bg-[#0e1018] border-l border-white/10 p-5 hidden lg:block">
        <div className="text-sm font-bold mb-4">Details</div>
        <div className="bg-[#151821] rounded-xl p-3 border border-white/10">
          <div className="text-xs font-bold mb-1">Status</div>
          <div className="text-[11px] text-green-400">● Active</div>
          <button className="w-full mt-3 py-2.5 rounded-xl bg-white text-black font-bold text-xs">Export</button>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080a12] text-white p-10">Loading DzynOS...</div>}>
      <DashboardInner />
    </Suspense>
  )
              }
