import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import tsconfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    vue(),
    dts({
      rollupTypes: true,
      tsconfigPath: new URL("./tsconfig.json", import.meta.url).pathname,
    }),
  ],

  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
    },
  },

  build: {
    lib: {
      entry: new URL("./src/index.ts", import.meta.url).pathname,
      name: "VueProgressiveImage",
      formats: ["es"],
      fileName: "vue-progressive-image",
    },

    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },

  test: {
    environment: "happy-dom",
    globals: true,
  },
});
