import vue from "@vitejs/plugin-vue2";
import { resolve } from "path";
import { defineConfig } from "vite";
import VitePluginStyleInject from "vite-plugin-style-inject";

export default defineConfig({
  plugins: [vue(), VitePluginStyleInject()],

  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },

  build: {
    lib: {
      entry: resolve(__dirname, "./src/index.js"),
      name: "VueProgressiveImage",
      fileName: (format) => `vue-progressive-image.${format}.js`,
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
    VERSION: JSON.stringify(require("./package.json").version),
  },
});
