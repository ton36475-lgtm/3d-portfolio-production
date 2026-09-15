import { createFileRoute, Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { SceneStage } from "@/components/scene-stage";
import { Button } from "@/components/ui/button";
import { useCopy, useLocale } from "@/lib/copy";
import { loc, WORKS } from "@/lib/works";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gallery")({ component: GalleryPage });

function GalleryPage() {
  const copy = useCopy();
  const lang = useLocale();
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const selectedWork = useMemo(
    () => WORKS.find((work) => work.slug === selected),
    [selected],
  );

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelected(null);
        return;
      }
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      const current = selected ?? hovered ?? WORKS[0]?.slug;
      if (!current) return;
      const index = WORKS.findIndex((work) => work.slug === current);
      const dir = event.key === "ArrowRight" ? 1 : -1;
      const next = WORKS[(index + dir + WORKS.length) % WORKS.length];
      setSelected(next.slug);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hovered, selected]);

  return (
    <main className="relative h-[100svh] min-h-[560px] overflow-hidden bg-background">
      <SceneStage
        works={WORKS}
        selected={selected}
        onHover={setHovered}
        onSelect={setSelected}
        autoRotate={!selected}
        enableZoom
        cameraZ={8.4}
        label={copy.gallery.loading}
      />
      <div className="pointer-events-none absolute inset-x-0 top-16 z-10 px-4 pt-6 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-start justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.22em] text-muted uppercase">
              {copy.gallery.kicker}
            </p>
            <h1 className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">
              {copy.gallery.title}
            </h1>
          </div>
          <p className="hidden max-w-xs text-right text-xs tracking-widest text-muted uppercase sm:block">
            {copy.gallery.hint}
          </p>
        </div>
      </div>

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 z-20 px-3 pb-3 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[22rem] sm:px-0 sm:pb-0",
          "transition-[opacity,transform] duration-250 ease-out",
          selectedWork
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0",
        )}
      >
        {selectedWork ? (
          <article className="rounded-xl bg-background/92 p-3 shadow-[var(--shadow-border)] sm:p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs tracking-widest text-muted uppercase">
                  {selectedWork.year} · {loc(selectedWork.location, lang)}
                </p>
                <h2 className="mt-1 font-display text-2xl tracking-tight">
                  {loc(selectedWork.title, lang)}
                </h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="size-11 shrink-0 px-0"
                aria-label={copy.gallery.close}
                onClick={() => setSelected(null)}
              >
                <X className="size-4" />
              </Button>
            </div>
            <div className="mt-3 overflow-hidden rounded-md">
              <img
                src={selectedWork.image}
                alt={loc(selectedWork.title, lang)}
                className="media-frame aspect-[4/3] w-full object-cover"
                crossOrigin="anonymous"
              />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {loc(selectedWork.excerpt, lang)}
            </p>
            <Button asChild className="mt-4 w-full">
              <Link to="/work/$slug" params={{ slug: selectedWork.slug }}>
                {copy.gallery.open}
              </Link>
            </Button>
          </article>
        ) : null}
      </div>
    </main>
  );
}
