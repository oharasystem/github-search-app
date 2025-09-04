import { notFound } from "next/navigation";
import RepositoryDetail from "@/components/repository/server/RepositoryDetail";

interface Props {
  owner: string;
  repo: string;
}
export default async function RepositoryDetailSearch({ owner, repo }: Props) {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: { Accept: "application/vnd.github.v3+json" },
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  const data = await res.json();
  return <RepositoryDetail repo={data} />;
}
