import { i as __toESM } from "../_runtime.mjs";
import { i as SECTIONS, t as EXERCISES } from "./sections-OnhCT_Ug.mjs";
import { B as require_react, b as require_jsx_runtime, d as useRouterState, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as BookOpen, o as PenLine, s as Menu, t as X } from "../_libs/lucide-react.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-CwA8eR2P.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEY = "thermo-ch1-progress-v1";
function persist(partial) {
	try {
		localStorage.setItem(KEY, JSON.stringify(partial));
	} catch {}
}
var useProgress = create((set, get) => ({
	hydrated: false,
	read: [],
	exercises: {},
	hydrate: () => {
		if (get().hydrated) return;
		try {
			const raw = localStorage.getItem(KEY);
			if (raw) {
				const parsed = JSON.parse(raw);
				set({
					hydrated: true,
					read: Array.isArray(parsed.read) ? parsed.read : [],
					exercises: parsed.exercises ?? {}
				});
				return;
			}
		} catch {}
		set({ hydrated: true });
	},
	markRead: (slug) => {
		const read = get().read.includes(slug) ? get().read : [...get().read, slug];
		set({ read });
		persist({
			read,
			exercises: get().exercises
		});
	},
	saveExercise: (id, result) => {
		const exercises = {
			...get().exercises,
			[id]: result
		};
		set({ exercises });
		persist({
			read: get().read,
			exercises
		});
	},
	reset: () => {
		set({
			read: [],
			exercises: {}
		});
		persist({
			read: [],
			exercises: {}
		});
	}
}));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function parseNumber(raw) {
	const match = raw.trim().replace(/\s/g, "").replace(",", ".").match(/-?\d+(?:\.\d+)?/);
	if (!match) return null;
	const value = Number(match[0]);
	return Number.isFinite(value) ? value : null;
}
function nearlyEqual(a, b, tolerance = .02) {
	if (b === 0) return Math.abs(a) <= tolerance;
	return Math.abs(a - b) / Math.abs(b) <= tolerance || Math.abs(a - b) <= .51;
}
function AppShell({ children, surface = "paper" }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const hydrate = useProgress((s) => s.hydrate);
	const read = useProgress((s) => s.read);
	const exercises = useProgress((s) => s.exercises);
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [pathname]);
	const doneCount = (0, import_react.useMemo)(() => EXERCISES.filter((e) => exercises[e.id]?.status === "done").length, [exercises]);
	const board = surface === "board";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-surface": surface,
		className: cn("min-h-dvh", board ? "board-grain text-chalk" : "paper-grain text-ink"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-copper focus:px-4 focus:py-2 focus:text-cream",
				children: "Μετάβαση στο περιεχόμενο"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: cn("sticky top-0 z-30 flex items-center gap-3 px-4 py-3 lg:hidden", board ? "border-b border-chalk/10 bg-board-2/90 backdrop-blur" : "border-b border-line bg-paper/90 backdrop-blur"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: cn("flex size-11 items-center justify-center rounded-full", board ? "text-chalk" : "text-ink"),
						onClick: () => setOpen(true),
						"aria-label": "Άνοιγμα περιεχομένων",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "font-serif text-lg leading-none",
						children: "Θερμοδυναμική"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("ml-auto text-xs", board ? "text-chalk-dim" : "text-muted"),
						children: "Κεφ. 1"
					})
				]
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-40 lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "absolute inset-0 bg-ink/40",
					"aria-label": "Κλείσιμο",
					onClick: () => setOpen(false)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: cn("absolute inset-y-0 left-0 flex w-[min(20rem,88vw)] flex-col overflow-y-auto p-4 shadow-[var(--shadow-paper)]", board ? "board-grain" : "bg-cream"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-serif text-xl",
							children: "Περιεχόμενα"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "flex size-11 items-center justify-center",
							onClick: () => setOpen(false),
							"aria-label": "Κλείσιμο",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {
						doneCount,
						read,
						pathname,
						board
					})]
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: cn("sticky top-0 hidden h-dvh w-64 shrink-0 overflow-y-auto border-r p-5 lg:block", board ? "border-chalk/10" : "border-line"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "block font-serif text-2xl leading-tight",
							children: "Θερμοδυναμική"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: cn("mt-1 text-sm", board ? "text-chalk-dim" : "text-muted"),
							children: "Κεφάλαιο 1 · Βασικές έννοιες"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {
								doneCount,
								read,
								pathname,
								board
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					id: "main",
					className: "min-w-0 flex-1 pb-24 lg:pb-10",
					children
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: cn("fixed inset-x-0 bottom-0 z-20 grid grid-cols-2 border-t lg:hidden", board ? "border-chalk/10 bg-board-2/95 text-chalk" : "border-line bg-cream/95 text-ink"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/notes/$slug",
					params: { slug: "genika" },
					className: "flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-5" }), "Σημειώσεις"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/board",
					className: "flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "size-5" }), "Πίνακας"]
				})]
			})
		]
	});
}
function Nav({ doneCount, read, pathname, board }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: "flex flex-col gap-6 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: cn("mb-2 text-[11px] font-semibold uppercase tracking-[0.16em]", board ? "text-chalk-dim" : "text-muted"),
			children: "Σημειώσεις"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-col",
			children: SECTIONS.map((s) => {
				const active = pathname === `/notes/${s.slug}`;
				const seen = read.includes(s.slug);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/notes/$slug",
					params: { slug: s.slug },
					className: cn("flex min-h-10 items-center gap-2 rounded-lg px-2 py-1.5", active ? board ? "bg-chalk/10 text-chalk" : "bg-ink/6 text-ink" : board ? "text-chalk-dim hover:text-chalk" : "text-ink-soft hover:text-ink"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-8 font-serif text-copper",
							children: s.num
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex-1",
							children: s.title
						}),
						seen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "size-1.5 rounded-full bg-copper",
							"aria-hidden": true
						}) : null
					]
				}) }, s.slug);
			})
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/board",
			className: cn("mb-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.16em]", board ? "text-chalk-dim" : "text-muted"),
			children: ["Πίνακας", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "tabular-nums",
				children: [
					doneCount,
					"/",
					EXERCISES.length
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/board",
			className: cn("flex min-h-11 items-center gap-2 rounded-lg px-2", pathname.startsWith("/board") ? board ? "bg-chalk/10" : "bg-ink/6" : ""),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "size-4 text-copper" }), "Ασκήσεις τράπεζας"]
		})] })]
	});
}
//#endregion
export { useProgress as a, parseNumber as i, cn as n, nearlyEqual as r, AppShell as t };
