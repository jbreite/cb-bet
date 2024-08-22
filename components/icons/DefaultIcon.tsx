import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export interface IconProps extends SvgProps {
  size?: number;
  strokeWidth?: number;
}

const Icon: React.FC<IconProps> = ({
  size = 24,
  strokeWidth = 2,
  color = "#fff",
  ...props
}) => {
  const scale = size / 24; // Calculate scale factor

  return (
    <Svg width={size} height={size} fill={props.fill || "none"} {...props}>
      {React.Children.map(props.children, (child) =>
        React.cloneElement(child as React.ReactElement<any>, { scale })
      )}
    </Svg>
  );
};

export default Icon;