import { Suspense } from "react";
import RepositoryDetailSkeleton from "@/components/repository/client/RepositoryDetailSkeleton";
import RepositoryDetailSearch from "@/components/repository/server/RepositoryDetailSearch";

interface Props {
  params: {
    owner: string;
    repo: string;
  };
}

export default function RepositoryDetailPage({ params }: Props) {
  return (
    <Suspense fallback={<RepositoryDetailSkeleton />}>
      <RepositoryDetailSearch owner={params.owner} repo={params.repo} />
    </Suspense>
  );
}
