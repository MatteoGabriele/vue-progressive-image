import {
  DEFAULT_IMAGE_RENDERING_DELAY,
  DEFAULT_IMAGE_BLUR,
  DEFAULT_IMAGE_ASPECT_RATIO,
  DEFAULT_IMAGE_POLL_INTERVAL,
} from "./constants";

export default {
  src: {
    type: String,
    required: true,
  },

  placeholderSrc: {
    type: String,
  },

  fallbackSrc: {
    type: String,
  },

  delay: {
    type: [Number, String],
    default: DEFAULT_IMAGE_RENDERING_DELAY,
  },

  blur: {
    type: [Number, String],
    default: DEFAULT_IMAGE_BLUR,
  },

  alt: {
    type: String,
  },

  circle: {
    type: Boolean,
    default: false,
  },

  objectCover: {
    type: Boolean,
    default: false,
  },

  objectContain: {
    type: Boolean,
    default: false,
  },

  selectNone: {
    type: Boolean,
    default: false,
  },

  aspectRatio: {
    type: [Number, String],
    default: DEFAULT_IMAGE_ASPECT_RATIO,
  },

  pollInterval: {
    type: [Number, String],
    default: DEFAULT_IMAGE_POLL_INTERVAL,
  },
};
