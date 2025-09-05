import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">
        お探しのページは見つかりませんでした。
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition-colors"
      >
        トップページに戻る
      </Link>
    </div>
  );
}
