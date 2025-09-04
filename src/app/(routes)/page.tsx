import { Suspense } from "react";
import RepositoryCardSkeleton from "@/components/repository/client/RepositoryCardSkeleton";
import RepositorySearch from "@/components/repository/server/RepositorySearch";
import RepositorySearchForm from "@/components/repository/client/RepositorySearchForm";

interface Props {
  searchParams?: {
    keyword?: string;
    page?: string;
  };
}

export default function HomePage({ searchParams }: Props) {
  const keyword = searchParams?.keyword || "";
  const page = parseInt(searchParams?.page || "1", 10);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">
        GitHub リポジトリ検索
      </h1>
      <RepositorySearchForm initialKeyword={keyword} />
      {keyword && (
        <Suspense
          fallback={
            <ul className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <RepositoryCardSkeleton key={i} />
              ))}
            </ul>
          }
        >
          <RepositorySearch keyword={keyword} page={page} />
        </Suspense>
      )}
    </div>
  );
}
