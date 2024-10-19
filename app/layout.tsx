import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RootProvider from "@/components/providers/root";
import RecoilProvder from "@/components/providers/recoil";
import ReqctQueryProvider from "@/components/providers/react-query/indext";
import cls from "classnames";

const inter = Inter({ subsets: ["latin"] });

const isPROD = process.env.NODE_ENV === "production";

export const metadata: Metadata = {
  metadataBase: isPROD ? new URL("https://cutejson.dev") : null,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/x-icon" />
      </head>
      <body
        className={cls(
          inter.className,
          "text-sm text-slate-800 overflow-x-hidden"
        )}
      >
        <RecoilProvder>
          <ReqctQueryProvider>
            <RootProvider>{children}</RootProvider>
          </ReqctQueryProvider>
        </RecoilProvder>
      </body>
    </html>
  );
}
