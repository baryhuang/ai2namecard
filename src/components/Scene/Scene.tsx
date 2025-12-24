import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import { GlassNameCard } from './GlassNameCard';
import { Lights } from './Lights';

export function Scene() {
  return (
    <div className="w-full h-full bg-black">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

        {/* Dark space background */}
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 10, 25]} />

        {/* Lights */}
        <Lights />

        {/* Main 3D object */}
        <GlassNameCard />

        {/* Floor with shadow receiver */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -2, 0]}
          receiveShadow
        >
          <planeGeometry args={[20, 20]} />
          <shadowMaterial
            opacity={0.4}
            color="#000000"
          />
        </mesh>

        {/* Subtle floor reflection */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -2.01, 0]}
        >
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial
            color="#0a0a0a"
            roughness={0.7}
            metalness={0.2}
          />
        </mesh>

        {/* Environment for reflections */}
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
