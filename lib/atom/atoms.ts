import { SportMarket, TradeData } from "@/utils/overtime/types/markets";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { atom } from "jotai";

//Might be better to have thsi withougt child markets
export const userBetsAtom = atom<
  Array<{ tradeData: TradeData; sportMarket: SportMarket }>
>([]);

export const sportMarketAtom = atom<SportMarket[]>([]);

export const BottomSheetMapAtom = atom<Map<string, BottomSheetModal | null>>(
  new Map()
);
