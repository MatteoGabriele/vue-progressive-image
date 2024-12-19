export type ProgressiveImagePluginOptions = {
  fallbackSrc?: string;
  customClass?: string;
  lazyPlaceholder?: boolean;
  objectCover?: boolean;
  blur?: number | string;
  delay?: number | string;
};

export type ProgressiveImageProps = {
  src: string;
  placeholderSrc?: string;
  alt?: string;
  title?: string;
} & ProgressiveImagePluginOptions;
