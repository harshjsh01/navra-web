'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

export default function Prism() {
  const meshRef = useRef();
  const purpleLight = useRef();
  const uvLight = useRef();
  const crimsonLight = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      // Rotation based on mouse interaction
      const targetX = state.pointer.y * 0.5;
      const targetY = state.pointer.x * 0.5;
      
      meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.1;
      meshRef.current.rotation.y += (targetY - meshRef.current.rotation.y) * 0.1;
    }

    if (purpleLight.current && uvLight.current && crimsonLight.current) {
      // Follow the pointer with some offsets to create dynamic refractions
      const x = state.pointer.x * 5;
      const y = state.pointer.y * 5;
      
      purpleLight.current.position.lerp(new THREE.Vector3(x + 2, y + 2, 2), 0.1);
      uvLight.current.position.lerp(new THREE.Vector3(x - 2, y - 2, 2), 0.1);
      crimsonLight.current.position.lerp(new THREE.Vector3(x, y + 3, 3), 0.1);
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight ref={purpleLight} color="#9D4EDD" intensity={10} distance={10} />
      <pointLight ref={uvLight} color="#7B2CBF" intensity={10} distance={10} />
      <pointLight ref={crimsonLight} color="#E0115F" intensity={10} distance={10} />

      <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
        <mesh ref={meshRef} position={[0, 0, 0]}>
          <octahedronGeometry args={[2, 0]} />
          <MeshTransmissionMaterial 
            backside
            backsideThickness={1}
            thickness={2}
            chromaticAberration={1}
            anisotropy={0.5}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            ior={1.5}
            color="#ffffff"
            transparent={true}
          />
        </mesh>
      </Float>
    </>
  );
}
