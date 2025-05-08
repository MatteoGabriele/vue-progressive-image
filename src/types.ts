export type ProgressiveImageProps = {
  src: string;
  placeholderSrc?: string;
  fallbackSrc?: string;
  alt?: string;
  title?: string;
  customClass?: string;
  blur?: number | string;
  lazyPlaceholder?: boolean;
  delay?: number | string;
  objectCover?: boolean;
};

export type PluginOptions = Partial<
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
