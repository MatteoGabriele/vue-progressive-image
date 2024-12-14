import "./style.css";

import ProgressiveImage from "./ProgressiveImage";

import { App, Plugin } from "vue";
import { ProgressiveImagePluginOptions } from "./ProgressiveImage/types";

const ProgressiveImagePlugin: Plugin = {
  install(app: App, options?: Partial<ProgressiveImagePluginOptions>) {
    app.provide("pluginOptions", options);
    app.component("ProgressiveImage", ProgressiveImage);
  },
};

export { ProgressiveImage };
export * from "./ProgressiveImage/types";

export default ProgressiveImagePlugin;
