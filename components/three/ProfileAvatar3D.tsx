"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, Torus, Sphere } from "@react-three/drei";
import * as THREE from "three";

function HolographicHead() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.4;
      outerRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.6;
      innerRef.current.rotation.z = Math.cos(t * 0.4) * 0.15;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.7;
      ring1Ref.current.rotation.y = t * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.5;
      ring2Ref.current.rotation.z = t * 0.6;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = t * 0.8;
      ring3Ref.current.rotation.z = -t * 0.4;
    }
  });

  return (
    <group>
      <Sphere ref={innerRef} args={[0.85, 32, 32]}>
        <meshStandardMaterial
          color="#001a2e"
          emissive="#00f5ff"
          emissiveIntensity={0.15}
          transparent
          opacity={0.6}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>

      <Icosahedron ref={outerRef} args={[1.1, 1]}>
        <meshBasicMaterial
          color="#00f5ff"
          wireframe
          transparent
          opacity={0.5}
        />
      </Icosahedron>

      <Torus ref={ring1Ref} args={[1.5, 0.015, 8, 60]}>
        <meshBasicMaterial color="#00f5ff" transparent opacity={0.7} />
      </Torus>

      <Torus ref={ring2Ref} args={[1.7, 0.015, 8, 60]}>
        <meshBasicMaterial color="#ff007a" transparent opacity={0.6} />
      </Torus>

      <Torus ref={ring3Ref} args={[1.9, 0.015, 8, 60]}>
        <meshBasicMaterial color="#9400ff" transparent opacity={0.5} />
      </Torus>

      <Sphere args={[0.4, 16, 16]}>
        <meshBasicMaterial color="#00f5ff" transparent opacity={0.3} />
      </Sphere>
    </group>
  );
}

function FloatingDataPoints() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  const points = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    const radius = 2.4 + Math.sin(i * 1.3) * 0.3;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(i * 0.7) * 0.8,
      z: Math.sin(angle) * radius,
      color: i % 3 === 0 ? "#00f5ff" : i % 3 === 1 ? "#ff007a" : "#9400ff",
      size: 0.04 + Math.random() * 0.04,
    };
  });

  return (
    <group ref={groupRef}>
      {points.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[p.size, 6, 6]} />
          <meshBasicMaterial color={p.color} />
        </mesh>
      ))}
    </group>
  );
}

export default function ProfileAvatar3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} color="#00f5ff" intensity={2} />
      <pointLight position={[-3, -3, -3]} color="#ff007a" intensity={1.5} />
      <pointLight position={[0, 3, -3]} color="#9400ff" intensity={1} />
      <HolographicHead />
      <FloatingDataPoints />
    </Canvas>
  );
}
