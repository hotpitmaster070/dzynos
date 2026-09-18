"use client"
import { useEffect } from "react"
export default function ARViewer({ fabricHex, imageUrl }:{ fabricHex:string, imageUrl?:string }){
  useEffect(()=>{
    // Подгружаем model-viewer только на клиенте
    if(typeof window!=='undefined' &&!customElements.get('model-viewer')){
      const s=document.createElement('script'); s.src='https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js'; s.type='module'; document.head.appendChild(s)
    }
  },[])
  return (
    <div className="relative h-[360px] bg-black rounded-xl overflow-hidden border border-white/5">
      {imageUrl? <img src={imageUrl} className="w-full h-full object-contain" style={{ backgroundColor:fabricHex }} /> : <div className="w-full h-full grid place-items-center text-white/20">3D Preview</div>}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        <button className="bg-[#2dd4bf] text-black px-4 py-2 rounded-xl font-bold text-[11px]">👓 AR Preview</button>
        <button className="bg-white/10 text-white px-3 py-2 rounded-xl text-[10px]">Orbit | Zoom 62%</button>
      </div>
    </div>
  )
}
