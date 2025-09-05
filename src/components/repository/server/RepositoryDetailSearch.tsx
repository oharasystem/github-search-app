import { notFound } from "next/navigation";
import RepositoryDetail from "@/components/repository/server/RepositoryDetail";

interface Props {
  owner: string;
  repo: string;
}

export default async function RepositoryDetailSearch({ owner, repo }: Props) {
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: { Accept: "application/vnd.github.v3+json" },
      cache: "no-store",
    });

    if (!res.ok) {
      if (res.status === 404) {
        return notFound();
      }
      throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return <RepositoryDetail repo={data} />;
  } catch (err: unknown) {
    console.error(err);
    return (
      <p className="text-red-600">
        リポジトリの取得中にエラーが発生しました。時間をおいて再試行してください。
      </p>
    );
  }
}
