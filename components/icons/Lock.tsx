import { Path } from "react-native-svg";
import Icon, { IconProps } from "./DefaultIcon";

const Lock: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <Path
      stroke={props.color || "#fff"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={props.strokeWidth || 2}
      d="M9.23 9H7.2c-1.12 0-1.68 0-2.108.218a1.999 1.999 0 0 0-.874.874C4 10.52 4 11.08 4 12.2v5.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.987.218 2.105.218h9.606c1.118 0 1.677 0 2.104-.218.377-.192.683-.498.875-.874.218-.428.218-.986.218-2.104v-5.607c0-1.118 0-1.678-.218-2.105a2.001 2.001 0 0 0-.875-.874C18.48 9 17.92 9 16.8 9H14.77M9.23 9h5.539M9.23 9A.23.23 0 0 1 9 8.77V6a3 3 0 1 1 6 0v2.77c0 .127-.104.23-.231.23"
    />
  </Icon>
);
export default Lock;
