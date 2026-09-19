"use client"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"
import { useEffect } from "react"

export function Mannequin({ hex, fabric }: { hex: string, fabric: any }) {
  const glb = useGLTF("/models/mannequin.glb")

  useEffect(() => {
    glb.scene.traverse((child: any) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(hex || "#0a8a74"),
          roughness: fabric?.physics?.roughness?? 0.6,
          metalness: 0.1,
          side: THREE.DoubleSide
        })
        child.castShadow = true
      }
    })
  }, [hex, fabric, glb])

  return <primitive object={glb.scene} scale={1.2} position={[0, -1.2, 0]} />
}

// Fallback если нет GLB
export function MannequinFallback({ hex, fabric }: { hex: string, fabric: any }) {
  return (
    <mesh>
      <capsuleGeometry args={[0.6, 1.5, 8, 16]} />
      <meshStandardMaterial
        color={hex}
        roughness={fabric?.physics?.roughness?? 0.4}
        metalness={0.1}
      />
    </mesh>
  )
}
