import { Fredoka, Poppins } from "next/font/google";

export const fredoka = Fredoka({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
});

export const poppins = Poppins({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});
