export type ProgressiveImageProps = {
  src: string;
  placeholderSrc?: string;
  fallbackSrc?: string;
  alt?: string;
  title?: string;
  customClass?: string;
  blur?: number;
  lazyPlaceholder?: boolean;
  objectCover?: boolean;
  delay?: number;
};

export type ProgressiveImageGlobalProps = Omit<
  ProgressiveImageProps,
  "src" | "objectCover | title | alt"
>;
