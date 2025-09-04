import RepositoryCard from "@/components/repository/server/RepositoryCard";
import { Repository } from "@/lib/types/github";

interface Props {
  keyword: string;
  results: Repository[];
  totalCount: number;
  page: number;
}

export default function RepositoryList({
  keyword,
  results,
  totalCount,
  page,
}: Props) {
  if (!keyword) return null;

  if (totalCount === 0) {
    return (
      <div className="text-center py-12 text-gray-600">
        <p className="mb-2 text-lg font-medium">
          検索結果は見つかりませんでした。
        </p>
        <p className="text-sm">キーワードを変えて再検索してみてください。</p>
      </div>
    );
  }

  return (
    <>
      <p className="text-gray-700 mb-4">
        検索結果 {totalCount.toLocaleString()} 件中 {(page - 1) * 30 + 1}〜
        {Math.min(page * 30, totalCount)} 件を表示
      </p>

      <ul className="space-y-4">
        {results.map((repo) => (
          <RepositoryCard key={repo.id} repo={repo} />
        ))}
      </ul>
    </>
  );
}
