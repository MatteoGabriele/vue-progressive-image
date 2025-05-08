import "./style.css";
import type { App } from "vue";
import ProgressiveImage from "./ProgressiveImage.vue";

export function install(app: App) {
  app.component("ProgressiveImage", ProgressiveImage);
};

export { ProgressiveImage };

export default install;
