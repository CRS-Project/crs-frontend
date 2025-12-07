module.exports = {
	// Lint & Prettify TS and JS files
	"**/*.(ts|tsx|js)": ["pnpm lint:error", "pnpm format:write"],

	// Prettify only Markdown and JSON files
	"**/*.(md|json)": ["pnpm format:write"],
};
