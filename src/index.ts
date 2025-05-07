import "./style.css";
import type { App } from "vue";
import ProgressiveImage, { ProgressiveImageProps } from "./ProgressiveImage/ProgressiveImage.vue";

export const ProgressiveImageConfigKey = Symbol("ProgressiveImageConfig");

export function install(app: App, props?: ProgressiveImageProps) {
  app.provide(ProgressiveImageConfigKey, props)
  app.component("ProgressiveImage", ProgressiveImage);
};

export { ProgressiveImage };

export default install;
