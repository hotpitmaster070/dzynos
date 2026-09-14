"use client"
import { useState } from "react"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#080a12] text-white flex font-sans">
      {/* LEFT SIDEBAR */}
      <div className="w-[260px] bg-[#0e1018] border-r border-white/10 p-5 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-[#2dd4bf] flex items-center justify-center text-black font-bold">◇</div>
          <span className="font-bold">DzynOS</span>
        </div>

        <div className="text-[11px] text-white/30 uppercase tracking-widest mb-3">Workspace</div>
        <div className="space-y-1">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-[#2dd4bf]/10 text-[#2dd4bf]">📦 Asset Hub</div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-white/60 hover:bg-white/5">📁 Projects</div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-white/60 hover:bg-white/5">👥 Clients</div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-white/60 hover:bg-white/5">✨ AI Studio <span className="text-[10px] bg-[#2dd4bf] text-black px-1.5 py-0.5 rounded">NEW</span></div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-white/60 hover:bg-white/5">🎨 Brand Kits</div>
        </div>

        <div className="mt-auto space-y-4">
          <div className="text-[11px] text-white/30 uppercase">Teams</div>
          <div className="text-sm text-white/50">Design Team 6 • Marketing 3</div>
          <button className="w-full py-2.5 rounded-xl bg-white text-black font-bold text-sm">+ New Project</button>
        </div>
      </div>

      {/* CENTER BOARD */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Brand Identity — Acme Co. <span className="text-white/40 font-normal text-sm ml-2">In Progress • Due Nov 24</span></h1>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-xl bg-white/10 text-sm">Share</button>
            <button className="px-4 py-2 rounded-xl bg-white/10 text-sm">Invite</button>
            <button className="px-4 py-2 rounded-xl bg-[#2dd4bf] text-black font-bold text-sm">Generate with AI</button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {/* To Review */}
          <div>
            <div className="flex justify-between mb-3"><span className="text-sm font-bold">To Review (3)</span><span className="text-white/30">•••</span></div>
            <div className="space-y-3">
              <div className="bg-[#151821] rounded-2xl p-4 border border-white/10">
                <div className="text-[10px] px-2 py-1 bg-[#2dd4bf]/20 text-[#2dd4bf] rounded-full w-fit mb-2">In Progress</div>
                <div className="font-bold text-sm">Logo concepts</div>
                <div className="text-xs text-white/40 mt-1">Draft • 9 monogram variants</div>
              </div>
              <div className="bg-[#151821] rounded-2xl p-4 border border-white/10">
                <div className="font-bold text-sm">Color Palette Extraction</div>
                <div className="text-[10px] mt-2 px-2 py-1 bg-green-500/20 text-green-400 rounded-full w-fit">AI Extracted • 94% match</div>
              </div>
            </div>
          </div>

          {/* In Progress */}
          <div>
            <div className="flex justify-between mb-3"><span className="text-sm font-bold">In Progress (2)</span></div>
            <div className="space-y-3">
              <div className="bg-[#151821] rounded-2xl p-4 border border-white/10">
                <div className="font-bold text-sm">Typography System</div>
                <div className="text-xs text-white/40 mt-1">Plus Jakarta Sans / Inter</div>
              </div>
            </div>
          </div>

          {/* Client Approval */}
          <div>
            <div className="flex justify-between mb-3"><span className="text-sm font-bold">Client Approval (1)</span></div>
            <div className="bg-[#151821] rounded-2xl p-4 border border-white/10">
              <div className="w-full h-28 bg-gradient-to-br from-[#0A0E27] to-[#14B8A6] rounded-xl mb-3 flex items-center justify-center text-3xl font-bold">A</div>
              <div className="bg-[#0e1018] rounded-xl p-3 text-xs">
                <div className="flex items-center gap-2 mb-1"><span className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center">S</span><span className="font-bold">Sarah (Client)</span></div>
                <div className="text-white/60">Love the bold mark! Can we try a darker version for print?</div>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 py-2 rounded-lg bg-white/10 text-xs">Comment</button>
                <button className="flex-1 py-2 rounded-lg bg-[#2dd4bf] text-black font-bold text-xs">Approve</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT DETAILS */}
      <div className="w-[300px] bg-[#0e1018] border-l border-white/10 p-5">
        <div className="text-sm font-bold mb-4">Brand Kit Details</div>
        <div className="mb-5">
          <div className="text-[11px] text-white/30 uppercase mb-2">Color Palette</div>
          <div className="flex gap-2"><div className="w-8 h-8 rounded-full bg-[#0A0E27] border border-white/10"></div><div className="w-8 h-8 rounded-full bg-[#14B8A6]"></div><div className="w-8 h-8 rounded-full bg-[#E2E8F0]"></div><div className="w-8 h-8 rounded-full bg-amber-400"></div><div className="w-8 h-8 rounded-full bg-violet-500"></div></div>
        </div>
        <div className="mb-5">
          <div className="text-[11px] text-white/30 uppercase mb-2">Font Library</div>
          <div className="text-xs text-white/60">Plus Jakarta Sans — Headings<br/>Inter — Body</div>
        </div>
        <div className="bg-[#151821] rounded-xl p-3 border border-white/10">
          <div className="text-xs font-bold mb-1">Approval Status</div>
          <div className="text-[11px] text-green-400">● Client approved</div>
          <div className="text-[11px] text-white/40">Ready for export</div>
          <button className="w-full mt-3 py-2.5 rounded-xl bg-white text-black font-bold text-xs">Export Brand Kit</button>
        </div>
      </div>
    </div>
  )
            }
