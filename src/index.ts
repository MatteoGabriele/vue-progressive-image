import "./style.css";

import ProgressiveImage from "./ProgressiveImage";

import { App } from "vue";
import { ProgressiveImageGlobalProps } from "./ProgressiveImage/types";

export const install = (
  app: App,
  props?: Partial<ProgressiveImageGlobalProps>
) => {
  app.provide("globalProps", props);
  app.component("ProgressiveImage", ProgressiveImage);
};

export { ProgressiveImage };
export * from "./ProgressiveImage/types";

export default install;
