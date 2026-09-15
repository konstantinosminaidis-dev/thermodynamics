import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ChevronRight } from "lucide-react";
import { EXERCISES, GROUPS, KIND_LABEL } from "@/content/exercises";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/board/")({
  component: BoardIndex,
  head: () => ({ meta: [{ title: "Πίνακας ασκήσεων · Θερμοδυναμική" }] }),
});

function BoardIndex() {
  const results = useProgress((s) => s.exercises);
  const done = EXERCISES.filter((e) => results[e.id]?.status === "done").length;

  return (
    <div className="px-4 py-8 sm:px-8 lg:px-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-copper">
        Τράπεζα θεμάτων
      </p>
      <h1 className="mt-2 font-serif text-4xl text-chalk sm:text-5xl">Ο πίνακας</h1>
      <p className="mt-3 max-w-xl text-chalk-dim">
        Σήκω και λύσε. Πολλαπλή επιλογή, αντιστοίχιση, κενά, σωστό/λάθος και υπολογιστικά —
        όπως στην εξέταση, με άμεσο έλεγχο.
      </p>
      <p className="mt-4 text-sm tabular-nums text-chalk-dim">
        {done} από {EXERCISES.length} σωστά ολοκληρωμένες
      </p>

      <div className="mt-10 flex flex-col gap-10">
        {GROUPS.map((g) => {
          const items = EXERCISES.filter((e) => e.group === g.id);
          return (
            <section key={g.id}>
              <h2 className="font-serif text-2xl text-chalk">{g.title}</h2>
              <p className="mt-1 text-sm text-chalk-dim">{g.blurb}</p>
              <ul className="mt-4 grid gap-2">
                {items.map((ex) => {
                  const res = results[ex.id];
                  return (
                    <li key={ex.id}>
                      <Link
                        to="/board/$id"
                        params={{ id: ex.id }}
                        className={cn(
                          "flex min-h-16 items-center gap-3 rounded-2xl border px-4 py-3 transition-colors duration-150",
                          res?.status === "done"
                            ? "border-correct/30 bg-correct/8"
                            : res?.status === "miss"
                              ? "border-wrong/25 bg-wrong/8"
                              : "border-chalk/12 bg-chalk/5 hover:border-chalk/25",
                        )}
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] uppercase tracking-[0.14em] text-chalk-dim">
                            {KIND_LABEL[ex.kind]} · {ex.code} · {ex.units} μον.
                          </p>
                          <p className="truncate font-serif text-xl text-chalk">{ex.title}</p>
                        </div>
                        {res?.status === "done" ? (
                          <Check className="size-5 text-correct" />
                        ) : (
                          <ChevronRight className="size-5 text-chalk-dim" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
