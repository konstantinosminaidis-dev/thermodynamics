//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-Dt4feUC4.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "/workspace/src/routes/__root.tsx",
		children: [
			"/",
			"/board",
			"/notes/$slug"
		],
		preloads: ["/assets/index-DWRRxKwo.js", "/assets/sections-2YFcYhMz.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-DWRRxKwo.js"
		} }]
	},
	"/": {
		filePath: "/workspace/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-DZAlPxPu.js",
			"/assets/app-shell-CO9pp4t3.js",
			"/assets/diagrams-DcWW1avH.js",
			"/assets/button-BBOfpyWV.js"
		]
	},
	"/board": {
		filePath: "/workspace/src/routes/board.tsx",
		children: ["/board/$id"],
		preloads: [
			"/assets/board-e4ol2gHa.js",
			"/assets/app-shell-CO9pp4t3.js",
			"/assets/chevron-right-DI3UnH0b.js"
		]
	},
	"/board/$id": {
		filePath: "/workspace/src/routes/board.$id.tsx",
		children: void 0,
		preloads: [
			"/assets/board._id-BWRD8rSH.js",
			"/assets/arrow-left-D3w3kW4J.js",
			"/assets/button-BBOfpyWV.js"
		]
	},
	"/notes/$slug": {
		filePath: "/workspace/src/routes/notes.$slug.tsx",
		children: void 0,
		preloads: [
			"/assets/notes._slug-B5vacsHT.js",
			"/assets/app-shell-CO9pp4t3.js",
			"/assets/diagrams-DcWW1avH.js",
			"/assets/arrow-left-D3w3kW4J.js"
		]
	}
} });
//#endregion
export { tsrStartManifest };
