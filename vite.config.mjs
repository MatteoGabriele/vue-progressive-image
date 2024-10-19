import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { readFile } from "fs/promises";
const info = JSON.parse(
  await readFile(new URL("./package.json", import.meta.url))
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    lib: {
      entry: path.resolve(__dirname, "./src/index.js"),
      name: "VueProgressiveImage",
    },

    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
        },
      },
    },
  },

  define: {
    VERSION: info.version,
  },

  test: {
    environment: "happy-dom",
  },
});
