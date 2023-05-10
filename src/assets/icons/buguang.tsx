import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const SVGBuguang = () => (
  <svg
    style={{
      width: "1em",
      height: "1em",
      fill: "currentcolor",
      overflow: "hidden",
    }}
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M547.84 0 128 468.48l194.56 112.64L140.8 1024l673.28-547.84-204.8-117.76L896 102.4 547.84 0z"></path>
  </svg>
);

export const IconBuguang = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={SVGBuguang} {...props} />
);
