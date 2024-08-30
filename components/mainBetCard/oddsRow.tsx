import { MarketTypeEnum } from "@/utils/overtime/enums/marketTypes";
import { SportMarket } from "@/utils/overtime/types/markets";
import { SfText } from "../SfThemedText";
import { View } from "react-native";
import { getLeagueIsDrawAvailable } from "@/utils/overtime/ui/sportsHelpers";
import OddsButton from "./oddsButton";
import {
  findOddsForMarket,
  findSportMarket,
  formatAmericanOdds,
  negativePlusHelper,
} from "@/utils/overtime/ui/helpers";
import { PositionEnum } from "@/utils/overtime/enums/markets";
import { userBetsAtom } from "@/lib/atom/atoms";
import { useAtom } from "jotai";

export const MAIN_CARD_MARKETS = [
  MarketTypeEnum.SPREAD,
  MarketTypeEnum.WINNER,
  MarketTypeEnum.TOTAL,
];

export default function OddsRow({
  sportMarket,
  marketTypes,
  position,
  onPressOddsButton,
}: {
  sportMarket: SportMarket;
  marketTypes: MarketTypeEnum[];
  position: PositionEnum;
  onPressOddsButton: (index: PositionEnum, marketType: MarketTypeEnum) => void;
}) {
  const [userBets] = useAtom(userBetsAtom);

  const isSelected = (index: number, marketType: MarketTypeEnum) => {
    return userBets.some(
      (bet) =>
        bet.sportMarket.gameId === sportMarket.gameId &&
        bet.tradeData.position === index &&
        bet.tradeData.typeId === marketType
    );
  };

  const isLeagueDrawAvailable = getLeagueIsDrawAvailable(sportMarket.leagueId);

  const marketOdds = marketTypes.reduce((acc, marketType) => {
    const oddsData = findOddsForMarket(sportMarket, marketType);
    if (oddsData) {
      acc[marketType] = oddsData;
    }
    return acc;
  }, {} as Record<MarketTypeEnum, ReturnType<typeof findOddsForMarket>>);

  console.log(JSON.stringify(marketOdds));
  return (
    <View style={{ flex: 1 }}>
      {isLeagueDrawAvailable ? (
        <View></View>
      ) : (
        <View style={{ flex: 1, flexDirection: "row", gap: 4 }}>
          {/* Winner */}
          <OddsButton
            line={formatAmericanOdds(
              marketOdds[MarketTypeEnum.WINNER]?.odds[position].american ?? 0
            )}
            onPress={() => onPressOddsButton(position, MarketTypeEnum.WINNER)}
            selected={isSelected(position, MarketTypeEnum.WINNER)}
          />

          {/* Spread */}
          <OddsButton
            line={formatAmericanOdds(
              marketOdds[MarketTypeEnum.SPREAD]?.odds[position].american ?? 0
            )}
            onPress={() => onPressOddsButton(position, MarketTypeEnum.SPREAD)}
            selected={isSelected(position, MarketTypeEnum.SPREAD)}
            label={negativePlusHelper(
              (position === PositionEnum.AWAY ? -1 : 1) *
                (marketOdds[MarketTypeEnum.SPREAD]?.line ?? 0)
            )}
          />

          {/* Total */}
          <OddsButton
            line={formatAmericanOdds(
              marketOdds[MarketTypeEnum.TOTAL]?.odds[position].american ?? 0
            )}
            onPress={() => onPressOddsButton(position, MarketTypeEnum.TOTAL)}
            selected={isSelected(position, MarketTypeEnum.TOTAL)}
            label={
              position === PositionEnum.AWAY
                ? `U${marketOdds[MarketTypeEnum.TOTAL]?.line}`
                : `O${marketOdds[MarketTypeEnum.TOTAL]?.line}`
            }
          />
        </View>
      )}
    </View>
  );
}
