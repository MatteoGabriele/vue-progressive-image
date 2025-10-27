import path from "node:path";
import { defineConfig } from "tsdown";
import Vue from 'unplugin-vue/rolldown'

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
