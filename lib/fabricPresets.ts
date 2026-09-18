// lib/fabricPresets.ts - совместимо с твоим текущим getFabricsFromDB
export interface FabricProperty {
  id: string; slug: string; name: string; category: string;
  gsm: number; composition: string; world_standard: string;
  density: number; stiffness: number; roughness: number; metalness: number;
  is_custom: boolean; physics?: any
}
export const FABRIC_PRESETS: Record<string, FabricProperty> = {
  silk: { id: 'silk', slug:'silk-natural-50', name:'Натуральный шелк', category:'шелк', gsm:50, composition:'100% Silk', world_standard:'ISO 1833-4', density:50, stiffness:0.15, roughness:0.2, metalness:0.1, is_custom:false },
  denim: { id: 'denim', slug:'denim-420-heavy', name:'Плотный деним', category:'деним', gsm:420, composition:'100% Cotton', world_standard:'ISO 1833-2', density:420, stiffness:0.85, roughness:0.9, metalness:0, is_custom:false },
  heavy_cotton: { id: 'heavy_cotton', slug:'velvet-280-rib', name:'Тяжелый хлопок (Джерси)', category:'вельвет', gsm:280, composition:'100% Cotton', world_standard:'ISO 1833-4', density:280, stiffness:0.6, roughness:0.9, metalness:0, is_custom:false }
}
const SAFE_FABRICS = Object.values(FABRIC_PRESETS)
export async function getFabricsFromDB(search=''): Promise<FabricProperty[]>{
  try{
    const url=process.env.NEXT_PUBLIC_SUPABASE_URL; const key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if(url&&key){
      const res=await fetch(`${url}/rest/v1/fabrics?select=*`,{headers:{apikey:key,Authorization:`Bearer ${key}`} as any, cache:'no-store'})
      if(res.ok){ const data=await res.json(); if(data?.length) return data }
    }
  }catch{}
  if(search) return SAFE_FABRICS.filter(f=>f.name.toLowerCase().includes(search.toLowerCase()))
  return SAFE_FABRICS
}
export function getFabricStiffness(f:FabricProperty){ return f.stiffness }
