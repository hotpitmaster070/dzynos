import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#05080a] text-white overflow-hidden relative">
      {/* Grid + Glow Teal */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-teal-500/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/15 blur-[120px] rounded-full"></div>

      {/* Header */}
      <header className="relative flex justify-between items-center px-6 md:px-10 py-4 z-50 sticky top-0 bg-[#05080a]/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-black font-bold">D</span>
            DzynOS
          </Link>
          <nav className="hidden lg:flex gap-6 text-[13px] text-white/50">
            <a href="#product" className="hover:text-white">Product</a>
            <a href="#solutions" className="hover:text-white">Solutions</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="#" className="hover:text-white">Resources</a>
            <a href="#" className="hover:text-white">Changelog</a>
          </nav>
        </div>
        <div className="flex gap-2">
          <Link href="/demo"><button className="px-4 py-1.5 rounded-lg bg-white/10 text-sm hover:bg-white/15">Log in</button></Link>
          <Link href="/demo"><button className="px-4 py-1.5 rounded-lg bg-[#2dd4bf] text-black text-sm font-semibold hover:bg-[#20c5b0]">Get Started</button></Link>
        </div>
      </header>

      {/* Hero - как на твоем фото */}
      <section id="pricing" className="relative text-center md:text-center text-left pt-12 md:pt-20 pb-8 px-6 z-10 max-w-3xl mx-auto">
        <h1 className="text-[32px] md:text-[48px] font-bold leading-[1.1] tracking-tight">The Operating System for Design Teams</h1>
        <p className="text-white/50 max-w-xl mx-auto md:mx-auto mt-4 text-[14px] md:text-[15px] leading-relaxed">Build, collaborate, and ship design work faster — all in one place.</p>

        <div className="flex flex-col md:flex-row justify-center gap-3 mt-8 max-w-sm md:max-w-md mx-auto md:mx-auto">
          <Link href="/demo" className="w-full md:w-auto"><button className="w-full px-8 py-3.5 rounded-xl bg-[#2dd4bf] text-black font-semibold text-[15px] hover:bg-[#20c5b0] transition">Start Free</button></Link>
          <Link href="/demo" className="w-full md:w-auto"><button className="w-full px-8 py-3.5 rounded-xl bg-white/[0.06] border border-white/15 text-[15px] hover:bg-white/10 transition">View Demo</button></Link>
        </div>
      </section>

      {/* Dashboard - на компе детальный, на телефоне как на твоем фото */}
      <div id="product" className="relative z-10 mx-auto max-w-5xl mt-2 px-4 md:px-0">
        {/* MOBILE VERSION - как на фото */}
        <div className="md:hidden">
          <p className="text-[11px] text-white/30 tracking-widest mb-3 px-2">DASHBOARD</p>
          <div className="space-y-3">
            <div className="bg-[#111417] border border-white/10 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">📁</div>
              <div><h3 className="font-bold text-[16px]">Projects</h3><p className="text-[13px] text-white/50">Brand Redesign 2026</p></div>
            </div>
            <div className="bg-[#111417] border border-white/10 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">🗄️</div>
              <div><h3 className="font-bold text-[16px]">Assets</h3><p className="text-[13px] text-white/50">Color System</p></div>
            </div>
            <div className="bg-[#111417] border border-white/10 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">✨</div>
              <div><h3 className="font-bold text-[16px]">AI Studio</h3><p className="text-[13px] text-white/50">Generate & iterate designs</p></div>
            </div>
          </div>
        </div>

        {/* DESKTOP VERSION - детальный как раньше */}
        <div className="hidden md:block bg-[#111417] border border-white/10 rounded-2xl p-3 shadow-[0_0_60px_rgba(45,212,191,0.15)]">
          <div className="grid grid-cols-[200px_1fr_240px] gap-3">
            <div className="bg-[#0a0f0f] rounded-xl p-3 border border-white/5">
              <p className="text-[10px] text-teal-400 font-bold tracking-wider mb-3">PROJECTS</p>
              <div className="bg-[#2dd4bf] text-black p-2.5 rounded-lg text-[12px] font-medium">📁 Brand Redesign 2026</div>
              <div className="text-[12px] text-white/40 mt-2 p-2">📱 Mobile App V3</div>
              <div className="text-[12px] text-white/40 p-2">🌐 Website Revamp</div>
              <div className="text-[12px] text-white/40 p-2">📢 Marketing Campaign</div>
            </div>
            <div className="bg-[#0a0f0f] rounded-xl p-4 border border-white/5">
              <h3 className="font-bold text-sm flex items-center gap-2">Brand Redesign 2026 <span className="text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full">In review</span></h3>
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="bg-[#111417] rounded-lg p-3 border border-white/5 text-center"><div className="h-12 flex items-center justify-center text-teal-400 text-2xl">⬢</div><p className="text-[10px] text-white/40 mt-1">Color System</p></div>
                <div className="bg-[#111417] rounded-lg p-3 border border-white/5 text-center"><div className="h-12 bg-white/5 rounded"></div><p className="text-[10px] text-white/40 mt-1">Onboarding</p></div>
                <div className="bg-[#111417] rounded-lg p-3 border border-white/5 text-center"><div className="h-12 flex items-center justify-center">✨</div><p className="text-[10px] text-white/40 mt-1">Hero Illustration</p></div>
              </div>
            </div>
            <div className="bg-[#0e1a1a] rounded-xl p-3 border border-teal-500/20">
              <h4 className="text-xs font-bold text-teal-300">✨ AI Studio</h4>
              <div className="bg-[#05080a] rounded p-2 mt-3 text-[10px] text-teal-200/70 border border-white/5">Generate variation for brand redesign...</div>
              <div className="h-24 mt-3 bg-[#05080a] rounded-lg border border-white/5 flex items-center justify-center text-teal-400">⬢</div>
              <div className="flex gap-2 mt-3"><button className="flex-1 text-[10px] bg-[#2dd4bf] text-black py-2 rounded font-semibold">Generate</button><button className="flex-1 text-[10px] bg-white/5 py-2 rounded">Export</button></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div id="solutions" className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-3 max-w-5xl mx-auto mt-8 px-4 pb-12">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5"><h3 className="font-bold text-sm">Asset Hub</h3><p className="text-[12px] text-white/40 mt-2">Centralized library for brand assets, versions, tags, and search.</p></div>
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5"><h3 className="font-bold text-sm">AI Studio</h3><p className="text-[12px] text-white/40 mt-2">Generate visuals and variations with AI in seconds.</p></div>
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5"><h3 className="font-bold text-sm">Client Approval</h3><p className="text-[12px] text-white/40 mt-2">Collect feedback and approvals in real time.</p></div>
      </div>

      <footer className="relative z-10 text-center text-[11px] text-white/25 py-8 border-t border-white/5">© 2026 DzynOS.com • Built for design teams</footer>
    </div>
  )
}
