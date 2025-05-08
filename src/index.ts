import "./style.css";
import { globalPropsKey } from "@/constants";
import type { PluginOptions } from "@/types";
import type { App } from "vue";
import ProgressiveImage from "./ProgressiveImage.vue";

export function install(app: App, options?: PluginOptions) {
  app.provide(globalPropsKey, options);
  app.component("ProgressiveImage", ProgressiveImage);
}

export { ProgressiveImage };

export default install;
