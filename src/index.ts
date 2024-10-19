import "./style.css";

import ProgressiveImage from "./ProgressiveImage";

import type { App } from "vue";
import type { ProgressiveImageProps } from "./ProgressiveImage/types";

export const install = (app: App, props: Partial<ProgressiveImageProps>) => {
  app.component("ProgressiveImage", {
    extends: ProgressiveImage,
    props,
  });
};

export { ProgressiveImage, type ProgressiveImageProps };

export default install;
