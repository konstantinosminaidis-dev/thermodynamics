import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Menu, PenLine, X } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { EXERCISES } from "@/content/exercises";
import { SECTIONS } from "@/content/sections";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export function AppShell({
  children,
  surface = "paper",
}: {
  children: ReactNode;
  surface?: "paper" | "board";
}) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hydrate = useProgress((s) => s.hydrate);
  const read = useProgress((s) => s.read);
  const exercises = useProgress((s) => s.exercises);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const doneCount = useMemo(
    () => EXERCISES.filter((e) => exercises[e.id]?.status === "done").length,
    [exercises],
  );

  const board = surface === "board";

  return (
    <div
      data-surface={surface}
      className={cn(
        "min-h-dvh",
        board ? "board-grain text-chalk" : "paper-grain text-ink",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-copper focus:px-4 focus:py-2 focus:text-cream"
      >
        Μετάβαση στο περιεχόμενο
      </a>

      <header
        className={cn(
          "sticky top-0 z-30 flex items-center gap-3 px-4 py-3 lg:hidden",
          board
            ? "border-b border-chalk/10 bg-board-2/90 backdrop-blur"
            : "border-b border-line bg-paper/90 backdrop-blur",
        )}
      >
        <button
          type="button"
          className={cn(
            "flex size-11 items-center justify-center rounded-full",
            board ? "text-chalk" : "text-ink",
          )}
          onClick={() => setOpen(true)}
          aria-label="Άνοιγμα περιεχομένων"
        >
          <Menu className="size-5" />
        </button>
        <Link to="/" className="font-serif text-lg leading-none">
          Θερμοδυναμική
        </Link>
        <span className={cn("ml-auto text-xs", board ? "text-chalk-dim" : "text-muted")}>
          Κεφ. 1
        </span>
      </header>

      {open ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-ink/40"
            aria-label="Κλείσιμο"
            onClick={() => setOpen(false)}
          />
          <aside
            className={cn(
              "absolute inset-y-0 left-0 flex w-[min(20rem,88vw)] flex-col overflow-y-auto p-4 shadow-[var(--shadow-paper)]",
              board ? "board-grain" : "bg-cream",
            )}
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="font-serif text-xl">Περιεχόμενα</p>
              <button
                type="button"
                className="flex size-11 items-center justify-center"
                onClick={() => setOpen(false)}
                aria-label="Κλείσιμο"
              >
                <X className="size-5" />
              </button>
            </div>
            <Nav doneCount={doneCount} read={read} pathname={pathname} board={board} />
          </aside>
        </div>
      ) : null}

      <div className="mx-auto flex max-w-6xl">
        <aside
          className={cn(
            "sticky top-0 hidden h-dvh w-64 shrink-0 overflow-y-auto border-r p-5 lg:block",
            board ? "border-chalk/10" : "border-line",
          )}
        >
          <Link to="/" className="block font-serif text-2xl leading-tight">
            Θερμοδυναμική
          </Link>
          <p className={cn("mt-1 text-sm", board ? "text-chalk-dim" : "text-muted")}>
            Κεφάλαιο 1 · Βασικές έννοιες
          </p>
          <div className="mt-6">
            <Nav doneCount={doneCount} read={read} pathname={pathname} board={board} />
          </div>
        </aside>

        <main id="main" className="min-w-0 flex-1 pb-24 lg:pb-10">
          {children}
        </main>
      </div>

      <nav
        className={cn(
          "fixed inset-x-0 bottom-0 z-20 grid grid-cols-2 border-t lg:hidden",
          board
            ? "border-chalk/10 bg-board-2/95 text-chalk"
            : "border-line bg-cream/95 text-ink",
        )}
      >
        <Link
          to="/notes/$slug"
          params={{ slug: "genika" }}
          className="flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs"
        >
          <BookOpen className="size-5" />
          Σημειώσεις
        </Link>
        <Link
          to="/board"
          className="flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs"
        >
          <PenLine className="size-5" />
          Πίνακας
        </Link>
      </nav>
    </div>
  );
}

function Nav({
  doneCount,
  read,
  pathname,
  board,
}: {
  doneCount: number;
  read: string[];
  pathname: string;
  board: boolean;
}) {
  return (
    <nav className="flex flex-col gap-6 text-sm">
      <div>
        <p
          className={cn(
            "mb-2 text-[11px] font-semibold uppercase tracking-[0.16em]",
            board ? "text-chalk-dim" : "text-muted",
          )}
        >
          Σημειώσεις
        </p>
        <ul className="flex flex-col">
          {SECTIONS.map((s) => {
            const href = `/notes/${s.slug}`;
            const active = pathname === href;
            const seen = read.includes(s.slug);
            return (
              <li key={s.slug}>
                <Link
                  to="/notes/$slug"
                  params={{ slug: s.slug }}
                  className={cn(
                    "flex min-h-10 items-center gap-2 rounded-lg px-2 py-1.5",
                    active
                      ? board
                        ? "bg-chalk/10 text-chalk"
                        : "bg-ink/6 text-ink"
                      : board
                        ? "text-chalk-dim hover:text-chalk"
                        : "text-ink-soft hover:text-ink",
                  )}
                >
                  <span className="w-8 font-serif text-copper">{s.num}</span>
                  <span className="flex-1">{s.title}</span>
                  {seen ? (
                    <span className="size-1.5 rounded-full bg-copper" aria-hidden />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <Link
          to="/board"
          className={cn(
            "mb-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.16em]",
            board ? "text-chalk-dim" : "text-muted",
          )}
        >
          Πίνακας
          <span className="tabular-nums">
            {doneCount}/{EXERCISES.length}
          </span>
        </Link>
        <Link
          to="/board"
          className={cn(
            "flex min-h-11 items-center gap-2 rounded-lg px-2",
            pathname.startsWith("/board")
              ? board
                ? "bg-chalk/10"
                : "bg-ink/6"
              : "",
          )}
        >
          <PenLine className="size-4 text-copper" />
          Ασκήσεις τράπεζας
        </Link>
      </div>
    </nav>
  );
}
