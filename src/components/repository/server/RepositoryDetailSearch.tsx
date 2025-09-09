import RepositoryDetail from "@/components/repository/client/RepositoryDetail";
import { fetchRepository } from "@/lib/github";

interface Props {
  owner: string;
  repo: string;
}

export default async function RepositoryDetailSearch({ owner, repo }: Props) {
  try {
    const data = await fetchRepository({ owner, repo });
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
