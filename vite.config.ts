// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import type { Plugin, OutputBundle, OutputChunk } from "vite";

function tanStackPreviewServerEntry(): Plugin {
  return {
    name: "tanstack-preview-server-entry",
    apply: "build",
    enforce: "post",
    async writeBundle(options, bundle: OutputBundle) {
      if (!options.dir?.endsWith(join("dist", "server"))) {
        return;
      }

      const serverChunk = Object.values(bundle).find(
        (item): item is OutputChunk =>
          item.type === "chunk" && item.name === "server" && item.isDynamicEntry,
      );

      if (!serverChunk) {
        return;
      }

      const outputPath = join(options.dir, "server.js");
      const importPath = `./${serverChunk.fileName}`;
      await mkdir(dirname(outputPath), { recursive: true });
      await writeFile(
        outputPath,
        `import { a0 as serverEntryModule } from ${JSON.stringify(importPath)};\n\nexport default serverEntryModule.default ?? serverEntryModule;\n`,
      );
    },
  };
}

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    plugins: [tanStackPreviewServerEntry()],
  },
});
