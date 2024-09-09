import { Path } from "react-native-svg";
import Icon, { IconProps } from "./DefaultIcon";

const Farcaster_Logo: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <Path
      fill={props.color || "#fff"}
      d="M6.687 4.232h11.626v16.534h-1.706v-7.574h-.017a4.107 4.107 0 0 0-8.18 0h-.017v7.574H6.687V4.232Z"
    />
    <Path
      fill={props.color || "#fff"}
      d="m3.593 6.58.694 2.346h.586v9.493a.533.533 0 0 0-.533.533v.64h-.107a.533.533 0 0 0-.533.534v.64h5.973v-.64a.533.533 0 0 0-.533-.534h-.107v-.64a.533.533 0 0 0-.533-.533h-.64V6.58H3.593ZM16.713 18.42a.533.533 0 0 0-.533.532v.64h-.107a.533.533 0 0 0-.533.534v.64h5.973v-.64a.533.533 0 0 0-.533-.534h-.107v-.64a.533.533 0 0 0-.533-.533V8.926h.587l.693-2.347h-4.267v11.84h-.64Z"
    />
  </Icon>
);

export default Farcaster_Logo;
