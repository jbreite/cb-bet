import { Path } from "react-native-svg";
import Icon, { IconProps } from "./DefaultIcon";

const MORE_HORIZONTAL = (props: IconProps) => (
  <Icon {...props}>
    <Path
      stroke={props.color || "#000"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={props.strokeWidth || 2}
      d="M17 12a1 1 0 1 0 2 0 1 1 0 0 0-2 0ZM11 12a1 1 0 1 0 2 0 1 1 0 0 0-2 0ZM5 12a1 1 0 1 0 2 0 1 1 0 0 0-2 0Z"
    />
  </Icon>
);
export default MORE_HORIZONTAL;
