import AsyncStorage from "@react-native-async-storage/async-storage";

export interface WalletProfile {
  address: `0x${string}`;
  emoji?: string;
  emojiBackground?: string;
}

export const addOrUpdateWalletProfile = async (
  profile: Partial<WalletProfile>
) => {
  const profiles = await getWalletProfiles();
  const existingIndex = profiles.findIndex(
    (p) => p.address === profile.address
  );

  if (existingIndex !== -1) {
    profiles[existingIndex] = { ...profiles[existingIndex], ...profile };
  } else {
    profiles.push(profile as WalletProfile);
  }

  await AsyncStorage.setItem("walletProfiles", JSON.stringify(profiles));
};
export const getWalletProfiles = async (): Promise<WalletProfile[]> => {
  const profiles = await AsyncStorage.getItem("walletProfiles");
  return profiles ? JSON.parse(profiles) : [];
};

export const getWalletProfile = async (
  address: `0x${string}`
): Promise<WalletProfile | undefined> => {
  const profiles = await getWalletProfiles();
  console.log("PROFILES:", profiles);
  const foundProfile = profiles.find((p) => p.address === address);
  console.log("FOUND PROFILE", foundProfile);
  return foundProfile;
};

export const checkProfileSetUp = async (
  profile: WalletProfile | undefined
): Promise<boolean> => {
  if (!profile) return false;

  try {
    console.log("checkProfileSetUp - profile:", profile);
    console.log("Has emoji:", !!profile?.emoji);
    console.log("Has emojiBackground:", !!profile?.emojiBackground);

    return !!profile && !!profile.emoji && !!profile.emojiBackground;
  } catch (error) {
    console.error("Error checking profile:", error);
    return false;
  }
};

//Not Currently Used

export const removeWalletProfile = async (address: string) => {
  const profiles = await getWalletProfiles();
  const updatedProfiles = profiles.filter((p) => p.address !== address);
  await AsyncStorage.setItem("walletProfiles", JSON.stringify(updatedProfiles));
};
