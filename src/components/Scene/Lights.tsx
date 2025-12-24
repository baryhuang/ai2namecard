import { useSceneStore } from '../../stores/sceneStore';

export function Lights() {
  const lighting = useSceneStore((state) => state.sceneParams.lighting);

  return (
    <>
      {/* Ambient light - minimal base illumination for dark space */}
      <ambientLight intensity={0.2} />

      {/* Directional light - key light from top with shadows */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={lighting.directional * 0.8}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Spotlight - dramatic accent lighting with shadow */}
      <spotLight
        position={[0, 6, 4]}
        angle={0.6}
        penumbra={1}
        intensity={2.0}
        color={lighting.spotlightColor}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Point light - inner glow behind card */}
      <pointLight position={[0, 0, -1]} intensity={0.8} color="#00d9ff" />

      {/* Rim lights for depth and glass edges */}
      <pointLight position={[-4, 1, 2]} intensity={0.5} color="#0066ff" />
      <pointLight position={[4, 1, 2]} intensity={0.5} color="#00ffff" />

      {/* Bottom fill light to illuminate glass from below */}
      <pointLight position={[0, -1, 2]} intensity={0.3} color="#4466ff" />
    </>
  );
}
