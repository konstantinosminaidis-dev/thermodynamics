import { i as __toESM } from "../_runtime.mjs";
import { i as SECTIONS, t as EXERCISES } from "./sections-OnhCT_Ug.mjs";
import { B as require_react, b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as ArrowRight, m as BookOpen, o as PenLine } from "../_libs/lucide-react.mjs";
import { a as useProgress, t as AppShell } from "./app-shell-CwA8eR2P.mjs";
import { n as buttonVariants } from "./button-C2Vvcfd3.mjs";
import { n as ShuttleMark } from "./diagrams-09Z6_RFs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-ChkbGDGX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var GOALS = [
	"Τι μελετά η θερμοδυναμική και πού εφαρμόζεται",
	"Σύστημα, όριο, περιβάλλον — κλειστό, ανοικτό, μονωμένο, αδιαβατικό",
	"Μονάδες SI: Pa, bar, J, W και οι βασικές μορφές ενέργειας",
	"Θερμοδυναμική ισορροπία και σωστή επιλογή συστήματος"
];
function Home() {
	const hydrate = useProgress((s) => s.hydrate);
	const read = useProgress((s) => s.read);
	const exercises = useProgress((s) => s.exercises);
	const reset = useProgress((s) => s.reset);
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	const done = EXERCISES.filter((e) => exercises[e.id]?.status === "done").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "px-4 py-8 sm:px-8 lg:px-12 lg:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rise-in grid items-center gap-8 lg:grid-cols-[1fr_auto]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-semibold uppercase tracking-[0.2em] text-copper",
						children: "Εισαγωγή στη μηχανολογία"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-serif text-copper",
						children: "Κεφάλαιο 1"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 font-serif text-5xl leading-[0.95] sm:text-6xl",
						children: "Βασικές έννοιες"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-xl text-lg leading-7 text-ink-soft",
						children: "Σύντομες διδακτικές σημειώσεις και διαδραστικός πίνακας από την τράπεζα θεμάτων. Ο μαθητής σηκώνεται, λύνει, ελέγχει."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-7 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/notes/$slug",
							params: { slug: "genika" },
							className: buttonVariants({
								variant: "copper",
								size: "lg"
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4" }), "Σημειώσεις"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/board",
							className: buttonVariants({
								variant: "ink",
								size: "lg"
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "size-4" }), "Στον πίνακα"]
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rise-in rise-in-delay-2 mx-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShuttleMark, { className: "h-48 w-32 sm:h-56 sm:w-36" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rise-in rise-in-delay-3 mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-2xl",
					children: "Επιδιωκόμενοι στόχοι"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 grid gap-2 sm:grid-cols-2",
					children: GOALS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3 rounded-2xl bg-cream px-4 py-3 text-sm leading-6 shadow-[var(--shadow-paper)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 size-2 shrink-0 rounded-full bg-copper" }), g]
					}, g))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12 grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/notes/$slug",
					params: { slug: "genika" },
					className: "group rounded-2xl bg-cream p-5 shadow-[var(--shadow-paper)] transition-transform duration-150 active:scale-[0.99]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-copper",
							children: "Θεωρία"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-serif text-2xl",
							children: "Επτά σύντομες ενότητες"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted",
							children: [
								read.length,
								"/",
								SECTIONS.length,
								" διαβάστηκαν"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-4 inline-flex items-center gap-1 text-sm text-ink",
							children: ["Διάβασε", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 transition-transform group-hover:translate-x-0.5" })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/board",
					className: "group rounded-2xl bg-ink p-5 text-cream shadow-[var(--shadow-paper)] transition-transform duration-150 active:scale-[0.99]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-copper",
							children: "Τράπεζα θεμάτων"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-serif text-2xl",
							children: "Δεκατέσσερις ασκήσεις"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-chalk-dim",
							children: [
								done,
								"/",
								EXERCISES.length,
								" ολοκληρώθηκαν σωστά"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-4 inline-flex items-center gap-1 text-sm",
							children: ["Σήκω στον πίνακα", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 transition-transform group-hover:translate-x-0.5" })]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-10 divide-y divide-line overflow-hidden rounded-2xl bg-cream shadow-[var(--shadow-paper)]",
				children: SECTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/notes/$slug",
					params: { slug: s.slug },
					className: "flex min-h-14 items-center gap-4 px-4 py-3 hover:bg-paper",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-10 font-serif text-copper",
							children: s.num
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-medium",
								children: s.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted",
								children: s.kicker
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 text-muted" })
					]
				}) }, s.slug))
			}),
			read.length + done > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: reset,
				className: "mt-8 text-sm text-muted underline-offset-4 hover:text-ink hover:underline",
				children: "Επαναφορά προόδου"
			}) : null
		]
	}) });
}
//#endregion
export { Home as component };
