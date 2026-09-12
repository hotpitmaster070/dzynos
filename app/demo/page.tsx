export default function Demo() {
  return (
    <div className="min-h-screen bg-[#0a0a14] text-white flex">
      {/* Sidebar */}
      <div className="w-60 border-r border-white/10 p-4 hidden md:block">
        <div className="font-bold mb-6">⬢ DzynOS.com</div>
        <p className="text-[10px] text-white/30 mb-2">MENU</p>
        <div className="space-y-1 text-sm">
          <div className="bg-[#6d5cff] p-2 rounded">📁 Projects</div>
          <div className="text-white/50 p-2">🗄️ Assets</div>
          <div className="text-white/50 p-2">✨ AI Studio</div>
          <div className="text-white/50 p-2">✅ Approvals</div>
        </div>
        <button className="mt-10 w-full bg-[#6d5cff] py-2 rounded-lg text-sm">+ New Project</button>
      </div>

      {/* Main */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Brand Redesign 2026</h1>
        <p className="text-sm text-white/50 mt-1">Interactive Demo • All data is fake, just to show how it works</p>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-[#151525] border border-white/10 rounded-xl p-4">
            <h3 className="text-xs text-violet-400">PROJECTS</h3>
            <div className="mt-3 bg-[#6d5cff] p-2 rounded text-sm">📁 Brand Redesign 2026</div>
            <div className="mt-2 text-sm text-white/50">📁 Mobile App UI</div>
            <div className="mt-1 text-sm text-white/50">📁 Website Launch</div>
          </div>
          <div className="bg-[#151525] border border-white/10 rounded-xl p-4 col-span-2">
            <h3 className="font-bold">Color System <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded ml-2">Approved</span></h3>
            <div className="grid grid-cols-4 gap-3 mt-4">
              <div className="h-20 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-lg"></div>
              <div className="h-20 bg-white/5 rounded-lg"></div>
              <div className="h-20 bg-white/5 rounded-lg"></div>
              <div className="h-20 bg-white/5 rounded-lg"></div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-white/40 text-sm">This is how your workspace will look. Want early access?</p>
          <button className="mt-3 px-6 py-2 bg-white text-black rounded-lg font-medium text-sm">Join Early Access →</button>
        </div>
      </div>
    </div>
  )
          }
