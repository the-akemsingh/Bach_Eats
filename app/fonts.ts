import { Calistoga, Merriweather, Poppins,Pacifico,Spicy_Rice, Markazi_Text, DM_Serif_Text,Open_Sans } from "next/font/google";

const calistoga = Calistoga({
  weight: ["400"],
  subsets: ["latin"],
  preload: true,
});
const merriweather = Merriweather({
  weight: ["300", "400",],
  subsets: ["latin"],
  preload: true,
});
const poppins = Poppins({
  weight: ["200", "300"],
  subsets: ["latin"],
  preload: true,
});
const pacifico = Pacifico({
  weight: ["400"],
  subsets: ["latin"],
  preload: true,
});
const jersey_10 = Spicy_Rice({
  weight: ["400"],
  subsets: ["latin"],
  preload: true,
});

const MarkaziFont = Markazi_Text({
  weight: "400",
  subsets: ["latin"],
  preload: true,
});

const DMSerifFont = DM_Serif_Text({
  weight: "400",
  subsets: ["latin"],
  preload: true,
});
const OpenSansFont = Open_Sans({
  weight: "400",
  subsets: ["latin"],
  preload: true,
});


export { calistoga, merriweather, poppins,pacifico,jersey_10 ,MarkaziFont, DMSerifFont,OpenSansFont};
