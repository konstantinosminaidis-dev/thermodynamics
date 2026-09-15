import { i as __toESM } from "../_runtime.mjs";
import { o as adjacentSections } from "./sections-OnhCT_Ug.mjs";
import { B as require_react, b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as ArrowLeft, h as ArrowRight } from "../_libs/lucide-react.mjs";
import { a as useProgress, n as cn, t as AppShell } from "./app-shell-CwA8eR2P.mjs";
import { n as Route } from "./router-D5R8d6XK.mjs";
import { t as Diagram } from "./diagrams-09Z6_RFs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notes._slug-CRrdGF9s.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var calloutStyle = {
	def: "border-copper/40 bg-copper/8",
	example: "border-line bg-cream",
	remember: "border-ink/15 bg-ink/4"
};
var calloutLabel = {
	def: "Ορισμός",
	example: "Παράδειγμα",
	remember: "Θυμήσου"
};
function NotesBody({ blocks }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col gap-5",
		children: blocks.map((block, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlockView, { block }, i))
	});
}
function BlockView({ block }) {
	switch (block.type) {
		case "p": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-base leading-7 text-ink-soft",
			children: block.text
		});
		case "h": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-4 font-serif text-2xl text-ink",
			children: block.text
		});
		case "ul": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-col gap-2",
			children: block.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex gap-3 text-base leading-7 text-ink-soft",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 size-1.5 shrink-0 rounded-full bg-copper" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item })]
			}, item))
		});
		case "formula": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
			className: "rounded-2xl bg-cream px-4 py-4 text-center shadow-[var(--shadow-paper)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-serif text-xl text-ink sm:text-2xl",
				dangerouslySetInnerHTML: { __html: block.html }
			}), block.caption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
				className: "mt-2 text-sm text-muted",
				children: block.caption
			}) : null]
		});
		case "callout": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: cn("rounded-2xl border px-4 py-3", calloutStyle[block.kind]),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-copper",
				children: block.title || calloutLabel[block.kind]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-base leading-7",
				children: block.text
			})]
		});
		case "table": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
			className: "overflow-x-auto rounded-2xl bg-cream shadow-[var(--shadow-paper)]",
			children: [block.caption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
				className: "border-b border-line px-4 py-2 text-sm text-muted",
				children: block.caption
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-80 text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
					className: "border-b border-line",
					children: block.headers.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-3 py-2 font-semibold text-ink",
						children: h
					}, h))
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: block.rows.map((row, ri) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
					className: "border-b border-line/70 last:border-0",
					children: row.map((cell, ci) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-3 py-2 text-ink-soft",
						children: cell
					}, ci))
				}, ri)) })]
			})]
		});
		case "diagram": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Diagram, { id: block.id }), block.caption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
			className: "mt-2 text-center text-sm text-muted",
			children: block.caption
		}) : null] });
	}
}
function NotesPage() {
	const { section } = Route.useLoaderData();
	const { prev, next } = adjacentSections(section.slug);
	const markRead = useProgress((s) => s.markRead);
	(0, import_react.useEffect)(() => {
		markRead(section.slug);
	}, [markRead, section.slug]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-2xl px-4 py-8 sm:px-8 lg:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-semibold uppercase tracking-[0.2em] text-copper",
				children: section.kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-serif text-copper",
				children: section.num
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-4xl leading-tight sm:text-5xl",
				children: section.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-lg leading-7 text-muted",
				children: section.lead
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotesBody, { blocks: section.blocks })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mt-12 flex items-stretch gap-3",
				children: [prev ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/notes/$slug",
					params: { slug: prev.slug },
					className: "flex min-h-16 flex-1 flex-col justify-center rounded-2xl bg-cream px-4 py-3 shadow-[var(--shadow-paper)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 text-xs text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5" }), " Προηγούμενο"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-serif text-lg",
						children: [
							prev.num,
							" ",
							prev.title
						]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1" }), next ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/notes/$slug",
					params: { slug: next.slug },
					className: "flex min-h-16 flex-1 flex-col items-end justify-center rounded-2xl bg-ink px-4 py-3 text-cream shadow-[var(--shadow-paper)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 text-xs text-chalk-dim",
						children: ["Επόμενο ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-serif text-lg",
						children: [
							next.num,
							" ",
							next.title
						]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/board",
					className: "flex min-h-16 flex-1 flex-col items-end justify-center rounded-2xl bg-copper px-4 py-3 text-cream shadow-[var(--shadow-paper)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs",
						children: "Έτοιμος;"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-serif text-lg",
						children: "Στον πίνακα"
					})]
				})]
			})
		]
	}) });
}
//#endregion
export { NotesPage as component };
