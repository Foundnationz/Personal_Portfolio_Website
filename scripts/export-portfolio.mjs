import { cpSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";
import { execFileSync } from "node:child_process";

// Build a standalone export; never alter the live website's source or configuration.
const root = process.cwd();
const source = resolve(root, "artifacts/shawn-portfolio");
const output = resolve(root, "generated-artifacts/shawn-portfolio-source");
mkdirSync(output, { recursive: true });
for (const entry of ["src", "public", "scripts", "index.html", "components.json"]) {
  cpSync(join(source, entry), join(output, entry), { recursive: true });
}
const original = JSON.parse(readFileSync(join(source, "package.json"), "utf8"));
const dependencies = {};
const devDependencies = {};
const buildTools = new Set([
  "@tailwindcss/typography", "@tailwindcss/vite", "@types/node", "@types/react",
  "@types/react-dom", "@vitejs/plugin-react", "tailwindcss", "tw-animate-css", "vite",
]);
for (const name of Object.keys(original.devDependencies)) {
  if (name.startsWith("@replit/") || name.startsWith("@workspace/")) continue;
  const installed = JSON.parse(readFileSync(join(source, "node_modules", name, "package.json"), "utf8"));
  (buildTools.has(name) ? devDependencies : dependencies)[name] = installed.version;
}
devDependencies.typescript = JSON.parse(readFileSync(join(root, "node_modules/typescript/package.json"), "utf8")).version;
writeFileSync(join(output, "package.json"), JSON.stringify({
  name: "shawn-portfolio",
  version: "1.0.0",
  private: true,
  type: "module",
  engines: { node: ">=22.12.0" },
  packageManager: `pnpm@${execFileSync("pnpm", ["--version"], { encoding: "utf8" }).trim()}`,
  scripts: {
    dev: "vite --host 0.0.0.0",
    build: "tsc --noEmit && vite build",
    preview: "vite preview --host 0.0.0.0",
    typecheck: "tsc --noEmit",
    test: "node --test scripts/verify-editable-text.mjs",
  },
  dependencies,
  devDependencies,
}, null, 2) + "\n");
const base = JSON.parse(readFileSync(join(root, "tsconfig.base.json"), "utf8"));
const tsconfig = JSON.parse(readFileSync(join(source, "tsconfig.json"), "utf8"));
delete tsconfig.extends;
delete tsconfig.references;
tsconfig.compilerOptions = { ...base.compilerOptions, ...tsconfig.compilerOptions, incremental: false };
delete tsconfig.compilerOptions.customConditions;
writeFileSync(join(output, "tsconfig.json"), JSON.stringify(tsconfig, null, 2) + "\n");
writeFileSync(join(output, "vite.config.ts"), `import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: process.env.BASE_PATH || "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    dedupe: ["react", "react-dom"],
  },
  server: {
    host: "0.0.0.0",
    port: Number(process.env.PORT || 5173),
    strictPort: true,
  },
});
`);
writeFileSync(join(output, ".gitignore"), "node_modules/\ndist/\n.env\n.env.*\n*.tsbuildinfo\n.DS_Store\n");
writeFileSync(join(output, "README.md"), `# Shawn Stephen Abok — Portfolio

This is a standalone copy of the current React + TypeScript + Vite website.
Your existing Replit website is unchanged.

## Requirements

- Node.js 22.12 or newer (Node.js 24 LTS also works).
- pnpm 10. If it is not installed, run: npm install -g pnpm@10

## Run locally

Open a terminal in this folder, then run:

    pnpm install --frozen-lockfile
    pnpm dev

Open http://localhost:5173. No account, database, backend server, API key,
or environment file is required for the current portfolio.
The first installation downloads the dependencies and requires internet.
Google Fonts also loads DM Sans over the internet, with a system-font fallback.

## Build and check

    pnpm typecheck
    pnpm test
    pnpm build
    pnpm preview

The production website is written to dist/.
The preview command prints the local address (normally http://localhost:4173).

## Main files

- src/pages/portfolio.tsx — homepage and its sections.
- src/pages/projects.tsx — all five project entries.
- src/pages/project-outline.tsx — financial tracker project outline.
- src/components/portfolio/ — education, skills, experience, featured projects,
  shared footer, and example dialogs.
- src/styles/ — website styles and shared typography.
- src/data/portfolio.ts — profile configuration, contact/social/resume settings,
  and original reference data. Most visible section text is directly in JSX,
  not generated from these reference arrays.
- public/images/ — the website images, including the uploaded dashboard.
- src/App.tsx — page routes.

Individual text blocks are deliberately separate in the source so editing one
card does not change another. Placeholder content is still labelled; this export
does not turn examples into verified achievements.

Contact form: currently validates and previews a message; it does not send email.
Unconfigured resume, social, and project destinations show availability notices
instead of opening fabricated links. Provide real destinations before sharing.

## Hosting

Upload dist/ to a static host after running pnpm build.
Configure the host to serve index.html for unknown paths (SPA fallback), so
/projects and /projects/ledger-reconciliation work when opened directly.
Asset paths default to the website root. For subfolder hosting, set BASE_PATH
to the chosen prefix ending with / when building (for example /portfolio/),
and configure the host's fallback accordingly.

## Included and excluded

Included: all website source, local images, configuration, dependency lockfile,
and content regression tests.
Excluded: earlier design mockups, unused API server and workspace libraries,
node_modules, build output, Git history, private agent files, environment
variables, and credentials.

The export replaces the workspace-only build configuration with a standalone
Vite configuration and pins the direct dependencies to the installed versions.
It contains no Replit-only development plugins.
`);
console.log(`Prepared standalone website: ${output}`);
