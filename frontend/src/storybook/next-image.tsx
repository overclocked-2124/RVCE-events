import type { ImgHTMLAttributes } from "react";

type NextImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
};

export default function Image({
  width,
  height,
  fill,
  priority,
  ...props
}: NextImageProps) {
  return (
    <img
      {...props}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={priority ? "eager" : "lazy"}
    />
  );
}