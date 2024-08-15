import { ImageSourcePropType } from "react-native";

// Import all team logos

const pathToEplLogos = "../../../assets/images/sportsLogos/epl";

const teamLogos: { [key: string]: ImageSourcePropType } = {
  "afc-bournemouth": require(`${pathToEplLogos}/afc-bournemouth.webp`),
  "arsenal-fc": require(`${pathToEplLogos}/arsenal-fc.webp`),
  "aston-villa": require(`${pathToEplLogos}/aston-villa-fc.webp`),
  bournemouth: require(`${pathToEplLogos}/bournemouth.webp`),
  "brentford-fc": require(`${pathToEplLogos}/brentford-fc.webp`),
  brentford: require(`${pathToEplLogos}/brentford.webp`),
  "brighton-&-hove-albion-fc": require(`${pathToEplLogos}/brighton-&-hove-albion-fc.webp`),
  burnley: require(`${pathToEplLogos}/burnley.webp`),
  "chelsea-fc": require(`${pathToEplLogos}/chelsea-fc.webp`),
  "crystal-palace-fc": require(`${pathToEplLogos}/crystal-palace-fc.webp`),
  "everton-fc": require(`${pathToEplLogos}/everton-fc.webp`),
  "fulham-fc": require(`${pathToEplLogos}/fulham-fc.webp`),
  "ipswich-town-fc": require(`${pathToEplLogos}/ipswich-town-fc.webp`),
  "leeds-united": require(`${pathToEplLogos}/leeds-united.webp`),
  "leicester-city-fc": require(`${pathToEplLogos}/leicester-city-fc.webp`),
  "liverpool-fc": require(`${pathToEplLogos}/liverpool-fc.webp`),
  "luton-town": require(`${pathToEplLogos}/luton-town.webp`),
  "manchester-city-fc": require(`${pathToEplLogos}/manchester-city-fc.webp`),
  "manchester-united-fc": require(`${pathToEplLogos}/manchester-united-fc.webp`),
  "newcastle-united-fc": require(`${pathToEplLogos}/newcastle-united-fc.webp`),
  "nottingham-forest-fc": require(`${pathToEplLogos}/nottingham-forest-fc.webp`),
  "sheffield-united": require(`${pathToEplLogos}/sheffield-united.webp`),
  "southampton-fc": require(`${pathToEplLogos}/southampton-fc.webp`),
  "tottenham-hotspur-fc": require(`${pathToEplLogos}/tottenham-hotspur-fc.webp`),
  "west-ham-united-fc": require(`${pathToEplLogos}/west-ham-united-fc.webp`),
  "wolverhampton-wanderers-fc": require(`${pathToEplLogos}/wolverhampton-wanderers-fc.webp`),
  wolverhampton: require(`${pathToEplLogos}/wolverhampton.webp`),
};

// Default logo to use if a team's logo is not found
const defaultLogo: ImageSourcePropType = require("../../../assets/images/icon.png");

export function getImage(teamName: string): ImageSourcePropType {
  const formattedName = teamName.toLowerCase().replace(/\s+/g, "-");
  return teamLogos[formattedName] || defaultLogo;
}
