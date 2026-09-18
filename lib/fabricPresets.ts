// lib/fabricPresets.ts - 100% безопасная версия, без импортов
export interface FabricProperty {
  id: string
  slug: string
  name: string
  category: string
  gsm: number
  composition: string
  world_standard: string
  density: number
  stiffness: number
  roughness: number
  metalness: number
  is_custom: boolean
  physics?: any
}

const SAFE_FABRICS: FabricProperty[] = [
  { id: '1', slug: 'velvet-280-rib', name: 'Вельвет 280 рифленый', category: 'вельвет', gsm: 280, composition: '100% Cotton', world_standard: 'ISO 1833-4', density: 280, stiffness: 0.75, roughness: 0.9, metalness: 0, is_custom: false },
  { id: '2', slug: 'velvet-stretch-320', name: 'Вельвет стрейч 320', category: 'вельвет', gsm: 320, composition: '97% Cotton 3% Elastane', world_standard: 'ISO 1833 / Pantone 19-1217', density: 320, stiffness: 0.8, roughness: 0.85, metalness: 0, is_custom: false },
  { id: '3', slug: 'denim-420-heavy', name: 'Деним 420 плотный', category: 'деним', gsm: 420, composition: '100% Cotton', world_standard: 'ISO 1833-2', density: 420, stiffness: 0.85, roughness: 0.95, metalness: 0, is_custom: false },
  { id: '4', slug: 'eco-leather-600', name: 'Кожа эко 600', category: 'кожа', gsm: 600, composition: 'PU 100%', world_standard: 'RAL 9005', density: 600, stiffness: 0.9, roughness: 0.4, metalness: 0.1, is_custom: false },
  { id: '5', slug: 'silk-natural-50', name: 'Шелк натуральный 50', category: 'шелк', gsm: 50, composition: '100% Silk', world_standard: 'ISO 1833-4', density: 50, stiffness: 0.15, roughness: 0.2, metalness: 0.1, is_custom: false },
]

export async function getFabricsFromDB(search = ''): Promise<FabricProperty[]> {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (url && key) {
      const res = await fetch(`${url}/rest/v1/fabrics?select=*&order=gsm.asc${search? `&name=ilike.*${encodeURIComponent(search)}*` : ''}`, {
        headers: { apikey: key, Authorization: `Bearer ${key}` } as any,
        cache: 'no-store'
      })
      if (res.ok) {
        const data = await res.json()
        if (data && data.length > 0) {
          return data.map((f: any) => ({
            id: f.id, slug: f.slug, name: f.name, category: f.category || 'custom',
            gsm: f.gsm || 0, composition: f.composition || '', world_standard: f.world_standard || '',
            density: f.physics?.density || f.gsm || 280,
            stiffness: f.physics?.stiffness || 0.6,
            roughness: f.physics?.roughness || 0.9,
            metalness: f.physics?.metalness || 0,
            is_custom: f.is_custom || false, physics: f.physics
          }))
        }
      }
    }
  } catch {}
  if (search) {
    const s = search.toLowerCase()
    return SAFE_FABRICS.filter(f => f.name.toLowerCase().includes(s))
  }
  return SAFE_FABRICS
}

export async function addCustomFabric(name: string, gsm: number) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url ||!key) return null
    const slug = name.toLowerCase().replace(/\s+/g, '-') + '-' + gsm + '-' + Date.now()
    const stiffness = Math.min(0.9, gsm / 700)
    const res = await fetch(`${url}/rest/v1/fabrics`, {
      method: 'POST',
      headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', Prefer: 'return=representation' } as any,
      body: JSON.stringify({
        name, slug, gsm, category: 'custom', is_custom: true,
        composition: 'Custom', world_standard: `Custom ~${gsm}gsm`,
        physics: { density: gsm, stiffness, roughness: 0.8, metalness: 0 }
      })
    })
    if (!res.ok) return null
    const data = await res.json()
    return data[0]
  } catch { return null }
}

export function getFabricStiffness(f: FabricProperty) {
  return f.stiffness
}

// для совместимости если где-то импортишь старое имя
export const FABRIC_PRESETS = SAFE_FABRICS
export async function getFabrics() { return getFabricsFromDB() }
