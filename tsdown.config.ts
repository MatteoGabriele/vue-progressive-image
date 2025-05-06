import { defineConfig} from 'tsdown'
import path from 'node:path'
import Vue from 'unplugin-vue/rolldown'
import { name } from './package.json'

export default defineConfig({
  entry: {
    [name]: './src/index.ts'
  },
  clean: true,
  dts: true,
  platform: "browser",
  format: "esm",
  minify: true,
  external: ["vue"],
  outDir: "./dist",
  publint: true,
  alias: {
    "@": path.resolve(__dirname, "./src"),
  },
  plugins: [
    Vue({ isProduction: true })
  ]
})