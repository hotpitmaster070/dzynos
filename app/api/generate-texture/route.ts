import { NextResponse } from "next/server"

export async function POST(req: Request){
  try{
    const { prompt, fabric } = await req.json() as { prompt?: string, fabric?: string }
    if(!prompt){
      return NextResponse.json({ error: "no prompt" }, { status: 400 })
    }

    const falKey = process.env.FAL_KEY

    // ТОП ВЕРСИЯ — если ключ есть
    if(falKey){
      try{
        const falRes = await fetch("https://queue.fal.run/fal-ai/flux-pro/v1.1-ultra", {
          method: "POST",
          headers: {
            "Authorization": `Key ${falKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            prompt: `seamless tileable fabric texture, ${prompt}, ${fabric || 'cotton'}, textile PBR material, 4k, top view, fashion design`,
            image_size: { width: 1024, height: 1024 },
            num_images: 1
          })
        })
        const falData: any = await falRes.json()
        if(falData?.images?.[0]?.url){
          return NextResponse.json({ image: falData.images[0].url, mode: "pro" })
        }
      }catch(e){
        console.log("fal error fallback", e)
      }
    }

    // БЕСПЛАТНАЯ — работает без ключа, сборка не падает
    const safePrompt = encodeURIComponent(`seamless fabric texture ${prompt} ${fabric || ''} textile material fashion`)
    const freeImage = `https://image.pollinations.ai/prompt/${safePrompt}?width=1024&height=1024&nologo=true&seed=${Date.now()}`
    return NextResponse.json({ image: freeImage, mode: "free" })

  }catch(e:any){
    return NextResponse.json({ error: e?.message || "error" }, { status: 500 })
  }
}
