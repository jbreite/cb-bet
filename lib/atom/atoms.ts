import { SportMarket } from "@/utils/overtime/types/markets";
import { atom } from "jotai";

export const userBetAtom = atom<SportMarket[]>([]);

export const sportMarketAtom = atom<SportMarket[]>([]);
