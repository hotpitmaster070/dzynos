import { NextResponse } from "next/server"
import { ... } from '../../../lib/patternCalculator'

export async function POST(req: Request){
  try{
    const body = await req.json()
    const { length=90, chestWidth=48, sleeveLength=62, shoulders=48, backOpen=0, fabric, color, cost } = body

    if(!fabric){
      return NextResponse.json({ error: "no fabric" }, { status: 400 })
    }

    // Считаем лекала по твоим ползункам + физике ткани
    const pattern = calculatePatterns(
      { length, chestWidth: shoulders || chestWidth, sleeveLength, shoulders, backOpen }, 
      fabric?.stiffness || fabric?.physics?.stiffness || 0.6
    )

    return NextResponse.json({ 
      fabric, 
      color, 
      cost, 
      pattern, 
      meta: {
        gsm: fabric.gsm,
        composition: fabric.composition,
        standard: fabric.world_standard,
        timestamp: new Date().toISOString(),
        version: "DzynOS TechPack v2"
      }
    })
  }catch(e:any){
    return NextResponse.json({ error: e?.message || "techpack error" }, { status: 500 })
  }
       }
