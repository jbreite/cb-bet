import { Path } from "react-native-svg";
import Icon, { IconProps } from "./DefaultIcon";

const Close_MD: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <Path
      stroke={props.color || "#fff"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={props.strokeWidth || 2}
      d="m18 18-6-6m0 0L6 6m6 6 6-6m-6 6-6 6"
    />
  </Icon>
);
export default Close_MD;
