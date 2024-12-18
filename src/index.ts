import "./style.css";

import ProgressiveImage from "@/ProgressiveImage.vue";
import { ProgressiveImagePluginOptions } from "@/types.ts";
import { App, Plugin } from "vue";

const ProgressiveImagePlugin: Plugin = {
  install(app: App, options?: ProgressiveImagePluginOptions) {
    app.provide("pluginOptions", options);
    app.component("ProgressiveImage", ProgressiveImage);
  },
};

export { ProgressiveImage };
export * from "@/types.ts";

export default ProgressiveImagePlugin;
