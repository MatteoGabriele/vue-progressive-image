import "./style.css";
import { globalPropsKey } from "@/constants";
import type { App } from "vue";
import ProgressiveImage, {
  type ProgressiveImageProps,
} from "./ProgressiveImage.vue";

export type PluginOptoins = Partial<
  Pick<
    ProgressiveImageProps,
    | "customClass"
    | "blur"
    | "delay"
    | "objectCover"
    | "lazyPlaceholder"
    | "fallbackSrc"
  >
>;

export function install(app: App, options: PluginOptoins) {
  app.provide(globalPropsKey, options);
  app.component("ProgressiveImage", ProgressiveImage);
}

export { ProgressiveImage };

export default install;
