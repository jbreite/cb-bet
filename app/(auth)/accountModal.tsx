import CopyAddress from "@/components/account/CopyAddress";
import Button from "@/components/Button";
import Chat_Circle from "@/components/icons/Chat_Circle";
import Credit_Card_01 from "@/components/icons/Credit_Card_01";
import External_Link from "@/components/icons/External_Link";
import Farcaster_Logo from "@/components/icons/Farcaster_Logo";
import Mail from "@/components/icons/Mail";
import Twitter_Logo from "@/components/icons/Twitter_Logo";
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
        padding: 16,
        justifyContent: "space-between",
        marginBottom: bottom,
      }}
    >
      <View style={{ gap: 16 }}>
        <AccountRow
          icon={<Credit_Card_01 color={ICON_COLOR} />}
          label="USDC Balance"
          rightValue={
            usdcBalLoading
              ? "Loading..."
              : usdcBalError
              ? "Error loading balance"
              : `${formatCurrency({ amount: usdcBalance?.value ?? 0 })}`
          }
        />
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

function AccountRow({
  icon,
  label,
  rightValue,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  rightValue: string | React.ReactNode;
  onPress?: () => void;
}) {
  return (
    <Pressable
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <View style={{ gap: 8, flexDirection: "row", alignItems: "center" }}>
        {icon}
        <SfText familyType="medium" style={{ fontSize: 16 }}>
          {label}
        </SfText>
      </View>
      {typeof rightValue === "string" ? (
        <SfText familyType="medium" style={{ fontSize: 16, color: ICON_COLOR }}>
          {rightValue}
        </SfText>
      ) : (
        rightValue
      )}
    </Pressable>
  );
}
