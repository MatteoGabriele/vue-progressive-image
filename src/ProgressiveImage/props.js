import { IMAGE_RENDERING_DELAY, IMAGE_BLUR } from "@/constants";

export default {
  src: String,

  placeholderSrc: String,

  fallbackSrc: String,

  alt: String,

  customClass: String,

  delay: {
    type: [Number, String],
    default: IMAGE_RENDERING_DELAY,
  },

  blur: {
    type: [Number, String],
    default: IMAGE_BLUR,
  },

  objectCover: {
    type: Boolean,
    default: false,
  },
};
