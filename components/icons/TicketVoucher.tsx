import { Path } from "react-native-svg";
import Icon, { IconProps } from "./DefaultIcon";

const TicketVoucher = (props: IconProps) => (
  <Icon {...props}>
    <Path
      stroke={props.color || "#fff"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={props.strokeWidth || 2}
      d="M14 6H6c-.932 0-1.398 0-1.766.152a2 2 0 0 0-1.082 1.083C3 7.602 3 8.068 3 9a3 3 0 1 1 0 6c0 .932 0 1.398.152 1.765a2 2 0 0 0 1.082 1.083C4.602 18 5.068 18 6 18h8m0-12h4c.932 0 1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C21 7.602 21 8.068 21 9a3 3 0 1 0 0 6c0 .932 0 1.398-.152 1.765a2 2 0 0 1-1.083 1.083C19.398 18 18.932 18 18 18h-4m0-12v12"
    />
  </Icon>
);
export default TicketVoucher;
