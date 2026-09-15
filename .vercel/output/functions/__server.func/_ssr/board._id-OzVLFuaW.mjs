import { i as __toESM } from "../_runtime.mjs";
import { a as adjacentExercises, c as getSection, r as KIND_LABEL } from "./sections-OnhCT_Ug.mjs";
import { B as require_react, b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Lightbulb, d as ChevronRight, f as Check, g as ArrowLeft, i as RotateCcw, m as BookOpen, t as X } from "../_libs/lucide-react.mjs";
import { a as useProgress, i as parseNumber, n as cn, r as nearlyEqual, t as AppShell } from "./app-shell-CwA8eR2P.mjs";
import { r as Route$1 } from "./router-D5R8d6XK.mjs";
import { n as buttonVariants, t as Button } from "./button-C2Vvcfd3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/board._id-OzVLFuaW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var GREEK = {
	a: "α",
	b: "β",
	c: "γ",
	d: "δ",
	e: "ε",
	f: "στ"
};
function letter(id) {
	return GREEK[id] ?? id;
}
function emptyAnswer(item) {
	switch (item.kind) {
		case "mc": return { mc: null };
		case "tf": return { tf: null };
		case "match": return { match: {} };
		case "blank": return { blank: item.answers.map(() => null) };
		case "calc": return { calc: "" };
	}
}
function isFilled(item, a) {
	switch (item.kind) {
		case "mc": return Boolean(a.mc);
		case "tf": return a.tf !== null && a.tf !== void 0;
		case "match": return Object.keys(a.match ?? {}).length === item.left.length;
		case "blank": return (a.blank ?? []).every(Boolean);
		case "calc": return parseNumber(a.calc ?? "") !== null;
	}
}
function isCorrect(item, a) {
	switch (item.kind) {
		case "mc": return a.mc === item.answer;
		case "tf": return a.tf === item.answer;
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
			return nearlyEqual(n, item.answer, item.tolerance ?? .02);
		}
	}
}
function ExerciseEngine({ exercise, onFinish }) {
	const [step, setStep] = (0, import_react.useState)(0);
	const [answers, setAnswers] = (0, import_react.useState)(() => exercise.items.map(emptyAnswer));
	const [checked, setChecked] = (0, import_react.useState)(false);
	const [results, setResults] = (0, import_react.useState)(() => exercise.items.map(() => null));
	const [hint, setHint] = (0, import_react.useState)(false);
	const item = exercise.items[step];
	const answer = answers[step];
	const last = step === exercise.items.length - 1;
	const ready = isFilled(item, answer);
	const ok = results[step];
	function patch(next) {
		setAnswers((prev) => prev.map((a, i) => i === step ? next : a));
	}
	function check() {
		const correct = isCorrect(item, answer);
		const next = results.map((r, i) => i === step ? correct : r);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.14em] text-chalk-dim",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Βήμα ",
						step + 1,
						" από ",
						exercise.items.length
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1 rounded-full bg-chalk/30" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: exercise.code })
				]
			}),
			exercise.givens ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-wrap gap-2",
				children: exercise.givens.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-full border border-chalk/15 bg-chalk/5 px-3 py-1.5 text-sm text-chalk",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-serif text-chalk-dim",
							children: g.label
						}),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums",
							children: g.value
						})
					]
				}, g.label))
			}) : null,
			exercise.stem && step === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-serif text-xl leading-snug text-chalk",
				children: exercise.stem
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemView, {
				item,
				answer,
				checked,
				onChange: patch
			}),
			item.kind === "calc" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setHint((h) => !h),
				className: "inline-flex min-h-11 items-center gap-2 self-start text-sm text-chalk-dim",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { className: "size-4 text-copper" }), hint ? "Απόκρυψη υπόδειξης" : "Υπόδειξη"]
			}),
			hint && item.kind === "calc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "rounded-xl border border-chalk/15 bg-chalk/5 px-4 py-3 text-sm text-chalk",
				children: [item.hint, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 block font-serif text-base text-copper",
					children: item.formula
				})]
			}) : null,
			checked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("rounded-2xl border px-4 py-3", ok ? "border-correct/40 bg-correct/10" : "border-wrong/40 bg-wrong/10"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-2 font-medium",
					children: [ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-correct" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4 text-wrong" }), ok ? "Σωστά" : "Όχι ακριβώς"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm leading-6 text-chalk",
					children: item.explain
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [!checked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "chalkSolid",
					onClick: check,
					disabled: !ready,
					children: "Έλεγχος"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [!ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "chalk",
					onClick: retry,
					children: "Διόρθωση"
				}) : null, !last ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "chalkSolid",
					onClick: next,
					children: ["Επόμενο", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "self-center text-sm text-chalk-dim",
					children: [
						"Βαθμός:",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums text-chalk",
							children: [
								results.filter(Boolean).length,
								"/",
								exercise.items.length
							]
						})
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "chalk",
					onClick: resetAll,
					className: "ml-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), "Από την αρχή"]
				})]
			})
		]
	});
}
function ItemView({ item, answer, checked, onChange }) {
	switch (item.kind) {
		case "mc": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(McView, {
			item,
			value: answer.mc ?? null,
			checked,
			onChange: (mc) => onChange({ mc })
		});
		case "tf": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TfView, {
			item,
			value: answer.tf ?? null,
			checked,
			onChange: (tf) => onChange({ tf })
		});
		case "match": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchView, {
			item,
			value: answer.match ?? {},
			checked,
			onChange: (match) => onChange({ match })
		});
		case "blank": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlankView, {
			item,
			value: answer.blank ?? item.answers.map(() => null),
			checked,
			onChange: (blank) => onChange({ blank })
		});
		case "calc": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalcView, {
			item,
			value: answer.calc ?? "",
			checked,
			onChange: (calc) => onChange({ calc })
		});
	}
}
function McView({ item, value, checked, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
		className: "flex flex-col gap-2",
		disabled: checked,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
			className: "mb-3 font-serif text-2xl leading-snug text-chalk",
			children: item.prompt
		}), item.options.map((opt) => {
			const selected = value === opt.id;
			const correct = checked && opt.id === item.answer;
			const wrong = checked && selected && opt.id !== item.answer;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onChange(opt.id),
				className: cn("flex min-h-14 items-center gap-3 rounded-2xl border px-3 py-3 text-left transition-colors duration-150", selected && !checked && "border-chalk/40 bg-chalk/10", !selected && !checked && "border-chalk/15 bg-board-2/40 hover:border-chalk/30", correct && "border-correct/50 bg-correct/15", wrong && "border-wrong/50 bg-wrong/15", checked && !correct && !wrong && "opacity-50"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("flex size-10 shrink-0 items-center justify-center rounded-full font-serif text-lg", correct ? "bg-correct text-board" : wrong ? "bg-wrong text-board" : "bg-chalk/10 text-chalk"),
					children: letter(opt.id)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-base",
					children: opt.text
				})]
			}, opt.id);
		})]
	});
}
function TfView({ item, value, checked, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "font-serif text-2xl leading-snug text-chalk",
		children: item.prompt
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-5 grid grid-cols-2 gap-2",
		children: [{
			v: true,
			label: "Σωστό"
		}, {
			v: false,
			label: "Λάθος"
		}].map((opt) => {
			const selected = value === opt.v;
			const correct = checked && opt.v === item.answer;
			const wrong = checked && selected && opt.v !== item.answer;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: checked,
				onClick: () => onChange(opt.v),
				className: cn("flex min-h-16 items-center justify-center rounded-2xl border font-serif text-2xl transition-colors duration-150", selected && !checked && "border-chalk/40 bg-chalk/10", !selected && !checked && "border-chalk/15 bg-board-2/40", correct && "border-correct/50 bg-correct/15", wrong && "border-wrong/50 bg-wrong/15"),
				children: opt.label
			}, opt.label);
		})
	})] });
}
function MatchView({ item, value, checked, onChange }) {
	const [picked, setPicked] = (0, import_react.useState)(null);
	const usedRight = new Set(Object.values(value));
	function pickLeft(id) {
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
	function pickRight(id) {
		if (checked || !picked) return;
		const next = { ...value };
		for (const [l, r] of Object.entries(next)) if (r === id) delete next[l];
		next[picked] = id;
		onChange(next);
		setPicked(null);
	}
	const connected = item.left.filter((l) => value[l.id]);
	const remainingLeft = item.left.filter((l) => !value[l.id]);
	const remainingRight = item.right.filter((r) => !usedRight.has(r.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-serif text-2xl leading-snug text-chalk",
				children: item.prompt
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-chalk-dim",
				children: "Πάτησε αριστερά, μετά δεξιά. Πάτησε ξανά ένα ζεύγος για να το λύσεις."
			}),
			connected.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-2",
				children: connected.map((l) => {
					const r = item.right.find((x) => x.id === value[l.id]);
					const good = checked && value[l.id] === item.pairs[l.id];
					const bad = checked && value[l.id] !== item.pairs[l.id];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: checked,
						onClick: () => pickLeft(l.id),
						className: cn("flex w-full items-stretch gap-2 rounded-2xl border text-left", good && "border-correct/50 bg-correct/10", bad && "border-wrong/50 bg-wrong/10", !checked && "border-chalk/20 bg-chalk/5"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex min-h-14 flex-1 items-center gap-2 px-3 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", {
									className: "font-serif text-copper",
									children: [l.id, "."]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: l.text })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex items-center px-1 text-chalk-dim",
								children: "→"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex min-h-14 flex-1 items-center gap-2 px-3 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", {
									className: "font-serif text-copper",
									children: [letter(r?.id ?? ""), "."]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r?.text })]
							})
						]
					}) }, l.id);
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Column, {
					title: "Στήλη Α",
					items: remainingLeft,
					picked,
					onPick: pickLeft,
					disabled: checked,
					numbering: "id"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Column, {
					title: "Στήλη Β",
					items: remainingRight,
					picked: null,
					onPick: pickRight,
					disabled: checked || !picked,
					numbering: "letter",
					waiting: Boolean(picked) && !checked
				})]
			})
		]
	});
}
function Column({ title, items, picked, onPick, disabled, numbering, waiting }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-2xl border border-chalk/10 p-2", waiting && "border-copper/40"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-chalk-dim",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "flex flex-col gap-1.5",
			children: [items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				disabled,
				onClick: () => onPick(it.id),
				className: cn("flex min-h-12 w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm", picked === it.id ? "bg-copper text-cream" : "bg-chalk/8 hover:bg-chalk/14", disabled && picked !== it.id && "opacity-70"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
					className: "w-5 font-serif",
					children: numbering === "letter" ? `${letter(it.id)}.` : `${it.id}.`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: it.text })]
			}) }, it.id)), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "px-3 py-4 text-sm text-chalk-dim",
				children: "—"
			}) : null]
		})]
	});
}
function BlankView({ item, value, checked, onChange }) {
	const [picked, setPicked] = (0, import_react.useState)(null);
	const usedCount = (0, import_react.useMemo)(() => {
		const map = {};
		for (const v of value) {
			if (!v) continue;
			map[v] = (map[v] ?? 0) + 1;
		}
		return map;
	}, [value]);
	const maxCount = (0, import_react.useMemo)(() => {
		const map = {};
		for (const w of item.bank) map[w] = 0;
		for (const a of item.answers) map[a] = (map[a] ?? 0) + 1;
		for (const w of item.bank) if (!map[w]) map[w] = 1;
		for (const a of item.answers) if ((map[a] ?? 0) < 1) map[a] = 1;
		return map;
	}, [item]);
	function place(index) {
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
	function pickWord(word) {
		if (checked) return;
		if ((usedCount[word] ?? 0) >= (maxCount[word] ?? 1)) return;
		setPicked(word);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-chalk-dim",
				children: item.prompt
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-serif text-xl leading-9 text-chalk",
				children: item.textBefore.map((chunk, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [chunk, i < item.answers.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => place(i),
					className: cn("mx-1 inline-flex min-h-10 min-w-24 items-center justify-center rounded-lg border px-2 align-baseline text-base font-sans", !value[i] && "border-dashed border-chalk/30 text-chalk-dim", value[i] && !checked && "border-chalk/30 bg-chalk/10", checked && value[i] === item.answers[i] && "border-correct/50 bg-correct/15 text-correct", checked && value[i] !== item.answers[i] && "border-wrong/50 bg-wrong/15 text-wrong"),
					children: value[i] ?? "…"
				}) : null] }, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-chalk-dim",
				children: "Τράπεζα λέξεων"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: item.bank.map((word) => {
					const spent = (maxCount[word] ?? 1) - (usedCount[word] ?? 0) <= 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: checked || spent,
						onClick: () => pickWord(word),
						className: cn("min-h-11 rounded-full border px-3 text-sm", picked === word && !spent ? "border-copper bg-copper text-cream" : "border-chalk/20 bg-chalk/8", spent && "opacity-30"),
						children: word
					}, word);
				})
			})] })
		]
	});
}
function CalcView({ item, value, checked, onChange }) {
	const good = checked && isCorrect(item, { calc: value });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-serif text-2xl leading-snug text-chalk",
			children: item.prompt
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "mt-5 block",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-chalk-dim",
				children: "Απάντηση"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value,
					onChange: (e) => onChange(e.target.value),
					disabled: checked,
					inputMode: "decimal",
					placeholder: "π.χ. 25",
					className: cn("h-14 w-full rounded-2xl border bg-board-2/60 px-4 font-serif text-3xl text-chalk outline-none placeholder:text-chalk/25", !checked && "border-chalk/20 focus:border-copper", checked && good && "border-correct/50", checked && !good && "border-wrong/50")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "shrink-0 font-serif text-xl text-chalk-dim",
					children: item.unit
				})]
			})]
		}),
		checked && !good ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-sm text-chalk-dim",
			children: [
				"Σωστό:",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "tabular-nums text-chalk",
					children: [
						item.answer.toLocaleString("el-GR"),
						" ",
						item.unit
					]
				})
			]
		}) : null
	] });
}
function BoardItem() {
	const { exercise } = Route$1.useLoaderData();
	const save = useProgress((s) => s.saveExercise);
	const { prev, next } = adjacentExercises(exercise.id);
	const theory = getSection(exercise.theory);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		surface: "board",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-2xl px-4 py-6 sm:px-8 lg:py-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/board",
						className: "inline-flex min-h-11 items-center gap-2 text-sm text-chalk-dim hover:text-chalk",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Όλες οι ασκήσεις"]
					}), theory ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/notes/$slug",
						params: { slug: theory.slug },
						className: "ml-auto inline-flex min-h-11 items-center gap-2 text-sm text-chalk-dim hover:text-chalk",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4" }),
							theory.num,
							" ",
							theory.title
						]
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[1.6rem] border border-chalk/10 bg-board-2/50 p-4 shadow-[var(--shadow-board)] sm:p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-copper",
							children: [
								KIND_LABEL[exercise.kind],
								" · ",
								exercise.units,
								" μονάδες"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 font-serif text-3xl text-chalk sm:text-4xl",
							children: exercise.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExerciseEngine, {
								exercise,
								onFinish: (score, max) => save(exercise.id, {
									status: score === max ? "done" : "miss",
									score,
									max
								})
							}, exercise.id)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "mt-6 flex gap-2",
					children: [prev ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/board/$id",
						params: { id: prev.id },
						className: buttonVariants({
							variant: "chalk",
							className: "flex-1"
						}),
						children: "Προηγούμενη"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1" }), next ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/board/$id",
						params: { id: next.id },
						className: buttonVariants({
							variant: "chalkSolid",
							className: "flex-1"
						}),
						children: "Επόμενη άσκηση"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/board",
						className: buttonVariants({
							variant: "chalkSolid",
							className: "flex-1"
						}),
						children: "Τέλος πίνακα"
					})]
				})
			]
		})
	});
}
//#endregion
export { BoardItem as component };
