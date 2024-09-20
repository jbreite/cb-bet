import { View, StyleSheet, Pressable } from "react-native";
import { Ticket } from "../../utils/overtime/types/markets";
import { SfText } from "../SfThemedText";
import {
  convertNormalizedImpliedToAmerican,
  formatCurrency,
} from "@/utils/overtime/ui/beyTabHelpers";
import { negativePlusHelper } from "@/utils/overtime/ui/helpers";
import { getMarketOutcomeText } from "@/utils/overtime/ui/markets";
import { getImage } from "@/utils/overtime/ui/images";
import TeamMatchup from "./teamMatchup";
import { convertUnixToFormattedDate } from "@/utils/overtime/ui/date";
import Button from "../Button";

const OPTIMISTIC_ETHERERSCAN_BASE_URL =
  "https://optimistic.etherscan.io/address/";

export default function TicketView({
  ticket,
  onPress,
}: {
  ticket: Ticket;
  onPress?: (ticketId: string) => void;
}) {
  const numberOfMarkets = ticket.numOfMarkets;
  const formattedBuyInAmount = formatCurrency({ amount: ticket.buyInAmount });
  const formattedPayout = formatCurrency({ amount: ticket.payout });

  const ticketLink = `${OPTIMISTIC_ETHERERSCAN_BASE_URL}${ticket.id}`;
  const americanOdds = negativePlusHelper(
    convertNormalizedImpliedToAmerican(ticket.totalQuote)
  );

  const ticketTitle =
    numberOfMarkets > 1
      ? `${numberOfMarkets} Parlay`
      : getMarketOutcomeText(
          ticket.sportMarkets[0],
          ticket.sportMarkets[0].position,
          ticket.sportMarkets[0].typeId,
          ticket.sportMarkets[0].line
        );

  const ticketName =
    numberOfMarkets > 1 ? `${numberOfMarkets}-Leg Parlay` : "Single Ticket";

  const ticketGameStatuses = ticket.sportMarkets.reduce(
    (acc, market) => {
      if (market.isResolved) {
        acc[market.isWinning ? "Won" : "Lost"]++;
      } else {
        acc["Open"]++;
      }
      return acc;
    },
    { Won: 0, Lost: 0, Open: 0 }
  );

  const ticketStatusSummary = Object.entries(ticketGameStatuses)
    .filter(([_, count]) => count > 0)
    .map(([status, count]) => `${count} ${status}`)
    .join(", ");

  return (
    <Pressable style={[{ gap: 16 }]}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={styles.indHeadingTextContainer}>
          <SfText
            familyType="semibold"
            fontSize={18}
            style={{ flex: 1 }}
            numberOfLines={1}
            ellipsizeMode="middle"
          >
            {ticketName}
          </SfText>

          <SfText
            familyType="medium"
            fontSize={16}
            style={{ color: "#9B9B9B" }}
          >
            {ticketStatusSummary}
          </SfText>
        </View>

        <View style={styles.indHeadingTextContainer}>
          <SfText
            familyType="medium"
            fontSize={18}
            style={{ textAlign: "right" }}
          >
            {formattedBuyInAmount} To win {formattedPayout}
          </SfText>

          <SfText
            fontSize={16}
            style={{ color: "#9B9B9B", textAlign: "right" }}
          >
            {americanOdds}
          </SfText>
        </View>
      </View>

      <View style={styles.border}>
        {ticket.sportMarkets.map((market, index) => {
          const marketOdds = negativePlusHelper(
            convertNormalizedImpliedToAmerican(market.odd.normalizedImplied)
          );
          const marketOutcomeText = getMarketOutcomeText(
            market,
            market.position,
            market.typeId,
            market.line
          );

          const marketDate = convertUnixToFormattedDate(market.maturity);
          return (
            <View key={index} style={{ gap: 16 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <SfText familyType="semibold" fontSize={16}>
                  {marketOutcomeText}
                </SfText>
                <SfText familyType="semibold" fontSize={16}>
                  {marketOdds}
                </SfText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 4,
                  alignItems: "center",
                }}
              >
                <TeamMatchup
                  teamName={market.homeTeam}
                  teamImage={getImage(market.homeTeam, market.leagueId)}
                />
                <SfText familyType="semibold" fontSize={16}>
                  -
                </SfText>
                <TeamMatchup
                  teamName={market.awayTeam}
                  teamImage={getImage(market.awayTeam, market.leagueId)}
                />
              </View>
            </View>
          );
        })}
      </View>

      {onPress && (
        <Button
          label={`Claim ${formattedPayout}`}
          onPress={() => onPress(ticket.id)}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  border: {
    borderWidth: 2,
    borderColor: "#E3E3E3",
    borderRadius: 20,
    borderCurve: "continuous",
    padding: 16,
  },
  indHeadingTextContainer: {
    gap: 4,
  },
});
