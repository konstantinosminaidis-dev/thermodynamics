import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { AppShell } from "@/components/app-shell";
import { NotesBody } from "@/components/notes-body";
import { adjacentSections, getSection } from "@/content/sections";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/notes/$slug")({
  component: NotesPage,
  loader: ({ params }) => {
    const section = getSection(params.slug);
    if (!section) throw notFound();
    return { section };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.section.num} ${loaderData?.section.title} · Θερμοδυναμική` }],
  }),
});

function NotesPage() {
  const { section } = Route.useLoaderData();
  const { prev, next } = adjacentSections(section.slug);
  const markRead = useProgress((s) => s.markRead);

  useEffect(() => {
    markRead(section.slug);
  }, [markRead, section.slug]);

  return (
    <AppShell>
      <article className="mx-auto max-w-2xl px-4 py-8 sm:px-8 lg:py-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-copper">
          {section.kicker}
        </p>
        <p className="mt-3 font-serif text-copper">{section.num}</p>
        <h1 className="font-serif text-4xl leading-tight sm:text-5xl">{section.title}</h1>
        <p className="mt-4 text-lg leading-7 text-muted">{section.lead}</p>
        <div className="mt-8">
          <NotesBody blocks={section.blocks} />
        </div>

        <nav className="mt-12 flex items-stretch gap-3">
          {prev ? (
            <Link
              to="/notes/$slug"
              params={{ slug: prev.slug }}
              className="flex min-h-16 flex-1 flex-col justify-center rounded-2xl bg-cream px-4 py-3 shadow-[var(--shadow-paper)]"
            >
              <span className="inline-flex items-center gap-1 text-xs text-muted">
                <ArrowLeft className="size-3.5" /> Προηγούμενο
              </span>
              <span className="font-serif text-lg">
                {prev.num} {prev.title}
              </span>
            </Link>
          ) : (
            <span className="flex-1" />
          )}
          {next ? (
            <Link
              to="/notes/$slug"
              params={{ slug: next.slug }}
              className="flex min-h-16 flex-1 flex-col items-end justify-center rounded-2xl bg-ink px-4 py-3 text-cream shadow-[var(--shadow-paper)]"
            >
              <span className="inline-flex items-center gap-1 text-xs text-chalk-dim">
                Επόμενο <ArrowRight className="size-3.5" />
              </span>
              <span className="font-serif text-lg">
                {next.num} {next.title}
              </span>
            </Link>
          ) : (
            <Link
              to="/board"
              className="flex min-h-16 flex-1 flex-col items-end justify-center rounded-2xl bg-copper px-4 py-3 text-cream shadow-[var(--shadow-paper)]"
            >
              <span className="text-xs">Έτοιμος;</span>
              <span className="font-serif text-lg">Στον πίνακα</span>
            </Link>
          )}
        </nav>
      </article>
    </AppShell>
  );
}
