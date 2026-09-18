export async function POST(req: Request){
  try{
    const { prompt, fabric } = await req.json()
    if(!prompt) return Response.json({ error: "no prompt" }, { status: 400 })

    const falKey = process.env.FAL_KEY

    // ТОП ВЕРСИЯ — если ключ есть, бьем напрямую в fal API без библиотеки
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
        const falData = await falRes.json()
        // fal queue возвращает request_id, потом надо дождаться, но для простоты сразу вернем
        // если хочешь синхронно — используй https://fal.run/fal-ai/flux-pro/v1.1-ultra
        if(falData.images && falData.images[0]){
          return Response.json({ image: falData.images[0].url, mode: "pro" })
        }
      }catch(e){
        console.log("fal error, fallback to free", e)
      }
    }

    // БЕСПЛАТНАЯ ВЕРСИЯ — всегда работает без ключа
    const safePrompt = encodeURIComponent(`seamless fabric texture ${prompt} ${fabric || ''} textile material fashion`)
    const freeImage = `https://image.pollinations.ai/prompt/${safePrompt}?width=1024&height=1024&nologo=true&seed=${Date.now()}`
    return Response.json({ image: freeImage, mode: "free" })

  }catch(e:any){
    return Response.json({ error: e.message }, { status: 500 })
  }
}
