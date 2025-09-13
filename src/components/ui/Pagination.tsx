import Link from "next/link";

interface Props {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  maxButtons?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  maxButtons = 5,
}: Props) {
  const half = Math.floor(maxButtons / 2);
  let start = Math.max(currentPage - half, 1);
  const end = Math.min(start + maxButtons - 1, totalPages);
  start = Math.max(end - maxButtons + 1, 1);

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <nav className="flex justify-center space-x-2 mt-6" aria-label="Pagination">
      {currentPage > 1 && (
        <Link
          href={`${baseUrl}&page=${currentPage - 1}`}
          className="px-3 py-1 bg-gray-900 text-white rounded hover:bg-gray-700"
        >
          前へ
        </Link>
      )}

      {pages.map((p) => (
        <Link
          key={p}
          href={`${baseUrl}&page=${p}`}
          className={`px-3 py-1 rounded ${
            p === currentPage
              ? "bg-gray-900 text-white"
              : "bg-gray-200 text-gray-900 hover:bg-gray-300"
          }`}
        >
          {p}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={`${baseUrl}&page=${currentPage + 1}`}
          className="px-3 py-1 bg-gray-900 text-white rounded hover:bg-gray-700"
        >
          次へ
        </Link>
      )}
    </nav>
  );
}
