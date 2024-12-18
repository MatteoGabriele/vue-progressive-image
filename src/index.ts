import "./style.css";

import ProgressiveImage from "@/ProgressiveImage";
import { ProgressiveImagePluginOptions } from "@/ProgressiveImage/types";
import { App, Plugin } from "vue";

const ProgressiveImagePlugin: Plugin = {
  install(app: App, options?: ProgressiveImagePluginOptions) {
    app.provide("pluginOptions", options);
    app.component("ProgressiveImage", ProgressiveImage);
  },
};

export { ProgressiveImage };
export * from "./ProgressiveImage/types";

export default ProgressiveImagePlugin;
