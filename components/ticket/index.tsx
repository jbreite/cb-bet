import { View, Image } from "react-native";
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
      ? "PARLAY"
      : getMarketOutcomeText(
          ticket.sportMarkets[0],
          ticket.sportMarkets[0].position,
          ticket.sportMarkets[0].typeId,
          ticket.sportMarkets[0].line
        );

  const homeTeam = ticket.sportMarkets[0].homeTeam;
  const awayTeam = ticket.sportMarkets[0].awayTeam;

  const homeTeamImage = getImage(homeTeam, ticket.sportMarkets[0].leagueId);
  const awayTeamImage = getImage(awayTeam, ticket.sportMarkets[0].leagueId);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: "red",
              borderRadius: 100,
              borderCurve: "continuous",
            }}
          />
          <View>
            <SfText familyType="semibold" style={{ fontSize: 20 }}>
              {ticketTitle}
            </SfText>
            <View
              style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
            >
              <TeamMatchup teamName={awayTeam} teamImage={awayTeamImage} />
              <SfText familyType="medium" style={{ fontSize: 16 }}>
                @
              </SfText>
              <TeamMatchup teamName={homeTeam} teamImage={homeTeamImage} />
            </View>
          </View>
        </View>
        <View style={{ gap: 4 }}>
          <SfText style={{ fontSize: 16, textAlign: "right" }}>
            To Win:{formattedPayout}
          </SfText>
          <SfText style={{ fontSize: 16, textAlign: "right" }}>
            {americanOdds}
          </SfText>
        </View>
      </View>
    </View>
  );
}
