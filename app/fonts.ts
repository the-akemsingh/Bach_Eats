import { Calistoga, Merriweather, Poppins,Pacifico,Jersey_10 } from "next/font/google";

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
const jersey_10 = Jersey_10({
  weight: ["400"],
  subsets: ["latin"],
  preload: true,
});

export { calistoga, merriweather, poppins,pacifico,jersey_10 };
