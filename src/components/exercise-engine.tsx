import { Check, ChevronRight, Lightbulb, RotateCcw, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type {
  BlankItem,
  CalcItem,
  Choice,
  Exercise,
  Item,
  MatchItem,
  McItem,
  TfItem,
} from "@/content/exercises";
import { cn, nearlyEqual, parseNumber } from "@/lib/utils";

const GREEK: Record<string, string> = {
  a: "α",
  b: "β",
  c: "γ",
  d: "δ",
  e: "ε",
  f: "στ",
};

function letter(id: string) {
  return GREEK[id] ?? id;
}

type Answers = {
  mc?: string | null;
  tf?: boolean | null;
  match?: Record<string, string>;
  blank?: (string | null)[];
  calc?: string;
};

function emptyAnswer(item: Item): Answers {
  switch (item.kind) {
    case "mc":
      return { mc: null };
    case "tf":
      return { tf: null };
    case "match":
      return { match: {} };
    case "blank":
      return { blank: item.answers.map(() => null) };
    case "calc":
      return { calc: "" };
  }
}

function isFilled(item: Item, a: Answers) {
  switch (item.kind) {
    case "mc":
      return Boolean(a.mc);
    case "tf":
      return a.tf !== null && a.tf !== undefined;
    case "match":
      return Object.keys(a.match ?? {}).length === item.left.length;
    case "blank":
      return (a.blank ?? []).every(Boolean);
    case "calc":
      return parseNumber(a.calc ?? "") !== null;
  }
}

function isCorrect(item: Item, a: Answers) {
  switch (item.kind) {
    case "mc":
      return a.mc === item.answer;
    case "tf":
      return a.tf === item.answer;
    case "match": {
      const pairs = a.match ?? {};
      return item.left.every((l) => pairs[l.id] === item.pairs[l.id]);
    }
    case "blank": {
      const slots = a.blank ?? [];
      return item.answers.every((ans, i) => slots[i] === ans);
    }
    case "calc": {
      const n = parseNumber(a.calc ?? "");
      if (n === null) return false;
      return nearlyEqual(n, item.answer, item.tolerance ?? 0.02);
    }
  }
}

export function ExerciseEngine({
  exercise,
  onFinish,
}: {
  exercise: Exercise;
  onFinish: (score: number, max: number) => void;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers[]>(() =>
    exercise.items.map(emptyAnswer),
  );
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState<(boolean | null)[]>(
    () => exercise.items.map(() => null),
  );
  const [hint, setHint] = useState(false);

  const item = exercise.items[step];
  const answer = answers[step];
  const last = step === exercise.items.length - 1;
  const ready = isFilled(item, answer);
  const ok = results[step];

  function patch(next: Answers) {
    setAnswers((prev) => prev.map((a, i) => (i === step ? next : a)));
  }

  function check() {
    const correct = isCorrect(item, answer);
    const next = results.map((r, i) => (i === step ? correct : r));
    setResults(next);
    setChecked(true);
    if (last) {
      const score = next.filter(Boolean).length;
      onFinish(score, exercise.items.length);
    }
  }

  function retry() {
    setChecked(false);
    setHint(false);
  }

  function next() {
    setChecked(false);
    setHint(false);
    setStep((s) => Math.min(s + 1, exercise.items.length - 1));
  }

  function resetAll() {
    setStep(0);
    setAnswers(exercise.items.map(emptyAnswer));
    setChecked(false);
    setResults(exercise.items.map(() => null));
    setHint(false);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.14em] text-chalk-dim">
        <span>
          Βήμα {step + 1} από {exercise.items.length}
        </span>
        <span className="size-1 rounded-full bg-chalk/30" />
        <span>{exercise.code}</span>
      </div>

      {exercise.givens ? (
        <ul className="flex flex-wrap gap-2">
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

      {exercise.stem && step === 0 ? (
        <p className="font-serif text-xl leading-snug text-chalk">{exercise.stem}</p>
      ) : null}

      {exercise.givens ? (
        <ul className="flex flex-wrap gap-2">
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

      {exercise.stem && step === 0 ? (
        <p className="font-serif text-xl leading-snug text-chalk">{exercise.stem}</p>
      ) : null}

      {exercise.givens ? (
        <ul className="flex flex-wrap gap-2">
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

      {exercise.stem && step === 0 ? (
        <p className="font-serif text-xl leading-snug text-chalk">{exercise.stem}</p>
      ) : null}

      {exercise.givens ? (
        <ul className="flex flex-wrap gap-2">
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

      {exercise.stem && step === 0 ? (
        <p className="font-serif text-xl leading-snug text-chalk">{exercise.stem}</p>
      ) : null}

      <ItemView
        item={item}
        answer={answer}
        checked={checked}
        onChange={patch}
      />

      {item.kind === "calc" && (
        <button
          type="button"
          onClick={() => setHint((h) => !h)}
          className="inline-flex min-h-11 items-center gap-2 self-start text-sm text-chalk-dim"
        >
          <Lightbulb className="size-4 text-copper" />
          {hint ? "Απόκρυψη υπόδειξης" : "Υπόδειξη"}
        </button>
      )}

      {hint && item.kind === "calc" ? (
        <p className="rounded-xl border border-chalk/15 bg-chalk/5 px-4 py-3 text-sm text-chalk">
          {item.hint}
          <span className="mt-1 block font-serif text-base text-copper">{item.formula}</span>
        </p>
      ) : null}

      {checked ? (
        <div
          className={cn(
            "rounded-2xl border px-4 py-3",
            ok ? "border-correct/40 bg-correct/10" : "border-wrong/40 bg-wrong/10",
          )}
        >
          <p className="flex items-center gap-2 font-medium">
            {ok ? <Check className="size-4 text-correct" /> : <X className="size-4 text-wrong" />}
            {ok ? "Σωστά" : "Όχι ακριβώς"}
          </p>
          <p className="mt-1 text-sm leading-6 text-chalk">{item.explain}</p>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-2">
        {!checked ? (
          <Button variant="chalkSolid" onClick={check} disabled={!ready}>
            Έλεγχος
          </Button>
        ) : (
          <>
            {!ok ? (
              <Button variant="chalk" onClick={retry}>
                Διόρθωση
              </Button>
            ) : null}
            {!last ? (
              <Button variant="chalkSolid" onClick={next}>
                Επόμενο
                <ChevronRight className="size-4" />
              </Button>
            ) : (
              <p className="self-center text-sm text-chalk-dim">
                Βαθμός:{" "}
                <span className="tabular-nums text-chalk">
                  {results.filter(Boolean).length}/{exercise.items.length}
                </span>
              </p>
            )}
          </>
        )}
        <Button variant="chalk" onClick={resetAll} className="ml-auto">
          <RotateCcw className="size-4" />
          Από την αρχή
        </Button>
      </div>
    </div>
  );
}

function ItemView({
  item,
  answer,
  checked,
  onChange,
}: {
  item: Item;
  answer: Answers;
  checked: boolean;
  onChange: (a: Answers) => void;
}) {
  switch (item.kind) {
    case "mc":
      return <McView item={item} value={answer.mc ?? null} checked={checked} onChange={(mc) => onChange({ mc })} />;
    case "tf":
      return <TfView item={item} value={answer.tf ?? null} checked={checked} onChange={(tf) => onChange({ tf })} />;
    case "match":
      return (
        <MatchView
          item={item}
          value={answer.match ?? {}}
          checked={checked}
          onChange={(match) => onChange({ match })}
        />
      );
    case "blank":
      return (
        <BlankView
          item={item}
          value={answer.blank ?? item.answers.map(() => null)}
          checked={checked}
          onChange={(blank) => onChange({ blank })}
        />
      );
    case "calc":
      return (
        <CalcView
          item={item}
          value={answer.calc ?? ""}
          checked={checked}
          onChange={(calc) => onChange({ calc })}
        />
      );
  }
}

function McView({
  item,
  value,
  checked,
  onChange,
}: {
  item: McItem;
  value: string | null;
  checked: boolean;
  onChange: (id: string) => void;
}) {
  return (
    <fieldset className="flex flex-col gap-2" disabled={checked}>
      <legend className="mb-3 font-serif text-2xl leading-snug text-chalk">{item.prompt}</legend>
      {item.options.map((opt) => {
        const selected = value === opt.id;
        const correct = checked && opt.id === item.answer;
        const wrong = checked && selected && opt.id !== item.answer;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={cn(
              "flex min-h-14 items-center gap-3 rounded-2xl border px-3 py-3 text-left transition-colors duration-150",
              selected && !checked && "border-chalk/40 bg-chalk/10",
              !selected && !checked && "border-chalk/15 bg-board-2/40 hover:border-chalk/30",
              correct && "border-correct/50 bg-correct/15",
              wrong && "border-wrong/50 bg-wrong/15",
              checked && !correct && !wrong && "opacity-50",
            )}
          >
            <span
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-full font-serif text-lg",
                correct ? "bg-correct text-board" : wrong ? "bg-wrong text-board" : "bg-chalk/10 text-chalk",
              )}
            >
              {letter(opt.id)}
            </span>
            <span className="text-base">{opt.text}</span>
          </button>
        );
      })}
    </fieldset>
  );
}

function TfView({
  item,
  value,
  checked,
  onChange,
}: {
  item: TfItem;
  value: boolean | null;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div>
      <p className="font-serif text-2xl leading-snug text-chalk">{item.prompt}</p>
      <div className="mt-5 grid grid-cols-2 gap-2">
        {(
          [
            { v: true, label: "Σωστό" },
            { v: false, label: "Λάθος" },
          ] as const
        ).map((opt) => {
          const selected = value === opt.v;
          const correct = checked && opt.v === item.answer;
          const wrong = checked && selected && opt.v !== item.answer;
          return (
            <button
              key={opt.label}
              type="button"
              disabled={checked}
              onClick={() => onChange(opt.v)}
              className={cn(
                "flex min-h-16 items-center justify-center rounded-2xl border font-serif text-2xl transition-colors duration-150",
                selected && !checked && "border-chalk/40 bg-chalk/10",
                !selected && !checked && "border-chalk/15 bg-board-2/40",
                correct && "border-correct/50 bg-correct/15",
                wrong && "border-wrong/50 bg-wrong/15",
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MatchView({
  item,
  value,
  checked,
  onChange,
}: {
  item: MatchItem;
  value: Record<string, string>;
  checked: boolean;
  onChange: (v: Record<string, string>) => void;
}) {
  const [picked, setPicked] = useState<string | null>(null);
  const usedRight = new Set(Object.values(value));

  function pickLeft(id: string) {
    if (checked) return;
    if (value[id]) {
      const next = { ...value };
      delete next[id];
      onChange(next);
      setPicked(id);
      return;
    }
    setPicked(id);
  }

  function pickRight(id: string) {
    if (checked || !picked) return;
    const next = { ...value };
    for (const [l, r] of Object.entries(next)) {
      if (r === id) delete next[l];
    }
    next[picked] = id;
    onChange(next);
    setPicked(null);
  }

  const connected = item.left.filter((l) => value[l.id]);
  const remainingLeft = item.left.filter((l) => !value[l.id]);
  const remainingRight = item.right.filter((r) => !usedRight.has(r.id));

  return (
    <div className="flex flex-col gap-4">
      <p className="font-serif text-2xl leading-snug text-chalk">{item.prompt}</p>
      <p className="text-sm text-chalk-dim">
        Πάτησε αριστερά, μετά δεξιά. Πάτησε ξανά ένα ζεύγος για να το λύσεις.
      </p>

      {connected.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {connected.map((l) => {
            const r = item.right.find((x) => x.id === value[l.id]);
            const good = checked && value[l.id] === item.pairs[l.id];
            const bad = checked && value[l.id] !== item.pairs[l.id];
            return (
              <li key={l.id}>
                <button
                  type="button"
                  disabled={checked}
                  onClick={() => pickLeft(l.id)}
                  className={cn(
                    "flex w-full items-stretch gap-2 rounded-2xl border text-left",
                    good && "border-correct/50 bg-correct/10",
                    bad && "border-wrong/50 bg-wrong/10",
                    !checked && "border-chalk/20 bg-chalk/5",
                  )}
                >
                  <span className="flex min-h-14 flex-1 items-center gap-2 px-3 py-2">
                    <b className="font-serif text-copper">{l.id}.</b>
                    <span>{l.text}</span>
                  </span>
                  <span className="flex items-center px-1 text-chalk-dim">→</span>
                  <span className="flex min-h-14 flex-1 items-center gap-2 px-3 py-2">
                    <b className="font-serif text-copper">{letter(r?.id ?? "")}.</b>
                    <span>{r?.text}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}

      <div className="grid gap-3 md:grid-cols-2">
        <Column
          title="Στήλη Α"
          items={remainingLeft}
          picked={picked}
          onPick={pickLeft}
          disabled={checked}
          numbering="id"
        />
        <Column
          title="Στήλη Β"
          items={remainingRight}
          picked={null}
          onPick={pickRight}
          disabled={checked || !picked}
          numbering="letter"
          waiting={Boolean(picked) && !checked}
        />
      </div>
    </div>
  );
}

function Column({
  title,
  items,
  picked,
  onPick,
  disabled,
  numbering,
  waiting,
}: {
  title: string;
  items: Choice[];
  picked: string | null;
  onPick: (id: string) => void;
  disabled: boolean;
  numbering: "id" | "letter";
  waiting?: boolean;
}) {
  return (
    <div className={cn("rounded-2xl border border-chalk/10 p-2", waiting && "border-copper/40")}>
      <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-chalk-dim">
        {title}
      </p>
      <ul className="flex flex-col gap-1.5">
        {items.map((it) => (
          <li key={it.id}>
            <button
              type="button"
              disabled={disabled}
              onClick={() => onPick(it.id)}
              className={cn(
                "flex min-h-12 w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm",
                picked === it.id ? "bg-copper text-cream" : "bg-chalk/8 hover:bg-chalk/14",
                disabled && picked !== it.id && "opacity-70",
              )}
            >
              <b className="w-5 font-serif">
                {numbering === "letter" ? `${letter(it.id)}.` : `${it.id}.`}
              </b>
              <span>{it.text}</span>
            </button>
          </li>
        ))}
        {items.length === 0 ? (
          <li className="px-3 py-4 text-sm text-chalk-dim">—</li>
        ) : null}
      </ul>
    </div>
  );
}

function BlankView({
  item,
  value,
  checked,
  onChange,
}: {
  item: BlankItem;
  value: (string | null)[];
  checked: boolean;
  onChange: (v: (string | null)[]) => void;
}) {
  const [picked, setPicked] = useState<string | null>(null);

  const usedCount = useMemo(() => {
    const map: Record<string, number> = {};
    for (const v of value) {
      if (!v) continue;
      map[v] = (map[v] ?? 0) + 1;
    }
    return map;
  }, [value]);

  const maxCount = useMemo(() => {
    const map: Record<string, number> = {};
    for (const w of item.bank) map[w] = 0;
    for (const a of item.answers) map[a] = (map[a] ?? 0) + 1;
    for (const w of item.bank) if (!map[w]) map[w] = 1;
    for (const a of item.answers) if ((map[a] ?? 0) < 1) map[a] = 1;
    return map;
  }, [item]);

  function place(index: number) {
    if (checked) return;
    if (value[index]) {
      const next = [...value];
      next[index] = null;
      onChange(next);
      return;
    }
    if (!picked) return;
    const next = [...value];
    next[index] = picked;
    onChange(next);
  }

  function pickWord(word: string) {
    if (checked) return;
    if ((usedCount[word] ?? 0) >= (maxCount[word] ?? 1)) return;
    setPicked(word);
  }

  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-chalk-dim">{item.prompt}</p>
      <p className="font-serif text-xl leading-[2.75rem] text-chalk">
        {item.textBefore.map((chunk, i) => (
          <span key={i}>
            {chunk}
            {i < item.answers.length ? (
              <button
                type="button"
                onClick={() => place(i)}
                className={cn(
                  "mx-1 inline-flex min-h-10 min-w-28 items-center justify-center rounded-lg border px-2 align-middle font-sans text-base",
                  !value[i] && "border-dashed border-chalk/30 text-chalk-dim",
                  value[i] && !checked && "border-chalk/30 bg-chalk/10",
                  checked && value[i] === item.answers[i] && "border-correct/50 bg-correct/15 text-correct",
                  checked && value[i] !== item.answers[i] && "border-wrong/50 bg-wrong/15 text-wrong",
                )}
              >
                {value[i] ?? "…"}
              </button>
            ) : null}
          </span>
        ))}
      </p>
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-chalk-dim">
          Τράπεζα λέξεων
        </p>
        <div className="flex flex-wrap gap-2">
          {item.bank.map((word) => {
            const left = (maxCount[word] ?? 1) - (usedCount[word] ?? 0);
            const spent = left <= 0;
            return (
              <button
                key={word}
                type="button"
                disabled={checked || spent}
                onClick={() => pickWord(word)}
                className={cn(
                  "min-h-11 rounded-full border px-3 text-sm",
                  picked === word && !spent
                    ? "border-copper bg-copper text-cream"
                    : "border-chalk/20 bg-chalk/8",
                  spent && "opacity-30",
                )}
              >
                {word}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CalcView({
  item,
  value,
  checked,
  onChange,
}: {
  item: CalcItem;
  value: string;
  checked: boolean;
  onChange: (v: string) => void;
}) {
  const good = checked && isCorrect(item, { calc: value });
  return (
    <div>
      <p className="font-serif text-2xl leading-snug text-chalk">{item.prompt}</p>
      <label className="mt-5 block">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-chalk-dim">
          Απάντηση
        </span>
        <div className="mt-2 flex items-center gap-2">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={checked}
            inputMode="decimal"
            placeholder="π.χ. 25"
            className={cn(
              "h-14 w-full rounded-2xl border bg-board-2/60 px-4 font-serif text-3xl text-chalk outline-none placeholder:text-chalk/25",
              !checked && "border-chalk/20 focus:border-copper",
              checked && good && "border-correct/50",
              checked && !good && "border-wrong/50",
            )}
          />
          <span className="shrink-0 font-serif text-xl text-chalk-dim">{item.unit}</span>
        </div>
      </label>
      {checked && !good ? (
        <p className="mt-2 text-sm text-chalk-dim">
          Σωστό:{" "}
          <span className="tabular-nums text-chalk">
            {item.answer.toLocaleString("el-GR")} {item.unit}
          </span>
        </p>
      ) : null}
    </div>
  );
}
