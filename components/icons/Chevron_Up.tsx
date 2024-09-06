import { Path } from "react-native-svg";
import Icon, { IconProps } from "./DefaultIcon";

const Chevron_Up: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <Path
      stroke={props.color || "#fff"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={props.strokeWidth || 2}
      d="m5 16 7-7 7 7"
    />
  </Icon>
);
export default Chevron_Up;
