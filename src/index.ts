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

/**
 * Installs the ProgressiveImage plugin into a Vue application.
 *
 * Registers the `ProgressiveImage` component globally and provides plugin options for global configuration.
 *
 * @param app - The Vue application instance to enhance.
 * @param options - Optional configuration for the ProgressiveImage component, such as blur, delay, or fallback source.
 */
export function install(app: App, options: PluginOptoins) {
  app.provide(globalPropsKey, options);
  app.component("ProgressiveImage", ProgressiveImage);
}

export { ProgressiveImage };

export default install;
