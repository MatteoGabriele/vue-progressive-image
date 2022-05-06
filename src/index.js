import ProgressiveImage from "./ProgressiveImage";

export const install = (app) => {
  app.component("ProgressiveImage", ProgressiveImage);
};

export { ProgressiveImage };

export default install;
