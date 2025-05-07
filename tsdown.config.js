import path from "node:path";
import { defineConfig } from "tsdown";
import Vue from "unplugin-vue/rolldown";
import { name } from "./package.json";

export default defineConfig({
  entry: {
    [name]: "./src/index.js",
  },
  platform: "browser",
  minify: true,
  plugins: [Vue({ isProduction: true })],
  external: ["vue"],
  outDir: "./dist",
  publint: true,
  dts: false,
  clean: true,
  inputOptions: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  },
});
