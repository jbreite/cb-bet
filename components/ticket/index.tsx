import { View, StyleSheet } from "react-native";
import { Ticket } from "../../utils/overtime/types/markets";
import { SfText } from "../SfThemedText";
import {
  convertNormalizedImpliedToAmerican,
  formatCurrency,
} from "@/utils/overtime/ui/beyTabHelpers";
import { negativePlusHelper } from "@/utils/overtime/ui/helpers";
import {
  getMarketOutcomeText,
  getMarketTypeName,
} from "@/utils/overtime/ui/markets";
import { getImage } from "@/utils/overtime/ui/images";
import TeamMatchup from "./teamMatchup";

const OPTIMISTIC_ETHERERSCAN_BASE_URL =
  "https://optimistic.etherscan.io/address/";

export default function TicketView({ ticket }: { ticket: Ticket }) {
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

  const betTypeName =
    numberOfMarkets > 1
      ? ticket.sportMarkets
          .map((bet) =>
            getMarketOutcomeText(bet, bet.position, bet.typeId, bet.line)
          )
          .join(", ") //TODO this could be more detailed but fine fo now
      : getMarketTypeName(ticket.sportMarkets[0].typeId);

  return (
    <View style={{ gap: 16 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={styles.indHeadingTextContainer}>
          <SfText
            familyType="semibold"
            style={{ flex: 1, fontSize: 20 }}
            numberOfLines={1}
            ellipsizeMode="middle"
          >
            {ticketTitle}
          </SfText>
          <SfText familyType="medium" style={{ fontSize: 16 }}>
            {betTypeName}
          </SfText>
        </View>

        <View style={styles.indHeadingTextContainer}>
          <SfText
            familyType="medium"
            style={{ fontSize: 16, textAlign: "right" }}
          >
            To win {formattedPayout}
          </SfText>
          <SfText style={{ fontSize: 16, textAlign: "right" }}>
            {americanOdds}
          </SfText>
        </View>
      </View>

      <View
        style={{
          borderWidth: 2,
          borderColor: "#E3E3E3",
          borderRadius: 20,
          borderCurve: "continuous",
          padding: 16,
        }}
      >
        {ticket.sportMarkets.map((market, index) => (
          <View key={index} style={{ gap: 16 }}>
            <SfText style={{ textAlign: "center", fontSize: 16 }}>
              {market.leagueName}
            </SfText>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TeamMatchup
                teamName={market.homeTeam}
                teamImage={getImage(market.homeTeam, market.leagueId)}
              />
              <TeamMatchup
                teamName={market.awayTeam}
                teamImage={getImage(market.awayTeam, market.leagueId)}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  indHeadingTextContainer: {
    gap: 4,
  },
});
