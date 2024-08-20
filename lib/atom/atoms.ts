import { SportMarket, TradeData } from "@/utils/overtime/types/markets";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { atom } from "jotai";

export const userBetsAtom = atom<
  Array<{ tradeData: TradeData; sportMarket: SportMarket }>
>([]);

export const sportMarketAtom = atom<SportMarket[]>([]);

export const BottomSheetMapAtom = atom<Map<string, BottomSheetModal | null>>(
  new Map()
);
