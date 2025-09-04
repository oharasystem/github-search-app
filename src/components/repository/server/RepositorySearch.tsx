import RepositoryList from "@/components/repository/server/RepositoryList";
import Pagination from "@/components/ui/Pagination";
import { Repository } from "@/lib/types/github";

interface Props {
  keyword: string;
  page: number;
}

export default async function RepositorySearch({ keyword, page }: Props) {
  if (!keyword) return null;

  const perPage = 30;
  const params = new URLSearchParams({
    q: keyword,
    sort: "stars",
    order: "desc",
    per_page: perPage.toString(),
    page: page.toString(),
  });

  const res = await fetch(
    `https://api.github.com/search/repositories?${params}`,
    {
      headers: { Accept: "application/vnd.github.v3+json" },
      cache: "no-store",
    }
  );

  let results: Repository[] = [];
  let totalCount = 0;

  if (res.ok) {
    const data = await res.json();
    results = data.items;
    totalCount = data.total_count;
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
