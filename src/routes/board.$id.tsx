import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BookOpen } from "lucide-react";
import { ExerciseEngine } from "@/components/exercise-engine";
import { buttonVariants } from "@/components/ui/button";
import { adjacentExercises, getExercise, KIND_LABEL } from "@/content/exercises";
import { getSection } from "@/content/sections";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/board/$id")({
  component: BoardItem,
  loader: ({ params }) => {
    const exercise = getExercise(params.id);
    if (!exercise) throw notFound();
    return { exercise };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.exercise.title} · Πίνακας` }],
  }),
});

function BoardItem() {
  const { exercise } = Route.useLoaderData();
  const save = useProgress((s) => s.saveExercise);
  const { prev, next } = adjacentExercises(exercise.id);
  const theory = getSection(exercise.theory);

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-8 lg:py-10">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Link
          to="/board"
          className="inline-flex min-h-11 items-center gap-2 text-sm text-chalk-dim hover:text-chalk"
        >
          <ArrowLeft className="size-4" />
          Όλες οι ασκήσεις
        </Link>
        {theory ? (
          <Link
            to="/notes/$slug"
            params={{ slug: theory.slug }}
            className="ml-auto inline-flex min-h-11 items-center gap-2 text-sm text-chalk-dim hover:text-chalk"
          >
            <BookOpen className="size-4" />
            {theory.num} {theory.title}
          </Link>
        ) : null}
      </div>

      <div className="rounded-3xl border border-chalk/10 bg-board-2/50 p-4 shadow-[var(--shadow-board)] sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">
          {KIND_LABEL[exercise.kind]} · {exercise.units} μονάδες
        </p>
        <h1 className="mt-2 font-serif text-3xl text-chalk sm:text-4xl">{exercise.title}</h1>
        {exercise.stem ? (
          <p className="mt-3 text-base leading-7 text-chalk-dim">{exercise.stem}</p>
        ) : null}
        {exercise.givens ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {exercise.givens.map((g) => (
              <li
                key={g.label}
                className="rounded-full border border-chalk/15 bg-chalk/5 px-3 py-1.5 text-sm text-chalk"
              >
                <span className="font-serif text-chalk-dim">{g.label}</span>{" "}
                <span className="tabular-nums">{g.value}</span>
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-6">
          <ExerciseEngine
            key={exercise.id}
            exercise={exercise}
            onFinish={(score, max) =>
              save(exercise.id, {
                status: score === max ? "done" : "miss",
                score,
                max,
              })
            }
          />
        </div>
      </div>

      <nav className="mt-6 flex gap-2">
        {prev ? (
          <Link
            to="/board/$id"
            params={{ id: prev.id }}
            className={buttonVariants({ variant: "chalk", className: "flex-1" })}
          >
            Προηγούμενη
          </Link>
        ) : (
          <span className="flex-1" />
        )}
        {next ? (
          <Link
            to="/board/$id"
            params={{ id: next.id }}
            className={buttonVariants({ variant: "chalkSolid", className: "flex-1" })}
          >
            Επόμενη άσκηση
          </Link>
        ) : (
          <Link to="/board" className={buttonVariants({ variant: "chalkSolid", className: "flex-1" })}>
            Τέλος πίνακα
          </Link>
        )}
      </nav>
    </div>
  );
}
