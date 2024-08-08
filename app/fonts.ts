import { Calistoga, Merriweather, Poppins } from "next/font/google";

const calistoga = Calistoga({ weight: ["400"], subsets: ["latin"] });
const merriweather = Merriweather({weight: ["300", "400"],subsets: ["latin"],});
const poppins = Poppins({ weight: ["200", "300"], subsets: ["latin"] });

export {calistoga,merriweather,poppins};