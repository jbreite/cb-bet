import AccountCard from "@/components/account/accountCard";
import { AccountRow } from "@/components/account/accountRow";
import Button from "@/components/Button";
import Chat_Circle from "@/components/icons/Chat_Circle";
import Credit_Card_01 from "@/components/icons/Credit_Card_01";
import External_Link from "@/components/icons/External_Link";
import Farcaster_Logo from "@/components/icons/Farcaster_Logo";
import Mail from "@/components/icons/Mail";
import Twitter_Logo from "@/components/icons/Twitter_Logo";
import {
  EMOJI_BACKGROUND_COLOR,
  EMOJI_SYMBOL,
} from "@/components/mainHeader/addressEmoji";
import { SfText } from "@/components/SfThemedText";
import { useUSDCBal } from "@/hooks/tokens/useUSDCBal";
import { formatCurrency } from "@/utils/overtime/ui/beyTabHelpers";
import { Linking, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAccount, useDisconnect } from "wagmi";

const ICON_COLOR = "#949595";
const FEEDBACK_FORM_URL = "https://forms.gle/PSPx3vHux31yy8Xc6";
const TWITTER_URL = "https://x.com/joshbreite";
const FARCASTER_URL = "https://warpcast.com/joshbreite.eth";
const EMAIL_LINK = "mailto:joshbreite@gmail.com";

export default function AccountModal() {
  const { bottom } = useSafeAreaInsets();

  const { disconnect } = useDisconnect();

  const {
    balance: usdcBalance,
    isLoading: usdcBalLoading,
    isError: usdcBalError,
  } = useUSDCBal();

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 32,
        justifyContent: "space-between",
        marginBottom: bottom,
        gap: 32,
      }}
    >
      <AccountCard
        backgroundColor={EMOJI_BACKGROUND_COLOR}
        emoji={EMOJI_SYMBOL}
        usdcValue={
          usdcBalLoading
            ? "Loading..."
            : usdcBalError
            ? "Error loading balance"
            : `${formatCurrency({ amount: usdcBalance?.value ?? 0 })}`
        }
      />
      <View style={{ flex: 1 }}>
        <AccountRow
          icon={<Chat_Circle color={ICON_COLOR} />}
          label="Feedback"
          rightValue={<External_Link color={ICON_COLOR} />}
          onPress={() => Linking.openURL(FEEDBACK_FORM_URL)}
        />
        <AccountRow
          icon={<Twitter_Logo color={ICON_COLOR} />}
          label="Follow along on Twitter"
          rightValue={<External_Link color={ICON_COLOR} />}
          onPress={() => Linking.openURL(TWITTER_URL)}
        />
        <AccountRow
          icon={<Farcaster_Logo color={ICON_COLOR} />}
          label="Follow along on Farcaster"
          rightValue={<External_Link color={ICON_COLOR} />}
          onPress={() => Linking.openURL(FARCASTER_URL)}
        />
        <AccountRow
          icon={<Mail color={ICON_COLOR} />}
          label="Contact me"
          rightValue={<External_Link color={ICON_COLOR} />}
          onPress={() => Linking.openURL(EMAIL_LINK)}
        />
      </View>
      <Button label="Disconnect Wallet" onPress={() => disconnect()} />
    </View>
  );
}
