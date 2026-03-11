# Future Plans

- Instead of creating a separate component file, place its template code directly into `index.js(.ts)`
- Verify that literal substitution works in the re-export `index.js` template
- Create an `index.js` that includes all components from the parent folder. Logic: if settings require creating `index.js`, check whether to include re-exports of all components found in subfolders (JSX, TSX, JS, TS). Include TSX/TS only if "Use TypeScript" is enabled. If a subfolder already has `index.js/ts`, use its re-export without going deeper. Avoid duplicating existing exports. Handle default exports.
