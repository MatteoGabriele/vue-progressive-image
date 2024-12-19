import "./style.css";

import ProgressiveImage from "@/ProgressiveImage.vue";
import type { ProgressiveImagePluginOptions } from "@/types.ts";
import type { App, Plugin } from "vue";

const plugin: Plugin = {
  install(app: App, options?: Partial<ProgressiveImagePluginOptions>) {
    app.provide("pluginOptions", options);
    app.component("ProgressiveImage", ProgressiveImage);
  },
};

export { ProgressiveImage };

export default plugin;
