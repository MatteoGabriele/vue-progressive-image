export type ProgressiveImageProps = {
  src: string;
  placeholderSrc?: string;
  fallbackSrc?: string;
  alt?: string;
  title?: string;
  customClass?: string;
  lazyPlaceholder?: boolean;
  objectCover?: boolean;
  blur?: number | string;
  delay?: number | string;
};

export type ProgressiveImagePluginOptions = Partial<
  Omit<ProgressiveImageProps, "src" | "objectCover | title | alt">
>;
