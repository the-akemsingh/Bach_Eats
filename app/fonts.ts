import { Calistoga, Merriweather, Poppins } from "next/font/google";

const calistoga = Calistoga({
  weight: ["400"],
  subsets: ["latin"],
  preload: true,
  variable: "--calistoga",
});
const merriweather = Merriweather({
  weight: ["300", "400"],
  subsets: ["latin"],
  preload: true,
  variable: "--meriweather",
});
const poppins = Poppins({
  weight: ["200", "300"],
  subsets: ["latin"],
  preload: true,
  variable: "--poppins",
});

export { calistoga, merriweather, poppins };
