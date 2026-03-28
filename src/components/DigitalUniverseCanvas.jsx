import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Cloud, Float } from '@react-three/drei';
import * as THREE from 'three';

function FloatingIsland({ position, color, scale }) {
  const mesh = useRef();

  useFrame((state) => {
    mesh.current.rotation.y += 0.005;
    mesh.current.position.y += Math.sin(state.clock.elapsedTime * 0.5 + position[1]) * 0.001;
  });

  return (
    <group ref={mesh} position={position} scale={scale}>
      <mesh>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.7} 
          metalness={0.1}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>
      <Cloud position={[0, -0.5, 0]} speed={0.1} opacity={0.4} />
    </group>
  );
}

function DigitalBuilding({ position }) {
  const group = useRef();

  useFrame((state) => {
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
  });

  return (
    <group ref={group} position={position}>
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[0.8, 2, 0.8]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00aaff" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0, 2.2, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3]} />
        <meshStandardMaterial color="#ff6b9d" emissive="#ff4081" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

function UniverseScene() {
  const { scene } = useThree();

  useEffect(() => {
    // Nebula fog
    scene.fog = new THREE.FogExp2(0x0a0a2e, 0.01);
    
    // Ambient + directional light
    const ambient = new THREE.AmbientLight(0x4040ff, 0.4);
    const directional = new THREE.DirectionalLight(0xffffff, 0.5);
    directional.position.set(1, 1, 0.5);
    scene.add(ambient, directional);
  }, [scene]);

  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={7} saturation={0} fade />
      
      {/* Floating Islands */}
      <Float speed={0.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <FloatingIsland position={[-8, 2, -5]} color="#667eea" scale={1.2} />
        <FloatingIsland position={[6, 1, -8]} color="#ff6b9d" scale={0.9} />
        <FloatingIsland position={[0, 3, 10]} color="#00d4ff" scale={1.5} />
      </Float>

      {/* Digital Buildings */}
      <DigitalBuilding position={[-3, 0, 2]} />
      <DigitalBuilding position={[4, 0, -3]} />
      <DigitalBuilding position={[0, 0, 6]} />

      {/* Central Tech Tower */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 8]} />
        <meshStandardMaterial 
          color="#00ff88" 
          emissive="#00cc66" 
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Orbiting Rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4, 0]}>
        <torusGeometry args={[5, 0.1, 8, 100]} />
        <meshStandardMaterial color="#ffaa00" emissive="#ff8800" emissiveIntensity={0.3} wireframe />
      </mesh>
    </>
  );
}

function DigitalUniverseCanvas({ className = '' }) {
  return (
    <div className={`w-full h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl ${className}`}>
      <Canvas 
        camera={{ position: [0, 2, 10], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <UniverseScene />
      </Canvas>
    </div>
  );
}

export default DigitalUniverseCanvas;

