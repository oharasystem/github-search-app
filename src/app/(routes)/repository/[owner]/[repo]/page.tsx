import { Suspense } from "react";
import RepositoryDetail from "@/components/repository/client/RepositoryDetail";
import RepositoryDetailSearch from "@/components/repository/server/RepositoryDetailSearch";

interface Props {
  params: {
    owner: string;
    repo: string;
  };
}

export default function RepositoryDetailPage({ params }: Props) {
  return (
    <Suspense fallback={<RepositoryDetail repo={undefined} />}>
      <RepositoryDetailSearch owner={params.owner} repo={params.repo} />
    </Suspense>
  );
}
