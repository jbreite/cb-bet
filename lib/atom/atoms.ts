import { SportMarket, TradeData } from "@/utils/overtime/types/markets";
import { atom } from "jotai";

export const userBetsAtom = atom<Array<{ tradeData: TradeData; sportMarket: SportMarket }>>([]);

export const sportMarketAtom = atom<SportMarket[]>([]);
