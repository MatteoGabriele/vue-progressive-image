import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "tsdown";
import Vue from 'unplugin-vue/rolldown'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  entry: {
    'vue-progressive-image': "./src/index.ts",
  },
  platform: "neutral",
  plugins: [Vue({ isProduction: true })],
  minify: true,
  outDir: "./dist",
  publint: true,
  dts: { vue: true },
  clean: true,
  inputOptions: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  },
});
