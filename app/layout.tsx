import type { Metadata } from "next";
import { Lato, Oswald } from "next/font/google";
import "./globals.css";
import Providers from "./redux/provider";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: "TMDb Movie Search",
  description: "Search for movies using the TMDb API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${lato.variable} ${oswald.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
