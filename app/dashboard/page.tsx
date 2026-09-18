"use client"
import { useState } from "react"
import FashionTool from "./tools/fashion"

export default function DashboardPage() {
  const [project, setProject] = useState({ title: "New Dress", props: {}, image_url: "" })
  return (
    <div className="min-h-screen bg-[#0a0b10] p-4 text-white">
      <h1 className="font-bold text-[#2dd4bf] mb-4">DzynOS Dashboard</h1>
      <FashionTool 
        project={project} 
        onUpdate={(p:any) => setProject((prev:any) => ({ ...prev, props: { ...prev.props, ...p }, image_url: p.image_url || prev.image_url }))}
      />
    </div>
  )
}
