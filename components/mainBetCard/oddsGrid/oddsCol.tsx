// import { GameOdds } from "@/utils/overtime/types/odds";
// import OddsButton from "../oddsButton";
// import { View } from "react-native";
// import { MarketTypeEnum } from "@/utils/overtime/enums/marketTypes";
// import { SfText } from "@/components/SfThemedText";
// import { getMarketTypeName } from "@/utils/overtime/ui/markets";
// import { spreadLineHelper } from "@/utils/overtime/ui/helpers";

// export default function OddsCol({
//   gameOdds,
//   marketType,
//   onPressOddsButton,
//   isSelected,
// }: {
//   gameOdds: GameOdds;
//   marketType: MarketTypeEnum;
//   onPressOddsButton: (index: number, marketType: MarketTypeEnum) => void;
//   isSelected: (index: number, marketType: MarketTypeEnum) => boolean;
// }) {
//   const marketTypeName = getMarketTypeName(marketType);
//   const oddsObject = gameOdds[marketType as keyof GameOdds];

//   if (!oddsObject) {
//     return null; // or some fallback UI
//   }

//   return (
//     <View>
//       <SfText>{marketTypeName}</SfText>
//       <OddsButton
//         line={oddsObject.homeOdds.odds}
//         onPress={() => onPressOddsButton(oddsObject.homeOdds.index, marketType)}
//         selected={isSelected(oddsObject.homeOdds.index, marketType)}
//         label={marketType !== MarketTypeEnum.WINNER ? "Home" : ""}
//       />
//       <OddsButton
//         line={oddsObject.awayOdds.odds}
//         onPress={() => onPressOddsButton(oddsObject.awayOdds.index, marketType)}
//         selected={isSelected(oddsObject.awayOdds.index, marketType)}
//         label={
//           marketType !== MarketTypeEnum.WINNER
//             ? marketType === MarketTypeEnum.SPREAD
//               ? spreadLineHelper(-1 * oddsObject.line)
//               : "help"
//             : undefined
//         }
//       />
//     </View>
//   );
// }
