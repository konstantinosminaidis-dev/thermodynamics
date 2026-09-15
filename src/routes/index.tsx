import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, PenLine } from "lucide-react";
import { useEffect } from "react";
import { AppShell } from "@/components/app-shell";
import { ShuttleMark } from "@/components/diagrams";
import { buttonVariants } from "@/components/ui/button";
import { EXERCISES } from "@/content/exercises";
import { SECTIONS } from "@/content/sections";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/")({ component: Home });

const GOALS = [
  "Τι μελετά η θερμοδυναμική και πού εφαρμόζεται",
  "Σύστημα, όριο, περιβάλλον — κλειστό, ανοικτό, μονωμένο, αδιαβατικό",
  "Μονάδες SI: Pa, bar, J, W και οι βασικές μορφές ενέργειας",
  "Θερμοδυναμική ισορροπία και σωστή επιλογή συστήματος",
];

function Home() {
  const hydrate = useProgress((s) => s.hydrate);
  const read = useProgress((s) => s.read);
  const exercises = useProgress((s) => s.exercises);
  const reset = useProgress((s) => s.reset);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const done = EXERCISES.filter((e) => exercises[e.id]?.status === "done").length;

  return (
    <AppShell>
      <article className="px-4 py-8 sm:px-8 lg:px-12 lg:py-12">
        <div className="rise-in grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-copper">
              Εισαγωγή στη μηχανολογία
            </p>
            <p className="mt-3 font-serif text-copper">Κεφάλαιο 1</p>
            <h1 className="mt-1 font-serif text-5xl leading-[0.95] sm:text-6xl">
              Βασικές έννοιες
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-7 text-ink-soft">
              Σύντομες διδακτικές σημειώσεις και διαδραστικός πίνακας από την τράπεζα
              θεμάτων. Ο μαθητής σηκώνεται, λύνει, ελέγχει.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/notes/$slug"
                params={{ slug: "genika" }}
                className={buttonVariants({ variant: "copper", size: "lg" })}
              >
                <BookOpen className="size-4" />
                Σημειώσεις
              </Link>
              <Link to="/board" className={buttonVariants({ variant: "ink", size: "lg" })}>
                <PenLine className="size-4" />
                Στον πίνακα
              </Link>
            </div>
          </div>
          <div className="rise-in rise-in-delay-2 mx-auto">
            <ShuttleMark className="h-48 w-32 sm:h-56 sm:w-36" />
          </div>
        </div>

        <section className="rise-in rise-in-delay-3 mt-12">
          <h2 className="font-serif text-2xl">Επιδιωκόμενοι στόχοι</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {GOALS.map((g) => (
              <li
                key={g}
                className="flex gap-3 rounded-2xl bg-cream px-4 py-3 text-sm leading-6 shadow-[var(--shadow-paper)]"
              >
                <span className="mt-2 size-2 shrink-0 rounded-full bg-copper" />
                {g}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 grid gap-3 sm:grid-cols-2">
          <Link
            to="/notes/$slug"
            params={{ slug: "genika" }}
            className="group rounded-2xl bg-cream p-5 shadow-[var(--shadow-paper)] transition-transform duration-150 active:scale-[0.99]"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-copper">
              Θεωρία
            </p>
            <h2 className="mt-1 font-serif text-2xl">Επτά σύντομες ενότητες</h2>
            <p className="mt-2 text-sm text-muted">
              {read.length}/{SECTIONS.length} διαβάστηκαν
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm text-ink">
              Διάβασε
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
          <Link
            to="/board"
            className="group rounded-2xl bg-ink p-5 text-cream shadow-[var(--shadow-paper)] transition-transform duration-150 active:scale-[0.99]"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-copper">
              Τράπεζα θεμάτων
            </p>
            <h2 className="mt-1 font-serif text-2xl">Δεκατέσσερις ασκήσεις</h2>
            <p className="mt-2 text-sm text-chalk-dim">
              {done}/{EXERCISES.length} ολοκληρώθηκαν σωστά
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm">
              Σήκω στον πίνακα
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </section>

        <ol className="mt-10 divide-y divide-line overflow-hidden rounded-2xl bg-cream shadow-[var(--shadow-paper)]">
          {SECTIONS.map((s) => (
            <li key={s.slug}>
              <Link
                to="/notes/$slug"
                params={{ slug: s.slug }}
                className="flex min-h-14 items-center gap-4 px-4 py-3 hover:bg-paper"
              >
                <span className="w-10 font-serif text-copper">{s.num}</span>
                <span className="flex-1">
                  <span className="block font-medium">{s.title}</span>
                  <span className="text-sm text-muted">{s.kicker}</span>
                </span>
                <ArrowRight className="size-4 text-muted" />
              </Link>
            </li>
          ))}
        </ol>

        {read.length + done > 0 ? (
          <button
            type="button"
            onClick={reset}
            className="mt-8 text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
          >
            Επαναφορά προόδου
          </button>
        ) : null}
      </article>
    </AppShell>
  );
}
