export default function Demo() {
  return (
    <div className="min-h-screen bg-[#05080a] text-white flex">
      {/* Sidebar - на телефоне прячется */}
      <div className="w-60 border-r border-white/10 p-4 hidden md:block bg-[#080a0c]">
        <div className="font-bold mb-6 flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#2dd4bf] text-black flex items-center justify-center text-sm font-bold">D</span> DzynOS
        </div>
        <p className="text-[10px] text-white/30 mb-2 tracking-widest">MENU</p>
        <div className="space-y-1 text-sm">
          <div className="bg-[#2dd4bf] text-black p-2.5 rounded-lg font-medium">📁 Projects</div>
          <div className="text-white/50 p-2.5">🗄️ Assets</div>
          <div className="text-white/50 p-2.5">✨ AI Studio</div>
          <div className="text-white/50 p-2.5">✅ Approvals</div>
        </div>
        <button className="mt-10 w-full bg-[#2dd4bf] text-black py-2.5 rounded-xl text-sm font-semibold">+ New Project</button>
      </div>

      <div className="flex-1 p-4 md:p-6">
        <h1 className="text-[22px] md:text-2xl font-bold">Brand Redesign 2026</h1>
        <p className="text-[13px] md:text-sm text-white/40 mt-1">Interactive Demo • All data is fake, just to show how it works</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-[#111417] border border-white/10 rounded-xl p-4">
            <h3 className="text-[10px] text-teal-400 tracking-widest font-bold">PROJECTS</h3>
            <div className="mt-3 bg-[#2dd4bf] text-black p-2.5 rounded-lg text-sm font-medium">📁 Brand Redesign 2026</div>
            <div className="mt-2 text-sm text-white/50 p-2">📁 Mobile App UI</div>
            <div className="text-sm text-white/50 p-2">📁 Website Launch</div>
          </div>
          <div className="bg-[#111417] border border-white/10 rounded-xl p-4 md:col-span-2">
            <h3 className="font-bold text-sm">Color System <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full ml-2">Approved</span></h3>
            <div className="grid grid-cols-4 gap-3 mt-4">
              <div className="h-20 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-lg"></div>
              <div className="h-20 bg-white/5 rounded-lg"></div>
              <div className="h-20 bg-white/5 rounded-lg"></div>
              <div className="h-20 bg-white/5 rounded-lg"></div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-white/30 text-sm">This is how your workspace will look. Want early access?</p>
          <button className="mt-3 px-6 py-2.5 bg-white text-black rounded-xl font-semibold text-sm">Join Early Access →</button>
        </div>
      </div>
    </div>
  )
}
