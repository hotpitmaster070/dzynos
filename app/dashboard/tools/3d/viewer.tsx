"use client"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { useMemo, Suspense } from "react"
import * as THREE from "three"
import React from "react"

function createMannequinGeometry(type: string) {
  const raw: any = {
    female: [[0.12,0.85],[0.22,0.75],[0.32,0.62],[0.28,0.48],[0.35,0.20],[0.36,0.0],[0.34,-0.30],[0.18,-0.60],[0.12,-0.85]],
    male: [[0.14,0.85],[0.26,0.75],[0.38,0.62],[0.33,0.45],[0.37,0.18],[0.38,0.0],[0.36,-0.30],[0.20,-0.60],[0.14,-0.85]],
    child: [[0.10,0.60],[0.18,0.52],[0.24,0.40],[0.22,0.28],[0.26,0.12],[0.27,0.0],[0.25,-0.20],[0.15,-0.40],[0.10,-0.55]],
  }
  // СГЛАЖИВАНИЕ — вот чего не хватало на скрине
  const curve = new THREE.CatmullRomCurve2D(
    raw[type].map((p:any)=> new THREE.Vector2(p[0], p[1]))
  )
  const points = curve.getPoints(60)
  const radial = 64
  const geo = new THREE.BufferGeometry()
  const pos:number[]=[], uv:number[]=[], idx:number[]=[]
  for(let i=0;i<points.length;i++){
    for(let j=0;j<=radial;j++){
      const theta=(j/radial)*Math.PI*2
      pos.push(points[i].x*Math.cos(theta), points[i].y, points[i].x*Math.sin(theta))
      uv.push(j/radial, i/(points.length-1))
    }
  }
  for(let i=0;i<points.length-1;i++){
    for(let j=0;j<radial;j++){
      const a=i*(radial+1)+j, b=(i+1)*(radial+1)+j, c=(i+1)*(radial+1)+j+1, d=i*(radial+1)+j+1
      idx.push(a,b,d, b,c,d)
    }
  }
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos,3))
  geo.setAttribute("uv", new THREE.Float32BufferAttribute(uv,2))
  geo.setIndex(idx)
  geo.computeVertexNormals()
  return geo
}

function SmartMannequin({ hex, fabric, type }: any) {
  const geometry = useMemo(()=>createMannequinGeometry(type), [type])
  const f = (fabric||"").toLowerCase()
  const isSilk = f.includes("silk") || f.includes("satin") || f.includes("шелк")
  return (
    <mesh geometry={geometry} position={[0, -0.1, 0]}>
      <meshPhysicalMaterial color={hex || "#111"} roughness={isSilk?0.25:0.75} clearcoat={isSilk?1:0} clearcoatRoughness={0.2} />
    </mesh>
  )
}

function FallbackModel({ hex }: any) {
  return (<mesh><capsuleGeometry args={[0.35,1.2,4,16]} /><meshStandardMaterial color={hex||"#0a8a74"} /></mesh>)
}
class ErrorBoundary extends React.Component<any,any> {
  state={hasError:false}; static getDerivedStateFromError(){return {hasError:true}}
  render(){return this.state.hasError? this.props.fallback : this.props.children}
}

export function ARViewer3D({ hex, img, fabric, type="female" }: any) {
  return (
    <div className="relative h-[480px] bg-[#080808] rounded-2xl overflow-hidden border border-white/10">
      <Canvas camera={{position:[0,0.2,1.8], fov:35}} dpr={[1,2]} gl={{antialias:true, alpha:true}}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[2,4,2]} intensity={1.2} />
        <ErrorBoundary fallback={<FallbackModel hex={hex} />}><Suspense fallback={<FallbackModel hex={hex} />}>
          <SmartMannequin hex={hex} fabric={fabric} type={type} />
        </Suspense></ErrorBoundary>
        <OrbitControls enablePan={false} minDistance={1} maxDistance={3} target={[0,0.1,0]} />
        <Environment preset="studio" />
      </Canvas>
      {img && <div className="absolute top-2 right-2 w-16 h-16 rounded-lg overflow-hidden border border-[#2dd4bf]/50"><img src={img} alt="tex" className="w-full h-full object-cover" /></div>}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        <div className="bg-[#2dd4bf] text-black px-4 py-1.5 rounded-full font-bold text-[10px]">👓 AR 1:1</div>
        <div className="bg-white/10 backdrop-blur text-white/70 px-3 py-1.5 rounded-full text-[9px] font-mono border border-white/10">Orbit • Zoom • {type}</div>
      </div>
    </div>
  )
}
export default ARViewer3D
