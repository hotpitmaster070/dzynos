// lib/fabricPresets.ts — безопасная версия без импорта supabaseClient
export type FabricPreset = {
  id: string
  name: string
  description: string
  gsm: number
  stretch: number
  bend: number
  density: number
  texture_url?: string
}

export const FABRIC_PRESETS: FabricPreset[] = [
  { id: 'cotton-180', name: 'Cotton 180', description: 'Легкий хлопок', gsm: 180, stretch: 0.1, bend: 0.8, density: 1 },
  { id: 'cotton-240', name: 'Cotton 240', description: 'Плотный хлопок', gsm: 240, stretch: 0.05, bend: 0.9, density: 1.2 },
  { id: 'silk-80', name: 'Silk 80', description: 'Шелк', gsm: 80, stretch: 0.3, bend: 0.3, density: 0.6 },
  { id: 'velvet-280', name: 'Вельвет 280', description: 'Вельвет тяжелый', gsm: 280, stretch: 0.02, bend: 1.2, density: 1.4 },
  { id: 'denim-340', name: 'Denim 340', description: 'Джинса', gsm: 340, stretch: 0.01, bend: 1.5, density: 1.6 },
]

export async function getFabrics(): Promise<FabricPreset[]> {
  try {
    // Пытаемся взять из Supabase если он есть
    const mod = await import('@/utils/supabase/client').catch(() => null) as any
    const supabase = mod?.supabase || mod?.createClient?.() || null
    if (supabase) {
      const { data } = await supabase.from('fabrics').select('*')
      if (data && data.length > 0) return data as FabricPreset[]
    }
  } catch {}
  return FABRIC_PRESETS
  }
