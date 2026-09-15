import { ContactShadows, Sparkles, Text, useTexture } from "@react-three/drei";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { Quality } from "@/components/canvas/quality";
import type { Work } from "@/lib/works";

const FRAME_W = 1.72;
const FRAME_H = 1.22;

type WorldProps = {
  works: Work[];
  quality: Quality;
  selected: string | null;
  onHover: (slug: string | null) => void;
  onSelect: (slug: string) => void;
};

export function AtelierWorld({
  works,
  quality,
  selected,
  onHover,
  onSelect,
}: WorldProps) {
  const low = quality === "low";
  const poses = useMemo(() => {
    const n = works.length;
    const radius = n > 6 ? 4.85 : 4.45;
    return works.map((work, i) => {
      const a = (i / n) * Math.PI * 2;
      return {
        work,
        x: Math.sin(a) * radius,
        y: 1.32,
        z: Math.cos(a) * radius,
        rotY: a,
      };
    });
  }, [works]);

  return (
    <>
      <color attach="background" args={["#0b0b0c"]} />
      <fog attach="fog" args={["#0b0b0c", 7.5, 22]} />
      <hemisphereLight args={["#c5cdd6", "#0b0b0c", 0.32]} />
      <ambientLight intensity={0.12} />
      <spotLight
        position={[7.5, 13, 5.5]}
        angle={0.38}
        penumbra={0.9}
        intensity={low ? 48 : 78}
        color="#f1ece4"
        castShadow={!low}
        shadow-mapSize={1024}
      />
      <spotLight
        position={[-6.5, 8, -4]}
        angle={0.5}
        penumbra={1}
        intensity={22}
        color="#a8b0bc"
      />
      <pointLight position={[0, 2.6, 0]} intensity={7} distance={11} color="#e8e4dc" />

      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <circleGeometry args={[14, low ? 48 : 72]} />
        <meshStandardMaterial color="#101012" metalness={0.7} roughness={0.32} />
      </mesh>

      <mesh rotation-x={-Math.PI / 2} position={[0, 0.015, 0]}>
        <ringGeometry args={[2.08, 2.115, 80]} />
        <meshStandardMaterial color="#c5cdd6" metalness={0.82} roughness={0.28} />
      </mesh>

      <Monogram animated={!low} />

      {poses.map((pose) => (
        <WorkFrame
          key={pose.work.slug}
          work={pose.work}
          position={[pose.x, pose.y, pose.z]}
          rotation={pose.rotY}
          active={selected === pose.work.slug}
          onHover={onHover}
          onSelect={onSelect}
        />
      ))}

      {!low ? (
        <Sparkles
          count={36}
          scale={[12, 4, 12]}
          size={1.8}
          speed={0.28}
          opacity={0.35}
          color="#e8e4dc"
          position={[0, 2.2, 0]}
        />
      ) : null}

      <ContactShadows
        position={[0, 0.02, 0]}
        opacity={0.42}
        scale={18}
        blur={2.3}
        far={7}
      />
    </>
  );
}

function Monogram({ animated }: { animated: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!animated || !group.current) return;
    const d = Math.min(delta, 0.1);
    group.current.rotation.y += d * 0.12;
  });

  return (
    <group ref={group} position={[0, 1.42, 0]}>
      <mesh position={[0, -0.95, 0]} castShadow>
        <cylinderGeometry args={[0.72, 0.84, 0.58, 32]} />
        <meshStandardMaterial color="#161618" metalness={0.45} roughness={0.4} />
      </mesh>
      <Text
        fontSize={0.62}
        letterSpacing={0.04}
        anchorX="center"
        anchorY="middle"
        color="#f1ece4"
      >
        S × B
        <meshStandardMaterial
          color="#f1ece4"
          metalness={0.88}
          roughness={0.22}
          side={THREE.DoubleSide}
        />
      </Text>
    </group>
  );
}

function WorkFrame({
  work,
  position,
  rotation,
  active,
  onHover,
  onSelect,
}: {
  work: Work;
  position: [number, number, number];
  rotation: number;
  active: boolean;
  onHover: (slug: string | null) => void;
  onSelect: (slug: string) => void;
}) {
  const tex = useTexture(work.image, (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
  });
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const press = useRef<{ x: number; y: number } | null>(null);
  const lift = useRef(0);

  useFrame((_, delta) => {
    if (!group.current) return;
    const d = Math.min(delta, 0.1);
    const goal = hovered || active ? 1 : 0;
    lift.current += (goal - lift.current) * (1 - Math.exp(-10 * d));
    group.current.position.y = position[1] + lift.current * 0.12;
    const s = 1 + lift.current * 0.04;
    group.current.scale.setScalar(s);
  });

  function down(event: ThreeEvent<PointerEvent>) {
    press.current = { x: event.nativeEvent.clientX, y: event.nativeEvent.clientY };
  }

  function click(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation();
    const start = press.current;
    if (start) {
      const dx = event.nativeEvent.clientX - start.x;
      const dy = event.nativeEvent.clientY - start.y;
      if (dx * dx + dy * dy > 36) return;
    }
    onSelect(work.slug);
  }

  return (
    <group
      ref={group}
      position={position}
      rotation={[0, rotation, 0]}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
        onHover(work.slug);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        onHover(null);
        document.body.style.cursor = "auto";
      }}
      onPointerDown={down}
      onClick={click}
    >
      <mesh position={[0, 0, -0.04]} castShadow>
        <boxGeometry args={[FRAME_W + 0.1, FRAME_H + 0.1, 0.06]} />
        <meshStandardMaterial
          color={active ? "#c5cdd6" : "#1a1917"}
          metalness={0.62}
          roughness={0.32}
        />
      </mesh>
      <mesh position={[0, 0, 0.005]}>
        <planeGeometry args={[FRAME_W, FRAME_H]} />
        <meshStandardMaterial
          map={tex}
          roughness={0.72}
          metalness={0.08}
          emissive="#f1ece4"
          emissiveMap={tex}
          emissiveIntensity={hovered || active ? 0.18 : 0.08}
        />
      </mesh>
    </group>
  );
}
