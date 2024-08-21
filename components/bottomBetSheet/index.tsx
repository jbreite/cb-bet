import { useAtom } from "jotai";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomSheet, BottomSheetContent } from "../Modal";
import { Text } from "react-native";
import { BottomSheetView } from "@gorhom/bottom-sheet";

export const BET_BOTTOM_SHEET_NAME = "BET_BOTTOM_SHEET_NAME";

const BORDER_RADIUS = 24;
const VERTICAL_PADDING = 16;

export default function BottomBetSheet() {
  return (
    <BottomSheetContent
      name={BET_BOTTOM_SHEET_NAME}
      snapPoints={["25%", "70%"]}
      index={-1}
      enablePanDownToClose={true}
      handleComponent={null}
      enableOverDrag={false}
      // detached={true}
      // bottomInset={tabBarHeight}
      //   backdropComponent={(props: BottomSheetBackdropProps) => (
      //     <CustomBackdrop {...props} closeBottomSheet={closeModal} />
      //   )}
      style={{
        // borderRadius: BORDER_RADIUS,
        overflow: "hidden",
      }}
    >
      <BottomSheetView style={{ flex: 1, backgroundColor: "red" }}>
        <Text>Hello</Text>
      </BottomSheetView>
    </BottomSheetContent>
  );
}
