import { Suspense, lazy, useMemo, useState } from "react";
import { CanvasFallback } from "@/components/canvas/canvas-fallback";
import { ClientOnly } from "@/components/canvas/client-only";
import { getQuality } from "@/components/canvas/quality";
import { WebGLBoundary } from "@/components/canvas/webgl-boundary";
import type { Work } from "@/lib/works";

const HeroScene = lazy(() => import("@/components/canvas/hero-scene"));

type Props = {
  works: Work[];
  selected: string | null;
  onHover: (slug: string | null) => void;
  onSelect: (slug: string) => void;
  autoRotate?: boolean;
  enableZoom?: boolean;
  cameraZ?: number;
  label?: string;
};

export function SceneStage({
  works,
  selected,
  onHover,
  onSelect,
  autoRotate,
  enableZoom,
  cameraZ,
  label,
}: Props) {
  const [failed] = useState(false);
  const quality = useMemo(() => getQuality(), []);

  return (
    <ClientOnly fallback={<CanvasFallback label={label} />}>
      <WebGLBoundary fallback={<CanvasFallback label={label} />}>
        <Suspense fallback={<CanvasFallback label={label} />}>
          {failed ? (
            <CanvasFallback label={label} />
          ) : (
            <HeroScene
              works={works}
              quality={quality}
              selected={selected}
              onHover={onHover}
              onSelect={onSelect}
              autoRotate={autoRotate}
              enableZoom={enableZoom}
              cameraZ={cameraZ}
            />
          )}
        </Suspense>
      </WebGLBoundary>
    </ClientOnly>
  );
}
