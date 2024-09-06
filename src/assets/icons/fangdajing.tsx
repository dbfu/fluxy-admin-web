import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const SVGFangdajing = () => (
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
    <path d="M781.7 728l-13.6 13.6-102-102c54.7-61.1 88.3-141.6 88.3-230.1C754.4 218.7 599.7 64 408.9 64S63.4 218.7 63.4 409.5 218.1 755 408.9 755c88.5 0 168.9-33.6 230.1-88.3l102 102-13.6 13.6 177.1 177.1 54.3-54.3L781.7 728z m-680-318.6c0-169.3 137.8-307.1 307.1-307.1s307.1 137.8 307.1 307.1-137.8 307.1-307.1 307.1c-169.3 0.1-307.1-137.7-307.1-307.1z"></path>
  </svg>
);

export const IconFangdajing = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={SVGFangdajing} {...props} />
);
