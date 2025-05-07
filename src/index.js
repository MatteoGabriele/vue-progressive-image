import "./style.css";
import ProgressiveImage from "./ProgressiveImage";

export const install = (app, props = {}) => {
  for (const key of Object.keys(props)) {
    ProgressiveImage.props[key].default = props[key];
  }

  app.component("ProgressiveImage", ProgressiveImage);
};

export { ProgressiveImage };

export default install;
