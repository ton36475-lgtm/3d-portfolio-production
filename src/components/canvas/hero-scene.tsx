import { OrbitControls, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { AtelierWorld } from "@/components/canvas/atelier-world";
import type { Quality } from "@/components/canvas/quality";
import type { Work } from "@/lib/works";

type Props = {
  works: Work[];
  quality: Quality;
  selected: string | null;
  onHover: (slug: string | null) => void;
  onSelect: (slug: string) => void;
  autoRotate?: boolean;
  enableZoom?: boolean;
  cameraZ?: number;
};

export default function HeroScene({
  works,
  quality,
  selected,
  onHover,
  onSelect,
  autoRotate = true,
  enableZoom = false,
  cameraZ = 7.4,
}: Props) {
  const low = quality === "low";

  return (
    <Canvas
      shadows={!low}
      dpr={low ? 1 : [1, 1.75]}
      gl={{
        antialias: !low,
        alpha: false,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 1.72, cameraZ], fov: 42, near: 0.1, far: 42 }}
      onCreated={({ gl }) => {
        gl.setClearColor("#0b0b0c");
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.08;
      }}
      style={{ touchAction: "none" }}
    >
      <AtelierWorld
        works={works}
        quality={quality}
        selected={selected}
        onHover={onHover}
        onSelect={onSelect}
      />
      <OrbitControls
        enablePan={false}
        enableZoom={enableZoom}
        enableDamping
        dampingFactor={0.055}
        autoRotate={autoRotate && !low}
        autoRotateSpeed={0.32}
        minDistance={5}
        maxDistance={12}
        minPolarAngle={Math.PI / 3.15}
        maxPolarAngle={Math.PI / 2.08}
        target={[0, 1.05, 0]}
      />
      <Preload all />
    </Canvas>
  );
}
