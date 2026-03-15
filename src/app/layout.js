import { fredoka, poppins } from "./fonts";
import "./globals.css";

export const metadata = {
  title: "Chalak Champs - Coming Soon",
  description:
    "Chalak Champs is coming soon! A creative new initiative by Lingual Academy.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        cz-shortcut-listen="true"
        className={`${fredoka.variable} ${poppins.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
