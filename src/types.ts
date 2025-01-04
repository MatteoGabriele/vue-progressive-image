export type ProgressiveImagePluginOptions = {
  fallbackSrc?: string;
  customClass?: string;
  blur?: number | string;
  delay?: number | string;
  lazyPlaceholder?: boolean;
};

export type ProgressiveImageProps = {
  src: string;
  placeholderSrc?: string;
  alt?: string;
  title?: string;
  objectCover?: boolean;
} & ProgressiveImagePluginOptions;

export type CssClasses = string | Record<string, boolean> | undefined;
export type InlineStyle = Record<string, string>;
