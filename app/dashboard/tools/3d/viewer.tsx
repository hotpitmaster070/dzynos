"use client"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { useMemo, Suspense } from "react"
import * as THREE from "three"
import React from "react"

const CONFIG = {
  female: { shoulder: 0.42, waist: 0.28, hip: 0.38 },
  male: { shoulder: 0.50, waist: 0.36, hip: 0.38 },
  child: { shoulder: 0.30, waist: 0.24, hip: 0.28 },
}

// УМНЫЙ МАНЕКЕН — 1 файл на все ♀/♂/Child
function SmartMannequin({ hex, fabric, type = "female" }: { hex: string, fabric?: any, type?: "female"|"male"|"child" }) {
  const c = CONFIG[type]
  const bodyGeo = useMemo(() => {
    const points = [
      new THREE.Vector2(0.01, 0),
      new THREE.Vector2(c.waist * 0.5, 0.2),
      new THREE.Vector2(c.hip * 0.6, 0.5),
      new THREE.Vector2(c.waist * 0.5, 0.9),
      new THREE.Vector2(c.shoulder * 0.5, 1.3),
    ]
    const g = new THREE.LatheGeometry(points, 24)
    g.computeVertexNormals()
    return g
  }, [c])
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(hex || "#111111"),
    roughness: 0.4,
    metalness: 0.1,
    side: THREE.FrontSide
  }), [hex, fabric])
  return (
    <group position={[0, -0.8, 0]}>
      <mesh geometry={bodyGeo} material={material} />
    </group>
  )
}

function FallbackModel({ hex }: { hex: string }) {
  return (
    <mesh>
      <capsuleGeometry args={[0.35, 1.2, 4, 16]} />
      <meshStandardMaterial color={hex || "#0a8a74"} roughness={0.6} />
    </mesh>
  )
}

class ErrorBoundary extends React.Component<any, any> {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  render() { return this.state.hasError? this.props.fallback : this.props.children }
}

export function ARViewer3D({ hex, img, fabric, type = "female" }: { hex: string, img: string, fabric?: any, type?: "female"|"male"|"child" }) {
  return (
    <div className="relative h-[360px] bg-black rounded-xl overflow-hidden border border-white/5">
      <Canvas camera={{ position: [0, 0.2, 1.8], fov: 35 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 3, 2]} intensity={1.2} />
        <ErrorBoundary fallback={<FallbackModel hex={hex} />}>
          <Suspense fallback={<FallbackModel hex={hex} />}>
            <SmartMannequin hex={hex} fabric={fabric} type={type} />
          </Suspense>
        </ErrorBoundary>
        <OrbitControls enablePan={false} minDistance={1} maxDistance={3} />
        <Environment preset="studio" />
      </Canvas>

      {img && (
        <div className="absolute top-2 right-2 w-16 h-16 rounded-lg overflow-hidden border border-[#2dd4bf]/50">
          <img src={img} alt="texture" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        <div className="bg-[#2dd4bf] text-black px-4 py-1.5 rounded-full font-bold text-[10px]">👓 AR 1:1</div>
        <div className="bg-white/10 backdrop-blur text-white/70 px-3 py-1.5 rounded-full text-[9px] font-mono border border-white/10">Orbit • Zoom • {type}</div>
      </div>
      <div className="absolute bottom-2 left-2 text-[8px] font-mono text-white/20">DzynOS • POLY: 6K • SMART: ON</div>
    </div>
  )
}

export default ARViewer3D
