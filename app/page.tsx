export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a14] text-white overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 border-b border-white/10">
        <div className="flex items-center gap-2 text-xl font-bold"><span className="text-2xl">⬢</span> DzynOS<span className="text-white/40 text-sm">.com</span></div>
        <nav className="hidden md:flex gap-6 text-sm text-white/70"><span>Product ▾</span><span>Solutions ▾</span><span>Pricing ▾</span><span>Resources ▾</span><span>Changelog</span></nav>
        <div className="flex gap-3"><button className="px-4 py-1.5 rounded-lg bg-white/10 text-sm">Log in</button><button className="px-4 py-1.5 rounded-lg bg-transparent border border-violet-500 text-sm">Get Started</button></div>
      </header>

      {/* Hero */}
      <section className="text-center pt-20 pb-10 relative">
        <div className="absolute top-0 left-0 w-[400px] h-[300px] bg-violet-600/40 blur-[100px] rounded-full"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-indigo-600/40 blur-[100px] rounded-full"></div>
        <h1 className="text-5xl font-bold max-w-3xl mx-auto leading-tight">The Operating System for Design Teams</h1>
        <p className="text-white/60 max-w-2xl mx-auto mt-4">Manage assets, projects, and AI generation in one unified workspace. Collaborate, design, and ship faster with AI-powered workflows for modern design teams.</p>
        <div className="flex justify-center gap-4 mt-8">
          <button className="px-8 py-3 rounded-xl bg-[#6d5cff] font-medium">Start Free →</button>
          <button className="px-8 py-3 rounded-xl bg-white/5 border border-white/10">◉ View Demo</button>
        </div>
        <p className="text-xs text-white/40 mt-6">No credit card required • 14-day free trial • Trusted by 2,000+ design teams</p>
      </section>

      {/* Mockup */}
      <div className="mx-auto max-w-5xl bg-[#151525] border border-white/10 rounded-2xl p-4 shadow-2xl">
        <div className="flex gap-2 text-xs text-white/40 mb-4"><span className="px-2 py-1 bg-white/5 rounded">Projects</span><span className="px-2 py-1 bg-white/5 rounded">Assets</span><span className="px-2 py-1 bg-white/5 rounded">AI Studio</span><span className="px-2 py-1 bg-white/5 rounded">Approvals</span></div>
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1 bg-[#0f0f1e] rounded-xl p-3"><p className="text-[10px] text-violet-400 mb-2">PROJECTS</p><div className="space-y-2 text-xs"><div className="bg-[#6d5cff] p-2 rounded">📁 Brand Redesign 2024</div><div className="text-white/50">📁 Mobile App UI</div><div className="text-white/50">📁 Website Launch</div></div></div>
          <div className="col-span-2 bg-[#0f0f1e] rounded-xl p-4"><h3 className="font-bold">Brand Redesign 2026 <span className="text-[10px] bg-violet-500/30 px-2 py-0.5 rounded">In review</span></h3><div className="grid grid-cols-4 gap-3 mt-4"><div className="text-center"><div className="h-16 bg-white/5 rounded-lg flex items-center justify-center">⬢</div><p className="text-[10px] mt-1 text-white/50">Color System</p></div><div className="text-center"><div className="h-16 bg-white/5 rounded-lg"></div><p className="text-[10px] mt-1 text-white/50">Onboarding</p></div><div className="text-center"><div className="h-16 bg-white/5 rounded-lg"></div><p className="text-[10px] mt-1 text-white/50">Hero Illustration</p></div></div></div>
          <div className="col-span-1 bg-[#0f0f1e] rounded-xl p-3"><p className="text-xs font-bold">AI Studio</p><p className="text-[10px] text-white/50 mt-2">Generate variation</p><div className="mt-2 h-20 bg-white/5 rounded flex items-center justify-center">⬢</div></div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto mt-10 px-4">
        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 text-center"><div className="text-3xl mb-2">🗄️</div><h3 className="font-bold">Asset Hub</h3><p className="text-xs text-white/50 mt-2">Centralized library for brand assets, versions, tags, and search.</p></div>
        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 text-center"><div className="text-3xl mb-2">✨</div><h3 className="font-bold">AI Studio</h3><p className="text-xs text-white/50 mt-2">Generate visuals, images, backgrounds, and variations with AI.</p></div>
        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 text-center"><div className="text-3xl mb-2">💬</div><h3 className="font-bold">Client Approval</h3><p className="text-xs text-white/50 mt-2">Collect feedback, approvals, and sign-off in real time.</p></div>
      </div>

      <footer className="text-center text-[10px] text-white/30 py-10">© 2026 DzynOS.com • Privacy • Terms • Security • Careers</footer>
    </div>
  )
      }
