import { n as GROUPS, r as KIND_LABEL, t as EXERCISES } from "./sections-OnhCT_Ug.mjs";
import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as ChevronRight, f as Check } from "../_libs/lucide-react.mjs";
import { a as useProgress, n as cn, t as AppShell } from "./app-shell-CwA8eR2P.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/board-B57gINfG.js
var import_jsx_runtime = require_jsx_runtime();
function BoardIndex() {
	const results = useProgress((s) => s.exercises);
	const done = EXERCISES.filter((e) => results[e.id]?.status === "done").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		surface: "board",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-4 py-8 sm:px-8 lg:px-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-semibold uppercase tracking-[0.2em] text-copper",
					children: "Τράπεζα θεμάτων"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-serif text-4xl text-chalk sm:text-5xl",
					children: "Ο πίνακας"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xl text-chalk-dim",
					children: "Σήκω και λύσε. Πολλαπλή επιλογή, αντιστοίχιση, κενά, σωστό/λάθος και υπολογιστικά — όπως στην εξέταση, με άμεσο έλεγχο."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-sm tabular-nums text-chalk-dim",
					children: [
						done,
						" από ",
						EXERCISES.length,
						" σωστά ολοκληρωμένες"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 flex flex-col gap-10",
					children: GROUPS.map((g) => {
						const items = EXERCISES.filter((e) => e.group === g.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-serif text-2xl text-chalk",
								children: g.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-chalk-dim",
								children: g.blurb
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 grid gap-2",
								children: items.map((ex) => {
									const res = results[ex.id];
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/board/$id",
										params: { id: ex.id },
										className: cn("flex min-h-16 items-center gap-3 rounded-2xl border px-4 py-3 transition-colors duration-150", res?.status === "done" ? "border-correct/30 bg-correct/8" : res?.status === "miss" ? "border-wrong/25 bg-wrong/8" : "border-chalk/12 bg-chalk/5 hover:border-chalk/25"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[11px] uppercase tracking-[0.14em] text-chalk-dim",
												children: [
													KIND_LABEL[ex.kind],
													" · ",
													ex.code,
													" · ",
													ex.units,
													" μον."
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "truncate font-serif text-xl text-chalk",
												children: ex.title
											})]
										}), res?.status === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-5 text-correct" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5 text-chalk-dim" })]
									}) }, ex.id);
								})
							})
						] }, g.id);
					})
				})
			]
		})
	});
}
//#endregion
export { BoardIndex as component };
