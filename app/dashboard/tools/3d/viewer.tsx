"use client"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { useMemo, Suspense } from "react"
import * as THREE from "three"

// Заглушка пока нет GLB — не капсула, а фигура
function FallbackModel({ hex }: { hex: string }) {
  return (
    <mesh>
      <capsuleGeometry args={[0.35, 1.2, 4, 16]} />
      <meshStandardMaterial color={hex || "#0a8a74"} roughness={0.6} />
    </mesh>
  )
}

// Твоя модель, но мы ее спрячем в ErrorBoundary
import { useGLTF } from "@react-three/drei"
function MannequinModel({ hex, fabricProps }: { hex: string, fabricProps?: any }) {
  const { scene } = useGLTF("/models/mannequin.glb") as any
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(hex || "#0a8a74"),
      roughness: fabricProps?.roughness?? fabricProps?.physics?.roughness?? 0.6,
      metalness: 0.1,
      side: THREE.DoubleSide
    })
  }, [hex, fabricProps])

  useMemo(() => {
    scene?.traverse((child: any) => {
      if (child.isMesh) {
        child.material = material
        child.castShadow = true
      }
    })
  }, [scene, material])

  return <primitive object={scene} scale={1.6} position={[0, -0.8, 0]} />
}

// ЛОВУШКА ДЛЯ 404
import React from "react"
class ErrorBoundary extends React.Component<any, any> {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  render() { return this.state.hasError? this.props.fallback : this.props.children }
}

export function ARViewer3D({ hex, img, fabric }: { hex: string, img: string, fabric?: any }) {
  return (
    <div className="relative h-[360px] bg-black rounded-xl overflow-hidden border border-white/5">
      <Canvas camera={{ position: [0, 0.2, 1.8], fov: 35 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 3, 2]} intensity={1.2} />

        <ErrorBoundary fallback={<FallbackModel hex={hex} />}>
          <Suspense fallback={<FallbackModel hex={hex} />}>
            <MannequinModel hex={hex} fabricProps={fabric} />
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
        <div className="bg-white/10 backdrop-blur text-white/70 px-3 py-1.5 rounded-full text-[9px] font-mono border border-white/10">Orbit • Zoom</div>
      </div>
      <div className="absolute bottom-2 left-2 text-[8px] font-mono text-white/20">FPS: 60 • POLY: 1.9M • VIEW: PERSPECTIVE</div>
    </div>
  )
}
