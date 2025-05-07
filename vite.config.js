import { resolve } from "node:path";
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  
  test: {
    environment: "jsdom",
  },
});
