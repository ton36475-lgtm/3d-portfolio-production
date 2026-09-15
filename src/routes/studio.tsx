import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useCopy } from "@/lib/copy";

export const Route = createFileRoute("/studio")({ component: StudioPage });

function StudioPage() {
  const copy = useCopy();

  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6">
      <p className="text-xs tracking-[0.22em] text-muted uppercase">{copy.studio.kicker}</p>
      <h1 className="mt-4 max-w-3xl font-display text-4xl tracking-tight sm:text-6xl">
        {copy.studio.title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">{copy.studio.lede}</p>

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        <figure className="rounded-xl bg-surface p-2">
          <img
            src="/works/studio-bench.jpg"
            alt={copy.studio.bench}
            className="media-frame aspect-[4/3] w-full rounded-lg object-cover"
            crossOrigin="anonymous"
          />
          <figcaption className="px-2 py-3 text-xs tracking-widest text-muted uppercase">
            {copy.studio.bench}
          </figcaption>
        </figure>
        <figure className="rounded-xl bg-surface p-2">
          <img
            src="/works/materials.jpg"
            alt={copy.studio.materials}
            className="media-frame aspect-[4/3] w-full rounded-lg object-cover"
            crossOrigin="anonymous"
          />
          <figcaption className="px-2 py-3 text-xs tracking-widest text-muted uppercase">
            {copy.studio.materials}
          </figcaption>
        </figure>
      </div>

      <div className="mt-14 max-w-2xl space-y-5 text-base leading-relaxed text-muted">
        <p>{copy.studio.p1}</p>
        <p>{copy.studio.p2}</p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        <article className="rounded-xl bg-surface p-6 sm:p-8">
          <p className="font-display text-6xl text-accent/35">S</p>
          <h2 className="mt-4 font-display text-2xl">{copy.studio.sirawat}</h2>
          <p className="mt-1 text-xs tracking-widest text-muted uppercase">
            {copy.studio.sirawatRole}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">{copy.studio.sirawatBio}</p>
        </article>
        <article className="rounded-xl bg-surface p-6 sm:p-8">
          <p className="font-display text-6xl text-accent/35">B</p>
          <h2 className="mt-4 font-display text-2xl">{copy.studio.ball}</h2>
          <p className="mt-1 text-xs tracking-widest text-muted uppercase">
            {copy.studio.ballRole}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">{copy.studio.ballBio}</p>
        </article>
      </div>

      <div className="mt-16">
        <Button asChild size="lg">
          <Link to="/contact">{copy.cta.button}</Link>
        </Button>
      </div>
    </main>
  );
}
