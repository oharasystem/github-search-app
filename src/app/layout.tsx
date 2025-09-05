import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GitHub リポジトリ検索",
  description: "GitHubリポジトリを検索して詳細を表示するアプリケーション",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "GitHub リポジトリ検索",
    description: "GitHubリポジトリを検索して詳細を表示するアプリケーション",
    url: "https://github-search-app.vercel.app",
    siteName: "GitHub リポジトリ検索",
    images: [
      {
        url: "https://github-search-app.vercel.app/ogp.png",
        width: 1200,
        height: 630,
        alt: "GitHub リポジトリ検索",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <Header />
        <main className="max-w-4xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
