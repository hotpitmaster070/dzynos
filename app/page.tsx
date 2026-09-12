import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a14] text-white overflow-hidden relative">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <div className="absolute top-20 left-0 w-[300px] h-[200px] bg-violet-600/40 blur-[80px] rounded-full"></div>
      <div className="absolute top-40 right-0 w-[400px] h-[300px] bg-indigo-600/30 blur-[100px] rounded-full"></div>

      {/* Header */}
      <header className="relative flex justify-between items-center px-6 md:px-10 py-4 z-50 sticky top-0 bg-[#0a0a14]/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold"><span className="text-violet-400 text-2xl">⬢</span> DzynOS<span className="text-white/30 text-xs font-normal">.com</span></Link>
          <nav className="hidden lg:flex gap-5 text-[13px] text-white/60">
            <a href="#product" className="hover:text-white transition">Product ⌄</a>
            <a href="#solutions" className="hover:text-white transition">Solutions ⌄</a>
            <a href="#pricing" className="hover:text-white transition">Pricing ⌄</a>
            <span className="opacity-40 cursor-not-allowed">Resources ⌄</span>
            <span className="opacity-40 cursor-not-allowed">Changelog</span>
          </nav>
        </div>
        <div className="flex gap-2">
          <Link href="/demo"><button className="px-4 py-1.5 rounded-lg bg-white/10 text-sm hover:bg-white/15 transition">Log in</button></Link>
          <Link href="/demo"><button className="px-4 py-1.5 rounded-lg border border-violet-500/50 bg-violet-500/10 text-sm hover:bg-violet-500/20 transition">Get Started</button></Link>
        </div>
      </header>

      {/* Hero */}
      <section id="pricing" className="relative text-center pt-16 pb-8 px-4 z-10">
        <h1 className="text-[32px] md:text-[42px] font-bold max-w-3xl mx-auto leading-tight">The Operating System for Design Teams</h1>
        <p className="text-white/60 max-w-2xl mx-auto mt-3 text-[13px] md:text-[14px]">Manage assets, projects, and AI generation in one unified workspace. Collaborate, design,<br className="hidden md:block"/> and ship faster with AI-powered workflows for modern design teams.</p>
        <div className="flex justify-center gap-3 mt-6">
          <Link href="/demo"><button className="px-8 py-2.5 rounded-xl bg-[#6d5cff] font-medium text-sm flex items-center gap-1 hover:bg-[#5a4de6] transition">Start Free ↗</button></Link>
          <Link href="/demo"><button className="px-8 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition">◉ View Demo</button></Link>
        </div>
        <p className="text-[11px] text-white/30 mt-4">No credit card required • 14-day free trial • Beta access • Building in public</p>
      </section>

      {/* Dashboard Mock */}
      <div id="product" className="relative z-10 mx-auto max-w-5xl bg-[#121221] border border-white/10 rounded-2xl p-3 shadow-[0_0_50px_rgba(109,92,255,0.15)] mx-4 md:mx-auto">
        <div className="flex gap-2 text-[11px] text-white/50 mb-3 px-2"><span className="bg-white/5 px-2 py-1 rounded">Projects</span><span className="text-white/20">/</span><span className="bg-white/5 px-2 py-1 rounded">Assets</span><span className="text-white/20">/</span><span className="bg-white/5 px-2 py-1 rounded">AI Studio</span><span className="text-white/20">/</span><span className="bg-white/5 px-2 py-1 rounded">Approvals</span></div>

        <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr_200px] gap-3">
          {/* Left */}
          <div className="bg-[#0f0f1e] rounded-xl p-3 border border-white/5">
            <p className="text-[10px] text-violet-400 font-bold tracking-wider mb-2">PROJECTS</p>
            <div className="bg-[#6d5cff] p-2 rounded-lg text-[11px]">📁 Brand Redesign 2026</div>
            <div className="text-[11px] text-white/50 mt-2 p-2">📁 Mobile App UI</div>
            <div className="text-[11px] text-white/50 p-2">📁 Website Launch</div>
            <div className="text-[11px] text-white/50 p-2">📁 Marketing Campaign</div>
          </div>

          {/* Middle */}
          <div className="bg-[#0f0f1e] rounded-xl p-4 border border-white/5">
            <h3 className="font-bold text-sm flex items-center gap-2">Brand Redesign 2026 <span className="text-[10px] bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded">In review</span></h3>
            <p className="text-[11px] text-white/40 mt-4 mb-2">Assets</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#151525] rounded-lg p-2 border border-white/5 text-center"><div className="h-12 flex items-center justify-center text-violet-400 text-xl">⬢</div><p className="text-[9px] text-white/50 mt-1">Color System</p></div>
              <div className="bg-[#151525] rounded-lg p-2 border border-white/5 text-center"><div className="h-12 grid grid-cols-3 gap-1 p-1"><div className="bg-white rounded-sm"></div><div className="bg-violet-400 rounded-sm"></div><div className="bg-yellow-200 rounded-sm"></div><div className="bg-white/20 rounded-sm"></div><div className="bg-white/20 rounded-sm"></div><div className="bg-white/20 rounded-sm"></div></div><p className="text-[9px] text-white/50 mt-1">Onboarding Screen</p></div>
              <div className="bg-[#151525] rounded-lg p-2 border border-white/5 text-center"><div className="h-12 flex items-center justify-center">✨</div><p className="text-[9px] text-white/50 mt-1">Hero Illustration</p></div>
            </div>
          </div>

          {/* Right AI Studio */}
          <div className="bg-[#1a1a2e] rounded-xl p-3 border border-violet-500/20">
            <h4 className="text-xs font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">AI Studio</h4>
            <p className="text-[11px] text-white/70 mt-3">Generate variation</p>
            <div className="bg-[#0f0f1e] rounded p-2 mt-1 text-[9px] text-violet-300">modern minimal logo, gradient purple, tech style</div>
            <div className="h-20 mt-3 bg-[#0f0f1e] rounded-lg flex items-center justify-center text-violet-400 text-xl border border-white/5">⬢</div>
            <div className="flex gap-2 mt-3"><button className="flex-1 text-[9px] bg-white/5 py-1.5 rounded">▷ Generate</button><button className="flex-1 text-[9px] bg-white/5 py-1.5 rounded">↻ Regenerate</button></div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div id="solutions" className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mt-6 px-4 pb-12">
        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 text-center hover:bg-white/[0.05] transition"><div className="text-2xl mb-2">🗄️</div><h3 className="font-bold text-sm">Asset Hub</h3><p className="text-[11px] text-white/40 mt-2 leading-relaxed">Centralized library for brand assets, versions, tags, and search. Keep everything organized and on-brand.</p></div>
        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 text-center hover:bg-white/[0.05] transition"><div className="text-2xl mb-2">✨</div><h3 className="font-bold text-sm">AI Studio</h3><p className="text-[11px] text-white/40 mt-2 leading-relaxed">Generate visuals, images, backgrounds, and variations with AI. Create on-brand content in seconds.</p></div>
        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 text-center hover:bg-white/[0.05] transition"><div className="text-2xl mb-2">💬</div><h3 className="font-bold text-sm">Client Approval</h3><p className="text-[11px] text-white/40 mt-2 leading-relaxed">Collect feedback, approvals, and sign-off in real time. No more endless email threads.</p></div>
      </div>

      <footer className="relative z-10 text-center text-[11px] text-white/25 py-6 border-t border-white/5">© 2026 DzynOS.com • Privacy • Terms • Security • Careers</footer>
    </div>
  )
}
