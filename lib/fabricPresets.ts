// lib/fabricPresets.ts - Живая библиотека тканей DzynOS
// Тянет все из Supabase, никакого хардкода

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
}

// Для работы без Supabase на первое время - фолбэк
const FALLBACK_FABRICS: FabricProperty[] = [
  {
    id: '1', slug: 'velvet-280-rib', name: 'Вельвет 280 рифленый',
    category: 'вельвет', gsm: 280, composition: '100% Cotton',
    world_standard: 'ISO 1833-4', density: 280, stiffness: 0.75,
    roughness: 0.9, metalness: 0, is_custom: false
  },
  {
    id: '2', slug: 'denim-420-heavy', name: 'Деним 420 плотный',
    category: 'деним', gsm: 420, composition: '100% Cotton',
    world_standard: 'ISO 1833-2', density: 420, stiffness: 0.85,
    roughness: 0.95, metalness: 0, is_custom: false
  }
]

export async function getFabricsFromDB(search = ''): Promise<FabricProperty[]> {
  try {
    // Динамический импорт чтобы не ломать если нет supabase клиента
    const { supabase } = await import('./supabaseClient').catch(async () => {
      const mod = await import('@/utils/supabase/client').catch(() => null)
      return mod || { supabase: null }
    }) as any

    if (!supabase) {
      console.log('Supabase не подключен, использую фолбэк')
      return search ? FALLBACK_FABRICS.filter(f => f.name.toLowerCase().includes(search.toLowerCase())) : FALLBACK_FABRICS
    }

    let query = supabase.from('fabrics').select('*').order('gsm', { ascending: true })
    if (search) query = query.ilike('name', `%${search}%`)
    
    const { data, error } = await query
    if (error || !data) return FALLBACK_FABRICS

    return data.map((f: any) => ({
      id: f.id,
      slug: f.slug,
      name: f.name,
      category: f.category || 'custom',
      gsm: f.gsm || 0,
      composition: f.composition || '',
      world_standard: f.world_standard || '',
      density: f.physics?.density || f.gsm || 280,
      stiffness: f.physics?.stiffness || 0.6,
      roughness: f.physics?.roughness || 0.9,
      metalness: f.physics?.metalness || 0,
      is_custom: f.is_custom || false
    }))
  } catch (e) {
    return FALLBACK_FABRICS
  }
}

export async function addCustomFabric(name: string, gsm: number) {
  try {
    const { supabase } = await import('./supabaseClient') as any
    const slug = name.toLowerCase().replace(/\s+/g, '-') + '-' + gsm + '-' + Date.now()
    const stiffness = Math.min(0.9, gsm / 700)

    const { data, error } = await supabase.from('fabrics').insert({
      name, slug, gsm, category: 'custom', is_custom: true,
      composition: 'Custom',
      world_standard: `Custom • Auto-mapped ~${gsm}gsm`,
      physics: { density: gsm, stiffness, roughness: 0.8, metalness: 0 }
    }).select().single()

    if (error) throw error
    return data
  } catch (e) {
    console.error('Ошибка добавления ткани', e)
    return null
  }
}

// Для калькулятора лекал - берет жесткость ткани
export function getFabricStiffness(fabric: FabricProperty): number {
  return fabric.stiffness
    }
