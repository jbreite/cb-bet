import { polyfillWebCrypto } from "expo-standard-web-crypto";
import { randomUUID } from "expo-crypto";
import "fast-text-encoding";

polyfillWebCrypto();
crypto.randomUUID = randomUUID;
