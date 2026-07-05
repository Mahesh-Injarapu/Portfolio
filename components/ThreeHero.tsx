"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

function CyberObject() {
  const coreRef = useRef<THREE.Mesh>(null);
  const boxRef = useRef<THREE.Mesh>(null);
  const ringXRef = useRef<THREE.Mesh>(null);
  const ringYRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const particleCount = 200;

  const positions = useMemo(() => {
    const data = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      data[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      data[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      data[i * 3 + 2] = radius * Math.cos(phi);
    }

    return data;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    if (coreRef.current) {
      coreRef.current.rotation.x = time * 0.2 + mouseY * 0.5;
      coreRef.current.rotation.y = time * 0.3 + mouseX * 0.5;
      coreRef.current.scale.setScalar(1.05 + Math.sin(time * 2) * 0.04);
    }

    if (boxRef.current) {
      boxRef.current.rotation.x = time * 0.2 + mouseY * 0.5;
      boxRef.current.rotation.y = time * 0.3 + mouseX * 0.5;
    }

    if (ringXRef.current) {
      ringXRef.current.rotation.x = time * 0.6 + mouseY * 0.8;
      ringXRef.current.rotation.y = mouseX * 0.3;
    }

    if (ringYRef.current) {
      ringYRef.current.rotation.y = time * 0.4 + mouseX * 0.8;
      ringYRef.current.rotation.z = mouseY * 0.3;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.05;
      particlesRef.current.position.y = Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <group>
      <Sphere ref={coreRef} args={[1, 64, 64]} scale={1.1}>
        <meshStandardMaterial
          color="#bd00ff"
          emissive="#bd00ff"
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.15}
        />
      </Sphere>

      <mesh ref={boxRef} scale={1.5}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      <mesh ref={ringXRef}>
        <torusGeometry args={[1.7, 0.03, 16, 100]} />
        <meshBasicMaterial color="#00ffcc" transparent opacity={0.65} />
      </mesh>

      <mesh ref={ringYRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.9, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.55} />
      </mesh>

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00f0ff"
          size={0.035}
          sizeAttenuation
          transparent
          opacity={0.8}
        />
      </points>

      <pointLight color="#00f0ff" intensity={3} distance={5} />
    </group>
  );
}

export default function ThreeHero() {
  return (
    <div className="relative flex h-full min-h-[400px] w-full items-center justify-center md:min-h-[550px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.06)_0%,transparent_60%)]" />

      <Canvas camera={{ position: [0, 0, 4.5], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
        <directionalLight position={[-5, 5, -5]} intensity={1} color="#bd00ff" />

        <CyberObject />

        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}