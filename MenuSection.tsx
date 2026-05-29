"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function FloatingSphere({ position, color, size, speed }: { position: [number,number,number], color: string, size: number, speed: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
    mesh.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
  });
  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={1.5}>
      <mesh ref={mesh} position={position}>
        <icosahedronGeometry args={[size, 2]} />
        <MeshDistortMaterial color={color} distort={0.3} speed={2} roughness={0} metalness={0.8} transparent opacity={0.7} />
      </mesh>
    </Float>
  );
}

function CoffeeRing({ position }: { position: [number,number,number] }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    mesh.current.rotation.z = state.clock.elapsedTime * 0.3;
  });
  return (
    <mesh ref={mesh} position={position}>
      <torusGeometry args={[0.6, 0.08, 16, 60]} />
      <meshStandardMaterial color="#C9A84C" metalness={1} roughness={0.1} emissive="#C9A84C" emissiveIntensity={0.3} />
    </mesh>
  );
}

function PSCross() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.4;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
  });
  return (
    <group ref={group} position={[0, 0, 0]}>
      <mesh>
        <boxGeometry args={[0.15, 1.2, 0.15]} />
        <meshStandardMaterial color="#00D4FF" metalness={0.9} roughness={0.1} emissive="#00D4FF" emissiveIntensity={0.5} />
      </mesh>
      <mesh>
        <boxGeometry args={[1.2, 0.15, 0.15]} />
        <meshStandardMaterial color="#00D4FF" metalness={0.9} roughness={0.1} emissive="#00D4FF" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#00D4FF" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#C9A84C" />
        <Stars radius={80} depth={50} count={2000} factor={3} fade speed={0.5} />
        <FloatingSphere position={[-3.5, 1.5, -2]} color="#00D4FF" size={0.4} speed={1.2} />
        <FloatingSphere position={[3.5, -1.5, -3]} color="#C9A84C" size={0.5} speed={0.8} />
        <FloatingSphere position={[2.5, 2, -1]} color="#0088AA" size={0.25} speed={1.5} />
        <FloatingSphere position={[-2, -2, -2]} color="#F0C966" size={0.3} speed={1.0} />
        <CoffeeRing position={[-3, 0, -1]} />
        <CoffeeRing position={[3, 1, -2]} />
        <PSCross />
      </Canvas>
    </div>
  );
}
