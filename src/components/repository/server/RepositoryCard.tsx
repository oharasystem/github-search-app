import Image from "next/image";
import Link from "next/link";
import { Repository } from "@/lib/types/github";

type Props = {
  repo: Repository;
};

export default function RepositoryCard({ repo }: Props) {
  return (
    <li className="border border-gray-300 rounded-md hover:shadow-md transition-shadow bg-white">
      <Link href={`/repository/${repo.owner.login}/${repo.name}`}>
        <div className="flex items-center space-x-4 p-4">
          <Image
            src={repo.owner.avatar_url}
            alt={repo.owner.login}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1">
            <p className="font-semibold text-gray-900">{repo.full_name}</p>
            <p className="text-sm text-gray-600">
              {repo.language || "言語不明"}
            </p>
            <div className="text-xs text-gray-500 flex space-x-3 mt-1">
              <span>⭐ {repo.stargazers_count}</span>
              <span>👀 {repo.watchers_count}</span>
              <span>🍴 {repo.forks_count}</span>
              <span>🐞 {repo.open_issues_count}</span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
