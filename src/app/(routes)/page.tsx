import { Suspense } from "react";
import RepositoryList from "@/components/repository/server/RepositoryList";
import RepositoryListSearch from "@/components/repository/server/RepositoryListSearch";
import RepositoryListSearchForm from "@/components/repository/client/RepositoryListSearchForm";

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
      <RepositoryListSearchForm initialKeyword={keyword} />
      {keyword && (
        <Suspense fallback={<RepositoryList />}>
          <RepositoryListSearch keyword={keyword} page={page} />
        </Suspense>
      )}
    </div>
  );
}
