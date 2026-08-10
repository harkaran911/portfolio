"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
  const mesh = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const count = 800;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;

      const colorChoice = Math.random();
      if (colorChoice < 0.5) {
        col[i * 3] = 0; col[i * 3 + 1] = 0.96; col[i * 3 + 2] = 1;
      } else if (colorChoice < 0.75) {
        col[i * 3] = 1; col[i * 3 + 1] = 0; col[i * 3 + 2] = 0.48;
      } else {
        col[i * 3] = 0.58; col[i * 3 + 1] = 0; col[i * 3 + 2] = 1;
      }
    }
    return [pos, col];
  }, []);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    mesh.current.rotation.y = t * 0.04;
    mesh.current.rotation.x = Math.sin(t * 0.02) * 0.1;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
        <bufferAttribute args={[colors, 3]} attach="attributes-color" />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

function GridLines() {
  const lines = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const verts: number[] = [];
    const step = 2;
    const size = 20;

    for (let i = -size; i <= size; i += step) {
      verts.push(-size, -5, i, size, -5, i);
      verts.push(i, -5, -size, i, -5, size);
    }

    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(verts), 3));
    return geo;
  }, []);

  return (
    <lineSegments geometry={lines}>
      <lineBasicMaterial color="#00f5ff" opacity={0.08} transparent />
    </lineSegments>
  );
}

export default function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 75 }}
      style={{ position: "absolute", inset: 0 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <Particles />
      <GridLines />
    </Canvas>
  );
}
