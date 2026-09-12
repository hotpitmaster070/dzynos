import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a14] text-white overflow-hidden">
      <header className="flex justify-between items-center px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-2 text-xl font-bold"><span>⬢</span> DzynOS<span className="text-white/40 text-sm">.com</span></div>
        <div className="flex gap-3">
          <Link href="/demo"><button className="px-4 py-1.5 rounded-lg bg-white/10 text-sm">Log in</button></Link>
          <Link href="/demo"><button className="px-4 py-1.5 rounded-lg border border-violet-500 text-sm">Get Started</button></Link>
        </div>
      </header>

      <section className="text-center pt-20 pb-10 relative px-4">
        <div className="absolute top-0 left-0 w-[400px] h-[300px] bg-violet-600/30 blur-[100px] rounded-full"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-indigo-600/30 blur-[100px] rounded-full"></div>
        <h1 className="text-5xl font-bold max-w-3xl mx-auto leading-tight">The Operating System for Design Teams</h1>
        <p className="text-white/60 max-w-2xl mx-auto mt-4">Manage assets, projects, and AI generation in one unified workspace. Early access for modern design teams.</p>
        <div className="flex justify-center gap-4 mt-8">
          <Link href="/demo"><button className="px-8 py-3 rounded-xl bg-[#6d5cff] font-medium">Join Early Access →</button></Link>
          <Link href="/demo"><button className="px-8 py-3 rounded-xl bg-white/5 border border-white/10">◉ View Demo</button></Link>
        </div>
        <p className="text-xs text-white/40 mt-6">No credit card required • Beta access • Building in public</p>
      </section>

      <div className="mx-auto max-w-5xl bg-[#151525] border border-white/10 rounded-2xl p-4 shadow-2xl mx-4">
        <div className="flex gap-2 text-xs text-white/40 mb-4"><span className="px-2 py-1 bg-white/5 rounded">Projects</span><span className="px-2 py-1 bg-white/5 rounded">Assets</span><span className="px-2 py-1 bg-white/5 rounded">AI Studio</span></div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#0f0f1e] rounded-xl p-3"><p className="text-[10px] text-violet-400 mb-2">PROJECTS</p><div className="bg-[#6d5cff] p-2 rounded text-xs">📁 Brand Redesign 2026</div><div className="text-xs text-white/50 mt-2">📁 Mobile App UI</div><div className="text-xs text-white/50 mt-1">📁 Website Launch</div></div>
          <div className="bg-[#0f0f1e] rounded-xl p-4 col-span-2"><h3 className="font-bold text-sm">Brand Redesign 2026 <span className="text-[10px] bg-violet-500/30 px-2 py-0.5 rounded">In review</span></h3><div className="mt-4 grid grid-cols-4 gap-3"><div className="h-16 bg-white/5 rounded-lg"></div><div className="h-16 bg-white/5 rounded-lg"></div><div className="h-16 bg-white/5 rounded-lg"></div></div></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-10 px-6">
        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 text-center"><h3 className="font-bold">Asset Hub</h3><p className="text-xs text-white/50 mt-2">Library for brand assets, versions, tags, and search.</p></div>
        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 text-center"><h3 className="font-bold">AI Studio</h3><p className="text-xs text-white/50 mt-2">Generate visuals and variations with AI.</p></div>
        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 text-center"><h3 className="font-bold">Client Approval</h3><p className="text-xs text-white/50 mt-2">Collect feedback and approvals in real time.</p></div>
      </div>

      <footer className="text-center text-[10px] text-white/30 py-10">© 2026 DzynOS.com • Privacy • Terms</footer>
    </div>
  )
            }
