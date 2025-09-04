import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-gray-900 text-white p-4 shadow">
      <h1 className="text-2xl font-bold">
        <Link href="/">GitHub リポジトリ検索</Link>
      </h1>
    </header>
  );
}
