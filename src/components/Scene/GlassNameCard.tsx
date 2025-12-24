import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { useSceneStore } from '../../stores/sceneStore';

export function GlassNameCard() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const sceneParams = useSceneStore((state) => state.sceneParams);

  // Smooth transition refs
  const currentRotation = useRef(0);
  const currentFloat = useRef(0);
  const time = useRef(0);

  // Material with smooth transitions - Enhanced glass look
  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      transmission: 0.95, // High transmission for glass effect
      thickness: 0.8,
      roughness: 0.1,
      metalness: 0.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      ior: 1.5,
      envMapIntensity: 2.0,
      color: new THREE.Color(sceneParams.color.primary),
      transparent: true,
      opacity: 0.3, // More transparent
      reflectivity: 0.9,
    });
  }, [sceneParams.color.primary]);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;

    time.current += delta;

    // Limited rotation oscillation (-30 to +30 degrees)
    const maxRotation = Math.PI / 6; // 30 degrees
    const targetRotation =
      Math.sin(time.current * sceneParams.animation.rotationSpeed * 10) * maxRotation;
    currentRotation.current += (targetRotation - currentRotation.current) * 0.05;
    groupRef.current.rotation.y = currentRotation.current;

    // Floating animation
    const targetFloat =
      Math.sin(time.current * sceneParams.animation.floatSpeed * 10) *
      sceneParams.animation.floatAmplitude;
    currentFloat.current += (targetFloat - currentFloat.current) * 0.05;
    groupRef.current.position.y = currentFloat.current;
  });

  return (
    <group ref={groupRef}>
      {/* Main glass card */}
      <RoundedBox
        ref={meshRef}
        args={[4, 2.5, 0.1]}
        radius={0.05}
        smoothness={4}
        material={glassMaterial}
        castShadow
        receiveShadow
      />

      {/* Main text */}
      <Text
        position={[0, 0.3, 0.1]}
        fontSize={0.6}
        color={sceneParams.color.glow}
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
        outlineWidth={0.02}
        outlineColor={sceneParams.color.accent}
      >
        {sceneParams.text}
      </Text>

      {/* Subtitle */}
      <Text
        position={[0, -0.4, 0.1]}
        fontSize={0.25}
        color={sceneParams.color.accent}
        anchorX="center"
        anchorY="middle"
      >
        {sceneParams.subtitle}
      </Text>

      {/* Pattern overlay */}
      {sceneParams.pattern.type === 'grid' && <GridPattern />}
      {sceneParams.pattern.type === 'particles' && <ParticlePattern />}
    </group>
  );
}

function GridPattern() {
  const sceneParams = useSceneStore((state) => state.sceneParams);

  return (
    <mesh position={[0, 0, 0.06]}>
      <planeGeometry args={[3.8, 2.3, 20, 15]} />
      <meshBasicMaterial
        color={sceneParams.color.glow}
        wireframe
        transparent
        opacity={0.2 * sceneParams.pattern.density}
      />
    </mesh>
  );
}

function ParticlePattern() {
  const sceneParams = useSceneStore((state) => state.sceneParams);
  const particlesRef = useRef<THREE.Points>(null);

  const particlePositions = useMemo(() => {
    const count = Math.floor(50 * sceneParams.pattern.density);
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }

    return positions;
  }, [sceneParams.pattern.density]);

  useFrame((state) => {
    if (!particlesRef.current) return;

    if (sceneParams.pattern.movement === 'pulsing') {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      particlesRef.current.scale.setScalar(scale);
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    return geo;
  }, [particlePositions]);

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        color={sceneParams.color.glow}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}
