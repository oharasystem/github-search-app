import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GitHub リポジトリ検索",
  description: "GitHubリポジトリを検索して詳細を表示するアプリケーション",
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
