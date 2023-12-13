import localFont from "next/font/local";
import { Poppins } from "next/font/google";
export const headingFont = localFont({
  src: "../public/fonts/font.woff2",
});

export const textFontPoppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
