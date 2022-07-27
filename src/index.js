import ProgressiveImage from "./component/image.vue";
import ProgressiveBackground from "./component/background.vue";

const mergeOptions = function (component, options = {}) {
  return {
    ...component,
    data: () => ({ options }),
  };
};

export const install = function (Vue, options = {}) {
  Vue.component("progressive-img", mergeOptions(ProgressiveImage, options));
  Vue.component(
    "progressive-background",
    mergeOptions(ProgressiveBackground, options)
  );
};

export { ProgressiveImage, ProgressiveBackground };

export default install;
