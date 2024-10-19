import "./style.css";
import ProgressiveImage from "./ProgressiveImage";
import type { App } from "vue";
import { ProgressiveImageProps } from "./ProgressiveImage/types/progressive-image";

export const install = (app: App, props: Partial<ProgressiveImageProps>) => {
  app.component("ProgressiveImage", {
    extends: ProgressiveImage,
    props,
  });
};

export { ProgressiveImage };

export default install;
