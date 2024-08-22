import { Path } from "react-native-svg";
import Icon, { IconProps } from "./DefaultIcon";

const Compass: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <Path
      stroke={props.color || "#fff"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={(props.strokeWidth || 2) / (Number(props.scale) || 1)}
      d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Z"
    />
    <Path
      stroke={props.color || "#fff"}
      //fill={"blue" || "#fff"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={(props.strokeWidth || 2) / (Number(props.scale) || 1)}
      d="M10.5 10.5 16 8l-2.5 5.5L8 16l2.5-5.5Z"
    />
  </Icon>
);

export default Compass;
