import "./style.css";
import ProgressiveImage from "./ProgressiveImage";

export const install = (app, props = {}) => {
  Object.keys(props).forEach((key) => {
    ProgressiveImage.props[key].default = props[key];
  });

  app.component("ProgressiveImage", ProgressiveImage);
};

export { ProgressiveImage };

export default install;
