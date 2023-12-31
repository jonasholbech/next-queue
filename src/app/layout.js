import Nav from "./components/Nav";
import "./globals.css";
import "./styles/framework.css";
import Head from "next/head";
export const metadata = {
  title: "MMD Kø",
  description: "Generated by ❤️",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/icon.svg" sizes="any" />
      </Head>
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
