import RepositoryList from "@/components/repository/server/RepositoryList";
import Pagination from "@/components/ui/Pagination";
import { Repository } from "@/lib/types/github";

interface Props {
  keyword: string;
  page: number;
}

export default async function RepositoryListSearch({ keyword, page }: Props) {
  if (!keyword) return null;

  const perPage = 30;
  const params = new URLSearchParams({
    q: keyword,
    sort: "stars",
    order: "desc",
    per_page: perPage.toString(),
    page: page.toString(),
  });

  let results: Repository[] | undefined = [];
  let totalCount = 0;

  try {
    const res = await fetch(
      `https://api.github.com/search/repositories?${params}`,
      {
        headers: { Accept: "application/vnd.github.v3+json" },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    results = data.items;
    // results = undefined;
    totalCount = data.total_count;
  } catch (err: unknown) {
    console.error(err);
    return (
      <p className="text-red-600">
        リポジトリの検索中にエラーが発生しました。時間をおいて再試行してください。
      </p>
    );
  }

  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <>
      <RepositoryList
        keyword={keyword}
        results={results}
        totalCount={totalCount}
        page={page}
      />
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          baseUrl={`/?keyword=${encodeURIComponent(keyword)}`}
          maxButtons={5}
        />
      )}
    </>
  );
}
