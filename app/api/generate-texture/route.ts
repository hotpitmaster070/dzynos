export async function POST(req: Request){
  try{
    const { prompt, fabric } = await req.json()
    if(!prompt) return Response.json({ error: "no prompt" }, { status: 400 })

    const falKey = process.env.FAL_KEY

    // ТОП ВЕРСИЯ — если ключ есть
    if(falKey){
      const fal = await import("@fal-ai/serverless-client")
      fal.config({ credentials: falKey })
      const result: any = await (fal as any).subscribe("fal-ai/flux-pro/v1.1-ultra", {
        input: {
          prompt: `seamless tileable fabric texture, ${prompt}, ${fabric || 'cotton'}, textile PBR material, 4k, top view, fashion design`,
          image_size: { width: 1024, height: 1024 },
          num_images: 1
        }
      })
      return Response.json({ image: result.images[0].url, mode: "pro" })
    }

    // БЕСПЛАТНАЯ ВЕРСИЯ — пока ключа нет, чтобы сборка не ломалась
    const safePrompt = encodeURIComponent(`seamless fabric texture ${prompt} ${fabric || ''} textile material`)
    const freeImage = `https://image.pollinations.ai/prompt/${safePrompt}?width=1024&height=1024&nologo=true&seed=${Date.now()}`
    return Response.json({ image: freeImage, mode: "free" })

  }catch(e:any){
    return Response.json({ error: e.message }, { status: 500 })
  }
  }
